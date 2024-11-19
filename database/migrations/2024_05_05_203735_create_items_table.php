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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string("model_name",255);
            $table->string("title",255);
            $table->smallInteger('maincategory_id')->unsigned()->nullable(); 
            $table->bigInteger('category_id')->unsigned()->nullable(); 
            $table->smallInteger('season_id')->unsigned()->nullable(); 
            $table->smallInteger('brend_id')->unsigned()->nullable(); 
            $table->smallInteger('material_sole_id')->unsigned()->nullable(); 
            $table->smallInteger('heelpiece_id')->unsigned()->nullable(); 
            $table->integer("heelpiace")->default(0);
            $table->text("urlimages");
            $table->text("description");
            $table->double("price");
            $table->bigInteger("total_clicks");
            $table->bigInteger("total_ordered");
            $table->bigInteger("total_in_busket");
            $table->softDeletes();

            $table->foreign('maincategory_id')->references('id')->on('maincategories')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('category_id')->references('id')->on('childcategories')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('season_id')->references('id')->on('seasons')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('brend_id')->references('id')->on('brends')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('material_sole_id')->references('id')->on('material_soles')->onUpdate('cascade')->onDelete('set null');
            $table->foreign('heelpiece_id')->references('id')->on('heepiece_types')->onUpdate('cascade')->onDelete('set null');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
