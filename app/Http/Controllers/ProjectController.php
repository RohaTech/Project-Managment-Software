<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
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
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('Project/ProjectCreate', ['user' => auth()->user(),]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'name' => ['required ', 'max:255'],
            'description' => ['nullable'],
        ]);
        $project = Project::create(
            [
                'name' => $request->name,
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
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $members = $project->members;
        $allNames = collect();
        foreach ($members as $member) {
            $names = $member->creator()->get();
            $allNames = $allNames->merge($names);
        }
        $tasks = $project->tasks()->with('subtask')->get();
        return Inertia::render('Project/ProjectShow', ["project" => $project, "tasks" => $tasks, "members" => $allNames]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {

        return Inertia::render('Project/PopEditProject', ["project" => $project]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validate = $request->validate([
            'name' => ['required ', 'max:255'],
            'description' => ['nullable'],
        ]);

        $validate['updated_by'] = Auth::id();
        $project = Project::find($id);
        $project->update($validate);

        $project->activities()->create([
            'user_id' => Auth::id(),
            'activity' => ' updated project called ' . $request->name,
        ]);
        return redirect()->route('project.show', $id)->with('success', 'Project updated successfully.');

        // return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id)
    {

        Project::findOrFail($id)->delete();
    }





    public function showAdditionalColumn(Project $project)
    {
        $additional_column = json_decode($project->additional_column, true) ?? [];

        return Inertia::render('AdditionalColumn', ["project" => $project, "additional_column" => $additional_column]);
    }



    public function createAdditionalColumn(Request $request, string $project_id)
    {
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
    }


    public function deleteAdditionalColumn(Request $request, Project $project)
    {
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
    }




    public function updateAdditionalColumn(Request $request, Project $project)
    {

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
    }
}
