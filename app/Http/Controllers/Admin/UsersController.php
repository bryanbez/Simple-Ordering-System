<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{

    public $users;

    public function __construct() {

        $this->users = new User();
    }
   
    public function index()
    {
        return response()->json($this->users->fetchUserList());
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
    
        $validatedData = $request->validate([
            'username' => 'required',
            'email' => 'required',
            'user_type' => 'required',
            'password' => 'required',
        ]);

        //return $request;

        return response()->json($this->users->saveUserDetails($request));
    }

    public function show($user_type)
    {
        //return response()->json($this->users->fetchUserListByType($user_type));
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
