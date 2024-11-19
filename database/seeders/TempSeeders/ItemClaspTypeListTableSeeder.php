<?php

namespace Database\Seeders\TempSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemClaspTypeListTableSeeder extends Seeder
{
    public function run()
    {
        // Получаем ID всех товаров и типов застежек
        $itemIds = DB::table('items')->pluck('id');
        $claspTypeIds = DB::table('clasp_types')->pluck('id');

        // Проверяем наличие данных
        if ($itemIds->isEmpty() || $claspTypeIds->isEmpty()) {
            return; // Выходим, если нет данных для создания связей
        }

        $entries = [];
        while (count($entries) < 60) {
            $newEntry = [
                'item_id' => $itemIds->random(),
                'clasptype_id' => $claspTypeIds->random()
            ];

            // Проверяем уникальность каждой пары, чтобы избежать дубликатов
            if (!collect($entries)->contains($newEntry)) {
                $entries[] = $newEntry;
            }
        }

        // Вставляем данные в таблицу
        DB::table('item_clasptype_list')->insert($entries);
    }
}
