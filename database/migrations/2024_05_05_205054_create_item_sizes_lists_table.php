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
        Schema::create('item_sizes_lists', function (Blueprint $table) {
            $table->id();
            $table->smallInteger('size_id')->unsigned(); 
            $table->bigInteger("item_id")->unsigned();
            $table->bigInteger("total_count")->default(0);
            $table->bigInteger("total_ordered")->default(0);
            $table->bigInteger("total_in_storage")->default(0);
            $table->bigInteger("total_delivered")->default(0);
            $table->foreign('size_id')->references('id')->on('sizes')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('item_id')->references('id')->on('items')->onUpdate('cascade')->onDelete('cascade');
       
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_sizes_lists');
    }
};
