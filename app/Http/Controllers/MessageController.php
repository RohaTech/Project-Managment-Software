<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;
use App\Models\Attachment;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class MessageController extends Controller
{
    public function index($taskId)
    {
        $Messages = Message::where('task_id', $taskId)->with('user')->get();
        return response()->json($Messages);
    }
    // public function show(Project $project)
    // {
    //     $messages = Message::where('task_id', $project->id)->with('user', 'attachments')->get();
    //     return Inertia::render('Message/Message', [
        
    //         'messages' => $messages,
    //         'user' => auth()->user(),
    //         'user_id' => Auth::id(),

    //     ]);
    // // $messages = Message::with('attachments')
    // //     ->where('task_id', $taskId)
    // //     ->get();

    // // return response()->json(['data' => $messages]);
    // }
    public function showProjectMessages($id){
        $project = Project::find($id);
        $messages = Message::where('project_id', $project->id)->with('user', 'attachments')->get();
        return Inertia::render('Message/Message', [
            'project'=> $project,
            'project_id'=>$project->id,
            'messages' => $messages,
            'user' => auth()->user(),
            'user_id' => Auth::id(),
        ]);
       

    }

    public function showTaskMessages(Task $task){
        $messages = Message::where('task_id', $task->id)->with('user', 'attachments')->get();

        return Inertia::render('Message/Message', [
            'messages' => $messages,
            'user' => auth()->user(),
            'user_id' => Auth::id(),
        ]);
       

    }


    public function store(Request $request)
    {   
        $request->validate([
            'task_id' => 'nullable|exists:tasks,id',
            'project_id' => 'nullable|exists:projects,id',            
            'content' => 'nullable|string',
            'attachment' => 'nullable|file|max:10240', // max 10 MB, adjust as needed
        ]);

        // make sure prsence of the project id and the task id
        if (is_null($request->input('task_id')) && is_null($request->input('project_id'))) {
            return response()->json(['error' => 'Either task_id or project_id is required'], 400);
        }
        // Create a new message
    
        $message=Message::create([
            'project_id' => $request->input('project_id'),
            'task_id' => $request->input('task_id'),
            'user_id' => auth()->id(),
            'content' => $request->input('content'),
        ]);
    
        if ($request->has('content')) {
            $message->content = $request->input('content');
        }
    
        if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $filePath = $file->store('attachments', 'public');
            $fileName = $file->getClientOriginalName();
        
    
        Attachment::create([
            'message_id' => $message->id,
            'file_path' => $filePath,
            'file_name' => $fileName,
        ]);

    }
        $message->save();
        // return response()->json(['data' => $message->load('attachments')], 201);
    }
    

    public function update(Request $request, $id)
    {
        $request->validate([
            'content' => 'required|string|max:255',
        ]);

        $Message = Message::findOrFail($id);

        if ($Message->user_id !==  auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $Message->content = $request->input('content');
        $Message->save();

        // return response()->json($Message);
    }

    public function destroy(Message $message)
    {
        $message->delete();
    }
}
