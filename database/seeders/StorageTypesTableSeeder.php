<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StorageTypesTableSeeder extends Seeder
{
    public function run()
    {
        $storageTypes = [
            ['title' => 'Склад', 'search_title' => 'Warehouse'],
            ['title' => 'Магазин', 'search_title' => 'Store']
        ];

        DB::table('storage_types')->insert($storageTypes);
    }
}
