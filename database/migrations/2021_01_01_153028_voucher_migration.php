<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class VoucherMigration extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tblvouchers', function (Blueprint $table) {
            $table->id('voucher_id');
            $table->string('voucher_code');
            $table->text('voucher_description');            
            $table->unsignedInteger('voucher_count')->default(0);
            $table->enum('is_available', ['yes', 'no']);
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
        Schema::dropIfExists('tblvouchers');
    }
}
