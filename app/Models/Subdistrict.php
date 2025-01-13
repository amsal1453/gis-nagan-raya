<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subdistrict extends Model
{
    protected $fillable = [
        'name_subdistrict',
        'code_subdistrict',
        'boundary_subdistrict',
    ];

    protected $geometry = [
        'boundary_subdistrict',
    ];

    public function village(): HasMany
    {
        return $this->hasMany(Village::class, 'subdistrict_id');
    }

    public function spatialData(): HasMany
    {
        return $this->hasMany(SpatialData::class, 'subdistrict_id');
    }
}
