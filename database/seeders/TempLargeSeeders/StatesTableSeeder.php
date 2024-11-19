<?php

namespace Database\Seeders\TempLargeSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class StatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 30; $i++) {
            DB::table('states')->insert([
                'created_at' => $faker->dateTimeThisDecade(),
                'foto_url' => $faker->imageUrl(),
                'is_action' => $faker->boolean(50),  // 50% шанс на true или false
                'title' => $faker->sentence(1),
                'statabody' => $faker->paragraph(3),
                'views' => $faker->numberBetween(0, 10000),
            ]);
        }
    }
}
