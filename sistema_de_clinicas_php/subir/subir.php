<?php
/*file_uploads = On
upload_max_filesize = 10M
post_max_size = 12M        ; debe ser mayor que upload_max_filesize
upload_tmp_dir = /tmp      ; opcional
max_file_uploads = 20
*/

// index.php
//declare(strict_types=1);

$mensaje = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 1. Verificar que llegó el archivo sin errores
    if (!isset($_FILES['archivo']) || $_FILES['archivo']['error'] !== UPLOAD_ERR_OK) {
        $mensaje = '❌ Error al subir el archivo. Código: ' . ($_FILES['archivo']['error'] ?? 'desconocido');
    } else {
        $archivo = $_FILES['archivo'];

        // 2. Validar tamaño (máx 5 MB)
        $maxBytes = 100 * 1024 * 1024;
        if ($archivo['size'] > $maxBytes) {
            $mensaje = '❌ El archivo supera los 5 MB permitidos.';
        } else {
            // 3. Validar extensión / tipo MIME
            //$permitidos = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'txt', 'docx', 'zip'];
            $permitidos = ['xlsx', 'xls'];
            
            $ext = strtolower(pathinfo($archivo['name'], PATHINFO_EXTENSION));

            if (!in_array($ext, $permitidos, true)) {
                $mensaje = '❌ Extensión no permitida. Solo: ' . implode(', ', $permitidos);
            } else {
                // 4. Carpeta destino
                $carpeta = __DIR__ . '/descarga/';
                if (!is_dir($carpeta)) {
                    mkdir($carpeta, 0755, true);
                }

                // 5. Generar nombre único y seguro (evita sobrescribir y path traversal)
                $nombreSeguro = bin2hex(random_bytes(8)) . '.' . $ext;
                $destino = $carpeta . $nombreSeguro;

                // 6. Mover el archivo temporal
                if (move_uploaded_file($archivo['tmp_name'], $destino)) {
                    $mensaje = '✅ Archivo ' . $archivo['name'] . ' subido correctamente: <strong>' . htmlspecialchars($nombreSeguro) . '</strong>';
                } else {
                    $mensaje = '❌ No se pudo mover el archivo a la carpeta destino.';
                }
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Subir archivo PHP 8.3</title>
</head>
<body>
    <h1>Subir archivo</h1>

    <?php if ($mensaje !== ''): ?>
        <p><?= $mensaje ?></p>
    <?php endif; ?>

    <!-- enctype OBLIGATORIO para subir archivos -->
    <form action="subir.php" method="POST" enctype="multipart/form-data">
        <label for="archivo">Selecciona un archivo:</label>
        <input type="file" name="archivo" id="archivo" required>
        <button type="submit">Subir</button>
    </form>
</body>
</html>