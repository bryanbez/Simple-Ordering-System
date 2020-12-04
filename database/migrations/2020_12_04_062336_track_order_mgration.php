<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TrackOrderMgration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblTrackOrder', function (Blueprint $table) {
            $table->id('track_order_id');
            $table->unsignedInteger('order_id');
            $table->string('order_status');
            $table->enum('is_order_received', ['true', 'false']);
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
        Schema::dropIfExists('tblTrackOrder');
    }
}
