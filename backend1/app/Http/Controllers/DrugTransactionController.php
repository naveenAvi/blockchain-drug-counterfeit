<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LocalDrugWallet;
use App\Models\corp_transactions;
use App\Http\Requests;
use App\Models\ConnectedEntity;
use App\Models\local_drug_wallet;
use Auth;
use App\Models\EntityCredentials;
use App\Services\FabricAuthService;
use Http;

class DrugTransactionController extends Controller
{
    public function index()
    {
        return response()->json(corp_transactions::get()->load('to', "from", "drug"), 200);
    }

    public function getTransactionsByReference($referenceNo)
    {
        return response()->json(corp_transactions::where("referenceNo", $referenceNo)->get()->load('to', "from", "drug"), 200);
    }

    public function show($id)
    {
        $transaction = corp_transactions::find($id);
        return $transaction
            ? response()->json($transaction, 200)
            : response()->json(['message' => 'Not Found'], 404);
    }

    public function showByDrugId($drugid)
    {
        $records = corp_transactions::where('drugid', $drugid)->get();
        return response()->json($records, 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'drugid' => 'required|integer',
            'fromEntID' => 'required|integer',
            'toEntID' => 'required|integer',
            'amount' => 'nullable|integer',
            'status' => 'in:pending,success,rejected',
        ]);

        $transaction = corp_transactions::create($validated);
        return response()->json($transaction, 201);
    }

    public function update(Request $request, $id)
    {
        $transaction = corp_transactions::find($id);
        if (!$transaction) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $transaction->update($request->all());
        return response()->json($transaction, 200);
    }
    public function getAssetHistory(Request $request){

        $referenceNumber = $request->referenceNumber;
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

        $fabricAuth = new FabricAuthService();
        $credentials = EntityCredentials::where('entityID', $entID)->first();
        if (!$credentials) {
            return response()->json([
                'success' => false,
                'message' => 'No credentials found for this manufacturer.',
            ], 404);
        }
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
            $response = Http::withToken($token)->post('http://20.193.133.149:3000/api/getAssetHistorysimple', [
                'username' => $connectedEntity->name . ".manu", 
                'org' => 'Org1',
                "assetID"=>$referenceNumber
            ]);
            $response = $response->json();
            return response()->json([
                "response"=>$response
            ]);


            } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Entity created but encountered an error contacting fabric server.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
}
