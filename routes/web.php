<?php

use App\Http\Controllers\CategoriController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpatialDataController;
use App\Http\Controllers\SubdistirictController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VillageController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware(['role:admin_kecamatan'])->group(function () {

        Route::get('/subdistricts', [SubdistirictController::class,  'index'])->name('subdistricts.index');
        Route::get('/subdistricts/create', [SubdistirictController::class,  'create'])->name('subdistricts.create');
        Route::post('/subdistricts', [SubdistirictController::class,  'store'])->name('subdistricts.store');
        Route::get('/subdistricts/{subdistrict}/edit', [SubdistirictController::class, 'edit'])->name('subdistrict.edit');
        Route::put('/subdistricts/{subdistrict}', [SubdistirictController::class, 'update'])->name('subdistrict.update');
        Route::delete('/subdistricts/{id}', [SubdistirictController::class, 'destroy'])->name('subdistrict.destroy');

        Route::resource('/users', UserController::class);
    });

    Route::middleware(['role:admin_kecamatan|admin_desa'])->group(function () {
        Route::resource('/village', VillageController::class);
        Route::resource('/categories', CategoriController::class);
        Route::resource('/spatial-data', SpatialDataController::class);
    });
});












require __DIR__ . '/auth.php';
