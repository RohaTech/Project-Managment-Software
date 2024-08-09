<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    // The table associated with the model.
    protected $table = 'projects';

    // The primary key associated with the table.
    protected $primaryKey = 'project_id';

    // The attributes that are mass assignable.
    protected $fillable = [
        'name',
        'description',
        'created_by',
    ];

    // The attributes that should be cast to native types.
    protected $casts = [
        'created_at' => 'datetime',
    ];

    //Define any relationships here if needed, e.g., user
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
