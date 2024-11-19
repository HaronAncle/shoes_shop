<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MainCategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['title' => 'Женская', 'search_title' => 'womens', 'description' => 'Всё для женщин', 'mail_foto_url' => 'path/to/womens.jpg'],
            ['title' => 'Мужская', 'search_title' => 'mens', 'description' => 'Всё для мужчин', 'mail_foto_url' => 'path/to/mens.jpg'],
            ['title' => 'Для мальчиков', 'search_title' => 'boys', 'description' => 'Всё для мальчиков', 'mail_foto_url' => 'path/to/boys.jpg'],
            ['title' => 'Для девочек', 'search_title' => 'girls', 'description' => 'Всё для девочек', 'mail_foto_url' => 'path/to/girls.jpg'],
            ['title' => 'Все для обуви', 'search_title' => 'shoes', 'description' => 'Обувь для всех', 'mail_foto_url' => 'path/to/shoes.jpg']
        ];

        DB::table('maincategories')->insert($categories);
    }
}
