<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CartMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblCart', function (Blueprint $table) {
            $table->id('cart_id');
            $table->unsignedInteger('customer_id');
            $table->unsignedInteger('product_id');
            $table->unsignedInteger('quantity');
            $table->double('total_price');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('tblCart');
    }
}
