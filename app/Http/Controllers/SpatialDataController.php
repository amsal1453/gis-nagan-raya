<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Village;
use App\Models\Category;
use App\Models\SpatialData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class SpatialDataController extends Controller
{
    public function index(Request $request) 
    {
        // Dapatkan user yang sedang login
        $user = Auth::user();

        // Base query dengan eager loading relasi yang dibutuhkan
        $query = SpatialData::with(['subdistrict', 'village', 'user', 'categories']);

        // Filter berdasarkan role
        if ($user->hasRole('admin_desa')) {
            // Admin desa hanya bisa melihat data desanya sendiri
            $query->where('village_id', $user->village_id);
        }
        // Admin kecamatan bisa melihat semua data
        elseif ($user->hasRole('admin_kecamatan')) {
            // Jika ada filter subdistrict_id
            if ($request->has('subdistrict_id')) {
                $query->where('subdistrict_id', $request->subdistrict_id);
            }
            // Jika ada filter village_id
            if ($request->has('village_id')) {
                $query->where('village_id', $request->village_id);
            }
        }

        // Filter berdasarkan nama jika ada
        if ($request->has('search')) {
            $query->where('name_spatial', 'like', '%' . $request->search . '%');
        }

        // Filter berdasarkan kategori jika ada
        if ($request->has('category')) {
            $query->whereHas('categories', function ($q) use ($request) {
                $q->where('category_id', $request->category);
            });
        }

        // Pagination dengan 10 item per halaman
        $spatialData = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('SpatialData/Index', [
            'spatialData' => $spatialData,
            'filters' => [
                'search' => $request->search,
                'subdistrict_id' => $request->subdistrict_id,
                'village_id' => $request->village_id,
                'category' => $request->category,
            ],
            'can' => [
                'create' => $user->can('kelola-data-spasial'),
                'edit' => $user->can('kelola-data-spasial'),
                'delete' => $user->can('kelola-data-spasial'),
            ]
        ]);
    }


}
