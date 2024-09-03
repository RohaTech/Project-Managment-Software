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
    public function index()
    {
        $userId = Auth::id();

        $projects = Project::whereHas('members', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->with(['creator', 'updateBy']) // Load the creator relationship
            ->latest()
            ->get();

        return Inertia::render('Project/ProjectIndex', [
            'projects' => $projects,
            'user' => auth()->user(),
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
        $tasks = Task::where('project_id', $project->id)->get();
        return Inertia::render('Project/ProjectShow', ["project" => $project, "tasks" => $tasks, 'user' => auth()->user(), "members" => $allNames]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        // dd($project);
        return Inertia::render('Project/PopEditProject', ["project" => $project, 'user' => auth()->user(),]);
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
}
