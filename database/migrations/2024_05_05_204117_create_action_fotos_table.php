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
        Schema::create('action_fotos', function (Blueprint $table) {
            $table->smallIncrements("id");
            $table->text('foto_url');
            $table->string('title', 100); 
            $table->string('search_title', 100)->index(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('action_fotos');
    }
};
