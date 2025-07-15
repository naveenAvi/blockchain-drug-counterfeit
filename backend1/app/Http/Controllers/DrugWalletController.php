<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\LocalDrugWallet;
use App\Models\local_drug_wallet;
use Auth;

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

    public function showByDrugId($drugid)
    {
         $user = Auth::user();
        $entID = $user->entID ?? null; 

        if (!$entID) {
            return response()->json(['message' => 'Unauthorized: entID not found'], 403);
        }
        $records = local_drug_wallet::where(['drugid'=> $drugid, 'entID'=>$entID ])->first();
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
}
