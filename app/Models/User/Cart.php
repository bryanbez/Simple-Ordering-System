<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $guarded = '';
    protected $table = 'tblcart';

    public function getCartInfo($customer_id) {
        return Cart::where('customer_id', $customer_id)->get();
    }

    public function cartCount($customer_id) {
        return Cart::where('customer_id', $customer_id)->count();
    }

    public function store($request) {
        try {
            $productToAddToCart = new Cart;
            $productToAddToCart->customer_id = $request->user_id;
            $productToAddToCart->product_id = $request->product_id;
            $productToAddToCart->quantity = $request->quantity;
            $productToAddToCart->total_price = $request->total_price;
            $productToAddToCart->save();

            return 'Added To Cart';
        }
        catch(\Exception $e) {
            return 'Failed Add to Cart Item' + $e;
        }
    }
}
