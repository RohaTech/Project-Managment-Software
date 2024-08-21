<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\SubTask;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class SubTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subtasks = SubTask::all();
        return Inertia::render('Subtask/Index', ['subtasks' => $subtasks, 'user' => auth()->user()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Subtask/Create', ['user' => auth()->user()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'task_id' => 'required|integer',
            'assigned' => 'required|string|max:255',
            'status' => 'required|string|max:255',
            'priority' => 'required|string|max:255',
            'due_date' => 'required|date',
        ]);

        SubTask::create([
            'name' => $request->input('name'),
            'task_id' => $request->input('task_id'),
            'assigned' => $request->input('assigned'),
            'status' => $request->input('status'),
            'priority' => $request->input('priority'),
            'due_date' => $request->input('due_date'),
            'created_by' => Auth::id(),
            'updated_by' => Auth::id() // Assuming you're storing the creator's ID
        ]);

        return redirect()->route('subtask.index')->with('success', 'SubTask created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(SubTask $subtask)
    {
        $messages = Message::where('sub_task_id', $subtask->id)->get();

        return Inertia::render('Subtask/Show', [
            'subtask' => $subtask,
            'messages' => $messages,
            'user' => auth()->user()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubTask $subtask)
    {
        return Inertia::render('Subtask/Edit', ['subtask' => $subtask, 'user' => auth()->user()]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subtask $subtask)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'task_id' => 'required|integer',
            'assigned' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',  // Status can be nullable
            'priority' => 'nullable|string|max:255', // Priority can be nullable
            'due_date' => 'nullable|date',  // Due date can be nullable
        ]);

        // dd("Hello");

        $subtask->update([
            'name' => $request->input('name'),
            'task_id' => $request->input('task_id'),
            'assigned' => $request->input('assigned'),
            'status' => $request->input('status'),
            'priority' => $request->input('priority'),
            'due_date' => $request->input('due_date'),
            'updated_by' => Auth::id() // Assuming you're storing the updater's ID
        ]);

        return redirect()->route('subtask.index')->with('success', 'SubTask updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subtask $subtask)
    {
        $subtask->delete();
        return redirect()->route('subtask.index')->with('success', 'Task deleted successfully.');

    }
}
