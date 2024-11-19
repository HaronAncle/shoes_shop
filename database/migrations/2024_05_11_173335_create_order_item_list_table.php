<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_item_list', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger("count");
            $table->decimal('this_price', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->bigInteger('item_size_id')->unsigned();
            $table->bigInteger('order_id')->unsigned();
        
            $table->foreign('item_size_id')->references('id')->on('item_sizes_lists')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        
            $table->unique(['item_size_id', 'order_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_item_list');
    }
};
