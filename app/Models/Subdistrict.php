<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subdistrict extends Model
{
    protected $fillable = [
        'name_subdistrict',
        'code_subdistrict',
        'boundary_subdistrict',
    ];

    public function getBoundarySubdistrictAttribute($value)
    {
        if ($value) {
            return DB::select("SELECT ST_AsGeoJSON(?) as geojson", [$value])[0]->geojson;
        }
        return null;
    }


    public function village(): HasMany
    {
        return $this->hasMany(Village::class, 'subdistrict_id');
    }

    public function spatialData(): HasMany
    {
        return $this->hasMany(SpatialData::class, 'subdistrict_id');
    }
}
