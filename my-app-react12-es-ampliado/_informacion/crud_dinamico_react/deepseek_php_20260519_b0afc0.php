<?php
// app/Http/Controllers/DynamicCrudController.php

namespace App\Http\Controllers;

use App\Models\EntityDefinition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DynamicCrudController extends Controller
{
    public function index(EntityDefinition $entity)
    {
        $records = DB::table($entity->table_name)->paginate(15);
        
        return response()->json([
            'entity' => $entity,
            'fields' => $entity->fields()->where('in_list', true)->get(),
            'records' => $records
        ]);
    }
    
    public function store(Request $request, EntityDefinition $entity)
    {
        $validated = $request->validate($this->getValidationRules($entity));
        
        $id = DB::table($entity->table_name)->insertGetId($validated);
        
        return response()->json(['id' => $id, 'message' => 'Created']);
    }
    
    public function update(Request $request, EntityDefinition $entity, $id)
    {
        $validated = $request->validate($this->getValidationRules($entity));
        
        DB::table($entity->table_name)->where('id', $id)->update($validated);
        
        return response()->json(['message' => 'Updated']);
    }
    
    public function destroy(EntityDefinition $entity, $id)
    {
        DB::table($entity->table_name)->delete($id);
        
        return response()->json(['message' => 'Deleted']);
    }
    
    private function getValidationRules(EntityDefinition $entity)
    {
        $rules = [];
        foreach ($entity->fields as $field) {
            if ($field->validation_rules) {
                $rules[$field->field_name] = implode('|', $field->validation_rules);
            }
        }
        return $rules;
    }
}