<?php

namespace Database\Seeders\TempLargeSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class UserWorkersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $userCount = DB::table('users')->count();

        if ($userCount == 0) {
            return;
        }

        for ($i = 0; $i < 15; $i++) {
            DB::table('user_workers')->insert([
                'user_id' => $faker->numberBetween(1, $userCount),
                'name' => $faker->firstName,
                'surname' => $faker->lastName,
                'otchestvo' => $faker->boolean(80) ? $faker->firstNameMale : null, // 80% шанс на наличие отчества
                'paycard' => $faker->boolean(50) ? $faker->creditCardNumber : null, // 50% шанс на наличие номера банковской карты
            ]);
        }
    }
}
