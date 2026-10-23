<?php
// Conexión
require_once __DIR__ . '/../../conexion/conexion.php';
if (!isset($pdo)) {
    die("Error: Conexión no establecida en " . __FILE__);
}
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// Personalizar manejo de errores
function customErrorHandler() {
    // Redirigir o mostrar mensaje amigable
    header("Location: error.php");
    exit();
}
set_error_handler('customErrorHandler');
set_exception_handler('customErrorHandler');
// RUTAS CORREGIDAS (usando directorio actual de gestión)
define('CARPETAS_ROOT', __DIR__ . '/../carpetas/');// Verificación mejorada
$error = null;
if (!file_exists(CARPETAS_ROOT)) {
    if (!mkdir(CARPETAS_ROOT, 0755, true)) {
        $error = "<div class='alert alert-warning'>No se encontró el directorio de carpetas. Verifica que exista: " . htmlspecialchars(CARPETAS_ROOT) . "</div>";
    }
} elseif (!is_writable(CARPETAS_ROOT)) {
    $error = "<div class='alert alert-warning'>El sistema no tiene permisos para modificar la carpeta. Verifica los permisos de: " . htmlspecialchars(CARPETAS_ROOT) . "</div>";
}

// Obtener carpetas
function obtenerCarpetas()
{
    $rutaBase = CARPETAS_ROOT;
    $carpetas = [];

    if (file_exists($rutaBase)) {
        $elementos = scandir($rutaBase);
        foreach ($elementos as $elemento) {
            $rutaCompleta = $rutaBase . $elemento;
            if ($elemento != '.' && $elemento != '..' && is_dir($rutaCompleta)) {
                $carpetas[] = $elemento;
            }
        }
    }

    rsort($carpetas);
    return $carpetas;
}

// Procesar creación de carpeta
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['nombre_carpeta'])) {
    $nombreCarpeta = trim($_POST['nombre_carpeta']);
    $rutaCarpeta = CARPETAS_ROOT . $nombreCarpeta; // DEFINICIÓN AÑADIDA

    // Validación mejorada (permite acentos y nombres completos)
    if (!preg_match('/^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s?-\s?\d{4}$/i', $nombreCarpeta)) {
        $error = "Formato incorrecto. Use: Mes-Año (Ej: Junio-2024)";
    } else {
        // Normalización de nombre
        $nombreCarpeta = preg_replace('/\s+/', '', $nombreCarpeta); // Eliminar espacios
        $partes = explode('-', $nombreCarpeta);
        $nombreCarpeta = ucfirst(strtolower($partes[0])) . '-' . $partes[1];

        if (!file_exists($rutaCarpeta)) {
            // CORRECCIÓN: Sin recursividad innecesaria
            if (mkdir($rutaCarpeta, 0755)) {
                $mensaje = "Carpeta '$nombreCarpeta' creada con éxito!";
            } else {
                $error = "Error al crear la carpeta. Verifique permisos.";
            }
        } else {
            $error = "La carpeta '$nombreCarpeta' ya existe.";
        }
    }
}

$carpetasExistentes = obtenerCarpetas();
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Gestión de Carpetas por Mes</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        body {
            background-color: rgb(17, 81, 145);
            padding: 20px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            background-color: rgba(255, 255, 255, 0.1);
            padding: 15px;
            border-radius: 8px;
        }

        .carpeta-container {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
        }

        .carpeta {
            width: 200px;
            height: 150px;
            background-color: #f8f9fa;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .carpeta:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
            background-color: #e9ecef;
        }

        .carpeta i {
            font-size: 48px;
            color: #17a2b8;
            margin-bottom: 10px;
        }

        .carpeta .nombre {
            font-size: 18px;
            font-weight: bold;
            text-align: center;
        }

        .form-crear {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 30px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <a href="../index.php" class="btn btn-light">
                <i class="fas fa-arrow-left"></i> Volver a Registro
            </a>
            <h2 class="text-white">Gestión de Carpetas por Mes</h2>
            <div></div>
        </div>

        <?php if (isset($error)): ?>
            <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <?php if (isset($mensaje)): ?>
            <div class="alert alert-success"><?= htmlspecialchars($mensaje) ?></div>
        <?php endif; ?>

        <div class="form-crear">
            <h4>Crear Nueva Carpeta</h4>
            <form method="POST">
                <div class="form-group">
                    <label for="nombre_carpeta">Nombre del Mes (Ej: Junio-2024):</label>
                    <input type="text" class="form-control" id="nombre_carpeta" name="nombre_carpeta" required
                        pattern="[a-zA-ZáéíóúÁÉÍÓÚñÑ]+\s?-\s?\d{4}" title="Formato: Mes-Año (Ej: Junio-2024)">
                </div>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-folder-plus"></i> Crear Carpeta
                </button>
            </form>
        </div>

        <h3 class="text-white mb-3">Carpetas Existentes</h3>

        <?php if (empty($carpetasExistentes)): ?>
            <div class="alert alert-info">
                No hay carpetas creadas aún. Cree una nueva usando el formulario superior.
            </div>
        <?php else: ?>
            <div class="carpeta-container">
                <?php foreach ($carpetasExistentes as $carpeta): ?>
                    <div class="carpeta" onclick="abrirCarpeta('<?= htmlspecialchars($carpeta) ?>')">
                        <i class="fas fa-folder"></i>
                        <div class="nombre"><?= htmlspecialchars($carpeta) ?></div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>

    <script>
        function abrirCarpeta(nombre) {
            window.location.href = `tabla_pacientes_mes.php?mes=${encodeURIComponent(nombre)}`;
        }
    </script>
</body>

</html>