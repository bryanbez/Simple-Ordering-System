<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin\Voucher;

class VoucherCtrl extends Controller
{
    public $voucher;

    public function __construct()
    {
        $this->voucher = new Voucher();
    }
   
    public function index()
    {
        return response()->json($this->voucher->fetchVoucherList());
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'code' => 'required',
            'name' => 'required',
            'description' => 'required',
            'count' => 'required|numeric',
            'type_of_voucher' => 'required',
            'percent_or_amount' => 'required|numeric',
            'is_available' => 'required'
        ]);

        return response()->json($this->voucher->saveVoucher($request));
    }

    public function show($id)
    {
        return response()->json($this->voucher->showSingleVoucher($id));
    }

    public function showVoucherAvailabilityOrCount(Request $request) {
        return response()->json($this->voucher->showVoucherAvailability($request));
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'voucher_code' => 'required',
            'voucher_name' => 'required',
            'voucher_description' => 'required',
            'voucher_count' => 'required|numeric',
            'type_of_voucher' => 'required',
            'percent_or_amount' => 'required|numeric',
            'is_available' => 'required'
        ]);

        return response()->json($this->voucher->updateVoucher($request));
    }

    public function destroy($id)
    {
        return response()->json($this->voucher->deleteVoucher($id));
    }
}
