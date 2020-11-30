<?php

namespace App\Models\Admin;

use Exception;
use Illuminate\Database\Eloquent\Model;

class Courier extends Model
{
    protected $guarded = '';
    protected $table = 'tblCourier';

    public function storeCourier($request) {
        try {
            $addCourierInfo = new Courier;
            $addCourierInfo->courier_name = $request->courier_name;
            $addCourierInfo->courier_base_price = $request->courier_base_price;
            $addCourierInfo->save();

            return 'Courier Added';
        }
        catch(Exception $e) {
            return 'Failed to Add Courier'. $e;
        }
    }

    public function fetchListOfCourier() {
        try {
            return Courier::all();
        }
        catch(Exception $e) {
            return 'Failed to fetch Courier List'. $e;
        }
    }

    public function fetchSpecificCourier($courier_id) {
        try {
            return Courier::where('courier_id', $courier_id)->first();
        }
        catch(Exception $e) {
            return 'Cannot Fetch Specific Courier'. $e;
        }
    }

    public function updateCourierInfo($request) {

        try {
            Courier::where('courier_id', $request->_value['courier_id'])->update([
                'courier_name' => $request->_value['courier_name'],
                'courier_base_price' => $request->_value['courier_base_price'],
            ]);

            return 'Courier Info Updated';
        }
        catch(Exception $e) {
            return 'Failed to update courier info'. $e;
        }
    }

    public function deleteCourier($courier_id) {

        try {
            Courier::where('courier_id', $courier_id)->delete();
            return 'Courier Info Deleted';
        }
        catch(Exception $e) {
            return 'Failed to remove courier info'. $e;
        }
    }
}
