<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\TrackOrder;
use Illuminate\Http\Request;

class TrackOrderController extends Controller
{

    public $trackOrder;

    public function __construct()
    {
        $this->trackOrder = new TrackOrder();
    }
  
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($order_status)
    {
        return response()->json($this->trackOrder->showOrdersInStaffOrCourier($order_status));
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
