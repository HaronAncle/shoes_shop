<?php

namespace Database\Seeders\TempLargeSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class StoragesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker::create();
    
        // Получаем количество записей в таблице storage_types
        $storagetypeCount = DB::table('storage_types')->count();
    
        for ($i = 0; $i < 30; $i++) {
            DB::table('storages')->insert([
                'storagetype_id' => $faker->boolean(75) ? $faker->numberBetween(1, $storagetypeCount) : null, // Теперь выбираем из всех доступных storagetype_id
                'title' => $faker->sentence(1),
                'address' => $faker->address,
                'contacts' => $faker->phoneNumber,
                'deleted_at' => null,
            ]);
        }
    }
}
