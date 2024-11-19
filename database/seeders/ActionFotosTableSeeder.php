<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActionFotosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('action_fotos')->insert([
            ['foto_url' => 'путь_к_фото_1', 'title' => 'новое', 'search_title' => 'new'],
            ['foto_url' => 'путь_к_фото_2', 'title' => 'акция', 'search_title' => 'sale'],
            ['foto_url' => 'путь_к_фото_3', 'title' => 'школа', 'search_title' => 'school'],
        ]);
    }
}
