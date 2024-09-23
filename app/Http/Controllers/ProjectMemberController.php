<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProjectMemberController extends Controller
{
    public function index()
    {
        $projectMembers = ProjectMember::latest()->simplePaginate(10);

        return  Inertia::render('projectmember/show', [
            'projectMembers' => $projectMembers,
            'user' => auth()->user(),
        ]);
    }
    public function create(): Response
    {
        return Inertia::render('projectmember/register', ['user' => auth()->user(),]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|integer|exists:projects,id',
            'user_id' => 'required|integer|exists:users,id',
            'role' => 'required|string'
        ]);

        ProjectMember::create([
            "project_id" => $request->project_id,
            "user_id" => $request->user_id,
            "role" => $request->role
        ]);


        $project = Project::find($request->project_id);

        $project->activities()->create([
            'user_id' => Auth::id(),
            'activity' => ' Added ' . User::find($request->user_id)->name . ' to Project as  ' . $request->role,
        ]);

        return redirect(route('home', absolute: false));
    }
    public function show(ProjectMember $projectMember)
    {
        return response()->json($projectMember);
    }

    public function update(Request $request, Project $project)
    {

        $validated = $request->validate([
            'role' => 'sometimes|required|string|in:admin,member',
            'user_id' => '|required|numeric'
        ]);

        $projectMember = ProjectMember::where('user_id', $validated['user_id'])->first();


        $projectMember->update([
            'role' => $validated['role']
        ]);


        $project->activities()->create([
            'user_id' => Auth::id(),
            'activity' => ' Edited ' . User::find($validated['user_id'])->name . ' Role to  ' . $validated['role'],
        ]);
    }

    public function destroy(Request $request, Project $project)
    {
        $validated = $request->validate([
            'user_id' => '|required|numeric'
        ]);
        $projectMember = ProjectMember::where('user_id', $validated['user_id'])->first();

        $member = $projectMember->creator()->get();



        $project->activities()->create([
            'user_id' => Auth::id(),
            'activity' => ' Removed ' . $member[0]->name . ' from  the project ',
        ]);
        $projectMember->delete();
    }
}
