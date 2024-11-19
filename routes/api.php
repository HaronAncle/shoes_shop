<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\AsyncPublic\MaincategorySubsearchController;
use App\Http\Controllers\AsyncPublic\GetNewsListController;
use App\Http\Controllers\AsyncPublic\MainPageController;
use App\Http\Controllers\AsyncPublic\SearchController;
use App\Http\Controllers\AsyncPublic\GetItemPageInfoController;
use App\Http\Controllers\AsyncPublic\GetBusketInfoController;
use App\Http\Controllers\AsyncPublic\CheckController;
use App\Http\Controllers\AsyncPublic\POST\ReviewsItemController;
use App\Http\Controllers\AsyncPublic\POST\OrderController;
use App\Http\Controllers\Dashboard\GetOrdersInfoController;
use App\Http\Controllers\Dashboard\NotificationController;
use App\Http\Controllers\Workers\Admin\AdminMaterialInsController;
use App\Http\Controllers\Workers\Admin\AdminMaterialOutController;
use App\Http\Controllers\Workers\Admin\AdminMaterialSoleController;
use App\Http\Controllers\Workers\Admin\AdminMaterialHeepiesController;
use App\Http\Controllers\Workers\Admin\AdminMaterialColorController;
use App\Http\Controllers\Workers\Admin\AdminMaterialClaspController;
use App\Http\Controllers\Workers\Admin\AdminBrandController;
use App\Http\Controllers\Workers\Admin\AdminStateController;
use App\Http\Controllers\Workers\Admin\AdminItemController;
use App\Http\Controllers\Workers\Admin\AdminOrderController;
use App\Http\Controllers\Workers\Admin\AdminItemCountController;


use App\Http\Controllers\ImageUploadController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/maincategory/subsearch/category', [MaincategorySubsearchController::class, 'getDataCategories']);
Route::get('/maincategory/subsearch/brends', [MaincategorySubsearchController::class, 'getDataBrends']);

Route::get('/states/getstatelist', [GetNewsListController::class, 'getDataNewsList']);
Route::get('/states/getstatebyid/{id}', [GetNewsListController::class, 'getDataNewsById']);


Route::get('/mainpage/brendlist', [MainPageController::class, 'getBrandsInfo']);
Route::get('/mainpage/categoruline', [MainPageController::class, 'getCategoryLineInfo']);
Route::get('/mainpage/likeproductline', [MainPageController::class, 'getLikeProductsInfo']);
Route::get('/mainpage/banners', [MainPageController::class, 'getBanners']); 

Route::get('/search/getfilters', [SearchController::class, 'getFiltersCriteries']);
Route::get('/search/getitems', [SearchController::class, 'getItems']);

Route::get('/model/getrecomended', [GetItemPageInfoController::class, 'getRecomendedItemList']);
Route::get('/model/getreviews', [GetItemPageInfoController::class, 'getReviewsList']);

Route::middleware('auth:sanctum')->get('/check/check-user', [CheckController::class, 'checkUser']);
Route::get('/check/check-item/{id}', [CheckController::class, 'checkProduct']);
Route::post('/reviews', [ReviewsItemController::class, 'store']);

Route::get('/usercheck', function () {
    return Auth::check() ? Auth::user() : null;
});


Route::get('/busket/getall', [GetBusketInfoController::class, 'getInfo']);




