<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectInvitation extends Model
{
    use HasFactory;
    protected $table = 'projectinvitations';
    protected $fillable = [
        'email',
        'token',
        'project_id',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    protected $attributes = [
        'status' => 'pending', // Default status when an invitation is created
    ];
    public function project()
    {
        return $this->belongsTo(Project::class);
    }
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}
