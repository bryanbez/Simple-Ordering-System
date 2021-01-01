<?php

namespace App\Models\Admin;

use Exception;
use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    protected $guarded = '';
    protected $table = 'tblvouchers';

    public function saveVoucher($request) {

        try {

            $newVoucher = new Voucher();
            $newVoucher->voucher_code = $request->code;
            $newVoucher->voucher_name = $request->name;
            $newVoucher->voucher_description = $request->description;
            $newVoucher->voucher_count = $request->count;
            $newVoucher->is_available = $request->is_available;
            $newVoucher->save();
    
            return 'Voucher Information Saved';
        }
        catch(Exception $e) {

            return 'Problem saving voucher information'. $e;
        }

    }

    public function fetchVoucherList() {

        return Voucher::all();
    }

}
