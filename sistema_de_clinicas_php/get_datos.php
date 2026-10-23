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

// 4. Recibimos las variables de JavaScript
$tipo = isset($_POST['tipo']) ? $_POST['tipo'] : '';
$id = isset($_POST['id_buscar']) ? $_POST['id_buscar'] : '';


// PASO A: Carga inicial de los Entes
if ($tipo == 'cargar_entes_iniciales') {
    echo '<option value="">Seleccione un Ente</option>';
    
    // CORREGIDO: Usamos id_ente y nom_ente
    $query = $conexion_bd->query("SELECT id_ente, nom_ente FROM ente ORDER BY nom_ente ASC");
    while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
        echo "<option value='" . $row['id_ente'] . "'>" . $row['nombre_ente'] . "</option>";
    }
}

// PASO B: Buscar Direcciones Generales por Ente
if ($tipo == 'general') {
    echo '<option value="">Seleccione una Dirección General</option>';
    
    // CORREGIDO: Usamos id_direccion_general, nom_direccion_general e id_ente como llave foránea
    $stmt = $conexion_bd->prepare("SELECT id_direccion_general, nom_direccion_general FROM direccion_general WHERE id_ente = :id ORDER BY nom_direccion_general ASC");
    $stmt->execute([':id' => $id]);
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<option value='" . $row['id_direccion_general'] . "'>" . $row['nom_direccion_general'] . "</option>";
    }
}

// PASO C: Buscar Direcciones de Línea por Dirección General
if ($tipo == 'linea') {
    echo '<option value="">Seleccione una Dirección de Línea</option>';
    
    // CORREGIDO: Usamos id_direccion_linea, nom_direccion_linea e id_direccion_general como llave foránea
    $stmt = $conexion_bd->prepare("SELECT id_direccion_linea, nom_direccion_linea FROM direccion_linea WHERE id_direccion_general = :id ORDER BY nom_direccion_linea ASC");
    $stmt->execute([':id' => $id]);
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<option value='" . $row['id_direccion_linea'] . "'>" . $row['nom_direccion_linea'] . "</option>";
    }
}

// PASO D: Buscar Coordinaciones por Dirección de Línea
if ($tipo == 'coordinacion') {
    echo '<option value="">Seleccione una Coordinación</option>';
    
    // CORREGIDO: Usamos id_coordinacion, nom_coordinacion e id_direccion_linea como llave foránea
    $stmt = $conexion_bd->prepare("SELECT id_coordinacion, nom_coordinacion FROM coordinacion WHERE id_direccion_linea = :id ORDER BY nom_coordinacion ASC");
    $stmt->execute([':id' => $id]);
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<option value='" . $row['id_coordinacion'] . "'>" . $row['nom_coordinacion'] . "</option>";
    }
}
?>