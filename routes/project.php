<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/project', [ProjectController::class, 'index'])->name('project.index');
    Route::get('/project/create', [ProjectController::class, 'create'])->name('project.create');
    Route::post('/project/create', [ProjectController::class, 'store'])->name('project.store');
    Route::get('/project/{project}', [ProjectController::class, 'show'])->name('project.show');
    Route::get('/project/{project}/edit', [ProjectController::class, 'edit'])->name('project.edit');
    Route::patch('/project/{project}/edit', [ProjectController::class, 'update'])->name('project.update');
    Route::delete('/project/{project}/delete', [ProjectController::class, 'delete'])->name('project.delete');
});
