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



use App\Http\Controllers\ProjectMemberController;
#all route about the project memeber
Route::get('/project-members', [ProjectMemberController::class, 'index'])->name('project-members.index');
Route::get('/project-members/{projectMember}', [ProjectMemberController::class, 'show'])->name('project-members.show');
Route::get('/project-members/create', [ProjectMemberController::class, 'create'])->name('project-members.create');
Route::post('/project-members', [ProjectMemberController::class, 'store'])->name('project-members.store');
Route::get('/project-members/{projectMember}/edit', [ProjectMemberController::class, 'edit'])->name('project-members.edit');
Route::put('/project-members/{projectMember}', [ProjectMemberController::class, 'update'])->name('project-members.update');
Route::delete('/project-members/{projectMember}', [ProjectMemberController::class, 'destroy'])->name('project-members.destroy');





require __DIR__ . '/auth.php';



