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
            $newVoucher->type_of_voucher = $request->type_of_voucher;
            $newVoucher->percent_or_amount = $request->percent_or_amount;
            $newVoucher->is_available = $request->is_available;
            $newVoucher->minimum_spend = $request->minimum_spend;
            $newVoucher->capped_at = $request->capped_at;
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
                'type_of_voucher' => $request->type_of_voucher,
                'percent_or_amount' => $request->percent_or_amount,
                'is_available' => $request->is_available,
                'minimum_spend' => $request->minimum_spend,
                'capped_at' => $request->capped_at
            ]);

            return 'Voucher Information Updated';
        }
        catch(\Exception $e) {
            return 'Failed to Update Voucher Information'. $e;
        }

    }

    public function deleteVoucher($id) {

        try {
            Voucher::where('voucher_id', $id)->delete();
            return 'Voucher Delete Successfully';
        }
        catch(\Exception $e) {
            return 'Failed to Delete Voucher';
        }
    }

}
