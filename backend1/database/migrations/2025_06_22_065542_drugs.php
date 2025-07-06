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
        Schema::create('drugs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->json('dosages')->nullable();
            $table->text('specifications')->nullable();
            $table->string('image')->nullable();
            $table->string('drug_id')->unique();
            $table->text('active_ingredients');
            $table->text('excipients');
            $table->string('strength');
            $table->string('dosage_form');
            $table->string('route_of_administration');
            $table->string('packaging_type');
            $table->text('storage_conditions');
            $table->string('shelf_life');
            $table->string('gs1_gtin');
            $table->string('regulatory_approval_region');
            $table->string('national_drug_code');
            $table->string('marketing_authorization_holder');
            $table->string('controlled_substance_schedule');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drugs');
    }
};
