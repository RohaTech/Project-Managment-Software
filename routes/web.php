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

    $AllProjects = Project::whereHas('members', function ($query) use ($userId) {
        $query->where('user_id', $userId);
    })->get();

    $projectsCount = $AllProjects->count();

    $tasks = Task::whereIn('project_id', $AllProjects->pluck('id'))->get();


    $personalTasks = $tasks->filter(function ($task) use ($userId) {
        return $task->created_by === $userId || $task->assigned === $userId;
    });


    $taskStats = [
        'taskCount' => $tasks->count(),
        'taskCompleted' => $tasks->where('status', 'Completed')->count(),
        'taskNotStarted' => $tasks->where('status', 'Not Started ')->count(),
        'taskInprogress' => $tasks->where('status', 'In Progress')->count(),
        'taskPostPoned' => $tasks->where('status', 'Postponed')->count(),
    ];
    $personalTasksStats = [
        'taskCount' => $personalTasks->count(),
        'taskCompleted' => $personalTasks->where('status', 'Completed')->count(),
        'taskNotStarted' => $personalTasks->where('status', 'Not Started')->count(),
        'taskInprogress' => $personalTasks->where('status', 'In Progress')->count(),
        'taskPostPoned' => $personalTasks->where('status', 'Postponed')->count(),
    ];

    return Inertia::render(
        'Dashboard/Dashboard',
        [
            'projectsCount' => $projectsCount,
            'taskStats' => $taskStats,
            "personalTasksStats" => $personalTasksStats,
            "projects" => $AllProjects
        ]
    );
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/home/all-search', [ApiController::class, 'search'])->name('all.search');
    Route::get('/project-search', [ApiController::class, 'projectOnlySearch'])->name('project.search');
    Route::get('/task-search', [ApiController::class, 'taskSearch'])->name('task.search');
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
