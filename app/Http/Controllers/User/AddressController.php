<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{

    public $address;

    public function __construct()
    {
        $this->address = new Address();
    }
  
    public function index()
    {
        //
    }

    public function create()
    {
        
    }

    public function store(Request $request)
    {
        return response()->json($this->address->addAddress($request));
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
