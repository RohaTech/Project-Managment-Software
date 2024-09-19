<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Project;
use App\Models\User;

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
            'description' => 'nullable|string', // add this
            'parent_task_id' => 'nullable|exists:tasks,id', // a
        ]);

        // dd("Hello");

        $validated['created_by'] = auth()->id();
        $validated['updated_by'] = auth()->id();

        $validated['additional_column'] = [];
        $ProjectAdditionalColumn = json_decode($project->additional_column, true) ?? [];

        // dd($ProjectAdditionalColumn);

        foreach ($ProjectAdditionalColumn as $column) {
            $validated['additional_column'][] = [
                "title" => $column['title'],
                "value" => "  "
            ];
        }


  
 
        $project = Project::find($request->project_id);
 

        Task::create($validated);
 

        $project->activities()->create([
            'user_id' => Auth::id(),
            'activity' => ' created Task called ' . $request->name,
        ]);

 
//         return redirect()->route('project.show', $project->id)->with('success', 'Task created successfully.');
 
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $assigned = User::where('id', $task->assigned)->get();
        $messages = Message::where('task_id', $task->id)->with('user', 'attachments')->get();
        $task->load('project');
        return Inertia::render('Task/TaskDetail', [
            'task' => $task,
            'messages' => $messages,
            'user' => auth()->user(),
            'user_id' => Auth::id(),
            'assigned' => $assigned,
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
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'assigned' => 'nullable|exists:users,id',
            'status' => 'nullable|string',
            'approved' => 'nullable',
            'priority' => 'nullable|string',
            'due_date' => 'nullable|date',
            'description' => 'nullable|string', // add this
            'parent_task_id' => 'nullable|exists:tasks,id', // add this
            'additional_column' => 'nullable',
 
        ]);

     


        $task->update([
            'name' => $validated['name'],
            'assigned' => $validated['assigned'] ?? $task->assigned,
            'status' => $validated['status'] ?? $task->status,
            'approved' => $validated['approved'],
            'priority' => $validated['priority'] ?? $task->priority,
            'due_date' => $validated['due_date'] ?? $task->due_date,
            'additional_column' => $validated['additional_column'] ?? $task->additional_column,
            'updated_by' => auth()->id(),
            'description' => $validated['description'] ?? $task->description, // add this
            'parent_task_id' => $validated['parent_task_id'] ?? $task->parent_task_id
     
        ]);

        // dd('Hello2');

        $project = Project::find($task->project_id);

        $project->activities()->create([
            'user_id' => auth()->id(),
            'activity' => 'Update Task called ' . $request->name,
        ]);
        // return redirect()->route('task.index')->with('success', 'Task updated successfully.');
    }

    public function approve(Request $request, Task $task)
    {
        // dd($task);
        $task->update(['approved' => 1]);
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
