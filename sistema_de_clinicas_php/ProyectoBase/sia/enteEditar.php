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
if (!$super_admin && !verificar_permiso_rapido('Almacén', 'almacen_editar')) {
    header("Location: acceso_denegado.php");
    exit;
}
    $tbs = new clsTinyButStrong;
    $tbs->LoadTemplate('enteEditar.html','UTF-8');
    try
    {
 
    //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        
        $ente= "SELECT * FROM ente ORDER BY id_ente DESC;"; 


         $id_ente_edit = null;

        if (isset($_POST['Editar']) && !empty($_POST['Editar'])) {
            $id_ente_edit = $_POST['Editar'];
        } elseif (isset($_POST['id_ente_actualizar']) && !empty($_POST['id_ente_actualizar'])) {
            $id_ente_edit = $_POST['id_ente_actualizar'];
        } else {
            $_SESSION['mensaje'] = 'Error: El ente a editar no fue encontrado.';
            $_SESSION['tipo_mensaje'] = 'danger';
            header("Location: ente.php");
            exit();
        }

        // Consulta para obtener datos del ente
        $enteSql = "SELECT id_ente, nom_ente, siglas_ente
                    FROM ente
                    WHERE id_ente = :id_ente_edit;"; 

        $entePE = $conexion_bd->prepare($enteSql);
        $entePE->execute([':id_ente_edit' => $id_ente_edit]);
        $ente = $entePE->fetch(PDO::FETCH_ASSOC);

        // Si no se encuentra el ente, redirige
        if (!$ente) {
            $_SESSION['mensaje'] = 'Error: El ente a editar no fue encontrado en la base de datos.';
            $_SESSION['tipo_mensaje'] = 'danger';
            header("Location: ente.php");
            exit();
        }
        
        // Procesar actualización si se envió el formulario
        if (isset($_POST['Guardarcambios'])) {
            $conexion_bd->beginTransaction();
            
            $enteUpdate = "UPDATE ente
                           SET id_usuario = :id_usuario,
                               nom_ente = :nom_ente,
                               siglas_ente = :siglas_ente
                           WHERE id_ente = :id_ente_update"; 
            
            $resultadoEnteUpdate = $conexion_bd->prepare($enteUpdate);
            $resultadoEnteUpdate->execute([
                ':id_usuario'       => $_SESSION['id_usuario'] ?? null,
                ':nom_ente'         => trim($_POST['nom_ente']),
                ':siglas_ente'      => (string)$_POST['siglas_ente'],
                ':id_ente_update'   => $id_ente_edit
            ]);
            
            $conexion_bd->commit();
            
            $_SESSION['mensaje'] = 'Registro actualizado exitosamente.';
            $_SESSION['tipo_mensaje'] = 'success';
            header("Location: ente.php");
            exit();
        }

        // Preparar datos para TBS
        $tbs->MergeField('ente', $ente);

        // Mensajes de sesión
        $mensaje = $_SESSION['mensaje'] ?? null;
        $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
        unset($_SESSION['mensaje']);
        unset($_SESSION['tipo_mensaje']);

        $tbs->MergeBlock('msj', [['mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje]]);
        $tbs->Show();

    } catch (PDOException $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error de base de datos: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en enteEditar.php (PDOException): " . $e->getMessage());
        header("Location: ente.php");
        exit();
    } catch (Exception $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en enteEditar.php (Exception): " . $e->getMessage());
        header("Location: ente.php");
        exit();
    }

    // Preparar datos para TBS
    $tbs->MergeField('ente', $ente);

    // Mensajes de sesión
    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje']);
    unset($_SESSION['tipo_mensaje']);

    $tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
    $tbs->Show();
    

?>