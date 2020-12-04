<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OrderDetailsMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblOrderDetails', function (Blueprint $table) {
            $table->id('order_id');
            $table->json('product_info');
            $table->unsignedInteger('user_id');
            $table->timestamps();
        });
    }

    /**tbltrackorder
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tblOrderDetails');
    }
}
