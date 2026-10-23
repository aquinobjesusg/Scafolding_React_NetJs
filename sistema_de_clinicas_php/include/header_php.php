<?php
// 1. Configuración y control de sesión
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

error_reporting(E_ALL & ~E_WARNING);
ini_set('display_errors', 0);

// 2. Páginas públicas que no requieren estar logueado
$paginas_publicas = ['index.php', 'login.php', 'login.html'];
$pagina_actual = basename($_SERVER['PHP_SELF']);

// 3. Capa de seguridad: verificar sesión solo en páginas privadas
if (!in_array($pagina_actual, $paginas_publicas)) {
    if (!isset($_SESSION['id_usuario'])) {
        header("Location: index.php");
        exit;
    }
}

// 4. Capturar datos globales del usuario autenticado
$nombre_usuario = $_SESSION['nombre_usuario'] ?? 'Usuario';
$rol_usuario = $_SESSION['id_rol'] ?? 0;
$id_usuario = $_SESSION['id_usuario'] ?? 0;

// 5. Carga de dependencias y librerías del sistema
include 'tbs_class.php';
include 'config.php';
include 'funciones.php';
include 'utilidades.php';
include 'funcionesDB.php';
include 'funcionesMenu.php';
include 'funcionesPantalla.php';
include 'funcionesPDF.php';
include 'funcionesExcel.php';



// 6. Instancia global de TinyButStrong
$tbs = new clsTinyButStrong;
?>