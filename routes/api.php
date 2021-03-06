<?php

use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('product', 'Admin\ProductsCtrl');
Route::resource('category', 'Admin\CategoriesCtrl');
Route::resource('cart', 'User\CartController');
Route::resource('profile', 'User\ProfileController');
Route::resource('courier', 'Admin\CourierCtrl');
Route::resource('order', 'User\OrderController');
Route::resource('address', 'User\AddressController');
Route::resource('track_order', 'Admin\TrackOrderController');
Route::resource('user_of_app', 'Admin\UsersController');
Route::resource('voucher', 'Admin\VoucherCtrl');

Route::get('cart/count/{id}', 'User\CartController@cartCount');
Route::get('cart/info/{cart_id}', 'User\CartController@itemInfo');
Route::put('cart/info/{cart_id}', 'User\CartController@changeQuantity');


Route::get('archive/products', 'Admin\ArchiveCtrl@fetchArchivedProducts');
Route::get('archive/categories', 'Admin\ArchiveCtrl@fetchArchivedCategory');

Route::get('product/search/{productKeyword}', 'Admin\ProductsCtrl@searchProduct');

Route::put('archive/restore/product/{id}', 'Admin\ArchiveCtrl@restoreArchivedProduct');
Route::put('archive/restore/category/{id}', 'Admin\ArchiveCtrl@restoreArchivedCategory');

Route::delete('archive/delete/product/{id}', 'Admin\ArchiveCtrl@deleteArchivedProduct');
Route::delete('archive/delete/category/{id}', 'Admin\ArchiveCtrl@deleteArchivedCategory');

Route::post('voucher/to_use', 'Admin\VoucherCtrl@showVoucherAvailabilityOrCount');