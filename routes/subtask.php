<?php
use App\Http\Controllers\SubTaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::get('/subtask', [SubTaskController::class, 'index'])->name('subtask.index');
    Route::get('/subtask/create', [SubTaskController::class, 'create'])->name('subtask.create');
    Route::post('/subtask', [SubTaskController::class, 'store'])->name("subtask.store");
    Route::get('/subtask/{subtask}', [SubTaskController::class, 'show'])->name('subtask.show');
    Route::get('/subtask/{subtask}/edit', [SubTaskController::class, 'edit'])->name('subtask.edit');
    Route::patch('/subtask/{subtask}', [SubTaskController::class, 'update'])->name('subtask.update');
    Route::delete('/subtask/{subtask}', [SubTaskController::class, 'destroy'])->name('subtask.destroy');
});
