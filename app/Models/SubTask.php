<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubTask extends Model
{
    use HasFactory;
    protected $table = 'sub_tasks';
    protected $fillable = [
        'name',
        'priority',
        'status',
        'due_date',
        'created_by',
        'updated_by',
        'task_id',
        'start_date',
        'user_id',

    ];
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'due_date' => 'datetime',
        'start_date' => 'datetime',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class);
    }
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
    public function message()
    {
        return $this->hasMany(Message::class);
    }
}
