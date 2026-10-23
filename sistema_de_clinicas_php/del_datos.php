<?php
// 1. Activar visualización de errores por si acaso
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 2. Incluimos tu configuración centralizada
include("include/config.php");

// 3. Establecemos la conexión PDO con PostgreSQL
try {
    $conexion_bd = new PDO("pgsql:host=$dbhost;port=$dbport;dbname=$dbdatabase", $dbuser, $dbpasswd);
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die("Error de conexión en get_datos: " . $e->getMessage());
}

if (isset($_POST['tabla'])) {
    $tabla = isset($_POST['tabla']) ? $_POST['tabla'] : '';
    $campoid = isset($_POST['campoid']) ? $_POST['campoid'] : '';
    $id = isset($_POST['id']) ? $_POST['id'] : '';
    $pagina = isset($_POST['pagina']) ? $_POST['pagina'] : '';
} else {
    $tabla = isset($_GET['tabla']) ? $_GET['tabla'] : '';
    $campoid = isset($_GET['campoid']) ? $_GET['campoid'] : '';
    $id = isset($_GET['id']) ? $_GET['id'] : '';
    $pagina = isset($_GET['pagina']) ? $_GET['pagina'] : '';
}

// PASO D: Buscar Coordinaciones por Dirección de Línea
if (isset($tabla) && isset($campoid) && isset($id)) {
    try {
        $conexion_bd->beginTransaction();
        $QUERY = "DELETE FROM " . $tabla . " WHERE " . $campoid . " = :id";
        $stmt = $conexion_bd->prepare($QUERY);
        $q = $stmt->execute([':id' => $id]);
        $conexion_bd->commit();
    } catch (Exception $ex) {
        $conexion_bd->rollBack();
        $error_msj = "No se pudo registrar: " . $ex->getMessage();
        echo "dentro del catch " . $error_msj;
    }

}

header("Location: " . $pagina);
?>