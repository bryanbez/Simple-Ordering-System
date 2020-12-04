<?php

namespace App\Models\User;
use App\Models\User\Order;
use Illuminate\Database\Eloquent\Model;

class TrackOrder extends Model
{
    protected $guarded = '';
    protected $table = 'tbltrackorder';

    public function addOrderID($order_id) {

        $addOrderToTrack = new TrackOrder;
        $addOrderToTrack->order_id = $order_id;
        $addOrderToTrack->order_status = 'Preparing';
        $addOrderToTrack->is_order_received = 'false';
        $addOrderToTrack->save();
    }
}
