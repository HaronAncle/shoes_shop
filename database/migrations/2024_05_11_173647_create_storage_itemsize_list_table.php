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
        Schema::create('storage_itemsize_list', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('item_size_id')->unsigned();
            $table->bigInteger('storage_id')->unsigned();

    
            $table->foreign('item_size_id')->references('id')->on('item_sizes_lists')->onDelete('cascade');
            $table->foreign('storage_id')->references('id')->on('storages')->onDelete('cascade');
            $table->bigInteger("count");
            $table->bigInteger("total_sended")->default(0);
            
            $table->unique(['item_size_id', 'storage_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('storage_itemsize_list');
    }
};
