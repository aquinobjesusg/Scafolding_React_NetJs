<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FieldDefinition extends Model
{
    protected $fillable = [
    'entity_definition_id',
    'field_name',
    'column_type',
    'validation_rules',
    'ui_options',
    'in_list',
    'in_form',
    'order',
    ];

}
