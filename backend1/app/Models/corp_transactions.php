<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class corp_transactions extends Model
{
    protected $table = 'ent_transactions';

    protected $primaryKey = 'transactionID';

    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'drugid',
        'fromEntID',
        'toEntID',
        'amount',
        'status',
        "referenceNo"
    ];
}
