<?php

namespace App;

use App\Models\User\Profile;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function fetchUserList() {

        return User::where('user_type', '!=', 'admin')
            ->where('user_type', '!=', 'customer')->paginate(10);
    }

    public function saveUserDetails($request) {

        try {

            $newUser = new User();
            $newUser->name = $request->username;
            $newUser->email = $request->email;
            $newUser->password = Hash::make($request->password);
            $newUser->user_type = $request->user_type;
            $newUser->save();

            $profileInfo = new Profile();
            $profileInfo->user_id = User::where('email', '=', $request->email)->first()['id'];
            $profileInfo->user_name = User::where('email', '=', $request->email)->first()['name'];
            $profileInfo->email = User::where('email', '=', $request->email)->first()['email'];
            $profileInfo->save();

            return 'User Saved';
        }
        catch(Exception $e) {

            return 'Failed to save user'. $e;
        }

    }

}
