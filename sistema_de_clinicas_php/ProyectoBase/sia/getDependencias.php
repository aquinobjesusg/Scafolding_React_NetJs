<?php
include ("include/config.php");

header('Content-Type: application/json');

$tipo = $_GET['tipo'] ?? '';
$id = intval($_GET['id'] ?? 0);

if ($id === 0 || empty($tipo)) {
    echo json_encode([]);
    exit;
}

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $resultados = [];
    $sql = "";

    switch ($tipo) {
        case 'general':
            // Al seleccionar ENTE, buscamos Direcciones Generales
            $sql = "SELECT id_direccion_general AS id, nom_direccion_general AS nombre 
                    FROM public.direccion_general 
                    WHERE id_ente = :id 
                    ORDER BY nom_direccion_general ASC";
            break;

        case 'linea':
            // Al seleccionar Dirección General, buscamos Direcciones de Línea
            $sql = "SELECT id_direccion_linea AS id, nom_direccion_linea AS nombre 
                    FROM public.direccion_linea 
                    WHERE id_direccion_general = :id 
                    ORDER BY nom_direccion_linea ASC";
            break;

        case 'coordinacion':
            // Al seleccionar Dirección de Línea, buscamos Coordinaciones
            $sql = "SELECT id_coordinacion AS id, nom_coordinacion AS nombre 
                    FROM public.coordinacion 
                    WHERE id_direccion_linea = :id 
                    ORDER BY nom_coordinacion ASC";
            break;

        case 'funcionario':
            // Al seleccionar Coordinación, buscamos Funcionarios
            $sql = "SELECT id_funcionario AS id, (nom_funcionario || ' ' || ape_funcionario) AS nombre 
                    FROM public.funcionario 
                    WHERE id_coordinacion = :id 
                    ORDER BY nom_funcionario ASC";
            break;

        default:
            echo json_encode([]);
            exit;
    }

    $stmt = $conexion_bd->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($resultados);

} catch (PDOException $e) {
    // En producción, podrías loguear esto en lugar de mostrarlo
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    
}