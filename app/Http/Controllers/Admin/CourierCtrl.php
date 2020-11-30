<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Courier;
use Illuminate\Http\Request;

class CourierCtrl extends Controller
{

    public $courier;

    public function __construct()
    {
        $this->courier = new Courier;
    }

    public function index()
    {
        return response()->json($this->courier->fetchListOfCourier());
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        return response()->json($this->courier->storeCourier($request));
    }

    public function show($courier_id)
    {
        return response()->json($this->courier->fetchSpecificCourier($courier_id));
    }

    public function edit(Courier $courier)
    {
        //
    }

    public function update(Request $request)
    {
        return response()->json($this->courier->updateCourierInfo($request));
    }

    public function destroy($courier_id)
    {
        return response()->json($this->courier->deleteCourier($courier_id));
    }
}
