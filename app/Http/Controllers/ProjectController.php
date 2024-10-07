<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Exception;


class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        try {
            $query = Project::query();

            if ($request->has('name')) {
                $query->where('name', "like", "%" . $request->input('name') . "%");
            }

            $userId = Auth::id();

            $projects = $query->whereHas('members', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })->with(['creator', 'updateBy']) // Load the creator relationship
                ->latest()
                ->get();

            return Inertia::render('Project/ProjectIndex', [
                'projects' => $projects,
                'queryParams' => $request->query() ?: null
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
            return Inertia::render('Project/ProjectCreate',);
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

            // dd($request);
            $request->validate([
                'name' => ['required ', 'max:255'],
                'description' => ['nullable'],
                'type' => ['required'],
            ]);
            $project = Project::create(
                [
                    'name' => $request->name,
                    'type' => $request->type,
                    'description' => $request->description,
                    'created_by' => Auth::id(),
                    'updated_by' => Auth::id(),
                ]
            );

            $project->members()->create([
                'user_id' => Auth::id(),
                'role' => 'owner',
            ]);

            $project->activities()->create([
                'user_id' => Auth::id(),
                'activity' => auth()->user()->name . ' created project called ' . $request->name,
            ]);
            return redirect()->route('project.show', $project->id)->with('success', 'Task created successfully.');
        } catch (Exception $ex) {
            dd($ex);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        try {
            $members = $project->members;
            $membersInfo = collect();
            foreach ($members as $member) {
                $membersInfo->push([
                    'id' => $member->creator->id,
                    'name' => $member->creator->name,
                    'email' => $member->creator->email,
                    'role' => $member->role,
                ]);
            }


            $parentTasks = $project->tasks()->whereNull('parent_task_id')->get();
            $tasksWithSubtasks = $this->getTasksWithSubtasks($parentTasks);
            $orderedTasks = $tasksWithSubtasks->sortBy('order_column')->values()->toArray();
            // $orderedTasks = $tasksWithSubtasks->orderBy('order_column', 'asc');
            // dd($tasksWithSubtasks);
            // dd($orderedTasks);
            return Inertia::render('Project/ProjectShow', ["project" => $project, "tasks" => $orderedTasks, "members" => $membersInfo, "membersRole" => $members]);
        } catch (Exception $ex) {
            dd($ex);
        }
    }
    private function getTasksWithSubtasks($tasks)
    {
        try {
            $tasksWithSubtasks = collect();
            foreach ($tasks as $task) {
                $task->subtasks = $this->getTasksWithSubtasks($task->subtasks);
                $tasksWithSubtasks->push($task);
            }
            return $tasksWithSubtasks;
        } catch (Exception $ex) {
            dd($ex);
        }
    }


    public function edit(Project $project)
    {
        try {
            return Inertia::render('Project/PopEditProject', ["project" => $project]);
        } catch (Exception $ex) {
            dd($ex);
        }
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validate = $request->validate([
                'name' => ['required ', 'max:255'],
                'description' => ['nullable'],
                'type' => ['required']
            ]);

            $validate['updated_by'] = Auth::id();
            $project = Project::find($id);
            $project->update($validate);
            $project->activities()->create([
                'user_id' => Auth::id(),
                'activity' => ' updated project called ' . $request->name,
            ]);
            return redirect()->route('project.show', $id)->with('success', 'Project updated successfully.');
        } catch (Exception $ex) {
            dd($ex);
        }
        // return back();
    }

    /**name
     * Remove the specified resource from storage.
     */
    public function delete(Project $project)
    {

        try {
            if ($project->created_by !== auth()->user()->id) {
                return back()->withErrors(['Error' => 'Unauthorized Access']);
            }

            $project->delete();
            return redirect()->route('project.index')->with('success', 'Project updated successfully.');
        } catch (Exception $ex) {
            dd($ex);
        }
    }





    public function showAdditionalColumn(Project $project)
    {
        try {
            $additional_column = json_decode($project->additional_column, true) ?? [];
            return Inertia::render('AdditionalColumn', ["project" => $project, "additional_column" => $additional_column]);
        } catch (Exception $ex) {
            dd($ex);
        }
    }



    public function createAdditionalColumn(Request $request, string $project_id)
    {
        try {
            $validate = $request->validate([
                'title' => ['required ', 'max:255'],
                'type' => ['required'],
            ]);

            $project = Project::find($project_id);
            $tasks = $project->tasks()->get();
            // dd($tasks);
            $additionalColumn = json_decode($project->additional_column, true) ?? [];
            if (array_search($validate['title'], array_column($additionalColumn, 'title')) !== false) {
                return back()->withErrors(['title' => 'A title with the same name already exists.']);
            }

            $newAdditionalColumn = array_merge($additionalColumn, [
                [
                    'title' => $validate['title'],
                    'type' => $validate['type'],
                ],
            ]);

            $project->update([
                'additional_column' => json_encode($newAdditionalColumn),
            ]);

            foreach ($tasks as $task) {
                $task->additional_column = [...$task->additional_column, ["title" => $validate['title'], "value" => " ", "type" => $validate['type']]];
                $task->save();
            }


            $project->activities()->create([
                'user_id' => Auth::id(),
                'activity' => auth()->user()->name . ' created a new column called ' . $request->title,
            ]);
            return redirect()->back()->with('success', 'Additional column created successfully.');
        } catch (Exception $ex) {
            dd($ex);
        }
    }


    public function deleteAdditionalColumn(Request $request, Project $project)
    {
        try {
            $title = $request->input('title');

            $additionalColumn = json_decode($project->additional_column, true) ?? [];

            $newAdditionalColumn = array_filter($additionalColumn, function ($item) use ($title) {
                return $item['title'] !== $title;
            });

            // dd($newAdditionalColumn);


            $tasks = $project->tasks;
            foreach ($tasks as $task) {
                $taskAdditionalColumn = $task->additional_column;
                // dd($taskAdditionalColumn);
                $newTaskAdditionalColumn = array_filter($taskAdditionalColumn, function ($item) use ($title) {
                    return $item['title'] !== $title;
                });


                $task->update([
                    'additional_column' => $newTaskAdditionalColumn,
                ]);
            }

            $project->update([
                'additional_column' => json_encode($newAdditionalColumn),
            ]);


            $project->activities()->create([
                'user_id' => Auth::id(),
                'activity' => auth()->user()->name . ' deleted the additional column ' . $title,
            ]);


            return redirect()->back()->with('success', 'Additional column deleted successfully.');
        } catch (Exception $ex) {
            dd($ex);
        }
    }

    // validate on all functions


    public function updateAdditionalColumn(Request $request, Project $project)
    {
        try {
            $additional_column = $request->input('additional_column');
            $titles = array_map('strtolower', array_column($additional_column, 'title'));
            if (count($titles) !== count(array_unique($titles))) {
                return back()->withErrors(['title' => 'A title with the same name already exists.']);
            }

            $project->update([
                'additional_column' => json_encode($additional_column),
            ]);

            // Create an activity log
            $project->activities()->create([
                'user_id' => Auth::id(),
                'activity' => auth()->user()->name . ' updated the additional column ',
            ]);
        } catch (Exception $ex) {
            dd($ex);
        }
    }

    public function updateProjectStatus(Request $request, Project $project)
    {
        try {


            $tasks = $project->tasks()->get();


            // $members = $project->members()->get();
            // $owner = $members->where('role', 'owner')->first();


            // if (auth()->user()->id !== $owner->user_id) {
            //     return back()->withErrors(['status' => 'Only Owner Can Update The Status']);
            // }



            $validated = $request->validate([
                'status' => ['required ', 'in:Pending,In Progress,Completed'],
            ]);



            if ($validated["status"] === 'Completed') {
                $allTasksCompleted = $tasks->every(function ($task) {
                    return $task->status === 'Completed';
                });

                if (!$allTasksCompleted) {
                    return back()->withErrors(['status' => 'Cannot set status to completed , complete all tasks.']);
                }
            }
            $project->update([
                'status' => $validated['status']
            ]);
        } catch (Exception $ex) {
            dd($ex);
        }
    }

    public function copyProjectCreate(Request $request)
    {

        try {
            return Inertia::render('Project/ProjectCopy',);
        } catch (Exception $ex) {
            dd($ex);
        }
    }

    public function copyProjectStore(Project $project)
    {
        $newProject = Project::create([
            'name' => $project->name . " - copy",
            'description' => $project->description,
            'type' => $project->type,
            'additional_column' => $project->additional_column,
            'created_by' => Auth::id(),
            'updated_by' => Auth::id(),
        ]);

        $parentTaskArray = [];
        $tasks = $project->tasks;
        foreach ($tasks as $task) {
            if (!$task->parent_task_id) {
                $newParentTask = $newProject->tasks()->create([
                    'name' => $task->name . " - copy",
                    'project_id' => $task->id,
                    'type' => $project->type,
                    'description' => $task->description,
                    'priority' => $task->priority,
                    'additional_column' => $task->additional_column,
                    'created_by' => auth()->id(),
                    'updated_by' => auth()->id(),
                ]);
                array_push($parentTaskArray, $newParentTask);
            }
        }


        $newProject->members()->create([
            'user_id' => Auth::id(),
            'role' => 'owner',
        ]);
        return redirect()->route('project.show', $newProject->id)->with('success', 'Task created successfully.');
    }
}
