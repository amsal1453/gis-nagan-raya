<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SpatialData extends Model
{
    protected $fillable = [
        'subdistrict_id',
        'village_id',
        'name_spatial',
        'boundary_spatial',
        'created_by',
    ];

    protected $geometry = [
        'boundary_spatial',
    ];

    public function subdistrict(): BelongsTo
    {
        return $this->belongsTo(Subdistrict::class);
    }

    public function village(): BelongsTo
    {
        return $this->belongsTo(Village::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'spatial_categories', 'spatial_id', 'category_id')->withTimestamps();
    }
}
