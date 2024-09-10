<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\ProjectMember;
use App\Models\ProjectInvitation;


use phpDocumentor\Reflection\Types\Nullable;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/Register', [
            'email' => $request->input('email'), // Prefill email if provided
            'invitation_token' => $request->input('invitation_token'), // Pass the token if available
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
{
    // Validate the registration form
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email',
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    // Create the new user
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    // Check if there is a pending project invitation for this email and token
    if ($request->has('invitation_token')) {
        $invitation = ProjectInvitation::where('token', $request->input('invitation_token'))
                                        ->where('email', $user->email)
                                        ->where('status', 'pending')
                                        ->first();

        if ($invitation) {
            // Add the user to the project
            ProjectMember::create([
                'project_id' => $invitation->project_id,
                'user_id' => $user->id,
                'role' => 'member', // Default role, adjust if needed
            ]);

            // Update the invitation status to 'accepted'
            $invitation->status = 'accepted';
            $invitation->save();
        }
    }

    // Automatically log in the new user
    event(new Registered($user));
    Auth::login($user);

    // Redirect the user to the home/dashboard page after registration
    return redirect(route('home'))->with('message', 'Registration successful. You are now a member of the project.');
}

}




