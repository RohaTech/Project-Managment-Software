<?php

use App\Http\Controllers\ProjectMemberController;
use Illuminate\Support\Facades\Route;

#all route about the project memeber


Route::middleware('auth')->group(function () {
    Route::get('project/{project}/project-members', [ProjectMemberController::class, 'index'])->name('project-members.index');
    Route::get('project/{project}/project-members/create', [ProjectMemberController::class, 'create'])->name('project-members.create');
    Route::post('project/{project}/project-members/store', [ProjectMemberController::class, 'store'])->name('project-members.store');
    Route::get('project/{project}/project-members/', [ProjectMemberController::class, 'show'])->name('project-members.show');
    Route::get('project/{project}/project-members//edit', [ProjectMemberController::class, 'edit'])->name('project-members.edit');
    Route::patch('project/{project}/project-members/', [ProjectMemberController::class, 'update'])->name('project-members.update');
    Route::delete('project/{project}/project-members/', [ProjectMemberController::class, 'destroy'])->name('project-members.destroy');
});
