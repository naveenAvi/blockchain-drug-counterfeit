<?php

namespace App\Http\Controllers;

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
            ->with(['drug', 'manufacturer', 'importer'])
            ->get();
        }else{
            $order = ManufacturerOrder::where(['manufacturer_id'=>$connectedEntity->id])
            ->with(['drug', 'manufacturer', 'importer'])
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
            'drug_strength' => $order->drug->strength ?? null,
            'drug_type' => $order->drug->type ?? null,
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

        $orderid = $request->input("order_number");

        $order =  ManufacturerOrder::where(['manufacturer_id'=>$connectedEntity->id, 'order_number'=>$orderid, "status"=>"pending"])->firstOrFail();
        $connectedEntity = ConnectedEntity::where([
            'id' => $order->manufacturer_id
        ])->firstOrFail();

        $credentials = EntityCredentials::where('entityID', $connectedEntity->entID)->first();
        if (!$credentials) {
            return response()->json([
                'success' => false,
                'message' => 'No credentials found for this manufacturer.',
            ], 404);
        }

        $fabricAuth = new FabricAuthService();

        $input = $credentials->username;
        $manuUsername = explode('.', $input)[0];


        $login = $fabricAuth->login($manuUsername, $connectedEntity->type, 'Org1', $credentials->pasword);
        if(!$login['success']) {
            return response()->json([
                'success' => false,
                'message' => 'Fabric login failed',
                'error' => $login['message'] ?? 'Unknown error'
            ], 500);
        }
        
        $token = $login['token'];

        if (!$login['success']) {
            return response()->json([
                'success' => false,
                'message' => 'Fabric login failed',
                'error' => $login['message'] ?? 'Unknown error'
            ], 500);
        }

        $payload = [
            'username'     => $credentials->username,
            'org'          => 'Org1',
            'drugId'       => $order->drug->drug_id ?? 'UNKNOWN',
            'name'         => $order->drug->name,
            'manufacturer' => $order->manufacturer->name,
            'batch'        => $order->batch_number ?? '1',
            'expiry'       => "2025-03-02",
            'amount'       => $order->total_amount ?? '0',
        ];


        try {
            $response = Http::withToken($token)->post('http://20.193.133.149:3000/api/registerDrug', $payload);
            $responseData = $response->json();

            ManufacturerOrder::where(['manufacturer_id'=>$connectedEntity->id, 'order_number'=>$orderid])->update([
                'status' => 'created'
            ]);
            ImporterOrder::where(['manufacturer_id'=>$connectedEntity->id, 'id'=>$orderid])->update([
                'status' => 'approved'
            ]);

            corp_transactions::create([
                'drugid' => $payload["drugId"],
                'fromEntID' => $connectedEntity->entID,
                'toEntID' => $connectedEntity->entID,
                'amount' => $payload['amount'],
                'status' => "created",
                "referenceNo" => $responseData['assetID'] ?? null
            ]);

            $wallet = local_drug_wallet::where('drugid', $payload["drugId"])
                ->where('entID', $entID)
                ->first();

            if ($wallet) {
                $wallet->avail_amount += $payload['amount'];
                $wallet->save();
            } else {
                local_drug_wallet::create([
                    'drugid' => $payload["drugId"],
                    'entID' => $entID,
                    "assetsID"=>null,
                    'avail_amount' => $payload['amount']
                ]);
            }


            return response()->json([
                'success' => true,
                'message' => 'Entity created successfully.',
                'data' => $responseData
            ], 201);
            
        } catch (\Exception $e) {
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
}
