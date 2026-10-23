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
            $codigoDistribucionEliminar = $_POST['Eliminar'];

            // --- INICIO DE LA TRANSACCIÓN ---
            $conexion_bd->beginTransaction();

            try {
                // 1. Obtener datos de la distribución
                $query_distribucion = "SELECT id_consumibles, cantidad_distribuidad 
                                      FROM oticbienes.distribucion 
                                      WHERE codigo_distribucion = :codigo_distribucion
                                      FOR UPDATE";
                
                $stmt_distribucion = $conexion_bd->prepare($query_distribucion);
                $stmt_distribucion->bindParam(':codigo_distribucion', $codigoDistribucionEliminar, PDO::PARAM_STR);
                $stmt_distribucion->execute();
                $distribucion = $stmt_distribucion->fetch(PDO::FETCH_ASSOC);

                if (!$distribucion) {
                    throw new Exception('La distribución no existe.');
                }

                $idConsumibles = $distribucion['id_consumibles'];
                $cantidad = $distribucion['cantidad_distribuidad'];

                // 2. Actualizar el stock
                $query_stock = "UPDATE oticbienes.stockc 
                               SET cantidad_disponible = cantidad_disponible + :cantidad,
                                   cantidad_distribuida = cantidad_distribuida - :cantidad
                               WHERE id_consumibles = :id_consumibles";
                
                $stmt_stock = $conexion_bd->prepare($query_stock);
                $stmt_stock->bindParam(':cantidad', $cantidad, PDO::PARAM_INT);
                $stmt_stock->bindParam(':id_consumibles', $idConsumibles, PDO::PARAM_INT);
                $stmt_stock->execute();

                // 3. Eliminar la distribución
                $query_delete = "DELETE FROM oticbienes.distribucion 
                                 WHERE codigo_distribucion = :codigo_distribucion";
                
                $stmt_delete = $conexion_bd->prepare($query_delete);
                $stmt_delete->bindParam(':codigo_distribucion', $codigoDistribucionEliminar, PDO::PARAM_STR);
                $stmt_delete->execute();

                $conexion_bd->commit();

                $_SESSION['mensaje'] = 'Distribución eliminada y stock actualizado correctamente.';
                $_SESSION['tipo_mensaje'] = 'success';

            } catch (Exception $e) {
                $conexion_bd->rollBack();
                $_SESSION['mensaje'] = 'Error: ' . $e->getMessage();
                $_SESSION['tipo_mensaje'] = 'danger';
            }
        } else {
            $_SESSION['mensaje'] = 'No se especificó distribución a eliminar.';
            $_SESSION['tipo_mensaje'] = 'warning';
        }

    } catch (PDOException $e) {
        $_SESSION['mensaje'] = 'Error de conexión: ' . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
    }

    header("Location: consumiblesSalida.php");
    exit();

?>