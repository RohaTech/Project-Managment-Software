<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('projectinvitations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->onDelete('cascade'); // Foreign key to projects table
            $table->string('email')->index(); // Email of the invitee
            $table->string('token', 64)->unique(); // Unique invitation token
            $table->enum('status', ['pending', 'accepted', 'declined'])->default('pending'); // Status of the invitation
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('projectinvitations');
    }
};
