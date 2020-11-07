<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use DB;

class Products extends Model
{
    protected $guarded = '';
    protected $table = 'tbl_products';
    use SoftDeletes;

    public function index()
    {   
        if (isset($_GET['sort'])) {
            if ($_GET['sort'] == 'reset_sort') {
                return Products::where('deleted_at', NULL)->paginate(10);
            }
            return Products::where('deleted_at', NULL)->orderBy($_GET['sort'])->paginate(10);
        }
  
        return Products::where('deleted_at', NULL)->paginate(10);
       
    }
    
    public function show($id) {
        return Products::where('product_id', $id)->firstOrFail();
    }

    public function getProductImageAttribute($value) {
        if ($value == '') {
            return 'http://127.0.0.1:8000/storage/uploads/image1602993495.png';
        }
        else {
            return 'http://127.0.0.1:8000/storage/uploads/'.$value;
        }
        
    }

    public function store($request)
    {
        if ($request->product_image == '') {
            return $this->addProductQuery($request, 'productImage1010-no-image.png');
        }
        else {
            return $this->addProductQuery($request, $this->processImage($request->product_image));
        }
        
    }

    public function updateProduct($request, $product_id)
    {
        if (strpos($request->_value['product_image'], 'data:image') !== false) {
            return $this->updateQuery($request, $product_id, $request->_value['product_image']);
        }
        else {
            return $this->updateQuery($request, $product_id, $request->_value['product_image']);
        }
      
    }

    public function updateQuery($request, $product_id, $productImage) {
    
        try {
            Products::where('product_id', $product_id)->update([
                'product_image' => $this->processImage($productImage),
                'product_name' => $request->_value['product_name'],
                'product_type' => $request->_value['product_type'],
                'product_desc' => $request->_value['product_desc'],
                'product_price' => floatval($request->_value['product_price']),
                'deleted_at' => null
            ]);
            return 'Product Updated! ';
        }
        catch(\Exception $e) {
            return 'Product Failed to Update' + $e->getMessage();
        }
    }

    public function archive($id) {
        try {
            Products::where('product_id', '=', $id)->delete();
            return 'Product Archived!';
        }
        catch(\Exception $e) {
            return 'Product Failed to Archive';
        }
    }

    public function addProductQuery($request, $filename) {
        try {
            $product = new Products;
            $product->product_image = $filename;
            $product->product_name = $request->product_name;
            $product->product_type = $request->product_type;
            $product->product_desc = $request->product_desc;
            $product->product_price = (double) $request->product_price;
            $product->deleted_at = null;
            $product->save();

            return 'Product Saved';
        }
        catch(\Exception $e) {
            return 'Product Failed to Save' + $e;
        }
    }

    public function searchProduct($productKeyword) {
       return Products::where('product_name', 'LIKE', '%'.$productKeyword.'%')->paginate(4);
    }

    public function processImage($requestedImage) {

        if (strpos($requestedImage, 'productImage')) {
            return substr($requestedImage, 38);
        }
        else {
            $explodebasefile = explode(',', $requestedImage);
            $decodeImage = base64_decode($explodebasefile[1]);
            if (strpos($explodebasefile[0], 'jpeg') === true) {
               $extension = 'jpeg';
            }
            else if (strpos($explodebasefile[0], 'jpg') === true) {
               $extension = 'jpeg';
            }
            else {
              $extension = 'png';
            }
            $filename = 'productImage'.date('mm-dd-yyyy').time().'.'.$extension;
            Storage::disk('local')->put($filename, $decodeImage);
    
            return $filename;
        }
    }
}
