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
        Schema::create('item_materialins_list', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('item_id')->unsigned();
            $table->smallInteger('materialin_id')->unsigned();
    
            $table->foreign('item_id')->references('id')->on('items')->onDelete('cascade');
            $table->foreign('materialin_id')->references('id')->on('material_insides')->onDelete('cascade');
    
            
            $table->unique(['item_id', 'materialin_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('item_materialins_list');
    }
};
