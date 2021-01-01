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
        return response()->json($this->voucher->saveVoucher($request));
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
