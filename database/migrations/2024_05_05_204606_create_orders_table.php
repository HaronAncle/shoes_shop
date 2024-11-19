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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned(); 
            $table->smallInteger('delivery_id')->unsigned()->nullable(); 
            $table->smallInteger('status_id')->unsigned()->nullable(); 
            $table->dateTime("created_at");
            $table->dateTime("last_change");
            
            $table->string('first_name');
            $table->string('last_name');
            $table->string('middle_name')->nullable();
            $table->string('address');
            $table->string('phone');


            $table->smallInteger('userdelivery_type_id')->unsigned()->nullable(); 
            $table->smallInteger('payment_type_id')->unsigned()->nullable();

            $table->decimal('total_price', 10, 2)->default(0);
            $table->integer('total_items')->unsigned()->default(0);
          
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('delivery_id')->references('id')->on('delivery_types')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('status_id')->references('id')->on('order_statuses')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('userdelivery_type_id')->references('id')->on('userdelivery_types')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('payment_type_id')->references('id')->on('payment_types')->onUpdate('cascade')->onDelete('set null'); 

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
