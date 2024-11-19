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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();

            $table->text("text");
            $table->dateTime("sendtime");
            $table->boolean("is_read")->default(0);

            $table->bigInteger('adressee_id')->unsigned(); 
            $table->bigInteger('adresser_id')->unsigned(); 
            $table->bigInteger('for_answer_id')->unsigned()->nullable(); 

            $table->foreign('for_answer_id')->references('id')->on('messages')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('adressee_id')->references('id')->on('user_workers')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('adresser_id')->references('id')->on('user_workers')->onUpdate('cascade')->onDelete('cascade');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
