<?php

namespace Database\Seeders\TempSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class StorageItemSizeLisTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $itemSizeIds = DB::table('item_sizes_lists')->pluck('id')->toArray();
        $storageIds = DB::table('storages')->pluck('id')->toArray();

        if (empty($itemSizeIds) || empty($storageIds)) {
            return; // Если нет ID, сидер не создает данные.
        }

        $combinations = [];
        foreach ($itemSizeIds as $itemSizeId) {
            $storageId = $faker->randomElement($storageIds);
            $exists = DB::table('storage_itemsize_list')
                ->where('item_size_id', $itemSizeId)
                ->where('storage_id', $storageId)
                ->exists();

            if (!$exists) {
                DB::table('storage_itemsize_list')->insert([
                    'item_size_id' => $itemSizeId,
                    'storage_id' => $storageId,
                    'count' => $faker->numberBetween(300, 1000)
                ]);
                $combinations[] = ['item_size_id' => $itemSizeId, 'storage_id' => $storageId];
            }
        }

        // Добавляем 50 дополнительных уникальных записей
        for ($i = 0; $i < 50; $i++) {
            do {
                $itemSizeId = $faker->randomElement($itemSizeIds);
                $storageId = $faker->randomElement($storageIds);
                $combination = ['item_size_id' => $itemSizeId, 'storage_id' => $storageId];
            } while (in_array($combination, $combinations));

            DB::table('storage_itemsize_list')->insert([
                'item_size_id' => $itemSizeId,
                'storage_id' => $storageId,
                'count' => $faker->numberBetween(300, 1000)
            ]);

            $combinations[] = $combination;
        }
    }
}
