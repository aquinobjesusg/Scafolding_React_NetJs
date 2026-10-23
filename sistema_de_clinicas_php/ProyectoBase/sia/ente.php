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
    $tbs->LoadTemplate('ente.html','UTF-8');
    try
    {
    //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        
        $ente= "SELECT * FROM ente ORDER BY id_ente DESC;";

        if(isset($_POST['Registrar']))
        {
            // --- INICIO DE LA TRANSACCIÓN ---
            $conexion_bd->beginTransaction();

    

            $camposEnte = "id_usuario, nom_ente, siglas_ente";
            $enteInsert = "INSERT INTO ente ($camposEnte)
                                      VALUES (:id_usuario, :nom_ente, :siglas_ente)";
            $resultadoEnteInsert = $conexion_bd->prepare($enteInsert);
            $resultadoEnteInsert->execute([
                    ':id_usuario' => $usuario,
                    ':nom_ente' => $_POST['nom_ente'],
                    ':siglas_ente' => $_POST['siglas_ente']
            ]);

            $conexion_bd->commit(); 
            
            // --- FIN DE LA TRANSACCIÓN ---

            $_SESSION['mensaje'] = 'Almacen registrado exitosamente.';
            $_SESSION['tipo_mensaje'] = 'success';
            header("Location: ente.php"); // Redirige a la página de consumibles para ver el listado actualizado.
            exit();
        }

        // MOSTRAR EL  LISTADO 
      
      
        include ("enteListado.php"); 

     } catch (PDOException $e) {
        // Si ocurre un error de base de datos, revertimos la transacción.
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack(); 
        }
        $_SESSION['mensaje'] = "Error de base de datos al registrar/actualizar almacén: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en ente.php (PDOException): " . $e->getMessage());

    } catch (Exception $e) {
        // Captura cualquier otra excepción que no sea de PDO (ej. `throw new Exception`).
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado al registrar/actualizar almacén: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en ente.php (Exception): " . $e->getMessage()); // Para depuración
    }

    // --- RECUPERAR Y LIMPIAR MENSAJES DE SESIÓN PARA MOSTRAR EN EL FRONT-END ---
    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje']); // Limpiar el mensaje después de usarlo
    unset($_SESSION['tipo_mensaje']); // Limpiar el tipo de mensaje después de usarlo


    $tbs->MergeBlock('ente', $conexion_bd, $ente ?? null);
    $tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
    $tbs->Show();
    exit;
    

?>