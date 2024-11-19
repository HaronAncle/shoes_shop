<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $orderStatuses = [
            ['title' => 'Новый', 'search_title' => 'new', 'description' => 'Заказ только что создан'],
            ['title' => 'Обработан', 'search_title' => 'processed', 'description' => 'Заказ обработан и готов к отправке'],
            ['title' => 'Отправлен', 'search_title' => 'shipped', 'description' => 'Заказ отправлен клиенту'],
            ['title' => 'Доставлен', 'search_title' => 'delivered', 'description' => 'Заказ доставлен получателю'],
            ['title' => 'Отменен', 'search_title' => 'cancelled', 'description' => 'Заказ отменен'],
            ['title' => 'Возврат', 'search_title' => 'returned', 'description' => 'Товар возвращен']
        ];

        DB::table('order_statuses')->insert($orderStatuses);
    }
}
