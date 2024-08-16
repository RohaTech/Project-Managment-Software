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
})->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Home');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});






require __DIR__ . '/auth.php';
require __DIR__ . '/project.php';
require __DIR__ . '/task.php';

use App\Http\Controllers\ProjectMemberController;
#all route about the project memeber
Route::middleware('auth')->group(function () {
    Route::get('/projectmembers', [ProjectMemberController::class, 'index'])->name('projectmembers.index');
    Route::get('/projectmembers/create', [ProjectMemberController::class, 'create'])->name('projectmembers.create');
    Route::get('/projectmembers/{projectMember}', [ProjectMemberController::class, 'show'])->name('projectmembers.show');
    Route::post('/projectmembers/store', [ProjectMemberController::class, 'store'])->name('projectmembers.store');
    Route::get('/projectmembers/{projectMember}/edit', [ProjectMemberController::class, 'edit'])->name('projectmembers.edit');
    Route::put('/projectmembers/{projectMember}', [ProjectMemberController::class, 'update'])->name('projectmembers.update');
    Route::delete('/projectmembers/{projectMember}', [ProjectMemberController::class, 'destroy'])->name('projectmembers.destroy');

});











