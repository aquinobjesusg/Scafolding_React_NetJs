<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
include ("include/permisos_helper.php");
include ("include/config.php");
include_once ('funcs/funcs.php');

if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) {
    header("Location: index.php?valor=0");
    exit;
}

$usuario = $_SESSION['id_usuario'];
$nombre = $_SESSION['nom_usuario'];
$correo = $_SESSION['correo_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;

// VERIFICACIÓN DE PERMISOS
if (!$super_admin && !verificar_permiso_rapido('Almacén', 'almacen_salida')) {
    header("Location: acceso_denegado.php");
    exit;
}

try {
    // Conexión a la base de datos PostgreSQL usando PDO
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    if (isset($_POST['Eliminar']) && !empty($_POST['Eliminar'])) {
        $ordenSalidaEliminar = $_POST['Eliminar'];

        // --- INICIO DE LA TRANSACCIÓN ---
        $conexion_bd->beginTransaction();

        try {
            // 1. Obtener todos los artículos de la salida
            $obtenerSalida = "SELECT id_articulo, cantidad_salida, id_almacen 
                              FROM salida 
                              WHERE orden_salida = :orden_salida
                              FOR UPDATE";
            
            $stmt_salida = $conexion_bd->prepare($obtenerSalida);
            $stmt_salida->bindParam(':orden_salida', $ordenSalidaEliminar, PDO::PARAM_STR);
            $stmt_salida->execute();
            $lineasSalida = $stmt_salida->fetchAll(PDO::FETCH_ASSOC);

            if (empty($lineasSalida)) {
                throw new Exception('La salida con orden ' . $ordenSalidaEliminar . ' no existe.');
            }

            // 2. Actualizar el stock para cada artículo
            $query_stock = "UPDATE stock 
                           SET cantidad_disponible = cantidad_disponible + :cantidad_salida
                           WHERE id_articulo = :id_articulo 
                           AND id_almacen = :id_almacen";
            
            $stmt_stock = $conexion_bd->prepare($query_stock);

            foreach ($lineasSalida as $linea) {
                $id_articulo = $linea['id_articulo'];
                $cantidad_salida = $linea['cantidad_salida'];
                $id_almacen = $linea['id_almacen'];

                // Actualizar stock devolviendo la cantidad
                $stmt_stock->bindParam(':cantidad_salida', $cantidad_salida, PDO::PARAM_INT);
                $stmt_stock->bindParam(':id_articulo', $id_articulo, PDO::PARAM_INT);
                $stmt_stock->bindParam(':id_almacen', $id_almacen, PDO::PARAM_INT);
                $stmt_stock->execute();

                // Verificar si se actualizó correctamente
                if ($stmt_stock->rowCount() === 0) {
                    // Podría no existir el registro de stock (aunque debería)
                    // Podrías considerar crear el registro si no existe, o simplemente loggear
                    error_log("Advertencia: No se encontró stock para artículo $id_articulo en almacén $id_almacen");
                }
            }

            // 3. Eliminar todas las líneas de la salida
            $query_delete = "DELETE FROM salida 
                             WHERE orden_salida = :orden_salida";
            
            $stmt_delete = $conexion_bd->prepare($query_delete);
            $stmt_delete->bindParam(':orden_salida', $ordenSalidaEliminar, PDO::PARAM_STR);
            $stmt_delete->execute();

            // Verificar que se eliminó algo
            if ($stmt_delete->rowCount() === 0) {
                throw new Exception('No se encontraron registros para eliminar.');
            }

            $conexion_bd->commit();

            $_SESSION['mensaje'] = 'Salida eliminada correctamente. Stock actualizado.';
            $_SESSION['tipo_mensaje'] = 'success';

        } catch (Exception $e) {
            $conexion_bd->rollBack();
            $_SESSION['mensaje'] = 'Error al eliminar: ' . $e->getMessage();
            $_SESSION['tipo_mensaje'] = 'danger';
            error_log("Error en recursoSalidaEliminar.php: " . $e->getMessage());
        }
    } else {
        $_SESSION['mensaje'] = 'No se especificó salida a eliminar.';
        $_SESSION['tipo_mensaje'] = 'warning';
    }

} catch (PDOException $e) {
    $_SESSION['mensaje'] = 'Error de conexión a la base de datos: ' . $e->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
    error_log("Error PDO en recursoSalidaEliminar.php: " . $e->getMessage());
}

// Redirigir de vuelta a la página principal
header("Location: recursoSalida.php");
exit();