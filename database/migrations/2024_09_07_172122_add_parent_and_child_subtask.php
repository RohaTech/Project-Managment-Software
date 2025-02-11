<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tasks', function (Blueprint $table) {
            // $table->text('description')->nullable();
            // $table->unsignedBigInteger('parent_task_id')->nullable(); // Self-referencing foreign key
            // $table->foreign('parent_task_id')->references('id')->on('tasks')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropColumn('description');
            $table->dropForeign('parent_task_id');
            $table->dropColumn('parent_task_id');
        });
    }
};