Route::post('/order/makeorder', [OrderController::class, 'store']);








Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/getorderinfo/{userId}', [GetOrdersInfoController::class, 'getOrderList']);
    Route::get('/dashboard/notifications/{userId}', [NotificationController::class, 'getNotifications']);
    Route::post('/dashboard/notifications/mark-as-read', [NotificationController::class, 'markAsRead']);


    Route::get('/workpanel/admin/materialsIns', [AdminMaterialInsController::class, 'index']);
    Route::post('/workpanel/admin/materialsIns', [AdminMaterialInsController::class, 'store']);
    Route::put('/workpanel/admin/materialsIns/{id}', [AdminMaterialInsController::class, 'update']);
    Route::delete('/workpanel/admin/materialsIns/{id}', [AdminMaterialInsController::class, 'destroy']);

    Route::get('/workpanel/admin/materialsOut', [AdminMaterialOutController::class, 'index']);
    Route::post('/workpanel/admin/materialsOut', [AdminMaterialOutController::class, 'store']);
    Route::put('/workpanel/admin/materialsOut/{id}', [AdminMaterialOutController::class, 'update']);
    Route::delete('/workpanel/admin/materialsOut/{id}', [AdminMaterialOutController::class, 'destroy']);

    Route::get('/workpanel/admin/materialsSole', [AdminMaterialSoleController::class, 'index']);
    Route::post('/workpanel/admin/materialsSole', [AdminMaterialSoleController::class, 'store']);
    Route::put('/workpanel/admin/materialsSole/{id}', [AdminMaterialSoleController::class, 'update']);
    Route::delete('/workpanel/admin/materialsSole/{id}', [AdminMaterialSoleController::class, 'destroy']);

    Route::get('/workpanel/admin/materialsClasp', [AdminMaterialClaspController::class, 'index']);
    Route::post('/workpanel/admin/materialsClasp', [AdminMaterialClaspController::class, 'store']);
    Route::put('/workpanel/admin/materialsClasp/{id}', [AdminMaterialClaspController::class, 'update']);
    Route::delete('/workpanel/admin/materialsClasp/{id}', [AdminMaterialClaspController::class, 'destroy']);

    Route::get('/workpanel/admin/materialsColor', [AdminMaterialColorController::class, 'index']);
    Route::post('/workpanel/admin/materialsColor', [AdminMaterialColorController::class, 'store']);
    Route::put('/workpanel/admin/materialsColor/{id}', [AdminMaterialColorController::class, 'update']);
    Route::delete('/workpanel/admin/materialsColor/{id}', [AdminMaterialColorController::class, 'destroy']);

    Route::get('/workpanel/admin/materialsHeelpies', [AdminMaterialHeepiesController::class, 'index']);
    Route::post('/workpanel/admin/materialsHeelpies', [AdminMaterialHeepiesController::class, 'store']);
    Route::put('/workpanel/admin/materialsHeelpies/{id}', [AdminMaterialHeepiesController::class, 'update']);
    Route::delete('/workpanel/admin/materialsHeelpies/{id}', [AdminMaterialHeepiesController::class, 'destroy']);


    Route::get('/workpanel/admin/brands', [AdminBrandController::class, 'index']);
    Route::post('/workpanel/admin/brands', [AdminBrandController::class, 'store']);
    Route::post('/workpanel/admin/brands/{id}', [AdminBrandController::class, 'update']);
    Route::delete('/workpanel/admin/brands/{id}', [AdminBrandController::class, 'destroy']);


    Route::get('/workpanel/admin/states', [AdminStateController::class, 'index']);
    Route::post('/workpanel/admin/states', [AdminStateController::class, 'store']);
    Route::post('/workpanel/admin/states/{id}', [AdminStateController::class, 'update']);
    Route::delete('/workpanel/admin/states/{id}', [AdminStateController::class, 'destroy']);


    Route::get('/workpanel/admin/items/info', [AdminItemController::class, 'info']);
    Route::get('/workpanel/admin/items', [AdminItemController::class, 'index']);
    Route::post('/workpanel/admin/items', [AdminItemController::class, 'store']);
    Route::put('/workpanel/admin/items/{id}', [AdminItemController::class, 'update']);
    Route::delete('/workpanel/admin/items/{id}', [AdminItemController::class, 'destroy']);

    Route::get('/workpanel/admin/orders', [AdminOrderController::class, 'index']);
    Route::get('/workpanel/admin/getOrdersStatuses', [AdminOrderController::class, 'orderStatuses']);
    Route::post('/workpanel/admin/orders/{id}', [AdminOrderController::class, 'updateStatus']);
    Route::delete('/workpanel/admin/orders/{id}', [AdminOrderController::class, 'destroy']);


    Route::get('/workpanel/admin/postavki', [AdminItemCountController::class, 'index']);
    Route::put('/workpanel/admin/postavki/{id}', [AdminItemCountController::class, 'update']);




    ///сделать прочие 




    Route::get('/workpanel/worker/order', [AdminMaterialInsController::class, 'index']);
    Route::put('/workpanel/worker/order/{id}', [AdminMaterialInsController::class, 'update']);



   



    Route::post('/image-upload', [ImageUploadController::class, 'upload']);
});