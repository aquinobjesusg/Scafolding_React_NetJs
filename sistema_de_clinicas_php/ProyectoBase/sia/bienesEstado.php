<?php
session_start();
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/permisos_helper.php");


$super_admin = $_SESSION['super_admin'] ?? false;


if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) {
    header("Location: index.php?valor=0");
    exit;
}


if (!$super_admin && !verificar_permiso_rapido('Bienes', 'bienes_estado')) {
    header("Location: acceso_denegado.php");
    exit;
}


include ("include/portada.php");

$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('bienesEstado.html','UTF-8');

try {
    // Conexión
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Lógica de Registro
    if(isset($_POST['Registrar'])) {        
        $nomEstadoInput = trim($_POST['nom_estado'] ?? '');
        $nomEstado = null;

        if (!empty($nomEstadoInput)) {
            $nomEstadoFormato = ucfirst(strtolower($nomEstadoInput));
            $nomEstado = htmlspecialchars($nomEstadoFormato);
        }
        
        $estadoSql = "INSERT INTO oticbienes.estado (nom_estado) VALUES (:nom_estado)";
        $estadoPE = $conexion_bd->prepare($estadoSql);
        $estadoPE->execute([':nom_estado' => $nomEstado]);

        $_SESSION['mensaje'] = 'Estado registrado exitosamente.';
        $_SESSION['tipo_mensaje'] = 'success';
        header("Location: bienes.php"); 
        exit();
    }

    // LISTADO
    include ("bienesEstadoListado.php"); 

} catch (PDOException $sqlError) {
    // Manejo de errores SQL
    if ($sqlError->getCode() === '23502') {
        $_SESSION['mensaje'] = 'Es obligatorio llenar el campo Nuevo Estado.';
    } elseif ($sqlError->getCode() === '23505') {
        $_SESSION['mensaje'] = '¡El Estado ya existe! Ingrese uno diferente.';
    } else {
        $_SESSION['mensaje'] = 'Error: ' . $sqlError->getMessage();
    }

    $_SESSION['tipo_mensaje'] = 'danger';
    // Nota: Asegúrate de que este archivo se llame bienesEstado.php para evitar bucles
    header("Location: bienesEstado.php"); 
    exit();

} finally {
    
}

// 6. Preparación final para TBS
$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje'], $_SESSION['tipo_mensaje']);

$tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
$tbs->Show();
?>