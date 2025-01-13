<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'name_category',
        
    ];

    public function spatialData()
    {
        return $this->belongsToMany(spatialData::class,'spatial_categories', 'category_id', 'spatial_id')->withTimestamps();
    }

    
}
