<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     /*
    //     $tasks = Task::all();
    //     */


    //     $tasks = Task::where('created_by', auth()->id())->get();
    //     return Inertia::render('Task/Task', [
    //         'user' => auth()->user(),
    //         'tasks' => $tasks
    //     ]);
    // }


    public function index()
    {
        // Get the current user's ID
        $userId = auth()->id();

        // Get the project IDs that the user is a member of
        $projectIds = ProjectMember::where('user_id', $userId)
            ->pluck('project_id');

        // Get the tasks that belong to the projects where the user is a member
        $tasks = Task::whereIn('project_id', $projectIds)->get();

        return Inertia::render('Task/Task', [
            'user' => auth()->user(),
            'tasks' => $tasks
        ]);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('CreateTask', ['user' => auth()->user(),]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'project_id' => 'required|exists:projects,id',
            'assigned' => 'nullable|exists:users,id',
            'status' => 'nullable|string',
            'priority' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);

        $validated['created_by'] = auth()->id();
        $validated['updated_by'] = auth()->id();

        // dd($validated);
        Task::create($validated);
        $project = Project::find($request->project_id);

        $project->activities()->create([
            'user_id' => Auth::id(),
            'activity' => ' created Task called ' . $request->name,
        ]);

        // return redirect()->route('task.index')->with('success', 'Task created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $messages = Message::where('task_id', $task->id)->with('user', 'attachments')->get();
        $task->load('project');
        return Inertia::render('Task/TaskDetail', [
            'task' => $task,
            'messages' => $messages,
            'user' => auth()->user(),
            'user_id' => Auth::id()

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        return Inertia::render('TaskEdit', ['task' => $task, 'user' => auth()->user()]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        // dd($request);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'assigned' => 'nullable|exists:users,id',
            'status' => 'nullable|string',
            'priority' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);
        // dd("Helloss");

        $task->update([
            'name' => $validated['name'],
            'assigned' => $validated['assigned'] ?? $task->assigned,
            'status' => $validated['status'] ?? $task->status,
            'priority' => $validated['priority'] ?? $task->priority,
            'due_date' => $validated['due_date'] ?? $task->due_date,
            'updated_by' => auth()->id(),
        ]);

        // dd('Hello2');

        $project = Project::find($task->project_id);

        $project->activities()->create([
            'user_id' => auth()->id(),
            'activity' => 'Update Task called ' . $request->name,
        ]);
        // return redirect()->route('task.index')->with('success', 'Task updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $project = Project::find($task->project_id);

        $project->activities()->create([
            'user_id' => Auth::id(),
            'activity' => ' Deleted Task called ' . $task->name,
        ]);
        $task->delete();
        return redirect()->route('task.index')->with('success', 'Task deleted successfully.');
    }
}
