<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use App\Models\Message;

class MessageUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    public function broadcastOn(): array
    {
        if ($this->message->project_id) {
            return [new PrivateChannel('projects.' . $this->message->project_id . '.messages')];
        } elseif ($this->message->task_id) {
            return [new PrivateChannel('tasks.' . $this->message->task_id . '.messages')];
        }

        return [];    }

    public function broadcastWith(): array
    {
        return ['message' => $this->message];
    }
}
