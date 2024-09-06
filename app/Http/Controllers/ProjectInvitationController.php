<?php
namespace App\Http\Controllers;

use App\Mail\ProjectInvitationMail;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectInvitation;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;


class ProjectInvitationController extends Controller
{  
    public function inviteMember(Request $request)
    {   
        $request->validate([
            'email' => 'required|email'
        ]);
        $reproject=$request->input('project');
        $project = Project::findOrFail($reproject);
        $email = $request->input('email');
        
        $existingUser = User::where('email', $email)->first();
        if ($existingUser && $project->members()->where('user_id', $existingUser->id)->exists()) {
            return response()->json(['message' => 'User is already a member of the project.'], 400);
        }


        try {
            $token = Str::random(32);

            $invitation = ProjectInvitation::create([
                'project_id' => $project->id,
                'email' => $email,
                'token' => $token,
            ]);

            Log::info("Invitation created for email: $email with token: $token");
            

            Mail::to($email)->send(new ProjectInvitationMail($project, $invitation));

            Log::info("Invitation email sent to: $email");

            return response()->json(['message' => 'Invitation sent successfully.']);
        } catch (\Exception $e) {
            \Log::error('Failed to send project invitation: ' . $e->getMessage());
            \Log::error($e->getTraceAsString());
        
            return response()->json(['message' => 'Failed to send the invitation. Please try again.',$e->getMessage()], 500);
        }
        
     
    }

    public function acceptInvitation($token)
    {
        $invitation = ProjectInvitation::where('token', $token)->first();

        if (!$invitation) {
            return response()->json(['message' => 'Invalid invitation token.'], 400);
        }

        if ($invitation->status !== 'pending') {
            return response()->json(['message' => 'This invitation has already been processed.'], 400);
        }

        $user = User::where('email', $invitation->email)->first();

        if (!$user) {
            $user = User::create([
                'email' => $invitation->email,
                'password' => bcrypt(Str::random(16)), // You may want to create a more secure way for the user to set their password
            ]);
        }

        $invitation->project->members()->attach($user->id);

        $invitation->status = 'accepted';
        $invitation->save();

        return response()->json(['message' => 'Invitation accepted successfully. You are now a member of the project.']);
    }
}
