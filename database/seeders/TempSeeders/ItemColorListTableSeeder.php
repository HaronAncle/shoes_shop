<?php

namespace Database\Seeders\TempSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemColorListTableSeeder extends Seeder
{
    public function run()
    {
        $itemIds = DB::table('items')->pluck('id');
        $colorIds = DB::table('colors')->pluck('id');
        
        if ($itemIds->isEmpty() || $colorIds->isEmpty()) {
            return;  
        }
        
        $itemColorData = [];
        $neededCount = 70;  

        foreach ($itemIds as $itemId) {
            $itemColorData[] = [
                'item_id' => $itemId,
                'color_id' => $colorIds->random()
            ];
        }
        
        $additionalEntries = 10;
        while ($additionalEntries > 0) {
            $itemColorData[] = [
                'item_id' => $itemIds->random(),
                'color_id' => $colorIds->random()
            ];
            $additionalEntries--;
        }

        $itemColorData = array_unique($itemColorData, SORT_REGULAR);

        DB::table('item_color_list')->insert($itemColorData);
    }
}
