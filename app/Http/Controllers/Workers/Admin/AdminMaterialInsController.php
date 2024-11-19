<?php

namespace App\Http\Controllers\Workers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MaterialInside;
use Illuminate\Http\Request;

class AdminMaterialInsController extends Controller
{
    public function index()
    {
        $materials = MaterialInside::all();
        return response()->json($materials);
    }

    public function store(Request $request)
{
    try {
        $validatedData = $request->validate([
            'title' => [
                'required',
                'string',
                'regex:/^[\p{L}\p{M}()]+$/u',
                'min:3',
                'max:100',
            ],  
            'searchTitle' => 'required|string|regex:/^[a-zA-Z()]+$/|min:3|max:100',
        ]);
        $material = new MaterialInside();
        $material->title = $validatedData['title'];
        $material->search_title = $validatedData['searchTitle'];
        $material->save();

        return response()->json($material, 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'errors' => $e->errors()
        ], 422);
    }
}

    public function update(Request $request, $id)
    {

        try {
            $validatedData = $request->validate([
                'title' => [
                    'required',
                    'string',
                    'regex:/^[\p{L}\p{M}()]+$/u',
                    'min:3',
                    'max:100',
                ],  
                'searchTitle' => 'required|string|regex:/^[a-zA-Z()]+$/|min:3|max:100',
            ]);
    
            $material = MaterialInside::findOrFail($id);
            $material->title = $validatedData['title'];
            $material->search_title = $validatedData['searchTitle'];
            $material->save();
    
            return response()->json($material);
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        }


       
    }

    public function destroy($id)
    {
        $material = MaterialInside::findOrFail($id);
        $material->delete();

        return response()->json(null, 204);
    }
}
