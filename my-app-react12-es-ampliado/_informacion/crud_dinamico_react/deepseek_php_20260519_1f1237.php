// routes/api.php
use App\Http\Controllers\DynamicCrudController;

Route::get('/api/dynamic/{entity}', [DynamicCrudController::class, 'index']);
Route::post('/api/dynamic/{entity}', [DynamicCrudController::class, 'store']);
Route::put('/api/dynamic/{entity}/{id}', [DynamicCrudController::class, 'update']);
Route::delete('/api/dynamic/{entity}/{id}', [DynamicCrudController::class, 'destroy']);