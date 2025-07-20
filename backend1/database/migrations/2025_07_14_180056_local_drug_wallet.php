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
         Schema::create('local_drug_wallet', function (Blueprint $table) {
            $table->integer('drug_wallet_id')->autoIncrement();

            
            $table->string('assetsID')->nullable(true);


            $table->string('drugid')->nullable(false);

            $table->string('entID')->nullable();
            $table->integer('ownerID')->nullable();

            $table->integer('avail_amount')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('local_drug_wallet');
    }
};
