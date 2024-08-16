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
        $projectMembers = ProjectMember::all();
        return response()->json($projectMembers);
    }
    public function create(): Response
    {
        return Inertia::render('projectmember/register');
    }


    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|integer|exists:projects,id',
            'created_by' => 'required|integer|exists:users,id',
        ]);

        $projectMember = ProjectMember::create($request->all());
        return response()->json($projectMember, 201);
    }

    public function show(ProjectMember $projectMember)
    {
        return response()->json($projectMember);
    }

    public function update(Request $request, ProjectMember $projectMember)
    {
        $request->validate([
            'project_id' => 'sometimes|required|integer|exists:projects,id',
            'created_by' => 'sometimes|required|integer|exists:users,id',
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
