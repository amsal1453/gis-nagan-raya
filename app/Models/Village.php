<?php

namespace App\Models;

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

    protected $geometry = [
        'boundary_village',
    ];

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
