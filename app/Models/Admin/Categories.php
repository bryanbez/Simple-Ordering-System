<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categories extends Model
{
    protected $guarded = '';
    protected $table = 'tbl_product_categories';
    use SoftDeletes;

    public function index()
    {
        return Categories::where('deleted_at', NULL)->paginate(5);
    }

    public function show($id) {
        return Categories::where('category_id', $id)->firstOrFail();
    }

    public function store($request)
    {
        try {
            $category = new Categories;
            $category->category_name = $request->category_name;
            $category->category_desc = $request->category_desc;
            $category->save();
            return 'Category Saved! ';
        }
        catch(\Exception $e) {
            return 'Category Failed to Save';
        }
    }

    public function updateCategory($request, $id)
    {
        try {
            Categories::where('category_id', $id)->update([
                'category_name' => $request->category_name,
                'category_desc' => $request->category_desc,
            ]);
            return 'Category Updated! ';
        }
        catch(\Exception $e) {
            return 'Category Failed to Update';
        }
      
    }

    public function archive($id) {
        try {
            Categories::where('category_id', "=", $id)->delete();
            return 'Category Archived! ';
        }
        catch(\Exception $e) {
            return 'Category Failed to Archive';
        }
    }
}
