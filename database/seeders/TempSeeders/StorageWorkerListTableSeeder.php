<?php

namespace Database\Seeders\TempSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class StorageWorkerListTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $workers = DB::table('user_workers')->pluck('id')->toArray();
        $storages = DB::table('storages')->pluck('id')->toArray();

        // Проверяем есть ли данные для заполнения
        if (empty($workers) || empty($storages)) {
            echo "Not enough data to seed storage_worker_list. Please seed users and storages first.\n";
            return;
        }

        $usedPairs = [];

        for ($i = 0; $i < 15; $i++) {
            do {
                $worker_id = $faker->randomElement($workers);
                $storage_id = $faker->randomElement($storages);
                $pair = $worker_id . '-' . $storage_id;
            } while (in_array($pair, $usedPairs)); // Проверяем уникальность пары

            $usedPairs[] = $pair; // Добавляем пару в использованные

            DB::table('storage_worker_list')->insert([
                'worker_id' => $worker_id,
                'storage_id' => $storage_id
            ]);
        }
    }
}