<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Village extends Model
{
    protected $fillable = [
        'subdistrict_id',
        'name_village',
        'code_village',
        'boundary_village',
    ];

    public function getBoundaryVillageAttribute($value)
    {
        if ($value) {
            return DB::select("SELECT ST_AsGeoJSON(?) as geojson", [$value])[0]->geojson;
        }
        return null;
    }

    public function subdistrict(): BelongsTo
    {
        return $this->belongsTo(Subdistrict::class);
    }

    public function spatialData(): HasMany
    {
        return $this->hasMany(SpatialData::class, 'village_id');
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }
}
