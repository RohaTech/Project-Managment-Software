<?php
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



#message routes
Route::middleware('auth')->group(function () {
Route::get('/tasks/{taskId}/messages', [MessageController::class, 'showTaskMessages']);
Route::post('/tasks/{taskId}/messages', [MessageController::class, 'store'])->name('taskMessages.store');
Route::get('/projects/{projectId}/messages', [MessageController::class, 'showProjectMessages'])->name('projectMessages.show');
Route::post('/projects/{projectId}/messages', [MessageController::class, 'store'])->name('projectMessages.store');
Route::patch('/messages/{message}', [MessageController::class, 'update'])->name('messages.update');
Route::delete('messages/{message}',[MessageController::class,'destroy'])->name('messages.destroy');

//old message web route 

// Route::post('/message/store',[MessageController::class,'store'])->name('messages.store');
// Route::get('/task/{task}', [MessageController::class, 'show'])->name('task.show');
// Route::get('messages/{message}/edit',[MessageController::class,'edit'])->name('messages.edit');
});



