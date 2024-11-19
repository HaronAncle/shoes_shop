<?php

namespace Database\Seeders\TempSeeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderItemListTableSeeder extends Seeder
{
    public function run()
    {
        $itemSizeIds = DB::table('item_sizes_lists')->pluck('id');
        $orderIds = DB::table('orders')->pluck('id');

        if ($itemSizeIds->isEmpty() || $orderIds->isEmpty()) {
            return;
        }

        $entries = [];

        // Заполнение каждого заказа хотя бы одним товаром
        foreach ($orderIds as $orderId) {
            $itemSizeId = $itemSizeIds->random();
            $count = rand(1, 5);
            $thisPrice = DB::table('items')
                ->join('item_sizes_lists', 'items.id', '=', 'item_sizes_lists.item_id')
                ->where('item_sizes_lists.id', $itemSizeId)
                ->value('items.price');
            $totalPrice = $thisPrice * $count;

            $entries[] = [
                'item_size_id' => $itemSizeId,
                'order_id' => $orderId,
                'count' => $count,
                'this_price' => $thisPrice,
                'total_price' => $totalPrice,
            ];
        }

        // Добавление 50 случайных связей
        while (count($entries) < count($orderIds) + 50) {
            $itemSizeId = $itemSizeIds->random();
            $orderId = $orderIds->random();
            $count = rand(1, 2);
            $thisPrice = DB::table('items')
                ->join('item_sizes_lists', 'items.id', '=', 'item_sizes_lists.item_id')
                ->where('item_sizes_lists.id', $itemSizeId)
                ->value('items.price');
            $totalPrice = $thisPrice * $count;

            $newEntry = [
                'item_size_id' => $itemSizeId,
                'order_id' => $orderId,
                'count' => $count,
                'this_price' => $thisPrice,
                'total_price' => $totalPrice,
            ];

            if (!collect($entries)->contains(function ($entry) use ($newEntry) {
                return $entry['item_size_id'] === $newEntry['item_size_id'] && $entry['order_id'] === $newEntry['order_id'];
            })) {
                $entries[] = $newEntry;
            }
        }

        // Вставляем данные в таблицу
        DB::table('order_item_list')->insert($entries);
    }
}
