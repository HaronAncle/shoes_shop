<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SizesTableSeeder extends Seeder
{
    public function run()
    {
        for ($size = 17; $size <= 51; $size++) {
            DB::table('sizes')->insert([
                'title' => (string)$size
            ]);
        }
    }
}
