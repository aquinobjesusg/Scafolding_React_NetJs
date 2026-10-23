<?php
session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");
include_once ('funcs/funcs.php');

if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) {
    header("Location: index.php?valor=0");
    exit;
}

$usuario = $_SESSION['id_usuario'];
$nombre = $_SESSION['nom_usuario'];
$correo = $_SESSION['correo_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;

if (!$super_admin && !verificar_permiso_rapido('Almacén', 'almacen_eliminar')) {
    header("Location: acceso_denegado.php");
    exit;
}

try
{

    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  
    
     if (isset($_POST['Eliminar']) && !empty($_POST['Eliminar'])) {
        $id_recurso_eliminar = $_POST['Eliminar'];
        $motivo = $_POST['motivo'] ?? 'Sin motivo especificado';

        // --- INICIO DE LA TRANSACCIÓN ---
        $conexion_bd->beginTransaction();

        try {
            // 1. Obtener datos del ingreso
            $ingresoVerificar = "SELECT * FROM ingreso
                                 WHERE id_ingreso = :id_recurso_eliminar FOR UPDATE";
            $stmtVerificar = $conexion_bd->prepare($ingresoVerificar);
            $stmtVerificar->execute([':id_recurso_eliminar' => $id_recurso_eliminar]);
            $recurso = $stmtVerificar->fetch(PDO::FETCH_ASSOC);

            if (!$recurso) {
                throw new Exception('El recurso con ID ' . $id_recurso_eliminar . ' no existe.');
            }

            $id_articulo = $recurso['id_articulo'];
            $id_almacen = $recurso['id_almacen'];
            $cantidad_ingreso = $recurso['cantidad_ingreso'];

            // 2. Verificar si hay salidas asociadas a este artículo/almacén
            $verificarSalidas = "SELECT SUM(cantidad_salida) as total_salidas FROM salida 
                                WHERE id_articulo = :id_articulo 
                                AND id_almacen = :id_almacen";
            $stmtSalidas = $conexion_bd->prepare($verificarSalidas);
            $stmtSalidas->execute([
                ':id_articulo' => $id_articulo,
                ':id_almacen' => $id_almacen
            ]);
            $salidas = $stmtSalidas->fetch(PDO::FETCH_ASSOC);
            $total_salidas = $salidas['total_salidas'] ?? 0;

            // 3. Verificar stock actual disponible
            $verificarStock = "SELECT cantidad_disponible FROM stock 
                              WHERE id_articulo = :id_articulo 
                              AND id_almacen = :id_almacen";
            $stmtStock = $conexion_bd->prepare($verificarStock);
            $stmtStock->execute([
                ':id_articulo' => $id_articulo,
                ':id_almacen' => $id_almacen
            ]);
            $stock = $stmtStock->fetch(PDO::FETCH_ASSOC);
            $cantidad_disponible = $stock['cantidad_disponible'] ?? 0;

            // 4. VERIFICAR SI SE PUEDE ELIMINAR
            if ($total_salidas > 0) {
                // Hay salidas registradas
                $conexion_bd->rollBack();
                
                // Mensaje más detallado
                $mensaje_error = "NO se puede eliminar este ingreso porque ya se han realizado distribuciones con este stock.\n";
                $mensaje_error .= "• Cantidad ingresada: " . $cantidad_ingreso . "\n";
                $mensaje_error .= "• Total distribuido: " . $total_salidas . "\n";
                $mensaje_error .= "• Stock disponible actual: " . $cantidad_disponible . "\n\n";
                $mensaje_error .= "Para corregir un error en el ingreso, puede crear un ajuste de inventario.";
                
                $_SESSION['mensaje'] = $mensaje_error;
                $_SESSION['tipo_mensaje'] = 'danger';
                
                // Redireccionar inmediatamente
                header("Location: recursoIngreso.php");
                exit();
            }

            // 5. Si NO hay salidas, proceder con la eliminación
            if ($total_salidas == 0) {
                // Revertir el stock (restar del disponible y del total ingresado)
                $stockUpdate = "UPDATE stock 
                               SET cantidad_disponible = cantidad_disponible - :cantidad,
                                   cantidad_ingreso = cantidad_ingreso - :cantidad2
                               WHERE id_articulo = :id_articulo 
                               AND id_almacen = :id_almacen
                               AND cantidad_disponible >= :cantidad3";
                
                $stmtUpdateStock = $conexion_bd->prepare($stockUpdate);
                $stmtUpdateStock->execute([
                    ':cantidad' => $cantidad_ingreso,
                    ':cantidad2' => $cantidad_ingreso,
                    ':cantidad3' => $cantidad_ingreso,
                    ':id_articulo' => $id_articulo,
                    ':id_almacen' => $id_almacen
                ]);

                if ($stmtUpdateStock->rowCount() === 0) {
                    throw new Exception('No se pudo actualizar el stock. Stock insuficiente o registro no encontrado.');
                }

                // Opcional: Eliminar registro de stock si queda en cero
                $stockCleanup = "DELETE FROM stock 
                                WHERE id_articulo = :id_articulo 
                                AND id_almacen = :id_almacen 
                                AND cantidad_disponible <= 0 
                                AND cantidad_ingreso <= 0";
                $stmtCleanup = $conexion_bd->prepare($stockCleanup);
                $stmtCleanup->execute([
                    ':id_articulo' => $id_articulo,
                    ':id_almacen' => $id_almacen
                ]);

                // Eliminar el ingreso
                $ingresoDelete = "DELETE FROM ingreso WHERE id_ingreso = :id";
                $stmtDeleteIngreso = $conexion_bd->prepare($ingresoDelete);
                $stmtDeleteIngreso->execute([':id' => $id_recurso_eliminar]);

                if ($stmtDeleteIngreso->rowCount() === 0) {
                    throw new Exception('No se encontró el ingreso para eliminar.');
                }

                $conexion_bd->commit();
                
                $_SESSION['mensaje'] = 'Recurso eliminado correctamente. Stock actualizado.';
                $_SESSION['tipo_mensaje'] = 'success';
                
                // Redireccionar
                header("Location: recursoIngreso.php");
                exit();
            }

        } catch (Exception $e) {
            if ($conexion_bd->inTransaction()) {
                $conexion_bd->rollBack();
            }
            
            // Guardar el error en sesión
            $_SESSION['mensaje'] = 'Error: ' . $e->getMessage();
            $_SESSION['tipo_mensaje'] = 'danger';
            
            // Redireccionar
            header("Location: recursoIngreso.php");
            exit();
        }
    } else {
        // Si no se envió el formulario correctamente, redirigir
        header("Location: recursoIngreso.php");
        exit();
    }


} catch (PDOException $sqlError) {
 
    if ($conexion_bd->inTransaction()) {
        $conexion_bd->rollBack();
    }
    $_SESSION['mensaje'] = 'Error de base de datos: ' . $sqlError->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
    error_log("Error en eliminar recurso (PDO): " . $sqlError->getMessage());
} catch (Exception $e) {
  
    $_SESSION['mensaje'] = 'Error: ' . $e->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
    error_log("Error en eliminar recurso (Lógica): " . $e->getMessage());
}


header("Location: recursoIngreso.php");
exit();

$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje']);
unset($_SESSION['tipo_mensaje']);

$tbs->MergeBlock('msj', [['mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje]]);
$tbs->Show();
?>