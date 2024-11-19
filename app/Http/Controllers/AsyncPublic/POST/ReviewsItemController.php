<?php

namespace App\Http\Controllers\AsyncPublic\POST;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;


class ReviewsItemController extends Controller
{
    public function store(Request $request)
    {
        
        $request->validate([
            'mark' => 'required|integer|between:1,5',
            'description' => 'required|string|min:4|max:2500',
            'item_id' => 'required|exists:items,id',
            'user_id' => 'required|exists:users,id',
        ]);
        Review::create([
            'mark' => $request->mark,
            'description' => $request->description,
            'item_id' => $request->item_id,
            'user_id' => $request->user_id,
            'created_at' => now(),
        ]);
   
        return response()->json(['success' => true]);

    }
}
