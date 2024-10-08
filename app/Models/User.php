<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function projects()
    {
        return $this->hasMany(Project::class, 'created_by');
    }
    public function members()
    {
        return $this->belongsToMany(ProjectMember::class, 'project_members');
    }
    public function message()
    {
        return $this->hasMany(Message::class);
    }

    public function activitylog()
    {
        return $this->hasMany(ActivityLog::class);
    }
    public function subtask()
    {
        return $this->hasMany(SubTask::class);
    }
}
