<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Categories;
use Illuminate\Http\Request;

class CategoriesCtrl extends Controller
{
    public $category;

    public function __construct()
    {
        $this->category = new Categories;
    }

    public function index()
    {
        return response()->json($this->category->index());
    }

    public function store(Request $request)
    {
        return response()->json($this->category->store($request));
    }

    public function show($id)
    {
        return response()->json($this->category->show($id));
    }

    public function update(Request $request, $id)
    {
        return response()->json($this->category->updateCategory($request, $id));
      
    }
    public function destroy($id)
    {
        return response()->json($this->category->archive($id));
    }
}
