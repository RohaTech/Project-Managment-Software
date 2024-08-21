<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class MessageController extends Controller
{
    public function index($taskId)
    {
        $Messages = Message::where('task_id', $taskId)->with('user')->get();
        return response()->json($Messages);
    }


    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:255',
        ]);

        Message::create([
            'task_id' => $request->input('task_id'),
            'user_id' =>  auth()->id(),
            'content' => $request->input('content'),
        ]);

        // return response()->json($Message, 201);
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
