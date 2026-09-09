<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EntityDefinition extends Model
{
    protected $fillable = [
         'entity_name',
         'table_name',
         'label',
    ];

}
