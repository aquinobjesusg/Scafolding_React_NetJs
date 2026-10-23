<?php
session_start();
include ("include/config.php");

// Para debugging - permite ver errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) {
    echo json_encode(['error' => 'No autorizado']);
    exit;
}

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (isset($_GET['id_almacen']) && !empty($_GET['id_almacen'])) {
        $id_almacen = $_GET['id_almacen'];
        
        // Consulta para obtener los artículos disponibles en el almacén seleccionado
        $query = "SELECT DISTINCT a.id_articulo, a.nom_articulo 
                  FROM articulo a 
                  INNER JOIN stock s ON a.id_articulo = s.id_articulo 
                  WHERE s.id_almacen = :id_almacen 
                  AND s.cantidad_disponible > 0 
                  ORDER BY a.nom_articulo";
        
        $stmt = $conexion_bd->prepare($query);
        $stmt->bindParam(':id_almacen', $id_almacen, PDO::PARAM_INT);
        $stmt->execute();
        
        $articulos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'articulos' => $articulos,
            'total' => count($articulos)
        ]);
        
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'No se recibió id_almacen'
        ]);
    }
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Error de base de datos: ' . $e->getMessage()
    ]);
}
?>