<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BackupController;
use App\Http\Controllers\AuditLogController;
use App\Http\Controllers\UserFileController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\SettingAppController;
use App\Http\Controllers\MediaFolderController;

use App\Http\Controllers\DynamicCrudController;

use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/api/dynamic/{entity}', [DynamicCrudController::class, 'index']);
Route::post('/api/dynamic/{entity}', [DynamicCrudController::class, 'store']);
Route::put('/api/dynamic/{entity}/{id}', [DynamicCrudController::class, 'update']);
Route::delete('/api/dynamic/{entity}/{id}', [DynamicCrudController::class, 'destroy']);




Route::middleware(['auth', 'menu.permission'])->group(function () {

Route::get('tabla', function () {
        return Inertia::render('tabla');
})->name('tabla');

    Route::get('dashboard', function () {
        return Inertia::render('informacion');
    })->name('dashboard');

    Route::get('estadisticas', function () {
        return Inertia::render('dashboard');
    })->name('estadisticas');

    Route::get('general', function () {
        return Inertia::render('estadisticas');
    })->name('general');
    
    Route::get('dashboard1', function () {
        return Inertia::render('dashboard1');
    })->name('dashboard1');

    Route::get('dashboard2', function () {
        return Inertia::render('dashboard2');
    })->name('dashboard2');

    Route::get('dashboard3', function () {
        return Inertia::render('dashboard3');
    })->name('dashboard3');

    Route::resource('roles', RoleController::class);
    
    Route::resource('menus', MenuController::class);
    Route::post('menus/reorder', [MenuController::class, 'reorder'])->name('menus.reorder');
    
    Route::resource('permissions', PermissionController::class);
    
    Route::resource('users', UserController::class);
    Route::put('/users/{user}/reset-password', [UserController::class, 'resetPassword'])->name('users.reset-password');
    
    Route::get('/settingsapp', [SettingAppController::class, 'edit'])->name('setting.edit');
    Route::post('/settingsapp', [SettingAppController::class, 'update'])->name('setting.update');

    // BACKUPS solo funcionan en LINUX/UNIX/MACOS
    Route::get('/audit-logs', [AuditLogController::class, 'index'])->name('audit-logs.index');
    
    Route::get('/backup', [BackupController::class, 'index'])->name('backup.index');
    Route::post('/backup/run', [BackupController::class, 'run'])->name('backup.run');
    Route::get('/backup/download/{file}', [BackupController::class, 'download'])->name('backup.download');
    Route::delete('/backup/delete/{file}', [BackupController::class, 'delete'])->name('backup.delete');
    
    Route::get('/files', [UserFileController::class, 'index'])->name('files.index');
    Route::post('/files', [UserFileController::class, 'store'])->name('files.store');
    Route::delete('/files/{id}', [UserFileController::class, 'destroy'])->name('files.destroy');
    
    Route::resource('media', MediaFolderController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
