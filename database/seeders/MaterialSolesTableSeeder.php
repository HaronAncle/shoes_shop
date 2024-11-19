<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MaterialSolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $materials = [
            ['title' => 'Другое', 'search_title' => 'Other'],
            ['title' => 'Комбинированный', 'search_title' => 'Combined'],
            ['title' => 'ПВХ (поливинилхлорид)', 'search_title' => 'PVC'],
            ['title' => 'ПУ (полиуретан)', 'search_title' => 'PU'],
            ['title' => 'Резина', 'search_title' => 'Rubber'],
            ['title' => 'ТПУ (термопластичный полиуретан)', 'search_title' => 'TPU'],
            ['title' => 'ТЭП (термоэластопласт)', 'search_title' => 'TPE'],
            ['title' => 'ЭВА (этиленвинилацетат)', 'search_title' => 'EVA']
        ];

        DB::table('material_soles')->insert($materials);
    }
}
