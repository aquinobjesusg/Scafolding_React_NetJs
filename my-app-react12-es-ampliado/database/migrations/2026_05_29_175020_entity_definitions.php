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
        //
        Schema::create('entity_definitions', function (Blueprint $table) {
            $table->id();
            $table->string('entity_name'); // 'Product', 'Customer', etc.
            $table->string('table_name'); // 'products', 'customers'
            $table->string('label'); // 'Productos', 'Clientes'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
         Schema::dropIfExists('entity_definitions');
    }
};
