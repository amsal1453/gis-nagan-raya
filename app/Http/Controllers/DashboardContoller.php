<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Village;
use App\Models\Category;
use App\Models\SpatialData;
use App\Models\Subdistrict;
use Illuminate\Http\Request;

class DashboardContoller extends Controller
{
    public function index()
    {
        $stats = [
            'totalSubdistricts' => Subdistrict::count(),
            'totalVillages' => Village::count(),
            'totalSpatialData' => SpatialData::count(),
            'totalCategories' => Category::count(),

            // Data per kecamatan
            'spatialDataBySubdistrict' => Subdistrict::withCount('spatialData')
                ->get()
                ->map(fn($subdistrict) => [
                    'name' => $subdistrict->name_subdistrict,
                    'count' => $subdistrict->spatial_data_count
                ]),

            // Data per kategori
            'spatialDataByCategory' => Category::withCount('spatialData')
                ->get()
                ->map(fn($category) => [
                    'name' => $category->name_category,
                    'value' => $category->spatial_data_count
                ])
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats
        ]);
    }
}
