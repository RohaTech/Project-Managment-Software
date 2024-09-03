<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\Project;
use App\Models\ProjectInvitation;

class ProjectInvitationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $project;
    public $invitation;

    /**
     * Create a new message instance.
     *
     * @param Project $project
     * @param ProjectInvitation $invitation
     * @return void
     */
    public function __construct(Project $project, ProjectInvitation $invitation)
    {
        $this->project = $project;
        $this->invitation = $invitation;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.project_invitation')
                    ->subject('You are invited to join a project')
                    ->with([
                        'projectName' => $this->project->name,
                        'invitationLink' => url('/accept-invitation/' . $this->invitation->token)
                    ]);
    }
}
