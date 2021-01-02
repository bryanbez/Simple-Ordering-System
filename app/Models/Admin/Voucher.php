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

    public function showSingleVoucher($voucher_id) {

        return Voucher::where('voucher_id', $voucher_id)->first();
    }

    public function updateVoucher($request) {

        try {
            Voucher::where('voucher_id', $request->voucher_id)->update([
                'voucher_code' => $request->voucher_code,
                'voucher_name' => $request->voucher_name,
                'voucher_description' => $request->voucher_description,
                'voucher_count' => $request->voucher_count,
                'is_available' => $request->is_available
            ]);

            return 'Voucher Information Updated';
        }
        catch(\Exception $e) {
            return 'Failed to Update Voucher Information'. $e;
        }

    }

}
