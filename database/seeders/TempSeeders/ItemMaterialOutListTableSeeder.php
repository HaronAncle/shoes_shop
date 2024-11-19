<?php

namespace Database\Seeders\TempSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemMaterialOutListTableSeeder extends Seeder
{
    public function run()
    {$itemIds = DB::table('items')->pluck('id');
        $materialOutIds = DB::table('material_outsides')->pluck('id');
        
        if ($itemIds->isEmpty() || $materialOutIds->isEmpty()) {
            return; 
        }
        
        $entries = [];
        
        // Создаем по одной записи для каждого item_id
        foreach ($itemIds as $itemId) {
            $entries[] = [
                'item_id' => $itemId,
                'materialout_id' => $materialOutIds->random()
            ];
        }
        
        // Создаем уникальные записи до тех пор, пока их количество не достигнет 60
        while (count($entries) < 60) {
            $newEntry = [
                'item_id' => $itemIds->random(),
                'materialout_id' => $materialOutIds->random(),
            ];
        
            // Проверяем уникальность записи
            if (!collect($entries)->contains(function ($entry) use ($newEntry) {
                return $entry['item_id'] === $newEntry['item_id'] && $entry['materialout_id'] === $newEntry['materialout_id'];
            })) {
                $entries[] = $newEntry;
            }
        }
        
        // Вставляем данные в таблицу
        DB::table('item_materialout_list')->insert($entries);
    }
}
