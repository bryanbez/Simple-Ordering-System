<?php

namespace App\Models\Admin;
use App\Models\User\Order;
use Illuminate\Database\Eloquent\Model;

class TrackOrder extends Model
{
    protected $guarded = '';
    protected $table = 'tbltrackorder';

    public function addOrderID($order_id, $courier_id) {

        $addOrderToTrack = new TrackOrder;
        $addOrderToTrack->order_id = $order_id;
        $addOrderToTrack->courier_id = $courier_id;
        $addOrderToTrack->order_status = 'Preparing';
        $addOrderToTrack->is_order_received = 'false';
        $addOrderToTrack->save();
    }

    public function showOrdersInStaffOrCourier($order_status) {

        return TrackOrder::where('order_status', '=', $order_status)->with('order')->get();
    }

    public function order() {
        return $this->hasOne(Order::class, 'order_id', 'order_id');    
    }

}
