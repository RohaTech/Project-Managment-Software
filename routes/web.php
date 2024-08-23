<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ProjectMemberController;
use App\Models\ActivityLog;
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

    // Get project IDs where the user is a member
    $projectIds = Project::whereHas('members', function ($query) use ($userId) {
        $query->where('user_id', $userId);
    })->pluck('id');


    // Get activity logs related to these projects and activities created by the project members
    $activityLogs = ActivityLog::whereIn('project_id', $projectIds)
        ->orWhereIn('user_id', function ($query) use ($projectIds) {
            $query->select('user_id')
                ->from('project_members')
                ->whereIn('project_id', $projectIds);
        })
        ->get();

    // Fetch projects with their creator, updater, and related activities
    $projects = Project::whereIn('id', $projectIds)
        ->with(['creator', 'updateBy', 'activities'])
        ->latest()
        ->get();

    return Inertia::render('Home', [
        'user' => auth()->user(),
        'projects' => $projects,
        'activities' => $activityLogs,
    ]);
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
