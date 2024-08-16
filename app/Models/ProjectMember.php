<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectMember extends Model
{

    use HasFactory;
    protected $table = 'project_members';
    protected $fillable = [
        'project_id',
        'user_id',
        "role,"
    ];




    public function creator()
    {
        return $this->belongsTo(User::class);
    }
    public function projects()
    {
        return $this->belongsTo(Project::class);
    }
}
