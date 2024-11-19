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
        Schema::create('brends', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('title', length: 80);
            $table->string('search_title', length: 80);
            $table->text("description");
            $table->text("urlimg_logo");
            $table->integer("totalcount");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brends');
    }
};
