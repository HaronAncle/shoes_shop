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
        Schema::create('maincategories', function (Blueprint $table) {
            $table->smallIncrements("id");
            $table->string('title', 100); 
            $table->string('search_title', 100)->index(); 
            $table->text('description'); 
            $table->text('mail_foto_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maincategories');
    }
};
