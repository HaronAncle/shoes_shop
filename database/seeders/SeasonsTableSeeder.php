<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SeasonsTableSeeder extends Seeder
{
    public function run()
    {
        $seasons = [
            ['title' => 'Всесезонная', 'search_title' => 'All-season'],
            ['title' => 'Демисезонная', 'search_title' => 'Mid-season'],
            ['title' => 'Зима', 'search_title' => 'Winter'],
            ['title' => 'Лето', 'search_title' => 'Summer']
        ];

        DB::table('seasons')->insert($seasons);
    }
}