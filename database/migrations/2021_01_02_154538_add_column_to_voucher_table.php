<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnToVoucherTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tblvouchers', function (Blueprint $table) {
            $table->enum('type_of_voucher', ['percent', 'fixed_amount']);
            $table->unsignedInteger('percent_or_amount')->default(0);
            $table->unsignedInteger('minimum_spend')->default(0);
            $table->unsignedInteger('capped_at')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tblvouchers', function (Blueprint $table) {
            //
        });
    }
}
