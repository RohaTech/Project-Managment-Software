<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProjectMemberController;
use App\Models\Project;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'user' => auth()->user()
    ]);
})->name('welcome');

Route::get('/home', function () {
    $userId = auth()->id();
    $projects = Project::whereHas('members', function ($query) use ($userId) {
        $query->where('user_id', $userId);
    })->with(['creator', 'updateBy']) // Load the creator relationship
        ->latest()
        ->get();

    return Inertia::render('Home', ['user' => auth()->user(), 'projects' => $projects]);
})->middleware(['auth', 'verified'])->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
require __DIR__ . '/project.php';
require __DIR__ . '/message.php';
require __DIR__ . '/projectmember.php';
require __DIR__ . '/task.php';
require __DIR__ . '/activityLogs.php';
require __DIR__ . '/subtask.php';
