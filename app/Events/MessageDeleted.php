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
    public $projectId;
    public $taskId;

    public function __construct($message, $projectId, $taskId)
    {
        $this->message = $message;
        $this->projectId = $projectId;
        $this->taskId = $taskId;
    }

    public function broadcastOn(): array
    {   logger("dawit");
        logger($this->message->project_id);
        // Check if it's a project message or task message and broadcast to the appropriate channel
        if ($this->projectId) {
            return [new PrivateChannel('projects.' . $this->projectId . '.messages')];
        } elseif ($this->taskId) {
            return [new PrivateChannel('tasks.' . $this->taskId . '.messages')];
        }

        return [];
    }

    public function broadcastWith(): array
    {
        // Return both messageId, projectId, and taskId for the frontend
        return [
            'messageId' => $this->message,
            'projectId' => $this->projectId,
            'taskId' => $this->taskId,
        ];
    }
}
