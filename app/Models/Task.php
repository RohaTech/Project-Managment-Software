<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $table = 'tasks';
    protected $primaryKey = 'id';
    protected $fillable = [
        'name',
        'priority',
        'status',
        'due_date',
        'project_id',
        'start_date',
        'updated_by',
        'created_by',
        'assigned',
        'column_id',
    ];
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'due_date' => 'datetime',
    ];
    public function creator()
    {
        return $this->belongsTo(User::class);
    }
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function assigned()
    {
        return $this->belongsTo(User::class, 'assigned');
    }
    public function subTask()
    {
        return $this->hasMany(SubTask::class);
    }
    public function message()
    {
        return $this->hasMany(Message::class);
    }
    public function attachment()
    {
        return $this->hasMany(Attachment::class);
    }
}
