<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;
    protected $table = 'projects';
    protected $fillable = [
        'name',
        'description',
        'created_by',
        'updated_by',
        "additional_column",
        "status"
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'additional_column' => 'array'
    ];
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function updateBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function activities()
    {
        return $this->hasMany(ActivityLog::class);
    }

    public function members()
    {
        return $this->hasMany(ProjectMember::class);
    }

    public function invitation()
    {
        return $this->hasMany(ProjectInvitation::class);
    }
}
