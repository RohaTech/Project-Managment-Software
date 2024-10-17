<?php

use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {

    Route::get('/project/copy', [ProjectController::class, 'copyProjectCreate'])->name('project.copy');
    Route::post('/project/{project}/copy', [ProjectController::class, 'copyProjectStore'])->name('project.copy.store');

    Route::get('/project', [ProjectController::class, 'index'])->name('project.index');
    Route::get('/project/create', [ProjectController::class, 'create'])->name('project.create');
    Route::post('/project/create', [ProjectController::class, 'store'])->name('project.store');
    Route::get('/project/{project}', [ProjectController::class, 'show'])->name('project.show');
    Route::get('/project/{project}/edit', [ProjectController::class, 'edit'])->name('project.edit');
    Route::patch('/project/{project}/edit', [ProjectController::class, 'update'])->name('project.update');
    Route::delete('/project/{project}/delete', [ProjectController::class, 'delete'])->name('project.delete');



    Route::get('/project/{project}/additional-column-create', [ProjectController::class, 'showAdditionalColumn'])->name('project.additional_column');
    Route::patch('/project/{project}/additional-column-create', [ProjectController::class, 'createAdditionalColumn'])->name('project.additional-column.create');
    Route::get('/project/{project}/additional-column-update', [ProjectController::class, 'editAdditionalColumn'])->name('project.additional-column.edit');
    Route::patch('/project/{project}/additional-column-update', [ProjectController::class, 'updateAdditionalColumn'])->name('project.additional-column.update');
    Route::patch('/project/{project}/additional-column-delete', [ProjectController::class, 'deleteAdditionalColumn'])->name('project.additional-column.delete');


    Route::patch('/project/{project}/status', [ProjectController::class, 'updateProjectStatus'])->name('project.status');
});
