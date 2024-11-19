<?php

namespace App\Http\Controllers;

use App\Services\ImageService;
use Illuminate\Http\Request;
use Exception;

class ImageUploadController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function upload(Request $request)
    {
        $request->validate([
            'image' => 'required|file|mimes:jpg,jpeg,png,bmp|max:2048',
            'title' => 'required|string|max:255',
            'folder' => 'required|string|max:255'
        ]);

        try {
            $file = $request->file('image');
            $title = $request->input('title');
            $folder = $request->input('folder');

            $filePath = $this->imageService->storeImage($file, $title, $folder);

            return response()->json(['path' => $filePath], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }
}