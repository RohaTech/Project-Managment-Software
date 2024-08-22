<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AttachmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'message_id' => 'required|exists:messages,id',
            'attachment' => 'required|file|max:2048', // Adjust the max size as needed
        ]);

        $filePath = $request->file('attachment')->store('attachments', 'public');
        $fileName = $request->file('attachment')->getClientOriginalName();

        $attachment = Attachment::create([
            'message_id' => $request->input('message_id'),
            'file_path' => $filePath,
            'file_name' => $fileName,
        ]);

        return response()->json($attachment, 201);
    }

    public function destroy($id)
    {
        $attachment = Attachment::findOrFail($id);
        Storage::disk('public')->delete($attachment->file_path);
        $attachment->delete();

        return response()->json(['message' => 'Attachment deleted successfully'], 200);
    }
}
