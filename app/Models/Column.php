<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'content',
        'type',
        'task_id',
     ];

     protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'due_date' => 'datetime',
    ];
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
    public function subtask()
    {
        return $this->belongsTo(SubTask::class);
    }
}
