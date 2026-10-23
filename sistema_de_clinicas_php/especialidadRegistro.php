<?php
include("include/header_php.php");

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// Función para guardar o actualizar especialidad
function guardarEspecialidad($conexion_bd, $datos)
{
    $id_especialidad = !empty($datos['id_especialidad']) ? $datos['id_especialidad'] : null;
    $nombre_especialidad = trim($datos['nombre_especialidad']);
    $siglas = trim($datos['siglas']);
    $ubicacion = trim($datos['ubicacion']);
    
    // Checkbox / Select de turnos y estado activo (0 o 1)
    $turno_manana = isset($datos['turno_manana']) ? 1 : 0;
    $turno_tarde = isset($datos['turno_tarde']) ? 1 : 0;
    $in_activo = isset($datos['in_activo']) ? 1 : 0;

    if ($id_especialidad) {
        // --- EDICIÓN ---
        $sql = "UPDATE public.especialidad 
                SET nombre_especialidad = :nombre_especialidad, 
                    siglas = :siglas, 
                    turno_manana = :turno_manana, 
                    turno_tarde = :turno_tarde, 
                    ubicación = :ubicacion, 
                    in_activo = :in_activo 
                WHERE id_especialidad = :id";
        
        $params = [
            ':nombre_especialidad' => $nombre_especialidad,
            ':siglas'              => $siglas,
            ':turno_manana'        => $turno_manana,
            ':turno_tarde'         => $turno_tarde,
            ':ubicacion'           => $ubicacion,
            ':in_activo'           => $in_activo,
            ':id'                  => $id_especialidad
        ];

        $stmt = $conexion_bd->prepare($sql);
        $stmt->execute($params);

        if (function_exists('registrarTraza')) {
            registrarTraza($conexion_bd, 'Modificación', 'Especialidades', "Se editó la especialidad $nombre_especialidad (ID: $id_especialidad)");
        }
    } else {
        // --- NUEVO REGISTRO ---
        $sql = "INSERT INTO public.especialidad (nombre_especialidad, siglas, turno_manana, turno_tarde, ubicación, in_activo) 
                VALUES (:nombre_especialidad, :siglas, :turno_manana, :turno_tarde, :ubicacion, :in_activo)";

        $stmt = $conexion_bd->prepare($sql);
        $stmt->execute([
            ':nombre_especialidad' => $nombre_especialidad,
            ':siglas'              => $siglas,
            ':turno_manana'        => $turno_manana,
            ':turno_tarde'         => $turno_tarde,
            ':ubicacion'           => $ubicacion,
            ':in_activo'           => $in_activo
        ]);

        if (function_exists('registrarTraza')) {
            registrarTraza($conexion_bd, 'Inserción', 'Especialidades', "Se creó la nueva especialidad $nombre_especialidad");
        }
    }
}

// 1. Procesamiento al hacer clic en Guardar
if (isset($_POST['guardar'])) {
    guardarEspecialidad($conexion_bd, $_POST);
    header("Location: configuracionEspecialidad.php");
    exit;
}

// 2. Determinar si es Edición, Consulta (Ver) o Nuevo Registro
$id_especialidad = isset($_GET['id']) ? trim($_GET['id']) : null;
$accion_url = isset($_GET['accion']) ? strtolower(trim($_GET['accion'])) : '';
$accion = $accion_url !== '' ? $accion_url : ($id_especialidad ? 'editar' : 'nuevo');

if ($id_especialidad !== null && !filter_var($id_especialidad, FILTER_VALIDATE_INT)) {
    $id_especialidad = null;
    $accion = 'nuevo';
}

$es_modo_ver = ($accion === 'ver' || isset($_GET['leer'])) ? 1 : 0;
$disabled_attr = $es_modo_ver ? 'disabled' : '';
$readonly_attr = $es_modo_ver ? 'readonly' : '';

if ($id_especialidad) {
    $stmt = $conexion_bd->prepare("SELECT id_especialidad, nombre_especialidad, siglas, turno_manana, turno_tarde, ubicación AS ubicacion, in_activo FROM public.especialidad WHERE id_especialidad = :id");
    $stmt->execute([':id' => $id_especialidad]);
    $datos_db = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($datos_db) {
        $especialidad_e = $datos_db;
        $titulo_formulario = $es_modo_ver ? "Especialidad" : "Editar Especialidad";
    } else {
        $id_especialidad = null;
        $accion = 'nuevo';
        $es_modo_ver = 0;
        $disabled_attr = '';
        $readonly_attr = '';
        $especialidad_e = [
            'id_especialidad' => '', 'nombre_especialidad' => '', 'siglas' => '',
            'turno_manana' => 0, 'turno_tarde' => 0, 'ubicacion' => '', 'in_activo' => 1
        ];
        $titulo_formulario = "Registrar Nueva Especialidad";
    }
} else {
    $especialidad_e = [
        'id_especialidad' => '',
        'nombre_especialidad' => '',
        'siglas' => '',
        'turno_manana' => 0,
        'turno_tarde' => 0,
        'ubicacion' => '',
        'in_activo' => 1
    ];
    $titulo_formulario = "Registrar Nueva Especialidad";
}

// 3. Preparar variables de ayuda para Checkboxes/Switches en el HTML
$chk_manana = !empty($especialidad_e['turno_manana']) ? 'checked' : '';
$chk_tarde = !empty($especialidad_e['turno_tarde']) ? 'checked' : '';
$chk_activo = (!isset($especialidad_e['in_activo']) || $especialidad_e['in_activo'] == 1) ? 'checked' : '';

// 4. Mostrar la vista
$valor = null;
$mi_menu_html = MostrarMenu($conexion_bd, $valor);
$mi_footer_html = MostrarFooter($conexion_bd, $valor);

// Configuración de botones dinámicos
if ($es_modo_ver) {
    $botones_html = '<a href="configuracionEspecialidad.php" class="btn btn-secondary btn-rounded px-4">Regresar</a>';
} else {
    $botones_html = '<a href="configuracionEspecialidad.php" class="btn btn-outline-secondary btn-rounded px-4">Cancelar</a>
                     <button type="submit" name="guardar" class="btn btn-primary btn-rounded px-5">Guardar Especialidad</button>';
}

$tbs->LoadTemplate('especialidadRegistro.html', 'UTF-8');

// Asignación de variables a TinyButStrong
$tbs->VarRef['botones_html'] = $botones_html;
$tbs->VarRef['mi_menu_html'] = $mi_menu_html;
$tbs->VarRef['mi_footer_html'] = $mi_footer_html;
$tbs->VarRef['titulo_formulario'] = $titulo_formulario;
$tbs->VarRef['disabled'] = $disabled_attr;
$tbs->VarRef['readonly'] = $readonly_attr;
$tbs->VarRef['chk_manana'] = $chk_manana;
$tbs->VarRef['chk_tarde'] = $chk_tarde;
$tbs->VarRef['chk_activo'] = $chk_activo;

$tbs->MergeField('especialidad_e', $especialidad_e);

$tbs->Show();
?>