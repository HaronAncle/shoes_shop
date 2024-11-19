<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MaterialOutsidesTableSeeder extends Seeder
{
    public function run()
    {
        $materials = [
            ['title' => 'Замша', 'search_title' => 'Suede'],
            ['title' => 'Искусственная кожа', 'search_title' => 'Synthetic leather'],
            ['title' => 'Натуральная кожа', 'search_title' => 'Genuine leather'],
            ['title' => 'Комбинированная кожа', 'search_title' => 'Combined leather'],
            ['title' => 'Кожзам', 'search_title' => 'Faux leather'],
            ['title' => 'Войлок', 'search_title' => 'Felt'],
            ['title' => 'Нубук искусственный', 'search_title' => 'Synthetic nubuck'],
            ['title' => 'Нубук натуральный', 'search_title' => 'Natural nubuck'],
            ['title' => 'Велюр', 'search_title' => 'Velour'],
            ['title' => 'Резина', 'search_title' => 'Rubber'],
            ['title' => 'Текстиль', 'search_title' => 'Textile']
        ];

        DB::table('material_outsides')->insert($materials);
    }
}