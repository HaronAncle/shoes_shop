<?php 
namespace App\Http\Controllers\Workers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Services\ImageService;


class AdminItemController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function info()
{
    $data = DB::table('childcategories')
        ->select(
            DB::raw("'Тип' AS forwho"),
            DB::raw("'childcategories' AS namex"),
            'childcategories.id',
            'childcategories.title',
            'childcategories.search_title'
        );
        $data = $data->unionAll(
            DB::table('maincategories')
                ->select(
                    DB::raw("'Категория' AS forwho"),
                    DB::raw("'maincategories' AS namex"),
                    'maincategories.id',
                    'maincategories.title',
                    'maincategories.search_title'
                )
        );
    $data = $data->unionAll(
        DB::table('seasons')
            ->select(
                DB::raw("'Сезон' AS forwho"),
                DB::raw("'seasons' AS namex"),
                'seasons.id',
                'seasons.title',
                'seasons.search_title'
            )
    );


    $data = $data->unionAll(
        DB::table('material_soles')
            ->select(
                DB::raw("'Тип подошвы' AS forwho"),
                DB::raw("'material_soles' AS namex"),
                'material_soles.id',
                'material_soles.title',
                'material_soles.search_title'
            )
    );

    $data = $data->unionAll(
        DB::table('heepiece_types')
            ->select(
                DB::raw("'Тип каблука' AS forwho"),
                DB::raw("'heepiece_types' AS namex"),
                'heepiece_types.id',
                'heepiece_types.title',
                'heepiece_types.search_title'
            )
    );

    $data = $data->unionAll(
        DB::table('colors')
            ->select(
                DB::raw("'Цвет' AS forwho"),
                DB::raw("'colors' AS namex"),
                'colors.id',
                'colors.title',
                'colors.search_title'
            )
    );

    $data = $data->unionAll(
        DB::table('clasp_types')
            ->select(
                DB::raw("'Вид застежки' AS forwho"),
                DB::raw("'clasp_types' AS namex"),
                'clasp_types.id',
                'clasp_types.title',
                'clasp_types.search_title'
            )
    );

    $data = $data->unionAll(
        DB::table('material_outsides')
            ->select(
                DB::raw("'Материал верха' AS forwho"),
                DB::raw("'material_outsides' AS namex"),
                'material_outsides.id',
                'material_outsides.title',
                'material_outsides.search_title'
            )
    );

    $data = $data->unionAll(
        DB::table('material_insides')
            ->select(
                DB::raw("'Подкладка' AS forwho"),
                DB::raw("'material_insides' AS namex"),
                'material_insides.id',
                'material_insides.title',
                'material_insides.search_title'
            )
    );

    $data = $data->unionAll(
        DB::table('sizes')
            ->select(
                DB::raw("'Размер' AS forwho"),
                DB::raw("'sizes' AS namex"),
                'sizes.id',
                'sizes.title',
                'sizes.title as search_title'
            )
    );
    $data = $data->unionAll(
        DB::table('brends')
            ->select(
                DB::raw("'Бренд' AS forwho"),
                DB::raw("'brends' AS namex"),
                'brends.id',
                'brends.title',
                'brends.title as search_title'
            )
    );

    $data = $data->get();

    $transformedResult = collect($data)
        ->groupBy('forwho')
        ->map(function ($items, $forwho) {
            return collect($items)
                ->groupBy('namex')
                ->map(function ($items, $namex) use ($forwho) {
                    return [
                        'forwho' => $forwho,
                        'namex' => $namex,
                        'options' => $items->map(function ($item) {
                            return [
                                'id' => $item->id,
                                'title' => $item->title,
                                'search_title' => $item->search_title
                            ];
                        })->values()
                    ];
                })->values();
        })
        ->flatten(1)
        ->values();

