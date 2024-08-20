<?php
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



#message routes
Route::middleware('auth')->group(function () {
Route::post('/message/store',[MessageController::class,'store'])->name('messages.store');
Route::delete('messages/{message}',[MessageController::class,'destroy'])->name('messages.destroy');
Route::get('messages/{message}/edit',[MessageController::class,'edit'])->name('messages.edit');
Route::patch('/messages/{message}', [MessageController::class, 'update'])->name('messages.update');
});



