<?php
include "include/header_php.php";

// Conexión con la base de datos
try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

$valor          = null;
$mi_menu_html   = MostrarMenu($conexion_bd, $valor);
$mi_footer_html = MostrarFooter($conexion_bd, $valor);

$ltitulo = "Médicos & Especialidades";

$sql = "SELECT id_medico, nombre_medico, medico.id_especialidad, especialidad.nombre_especialidad FROM medico, especialidad  where medico.id_especialidad = especialidad.id_especialidad order BY medico.id_especialidad asc";

$mi_busqueda_html = '';

// Botón explícito hacia medicoRegistro.php
// $mi_busqueda_html = '
//     <div class="col-12 text-start mb-3">
//         <a href="medicoRegistro.php" class="btn btn-primary btn-rounded px-4 shadow-sm">
//             <i class="bi bi-plus-lg me-1"></i> NUEVO
//         </a>
//     </div>
// ';

$encabezados = [
    'N#', 'Nombre', 'N#', 'Especialidad'
];

$campos = [
    "id_medico", "nombre_medico", "id_especialidad", "nombre_especialidad"
];

// Mantiene los 12 parámetros exactos con $porPagina = true
$porPagina = true;
$codigoHTML = MostrarLista(
    $conexion_bd, 
    $ltitulo, 
    $sql, 
    $mi_busqueda_html, 
    $encabezados, 
    $campos, 
    "", 
    "", 
    '', '', '', 
    $porPagina
);

$tbs->LoadTemplate('medicosHorarios.html');
$tbs->Show();
?>