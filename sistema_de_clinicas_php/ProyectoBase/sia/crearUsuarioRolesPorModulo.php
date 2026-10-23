<?php
include ("include/config.php");
header('Content-Type: application/json');// 1. Establecer el encabezado para indicar que la respuesta es JSON

// 2. Verificar que se haya recibido el ID del módulo
if (!isset($_POST['id_modulo']) || !is_numeric($_POST['id_modulo'])) {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'error' => 'ID de módulo inválido o no proporcionado.']);
    exit;
}

$id_modulo = (int)$_POST['id_modulo'];
$roles = [];


try {
    // Conexión a la base de datos PostgreSQL
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

   $sql_roles = "
        SELECT 
            r.id_rol, 
            r.nom_rol 
        FROM 
            rol r
        INNER JOIN 
            modulo_rol mr ON r.id_rol = mr.id_rol 
        WHERE 
            mr.id_modulo = :id_modulo
        ORDER BY 
            r.nom_rol;
    ";
    
    $stmt_roles = $conexion_bd->prepare($sql_roles);
    $stmt_roles->bindParam(':id_modulo', $id_modulo, PDO::PARAM_INT);
    $stmt_roles->execute();
    
    $roles = $stmt_roles->fetchAll(PDO::FETCH_ASSOC);


    // 4. Devolver los resultados en formato JSON
    echo json_encode(['success' => true, 'roles' => $roles]);

} catch (PDOException $e) {
    // Manejo de errores de base de datos
    http_response_code(500); // Internal Server Error
    error_log("Error al obtener roles (PDOException): " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Error interno del servidor al consultar la base de datos.']);

} catch (Exception $e) {
    // Captura otros errores inesperados
    http_response_code(500);
    error_log("Error inesperado: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Error inesperado.']);
}

exit;