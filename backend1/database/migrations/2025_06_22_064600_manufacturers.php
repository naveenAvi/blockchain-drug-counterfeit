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
        Schema::create('connectedEntities', function (Blueprint $table) {
            $table->id();
            $table->string('type');//manufacturer, importer, distributor
            $table->string('name');
            $table->text('address');
            $table->string('country');
            $table->string('contact');
            $table->string('license_type')->nullable();
            $table->string('license_number')->nullable();
            $table->year('established_year');
            $table->string('logo_path')->nullable();
            $table->smallInteger('is_active');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('connectedEntities');
    }
};
