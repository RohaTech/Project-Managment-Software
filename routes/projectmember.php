<?php
use App\Http\Controllers\ProjectMemberController;
use Illuminate\Support\Facades\Route;

#all route about the project memeber


Route::middleware('auth')->group(function () {
Route::get('/projectmembers', [ProjectMemberController::class, 'index'])->name('projectmembers.index');
Route::get('/projectmembers/create', [ProjectMemberController::class, 'create'])->name('projectmembers.create');
Route::post('/projectmembers/store', [ProjectMemberController::class, 'store'])->name('projectmembers.store');
Route::get('/projectmembers/{projectMember}', [ProjectMemberController::class, 'show'])->name('projectmembers.show');
Route::get('/projectmembers/{projectMember}/edit', [ProjectMemberController::class, 'edit'])->name('projectmembers.edit');
Route::put('/projectmembers/{projectMember}', [ProjectMemberController::class, 'update'])->name('projectmembers.update');
Route::delete('/projectmembers/{projectMember}', [ProjectMemberController::class, 'destroy'])->name('projectmembers.destroy');
});
