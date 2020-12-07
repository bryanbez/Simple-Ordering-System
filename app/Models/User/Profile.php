<?php

namespace App\Models\User;

use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use App\User;

class Profile extends Model
{
    protected $guarded = '';
    protected $table = 'tblProfile';

    public function addUserProfile($request) {
        if (Profile::where('user_id', '=', $request->user_id)->first()['user_id'] == $request->user_id) {
            return 'Already Saved User Profile ID, email and username';
        }
        else {
            try {
                Profile::create([
                    'user_id' => $request->user_id,
                    'email' => $request->email,
                    'user_name' => $request->username
                ]); 

                return 'Profile Saved';
            }
            catch(Exception $e) {
                return 'Error on saving profile'. $e;
            }
        }
     
    }

    public function fetchProfile($user_id) {
        return Profile::where('user_id', $user_id)->firstOrFail();
       
    }

    public function updateProfile($request) {
        try {

            Profile::where('user_name', $request->_value['user_name'])->update([
                'email' => $request->_value['email'],
                'first_name' => $request->_value['first_name'],
                'last_name' => $request->_value['last_name'],
                'middle_initial' => $request->_value['middle_initial'],
                'address' => $request->_value['address'],
                'gender' => $request->_value['gender'],
                'age' => $request->_value['age'],
                'profile_pic' => $this->processImage($request->profile_pic, $request->_value['profile_pic'])
            ]);

            return 'Profile Updated Successfully';
        }
        catch(Exception $e) {
            return 'Failed to Update Profile'. $e;
        }
       
    }

    public function processImage($requestedImage, $savedImage) {


        if ($requestedImage == null) {
            if (strpos($savedImage, 'profileImage')) {
                return substr($savedImage, 38);
            }
            else {
                return $savedImage;
            }
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
            $filename = 'profileImage'.date('mm-dd-yyyy').time().'.'.$extension;
            Storage::disk('local')->put($filename, $decodeImage);
    
            return $filename;
        }
    }

    public function getProfilePicAttribute($value) {
        if ($value == '') {
            return 'http://127.0.0.1:8000/storage/uploads/image1602993495.png';
        }
        else {
            return 'http://127.0.0.1:8000/storage/uploads/'.$value;
        }
        
    }
}
