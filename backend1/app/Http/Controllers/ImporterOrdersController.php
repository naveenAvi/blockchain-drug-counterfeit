<?php

namespace App\Http\Controllers;

use App\Models\ImporterOrder;
use App\Models\ManufacturerOrder;
use App\Models\ConnectedEntity;
use Auth;
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

    public function shows()
    {
        $order = ImporterOrder::get()->load('drug', "manufacturer","importer");


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
            "drugid" => 'required|integer',
        ]);

        $order = ImporterOrder::create($validated);
        $validated['importerOrderID']= $order->id;
        $order = ManufacturerOrder::create($validated);

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

        $allOrdersCount = ImporterOrder::where('manufacturer_id', $connectedEntity->id)->count();
        $allOrdersSum = ImporterOrder::where('manufacturer_id', $connectedEntity->id)->sum('total_amount');

        $pendingCount = ImporterOrder::where([
            'importer_id'=> $connectedEntity->id,
            'status' => 'pending'
        ])->count();
        $pendingSum = ImporterOrder::where([
            'importer_id'=> $connectedEntity->id,
            'status' => 'pending'
        ])->sum('total_amount');

        $createdCount = ImporterOrder::where([
            'importer_id'=> $connectedEntity->id,
            'status' => 'created'
        ])->count();
        $createdSum = ImporterOrder::where([
            'importer_id'=> $connectedEntity->id,
            'status' => 'created'
        ])->sum('total_amount');

        $rejectedCount = ImporterOrder::where([
            'importer_id'=> $connectedEntity->id,
            'status' => 'rejected'
        ])->count();
        $rejectedSum = ImporterOrder::where([
            'importer_id'=> $connectedEntity->id,
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
