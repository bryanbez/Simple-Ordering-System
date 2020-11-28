<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User\Profile;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public $cart;

    public function __construct()
    {
        $this->profile = new Profile();
    }

    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($user_name)
    {
        return response()->json($this->profile->fetchProfile($user_name));
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request)
    {
        return response()->json($this->profile->updateProfile($request));
    }

    public function destroy($id)
    {
        //
    }
}
