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

        // Fetch projects where the current user is a member or owner, including the user who created the project
        $projects = Project::whereHas('members', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })->with(['creator', 'updateBy']) // Load the creator relationship
            ->latest()
            ->get();

        return Inertia::render('Project/ProjectIndex', [
            'projects' => $projects,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('Project/ProjectCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->name);

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
        ProjectMember::create(
            [
                "project_id" => $project->id,
                "user_id" => Auth::id(),
                "role" => "owner",
            ]
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        // dd($project);

        $tasks = Task::where('project_id', $project->id)->get();
        return Inertia::render('Project/ProjectShow', ["project" => $project, "tasks" => $tasks]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Project/ProjectEdit', ["project_id" => $id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request->request);

        $validate = $request->validate([
            'name' => ['required ', 'max:255'],
            'description' => ['nullable'],
        ]);

        $validate['updated_by'] = Auth::id();
        $project = Project::find($id);
        $project->update($validate);
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id)
    {

        Project::findOrFail($id)->delete();
    }
}
