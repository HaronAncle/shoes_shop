<?php

namespace App\Http\Controllers\AsyncPublic;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class GetNewsListController extends Controller
{
    public function getDataNewsList(Request $request)
    {

        $data = DB::select("SELECT states.id, states.title, states.created_at, states.foto_url FROM states order by states.created_at desc");

        return response()->json($data);
    }

    public function getDataNewsById($id)
    {
        $validator = Validator::make(['id' => $id], [
            'id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Invalid ID'], 400);
        }

        $data = DB::select("SELECT id, title, created_at, foto_url, statabody FROM states WHERE id = ?", [$id]);

        if (empty($data)) {
            return response()->json(['error' => 'State not found'], 404);
        }

        return response()->json($data[0]);
    }
}
