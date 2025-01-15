<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubdistirictController;

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

    Route::middleware(['role:admin_kecamatan'])->group(function (){

       Route::get('/subdistricts', [SubdistirictController::class,  'index'])->name('subdistricts.index');
       Route::get('/subdistricts/create', [SubdistirictController::class,  'create'])->name('subdistricts.create');
       Route::post('/subdistricts', [SubdistirictController::class,  'store'])->name('subdistricts.store');

        Route::get('/subdistricts/{subdistrict}/edit', [SubdistirictController::class, 'edit'])->name('subdistrict.edit');
        Route::put('/subdistricts/{subdistrict}', [SubdistirictController::class, 'update'])->name('subdistrict.update');

        Route::delete('/subdistricts/{id}', [SubdistirictController::class, 'destroy'])->name('subdistrict.destroy');
    });


});

Route::get('/users', function () {
    return Inertia::render('Users/Index');
})->middleware(['auth', 'verified'])->name('akun-admin.index');

Route::get('/categori', function () {
    return Inertia::render('Categori/Index');
})->middleware(['auth', 'verified'])->name('data-kategori.index');

Route::get('/spasial', function () {
    return Inertia::render('spasial/Index');
})->middleware(['auth', 'verified'])->name('data-spasial.index');

Route::get('/desa', function () {
    return Inertia::render('desa/Index');
})->middleware(['auth', 'verified'])->name('data-desa.index');






require __DIR__.'/auth.php';
