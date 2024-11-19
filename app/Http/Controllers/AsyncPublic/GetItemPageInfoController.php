<?php

namespace App\Http\Controllers\AsyncPublic;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class GetItemPageInfoController extends Controller
{
    public function getRecomendedItemList(Request $request)
    {
        $id = $request->input('id');
        $item = DB::table('items')
            ->where('id', $id)
            ->first();
    
        if ($item) {
            $maincategory_id = $item->maincategory_id;
            $childcategory_id = $item->category_id;
        } else {
            $maincategory_id = 0;
            $childcategory_id = 0;
        }

        $query = DB::table('items')
            ->join('maincategories', 'items.maincategory_id', '=', 'maincategories.id')
            ->join('item_sizes_lists', 'items.id', '=', 'item_sizes_lists.item_id')
            ->join('sizes', 'item_sizes_lists.size_id', '=', 'sizes.id')
            ->leftJoin('childcategories', 'items.category_id', '=', 'childcategories.id')
            ->leftJoin('action_item_list', 'items.id', '=', 'action_item_list.item_id')
            ->leftJoin('actions', function($join) {
                $join->on('action_item_list.action_id', '=', 'actions.id')
                    ->whereRaw('NOW() BETWEEN actions.start_day AND actions.end_day');
            })
            ->select(
                'items.id',
                'items.title',
                'items.model_name AS model',
                'items.urlimages',
                'childcategories.title AS category',
                DB::raw('SUM(item_sizes_lists.total_count) AS total_quantity'),
                DB::raw('ROUND(COALESCE(items.price - (items.price * MAX(action_item_list.discount_percent) / 100), items.price), 2) AS actual_price')
            )
            ->where('items.id', '!=', $id)
            ->whereNull('items.deleted_at') 
            ->groupBy('items.id')
            ->orderBy('total_quantity', 'DESC');
    
        // Добавление условий в запрос
        if ($childcategory_id != 0) {
            $query->where('items.category_id', $childcategory_id);
        }
        if ($maincategory_id != 0) {
            $query->orWhere('items.maincategory_id', $maincategory_id);
        }
    
        // Выполнение основного запроса
        $data = $query->limit(7)->get();
    
        // Если недостаточно данных, получение дополнительных элементов
        if ($data->count() < 7) {
            $reqCount = 7 - $data->count();
            $additionalData = DB::table('items')
                ->join('maincategories', 'items.maincategory_id', '=', 'maincategories.id')
                ->join('item_sizes_lists', 'items.id', '=', 'item_sizes_lists.item_id')
                ->join('sizes', 'item_sizes_lists.size_id', '=', 'sizes.id')
                ->leftJoin('childcategories', 'items.category_id', '=', 'childcategories.id')
                ->leftJoin('action_item_list', 'items.id', '=', 'action_item_list.item_id')
                ->leftJoin('actions', function($join) {
                    $join->on('action_item_list.action_id', '=', 'actions.id')
                        ->whereRaw('NOW() BETWEEN actions.start_day AND actions.end_day');
                })
                ->select(
                    'items.id',
                    'items.title',
                    'items.model_name AS model',
                    'items.urlimages',
                    'childcategories.title AS category',
                    DB::raw('SUM(item_sizes_lists.total_count) AS total_quantity'),
                    DB::raw('ROUND(COALESCE(items.price - (items.price * MAX(action_item_list.discount_percent) / 100), items.price), 2) AS actual_price')
                )
                ->where('items.maincategory_id', $maincategory_id)
                ->where('items.id', '!=', $id)
                ->whereNull('items.deleted_at') 
                ->groupBy('items.id')
                ->orderBy('total_quantity', 'DESC')
                ->limit($reqCount) 
                ->get();
    
            $data = $data->merge($additionalData);
        }
    
        return response()->json($data);
    }



    public function getReviewsList(Request $request)
    {
    $itemId = $request->input('id');

    $reviews = DB::table('reviews')
    ->join('users', 'reviews.user_id', '=', 'users.id')
    ->join('items', 'reviews.item_id', '=', 'items.id')
    ->where('reviews.item_id', '=', $itemId)
    ->select('reviews.*', 'users.name as user_name', 'items.model_name as model')
    ->orderBy('reviews.created_at', 'desc')
    ->get();

    return response()->json($reviews);
    } 


    
}
