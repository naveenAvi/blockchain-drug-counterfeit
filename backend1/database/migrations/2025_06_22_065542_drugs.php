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
            $table->string('category'); // e.g., Antibiotic, Analgesic
            $table->string('dosage_form'); // e.g., Tablet, Syrup, Injection
            $table->string('strength')->nullable(); // e.g., 500mg
            $table->string('status')->default('pending'); 
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
