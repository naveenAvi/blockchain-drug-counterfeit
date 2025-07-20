<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EntityCredentials extends Model
{
    protected $table = 'entity_credentials'; 

    protected $fillable = [
        'entityID',
        'certificate_path',
        'private_key_path',
        'username',
        'pasword',   
        'secret',      
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
