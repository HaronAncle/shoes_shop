<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClaspTypesTableSeeder extends Seeder
{
    public function run()
    {
        $claspTypes = [
            ['title' => 'Без регулировки', 'search_title' => 'No adjustment'],
            ['title' => 'Велкро', 'search_title' => 'Velcro'],
            ['title' => 'Комбинированная', 'search_title' => 'Combined'],
            ['title' => 'Молния', 'search_title' => 'Zipper'],
            ['title' => 'Пряжка', 'search_title' => 'Buckle'],
            ['title' => 'Резинка', 'search_title' => 'Elastic'],
            ['title' => 'Шнурок', 'search_title' => 'Lace']
        ];

        DB::table('clasp_types')->insert($claspTypes);
    }
}
