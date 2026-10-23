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

// Usamos TO_CHAR para formatear las fechas y quitarles la hora (00:00:00+00)
$sql = "SELECT id_medico, 
               nombre_medico, 
               ver_activo(medico.in_labora) as in_labora, 
               TO_CHAR(medico.fecha_desde_vacaciones, 'YYYY-MM-DD') as fecha_desde_vacaciones, 
               TO_CHAR(medico.fecha_hasta_vacaciones, 'YYYY-MM-DD') as fecha_hasta_vacaciones, 
               medico.in_activo, 
               medico.id_especialidad, 
               especialidad.nombre_especialidad 
        FROM medico, especialidad  
        WHERE medico.id_especialidad = especialidad.id_especialidad 
        ORDER BY medico.id_especialidad asc";

$mi_busqueda_html = '';

$encabezados = [
    'N#', 'Nombre', 'N#', 'Especialidad', 'Activo', 'Labora Actualmente', 'Inicio de Vacaciones', 'Fin de Vacaciones'
];

$campos = [
    "id_medico", "nombre_medico", "id_especialidad", "nombre_especialidad", 'in_activo', 'in_labora', 'fecha_desde_vacaciones', 'fecha_hasta_vacaciones'
];

// Mantiene los 12 parámetros exactos con $porPagina = true
$porPagina = true;

// Definimos la página destino explícita
$miPaginaVer = 'medicoRegistro.php';

$codigoHTML = MostrarLista(
    $conexion_bd, 
    $ltitulo, 
    $sql, 
    $mi_busqueda_html, 
    $encabezados, 
    $campos, 
    "CRUV",                 // Activar Crear, Editar y Ver
    "AI",                   // $procesos
    '', '', '',             
    $porPagina,             
    'medico',               
    'id_medico',            
    'configuracionMedicos.php', 
    $datatable = true,      
    $miPaginaVer            
);

$tbs->LoadTemplate('configuracionMedicos.html');
$tbs->Show();
?>