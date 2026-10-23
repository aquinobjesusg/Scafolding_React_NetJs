<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
// error.php - Página simple de error
$error_message = isset($_GET['msg']) ? $_GET['msg'] : 'Ha ocurrido un error inesperado.';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error del Sistema</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
        }
        .error-container {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            padding: 40px;
            max-width: 500px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="error-container text-center">
            <div class="mb-4">
                <i class="fas fa-exclamation-triangle fa-4x text-danger mb-3"></i>
                <h2 class="text-danger">Error del Sistema</h2>
            </div>
            
            <div class="alert alert-warning mb-4">
                <p class="mb-0"><?= htmlspecialchars($error_message) ?></p>
            </div>
            
            <div class="d-flex justify-content-center gap-3">
                <a href="javascript:history.back()" class="btn btn-secondary">
                    <i class="fas fa-arrow-left"></i> Volver Atrás
                </a>
                <a href="../gestion/gestion_carpetas.php" class="btn btn-primary">
                    <i class="fas fa-home"></i> Ir al Inicio
                </a>
            </div>
            
            <div class="mt-4 text-muted small">
                <p>Si el problema persiste, contacta al administrador del sistema.</p>
            </div>
        </div>
    </div>
</body>
</html>