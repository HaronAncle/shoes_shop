<?php

namespace App\Http\Controllers\Workers\Admin;


use App\Http\Controllers\Controller;
use App\Services\ImageService;
use App\Models\Brend;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdminBrandController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function index()
    {
        $brands = Brend::all();
        return response()->json($brands);
    }

    public function store(Request $request)
    {
        try {
            
            $validatedData = $request->validate([
                'title' => 'required|string|min:3|max:80',
                'search_title' => 'required|string|regex:/^[a-zA-Z()]+$/|min:3|max:80',
                'description' => 'required|string',
                'image' => 'image',
            ]);

            $imagePath = $this->imageService->storeImage(
                $request->file('image'),
                $validatedData['search_title'],
                'brands'
            );

            $brand = new Brend();
            $brand->title = $validatedData['title'];
            $brand->search_title = $validatedData['search_title'];
            $brand->description = $validatedData['description'];
            $brand->urlimg_logo = $imagePath;
            $brand->totalcount = 0;
            $brand->save();

            return response()->json($brand, 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            
            $validatedData = $request->validate([
                'title' => 'required|string|min:3|max:80',
                'search_title' => 'required|string|regex:/^[a-zA-Z()]+$/|min:3|max:80',
                'description' => 'required|string',
                'image' => 'required_if:imageChanged,true|image',
            ]);
            Log::info('3a: ', $validatedData);
    
            $brand = Brend::findOrFail($id);
            $brand->title = $validatedData['title'];
            $brand->search_title = $validatedData['search_title'];
            $brand->description = $validatedData['description'];
    
            if ($request->has('imageChanged') && $request->imageChanged === 'true' && $request->hasFile('image')) {
                $imagePath = $this->imageService->replaceImage(
                    $request->file('image'),
                    $brand->urlimg_logo,
                    $validatedData['search_title'],
                    'brands'
                );
                $brand->urlimg_logo = $imagePath;
            }
    
            $brand->save();
    
            return response()->json($brand, 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An unexpected error occurred: ' . $e->getMessage()], 500);
        }
        return response()->json(['error' => 'An unexpected error occurred: '], 500);
    }

    public function destroy($id)
    {
        try {
            $brand = Brend::findOrFail($id);
            $imagePath = $brand->urlimg_logo;
            $fullImagePath = storage_path('app/public' . str_replace('/storage', '', $imagePath));
            if (file_exists($fullImagePath)) {
                unlink($fullImagePath);
            }
            $brand->delete();

            return response()->json(null, 204);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Brand not found.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An unexpected error occurred: ' . $e->getMessage()], 500);
        }
    }
}