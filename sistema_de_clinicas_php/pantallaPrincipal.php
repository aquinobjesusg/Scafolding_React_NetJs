<?php
include("include/header_php.php");

// CAPTURAMOS LOS DATOS (Asegúrate de que estas variables existan en la sesión)
//$nombre_usuario = $_SESSION['nombre_usuario'] ?? 'Usuario';
//$rol_usuario    = $_SESSION['id_rol'] ?? 0; 

$conexion_bd = null;
$valor = null;
$mi_menu_html = MostrarMenu($conexion_bd,$valor);
$mi_footer_html = MostrarFooter($conexion_bd,$valor);

// CARGAMOS LA PLANTILLA
// Importante: Verifica que el archivo se llame pantalla.html y esté en la misma carpeta
$tbs->LoadTemplate('pantallaPrincipal.html', 'UTF-8');

$tbs->Show();
?>