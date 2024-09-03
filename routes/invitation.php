<?php

use App\Http\Controllers\ProjectInvitationController;
Route::post('/invite-member', [ProjectInvitationController::class, 'inviteMember']);
Route::get('/accept-invitation/{token}', [ProjectInvitationController::class, 'acceptInvitation']);
