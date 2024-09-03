<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectInvitation;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\ProjectInvitationMail;

class ProjectInvitationController extends Controller
{
    // Method to send invitation
    public function sendInvitation(Request $request, $projectId)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $project = Project::findOrFail($projectId);
        $email = $request->input('email');

        // Check if the email already exists in the project members
        $existingUser = User::where('email', $email)->first();
        if ($existingUser && $project->members()->where('user_id', $existingUser->id)->exists()) {
            return response()->json(['message' => 'User is already a member of the project.'], 400);
        }

        // Generate a unique token
        $token = Str::random(32);

        // Create the invitation record in the database
        $invitation = ProjectInvitation::create([
            'project_id' => $project->id,
            'email' => $email,
            'token' => $token,
        ]);

        // Send an email with the invitation link
        Mail::to($email)->send(new ProjectInvitationMail($project, $invitation));

        return response()->json(['message' => 'Invitation sent successfully.']);
    }

    // Method to accept invitation
    public function acceptInvitation($token)
    {
        $invitation = ProjectInvitation::where('token', $token)->first();

        if (!$invitation) {
            return response()->json(['message' => 'Invalid invitation token.'], 400);
        }

        if ($invitation->status !== 'pending') {
            return response()->json(['message' => 'This invitation has already been processed.'], 400);
        }

        // Check if user exists or create a new user based on the invitation email
        $user = User::where('email', $invitation->email)->first();

        if (!$user) {
            // Redirect to a registration page or create a new user (You may customize this part as needed)
            $user = User::create([
                'email' => $invitation->email,
                'password' => bcrypt(Str::random(16)), // You may want to create a more secure way for the user to set their password
                // Add other fields if necessary
            ]);
        }

        // Add the user to the project as a member
        $invitation->project->members()->attach($user->id);

        // Update the invitation status to accepted
        $invitation->status = 'accepted';
        $invitation->save();

        return response()->json(['message' => 'Invitation accepted successfully. You are now a member of the project.']);
    }
}
