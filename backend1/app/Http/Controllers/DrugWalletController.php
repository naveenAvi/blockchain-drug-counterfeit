<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\ConnectedEntity;
use App\Models\corp_transactions;
use App\Models\LocalDrugWallet;
use App\Models\local_drug_wallet;
use Auth;
use App\Models\EntityCredentials;
use App\Services\FabricAuthService;
use Http;

class DrugWalletController extends Controller
{
    public function index()
    {
        return response()->json(local_drug_wallet::all(), 200);
    }

    public function show($id)
    {
        $wallet = local_drug_wallet::find($id);
        return $wallet
            ? response()->json($wallet, 200)
            : response()->json(['message' => 'Not Found'], 404);
    }

    public function showByDrugId(Request $request, $drugid)
    {
        $drug_id = $request->drug_id;
        $user = Auth::user();
        $entID = $user->entID ?? null; 

        if (!$entID) {
            return response()->json(['message' => 'Unauthorized: entID not found'], 403);
        }

        $records = local_drug_wallet::where(['drugid'=> $drug_id, 'entID'=>$entID ])->get();
        return response()->json($records, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'drugid' => 'required|integer',
            'entID' => 'nullable|integer',
            'ownerID' => 'nullable|integer',
            'avail_amount' => 'nullable|integer',
        ]);

        $wallet = local_drug_wallet::create($validated);
        return response()->json($wallet, 201);
    }

    public function update(Request $request, $id)
    {
        $wallet = local_drug_wallet::find($id);
        if (!$wallet) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $wallet->update($request->all());
        return response()->json($wallet, 200);
    }


    public function handleTransaction(Request $request)
    {
        $user = Auth::user();
        $validated = $request->validate([
            'drugId' => 'required|string',
            'manufacturerId' => 'required|integer',
            'invoiceNumber' => 'nullable|string|max:255',
            'referenceDoc' => 'nullable|string|max:255',
            'amount' => 'required|integer|min:1',
            "toParty" => 'required|string',
            "batchID" => 'required|string',
        ]);

        $entID = $user->entID ?? null;
        if (!$entID) {
            return response()->json([
                'success' => false,
                'message' => 'Authenticated user does not have an entID.'
            ], 403);
        }

        $amount = (int) $validated['amount'];
        $drugId = $validated['drugId'];


         $connectedEntity = ConnectedEntity::where([
            'entID' => $entID
        ])->firstOrFail();
        $toCOnnectedENtity = ConnectedEntity::where([
            'entID' => $validated["toParty"]
        ])->firstOrFail();
        $credentials = EntityCredentials::where('entityID', $entID)->first();
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
        $token = $login['token'];

        if (!$login['success']) {
            return response()->json([
                'success' => false,
                'message' => 'Fabric login failed',
                'error' => $login['message'] ?? 'Unknown error'
            ], 500);
        }
            
        try {
            $response = Http::withToken($token)->post('http://20.193.133.149:3000/api/transfer', [
                "drugId"=> $drugId,
                'username' => $connectedEntity->name,
                'org' => 'Org1',
                // 'role' => $connectedEntity->role,
                "newOwner"=> $validated['toParty'],
                'amount' => $amount,
                "batchID"=> $validated['batchID']
            ]);
            $response = $response->json();
            $transferMessage = $response['result']['message'] ?? null;
            $transferMessage = $response['error'] ?? null;
            $transferredAssetID = $response['result']['transferredAssetID'] ?? null;

            if (!($transferMessage === "Transfer successful from single block" ||$transferMessage === "Transfer successful by merging multiple blocks" )){
                return response()->json([
                    'success' => false,
                    'message' => ' Thrown error from the fabrics',
                    'error' => $transferMessage ?? $transferMessage,
                    "response"=>$response
                ], 500);
            }

            $wallet = local_drug_wallet::where('drugid', $drugId)
                ->where('entID', $entID)
                ->first();
            corp_transactions::create([
                'drugid' => $drugId,
                'fromEntID' => $entID,
                'toEntID' => $validated['toParty'],
                'amount' => $amount,
                'status' => "transfer",
                "referenceNo" => $transferredAssetID ?? null,
                "assetsID" => $transferredAssetID ?? null,
                "batchID"=> $validated['batchID'] ?? null
            ]);

            if ($wallet) {
                $wallet->avail_amount -= $amount;
                $wallet->save();
            } 


            



            $wallet2 = local_drug_wallet::where(['drugid'=> $drugId, "batchID"=>$validated["batchID"]])
                ->where('entID', $validated['toParty'])
                ->first();
            if ($wallet2) {
                $wallet2->avail_amount += $amount;
                $wallet2->save();
            }else{
                local_drug_wallet::create([
                    'drugid' => $drugId,
                    'entID' => $validated['toParty'],
                    "assetsID"=>$transferredAssetID,
                    "batchID"=>$validated["batchID"],
                    'avail_amount' => $amount
                ]);
            }
            return response()->json([
                'success' => true,
                'message' => 'Transaction successful',
                'data' => $wallet,
                "response"=>$response
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Entity created but encountered an error contacting fabric server.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getToEntities(Request $request)
    {
        $user = Auth::user();
        $entID = $user->entID ?? null;

        if (!$entID) {
            return response()->json(['message' => 'Unauthorized: entID not found'], 403);
        }

        $connectedEntities = ConnectedEntity::where('entID', '!=', $entID)->get();
        return response()->json($connectedEntities, 200);
    }
}
