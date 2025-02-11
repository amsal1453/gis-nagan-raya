<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Village;
use App\Models\Category;
use App\Models\SpatialData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WelcomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'auth' => Auth::check(),
            'spatialData' => SpatialData::with(['village', 'subdistrict', 'categories'])->get(),
            'villages' => Village::all(),
            'categories' => Category::all(),
        ]);
    }
}
