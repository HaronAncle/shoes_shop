<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BrandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            ['title' => 'Adidas', 'search_title' => 'Adidas', 'description' => Str::random(100), 'urlimg_logo' => 'path/to/adidas_logo.jpg', 'totalcount' => 0],
            ['title' => 'Nike', 'search_title' => 'Nike', 'description' => Str::random(100), 'urlimg_logo' => 'path/to/nike_logo.jpg', 'totalcount' => 0],
            ['title' => 'Мифер', 'search_title' => 'Mifer', 'description' => Str::random(100), 'urlimg_logo' => 'path/to/mifer_logo.jpg', 'totalcount' => 0],
            ['title' => 'Колобок', 'search_title' => 'Kolobok', 'description' => Str::random(100), 'urlimg_logo' => 'path/to/kolobok_logo.jpg', 'totalcount' => 0]
        ];

        DB::table('brends')->insert($brands);
   
    }
}
