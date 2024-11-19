<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MaterialInsidesTableSeeder extends Seeder
{
    public function run()
    {
        $materials = [
            ['title' => 'Без подкладки', 'search_title' => 'No lining'],
            ['title' => 'Текстиль', 'search_title' => 'Textile'],
            ['title' => 'Искусственный мех', 'search_title' => 'Faux fur'],
            ['title' => 'Натуральный мех', 'search_title' => 'Natural fur'],
            ['title' => 'Искусственная шерсть', 'search_title' => 'Synthetic wool'],
            ['title' => 'Натуральная шерсть', 'search_title' => 'Natural wool'],
            ['title' => 'Шерсть', 'search_title' => 'Wool'],
            ['title' => 'Натуральная кожа', 'search_title' => 'Genuine leather'],
            ['title' => 'Комбинированная кожа', 'search_title' => 'Combined leather'],
            ['title' => 'Искусственная кожа', 'search_title' => 'Synthetic leather'],
            ['title' => 'Кожзам', 'search_title' => 'Faux leather'],
            ['title' => 'Байка', 'search_title' => 'Flannel'],
            ['title' => 'Микрофибра', 'search_title' => 'Microfiber']
        ];

        DB::table('material_insides')->insert($materials);
    }
}
