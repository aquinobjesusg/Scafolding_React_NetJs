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
$tbs->LoadTemplate('bienesEstadoEditar.html', 'UTF-8');

try {
    // 5. CONEXIÓN A BASE DE DATOS
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id_estado_edit = null;
    $estado = [];

  
    if (isset($_POST['Guardarcambios'])) {
        $id_estado_edit = $_POST['id_estado_actualizar'] ?? null;
        $nomEstadoInput = trim($_POST['nom_estado'] ?? '');

        if (empty($nomEstadoInput) || empty($id_estado_edit)) {
            $_SESSION['mensaje'] = "El nombre del estado es obligatorio.";
            $_SESSION['tipo_mensaje'] = 'danger';
        } else {
            $conexion_bd->beginTransaction();

            $nomEstadoFormato = ucfirst(strtolower($nomEstadoInput));

            $estadoUpdate = "UPDATE oticbienes.estado 
                             SET nom_estado = :nom_estado 
                             WHERE id_estado = :id_estado";
            
            $stmt = $conexion_bd->prepare($estadoUpdate);
            $stmt->execute([
                ':nom_estado' => $nomEstadoFormato,
                ':id_estado'  => $id_estado_edit
            ]);
            
            $conexion_bd->commit();
            
            $_SESSION['mensaje'] = 'Estado actualizado exitosamente.';
            $_SESSION['tipo_mensaje'] = 'success';
            
            header("Location: bienesEstado.php");
            exit();
        }
    } 

    elseif (isset($_POST['Editar']) && !empty($_POST['Editar'])) {
        $id_estado_edit = $_POST['Editar'];
    } 
    // CASO C: RESPALDO DE ID (Si algo falla y recarga)
    elseif (isset($_POST['id_estado_actualizar'])) {
        $id_estado_edit = $_POST['id_estado_actualizar'];
    }

    if ($id_estado_edit) {
        $estadoSql = "SELECT id_estado, nom_estado FROM oticbienes.estado WHERE id_estado = :id";
        $estadoPE = $conexion_bd->prepare($estadoSql);
        $estadoPE->execute([':id' => $id_estado_edit]);
        $estado = $estadoPE->fetch(PDO::FETCH_ASSOC);

        if (!$estado) {
            $_SESSION['mensaje'] = 'Error: El estado no existe.';
            $_SESSION['tipo_mensaje'] = 'danger';
            header("Location: bienesEstado.php");
            exit();
        }
    } else {
  
        header("Location: bienesEstado.php");
        exit();
    }


    $tbs->MergeField('estado', $estado);

} catch (PDOException $e) {
    if (isset($conexion_bd) && $conexion_bd->inTransaction()) {
        $conexion_bd->rollBack(); 
    }
    
 
    if ($e->getCode() === '23505') {
        $_SESSION['mensaje'] = "Error: Ya existe un estado con ese nombre.";
    } else {
        $_SESSION['mensaje'] = "Error de base de datos: " . $e->getMessage();
    }
    
    $_SESSION['tipo_mensaje'] = 'danger';
    header("Location: bienesEstado.php");
    exit();
}


$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje'], $_SESSION['tipo_mensaje']);

$tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
$tbs->Show();
?>