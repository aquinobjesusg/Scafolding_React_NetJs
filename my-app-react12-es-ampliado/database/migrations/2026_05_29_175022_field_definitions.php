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
        Schema::create('field_definitions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('entity_definition_id')->constrained();
            $table->string('field_name'); // 'name', 'price', 'email'
            $table->string('column_type'); // 'string', 'integer', 'decimal', 'date', 'boolean'
            $table->json('validation_rules')->nullable(); // ['required', 'min:3', 'email']
            $table->json('ui_options')->nullable(); // ['placeholder', 'step', 'rows']
            $table->boolean('in_list')->default(true);
            $table->boolean('in_form')->default(true);
            $table->integer('order')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
         Schema::dropIfExists('field_definitions');
    }
};
