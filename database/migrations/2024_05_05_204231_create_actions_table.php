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
        Schema::create('actions', function (Blueprint $table) {
            $table->id();
            $table->smallInteger('foto_img_id')->unsigned()->nullable(); 
            $table->bigInteger("state_link_id")->unsigned()->nullable();
            $table->dateTime("created_at");
            $table->dateTime("start_day");
            $table->dateTime("end_day");
            $table->softDeletes(); 
            $table->foreign('foto_img_id')->references('id')->on('action_fotos')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('state_link_id')->references('id')->on('states')->onUpdate('cascade')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actions');
    }
};
