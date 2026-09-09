<?php
// app/Services/DynamicSchemaBuilder.php

namespace App\Services;

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use App\Models\EntityDefinition;
use App\Models\FieldDefinition;

class DynamicSchemaBuilder
{
    public function createTable(EntityDefinition $entity)
    {
        if (Schema::hasTable($entity->table_name)) {
            throw new \Exception("Table {$entity->table_name} already exists");
        }
        
        Schema::create($entity->table_name, function (Blueprint $table) use ($entity) {
            $table->id();
            
            foreach ($entity->fields as $field) {
                $this->addColumn($table, $field);
            }
            
            $table->timestamps();
        });
    }
    
    public function updateTable(EntityDefinition $entity)
    {
        foreach ($entity->fields as $field) {
            if (!Schema::hasColumn($entity->table_name, $field->field_name)) {
                Schema::table($entity->table_name, function (Blueprint $table) use ($field) {
                    $this->addColumn($table, $field);
                });
            }
        }
    }
    
    protected function addColumn(Blueprint $table, FieldDefinition $field)
    {
        return match($field->column_type) {
            'string' => $table->string($field->field_name, 255),
            'text' => $table->text($field->field_name),
            'integer' => $table->integer($field->field_name),
            'decimal' => $table->decimal($field->field_name, 10, 2),
            'date' => $table->date($field->field_name),
            'datetime' => $table->dateTime($field->field_name),
            'boolean' => $table->boolean($field->field_name),
            'json' => $table->json($field->field_name),
            default => $table->string($field->field_name),
        };
    }
}