<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductPost;
use Illuminate\Http\Request;
use App\Models\Admin\Products;

class ProductsCtrl extends Controller
{
    public $product;

    public function __construct()
    {
        $this->product = new Products;
    }

    public function index()
    {  
  
        return response()->json($this->product->index());
    }

    public function store(StoreProductPost $request)
    {
        $validated = $request->validated();
        return response()->json($this->product->store($request));
    }

    public function show($id)
    {
        return response()->json($this->product->show($id));
    }

    public function update(Request $request, $product_id)
    { 
        // $validated = $request->validated();
        return response()->json($this->product->updateProduct($request, $product_id));
    }

    public function searchProduct($productKeyword) {
        return response()->json($this->product->searchProduct($productKeyword));
    }

    public function destroy($id)
    {
        return response()->json($this->product->archive($id));
    }
}
