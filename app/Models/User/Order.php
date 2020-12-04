<?php

namespace App\Models\User;

use App\Models\User\TrackOrder;
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

        for($i = 0; $i < sizeOf($request->productToCheckout); $i++) {
            $arrOfProductInfo[] = $request->productToCheckout['items'][$i];
        }

        try {

            $generatedOrderID = $this->generateRandomOrderId();
            $addOrder = new Order;
            $addOrder->order_id = $generatedOrderID;
            $addOrder->product_info = $arrOfProductInfo;
            $addOrder->user_id = $request->user_id['user_id'];
            $addOrder->total_payment = $request->total_payment;
            $addOrder->save();

            $addOrderIdToTrackOrder = new TrackOrder;
            $addOrderIdToTrackOrder->addOrderID($generatedOrderID);

            return "Order Created";

        }
        catch(Exception $e) {
            return "Failed to create record". $e;
        }
   
       
    }

    protected $casts = [
        'product_info' => 'array'
    ];

    
}
