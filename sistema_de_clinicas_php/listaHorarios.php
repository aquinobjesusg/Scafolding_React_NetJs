<?php
include "include/header_php.php";

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

$valor          = null;
$mi_menu_html   = MostrarMenu($conexion_bd, $valor);
$mi_footer_html = MostrarFooter($conexion_bd, $valor);

$ltitulo = "Horarios Médicos";

$sql = "SELECT h.id_horarios_medicos, ver_especialidad(h.id_especialidad) as id_especialidad, h.in_activo,
               ver_medico(h.lun_t1) lun_t1, ver_medico(h.lun_t2) lun_t2, ver_medico(h.mar_t1) mar_t1, ver_medico(h.mar_t2) mar_t2, 
               ver_medico(h.mie_t1) mie_t1, ver_medico(h.mie_t2) mie_t2, ver_medico(h.jue_t1) jue_t1, ver_medico(h.jue_t2) jue_t2, 
               ver_medico(h.vie_t1) vie_t1, ver_medico(h.vie_t2) vie_t2, ver_medico(h.sab_t1) sab_t1, ver_medico(h.sab_t2) sab_t2, 
               ver_medico(h.dom_t1) dom_t1, ver_medico(h.dom_t2) dom_t2
        FROM public.horarios_medicos h
        INNER JOIN public.especialidad e ON h.id_especialidad = e.id_especialidad
        WHERE e.in_activo = 1;";

// Botón para registrar nuevo
$mi_busqueda_html = '
    <div class="d-flex justify-content-end mb-3">
        <a href="nuevoHorariomedico.php?accion=nuevo" class="btn btn-success shadow-sm btn-rounded py-2 px-3 fw-bold text-white">
            <i class="bi bi-calendar-plus me-1"></i> Registrar Nuevo Horario
        </a>
    </div>
';

$encabezados = [
    'Horarios', 'activo', 'Especialidad', 'Lunes Mañana','Lunes Tarde', 'Martes Mañana','Martes Tarde', 
    'Miércoles Mañana','Miércoles Tarde', 'Jueves Mañana','Jueves Tarde', 'Viernes Mañana','Viernes Tarde', 'Sábado Mañana','Sábado Tarde'
];

$campos = [
    'id_horarios_medicos','in_activo' ,'id_especialidad', 'lun_t1', 'lun_t2', 'mar_t1', 'mar_t2', 
    'mie_t1', 'mie_t2', 'jue_t1', 'jue_t2', 'vie_t1', 'vie_t2', 'sab_t1', 'sab_t2'
];



$porPagina = false;
$miPaginaVer = "nuevoHorariomedico.php";
$miPaginaEditar= "editarHorariomedico.php";

$codigoHTML = MostrarLista(
    $conexion_bd, 
    $ltitulo, 
    $sql, 
    $mi_busqueda_html, 
    $encabezados, 
    $campos, 
    "RUEP",                  // Acciones
    "AI",                     // <-- $procesos en blanco evita que intente procesar botones extras
    [], [], [], 
    $porPagina, 
    'horarios_medicos', 
    'id_horarios_medicos', 
    'listaHorarios.php', 
    true, 
    $miPaginaVer,
    $miPaginaEditar
);

$tbs->LoadTemplate('horarios.html');
$tbs->Show();
?>