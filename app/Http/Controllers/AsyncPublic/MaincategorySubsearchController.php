<?php

namespace App\Http\Controllers\AsyncPublic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MaincategorySubsearchController extends Controller
{
    public function getDataCategories(Request $request)
    {
        $mainCategory = $request->input('hrefFor', '0');
        $data = DB::select("SELECT  childcategories.title, childcategories.search_title, COUNT(items.id) AS count FROM items JOIN maincategories ON items.maincategory_id = maincategories.id JOIN childcategories ON items.category_id = childcategories.id WHERE maincategories.search_title = ? and  items.deleted_at IS NULL GROUP BY items.category_id, childcategories.title, childcategories.search_title", [$mainCategory]);
        return response()->json($data);
    }

    public function getDataBrends(Request $request)
    {
        $mainCategory = $request->input('hrefFor', '0');
        $data = DB::select("SELECT brends.title, brends.search_title FROM items JOIN maincategories ON items.maincategory_id = maincategories.id JOIN brends ON items.brend_id = brends.id WHERE maincategories.search_title = ? GROUP BY brends.title, brends.search_title", [$mainCategory]);
        return response()->json($data);
    }
}
