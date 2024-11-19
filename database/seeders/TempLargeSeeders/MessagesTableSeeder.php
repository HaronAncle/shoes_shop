<?php

namespace Database\Seeders\TempLargeSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class MessagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $workerCount = DB::table('user_workers')->count();

        if ($workerCount < 2) {
            return;
        }

        for ($i = 0; $i < 100; $i++) {
            $adressee_id = $faker->numberBetween(1, $workerCount);
            $adresser_id = $faker->numberBetween(1, $workerCount);

            while ($adresser_id === $adressee_id) {
                $adresser_id = $faker->numberBetween(1, $workerCount);
            }

            DB::table('messages')->insert([
                'text' => $faker->realText(200),
                'sendtime' => $faker->dateTimeThisYear(),
                'is_read' => $faker->boolean(50),
                'adressee_id' => $adressee_id,
                'adresser_id' => $adresser_id,
                'for_answer_id' => null, // Optionally can be set based on specific logic
            ]);
        }
    }
}
