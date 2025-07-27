<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class local_drug_wallet extends Model
{
    protected $table = 'local_drug_wallet';

    protected $primaryKey = 'drug_wallet_id';

    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'drugid',
        "assetsID",
        'entID',
        'ownerID',
        'batchID',
        'avail_amount',
    ];
}
