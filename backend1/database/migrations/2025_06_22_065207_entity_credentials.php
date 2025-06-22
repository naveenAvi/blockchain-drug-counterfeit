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
         Schema::create('entity_credentials', function (Blueprint $table) {
            $table->id();
            $table->string('entityID');
            $table->string('certificate_path')->nullable();
            $table->string('private_key_path')->nullable();
            $table->string('username');
            $table->string('pasword');
            $table->smallInteger('is_active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entity_credentials');
    }
};
