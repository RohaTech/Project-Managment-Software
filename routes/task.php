<?php

use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/task', [TaskController::class, 'index'])->name('task.index');
    Route::get('/task/create', [TaskController::class, 'create'])->name('task.create');
    Route::post('/task', [TaskController::class, 'store'])->name("task.store");
    Route::get('/task/{task}', [TaskController::class, 'show'])->name('task.show');
    Route::get('/task/{task}/edit', [TaskController::class, 'edit'])->name('task.edit');
    Route::patch('/task/{task}', [TaskController::class, 'update'])->name('task.update');
    Route::patch('/task/{task}/approve', [TaskController::class, 'approve'])->name('task.approve');
    Route::delete('/task/{task}', [TaskController::class, 'destroy'])->name('task.destroy');
    Route::post('/task/updateOrder', [TaskController::class, 'updateOrder'])->name("task.updateOrder");
});
