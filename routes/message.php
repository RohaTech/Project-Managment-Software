<?php
use App\Http\Controllers\MessageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



#message routes
Route::middleware('auth')->group(function () {
Route::post('/message/store',[MessageController::class,'store'])->name('messages.store');
Route::delete('messages/destroy',[MessageController::class,'destroy'])->name('messages.destroy');
});



