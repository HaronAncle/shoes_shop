<?php

namespace App\Http\Controllers\AsyncPublic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MainPageController extends Controller
{
    public function getBrandsInfo(Request $request)
    {
        
        $data = DB::select("SELECT brends.title, brends.search_title, brends.description, brends.urlimg_logo as foto_url  FROM `brends` order by brends.totalcount limit 6");

        return response()->json($data);
    }

    public function getCategoryLineInfo(Request $request)
    {
        
        $mainCategory = $request->input('hrefFor', '0');

        $data = DB::select("SELECT 
        items.id, 
        items.title, 
        items.model_name AS model, 
        items.urlimages, 
        items.price AS normal_price, 
        childcategories.title AS category,
        material_soles.title AS material_sole, 
        GROUP_CONCAT(DISTINCT sizes.title ORDER BY sizes.title SEPARATOR ', ') AS sizes, 
        SUM(item_sizes_lists.total_count) AS total_quantity,
        GROUP_CONCAT(DISTINCT material_outsides.title ORDER BY material_outsides.title SEPARATOR ', ') AS material_outside,
        GROUP_CONCAT(DISTINCT material_insides.title ORDER BY material_insides.title SEPARATOR ', ') AS material_inside,
        COALESCE(CONCAT(MAX(action_item_list.discount_percent), '%'), '0') AS discount_percent,
        ROUND(COALESCE(items.price - (items.price * MAX(action_item_list.discount_percent) / 100), items.price), 2) AS actual_price,
        SUBSTRING_INDEX(MAX(CONCAT(action_fotos.foto_url, ',')), ',', 1) AS action_photo_url,
        IFNULL(AVG(reviews.mark), 0) AS mark
    FROM 
        items
    JOIN 
        maincategories ON items.maincategory_id = maincategories.id
    LEFT JOIN 
        material_soles ON items.material_sole_id = material_soles.id
    JOIN 
        item_sizes_lists ON items.id = item_sizes_lists.item_id
    JOIN 
        sizes ON item_sizes_lists.size_id = sizes.id
    LEFT JOIN 
        childcategories ON items.category_id = childcategories.id
    LEFT JOIN 
        item_color_list ON items.id = item_color_list.item_id
    LEFT JOIN 
        colors ON item_color_list.color_id = colors.id
    LEFT JOIN 
        item_materialout_list ON items.id = item_materialout_list.item_id
    LEFT JOIN 
        material_outsides ON item_materialout_list.materialout_id = material_outsides.id
    LEFT JOIN 
        item_materialins_list ON items.id = item_materialins_list.item_id
    LEFT JOIN 
        material_insides ON item_materialins_list.materialin_id = material_insides.id
    LEFT JOIN 
        action_item_list ON items.id = action_item_list.item_id
    LEFT JOIN 
        actions ON action_item_list.action_id = actions.id AND NOW() BETWEEN actions.start_day AND actions.end_day
    LEFT JOIN 
        action_fotos ON actions.foto_img_id = action_fotos.id
    LEFT JOIN 
        reviews ON items.id = reviews.item_id
    WHERE 
        maincategories.search_title = ? and  items.deleted_at IS NULL
    GROUP BY 
        items.id
    ORDER BY 
        total_quantity DESC
    LIMIT 
        6;",  [$mainCategory]);

        return response()->json($data);
    }

    public function getLikeProductsInfo(Request $request)
    {
        $data = DB::select("SELECT states.id, states.title, states.created_at, states.foto_url FROM states WHERE states.is_action = TRUE order by states.created_at desc limit 6");

        return response()->json($data);
    }

    public function getBanners(Request $request)
    {
        $data = DB::select("SELECT states.id,  states.foto_url FROM states WHERE states.is_action = FALSE order by states.created_at desc   limit 3");

        return response()->json($data);
    }
}