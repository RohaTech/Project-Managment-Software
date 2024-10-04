<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;


class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct($message)
    {
        $this->message = $message;
        logger('helllo'.'---'.$message->project_id);
    }

    public function broadcastOn(): array
    {
        logger('messaaaaaa');
        if ($this->message->project_id) {
            return [new PrivateChannel(name: 'projects.' . $this->message->project_id . '.messages')];
        } elseif ($this->message->task_id) {
            return [new PrivateChannel('tasks.' . $this->message->task_id . '.messages')];
        }
    
        return ['public'];
    }
    public function broadcastWith(): array
{
    logger('messa');
    return ['message' => $this->message];
}

    
}
