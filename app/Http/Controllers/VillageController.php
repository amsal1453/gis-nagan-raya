<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Village;
use App\Models\Subdistrict;
use Illuminate\Http\Request;
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
            ->with('subdistrict: id, name_subdistrict')
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
}
