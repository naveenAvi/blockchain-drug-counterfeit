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
        Schema::create('ent_transactions', function (Blueprint $table) {
            $table->integer('transactionID')->autoIncrement();

            $table->integer('drugid')->nullable(false);

            $table->string('fromEntID');
            $table->string('toEntID');

            $table->integer('amount')->default(0);

            $table->enum('status', ['pending', 'success', 'rejected'])->default('success');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ent_transactions');
    }
};
