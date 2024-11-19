<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ChildCategoriesTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        $categories = [
            ['Босоножки', 'sandals'],
            ['Кроссовки', 'sneakers'],
            ['Сандали', 'sandals'],
            ['Сланцы', 'flip-flops'],
            ['П/ботинки', 'half-boots'],
            ['Ботинки', 'boots'],
            ['Туфли', 'shoes'],
            ['Пантолеты', 'mules'],
            ['Мокасины', 'moccasins'],
            ['Ботильоны', 'booties'],
            ['Балетки', 'flats'],
            ['Чешки', 'gym-shoes'],
            ['Дутики', 'padded-boots'],
            ['Сноубутсы', 'snow-boots'],
            ['Слипоны', 'slip-ons'],
            ['Сапоги', 'high-boots'],
            ['Кеды', 'plimsolls']
        ];

        foreach ($categories as $category) {
            DB::table('childcategories')->insert([
                'title' => $category[0],
                'search_title' => $category[1],
                'description' => $faker->paragraph,
                'mail_foto_url' => $faker->imageUrl,
                'total_clicks' => $faker->numberBetween(0, 1000)
            ]);
        }
    }
}
