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
        Schema::create('storage_worker_list', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('worker_id')->unsigned();
            $table->bigInteger('storage_id')->unsigned()->nullable();
    
            $table->foreign('worker_id')->references('id')->on('user_workers')->onDelete('cascade');
            $table->foreign('storage_id')->references('id')->on('storages')->onDelete('set null');
            
            
            $table->unique(['worker_id', 'storage_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('storage_worker_list');
    }
};
