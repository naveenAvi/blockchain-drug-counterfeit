<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drug extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'dosages',
        'specifications',
        'image',
        'drug_id',
        'active_ingredients',
        'excipients',
        'strength',
        'dosage_form',
        'route_of_administration',
        'packaging_type',
        'storage_conditions',
        'shelf_life',
        'gs1_gtin',
        'regulatory_approval_region',
        'national_drug_code',
        'marketing_authorization_holder',
        'controlled_substance_schedule',
    ];

    protected $casts = [
        'dosages' => 'array',
    ];
} 