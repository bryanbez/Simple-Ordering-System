<?php

namespace App\Models\User;

use App\Models\Admin\TrackOrder;
use App\Models\User\Cart;
use Exception;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $guarded = '';
    protected $table = 'tblorderdetails';

    function generateRandomOrderId() {
        $result = '';
    
        for($i = 0; $i < 8; $i++) {
            $result .= mt_rand(0, 9);
        }
    
        return $result;
    }
    

    public function storeOrder($request) {

        $arrOfProductInfo = [];

        if (sizeOf($request->productToCheckout['items']) == 1) {
            $arrOfProductInfo = $request->productToCheckout['items'];
        }
        else {
            for($i = 0; $i < sizeOf($request->productToCheckout); $i++) {
                $arrOfProductInfo[] = $request->productToCheckout['items'][$i];
            }
        }

        try {

            $generatedOrderID = $this->generateRandomOrderId();
            $addOrder = new Order;
            $addOrder->order_id = $generatedOrderID;
            $addOrder->total_payment = floatval($request->total_payment);
            $addOrder->product_info = $arrOfProductInfo;
            $addOrder->user_id = $request->user_id['user_id'];
            $addOrder->payment_method = $request->payment_method;
            $addOrder->save();

            $addOrderIdToTrackOrder = new TrackOrder;
            $addOrderIdToTrackOrder->addOrderID($generatedOrderID, $request->courier);

            Cart::where('customer_id', $request->user_id['user_id'])->delete();

            return "Order Created";
        
        }
        catch(Exception $e) {
            
            return "Failed to create order". $e;
        }

    }

    public function showOrderDetails($user_id) {

        return Order::where('user_id', $user_id)->with('trackOrder')->get();
    }


    protected $casts = [
        'product_info' => 'array'
    ];

    public function trackOrder() {
        return $this->belongsTo(TrackOrder::class, 'order_id', 'order_id');    
    }

    public function getCreatedAtAttribute($value)
    {
        return substr($value, 0, -17);
    }


    
}
