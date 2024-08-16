<?php

namespace App\Http\Controllers;
use App\Models\ProjectMember;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectMemberController extends Controller
{
    public function index()
    {   
        $projectMembers = ProjectMember::latest()->simplePaginate(10);

        return  Inertia::render('projectmember/show', [
            'projectMembers' => $projectMembers
        ]);
        // $projectMembers = ProjectMember::all();
        // return response()->json($projectMembers);
    }
    public function create(): Response
    {
        return Inertia::render('projectmember/register');
    }

    public function store(Request $request)
    { 
        $request->validate([
            'project_id' => 'required|integer|exists:projects,id',
            'user_id' => 'required|integer|exists:users,id',
            'role'=>'required|string'
        ]);

        ProjectMember::create([
            "project_id"=>$request->project_id,
            "user_id"=>$request->user_id,
            "role"=>$request->role 
        ]);
        return redirect(route('dashboard', absolute: false));
        
    }
    public function show(ProjectMember $projectMember)
    {
        return response()->json($projectMember);
    }
    public function update(Request $request, ProjectMember $projectMember)
    {
        $request->validate([
            'project_id' => 'sometimes|required|integer|exists:projects,id',
            'user_id' => 'sometimes|required|integer|exists:users,id',
            'role'=>'sometimes|required|string'
        ]);
        $projectMember->update($request->all());
        return response()->json($projectMember);
    }

    public function destroy(ProjectMember $projectMember)
    {
        $projectMember->delete();
        return response()->json(null, 204);
    }
}
