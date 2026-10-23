<?php
include "include/header_php.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_cita        = isset($_POST['id_cita']) ? intval($_POST['id_cita']) : 0;
    $id_estado_cita = isset($_POST['id_estado_cita']) ? $_POST['id_estado_cita'] : null;
    $nueva_fecha    = isset($_POST['nueva_fecha_cita']) ? trim($_POST['nueva_fecha_cita']) : null;

    if ($id_cita > 0) {
        try {
            $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
            $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            if (!empty($nueva_fecha)) {
                $sql = 'UPDATE public.cita 
                        SET id_estado_cita = (SELECT id_estado FROM public.estado_cita WHERE LOWER("descripción_estado") = \'reprogramada\' LIMIT 1),
                            fecha_de_cita = :nueva_fecha 
                        WHERE id_cita = :id_cita;';
                $stmt = $conexion_bd->prepare($sql);
                $stmt->execute([':nueva_fecha' => $nueva_fecha, ':id_cita' => $id_cita]);
            } else {
                $sql = "UPDATE public.cita SET id_estado_cita = :id_estado WHERE id_cita = :id_cita;";
                $stmt = $conexion_bd->prepare($sql);
                $stmt->execute([':id_estado' => $id_estado_cita, ':id_cita' => $id_cita]);
            }

            // Redirección para limpiar variables adicionales de la URL
            header("Location: obtener_detalles_paciente.php?id=" . $id_cita);
            exit();

        } catch (PDOException $e) {
            die("Error al guardar en la base de datos: " . $e->getMessage());
        }
    }
}