<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionStatusModel extends Model
{
    protected $table = 'transaction_status';

    protected $primaryKey = 'order_number';

    public $incrementing = true; 
    protected $keyType = 'int';

    protected $fillable = [
        "statusid",
        'type',
        'stage',
        'passfail',
        'message',
        'eventReferenceNumber'
    ];

    protected $casts = [
        'type' => 'integer'
    ];
}
