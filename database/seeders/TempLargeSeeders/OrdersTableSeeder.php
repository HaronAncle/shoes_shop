<?php

namespace Database\Seeders\TempLargeSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $usersCount = DB::table('users')->count();
        $deliveryTypesCount = DB::table('delivery_types')->count();
        $statusCount = DB::table('order_statuses')->count();
    
        if($statusCount == 0 || $deliveryTypesCount == 0 || $usersCount == 0) {
            return;
        }
    
        for ($i = 0; $i < 60; $i++) {
            DB::table('orders')->insert([
                'user_id' => $faker->numberBetween(1, $usersCount),
                'delivery_id' => $faker->boolean(95) ? $faker->numberBetween(1, $deliveryTypesCount) : null, // 95% chance not to be null
                'status_id' => $faker->boolean(95) ? $faker->numberBetween(1, $statusCount) : null, // 95% chance not to be null
                'created_at' => $faker->dateTimeThisYear(),
                'last_change' => $faker->dateTimeThisMonth(),
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'middle_name' => $faker->boolean(50) ? $faker->firstName : null, // 50% chance to be null
                'address' => $faker->address,
                'phone' => $faker->phoneNumber,
            ]);
        }
    }
}
