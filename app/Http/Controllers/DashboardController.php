<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Village;
use App\Models\Category;
use App\Models\SpatialData;
use App\Models\Subdistrict;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function dashboard()
    {
        $stats = [
            // Statistik dasar
            'totalSubdistricts' => Subdistrict::count(),
            'totalVillages' => Village::count(),
            'totalSpatialData' => SpatialData::count(),
            'totalCategories' => Category::count(),

            // Data per kecamatan
            'spatialDataBySubdistrict' => Subdistrict::withCount('spatialData')
                ->get()
                ->map(function ($subdistrict) {
                    return [
                        'name' => $subdistrict->name_subdistrict,
                        'count' => $subdistrict->spatial_data_count
                    ];
                }),

            // Data per kategori
            'spatialDataByCategory' => Category::withCount('spatialData')
                ->get()
                ->map(function ($category) {
                    return [
                        'name' => $category->name_category,
                        'value' => $category->spatial_data_count
                    ];
                }),

            // Tren data spasial (jumlah per bulan untuk tahun ini)
            'spatialDataTrend' => collect(range(1, 12))
                ->map(function ($month) {
                    return [
                        'name' => date('M', mktime(0, 0, 0, $month, 10)),
                        'value' => SpatialData::whereYear('created_at', date('Y'))
                            ->whereMonth('created_at', $month)
                            ->count()
                    ];
                }),

            // Tipe data spasial
            'spatialDataByType' => collect(range(1, 12))
                ->map(function ($month) {
                    return [
                        'name' => date('M', mktime(0, 0, 0, $month, 10)),
                        'point' => SpatialData::whereYear('created_at', date('Y'))
                            ->whereMonth('created_at', $month)
                            ->whereNotNull('location')
                            ->count(),
                        'line' => SpatialData::whereYear('created_at', date('Y'))
                            ->whereMonth('created_at', $month)
                            ->whereNotNull('line')
                            ->count(),
                        'polygon' => SpatialData::whereYear('created_at', date('Y'))
                            ->whereMonth('created_at', $month)
                            ->whereNotNull('area')
                            ->count(),
                    ];
                }),

            // Data per desa
            'spatialDataByVillage' => Village::withCount('spatialData')
                ->orderByDesc('spatial_data_count')
                ->get()
                ->map(function ($village) {
                    return [
                        'name' => $village->name_village,
                        'count' => $village->spatial_data_count
                    ];
                }),

            // Aktivitas terbaru
            'recentActivities' => SpatialData::with(['user', 'categories', 'village'])
                ->latest()
                ->take(10)
                ->get()
                ->map(function ($data) {
                    return [
                        'name' => $data->name_spatial,
                        'category' => $data->categories->first() ? $data->categories->first()->name_category : 'Tidak ada kategori',
                        'location' => $data->village ? $data->village->name_village : 'Tidak diketahui',
                        'user' => $data->user ? $data->user->name : 'Admin',
                        'date' => $data->created_at->format('d M Y H:i')
                    ];
                })
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats
        ]);
    }
}
