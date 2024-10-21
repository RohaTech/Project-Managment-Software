<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Exception;

class ProjectMemberController extends Controller
{
    public function index()
    {
        $projectMembers = ProjectMember::latest()->simplePaginate(10);

        return Inertia::render('projectmember/show', [
            'projectMembers' => $projectMembers,
            'user' => auth()->user(),
        ]);
    }
    public function create(): Response
    {
        return Inertia::render('projectmember/register', ['user' => auth()->user(),]);
    }

    public function store(Request $request, Project $project)
    {

        $currentMember = $project->members()->where("user_id", auth()->user()->id)->first();

        if ($currentMember->role !== "owner") {
            return back()->withErrors(['Error' => 'Unauthorized Access']);
        }

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
        // try {
        $currentMember = $project->members()->where("user_id", auth()->user()->id)->first();
        // dd($project->id);

        if ($currentMember->role === "member") {
            return back()->withErrors(['Error' => 'Unauthorized Access']);
        }

        $validated = $request->validate([
            'role' => 'sometimes|required|string|in:admin,member',
            'user_id' => '|required|numeric'
        ]);

        // dd($validated);

        $projectMember = ProjectMember::where('user_id', $validated['user_id'])->where("project_id", $project->id)->first();

        // dd($projectMember);

        $projectMember->update([
            'role' => $validated['role']
        ]);


        $project->activities()->create([
            'user_id' => Auth::id(),
            'activity' => ' Edited ' . User::find($validated['user_id'])->name . ' Role to  ' . $validated['role'],
        ]);
        // } catch (Exception $ex) {
        //     dd($ex);
        // }
    }

    public function destroy(Request $request, Project $project)
    {
        // try {
        $currentMember = $project->members()->where("user_id", auth()->user()->id)->first();

        if ($currentMember->role !== "owner") {
            return back()->withErrors(['Error' => 'Unauthorized Access']);
        }

        $validated = $request->validate([
            'user_id' => '|required|numeric'
        ]);
        $projectMember = ProjectMember::where('user_id', $validated['user_id'])->where("project_id", $project->id)->first();

        $member = $projectMember->creator()->get();



        $project->activities()->create([
            'user_id' => Auth::id(),
            'activity' => ' Removed ' . $member[0]->name . ' from  the project ',
        ]);
        $projectMember->delete();
        // } catch (Exception $ex) {
        //     dd($ex);
        // }
    }
    public function transfer(Request $request, Project $project)
    {
        // try {

        $currentMember = $project->members()->where("user_id", auth()->user()->id)->first();

        if ($currentMember->role !== "owner") {
            return back()->withErrors(['Error' => 'Unauthorized Access']);
        }

        $validated = $request->validate([
            'member_id' => '|required|numeric'
        ]);

        $newOwner = ProjectMember::where('user_id', $validated['member_id'])->first();
        $oldOwner = ProjectMember::where('user_id', auth()->user()->id)->first();


        $newOwner->update([
            'role' => "owner"
        ]);
        $oldOwner->update([
            'role' => "member"
        ]);
        return redirect()->route('home')->with('success', 'Project updated successfully.');
        // } catch (Exception $ex) {
        // dd($ex);
        // }
    }
}
