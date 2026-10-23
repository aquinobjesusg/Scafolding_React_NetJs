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
if (!$super_admin && !verificar_permiso_rapido('Bienes', 'bienes_concepto')) {
    header("Location: acceso_denegado.php");
    exit;
}

$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('bienesConceptoEditar.html', 'UTF-8');

try {
  
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id_concepto_edit = null;
    $concepto = [];

  
    if (isset($_POST['Guardarcambios'])) {
        $id_concepto_edit = $_POST['id_concepto_actualizar'] ?? null;
        $nomConceptoInput = trim($_POST['nom_concepto'] ?? '');

        if (empty($nomConceptoInput) || empty($id_concepto_edit)) {
            $_SESSION['mensaje'] = "El nombre del concepto es obligatorio.";
            $_SESSION['tipo_mensaje'] = 'danger';
        } else {
            $conexion_bd->beginTransaction();

            $nomConceptoFormato = ucfirst(strtolower($nomConceptoInput));

            $conceptoUpdate = "UPDATE oticbienes.concepto 
                             SET nom_concepto = :nom_concepto 
                             WHERE id_concepto = :id_concepto";
            
            $stmt = $conexion_bd->prepare($conceptoUpdate);
            $stmt->execute([
                ':nom_concepto' => $nomConceptoFormato,
                ':id_concepto'  => $id_concepto_edit
            ]);
            
            $conexion_bd->commit();
            
            $_SESSION['mensaje'] = 'Concepto actualizado exitosamente.';
            $_SESSION['tipo_mensaje'] = 'success';
            
            header("Location: bienesConcepto.php");
            exit();
        }
    } 

    elseif (isset($_POST['Editar']) && !empty($_POST['Editar'])) {
        $id_concepto_edit = $_POST['Editar'];
    } 
 
    elseif (isset($_POST['id_concepto_actualizar'])) {
        $id_concepto_edit = $_POST['id_concepto_actualizar'];
    }

    if ($id_concepto_edit) {
        $conceptoSql = "SELECT id_concepto, nom_concepto 
                        FROM oticbienes.concepto 
                        WHERE id_concepto = :id";

        $conceptoPE = $conexion_bd->prepare($conceptoSql);
        $conceptoPE->execute([':id' => $id_concepto_edit]);
        $concepto = $conceptoPE->fetch(PDO::FETCH_ASSOC);

        if (!$concepto) {
            $_SESSION['mensaje'] = 'Error: El concepto no existe.';
            $_SESSION['tipo_mensaje'] = 'danger';
            header("Location: bienesConcepto.php");
            exit();
        }
    } else {
  
        header("Location: bienesConcepto.php");
        exit();
    }


    $tbs->MergeField('concepto', $concepto);

} catch (PDOException $e) {
    if (isset($conexion_bd) && $conexion_bd->inTransaction()) {
        $conexion_bd->rollBack(); 
    }
    
 
    if ($e->getCode() === '23505') {
        $_SESSION['mensaje'] = "Error: Ya existe un concepto con ese nombre.";
    } else {
        $_SESSION['mensaje'] = "Error de base de datos: " . $e->getMessage();
    }
    
    $_SESSION['tipo_mensaje'] = 'danger';
    header("Location: bienesConcepto.php");
    exit();
}


$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje'], $_SESSION['tipo_mensaje']);

$tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
$tbs->Show();
?>