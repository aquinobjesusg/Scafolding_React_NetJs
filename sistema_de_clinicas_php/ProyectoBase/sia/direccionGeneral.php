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
if (!$super_admin && !verificar_permiso_rapido('Almacén', 'almacen_crud_config')) {
    header("Location: acceso_denegado.php");
    exit;
}
    $tbs = new clsTinyButStrong;
    $tbs->LoadTemplate('direccionGeneral.html','UTF-8');
    try
    {
    //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $direccion_general= "SELECT * FROM direccion_general ORDER BY nom_direccion_general;";
        $ente= "SELECT * FROM ente ORDER BY id_ente DESC;"; 

        if(isset($_POST['Registrar']))
        {
            // --- INICIO DE LA TRANSACCIÓN ---
            $conexion_bd->beginTransaction();

            if (empty(($_POST['nom_direccion_general'])) ||
                empty($_POST['ubicacion_direccion_general']) ||
                empty($_POST['id_ente'])) {

            
                $conexion_bd->rollBack();

                $_SESSION['mensaje'] = "Todos los campos son obligatorios.";
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: direccion_general.php");
                exit(); 
            }

            $camposdireccion_general = "id_usuario, nom_direccion_general, ubicacion_direccion_general, id_ente";
            $direccion_generalInsert = "INSERT INTO direccion_general ($camposdireccion_general)
                                          VALUES (:id_usuario, :nom_direccion_general, :ubicacion_direccion_general, :id_ente)";
            $resultadodireccion_generalInsert = $conexion_bd->prepare($direccion_generalInsert);
            $resultadodireccion_generalInsert->execute([
                    ':id_usuario' => $usuario,
                    ':nom_direccion_general' => $_POST['nom_direccion_general'],
                    ':ubicacion_direccion_general' => $_POST['ubicacion_direccion_general'],
                     ':id_ente' => $_POST['id_ente']
            ]);

            $conexion_bd->commit(); 
                
            // --- FIN DE LA TRANSACCIÓN ---

            $_SESSION['mensaje'] = 'Almacen registrado exitosamente.';
            $_SESSION['tipo_mensaje'] = 'success';
            header("Location: direccion_general.php"); 
            exit();
        }
          // MOSTRAR EL  LISTADO 
      
      
        include ("direccion_generalListado.php"); 

     } catch (PDOException $e) {
        // Si ocurre un error de base de datos, revertimos la transacción.
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack(); 
        }
        $_SESSION['mensaje'] = "Error de base de datos al registrar/actualizar direccion_general: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en direccion_general.php (PDOException): " . $e->getMessage());

    } catch (Exception $e) {
      
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado al registrar/actualizar direccion_general: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en direccion_general.php (Exception): " . $e->getMessage()); // Para depuración
    }

    
    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje']); 
    unset($_SESSION['tipo_mensaje']); 


    $tbs->MergeBlock('ente', $conexion_bd, $ente ?? null);
    $tbs->MergeBlock('direccion_general', $conexion_bd, $direccion_general ?? null); 
    $tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
    $tbs->Show();
    exit;
    



?>