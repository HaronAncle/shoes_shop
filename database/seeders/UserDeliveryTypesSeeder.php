<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserDeliveryTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('userdelivery_types')->insert([
            ['title' => 'Самовывоз с Притыцкого 10', 'search_title' => 'selfdelivery'],
            ['title' => 'Доставка в пределах МКАД', 'search_title' => 'ourdelivery'],
            ['title' => 'Почтовое отправление', 'search_title' => 'postdelivery'],
        ]);
    }
}
