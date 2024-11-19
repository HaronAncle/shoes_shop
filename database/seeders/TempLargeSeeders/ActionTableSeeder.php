<?php

namespace Database\Seeders\TempLargeSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ActionTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $actionFotoIds = DB::table('action_fotos')->pluck('id')->toArray();
        $states = DB::table('states')->where('is_action', true)->pluck('id')->toArray();
        
        // Проверка наличия данных в обеих таблицах
        if (empty($states) || empty($actionFotoIds)) {
            return; // Возвращаемся, если нет данных в одной из таблиц
        }
        
        for ($i = 0; $i < 50; $i++) {
            // Безопасное получение случайных ID из массивов
            $fotoImgId = !empty($actionFotoIds) ? $faker->randomElement($actionFotoIds) : null;
            $stateLinkId = !empty($states) ? $faker->randomElement($states) : null;
        
            $createdAt = $faker->dateTimeBetween('-1 year', 'now');
            $startDay = $faker->dateTimeBetween('now', '+1 month');
            $endDay = $faker->dateTimeBetween($startDay, '+2 months'); // Убедитесь, что end_day позже start_day
        
            DB::table('actions')->insert([
                'foto_img_id' => $fotoImgId,
                'state_link_id' => $stateLinkId,
                'created_at' => $createdAt,
                'start_day' => $startDay,
                'end_day' => $endDay,
            ]);
        }
    }
}
