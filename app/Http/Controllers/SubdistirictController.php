<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Subdistrict;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class SubdistirictController extends Controller
{
    public function index()
    {
        $subdistricts = Subdistrict::all();
        return Inertia::render('Subdistirict/Index', [
            'subdistricts' => $subdistricts
        ]);
    }


    public function create()
    {
        return Inertia::render('Subdistirict/Create');
    }


    public function store(Request $request)
    {
        // SubdistrictController.php
        $data = $request->validate([
            'name_subdistrict' => 'required|string',
            'code_subdistrict' => 'required|string',
            'boundary_subdistrict' => 'required|json',
        ]);

        try {
            $boundary = json_decode($data['boundary_subdistrict'], true);
            // Pastikan data sudah dalam format GeoJSON lengkap
            if (!isset($boundary['type']) || !isset($boundary['coordinates'])) {
                $boundary = [
                    'type' => 'Polygon',
                    'coordinates' => [$boundary]  // Wrap dalam array jika hanya coordinates
                ];
            }

            Subdistrict::create([
                'name_subdistrict' => $data['name_subdistrict'],
                'code_subdistrict' => $data['code_subdistrict'],
                'boundary_subdistrict' => DB::raw("ST_GeomFromGeoJSON('" . json_encode($boundary) . "')"),
            ]);

            return redirect()->route('subdistricts.index')->with('success', 'Data berhasil disimpan');
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Error: ' . $e->getMessage()]);
        }
    }

    public function edit(Subdistrict $subdistrict)
    {
        return Inertia::render('Subdistirict/Edit', [
            'subdistrict' => $subdistrict
        ]);
    }

    public function update(Request $request, Subdistrict $subdistrict)
    {
        $data = $request->validate([
            'name_subdistrict' => 'required|string',
            'code_subdistrict' => 'required|string',
            'boundary_subdistrict' => 'required|json',
        ]);

        try {
            $boundary = json_decode($data['boundary_subdistrict'], true);

            if (!isset($boundary['type']) || !isset($boundary['coordinates'])) {
                $boundary = [
                    'type' => 'Polygon',
                    'coordinates' => $boundary['coordinates'] ?? $boundary
                ];
            }

            $subdistrict->update([
                'name_subdistrict' => $data['name_subdistrict'],
                'code_subdistrict' => $data['code_subdistrict'],
                'boundary_subdistrict' => DB::raw("ST_GeomFromGeoJSON('" . json_encode($boundary) . "')")
            ]);

            return redirect()->route('subdistricts.index')
            ->with('success', 'Subdistrict updated successfully');
        } catch (\Exception $e) {
            return back()->withErrors(['message' => 'Error: ' . $e->getMessage()]);
        }
    }

    public function destroy($id){

        $data = Subdistrict::findOrFail($id);
        $data->delete();

        return redirect()->route('subdistricts.index')->with('success', 'Data berhasil dihapus');

    }
}
