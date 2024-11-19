<?php

namespace App\Http\Controllers\AsyncPublic;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckController extends Controller
{
    public function checkUser()
    {
        if (Auth::check()) {
            return response()->json(['exists' => true, 'user_id' => Auth::id()]);
        }
        return response()->json(['exists' => false]);
    }
    public function checkProduct($id)
    {
        $exists = Item::where('id', $id)->exists();
        return response()->json(['exists' => $exists]);
    }
}
