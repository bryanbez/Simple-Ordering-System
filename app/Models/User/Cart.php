<?php

namespace App\Models\User;

use App\Models\Admin\Products;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $guarded = '';
    protected $table = 'tblcart';

    public $cart_id;

    public function getCartInfo($customer_id) {
        return Cart::where('customer_id', $customer_id)->with('products')->get();
    }

    public function cartCount($customer_id) {
        return Cart::where('customer_id', $customer_id)->count();
    }

    public function store($request) {

        if (Cart::where('product_id', $request->product_id)->first()) {
            $this->cart_id = Cart::where('product_id', $request->product_id)->first()['cart_id'];
            return $this->changeQtyCart($request);
        }
        else {
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

    public function itemInfo($cart_id) {

        return Cart::where('cart_id', $cart_id)->with('products')->firstOrFail();
    }

    public function products() {
        return $this->belongsTo(Products::class, 'product_id', 'product_id');    
    }

    public function changeQtyCart($cartInfo) {
        if ($this->cart_id) {
            try {
                $cartIncrease = (int) Cart::where('cart_id', $this->cart_id)->first()['quantity'] + (int) $cartInfo->quantity;
                $totalPrice = (double) Products::where('product_id', $cartInfo->product_id)->first()['product_price'] * (int) $cartIncrease;
                Cart::where('cart_id', $this->cart_id)->update([
                    'quantity' => $cartIncrease,
                    'total_price' => $totalPrice,
                ]);
                return 'Cart Updated! ';
            }
            catch(\Exception $e) {
                return 'Cart Quantity Failed to Update' + $e->getMessage();
            }
        }
        else {
            try {
                Cart::where('cart_id', $cartInfo->cart_id)->update([
                    'quantity' => $cartInfo->quantity,
                    'total_price' => $cartInfo->total_price,
                ]);
                return 'Cart Updated! ';
            }
            catch(\Exception $e) {
                return 'Cart Quantity Failed to Update' + $e->getMessage();
            }
        }
      
    }

    public function deleteCartItem($cart_id) {
        try {
            Cart::where('cart_id', $cart_id)->delete();
            return 'Cart Item Removed!';
        }
        catch(\Exception $e) {
            return 'Cart Item Failed to Remove'. $e;
        }
    }


}
