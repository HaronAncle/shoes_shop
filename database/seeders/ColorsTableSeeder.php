<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ColorsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('colors')->insert([
            ['title' => 'Красный', 'search_title' => 'red', 'color_code' => '#FF0000'],
            ['title' => 'Зелёный', 'search_title' => 'green', 'color_code' => '#008000'],
            ['title' => 'Белый', 'search_title' => 'white', 'color_code' => '#FFFFFF'],
            ['title' => 'Черный', 'search_title' => 'black', 'color_code' => '#000000'],
            ['title' => 'Яркий серый', 'search_title' => 'bright gray', 'color_code' => '#E0E0E0'],
            ['title' => 'Темный серый', 'search_title' => 'dark gray', 'color_code' => '#A9A9A9'],
            ['title' => 'Синий', 'search_title' => 'blue', 'color_code' => '#0000FF'],
            ['title' => 'Коричневый', 'search_title' => 'brown', 'color_code' => '#A52A2A'],
            ['title' => 'Бежевый', 'search_title' => 'beige', 'color_code' => '#F5F5DC'],
            ['title' => 'Жёлтый', 'search_title' => 'yellow', 'color_code' => '#FFFF00'],
            ['title' => 'Фиолетовый', 'search_title' => 'purple', 'color_code' => '#800080'],
            ['title' => 'Бордовый', 'search_title' => 'burgundy', 'color_code' => '#800020'],
            ['title' => 'Рыжий', 'search_title' => 'ginger', 'color_code' => '#FF4500'],
            ['title' => 'Разноцветный', 'search_title' => 'multicolored', 'color_code' => 'multicolored']
        ]);
    }
}
