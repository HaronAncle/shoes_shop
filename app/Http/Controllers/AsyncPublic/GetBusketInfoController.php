<?php

namespace App\Http\Controllers\AsyncPublic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GetBusketInfoController extends Controller
{
    public function getInfo(Request $request)
    {
        $objects = $request->input('busket');
        $objects = json_decode($objects); 
        
        if (!is_array($objects) || empty($objects)) {
            return response()->json([]);
        }

        $whereClauses = [];
        foreach ($objects as $object) {
            $whereClauses[] = "(items.id = ? AND sizes.title = ?)";
        }
        $whereString = implode(' OR ', $whereClauses);
        $bindings = [];
        foreach ($objects as $object) {
            $bindings[] = $object->id;
            $bindings[] = $object->size;
        }

        $data = DB::select("
        SELECT 
            items.id as id, 
            items.title as title, 
            items.model_name AS model, 
            items.urlimages as url, 
            items.price as price,
            sizes.title as size,
            childcategories.title AS category,
            SUM(item_sizes_lists.total_count) AS total_quantity,
            ROUND(COALESCE(items.price - (items.price * MAX(action_item_list.discount_percent) / 100), items.price), 2) AS actual_price
        FROM 
            items
        JOIN 
            maincategories ON items.maincategory_id = maincategories.id
        JOIN 
            item_sizes_lists ON items.id = item_sizes_lists.item_id
        JOIN 
            sizes ON item_sizes_lists.size_id = sizes.id
        LEFT JOIN 
            childcategories ON items.category_id = childcategories.id
        LEFT JOIN 
            action_item_list ON items.id = action_item_list.item_id
        LEFT JOIN 
            actions ON action_item_list.action_id = actions.id AND NOW() BETWEEN actions.start_day AND actions.end_day
        WHERE 
            ($whereString) and items.deleted_at IS NULL 
        GROUP BY 
            items.id, items.title, sizes.title
        ORDER BY
            total_quantity DESC
        ;", $bindings);

        return response()->json($data);
    } 
}
