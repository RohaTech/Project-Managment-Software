<?php

namespace App\Http\Controllers;


use App\Models\Project;
use App\Models\SubTask;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function Pest\Laravel\get;

class ApiController extends Controller
{
    public function search(Request $request)
    {
        if ($request->user()) {
            $userId = Auth::id();
            $query = $request->query('query');

            $allProjects = Project::whereHas('members', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            });

            $allTasks = Task::whereIn('project_id', $allProjects->pluck('id'))->get();

            $subtasks = SubTask::whereIn('task_id', $allTasks->pluck('id'))
                ->when($query, function ($q) use ($query) {
                    $q->where('name', 'like', '%' . $query . '%');
                })->latest()
                ->get();
            $tasks = Task::whereIn('project_id', $allProjects->pluck('id'))
                ->when($query, function ($q) use ($query) {
                    $q->where('name', 'like', '%' . $query . '%');
                })->latest()
                ->get();

            $projects = $allProjects->when($query, function ($q) use ($query) {
                $q->where('name', 'like', '%' . $query . '%');
            })->with(['creator', 'updateBy']) // Load the creator relationship
                ->latest()
                ->get();


            return response()->json(['projects' => $projects, 'tasks' => $tasks, 'subtasks' => $subtasks]);
        }
    }
}
