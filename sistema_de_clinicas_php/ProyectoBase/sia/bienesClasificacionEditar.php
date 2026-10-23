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
$super_admin = $_SESSION['super_admin'] ?? false;

// VERIFICACIÓN DE PERMISOS 
if (!$super_admin && !verificar_permiso_rapido('Bienes', 'bienes_estado')) {
    header("Location: acceso_denegado.php");
    exit;
}

$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('bienesClasificacionEditar.html', 'UTF-8');

try {
    // 5. CONEXIÓN A BASE DE DATOS
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id_clasificacionbien_edit = null;
    $clasificacion = [];

  
    if (isset($_POST['Guardarcambios'])) {
        $id_clasificacionbien_edit = $_POST['id_clasificacionbien_actualizar'] ?? null;
        $nomclasificaiconInput = trim($_POST['nom_clasificacionbien'] ?? '');

        if (empty($nomclasificaiconInput) || empty($id_clasificacionbien_edit)) {
            $_SESSION['mensaje'] = "El nombre del clasificacion es obligatorio.";
            $_SESSION['tipo_mensaje'] = 'danger';
        } else {
            $conexion_bd->beginTransaction();

            $nomClasificacionFormato = ucfirst(strtolower($nomclasificaiconInput));

            $estadoUpdate = "UPDATE oticbienes.clasificacionbien 
                             SET nom_clasificacionbien = :nom_clasificacionbien 
                             WHERE id_clasificacionbien = :id_clasificacionbien";
            
            $stmt = $conexion_bd->prepare($estadoUpdate);
            $stmt->execute([
                ':nom_clasificacionbien' => $nomClasificacionFormato,
                ':id_clasificacionbien'  => $id_clasificacionbien_edit
            ]);
            
            $conexion_bd->commit();
            
            $_SESSION['mensaje'] = 'Clasificacion actualizado exitosamente.';
            $_SESSION['tipo_mensaje'] = 'success';
            
            header("Location: bienesClasificacion.php");
            exit();
        }
    } 

    elseif (isset($_POST['Editar']) && !empty($_POST['Editar'])) {
        $id_clasificacionbien_edit = $_POST['Editar'];
    } 
    // CASO C: RESPALDO DE ID (Si algo falla y recarga)
    elseif (isset($_POST['id_clasificacionbien_actualizar'])) {
        $id_clasificacionbien_edit = $_POST['id_clasificacionbien_actualizar'];
    }

    if ($id_clasificacionbien_edit) {
        $clasificacionBienSql = "SELECT id_clasificacionbien, nom_clasificacionbien 
                                    FROM oticbienes.clasificacionbien 
                                    WHERE id_clasificacionbien = :id";

        $clasificacionPE = $conexion_bd->prepare($clasificacionBienSql);
        $clasificacionPE->execute([':id' => $id_clasificacionbien_edit]);
        $clasificacion = $clasificacionPE->fetch(PDO::FETCH_ASSOC);

        if (!$clasificacion) {
            $_SESSION['mensaje'] = 'Error: El clasificacion no existe.';
            $_SESSION['tipo_mensaje'] = 'danger';
            header("Location: bienesClasificacion.php");
            exit();
        }
    } else {
  
        header("Location: bienesClasificacion.php");
        exit();
    }


    $tbs->MergeField('clasificacion', $clasificacion);

} catch (PDOException $e) {
    if (isset($conexion_bd) && $conexion_bd->inTransaction()) {
        $conexion_bd->rollBack(); 
    }
    
 
    if ($e->getCode() === '23505') {
        $_SESSION['mensaje'] = "Error: Ya existe un clasificacion con ese nombre.";
    } else {
        $_SESSION['mensaje'] = "Error de base de datos: " . $e->getMessage();
    }
    
    $_SESSION['tipo_mensaje'] = 'danger';
    header("Location: bienesClasificacion.php");
    exit();
}


$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje'], $_SESSION['tipo_mensaje']);

$tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
$tbs->Show();
?>