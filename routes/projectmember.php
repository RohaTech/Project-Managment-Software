<?php

use App\Http\Controllers\ProjectMemberController;
use Illuminate\Support\Facades\Route;

#all route about the project memeber


Route::middleware('auth')->group(function () {
    Route::post('project/{project}/project-members/store', [ProjectMemberController::class, 'store'])->name('project-members.store');
    Route::patch('project/{project}/project-members/', [ProjectMemberController::class, 'update'])->name('project-members.update');
    Route::delete('project/{project}/project-members/', [ProjectMemberController::class, 'destroy'])->name('project-members.destroy');
});
