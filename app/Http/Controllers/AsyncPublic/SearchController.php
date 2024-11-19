<?php

namespace App\Http\Controllers\AsyncPublic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{ 
    public function getFiltersCriteries(Request $request)
    {
        $data = DB::table('childcategories')
        ->select(
            DB::raw("'Тип' AS forwho"),
            DB::raw("'childcategory' AS namex"),
            'childcategories.title',
            'childcategories.search_title',
            DB::raw('COUNT(items.id) AS totalcount')
        )
        ->leftJoin('items', 'childcategories.id', '=', 'items.category_id')
        ->whereNull('items.deleted_at') 
        ->groupBy('childcategories.title', 'childcategories.search_title')
        ->having('totalcount', '>', 0);
    
    $data = $data->unionAll(
        DB::table('seasons')
            ->select(
                DB::raw("'Сезон' AS forwho"),
                DB::raw("'season' AS namex"),
                'seasons.title',
                'seasons.search_title',
                DB::raw('COUNT(items.id) AS totalcount')
            )
            ->leftJoin('items', 'seasons.id', '=', 'items.season_id')
            ->groupBy('seasons.title', 'seasons.search_title')
            ->having('totalcount', '>', 0)
    );
    
    $data = $data->unionAll(
        DB::table('brends')
            ->select(
                DB::raw("'Бренд' AS forwho"),
                DB::raw("'brend' AS namex"),
                'brends.title',
                'brends.search_title',
                DB::raw('COUNT(items.id) AS totalcount')
            )
            ->leftJoin('items', 'brends.id', '=', 'items.brend_id')
            ->groupBy('brends.title', 'brends.search_title')
            ->having('totalcount', '>', 0)
    );
    
    $data = $data->unionAll(
        DB::table('material_soles')
            ->select(
                DB::raw("'Тип подошвы' AS forwho"),
                DB::raw("'sole' AS namex"),
                'material_soles.title',
                'material_soles.search_title',
                DB::raw('COUNT(items.id) AS totalcount')
            )
            ->leftJoin('items', 'material_soles.id', '=', 'items.material_sole_id')
            ->groupBy('material_soles.title', 'material_soles.search_title')
            ->having('totalcount', '>', 0)
    );
    
    $data = $data->unionAll(
        DB::table('heepiece_types')
            ->select(
                DB::raw("'Тип каблука' AS forwho"),
                DB::raw("'heepiece' AS namex"),
                'heepiece_types.title',
                'heepiece_types.search_title',
                DB::raw('COUNT(items.id) AS totalcount')
            )
            ->leftJoin('items', 'heepiece_types.id', '=', 'items.heelpiece_id')
            ->groupBy('heepiece_types.title', 'heepiece_types.search_title')
            ->having('totalcount', '>', 0)
    );
    
    $data = $data->unionAll(
        DB::table('colors')
            ->select(
                DB::raw("'Цвет' AS forwho"),
                DB::raw("'color' AS namex"),
                'colors.title',
                'colors.search_title',
                DB::raw('COUNT(item_color_list.id) AS totalcount')
            )
            ->leftJoin('item_color_list', 'colors.id', '=', 'item_color_list.color_id')
            ->groupBy('colors.title', 'colors.search_title')
            ->having('totalcount', '>', 0)
    );
    
    $data = $data->unionAll(
        DB::table('clasp_types')
            ->select(
                DB::raw("'Вид застежки' AS forwho"),
                DB::raw("'clasp' AS namex"),
                'clasp_types.title',
                'clasp_types.search_title',
                DB::raw('COUNT(item_clasptype_list.id) AS totalcount')
            )
            ->leftJoin('item_clasptype_list', 'clasp_types.id', '=', 'item_clasptype_list.clasptype_id')
            ->groupBy('clasp_types.title', 'clasp_types.search_title')
            ->having('totalcount', '>', 0)
    );
    
    $data = $data->unionAll(
        DB::table('material_outsides')
            ->select(
                DB::raw("'Материал верха' AS forwho"),
                DB::raw("'materialout' AS namex"),
                'material_outsides.title',
                'material_outsides.search_title',
                DB::raw('COUNT(item_materialout_list.id) AS totalcount')
            )
            ->leftJoin('item_materialout_list', 'material_outsides.id', '=', 'item_materialout_list.materialout_id')
            ->groupBy('material_outsides.title', 'material_outsides.search_title')
            ->having('totalcount', '>', 0)
    );
    
    $data = $data->unionAll(
        DB::table('material_insides')
            ->select(
                DB::raw("'Подкладка' AS forwho"),
                DB::raw("'materialins' AS namex"),
                'material_insides.title',
                'material_insides.search_title',
                DB::raw('COUNT(item_materialins_list.id) AS totalcount')
            )
            ->leftJoin('item_materialins_list', 'material_insides.id', '=', 'item_materialins_list.materialin_id')
            ->groupBy('material_insides.title', 'material_insides.search_title')
            ->having('totalcount', '>', 0)
    );
    
    $data = $data->unionAll(
        DB::table('sizes')
            ->select(
                DB::raw("'Размер' AS forwho"),
                DB::raw("'size' AS namex"),
                'sizes.title',
                'sizes.title as search_title',
                DB::raw('COUNT(item_sizes_lists.id) AS totalcount')
            )
            ->leftJoin('item_sizes_lists', 'sizes.id', '=', 'item_sizes_lists.size_id')
            ->groupBy('sizes.title')
            ->having('totalcount', '>', 0)
    );
    
    $data = $data->get();


        $transformedResult = collect($data)
        ->groupBy('forwho')
        ->map(function ($items, $forwho) {
            return [
                'label' => $forwho,
                'options' => collect($items)->map(function ($item) {
                    return [
                        'namex'=>$item->namex,
                        'title' => $item->title,
                        'search_title' => $item->search_title,
                        'totalcount' => $item->totalcount
                    ];
                })
            ];
        })
        ->values();
        

        return response()->json($transformedResult);
    }

