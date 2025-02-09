<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Village;
use App\Models\Category;
use App\Models\Subdistrict;
use App\Models\SpatialData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use MatanYadaev\EloquentSpatial\Objects\Point;
use MatanYadaev\EloquentSpatial\Objects\Polygon;
use MatanYadaev\EloquentSpatial\Objects\LineString;

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
            ],
            'villages' => Village::all(),
            'categories' => Category::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('SpatialData/Create', [
            'villages' => Village::all(),
            'categories' => Category::all(),
            'subdistricts' => Subdistrict::all(),
        ]);
    }
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'subdistrict_id' => 'required|exists:subdistricts,id',
                'village_id' => 'required|exists:villages,id',
                'name_spatial' => 'required|string|max:255',
                'description' => 'nullable|string',
                'location' => 'nullable|string',
                'area' => 'nullable|string',
                'line' => 'nullable|string',
                'categories' => 'required|array',
                'categories.*' => 'exists:categories,id',
            ]);

            DB::beginTransaction();

            try {
                $spatialData = new SpatialData();
                $spatialData->subdistrict_id = $validated['subdistrict_id'];
                $spatialData->village_id = $validated['village_id'];
                $spatialData->name_spatial = $validated['name_spatial'];
                $spatialData->description = $validated['description'];
                $spatialData->created_by = Auth::id();

                // Handle Area (Polygon)
                if ($request->area) {
                    $areaData = json_decode($request->area, true);
                    if (isset($areaData['coordinates']) && is_array($areaData['coordinates'])) {
                        $points = [];
                        foreach ($areaData['coordinates'][0] as $coord) {
                            $points[] = new Point($coord[1], $coord[0]); // [latitude, longitude]
                        }
                        $lineString = new LineString($points);
                        $spatialData->area = new Polygon([$lineString]);
                    }
                }

                // Handle Location (Point)
                if ($request->location) {
                    $locationData = json_decode($request->location, true);
                    if (isset($locationData['coordinates'])) {
                        $spatialData->location = new Point(
                            $locationData['coordinates'][1], // latitude
                            $locationData['coordinates'][0]  // longitude
                        );
                    }
                }

                // Handle Line (LineString)
                if ($request->line) {
                    $lineData = json_decode($request->line, true);
                    if (isset($lineData['coordinates'])) {
                        $points = [];
                        foreach ($lineData['coordinates'] as $coord) {
                            $points[] = new Point($coord[1], $coord[0]); // [latitude, longitude]
                        }
                        $spatialData->line = new LineString($points);
                    }
                }

                if (!$spatialData->save()) {
                    throw new \Exception('Failed to save spatial data');
                }

                // Attach categories
                if (!empty($validated['categories'])) {
                    $spatialData->categories()->attach($validated['categories']);
                }

                DB::commit();

                return redirect()->route('spatial-data.index')
                ->with('success', 'Data spasial berhasil ditambahkan.');
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error('Inner try-catch error: ' . $e->getMessage());
                throw $e;
            }
        } catch (\Exception $e) {
            Log::error('Outer try-catch error: ' . $e->getMessage());
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    public function show($id)
    {
        try {
            $spatialData = SpatialData::with(['subdistrict', 'village', 'categories', 'user'])
            ->findOrFail($id);

            return Inertia::render('SpatialData/Show', [
                'spatialData' => $spatialData
            ]);
        } catch (\Exception $e) {
            return redirect()->route('spatial-data.index')
            ->with('error', 'Data spasial tidak ditemukan.');
        }
    }

    public function edit($id)
    {
        try {
            $spatialData = SpatialData::with(['categories'])->findOrFail($id);

            return Inertia::render('SpatialData/Edit', [
                'spatialData' => $spatialData,
                'villages' => Village::all(),
                'categories' => Category::all(),
                'subdistricts' => Subdistrict::all(),
            ]);
        } catch (\Exception $e) {
            return redirect()->route('spatial-data.index')
            ->with('error', 'Data spasial tidak ditemukan.');
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'subdistrict_id' => 'required|exists:subdistricts,id',
                'village_id' => 'required|exists:villages,id',
                'name_spatial' => 'required|string|max:255',
                'description' => 'nullable|string',
                'location' => 'nullable|string',
                'area' => 'nullable|string',
                'line' => 'nullable|string',
                'categories' => 'required|array',
                'categories.*' => 'exists:categories,id',
            ]);



            DB::beginTransaction();

            try {
                $spatialData = SpatialData::findOrFail($id);
                $spatialData->subdistrict_id = $validated['subdistrict_id'];
                $spatialData->village_id = $validated['village_id'];
                $spatialData->name_spatial = $validated['name_spatial'];
                $spatialData->description = $validated['description'];
                $spatialData->created_by = Auth::id();

                // Handle Area (Polygon)
                if ($request->area) {
                    $areaData = json_decode($request->area, true);
                    if (isset($areaData['coordinates']) && is_array($areaData['coordinates'])) {
                        $points = [];
                        foreach ($areaData['coordinates'][0] as $coord) {
                            $points[] = new Point($coord[1], $coord[0]);
                        }
                        $lineString = new LineString($points);
                        $spatialData->area = new Polygon([$lineString]);
                    }
                } else {
                    $spatialData->area = null;
                }

                // Handle Location (Point)
                if ($request->location) {
                    $locationData = json_decode($request->location, true);
                    if (isset($locationData['coordinates'])) {
                        $spatialData->location = new Point(
                            $locationData['coordinates'][1],
                            $locationData['coordinates'][0]
                        );
                    }
                } else {
                    $spatialData->location = null;
                }

                // Handle Line (LineString)
                if ($request->line) {
                    $lineData = json_decode($request->line, true);
                    if (isset($lineData['coordinates'])) {
                        $points = [];
                        foreach ($lineData['coordinates'] as $coord) {
                            $points[] = new Point($coord[1], $coord[0]);
                        }
                        $spatialData->line = new LineString($points);
                    }
                } else {
                    $spatialData->line = null;
                }

                if (!$spatialData->save()) {
                    throw new \Exception('Failed to update spatial data');
                }

                // Sync categories
                $spatialData->categories()->sync($validated['categories']);

                DB::commit();

                return redirect()->route('spatial-data.index')
                ->with('success', 'Data spasial berhasil diperbarui.');
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error('Inner try-catch error: ' . $e->getMessage());
                throw $e;
            }
        } catch (\Exception $e) {
            Log::error('Outer try-catch error: ' . $e->getMessage());
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        $spatialData = SpatialData::findOrFail($id);

        DB::beginTransaction();

        try {
            // Detach categories
            $spatialData->categories()->detach();

            // Delete the spatial data
            $spatialData->delete();

            DB::commit();

            return redirect()->route('spatial-data.index')
            ->with('success', 'Data spasial berhasil dihapus.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error deleting spatial data: ' . $e->getMessage());
            return redirect()->back()
                ->withErrors(['error' => 'Terjadi kesalahan saat menghapus data spasial: ' . $e->getMessage()]);
        }
    }
}
