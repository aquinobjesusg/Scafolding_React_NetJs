<?php
// Incluir tu conexión o archivo de cabecera necesario
include "include/header_php.php"; // Ajusta según tu estructura

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id_medico = $_POST['id_medico'] ?? null;
    $motivo = $_POST['motivo_inactivacion'] ?? null;
    $fecha_desde = $_POST['fecha_desde_vacaciones'] ?? null;
    $fecha_hasta = $_POST['fecha_hasta_vacaciones'] ?? null;

    if ($id_medico && $motivo) {
        if ($motivo == 'vacaciones') {
            // Sigue activo en los desplegables, guardando las fechas de vacaciones
            $sql = "UPDATE medico SET in_activo = 1, fecha_desde_vacaciones = :desde, fecha_hasta_vacaciones = :hasta WHERE id_medico = :id";
            $stmt = $conexion_bd->prepare($sql);
            $stmt->execute([':desde' => $fecha_desde, ':hasta' => $fecha_hasta, ':id' => $id_medico]);

        } elseif ($motivo == 'ausente') {
            // Sigue activo en los desplegables pero justificado
            $sql = "UPDATE medico SET in_activo = 1, fecha_desde_vacaciones = NULL, fecha_hasta_vacaciones = NULL WHERE id_medico = :id";
            $stmt = $conexion_bd->prepare($sql);
            $stmt->execute([':id' => $id_medico]);

        } elseif ($motivo == 'retirado') {
            // NO se muestra en ningún desplegable al cambiar in_activo a 0
            $sql = "UPDATE medico SET in_activo = 0, fecha_desde_vacaciones = NULL, fecha_hasta_vacaciones = NULL WHERE id_medico = :id";
            $stmt = $conexion_bd->prepare($sql);
            $stmt->execute([':id' => $id_medico]);
        }
    }

    // Redireccionar de vuelta a la configuración de médicos
    header("Location: configuracionMedicos.php");
    exit();

} catch (PDOException $e) {
    die("Error al procesar: " . $e->getMessage());
}
?>