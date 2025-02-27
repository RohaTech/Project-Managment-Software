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
        // Schema::table('sub_tasks', function (Blueprint $table) {
        //     $table->dropColumn('assigned');
        // });

        // Schema::table('sub_tasks', function (Blueprint $table) {
        //     $table->foreignId("assigned")->nullable()->constrained('users')->onDelete("cascade");
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sub_tasks', function (Blueprint $table) {
            Schema::table('sub_tasks', function (Blueprint $table) {
                $table->dropForeign(['assigned']);
                $table->integer('assigned')->nullable();
            });
        });
    }
};
