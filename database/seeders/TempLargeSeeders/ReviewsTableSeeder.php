<?php

namespace Database\Seeders\TempLargeSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ReviewsTableSeeder extends Seeder
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
        $itemsCount = DB::table('items')->count(); 

        if ($usersCount == 0 || $itemsCount == 0) {
            return;
        }

        for ($i = 0; $i < 50; $i++) {
            DB::table('reviews')->insert([
                'mark' => $faker->numberBetween(1, 5),
                'user_id' => $faker->numberBetween(1, $usersCount),
                'item_id' => $faker->numberBetween(1, $itemsCount),
                'description' => $faker->text,
                'created_at' => $faker->dateTimeThisYear(),
            ]);
        }
    }
}