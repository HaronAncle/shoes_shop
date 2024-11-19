<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetOrdersInfoController extends Controller
{ 
    public function getOrderList($userId)
{
    $userId = (int)$userId;
    if ( $userId <= 0) {
        return response()->json([]);
    }
    $orders = DB::table('orders')
        ->join('delivery_types', 'orders.delivery_id', '=', 'delivery_types.id')
        ->join('order_statuses', 'orders.status_id', '=', 'order_statuses.id')
        ->where('orders.user_id', $userId)
        ->select(
            'orders.id',
            'orders.created_at',
            'orders.last_change',
            'orders.total_price',
            'orders.total_items',
            'order_statuses.title as status_title',
            'delivery_types.title as delivery_title'
        )
        ->orderBy('orders.created_at', 'desc')
        ->get();

    // Check if orders are empty
    if ($orders->isEmpty()) {
        return response()->json([]);
    }

    $orderIds = $orders->pluck('id');

    $items = DB::select("
    SELECT 
        order_item_list.order_id,
        items.id as item_id,
        items.title as title, 
        items.model_name AS model, 
        items.urlimages as url, 
        order_item_list.this_price as price,
        sizes.title as size,
        childcategories.title AS category,
        order_item_list.count as quantity,
        order_item_list.total_price as total_price
    FROM 
        order_item_list
    JOIN 
        item_sizes_lists ON order_item_list.item_size_id = item_sizes_lists.id
    JOIN 
        items ON item_sizes_lists.item_id = items.id
    JOIN 
        sizes ON item_sizes_lists.size_id = sizes.id
    LEFT JOIN 
        childcategories ON items.category_id = childcategories.id
    WHERE 
        order_item_list.order_id IN (".implode(',', $orderIds->toArray()).")
    ORDER BY
        order_item_list.order_id, items.id
    ");

    if (empty($items)) {
        return response()->json([]);
    }

    $itemsGrouped = collect($items)->groupBy('order_id');

    $response = $orders->map(function ($order) use ($itemsGrouped) {
        $orderItems = $itemsGrouped->get($order->id);
        if ($orderItems === null || $orderItems->isEmpty()) {
            return [];
        }
        return [
            'order_info' => $order,
            'items' => $orderItems->map(function ($item) {
                return [
                    'item_id' => $item->item_id,
                    'title' => $item->title,
                    'model' => $item->model,
                    'url' => $item->url,
                    'price' => $item->price, 
                    'size' => $item->size,
                    'category' => $item->category,
                    'quantity' => $item->quantity,
                    'total_price' => $item->total_price 
                ];
            })
        ];
    });

    $response = $response->filter()->values();
    return response()->json($response);
}
}
