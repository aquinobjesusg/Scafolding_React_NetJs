<?php
include("include/header_php.php"); // solo para variables de conexión $dbhost, $dbuser, etc.

header('Content-Type: text/html; charset=UTF-8');

$id_especialidad = isset($_GET['id_especialidad']) ? intval($_GET['id_especialidad']) : 0;
$id_medico = isset($_GET['id_medico']) ? intval($_GET['id_medico']) : 0;


try {
    $conexion_bd = new PDO("pgsql:host=$dbhost;port=$dbport;dbname=$dbdatabase;user=$dbuser;password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if( isset($_GET['id_medico']) ) {
        $sql = "SELECT id_medico, nombre_medico
            FROM public.medico
            WHERE id_especialidad = :id_esp and id_medico = :id_med
            ORDER BY nombre_medico";

            $stmt = $conexion_bd->prepare($sql);
            $stmt->execute( [':id_esp' => $id_especialidad , ':id_med' => $id_medico ]);

    } else {
      /*  $sql = "SELECT id_medico, nombre_medico
            FROM public.medico
            WHERE id_especialidad = :id_esp
            ORDER BY nombre_medico";
*/
 $sql = "select  me.id_medico , me.nombre_medico
            FROM public.medico me
            WHERE me.id_especialidad = :id_esp and me.id_medico not in (select  hm.id_medico from public.horarios_medicos hm where hm.id_especialidad = :id_esp and hm.in_activo = 1)
            and me.in_labora = 1
            ORDER BY me.nombre_medico ";


            $stmt = $conexion_bd->prepare($sql);
            $stmt->execute([':id_esp' => $id_especialidad]);

    }
    
    $medicos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo '<option value="">Seleccione</option>';
    foreach ($medicos as $m) {
        echo '<option value="' . htmlspecialchars($m['id_medico']) . '">'
            . htmlspecialchars($m['nombre_medico']) . '</option>';
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo '<option value="">Error al cargar médicos</option>';
}