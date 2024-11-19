<?php

namespace Database\Seeders\TempSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemMaterialInsListTableSeeder extends Seeder
{
    public function run()
    {
        $itemIds = DB::table('items')->pluck('id');
        $materialInIds = DB::table('material_insides')->pluck('id');
        
        // Проверяем, есть ли доступные ID
        if ($itemIds->isEmpty() || $materialInIds->isEmpty()) {
            return; // Выходим, если один из массивов пуст
        }
        
        $entries = [];
        
        // Создаем по одной записи для каждого item_id
        foreach ($itemIds as $itemId) {
            $entries[] = [
                'item_id' => $itemId,
                'materialin_id' => $materialInIds->random()
            ];
        }
        
        // Добавляем дополнительные записи для достижения общего числа 60
        while (count($entries) < 60) {
            $entries[] = [
                'item_id' => $itemIds->random(),
                'materialin_id' => $materialInIds->random()
            ];
        }
        
        // Удаляем дублирующиеся записи, если таковые имеются
        $entries = array_unique($entries, SORT_REGULAR);
        
        // Вставляем данные в таблицу
        DB::table('item_materialins_list')->insert($entries);
    }
}
