<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DeliveryTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $deliveryTypes = [
            ['title' => 'В обработке', 'search_title' => 'processing', 'description' => 'Заказ находится в обработке'],
            ['title' => 'На складе', 'search_title' => 'in_warehouse', 'description' => 'Заказ находится на складе'],
            ['title' => 'В пути', 'search_title' => 'in_transit', 'description' => 'Заказ находится в пути'],
            ['title' => 'На пункте выдачи', 'search_title' => 'at_pickup_point', 'description' => 'Заказ находится на пункте выдачи'],
            ['title' => 'Выдано', 'search_title' => 'delivered', 'description' => 'Заказ выдан получателю']];

        DB::table('delivery_types')->insert($deliveryTypes);
    }
}
