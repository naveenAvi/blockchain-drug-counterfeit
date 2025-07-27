<?php

namespace App\Http\Controllers;

use App\Services\LoggingService;
use Illuminate\Http\Request;
use App\Models\ManufacturerOrder;
use App\Models\ConnectedEntity;
use App\Models\EntityCredentials;
use App\Models\ImporterOrder;
use App\Services\FabricAuthService;
use App\Models\local_drug_wallet;
use App\Models\corp_transactions;
use Http;
use Auth;

class ManufacturerOrdersController extends Controller
{
    
    public function show(Request $request)
    {
        $orderid = $request->input("orderid");

        $user = Auth::user();

        $entID = $user->entID ?? null;
        if (!$entID) {
            return response()->json([
                'success' => false,
                'message' => 'Authenticated user does not have an entID.'
            ], 403);
        }
        $connectedEntity = ConnectedEntity::where([
            'entID' => $entID
        ])->firstOrFail();


        if($orderid){
            $order = ManufacturerOrder::where(['manufacturer_id'=>$connectedEntity->id, 'order_number'=>$orderid])
            ->with(['drug', 'manufacturer', 'importer','transactions'])
            ->get();
        }else{
            $order = ManufacturerOrder::where(['manufacturer_id'=>$connectedEntity->id])
            ->with(['drug', 'manufacturer', 'importer','transactions'])
            ->get();
        }
        

        $filteredOrders = $order->map(function ($order) {
            return [
                'order_number' => $order->order_number,
                'invoice_number' => $order->invoice_number,
                'order_date' => $order->order_date->toDateString(),
                'status' => $order->status,
                'total_amount' => $order->total_amount,

                'manufacturer_name' => $order->manufacturer->name ?? null,
                'importer_name' => $order->importer->name ?? null,

                'drug_name' => $order->drug->name ?? null,
                'drugID' => $order->drug->drug_id ?? null,
                'drug_strength' => $order->drug->strength ?? null,
                'drug_type' => $order->drug->type ?? null,

                'transactions' => collect($order->transactions)->map(function ($transaction) {
                    return [
                        'transactionID' => $transaction->transactionID,
                        'amount' => $transaction->amount,
                        'status' => $transaction->status,
                         'batchID' => $transaction->batchID,
                        'created_at' => $transaction->created_at->toDateTimeString(),
                    ];
                }),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $filteredOrders
        ]);
    }

    public function shows()
    {
        $order = ManufacturerOrder::get()->load('drug', "manufacturer","importer");


        return response()->json([
            'success' => true,
            'data' => $order
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'invoice_number' => 'required|string',
            'reference_document' => 'nullable|string',
            'manufacturer_id' => 'required|integer',
            'importer_id' => 'required|integer',
            'order_date' => 'required|date',
            'status' => 'in:pending,approved,rejected,shipped,delivered',
            'total_amount' => 'required|integer',
            'notes' => 'nullable|string',
        ]);

        $order = ManufacturerOrder::create($validated);

        return response()->json($order, 201);
    }
    public function statusUpdate(Request $request)
    {
        $validated = $request->validate([
            'order_number' => 'required|integer',
            'amount' => 'required|integer',
            'batchID' => 'required|string'
        ]);

        $user = Auth::user();
        $LoggingService = new LoggingService();


        $entID = $user->entID ?? null;
        if (!$entID) {
            return response()->json([
                'success' => false,
                'message' => 'Authenticated user does not have an entID.'
            ], 403);
        }
        $connectedEntity = ConnectedEntity::where([
            'entID' => $entID
        ])->firstOrFail();

        $orderid = $validated["order_number"];
        $amount = $validated["amount"];
        $batchID = $validated["batchID"];

        $logingReference = $orderid . '-' . $batchID;


        $LoggingService->clearTransactionLogs($logingReference);

        $order =  ManufacturerOrder::where(['manufacturer_id'=>$connectedEntity->id, 'order_number'=>$orderid, "status"=>"pending"])->first();
        if(!$order){
            $LoggingService->addTransactionLog(1, "Manufacturer Order Validation", "fail","",$logingReference);
        return response()->json([
                'success' => false,
                'message' => 'Order Not Found!',
            ], 400);
        }else{
            $LoggingService->addTransactionLog(1, "Manufacturer Order Validation", "pass","",$logingReference);
        }
        $corp_transactions = corp_transactions::where("referenceNo",$order->id)->sum("amount");
        
        if($order->total_amount < $corp_transactions){
            $LoggingService->addTransactionLog(1, "Order amount Exeeds", "fail","",$logingReference);

            return response()->json([
                'success' => false,
                'message' => 'Exceeds order amount!',
            ], 400);
        }
        $connectedEntity = ConnectedEntity::where([
            'id' => $order->manufacturer_id
        ])->first();
        if(!$connectedEntity){
            $LoggingService->addTransactionLog(1, "Manufacturer identification", "fail","",$logingReference);
        }else{
            $LoggingService->addTransactionLog(1, "Manufacturer identification", "pass","",$logingReference);
        }

        $credentials = EntityCredentials::where('entityID', $connectedEntity->entID)->first();
        if (!$credentials) {
            $LoggingService->addTransactionLog(1, "Manufacturer Credentials Binding", "fail","",$logingReference);
            return response()->json([
                'success' => false,
                'message' => 'No credentials found for this manufacturer.',
            ], 404);
        }else{
            $LoggingService->addTransactionLog(1, "Manufacturer Credentials Binding", "pass","",$logingReference);
        }

        $fabricAuth = new FabricAuthService();

        $input = $credentials->username;
        $manuUsername = explode('.', $input)[0];


        $login = $fabricAuth->login($manuUsername, $connectedEntity->type, 'Org1', $credentials->pasword);
        if(!$login['success']) {
            $LoggingService->addTransactionLog(1, "Manufacturer Authentication", "fail",$login['message'],$logingReference);

            return response()->json([
                'success' => false,
                'message' => 'Fabric login failed',
                'error' => $login['message'] ?? 'Unknown error'
            ], 500);
        }else{
            $LoggingService->addTransactionLog(1, "Manufacturer Authentication", "pass","",$logingReference);
        }
        
        $token = $login['token'];


        $payload = [
            'username'     => $credentials->username,
            'org'          => 'Org1',
            'drugId'       => $order->drug->drug_id ?? 'UNKNOWN',
            'name'         => $order->drug->name,
            'manufacturer' => $order->manufacturer->name,
            'batch'        => $batchID,
            'expiry'       => "2025-03-02",
            'amount'       => $amount,
        ];


        try {
            $response = Http::withToken($token)->post('http://20.193.133.149:3000/api/registerDrug', $payload);
            $responseData = $response->json();


            if( $responseData['success'] !== true){

                $responseJson = json_encode($responseData);
                $LoggingService->addTransactionLog(1, "Tokens Generation", "fail",$responseJson,$logingReference);

                return response()->json([
                    'success' => false,
                    'message' => 'Entity created but encountered an error contacting fabric server.',
                    'error' => $responseJson
                ], 500);
            }

            $status = "pending";
            if($order->total_amount <= $corp_transactions){
                $status = "created";
            }
            ManufacturerOrder::where(['manufacturer_id'=>$connectedEntity->id, 'order_number'=>$orderid])->update([
                'status' => $status
            ]);
            ImporterOrder::where(['manufacturer_id'=>$connectedEntity->id, 'order_number'=>$orderid])->update([
                'status' => 'approved'
            ]);
            $LoggingService->addTransactionLog(1, "Manufacturer Order Creation", "pass","",$logingReference);
            $LoggingService->addTransactionLog(1, "Importer Order Updating", "pass","",$logingReference);

            
            corp_transactions::create([
                'drugid' => $payload["drugId"],
                'fromEntID' => $connectedEntity->entID,
                'toEntID' => $connectedEntity->entID,
                'amount' => $amount,
                'status' => "created",
                "referenceNo" => $orderid ?? null,
                "assetsID" => $responseData['result']['assetID'] ?? null,
                "batchID"=>$batchID
            ]);
            $LoggingService->addTransactionLog(1, "Transaction Logging", "pass","",$logingReference);


            $wallet = local_drug_wallet::where(['drugid' => $payload["drugId"], "batchID"=>$batchID])
                ->where('entID', $entID)
                ->first();
            $LoggingService->addTransactionLog(1, "Added to Drug Wallet", "pass","",$logingReference);


            if ($wallet) {
                $wallet->avail_amount += $amount;
                $wallet->save();
                $LoggingService->addTransactionLog(1, "Added Tokens to the manufacturer wallet", "pass","",$logingReference);

            } else {
                local_drug_wallet::create([
                    'drugid' => $payload["drugId"],
                    'entID' => $entID,
                    "assetsID"=> $responseData['result']['assetID'] ?? null,
                    'batchID'=>$batchID,
                    'avail_amount' => $amount
                ]);
                $LoggingService->addTransactionLog(1, "Creating Manufacturer wallet and adding tokens", "pass","",$logingReference);

            }


            return response()->json([
                'success' => true,
                'message' => 'Entity created successfully.',
                'data' => $responseData,
                "payload"=>$payload
            ], 201);
            
        } catch (\Exception $e) {
            $LoggingService->addTransactionLog(1, "Tokens Generation", "fail",$e->getMessage(),$logingReference);

            return response()->json([
                'success' => false,
                'message' => 'Entity created but encountered an error contacting fabric server.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function update(Request $request, $order_number)
    {
        $order = ManufacturerOrder::findOrFail($order_number);

        $validated = $request->validate([
            'invoice_number' => 'sometimes|required|string',
            'reference_document' => 'nullable|string',
            'manufacturer_id' => 'sometimes|required|integer',
            'importer_id' => 'sometimes|required|integer',
            'order_date' => 'sometimes|required|date',
            'status' => 'sometimes|in:pending,approved,rejected,shipped,delivered',
            'total_amount' => 'sometimes|required|integer',
            'notes' => 'nullable|string',
        ]);

        $order->update($validated);

        return response()->json($order);
    }

    public function destroy($order_number)
    {
        $order = ManufacturerOrder::findOrFail($order_number);
        $order->delete();

        return response()->json(['message' => 'Order deleted']);
    }

    public function getDashboardData()
    {
        $user = Auth::user();
        $entID = $user->entID ?? null;
        if (!$entID) {
            return response()->json([
                'success' => false,
                'message' => 'Authenticated user does not have an entID.'
            ], 403);
        }
        $connectedEntity = ConnectedEntity::where([
            'entID' => $entID
        ])->firstOrFail();

        $allOrdersCount = ManufacturerOrder::where('manufacturer_id', $connectedEntity->id)->count();
        $allOrdersSum = ManufacturerOrder::where('manufacturer_id', $connectedEntity->id)->sum('total_amount');

        $pendingCount = ManufacturerOrder::where([
            'manufacturer_id'=> $connectedEntity->id,
            'status' => 'pending'
        ])->count();
        $pendingSum = ManufacturerOrder::where([
            'manufacturer_id'=> $connectedEntity->id,
            'status' => 'pending'
        ])->sum('total_amount');

        $createdCount = ManufacturerOrder::where([
            'manufacturer_id'=> $connectedEntity->id,
            'status' => 'created'
        ])->count();
        $createdSum = ManufacturerOrder::where([
            'manufacturer_id'=> $connectedEntity->id,
            'status' => 'created'
        ])->sum('total_amount');

        $rejectedCount = ManufacturerOrder::where([
            'manufacturer_id'=> $connectedEntity->id,
            'status' => 'rejected'
        ])->count();
        $rejectedSum = ManufacturerOrder::where([
            'manufacturer_id'=> $connectedEntity->id,
            'status' => 'rejected'
        ])->sum('total_amount');


        return response()->json([
            'success' => true,
            'allOrders' => [
                'count' => $allOrdersCount,
                'sum' => $allOrdersSum,
            ],
            'pending' => [
                'count' => $pendingCount,
                'sum' => $pendingSum,
            ],
            'created' => [
                'count' => $createdCount,
                'sum' => $createdSum,
            ],
            'rejected' => [
                'count' => $rejectedCount,
                'sum' => $rejectedSum,
            ],
        ]);

    }
}
