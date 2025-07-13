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
        Schema::create('orders', function (Blueprint $table) {
            $table->integer('order_number')->autoIncrement();
            $table->string('invoice_number');

            $table->unsignedBigInteger('manufacturer_id');
            $table->unsignedBigInteger('importer_id')->nullable(); // if importer is optional

            $table->date('order_date')->nullable();
            $table->date('expected_delivery_date')->nullable();

            $table->enum('status', ['pending', 'approved', 'rejected', 'shipped', 'delivered'])->default('pending');
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
        Schema::dropIfExists('orders');
    }
};
