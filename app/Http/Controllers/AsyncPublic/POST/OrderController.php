<?php

namespace App\Http\Controllers\AsyncPublic\POST;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'paymentMethod' => 'required|string',
            'deliveryMethod' => 'required|string',
            'personalInfo' => 'required|array',
            'items' => 'required|array',
            'items.*.id' => 'required|integer|exists:item_sizes_lists,item_id',
            'items.*.size' => 'required|string',
            'items.*.count' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric',
            'items.*.actual_price' => 'required|numeric',
            'totalSum' => 'required|numeric',
            'totalSumWithDiscount' => 'required|numeric',
        ]);

        DB::beginTransaction();

        try {
            $personalInfo = $request->personalInfo;
            $userId = $personalInfo['user']['id'];
            $deliveryId = $this->getDeliveryIdByMethod($request->deliveryMethod);
            $deliveryId = $this->getPaymentIdByMethod($request->paymentMethod);
            $now = Carbon::now();

            $orderId = DB::table('orders')->insertGetId([
                'user_id' => $userId,
                'delivery_id' => 1,
                'status_id' => 1,
                'userdelivery_type_id' =>$deliveryId,
                'payment_type_id' =>$deliveryId,
                'created_at' => $now,
                'last_change' => $now,
                'first_name' => $personalInfo['name'],
                'last_name' => $personalInfo['surname'],
                'middle_name' => $personalInfo['otchestvo'] ?? null,
                'address' => $personalInfo['address'],
                'phone' => $personalInfo['telephone'],
            ]);

            foreach ($request->items as $item) {
                $itemSize = DB::table('item_sizes_lists')
                    ->where('item_id', $item['id'])
                    ->where('size_id', $this->getSizeIdBySize($item['size']))
                    ->first();

                if ($itemSize->total_count < $item['count']) {
                    throw new \Exception("Нет сочетания товара {$item['id']} и размера {$item['size']}");
                }

                DB::table('order_item_list')->insert([
                    'item_size_id' => $itemSize->id,
                    'order_id' => $orderId,
                    'count' => $item['count'],
                    'this_price' => $item['price'],
                    'total_price' => $item['actual_price'] * $item['count'],
                ]);

                DB::table('item_sizes_lists')
                    ->where('id', $itemSize->id)
                    ->update([
                        'total_count' => DB::raw("total_count - {$item['count']}"),
                        'total_ordered' => DB::raw("total_ordered + {$item['count']}"),
                    ]);
            }

            DB::commit();
            return response()->json(['message' => 'Order created successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    private function getDeliveryIdByMethod($method)
    {
        
        return DB::table('userdelivery_types')->where('search_title', $method)->value('id');
    }
    private function getPaymentIdByMethod($method)
    {
        return DB::table('payment_types')->where('search_title', $method)->value('id');
    }

    private function getSizeIdBySize($size)
    {
        return DB::table('sizes')->where('title', $size)->value('id');
    }
}