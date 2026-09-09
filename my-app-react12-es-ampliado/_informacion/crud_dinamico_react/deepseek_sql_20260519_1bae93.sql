-- migration: create_entity_definitions_table
Schema::create('entity_definitions', function (Blueprint $table) {
    $table->id();
    $table->string('entity_name'); // 'Product', 'Customer', etc.
    $table->string('table_name'); // 'products', 'customers'
    $table->string('label'); // 'Productos', 'Clientes'
    $table->timestamps();
});


-- migration: create_field_definitions_table
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