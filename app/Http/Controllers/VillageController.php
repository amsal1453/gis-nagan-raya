<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Village;
use App\Models\Subdistrict;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;


class VillageController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', Village::class);

        $villages = Village::query()
            ->when(auth()->user()->hasRole('admin_desa'), function ($query) {
                $query->where('id', auth()->user()->village_id);
            })
            ->with('subdistrict:id,name_subdistrict')
            ->get();

        return Inertia::render('Villages/Index', [
            'villages' => $villages,
            'can' => [
                'create' => auth()->user()->can('create', Village::class),
                'edit' => auth()->user()->hasPermissionTo('kelola-data-desa'),
                'delete' => auth()->user()->can('delete', Village::class),
            ]
        ]);
    }

    public function create()
    {
        $this->authorize('create', Village::class);

        return Inertia::render('Villages/Create', [
            'subdistricts' => Subdistrict::select('id', 'name_subdistrict')->get()
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'subdistrict_id' => 'required|exists:subdistricts,id',
            'name_village' => 'required|string',
            'code_village' => 'required|string',
            'boundary_village' => 'required|json',
        ]);

        try {
            $boundary = json_decode($data['boundary_village'], true);


            if (!isset($boundary['type']) || !isset($boundary['coordinates'])) {
                $boundary = [
                    'type' => 'Polygon',
                    'coordinates' => [$boundary]
                ];
            }

            Village::create([
                'subdistrict_id' => $data['subdistrict_id'],
                'name_village' => $data['name_village'],
                'code_village' => $data['code_village'],
                'boundary_village' => DB::raw("ST_GeomFromGeoJSON('" . json_encode($boundary) . "')"),
            ]);

            return redirect()->route('village.index')->with('success', 'Data berhasil disimpan');
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Error: ' . $e->getMessage()]);
        }
    }


    public function show(Village $village): Inertia
    {

        $village->load('subdistrict');


        $boundary = DB::select("SELECT ST_AsGeoJSON(boundary_village) as geojson FROM villages WHERE id = ?", [$village->id])[0]->geojson;

        return Inertia::render('Villages/Show', [
            'village' => [
                'id' => $village->id,
                'name_village' => $village->name_village,
                'code_village' => $village->code_village,
                'subdistrict' => $village->subdistrict,
                'boundary' => json_decode($boundary),
                'created_at' => $village->created_at,
                'updated_at' => $village->updated_at
            ]
        ]);
    }
}
