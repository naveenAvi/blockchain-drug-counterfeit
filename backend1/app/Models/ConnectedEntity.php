<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Workbench\App\Models\User;

class ConnectedEntity extends Model
{

    /**
     * The table associated with the model.
     * (Optional if the table name is the plural snake_case of the model name)
     */
    protected $table = 'connectedEntities';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'type',
        'entID',
        'name',
        "email",
        'address',
        'country',
        'contact',
        'license_type',
        'license_number',
        'established_year',
        'logo_path',
        'is_active',
    ];

    /**
     * Cast attributes to specific types.
     */
    protected $casts = [
        'is_active' => 'boolean',
        'established_year' => 'integer',
    ];
    public function users()
    {
        return $this->belongsTo(User::class, 'entID');
    }
}
