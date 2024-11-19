<?php

namespace Database\Seeders\TempSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemSizesListTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $itemIds = DB::table('items')->pluck('id');
        $sizeIds = DB::table('sizes')->pluck('id');

        if ($itemIds->isEmpty() || $sizeIds->isEmpty()) {
            return;  
        }

        $itemSizesData = [];

        foreach ($itemIds as $itemId) {
            $startIndex = rand(0, count($sizeIds) - 6);

            $sizeRange = $sizeIds->slice($startIndex, 6);


            foreach ($sizeRange as $sizeId) {
                $itemSizesData[] = [
                    'size_id' => $sizeId,
                    'item_id' => $itemId,
                ];
            }
        }
        DB::table('item_sizes_lists')->insert($itemSizesData);
    }
}
