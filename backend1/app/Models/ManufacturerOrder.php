<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ManufacturerOrder extends Model
{
    protected $table = 'manufacturer_orders';

    protected $primaryKey = 'order_number';

    public $incrementing = true; 
    protected $keyType = 'int';

    protected $fillable = [
        "order_number",
        'invoice_number',
        'reference_document',
        'manufacturer_id',
        'importer_id',
        'order_date',
        'status',
        'total_amount',
        "createdAMount",
        'notes',
        'drugid',
        "message"
    ];

    protected $casts = [
        'order_date' => 'date',
        'drugid' => 'integer',
        'status' => 'string'
    ];
    public function drug()
    {
        return $this->belongsTo(Drug::class, "drugid",'id');
    }

    public function manufacturer()
    {
        return $this->belongsTo(ConnectedEntity::class, "manufacturer_id",'id');
    }
    public function importer()
    {
        return $this->belongsTo(ConnectedEntity::class, "importer_id",'id');
    }
    public function transactions()
    {
        return $this->hasMany(corp_transactions::class,'referenceNo',"order_number");
    }
}
