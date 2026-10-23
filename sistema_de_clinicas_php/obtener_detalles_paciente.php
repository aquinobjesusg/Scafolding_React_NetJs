<?php
include "include/header_php.php";

// 1. Obtener el ID enviado desde la URL
$id_cita = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id_cita <= 0) {
    die("ID de cita inválido o no especificado.");
}

// 2. Conexión a la base de datos
try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

$valor          = null;
$mi_menu_html   = MostrarMenu($conexion_bd, $valor);
$mi_footer_html = MostrarFooter($conexion_bd, $valor);

// 3. Consulta SQL original limpia
$sql = "SELECT 
            id_cita, 
            ver_paciente(id_titular) AS titular, 
            ver_paciente(id_paciente) AS paciente, 
            calcular_edad(id_titular) AS edad, 
            fecha_de_cita, 
            ver_especialidad(id_especialidad) AS especialidad, 
            ver_usuario(id_usuario) AS usuario, 
            ver_medico(id_medico) AS medico, 
            ver_estado_cita(id_estado_cita) AS estado_cita, 
            ver_paciente_ente(id_titular) AS ente, 
            ver_paciente_estado(id_titular) AS estado_pais, 
            ver_paciente_universidad(id_titular) AS universidad
        FROM public.cita 
        WHERE id_cita = :id_cita;";

$stmt = $conexion_bd->prepare($sql);
$stmt->execute([':id_cita' => $id_cita]);
$cita = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$cita) {
    die("No se encontró la información de la cita especificada.");
}
// Consulta SQL usando las columnas definitivas de la base de datos
// Consulta SQL especificando la columna con tilde "descripción_estado" usando comillas dobles
$sql_estados = 'SELECT id_estado AS id_estado_cita, "descripción_estado" AS descripcion_estado FROM public.estado_cita ORDER BY id_estado ASC;';
$stmt_est = $conexion_bd->query($sql_estados);
$estados_bd = $stmt_est->fetchAll(PDO::FETCH_ASSOC);

// Procesar las opciones para TinyButStrong
foreach ($estados_bd as &$est) {
    // Verifica si la opción actual coincide con el estado grabado en la cita
    $est['seleccionado'] = (isset($cita['id_estado_cita']) && $est['id_estado_cita'] == $cita['id_estado_cita']) ? 'selected' : '';
    
    // Asigna la bandera 'reprogramada' si la descripción coincide
    $est['es_reprogramada'] = (mb_strtolower($est['descripcion_estado']) === 'reprogramada') ? 'reprogramada' : '';
}
unset($est); // Liberar referencia // Buenas prácticas al usar referencias en foreach/ Buenas prácticas al usar referencias en foreach
$tbs->LoadTemplate('obtener_detalles_paciente.html');
$tbs->MergeField('cita', $cita);
$tbs->MergeBlock('est', $estados_bd); // Carga la lista de estados para el select
$tbs->Show();