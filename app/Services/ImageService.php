<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Http\File;

class ImageService
{
    public function storeImage($file, $title, $folder, $isNewSubDirectory = false)
    {
        $this->validateImage($file);
        
        if ($isNewSubDirectory) {
            $dateSubFolder = Carbon::now()->format('dmY');
            $folder = "{$folder}/{$dateSubFolder}";
        }

        $fileName = $this->generateFileName($title, $file->getClientOriginalExtension());
        $path = $file->storeAs("public/images/{$folder}", $fileName);

        return Storage::url($path);
    }
    public function storeImage2($file, $title, $folder, $isNewSubDirectory = false)
{
    $this->validateImage2($file);
    
    if ($isNewSubDirectory) {
        $dateSubFolder = Carbon::now()->format('dmY');
        $folder = "{$folder}/{$dateSubFolder}";
    }

    $extension = strtolower(pathinfo($file->getFilename(), PATHINFO_EXTENSION));

    $fileName = $this->generateFileName($title, $extension);
    $path = $file->storeAs("public/images/{$folder}", $fileName);

    return Storage::url($path);
}

    public function deleteImage($filePath)
    {
        if (Storage::exists($filePath)) {
            Storage::delete($filePath);
            return true;
        } else {
            return false;
        }
    }

    public function replaceImage($newFile, $oldFilePath, $title, $folder, $isNewSubDirectory = false)
    {
        $this->validateImage($newFile);
        $this->deleteImage($oldFilePath);
        $newImagePath = $this->storeImage($newFile, $title, $folder, $isNewSubDirectory);
        return $newImagePath;
    }

    private function validateImage($file)
    {
        $validImageExtensions = ['jpg', 'jpeg', 'png', 'bmp'];

        if (!$file || !in_array($file->getClientOriginalExtension(), $validImageExtensions)) {
            throw new \Exception('Invalid image file');
        }
    }
    private function validateImage2($file)
{
    $validImageExtensions = ['jpg', 'jpeg', 'png', 'bmp'];
    $extension = strtolower(pathinfo($file->getFilename(), PATHINFO_EXTENSION));

    if (!$file || !in_array($extension, $validImageExtensions)) {
        throw new \Exception('Invalid image file');
    }
}

    private function generateFileName($title, $extension)
    {
        return Str::slug($title) . '.' . $extension;
    }
}