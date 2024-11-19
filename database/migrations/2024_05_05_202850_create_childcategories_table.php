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
        Schema::create('childcategories', function (Blueprint $table) {
            $table->id();
            $table->text('mail_foto_url');
            $table->string('title', 100); 
            $table->string('search_title', 100); 
            $table->text('description'); 
            $table->bigInteger("total_clicks");
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('childcategories');
    }
};
