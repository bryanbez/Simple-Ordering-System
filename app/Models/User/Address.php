<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $guarded = '';
    protected $table = 'tbluseraddress';

    public function addAddress($user_info) {

        if (Address::where('user_id', '=', $user_info->user_id)->first()['user_id'] == $user_info->user_id) {
            return 'Already Saved User Id';
        }
        else {
            try {
                $addAddress = new Address;
                $addAddress->user_id = $user_info->user_id;
                $addAddress->save();
    
                return 'Address Saved';
            }
            catch(\Exception $e) {
                return 'Failed to save address'. $e;
            }
        }      
    }


}
