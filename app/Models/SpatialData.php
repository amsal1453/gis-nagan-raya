<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Traits\HasSpatial;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use MatanYadaev\EloquentSpatial\Objects\LineString;
use MatanYadaev\EloquentSpatial\Objects\Polygon;

class SpatialData extends Model
{
    use HasSpatial;

    protected $fillable = [
        'subdistrict_id',
        'village_id',
        'name_spatial',
        'description',
        'location',
        'area',
        'line',
        'created_by',
    ];

    protected $casts =[
        'location' => Point::class,
        'area' => Polygon::class,
        'line' => LineString::class
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

    // Method untuk membuat Point
    public static function createPoint($latitude, $longitude)
    {
        return new Point($latitude, $longitude);
    }

    // Method untuk membuat Polygon
    public static function createPolygon(array $coordinates)
    {
        return new Polygon($coordinates);
    }

    // Method untuk membuat LineString
    public static function createLineString(array $coordinates)
    {
        return new LineString($coordinates);
    }
}
