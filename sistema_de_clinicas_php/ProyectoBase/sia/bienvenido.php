<?php
session_start();
include ("include/permisos_helper.php"); 
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php"); 
include_once ('funcs/funcs.php');


if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) {
    // Si no hay sesión, redirige al login
    header("Location: index.php?valor=0");
    exit;
}

$usuario_id = $_SESSION['id_usuario'];
$nombre_usuario = $_SESSION['nom_usuario'];
$correo_usuario = $_SESSION['correo_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;
$permisos_usuario = $_SESSION['permiso'] ?? []; 


$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('bienvenido.html'); 

$mensaje_bienvenida = "Bienvenido al Sistema, **$nombre_usuario**.";
$rol_principal = "Usuario de Sistema";


if ($super_admin) {
    $rol_principal = "Super Administrador (Acceso Total)";
    $contenido_especifico = '<p class="alert alert-info">Tienes acceso completo a todos los módulos y configuraciones del sistema.</p>';
    
} else {
 
    $modulos_activos = array_keys($permisos_usuario);
    
    if (in_array('Almacén', $modulos_activos)) {
        $rol_principal = "Personal de Almacén";
        $contenido_especifico = '
            <div class="row">
                <div class="col-md-6">
                    <h3>Módulo Almacén</h3>
                    <p>Revisa el <a href="almacen_stock.php">Stock Disponible</a> y realiza <a href="salida.php">Distribuciones</a>.</p>
                </div>
            </div>
        ';
    } elseif (in_array('Bienes', $modulos_activos)) {
        $rol_principal = "Administrador de Bienes";
        $contenido_especifico = '
            <div class="row">
                <div class="col-md-6">
                    <h3>Módulo Bienes</h3>
                    <p>Accede al <a href="bienesListado.php">Listado General de Bienes</a> para consultas y gestión.</p>
                </div>
            </div>
        ';
    } else {
        $contenido_especifico = '<p class="alert alert-warning">No se encontraron roles específicos asociados. Usa el menú para navegar.</p>';
    }
}


$datos_dashboard = [
    'nombre' => $nombre_usuario,
    'correo' => $correo_usuario,
    'rol' => $rol_principal,
    'contenido_modulo' => $contenido_especifico,
];


$tbs->Show();
exit;

?>