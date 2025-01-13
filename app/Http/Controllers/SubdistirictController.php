<?php

namespace App\Http\Controllers;

use App\Models\Subdistrict;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SubdistirictController extends Controller
{
    public function index()
    {
        $subdistricts = Subdistrict::all();
        return Inertia::render('Subdistirict/Index',[
            'subdistricts' => $subdistricts
        ]);
    }


    public function create()
    {
        return Inertia::render('Subdistirict/Create');
    }
}
