<?php
include("include/header_php.php"); // solo para variables de conexión $dbhost, $dbuser, etc.

header('Content-Type: text/html; charset=UTF-8');

$id_especialidad = isset($_GET['id_especialidad']) ? intval($_GET['id_especialidad']) : 0;
$id_medico = isset($_GET['id_medico']) ? intval($_GET['id_medico']) : 0;

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost;port=$dbport;dbname=$dbdatabase;user=$dbuser;password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if( isset($_GET['id_medico']) && $_GET['id_medico'] != '' ) {
        $sql = "SELECT id_medico, nombre_medico, in_labora, fecha_desde_vacaciones, fecha_hasta_vacaciones
            FROM public.medico
            WHERE id_especialidad = :id_esp 
              AND id_medico = :id_med 
              AND in_activo = 1
            ORDER BY nombre_medico";

        $stmt = $conexion_bd->prepare($sql);
        $stmt->execute([':id_esp' => $id_especialidad, ':id_med' => $id_medico]);

    } else {
        $sql = "SELECT me.id_medico, me.nombre_medico, me.in_labora, me.fecha_desde_vacaciones, me.fecha_hasta_vacaciones
            FROM public.medico me
            WHERE me.id_especialidad = :id_esp
              AND me.in_activo = 1 
              AND me.in_labora = 1
              AND me.id_medico IN (
		            SELECT hm.id_medico
						FROM horarios_medicos hm
						WHERE hm.id_especialidad = me.id_especialidad  
              )
            ORDER BY me.nombre_medico;";

        $stmt = $conexion_bd->prepare($sql);
        $stmt->execute([':id_esp' => $id_especialidad]);
    }
    
    $medicos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo '<option value="">Seleccione</option>';
    
    foreach ($medicos as $m) {
        $id = $m['id_medico'];
        $nombre = $m['nombre_medico'];
        $in_labora = $m['in_labora'];
        
        // Recortamos la cadena para asegurar que solo tome la parte de la fecha (primeros 10 caracteres: YYYY-MM-DD) sin horas
        $f_desde = !empty($m['fecha_desde_vacaciones']) ? substr($m['fecha_desde_vacaciones'], 0, 10) : '';
        $f_hasta = !empty($m['fecha_hasta_vacaciones']) ? substr($m['fecha_hasta_vacaciones'], 0, 10) : '';
        
        $etiqueta_estado = '';

        // Condición 1: Si está de vacaciones (muestra las fechas limpias)
        if (!empty($f_desde) && !empty($f_hasta)) {
            $etiqueta_estado = " (Vacaciones: del $f_desde al $f_hasta)";
        } 

        echo '<option value="' . htmlspecialchars($id) . '">'
            . htmlspecialchars($nombre . $etiqueta_estado) . '</option>';
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo '<option value="">Error al cargar médicos</option>';
}
?>