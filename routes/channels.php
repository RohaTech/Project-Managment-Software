<?php

use App\Models\Task;
use Illuminate\Support\Facades\Broadcast;
use App\Models\ProjectMember;


Broadcast::channel('projects.{projectId}.messages', function ($user, $projectId) {
    return ProjectMember::where('project_id', $projectId)
    ->where('user_id', $user->id)
    ->exists();
});

Broadcast::channel('tasks.{taskId}.messages', function ($user, $taskId) {
    $task = Task::find($taskId);

    // Ensure the task exists and is associated with a valid project
    if (!$task || !$task->project_id) {
        return false; // Task doesn't exist or is not associated with a project
    }

    // Check if the user is a member of the project that the task belongs to
    $projectId = $task->project_id;
    return ProjectMember::where('project_id', $projectId)
                        ->where('user_id', $user->id)
                        ->exists();

});
