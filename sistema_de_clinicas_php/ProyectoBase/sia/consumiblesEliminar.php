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

// VERIFICACIÓN DE PERMISOS
if (!$super_admin && !verificar_permiso_rapido('OTIC', 'consumible_eliminar')) {
    header("Location: acceso_denegado.php");
    exit;
}

    try
    {
        //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

          if (isset($_POST['Eliminar']) && !empty($_POST['Eliminar'])) {
            $id_consumibles_eliminar = $_POST['Eliminar'];
            
            // --- INICIO DE LA TRANSACCIÓN ---
            $conexion_bd->beginTransaction();

            try {
                // 1. Verificar si existe el consumible y obtener datos relevantes
                $query_verificar = "SELECT id_consumibles, cantidad_ingresadac FROM oticbienes.consumibles 
                                   WHERE id_consumibles = :id_consumibles FOR UPDATE";
                $stmt_verificar = $conexion_bd->prepare($query_verificar);
                $stmt_verificar->execute([':id_consumibles' => $id_consumibles_eliminar]);
                $consumible = $stmt_verificar->fetch(PDO::FETCH_ASSOC);

                if (!$consumible) {
                    throw new Exception('El consumible con ID ' . $id_consumibles_eliminar . ' no existe.');
                }

                // 2. Verificar el stock actual
                $query_stock = "SELECT cantidad_disponible FROM oticbienes.stockc 
                               WHERE id_consumibles = :id_consumibles FOR UPDATE";
                $stmt_stock = $conexion_bd->prepare($query_stock);
                $stmt_stock->execute([':id_consumibles' => $id_consumibles_eliminar]);
                $stock = $stmt_stock->fetch(PDO::FETCH_ASSOC);

                if ($stock && $stock['cantidad_disponible'] > 0) {
                    throw new Exception('No se puede eliminar el consumible porque aún tiene stock disponible.');
                }

                // 3. Eliminar registros relacionados primero (si existen)
               
                $query_delete_stock = "DELETE FROM oticbienes.stockc 
                                      WHERE id_consumibles = :id_consumibles";
                $stmt_delete_stock = $conexion_bd->prepare($query_delete_stock);
                $stmt_delete_stock->execute([':id_consumibles' => $id_consumibles_eliminar]);

                // 4. Eliminar el consumible
                $query_delete_consumible = "DELETE FROM oticbienes.consumibles 
                                          WHERE id_consumibles = :id_consumibles";
                $stmt_delete_consumible = $conexion_bd->prepare($query_delete_consumible);
                $stmt_delete_consumible->execute([':id_consumibles' => $id_consumibles_eliminar]);

                if ($stmt_delete_consumible->rowCount() === 0) {
                    throw new Exception('No se encontró el consumible para eliminar.');
                }

                $conexion_bd->commit();
                // --- FIN DE LA TRANSACCIÓN ---

                $_SESSION['mensaje'] = 'Registro eliminado exitosamente.';
                $_SESSION['tipo_mensaje'] = 'success';

            } catch (Exception $e) {
                $conexion_bd->rollBack();
                throw $e;
            }

        } else {
            $_SESSION['mensaje'] = 'Error: El bien a eliminar no fue especificado.';
            $_SESSION['tipo_mensaje'] = 'danger';
        }

    } catch (PDOException $sqlError) {
        $_SESSION['mensaje'] = 'Error de base de datos: ' . $sqlError->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en eliminar consumible: " . $sqlError->getMessage());
    } catch (Exception $e) {
        $_SESSION['mensaje'] = 'Error: ' . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en eliminar consumible: " . $e->getMessage());
    }

    header("Location: consumibles.php");
    exit();

    // Si necesitas mostrar algo con TBS antes de redirigir (aunque normalmente no sería necesario)
    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje']);
    unset($_SESSION['tipo_mensaje']);

    $tbs->MergeBlock('msj', [['mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje]]);
    $tbs->Show();

?>