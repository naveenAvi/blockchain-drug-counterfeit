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
        Schema::create('transaction_status', function (Blueprint $table) {
            $table->integer('statusid')->autoIncrement();
            $table->integer('type'); //transaction, creation
            $table->string('stage');
            $table->string('passfail');
            $table->string('message')->nullable();
            $table->integer('eventReferenceNumber');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_status');
    }
};
