<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddressMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblUserAddress', function (Blueprint $table) {
            $table->unsignedInteger('user_id');
            $table->text('street_phase_or_building')->nullable();
            $table->unsignedInteger('barangay_no')->nullable();
            $table->string('barangay_name', 255)->nullable();
            $table->string('city')->nullable();
            $table->string('region')->default('NCR');
            $table->string('country')->default('Philippines');
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
        Schema::drop('tblUserAddress');
    }
}
