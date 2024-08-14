<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProjectMember extends Model
{

    use HasFactory;
    protected $table = 'ProjectMember';
    protected $primaryKey = 'id';
    protected $fillable = [
        'project_id',
        'created_by',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];
    public $timestamps = true;

    public function creator()
    {
        return $this->belongsTo(User::class);
    }
    public function projects()
    {
        return $this->belongsTo(Project::class);
    }
}
