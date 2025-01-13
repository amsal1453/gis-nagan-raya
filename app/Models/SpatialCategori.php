<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Relations\Pivot;

class SpatialCategori extends Pivot
{
    protected $table = 'spatial_categories';

    public $incrementing = true;
}
