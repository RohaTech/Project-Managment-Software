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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->foreignId("project_id")->constrained('projects')->onDelete("cascade");
            $table->foreignId("created_by")->constrained('users')->onDelete("cascade");
            $table->foreignId("updated_by")->constrained('users')->onDelete("cascade");
            $table->foreignId("assigned")->nullable()->constrained('users')->onDelete("cascade");
            $table->string("status")->default("Not Started");
            $table->boolean('approved')->default(false);
            $table->string("priority")->nullable();
            $table->string("due_date")->nullable();
            // $table->json('additional_column')->nullable();
            $table->text('description')->nullable();
            $table->unsignedBigInteger('parent_task_id')->nullable(); // Self-referencing foreign key
            // $table->foreign('parent_task_id')->references('id')->on('tasks')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
