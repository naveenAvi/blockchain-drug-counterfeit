<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ConnectedEntity;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

use function Pest\Laravel\json;

class ConnectedEntityController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->query('type');

        $query = ConnectedEntity::query();

        if ($type) {
            $query->where('type', $type);
        }

        $entities = $query->orderBy('name')->get();

        return response()->json([
            'success' => true,
            'message' => 'Entities retrieved successfully.',
            'data' => $entities
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:manufacturer,importer,distributor,pharmacy',
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'country' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'company_email' => 'required|email|max:255',
            'license_type' => 'nullable|string|max:255',
            'license_number' => 'nullable|string|max:255',
            'established_year' => 'required|digits:4|integer|min:1800|max:' . (date('Y') + 1),
            'logo' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('logo')) {
            $validated['logo_path'] = $request->file('logo')->store('logos', 'public');
        }

        $prefixMap = [
            'manufacturer' => 'manu',
            'importer' => 'imp',
            'distributor' => 'dist',
            'pharmacy' => 'pharm',
        ];
        $prefix = $prefixMap[$validated['type']];

        $count = ConnectedEntity::where('type', $validated['type'])->count() + 1;

        $entID = $prefix . str_pad($count, 5, '0', STR_PAD_LEFT);
        $validated['entID'] = $entID;

        $validated['is_active'] = 1;

        $entity = ConnectedEntity::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Entity created successfully.',
            'data' => $entity
        ], 201);
    }


    public function edit(ConnectedEntity $connectedEntity)
    {
        dd("asdad");

        return view('connected_entities.edit', compact('connectedEntity'));
    }

    public function update(Request $request, ConnectedEntity $connectedEntity)
    {
        dd("asdad");

        $validated = $request->validate([
            'type' => 'required|in:manufacturer,importer,distributor,pharmacy',
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'country' => 'required|string|max:255',
            'contact' => 'required|string|max:255',
            'license_type' => 'nullable|string|max:255',
            'license_number' => 'nullable|string|max:255',
            'established_year' => 'required|digits:4|integer|min:1800|max:' . (date('Y') + 1),
            'logo' => 'nullable|image|max:2048',
            'is_active' => 'required|boolean'
        ]);

        if ($request->hasFile('logo')) {
            if ($connectedEntity->logo_path) {
                Storage::disk('public')->delete($connectedEntity->logo_path);
            }
            $validated['logo_path'] = $request->file('logo')->store('logos', 'public');
        }

        $connectedEntity->update($validated);

        return redirect()->route('connected-entities.index')->with('success', 'Entity updated successfully!');
    }

    public function show($id)
    {
        $entity = ConnectedEntity::where('entID', $id)->firstOrFail();


        return response()->json([
            'success' => true,
            'data' => $entity
        ]);
    }
    public function users_show($entityId)
    {
        $users = User::where('entID', $entityId)->get();

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }
}
