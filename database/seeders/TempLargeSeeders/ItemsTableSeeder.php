<?php

namespace Database\Seeders\TempLargeSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ItemsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        for ($i = 0; $i < 400; $i++) {
            DB::table('items')->insert([
                'model_name' => $faker->word,
                'title' => $faker->sentence,
                'maincategory_id' => $this->getRandomId('maincategories'),
                'category_id' => $this->getRandomId('childcategories'),
                'season_id' => $this->getRandomId('seasons'),
                'brend_id' => $this->getRandomId('brends'),
                'material_sole_id' => $this->getRandomId('material_soles'),
                'heelpiece_id' => $this->getRandomId('heepiece_types'),
                'heelpiace' => $faker->numberBetween(1, 10),
                'urlimages' => $faker->imageUrl,
                'description' => $faker->paragraph,
                'price' => $faker->randomFloat(2, 30, 200),
                'total_clicks' => $faker->numberBetween(0, 10000),
                'total_ordered' => $faker->numberBetween(0, 500),
                'total_in_busket' => $faker->numberBetween(0, 300)
            ]);
        }
    }

    private function getRandomId($table)
    {
        $id = DB::table($table)->inRandomOrder()->first()->id ?? null;
        if ($id && mt_rand(1, 100) <= 99) {
            return $id;
        }
        return null;
    }
}