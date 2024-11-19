<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PaymentTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        DB::table('payment_types')->insert([
            ['title' => 'Картой при получении', 'search_title' => 'card'],
            ['title' => 'Наличными при получении', 'search_title' => 'cash'],
        ]);
    }
}
