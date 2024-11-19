<?php

namespace Database\Seeders\TempLargeSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ActionItemListTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Получение всех ID из таблиц items и actions
        $itemIds = DB::table('items')->pluck('id');
        $actionIds = DB::table('actions')->pluck('id');

        if ($itemIds->isEmpty() || $actionIds->isEmpty()) {
            return; // Если нет ID, сидер не создает данные.
        }

        for ($i = 0; $i < 20; $i++) {
            DB::table('action_item_list')->insert([
                'item_id' => $faker->randomElement($itemIds),
                'action_id' => $faker->randomElement($actionIds),
                'discount_percent' => $faker->randomFloat(2, 0.5, 99.99), // Скидка от 0.5% до 99.99%
                'total_clicks' => $faker->numberBetween(0, 10000),
                'total_in_orders' => $faker->numberBetween(0, 1000)
            ]);
        }
    }
}
