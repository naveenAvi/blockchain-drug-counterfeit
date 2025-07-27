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
        "assetsID",
        "batchID",
        'fromEntID',
        'toEntID',
        'amount',
        'status',
        "referenceNo"
    ];

    public function from()
    {
        return $this->belongsTo(ConnectedEntity::class,  "fromEntID",'entID');
    }
    public function to()
    {
        return $this->belongsTo(ConnectedEntity::class,  'toEntID', 'entID');
    }
    public function drug()
    {
        return $this->belongsTo(Drug::class,  'drugid', 'drug_id');
    }
}