    return response()->json($transformedResult);
}
public function index()
{
    $items = DB::select("
SELECT 
    items.id, 
    items.title, 
    items.model_name AS model, 
    items.urlimages, 
    items.price AS normal_price, 
    
    brends.title AS brand,
    brends.id AS brand_id,

    maincategories.title AS maincategory,
    maincategories.id AS maincategory_id,

    childcategories.title AS childcategory,
    childcategories.id AS childcategory_id,

    seasons.title AS season,
    seasons.id AS season_id,

    material_soles.title AS material_sole, 
    material_soles.id AS material_sole_id, 

    COALESCE(item_totals.total_quantity, 0) AS total_quantity,
    COALESCE(item_totals.total_quantity_order, 0) AS total_quantity_order,    

    GROUP_CONCAT(DISTINCT sizes.title ORDER BY sizes.title SEPARATOR ', ') AS sizes, 
    GROUP_CONCAT(DISTINCT sizes.id SEPARATOR ', ') AS sizes_id, 

    GROUP_CONCAT(DISTINCT CONCAT('р.', sizes.title, ' - ', item_sizes_lists.total_count) ORDER BY sizes.title SEPARATOR ', ') AS sizes_with_counts,
    GROUP_CONCAT(DISTINCT CONCAT('р.', sizes.title, ' - ', item_sizes_lists.total_ordered) ORDER BY sizes.title SEPARATOR ', ') AS sizes_with_order_counts,

    GROUP_CONCAT(DISTINCT material_outsides.title ORDER BY material_outsides.title SEPARATOR ', ') AS material_outside,
    GROUP_CONCAT(DISTINCT material_outsides.id SEPARATOR ', ') AS material_outside_id,

    GROUP_CONCAT(DISTINCT material_insides.title ORDER BY material_insides.title SEPARATOR ', ') AS material_inside,
    GROUP_CONCAT(DISTINCT material_insides.id SEPARATOR ', ') AS material_inside_id,

    GROUP_CONCAT(DISTINCT colors.title ORDER BY colors.title SEPARATOR ', ') AS colors,
    GROUP_CONCAT(DISTINCT colors.id SEPARATOR ', ') AS colors_id,
    
    GROUP_CONCAT(DISTINCT clasp_types.title ORDER BY clasp_types.title SEPARATOR ', ') AS clasptype,
    GROUP_CONCAT(DISTINCT clasp_types.id SEPARATOR ', ') AS clasptype_id,

    COALESCE(CONCAT(MAX(action_item_list.discount_percent), '%'), '0') AS discount_percent,
    ROUND(COALESCE(items.price - (items.price * MAX(action_item_list.discount_percent) / 100), items.price), 2) AS actual_price,
    IFNULL(AVG(reviews.mark), 0) AS mark
FROM 
    items
JOIN 
    maincategories ON items.maincategory_id = maincategories.id
LEFT JOIN 
    material_soles ON items.material_sole_id = material_soles.id
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
LEFT JOIN 
        item_sizes_lists ON items.id = item_sizes_lists.item_id
    LEFT JOIN 
        sizes ON item_sizes_lists.size_id = sizes.id

LEFT JOIN (
    SELECT 
        item_id, 
        SUM(total_count) AS total_quantity, 
        SUM(total_ordered) AS total_quantity_order 
    FROM 
        item_sizes_lists
    GROUP BY 
        item_id
) AS item_totals ON items.id = item_totals.item_id

WHERE 
    items.deleted_at IS NULL
GROUP BY 
    items.id
ORDER BY
    items.id DESC
");
    return response()->json($items);
}

public function indexOnlyDelete()
{
    $items = DB::select("
        SELECT 
            items.id, 
            items.title, 
            items.model_name AS model, 
            items.urlimages, 
            items.price AS normal_price, 
            maincategories.title AS maincategory,
            childcategories.title AS childcategory,
            seasons.title AS season,
            material_soles.title AS material_sole, 
            GROUP_CONCAT(DISTINCT sizes.title ORDER BY sizes.title SEPARATOR ', ') AS sizes, 
            SUM(item_sizes_lists.total_count) AS total_quantity,
            GROUP_CONCAT(DISTINCT material_outsides.title ORDER BY material_outsides.title SEPARATOR ', ') AS material_outside,
            GROUP_CONCAT(DISTINCT material_insides.title ORDER BY material_insides.title SEPARATOR ', ') AS material_inside,
            GROUP_CONCAT(DISTINCT colors.title ORDER BY colors.title SEPARATOR ', ') AS colors,
            GROUP_CONCAT(DISTINCT clasp_types.title ORDER BY clasp_types.title SEPARATOR ', ') AS clasptype,
            COALESCE(CONCAT(MAX(action_item_list.discount_percent), '%'), '0') AS discount_percent,
            ROUND(COALESCE(items.price - (items.price * MAX(action_item_list.discount_percent) / 100), items.price), 2) AS actual_price,
            IFNULL(AVG(reviews.mark), 0) AS mark
        FROM 
            items
        JOIN 
            maincategories ON items.maincategory_id = maincategories.id
        LEFT JOIN 
            material_soles ON items.material_sole_id = material_soles.id
        LEFT JOIN 
            item_sizes_lists ON items.id = item_sizes_lists.item_id
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
            items.deleted_at IS NOT NULL
        GROUP BY 
            items.id
    ");
    return response()->json($items);
}

    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|min:3|max:255',
                'model' => 'required|string|min:3|max:255',
                'price' => 'required|numeric',
                'category' => 'nullable|integer',
                'subcategory' => 'nullable|integer',
                'season' => 'nullable|integer',
                'brand' => 'nullable|integer',
                'materialSole' => 'nullable|integer',
                'heelType' => 'nullable|integer',
                'characteristics.size' => 'required|array',
                'characteristics.color' => 'required|array',
                'characteristics.materialOutside' => 'required|array',
                'characteristics.materialInside' => 'required|array',
                'characteristics.claspType' => 'required|array',
                'image' => 'image',
            ]);
    
            $item = new Item();
            $item->model_name = $validatedData['model'];
            $item->title = $validatedData['title'];
            $item->maincategory_id = $validatedData['category'];
            $item->category_id = $validatedData['subcategory'];
            $item->season_id = $validatedData['season'];
            $item->brend_id = $validatedData['brand'];
            $item->material_sole_id = $validatedData['materialSole'];
            $item->heelpiece_id = $validatedData['heelType'];
            $item->price = $validatedData['price'];
            $item->description = '';
            $item->heelpiace=0;
            $item->total_clicks = 0;
            $item->total_ordered = 0;
            $item->total_in_busket = 0;
    

            $currentDateTime = date('YmdHis');
            $modelWithTimestamp = $validatedData['model'] . '-' . $currentDateTime;
            
            $imagePath = $this->imageService->storeImage(
                $request->file('image'),
                $modelWithTimestamp,
                'items', true
            );

            $item->urlimages = $imagePath;
            $item->save();
    
            foreach ($validatedData['characteristics']['size'] as $sizeId) {
                DB::table('item_sizes_lists')->insert([
                    'item_id' => $item->id,
                    'size_id' => $sizeId,
                ]);
            }
            foreach ($validatedData['characteristics']['claspType'] as $claspTypeId) {
                DB::table('item_clasptype_list')->insert([
                    'item_id' => $item->id,
                    'clasptype_id' => $claspTypeId,
                ]);
            }
    
            foreach ($validatedData['characteristics']['color'] as $colorId) {
                DB::table('item_color_list')->insert([
                    'item_id' => $item->id,
                    'color_id' => $colorId,
                ]);
            }
    
            foreach ($validatedData['characteristics']['materialOutside'] as $materialOutsideId) {
                DB::table('item_materialout_list')->insert([
                    'item_id' => $item->id,
                    'materialout_id' => $materialOutsideId,
                ]);
            }
    
            foreach ($validatedData['characteristics']['materialInside'] as $materialInsideId) {
                DB::table('item_materialins_list')->insert([
                    'item_id' => $item->id,
                    'materialin_id' => $materialInsideId,
                ]);
            }
    
            return response()->json($item, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            $validationErrors = $e->errors();
            Log::error('Validation Error:', $validationErrors);
            $failedFields = [];
    
            foreach ($validationErrors as $field => $errors) {
                $failedFields[$field] = $errors;
            }
    
            return response()->json([
                'errors' => $validationErrors,
                'failed_fields' => $failedFields
            ], 422);
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error('Database Query Exception: ' . $e->getMessage());
            return response()->json(['error' => 'Database error occurred. Please try again later.'], 500);
        } catch (\Exception $e) {
            Log::error('General Exception: ' . $e->getMessage());
            return response()->json(['error' => 'An unexpected error occurred. Please try again later.'], 500);
        }
    
    
}

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|min:3|max:255',
                'model_name' => 'required|string|min:3|max:255',
                'urlimages' => 'required|string',
                'price' => 'required|numeric',
                'description' => 'required|string',
                'maincategory_id' => 'nullable|integer|exists:maincategories,id',
                'category_id' => 'nullable|integer|exists:childcategories,id',
                'season_id' => 'nullable|integer|exists:seasons,id',
                'brend_id' => 'nullable|integer|exists:brends,id',
                'material_sole_id' => 'nullable|integer|exists:material_soles,id',
                'heelpiece_id' => 'nullable|integer|exists:heelpiece_types,id',
            ]);

            $item = Item::findOrFail($id);
            $item->update($validatedData);

            return response()->json($item, 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An unexpected error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
{
    try {
        $item = Item::withTrashed()->findOrFail($id);
        if ($item->trashed()) {
            return response()->json(null, 204); 
        }
        $item->delete();
        return response()->json(null, 204);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json(['error' => 'Item not found.'], 404);
    } catch (\Exception $e) {
        Log::error('General Exception: ' . $e->getMessage());
        return response()->json(['error' => 'An unexpected error occurred: ' . $e->getMessage()], 500);
    }
}

    public function destroyFinal($id)
{
    try {
        $item = Item::findOrFail($id);
        if (method_exists($item, 'forceDelete')) {
            // Perform a hard delete
            $item->forceDelete();
        } else {
            $item->delete();
        }
        DB::table('item_sizes_lists')->where('item_id', $id)->delete();
        DB::table('item_clasptype_list')->where('item_id', $id)->delete();
        DB::table('item_color_list')->where('item_id', $id)->delete();
        DB::table('item_materialout_list')->where('item_id', $id)->delete();
        DB::table('item_materialins_list')->where('item_id', $id)->delete();

        return response()->json(null, 204);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json(['error' => 'Item not found.'], 404);
    } catch (\Exception $e) {
        Log::error('General Exception: ' . $e->getMessage());
        return response()->json(['error' => 'An unexpected error occurred: ' . $e->getMessage()], 500);
    }
}
}
 