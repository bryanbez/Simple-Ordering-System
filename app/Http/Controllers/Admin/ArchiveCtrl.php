<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin\Products;
use App\Models\Admin\Categories;

class ArchiveCtrl extends Controller
{
    public function fetchArchivedProducts() {

        return Products::onlyTrashed()->paginate(5);
    }

    public function fetchArchivedCategory() {

        return Categories::onlyTrashed()->paginate(5);
    }

    public function restoreArchivedProduct($id) {
      try {
            Products::where('product_id', $id)->restore();
            return response()->json('Product Restored!');
        }
        catch(\Exception $e) {
            return response()->json('No Product Found!' + $e);
        }
    }

    public function restoreArchivedCategory($id) {    
        
        try  {

            Categories::where('category_id', $id)->restore();
            $getCategoryName = Categories::where('category_id', $id)->get('category_name');
            Products::where('product_type', $getCategoryName)->restore();
         
            return response()->json('Category Restored!');
        }
        catch(\Exception $e) {
            return response()->json('No Category Found!');
        }
     
    }

    public function deleteArchivedProduct($id) {
        try {
            Products::where('product_id', $id)->forceDelete();
            return response()->json('Product Deleted!');
        }
        catch(\Exception $e) {
            return response()->json('Cannot delete product!' + $e);
        }
    }

    public function deleteArchivedCategory($id) {
        try {

            $categoryName = Categories::onlyTrashed()->where('category_id', $id)->get('category_name');
            Products::where('product_type', $categoryName)->forceDelete();
            Categories::where('category_id', $id)->forceDelete();
            // logic on deleting all products with related to the deleted category
            // skip becuse its complicated 
            return response()->json('Category Deleted!');
        }
        catch(\Exception $e) {
            return response()->json('Cannot delete category!' + $e);
        }
    }
}
