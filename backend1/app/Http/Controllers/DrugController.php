<?php

namespace App\Http\Controllers;

use App\Models\Drug;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DrugController extends Controller
{
    /**
     * Display a listing of the drugs.
     */
    public function index(): JsonResponse
    {
        $drugs = Drug::all();
        return response()->json([
            'success' => true,
            'data' => $drugs
        ]);
    }

    /**
     * Store a newly created drug in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'dosages' => 'nullable|array',
            'specifications' => 'nullable|string',
            'image' => 'nullable|string',
            'drugId' => 'required|string|unique:drugs,drug_id',
            'activeIngredients' => 'required|string',
            'excipients' => 'required|string',
            'strength' => 'required|string|max:255',
            'dosageForm' => 'required|string|max:255',
            'routeOfAdministration' => 'required|string|max:255',
            'packagingType' => 'required|string|max:255',
            'storageConditions' => 'required|string',
            'shelfLife' => 'required|string|max:255',
            'gs1Gtin' => 'required|string|max:255',
            'regulatoryApprovalRegion' => 'required|string|max:255',
            'nationalDrugCode' => 'required|string|max:255',
            'marketingAuthorizationHolder' => 'required|string|max:255',
            'controlledSubstanceSchedule' => 'required|string|max:255',
        ]);

        $drug = Drug::create([
            'name' => $request->name,
            'type' => $request->type,
            'dosages' => $request->dosages,
            'specifications' => $request->specifications,
            'image' => $request->image,
            'drug_id' => $request->drugId,
            'active_ingredients' => $request->activeIngredients,
            'excipients' => $request->excipients,
            'strength' => $request->strength,
            'dosage_form' => $request->dosageForm,
            'route_of_administration' => $request->routeOfAdministration,
            'packaging_type' => $request->packagingType,
            'storage_conditions' => $request->storageConditions,
            'shelf_life' => $request->shelfLife,
            'gs1_gtin' => $request->gs1Gtin,
            'regulatory_approval_region' => $request->regulatoryApprovalRegion,
            'national_drug_code' => $request->nationalDrugCode,
            'marketing_authorization_holder' => $request->marketingAuthorizationHolder,
            'controlled_substance_schedule' => $request->controlledSubstanceSchedule,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Drug created successfully',
            'data' => $drug
        ], 201);
    }

    /**
     * Display the specified drug.
     */
    public function show(Drug $drug): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $drug
        ]);
    }

    /**
     * Update the specified drug in storage.
     */
    public function update(Request $request, Drug $drug): JsonResponse
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|max:255',
            'dosages' => 'nullable|array',
            'specifications' => 'nullable|string',
            'image' => 'nullable|string',
            'drugId' => 'sometimes|required|string|unique:drugs,drug_id,' . $drug->id,
            'activeIngredients' => 'sometimes|required|string',
            'excipients' => 'sometimes|required|string',
            'strength' => 'sometimes|required|string|max:255',
            'dosageForm' => 'sometimes|required|string|max:255',
            'routeOfAdministration' => 'sometimes|required|string|max:255',
            'packagingType' => 'sometimes|required|string|max:255',
            'storageConditions' => 'sometimes|required|string',
            'shelfLife' => 'sometimes|required|string|max:255',
            'gs1Gtin' => 'sometimes|required|string|max:255',
            'regulatoryApprovalRegion' => 'sometimes|required|string|max:255',
            'nationalDrugCode' => 'sometimes|required|string|max:255',
            'marketingAuthorizationHolder' => 'sometimes|required|string|max:255',
            'controlledSubstanceSchedule' => 'sometimes|required|string|max:255',
        ]);

        $updateData = [];
        
        if ($request->has('name')) $updateData['name'] = $request->name;
        if ($request->has('type')) $updateData['type'] = $request->type;
        if ($request->has('dosages')) $updateData['dosages'] = $request->dosages;
        if ($request->has('specifications')) $updateData['specifications'] = $request->specifications;
        if ($request->has('image')) $updateData['image'] = $request->image;
        if ($request->has('drugId')) $updateData['drug_id'] = $request->drugId;
        if ($request->has('activeIngredients')) $updateData['active_ingredients'] = $request->activeIngredients;
        if ($request->has('excipients')) $updateData['excipients'] = $request->excipients;
        if ($request->has('strength')) $updateData['strength'] = $request->strength;
        if ($request->has('dosageForm')) $updateData['dosage_form'] = $request->dosageForm;
        if ($request->has('routeOfAdministration')) $updateData['route_of_administration'] = $request->routeOfAdministration;
        if ($request->has('packagingType')) $updateData['packaging_type'] = $request->packagingType;
        if ($request->has('storageConditions')) $updateData['storage_conditions'] = $request->storageConditions;
        if ($request->has('shelfLife')) $updateData['shelf_life'] = $request->shelfLife;
        if ($request->has('gs1Gtin')) $updateData['gs1_gtin'] = $request->gs1Gtin;
        if ($request->has('regulatoryApprovalRegion')) $updateData['regulatory_approval_region'] = $request->regulatoryApprovalRegion;
        if ($request->has('nationalDrugCode')) $updateData['national_drug_code'] = $request->nationalDrugCode;
        if ($request->has('marketingAuthorizationHolder')) $updateData['marketing_authorization_holder'] = $request->marketingAuthorizationHolder;
        if ($request->has('controlledSubstanceSchedule')) $updateData['controlled_substance_schedule'] = $request->controlledSubstanceSchedule;

        $drug->update($updateData);

        return response()->json([
            'success' => true,
            'message' => 'Drug updated successfully',
            'data' => $drug
        ]);
    }

    /**
     * Remove the specified drug from storage.
     */
    public function destroy(Drug $drug): JsonResponse
    {
        $drug->delete();

        return response()->json([
            'success' => true,
            'message' => 'Drug deleted successfully'
        ]);
    }
} 