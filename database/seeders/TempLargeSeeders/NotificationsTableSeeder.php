<?php

namespace Database\Seeders\TempLargeSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class NotificationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $userCount = DB::table('users')->count(); // Узнаем количество пользователей

        if ($userCount == 0) {
            return;
        }

        for ($i = 0; $i < 150; $i++) {
            DB::table('notifications')->insert([
                'inner_text' => $faker->sentence,
                'addressee_id' => $faker->numberBetween(1, $userCount),
                'sendtime' => $faker->dateTimeThisYear(),
                'is_read' => $faker->boolean(20)  // 20% chance to be read
            ]);
        }
    }
}