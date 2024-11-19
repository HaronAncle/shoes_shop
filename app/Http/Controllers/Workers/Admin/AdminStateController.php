<?php

namespace App\Http\Controllers\Workers\Admin;

use App\Http\Controllers\Controller;
use App\Services\ImageService;
use App\Models\State;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AdminStateController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function index()
    {
        $entities = State::all(); 
        return response()->json($entities);
    }

    
public function store(Request $request)
{
    // Log the start of the method
    Log::info('Starting store method', ['request' => $request->all()]);

    try {
        // Log the validation attempt
        Log::info('Validating request data');

        $validatedData = $request->validate([
            'title' => 'required|string|min:3|max:80',
            'description' => 'required|string',
            'image' => 'image', // Ensure this is optional if necessary
        ]);

        // Log successful validation
        Log::info('Validation successful', ['validatedData' => $validatedData]);

        $imagePath = null;

        // Check if image is present and log the action
        if ($request->hasFile('image')) {
            Log::info('Image file detected', ['image' => $request->file('image')->getClientOriginalName()]);

            $imagePath = $this->imageService->storeImage(
                $request->file('image'),
                now(),
                'news'
            );

            // Log the successful image storage
            Log::info('Image stored successfully', ['imagePath' => $imagePath]);
        } else {
            Log::info('No image provided');
        }

        // Log the entity creation
        Log::info('Creating new State entity');

        $entity = new State(); 
        $entity->title = $validatedData['title'];
        $entity->statabody = $validatedData['description'];
        $entity->foto_url = $imagePath;
        $entity->is_action = false;
        $entity->created_at = now();
        $entity->views = 0;
        $entity->save();

        // Log the successful save
        Log::info('Entity saved successfully', ['entity' => $entity]);

        // Return response
        return response()->json($entity, 201);
    } catch (\Illuminate\Validation\ValidationException $e) {
        // Log validation errors
        Log::error('Validation failed', ['errors' => $e->errors()]);

        return response()->json(['errors' => $e->errors()], 422);
    } catch (\Exception $e) {
        // Log unexpected errors
        Log::error('An error occurred', ['exception' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);

        return response()->json(['error' => $e->getMessage()], 500);
    }
}

    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|min:3|max:80',
                'description' => 'required|string',
                'image' => 'required_if:imageChanged,true|image',
            ]);
    
            $entity = State::findOrFail($id);
            $entity->title = $validatedData['title'];
            $entity->statabody = $validatedData['description'];
    
            if ($request->has('imageChanged') && $request->imageChanged === 'true' && $request->hasFile('image')) {
                $imagePath = $this->imageService->replaceImage(
                    $request->file('image'),
                    $entity->foto_url	,
                    $validatedData['title'],
                    'news' 
                );
                $entity->foto_url = $imagePath;
            }
    
            $entity->save();
    
            return response()->json($entity, 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An unexpected error occurred: ' . $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $entity = State::findOrFail($id); 
            $imagePath = $entity->urlimg_logo;
            $fullImagePath = storage_path('app/public' . str_replace('/storage', '', $imagePath));
            if (file_exists($fullImagePath)) {
                unlink($fullImagePath);
            }
            $entity->delete();

            return response()->json(null, 204);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Entity not found.'], 404);
        } catch (\Exception $e) {
            $entity->delete();
            return response()->json(['error' => 'DeleteWithoutImage: ' . $e->getMessage()], 200);

        }
        finally{
            
        }
    }
}
