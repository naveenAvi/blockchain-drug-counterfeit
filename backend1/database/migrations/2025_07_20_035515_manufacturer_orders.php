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
        
        Schema::create('manufacturer_orders', function (Blueprint $table) {
            $table->integer('order_number')->autoIncrement();
            $table->integer('importerOrderID');
            $table->integer('drugid');
            $table->string('invoice_number');
            $table->string('reference_document')->nullable();
            

            $table->unsignedBigInteger('manufacturer_id');
            $table->unsignedBigInteger('importer_id'); 

            $table->date('order_date')->default(now());

            $table->string('status')->default('pending');
            $table->integer('total_amount')->default(0);

            $table->text('notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manufacturer_orders');
    }
};
