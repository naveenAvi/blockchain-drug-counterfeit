<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LocalDrugWallet;
use App\Models\corp_transactions;

class DrugTransactionController extends Controller
{
    public function index()
    {
        return response()->json(corp_transactions::all(), 200);
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
}
