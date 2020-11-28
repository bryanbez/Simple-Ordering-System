<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ProfileMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblProfile', function (Blueprint $table) {
            $table->unsignedInteger('user_id');
            $table->string('user_name');
            $table->string('first_name', 255)->nullable();
            $table->string('last_name', 255)->nullable();
            $table->string('middle_initial', 255)->nullable();
            $table->text('address')->nullable();
            $table->string('email', 255);
            $table->enum('gender', ['male', 'female', 'prefer_not_to_say'])->nullable();
            $table->integer('age')->nullable();
            $table->text('profile_pic')->nullable();
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
        Schema::drop('tblProfile');
    }
}
