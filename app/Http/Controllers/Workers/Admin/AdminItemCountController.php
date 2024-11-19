<?php

namespace App\Http\Controllers\Workers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class AdminItemCountController extends Controller
{
    public function index() 
{
    $items = DB::select("
    SELECT 
        items.id, 
        items.title, 
        items.model_name AS model, 
        items.urlimages, 
        brends.title AS brand,
        maincategories.title AS maincategory,
        childcategories.title AS childcategory,
        seasons.title AS season,

        (SELECT SUM(isl.total_count) 
         FROM item_sizes_lists isl 
         WHERE isl.item_id = items.id) AS total_quantity,

        (SELECT SUM(isl.total_ordered) 
         FROM item_sizes_lists isl 
         WHERE isl.item_id = items.id) AS total_quantity_order,

        GROUP_CONCAT(DISTINCT sizes.title ORDER BY sizes.title SEPARATOR ', ') AS sizes, 

        GROUP_CONCAT(DISTINCT CONCAT('р.', sizes.title, ' - ', item_sizes_lists.total_count) ORDER BY sizes.title SEPARATOR ', ') AS sizes_with_counts,
        GROUP_CONCAT(DISTINCT CONCAT('р.', sizes.title, ' - ', item_sizes_lists.total_ordered) ORDER BY sizes.title SEPARATOR ', ') AS sizes_with_order_counts,

        GROUP_CONCAT(DISTINCT colors.title ORDER BY colors.title SEPARATOR ', ') AS colors,

        GROUP_CONCAT(
            DISTINCT CONCAT(
                '{\"size\":', sizes.title, ',',
                '\"total_count\":', IFNULL(item_sizes_lists.total_count, 0), ',',
                '\"total_ordered\":', IFNULL(item_sizes_lists.total_ordered, 0), ',',
                '\"total_storage\":', IFNULL(item_sizes_lists.total_count, 0) - IFNULL(item_sizes_lists.total_ordered, 0),
                '}'
            ) ORDER BY sizes.title SEPARATOR ', '
        ) AS sizesinfofull

    FROM 
        items
    JOIN 
        maincategories ON items.maincategory_id = maincategories.id
    LEFT JOIN 
        item_sizes_lists ON items.id = item_sizes_lists.item_id
    LEFT JOIN 
        sizes ON item_sizes_lists.size_id = sizes.id
    LEFT JOIN 
        childcategories ON items.category_id = childcategories.id
    LEFT JOIN 
        seasons ON items.season_id = seasons.id
    LEFT JOIN 
        brends ON items.brend_id = brends.id
    LEFT JOIN 
        item_color_list ON items.id = item_color_list.item_id
    LEFT JOIN 
        colors ON item_color_list.color_id = colors.id
    WHERE 
        items.deleted_at IS NULL
    GROUP BY 
        items.id
    ORDER BY
        items.id DESC
");
    return response()->json($items);
}



public function update(Request $request, $id)
{
    $counts = $request->input('counts');

    Log::info('Update request received', ['item_id' => $id, 'counts' => $counts]);

    try {
        DB::transaction(function () use ($id, $counts) {
            Log::info('Starting transaction for updating item counts', ['item_id' => $id]);

            foreach ($counts as $count) {
                $sizeId = $count['size']-16;
                $totalInStorage = $count['total_storage'];

                Log::info('Processing size update', ['item_id' => $id, 'size_id' => $sizeId, 'total_in_storage' => $totalInStorage]);

                $itemSize = DB::table('item_sizes_lists')
                    ->where('item_id', $id)
                    ->where('size_id', $sizeId)
                    ->first();

                if ($itemSize) {
                    Log::info('Item size found', ['item_id' => $id, 'size_id' => $sizeId, 'total_ordered' => $itemSize->total_ordered]);

                    if ($totalInStorage < $itemSize->total_ordered) {
                        Log::error('Total storage less than total ordered', [
                            'item_id' => $id,
                            'size_id' => $sizeId,
                            'total_in_storage' => $totalInStorage,
                            'total_ordered' => $itemSize->total_ordered
                        ]);
                        throw new \Exception('Total storage cannot be less than total ordered.', 501);
                    }

                    $totalCount = $totalInStorage - $itemSize->total_ordered;

                    DB::table('item_sizes_lists')
                        ->where('item_id', $id)
                        ->where('size_id', $sizeId)
                        ->update([
                            'total_in_storage' => $totalInStorage,
                            'total_count' => $totalCount
                        ]);

                    Log::info('Updated item size', [
                        'item_id' => $id,
                        'size_id' => $sizeId,
                        'total_in_storage' => $totalInStorage,
                        'total_count' => $totalCount
                    ]);
                } else {
                    Log::warning('Item size not found', ['item_id' => $id, 'size_id' => $sizeId]);
                }
            }

            Log::info('Transaction completed for item', ['item_id' => $id]);
        });

        Log::info('Counts updated successfully', ['item_id' => $id]);
        return response()->json(['message' => 'Counts updated successfully.'], 200);
    } catch (\Exception $e) {
        if ($e->getCode() == 501) {
            Log::error('Validation error: ' . $e->getMessage(), [
                'item_id' => $id,
                'counts' => $counts,
                'exception' => $e
            ]);
            return response()->json(['error' => $e->getMessage()], 501);
        }

        Log::error('Update failed due to an exception', [
            'item_id' => $id,
            'counts' => $counts,
            'exception' => $e
        ]);

        return response()->json(['error' => 'An error occurred while updating counts.'], 500);
    }
}
}
