<?php

use App\Http\Controllers\ApiController;
use App\Http\Controllers\ProfileController;
use App\Models\Project;
use App\Models\Task;
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

    $allActivities = collect();
    foreach ($projects as $project) {
        $activities = $project->activities()->get(); // Get activities for each project
        $allActivities = $allActivities->merge($activities); // Merge activities into the collection
    }
    return Inertia::render('Home/Home', [
        'user' => auth()->user(),
        'projects' => $projects,
        'activities' => $allActivities,
    ]);
})->middleware(['auth', 'verified'])->name('home');

Route::get('/dashboard', function () {
    $userId = auth()->id();

    $projects = Project::whereHas('members', function ($query) use ($userId) {
        $query->where('user_id', $userId);
    })->get();

    $projectsCount = $projects->count();

    $tasks = Task::whereIn('project_id', $projects->pluck('id'))->get();


    $personalTasks = $tasks->filter(function ($task) use ($userId) {
        return $task->created_by === $userId || $task->assigned === $userId;
    });


    $taskStats = [
        'taskCount' => $tasks->count(),
        'taskCompleted' => $tasks->where('status', 'completed')->count(),
        'taskPending' => $tasks->where('status', 'pending')->count(),
        'taskInprogress' => $tasks->where('status', 'inprogress')->count(),
        'taskCancelled' => $tasks->where('status', 'cancelled')->count(),
    ];
    $personalTasksStats = [
        'taskCount' => $personalTasks->count(),
        'taskCompleted' => $personalTasks->where('status', 'completed')->count(),
        'taskPending' => $personalTasks->where('status', 'pending')->count(),
        'taskInprogress' => $personalTasks->where('status', 'inprogress')->count(),
        'taskCancelled' => $personalTasks->where('status', 'cancelled')->count(),
    ];

    return Inertia::render(
        'Dashboard/Dashboard',
        [
            'user' => auth()->user(),
            'projectsCount' => $projectsCount,
            'taskStats' => $taskStats,
            "personalTasksStats" => $personalTasksStats
        ]
    );
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/home/all-search', [ApiController::class, 'search'])->name('all.search');
    Route::get('/project-search', [ApiController::class, 'projectOnlySearch'])->name('project.search');
});

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
require __DIR__ . '/message.php';

