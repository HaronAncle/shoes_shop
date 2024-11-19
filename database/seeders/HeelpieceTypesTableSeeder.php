<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class HeelpieceTypesTableSeeder extends Seeder
{
    public function run()
    {
        $types = [
            ['title' => 'Танкетка', 'search_title' => 'Wedge'],
            ['title' => 'Шпилька', 'search_title' => 'Stiletto'],
            ['title' => 'Платформа', 'search_title' => 'Platform'],
            ['title' => 'Без каблука', 'search_title' => 'Flat'],
            ['title' => 'Стандартный', 'search_title' => 'Standard'],
            ['title' => 'Рюмка', 'search_title' => 'Cup'],
            ['title' => 'Трапеция', 'search_title' => 'Trapeze'],
            ['title' => 'Столбик', 'search_title' => 'Column'],
            ['title' => 'Фигурный', 'search_title' => 'Figured']
        ];

        DB::table('heepiece_types')->insert($types);
    }
}
