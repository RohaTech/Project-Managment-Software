<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;
    protected $table = 'projects';
    protected $primaryKey = 'project_id';
    protected $fillable = [
        'name',
        'content',
        'user_id',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];
    public function creator()
    {                   
        return $this->belongsTo(User::class, 'created_by');
    }
    public function projects()
    {
        return $this->hasMany(Task::class, 'project_Id');
    }

}