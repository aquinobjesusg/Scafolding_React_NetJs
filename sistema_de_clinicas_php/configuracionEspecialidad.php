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

$ltitulo = "Lista de Especialidades";

// La Consulta SQL optimizada y corregida con nombres largos y completos
$sql = "SELECT id_especialidad,nombre_especialidad, siglas, turno_manana, turno_tarde, ubicación, in_activo
FROM public.especialidad  ORDER BY   id_especialidad ASC     ";

/*
$mi_busqueda_html ='
                <div class="col-md-3">
                    <label class="form-label fw-bold small text-muted"><i class="bi bi-card-text me-1"></i>Buscar por
                        Cédula</label>
                    <input type="text" id="buscar_cedula" class="form-control input-buscar shadow-sm"
                        placeholder="Ej: 12345678..." />
                </div>

                <div class="col-md-5">
                    <label class="form-label fw-bold small text-muted"><i class="bi bi-search me-1"></i>Búsqueda General
                        (Nombres,
                        Universidades, Entes...)</label>
                    <input type="text" id="buscar_general" class="form-control input-buscar shadow-sm"
                        placeholder="Escriba un término para buscar..." />
                </div>

                <div class="col-md-4">
                    <div class="d-flex align-items-center justify-content-md-end justify-content-center gap-2 mb-1">
                        <span class="badge-contador shadow-sm fw-bold py-2 px-3 m-0 text-nowrap">
                            <i class="bi bi-people-fill me-1"></i>Total:
                            <span id="total_registros">0</span>
                        </span>

                        <a href="titularRegistro.html"
                            class="btn btn-success shadow-sm btn-rounded py-2 px-3 fw-bold text-white text-nowrap">
                            <i class="bi bi-person-plus-fill me-1"></i>Registrar Nuevo
                        </a>
                    </div>
                </div>

';*/
$mi_busqueda_html = '';

$encabezados = [
    'ID','Especialidades', 'Siglas', 'Turno mañana', 'Turno tarde', 'ubicación', 'activo'
];

$campos = [
   'id_especialidad','nombre_especialidad', 'siglas','turno_manana', 'turno_tarde', 'ubicación', 'in_activo'
];

//$codigoHTML = MostrarLista($conexion_bd, $ltitulo, $sql, $mi_busqueda_html, $encabezados, $campos);

$formulario = [
   'id','nombre', 'apellido', 'correo','rol','modulo'
];

$campos_formulario = [
   'id_usuario','nombre', 'apellido', 'correo','nombre','nombre_modulos'
];


 $acciones = "CRU";

$procesos = "AI";

$tipos_campos_formulario = [
   'int','text', 'text', 'text','text','text'
];

// Indicamos la página explícita para Nuevo / Editar / Ver
$miPaginaVer = 'especialidadRegistro.php';

$codigoHTML = MostrarLista(
    $conexion_bd, 
    $ltitulo, 
    $sql, 
    $mi_busqueda_html, 
    $encabezados, 
    $campos, 
    $acciones, 
    $procesos, 
    $formulario, 
    $campos_formulario, 
    $tipos_campos_formulario, 
    true,                   // $porPagina
    'especialidad',                     // $borrarTabla
    'id_especialidad',                     // $borrarCampoid
    'listaUsuario.php',                     // $borrarPagina
    true,                   // $datatable
    $miPaginaVer            // $miPaginaVer (Ruta directa a especialidadRegistro.php)
);

// 2. Cargar el archivo HTML (Template)
$tbs->LoadTemplate('configuracionEspecialidad.html');

// 3. Mostrar el resultado
$tbs->Show();
?>