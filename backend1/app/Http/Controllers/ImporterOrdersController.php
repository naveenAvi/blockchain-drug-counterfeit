<?php

namespace App\Http\Controllers;

use App\Models\ImporterOrder;
use Illuminate\Http\Request;

class ImporterOrdersController extends Controller
{
    public function show()
    {
        $order = ImporterOrder::get()->load('drug', "manufacturer","importer");

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

        $order = ImporterOrder::create($validated);

        return response()->json($order, 201);
    }

    public function update(Request $request, $order_number)
    {
        $order = ImporterOrder::findOrFail($order_number);

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
        $order = ImporterOrder::findOrFail($order_number);
        $order->delete();

        return response()->json(['message' => 'Order deleted']);
    }
}