    public function getItems(Request $request)
{
    $filters = $request->input('filters');

    $validViewCounts = [24, 36, 48];
    $perPage = isset($filters['viewforcount']) && in_array($filters['viewforcount'], $validViewCounts) ? $filters['viewforcount'] : 24;
    
    $page = isset($filters['page']) && filter_var($filters['page'], FILTER_VALIDATE_INT) && (int)$filters['page'] > 0 ? (int)$filters['page'] : 1;

    $sorttype = isset($filters['sorttype']) ? $filters['sorttype'] : "popularity";
    switch ($sorttype) {
        case 'nameZA':
            $sort = 'model DESC';
            break;
        case 'nameAZ':
            $sort = 'model ASC';
            break;
        case 'price-rise':
            $sort = 'actual_price ASC';
            break;
        case 'price-down':
            $sort = 'actual_price DESC';
            break;
        default:
            $sort = 'total_quantity';
            break;
    }
    $offset = ($page - 1) * $perPage;

    // Начинаем строить базовый запрос
    $baseQuery = DB::table('items')
        ->leftJoin('childcategories', 'items.category_id', '=', 'childcategories.id')
        ->whereNull('items.deleted_at');

    if (isset($filters['other'])) {
        if (isset($filters['other']['childcategory']) && is_array($filters['other']['childcategory'])) {
            if (!empty($filters['other']['childcategory'])) {
                $baseQuery->whereIn('childcategories.search_title', $filters['other']['childcategory']);
            }
        }
        // if (isset($filters['other']['season']) && is_array($filters['other']['season'])) {
        //     if (!empty($filters['other']['season'])) {
        //         $baseQuery->whereIn('seasons.search_title', $filters['other']['season']);
        //     }
        // }
    }

    $totalItemsFiltered = $baseQuery->count();

    if ($offset >= $totalItemsFiltered) {
        $page = ceil($totalItemsFiltered / $perPage);
        $offset = ($page - 1) * $perPage;
    }

    $query = $baseQuery->select(
        'items.id',
        'items.title', 
        'items.model_name AS model',
        'items.urlimages',
        DB::raw('ROUND(items.price, 2) AS normal_price'),
        'childcategories.title AS category',
        'material_soles.title AS material_sole',
        DB::raw('GROUP_CONCAT(DISTINCT sizes.title ORDER BY sizes.title SEPARATOR ", ") AS sizes'),
        DB::raw('ROUND(SUM(item_sizes_lists.total_count), 2) AS total_quantity'),
        DB::raw('GROUP_CONCAT(DISTINCT material_outsides.title ORDER BY material_outsides.title SEPARATOR ", ") AS material_outside'),
        DB::raw('GROUP_CONCAT(DISTINCT material_insides.title ORDER BY material_insides.title SEPARATOR ", ") AS material_inside'),
        DB::raw('COALESCE(CONCAT(MAX(action_item_list.discount_percent), "%"), "0") AS discount_percent'),
        DB::raw('ROUND(COALESCE(items.price - (items.price * MAX(action_item_list.discount_percent) / 100), items.price), 2) AS actual_price'),
        DB::raw('SUBSTRING_INDEX(MAX(CONCAT(action_fotos.foto_url, ",")), ",", 1) AS action_photo_url'),
        DB::raw('IFNULL(ROUND(AVG(reviews.mark), 2), 0) AS mark')
    )
    ->leftJoin('maincategories', 'items.maincategory_id', '=', 'maincategories.id')
    ->leftJoin('material_soles', 'items.material_sole_id', '=', 'material_soles.id')
    ->leftJoin('seasons', 'items.season_id', '=', 'seasons.id')
    ->leftJoin('item_sizes_lists', 'items.id', '=', 'item_sizes_lists.item_id')
    ->leftJoin('sizes', 'item_sizes_lists.size_id', '=', 'sizes.id')
    ->leftJoin('item_color_list', 'items.id', '=', 'item_color_list.item_id')
    ->leftJoin('colors', 'item_color_list.color_id', '=', 'colors.id')
    ->leftJoin('item_materialout_list', 'items.id', '=', 'item_materialout_list.item_id')
    ->leftJoin('material_outsides', 'item_materialout_list.materialout_id', '=', 'material_outsides.id')
    ->leftJoin('item_materialins_list', 'items.id', '=', 'item_materialins_list.item_id')
    ->leftJoin('material_insides', 'item_materialins_list.materialin_id', '=', 'material_insides.id')
    ->leftJoin('action_item_list', 'items.id', '=', 'action_item_list.item_id')
    ->leftJoin('actions', function ($join) {
        $join->on('action_item_list.action_id', '=', 'actions.id')
            ->whereRaw('NOW() BETWEEN actions.start_day AND actions.end_day');
    })
    ->leftJoin('action_fotos', 'actions.foto_img_id', '=', 'action_fotos.id')
    ->leftJoin('reviews', 'items.id', '=', 'reviews.item_id')
    ->whereNull('items.deleted_at') 
    ->groupBy('items.id')
    ->havingRaw('total_quantity > 0')
    ->orderByRaw($sort)
    ->limit($perPage)
    ->offset($offset);
    
    $data = $query->get();

    $response = [
        'items' => $data,
        'current_page' => $page,
        'per_page' => $perPage,
        'total' => $totalItemsFiltered,
        'last_page' => ceil($totalItemsFiltered / $perPage),
    ];

    return response()->json($response);
}
}
