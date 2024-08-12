<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sub_tasks', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->foreignId("task_id")->constrained('tasks')->onDelete("cascade");
            $table->foreignId("created_by")->constrained('users')->onDelete("cascade");
            $table->foreignId("updated_by")->constrained('users')->onDelete("cascade");
            $table->foreignId("assigned")->constrained('project_members')->onDelete("cascade");
            $table->string("status")->default("pending")->nullable();
            $table->string("priority")->nullable();
            $table->string("due_date")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_tasks');
    }
};
