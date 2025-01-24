<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Village;
use App\Models\Category;
use App\Models\SpatialData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SpatialDataController extends Controller
{
    public function index(Request $request)
    {

        $user = Auth::user();

        $query = SpatialData::query();

        if ($user->hasRole('admin_desa')) {
            $query->where('village_id', $user->village_id);
        }

        if ($user->hasRole('admin_kecamatan') && $request->has('village_id')) {
            $query->where('village_id', $request->village_id);
        }

        $spatialData = $query->with(['village', 'subdistrict', 'user'])
            ->latest()
            ->paginate(10);

        
        return Inertia::render('SpatialData/Index', [
            'spatialData' => $spatialData,

            'villages' => $user->hasRole('admin_kecamatan')
            ? Village::all()
                : null
        ]);
    }
}
