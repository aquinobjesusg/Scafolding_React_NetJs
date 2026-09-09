<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class BackupController extends Controller
{
    protected string $backupPath = 'private/Laravel';

    public function index()
    {
        // Bloquear windows
        if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
            abort(403, 'La funcionalidad de backup no está disponible en Windows.');
        }

        $realPath = storage_path('app/' . $this->backupPath);

        $files = File::exists($realPath) ? File::files($realPath) : [];

        $backups = collect($files)
            ->filter(fn($file) => $file->getExtension() === 'zip')
            ->map(fn($file) => [
                'name' => $file->getFilename(),
                'size' => $file->getSize(),
                'last_modified' => $file->getMTime(),
                'download_url' => route('backup.download', ['file' => $file->getFilename()]),
            ])
            ->sortByDesc('last_modified')
            ->values();

        return Inertia::render('backup/Index', [
            'backups' => $backups,
        ]);
    }

    public function run()
    {
        Artisan::call('backup:run --only-db');
        return redirect()->back()->with('success', 'Backup de base de datos creado exitosamente.');
    }

    public function download($file)
    {
        $path = storage_path('app/' . $this->backupPath . '/' . $file);

        if (!file_exists($path)) {
            abort(404, 'Archivo no encontrado.');
        }

        return response()->download($path);
    }

    public function delete($file)
    {
        $path = storage_path('app/' . $this->backupPath . '/' . $file);

        if (!file_exists($path)) {
            return redirect()->back()->with('error', 'Archivo no encontrado.');
        }

        unlink($path);

        return redirect()->back();
    }
}
