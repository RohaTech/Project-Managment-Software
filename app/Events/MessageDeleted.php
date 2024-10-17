<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;

class MessageDeleted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
   

    public function __construct($message)
    {
        $this->message = $message;
        logger($message);
    }

    public function broadcastOn(): array
    {               return [new PrivateChannel('tasks.' . $this->message->task_id . '.messages')];

        logger("dawit");
        logger($this->message->project_id);
        // Check if it's a project message or task message and broadcast to the appropriate channel
        // if ($this->message->project_id) {
        //     return [new PrivateChannel('projects.' . $this->message->project_id . '.messages')];
        // } elseif ($this->message->task_id) {
        //     return [new PrivateChannel('tasks.' . $this->message->task_id . '.messages')];
        // }

        // return [];
    }

    public function broadcastWith(): array
    {
        // Return both messageId, projectId, and taskId for the frontend
        return [
            'message' => $this->message,
        ];
    }
}
