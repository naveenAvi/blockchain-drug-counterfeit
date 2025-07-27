<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImporterOrder extends Model
{

    protected $table = 'importer_orders';

    protected $primaryKey = 'order_number';

    public $incrementing = true; 
    protected $keyType = 'int';

    protected $fillable = [
        // "id",
        "order_number",
        'invoice_number',
        'reference_document',
        'manufacturer_id',
        'importer_id',
        'order_date',
        'status',
        'total_amount',
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
}
