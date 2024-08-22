<?php

use App\Http\Controllers\AttachmentController;

Route::post('/attachments', [AttachmentController::class, 'store'])->name('attachments.store');
Route::delete('/attachments/{id}', [AttachmentController::class, 'destroy'])->name('attachments.destroy');

