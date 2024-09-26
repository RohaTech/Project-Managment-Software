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
use Exception;

class TaskController extends Controller
{

    public function index()
    {
        // Get the current user's ID
        try {
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
        } catch (Exception $ex) {
            dd($ex);
        }
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        try {
            return Inertia::render('CreateTask', ['user' => auth()->user(),]);
        } catch (Exception $ex) {
            dd($ex);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {



        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'project_id' => 'required|exists:projects,id',
                'assigned' => 'nullable|exists:users,id',

                'priority' => 'nullable|string',
                'due_date' => 'nullable|date',
                'description' => 'nullable|string', // add this
                'parent_task_id' => 'nullable|exists:tasks,id', // a
            ]);

            // dd("Hello");

            $validated['created_by'] = auth()->id();
            $validated['updated_by'] = auth()->id();

            $project = Project::find($request->project_id);

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
            $maxOrder = Task::max('order_column');

            // Task::create($validated);

            $newTask = Task::create(array_merge($validated, [
                'order_column' => $maxOrder ? $maxOrder + 1 : 0,  // If no tasks exist, set it to 0
            ]));

            $project->activities()->create([
                'user_id' => Auth::id(),
                'activity' => ' created Task called ' . $request->name,
            ]);
        } catch (Exception $ex) {
            dd($ex);
        }

        //         return redirect()->route('project.show', $project->id)->with('success', 'Task created successfully.');

    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {

        try {
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
        } catch (Exception $ex) {
            dd($ex);
        }
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
        $project = $task->project()->first();
        $members = ProjectMember::where("user_id", auth()->user()->id)->where('project_id', $project->id)->first();

        if ($members->role === "member" && $task->assigned !== auth()->user()->id) {
            return back()->withErrors(['Error' => 'you are not authorized to change']);
        }
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'assigned' => 'nullable|exists:users,id',
                'status' => 'string',
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
                'approved' => $validated['approved'] ?? $task->approved,
                'priority' => $validated['priority'],
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
        } catch (Exception $ex) {
            dd($ex->getMessage);
        }
        // return redirect()->route('task.index')->with('success', 'Task updated successfully.');
    }

    public function approve(Request $request, Task $task)
    {
        // dd($task);
        try {
            $task->update(['approved' => 1]);
        } catch (Exception $ex) {
            dd($ex);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)

    {
        try {
            $project = Project::find($task->project_id);

            $project->activities()->create([
                'user_id' => Auth::id(),
                'activity' => ' Deleted Task called ' . $task->name,
            ]);
            $task->delete();
            return redirect()->route('project.show', $task->project_id)->with('success', 'Task deleted successfully.');
        } catch (Exception $ex) {
            dd($ex);
        }
    }
    public function updateOrder(Request $request)
    {
        // dd($request);
        $orderedTasks = $request->input('orderedTasks'); // This contains the reordered tasks with IDs and new order values
        foreach ($orderedTasks as $orderedTask) {
            Task::where('id', $orderedTask['id'])
                ->update(['order_column' => $orderedTask['order_column']]);
        }
    }
}
