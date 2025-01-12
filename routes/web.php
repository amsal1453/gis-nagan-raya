<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/kecamatan', function () {
    return Inertia::render('kecamtan/Index');
})->middleware(['auth', 'verified'])->name('data-kecamatan.index');




require __DIR__.'/auth.php';
