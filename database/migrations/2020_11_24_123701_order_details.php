<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OrderDetails extends Migration
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
            $table->unsignedInteger('user_id');
            $table->text('product_added_to_cart');
            $table->string('payment_method', 100);
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
        Schema::dropIfExists('tblOrderDetails');
    }
}
