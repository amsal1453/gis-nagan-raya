<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VillageController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\CategoriController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SpatialDataController;
use App\Http\Controllers\SubdistirictController;

Route::get('/', [WelcomeController::class,'index'])->name('home');

Route::get('/dashboard', [DashboardController::class,'Dashboard'])
->middleware(['auth', 'verified'])->name('dashboard');

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

        Route::get('/spatial-data/export-pdf', [SpatialDataController::class, 'exportPdf'])
            ->name('spatial-data.export-pdf');
    });

    Route::post('/profile/photo', [ProfileController::class, 'updateProfilePhoto'])
        ->name('profile.photo.update')
        ->middleware(['auth']);
});












require __DIR__ . '/auth.php';
