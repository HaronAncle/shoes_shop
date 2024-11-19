<?php

namespace App\Http\Controllers\Publics;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Item;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ItemViewController extends Controller
{
    public function showViewItem($route, $id)
    {
        $item = DB::select("
        SELECT 
            items.id, 
            items.title, 
            items.model_name AS model, 
            items.urlimages, 
            items.price AS normal_price, 
            childcategories.title AS category,
            seasons.title AS season,
            material_soles.title AS material_sole, 
            -- Добавлено условие проверки количества товаров для каждого размера
            GROUP_CONCAT(DISTINCT sizes.title ORDER BY sizes.title SEPARATOR ', ') AS sizes, 
            SUM(item_sizes_lists.total_count) AS total_quantity,
            GROUP_CONCAT(DISTINCT material_outsides.title ORDER BY material_outsides.title SEPARATOR ', ') AS material_outside,
            GROUP_CONCAT(DISTINCT material_insides.title ORDER BY material_insides.title SEPARATOR ', ') AS material_inside,
            GROUP_CONCAT(DISTINCT colors.title ORDER BY colors.title SEPARATOR ', ') AS colors,
            GROUP_CONCAT(DISTINCT clasp_types.title ORDER BY clasp_types.title SEPARATOR ', ') AS clasptype,
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
        INNER JOIN -- Изменено на INNER JOIN, чтобы исключить размеры с нулевым количеством
            item_sizes_lists ON items.id = item_sizes_lists.item_id AND item_sizes_lists.total_count > 0
        LEFT JOIN 
            sizes ON item_sizes_lists.size_id = sizes.id
        LEFT JOIN 
            childcategories ON items.category_id = childcategories.id
        LEFT JOIN 
            seasons ON items.season_id = seasons.id
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
            item_clasptype_list ON items.id = item_clasptype_list.item_id
        LEFT JOIN 
            clasp_types ON item_clasptype_list.clasptype_id = clasp_types.id
        LEFT JOIN 
            action_item_list ON items.id = action_item_list.item_id
        LEFT JOIN 
            actions ON action_item_list.action_id = actions.id AND NOW() BETWEEN actions.start_day AND actions.end_day
        LEFT JOIN 
            action_fotos ON actions.foto_img_id = action_fotos.id
        LEFT JOIN 
            reviews ON items.id = reviews.item_id
        WHERE 
            items.id = ? AND items.deleted_at IS NULL
        GROUP BY 
            items.id
        LIMIT 1;", [$id]); // Здесь используется переменная $id
    
    if (!empty($item)) {
        $item = $item[0];
        return Inertia::render('OpenPages/ItemPage', ['item' => $item]);
    } else {
        return redirect()->to($route); // Здесь используется переменная $route
    }
}
}