<?php
include("include/header_php.php");

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// 1. PROCESAR EL FORMULARIO CUANDO SE HACE CLIC EN REGISTRAR / GUARDAR
if (isset($_POST['registrar']) || isset($_POST['guardar'])) {
    try {
        $id_medico        = !empty($_POST['id_medico']) ? $_POST['id_medico'] : null;
        $cedula_medico    = !empty($_POST['cedula_medico']) ? trim($_POST['cedula_medico']) : null;
        $nombre_medico    = trim($_POST['nombre_medico'] ?? '');
        $apellido_medico  = trim($_POST['apellido_medico'] ?? '');
        $correo_medico    = trim($_POST['correo_medico'] ?? '');
        $telefono1_medico = trim($_POST['telefono1_medico'] ?? '');
        $telefono2_medico = trim($_POST['telefono2_medico'] ?? '');
        $id_sexo          = !empty($_POST['id_sexo']) ? $_POST['id_sexo'] : null;
        $id_nacionalidad  = !empty($_POST['id_nacionalidad']) ? $_POST['id_nacionalidad'] : null;
        $id_especialidad  = !empty($_POST['id_especialidad']) ? $_POST['id_especialidad'] : null;
        $id_usuario       = $_SESSION['id_usuario'] ?? null;
        $in_activo        = isset($_POST['in_activo']) ? 1 : 0;

        if ($id_medico) {
            // --- EDICIÓN / ACTUALIZACIÓN ---
            $sql = "UPDATE public.medico 
                    SET nombre_medico    = :nom, 
                        apellido_medico  = :ape, 
                        cedula_medico    = :ced, 
                        correo_medico    = :cor, 
                        telefono1_medico = :tel1, 
                        telefono2_medico = :tel2, 
                        id_sexo          = :sex, 
                        id_nacionalidad  = :nac, 
                        id_especialidad  = :esp, 
                        in_activo        = :act
                    WHERE id_medico = :id";

            $stmt = $conexion_bd->prepare($sql);
            $stmt->execute([
                ':nom'  => $nombre_medico,
                ':ape'  => $apellido_medico,
                ':ced'  => $cedula_medico,
                ':cor'  => $correo_medico,
                ':tel1' => $telefono1_medico,
                ':tel2' => $telefono2_medico,
                ':sex'  => $id_sexo,
                ':nac'  => $id_nacionalidad,
                ':esp'  => $id_especialidad,
                ':act'  => $in_activo,
                ':id'   => $id_medico
            ]);

            if (function_exists('registrarTraza')) {
                registrarTraza($conexion_bd, 'Modificación', 'Médicos', "Se editó el médico $nombre_medico $apellido_medico (ID: $id_medico)");
            }

        } else {
            // --- NUEVO REGISTRO ---
            $sqlInsert = "INSERT INTO public.medico (
                            nombre_medico, apellido_medico, cedula_medico, id_usuario, 
                            in_activo, correo_medico, telefono1_medico, telefono2_medico, 
                            id_sexo, id_nacionalidad, id_especialidad
                         ) VALUES (
                            :nom, :ape, :ced, :usr, 
                            :act, :cor, :tel1, :tel2, 
                            :sex, :nac, :esp
                         )";

            $stmt = $conexion_bd->prepare($sqlInsert);
            $stmt->execute([
                ':nom'  => $nombre_medico,
                ':ape'  => $apellido_medico,
                ':ced'  => $cedula_medico,
                ':usr'  => $id_usuario,
                ':act'  => 1, // Por defecto activo al crear
                ':cor'  => $correo_medico,
                ':tel1' => $telefono1_medico,
                ':tel2' => $telefono2_medico,
                ':sex'  => $id_sexo,
                ':nac'  => $id_nacionalidad,
                ':esp'  => $id_especialidad
            ]);

            if (function_exists('registrarTraza')) {
                registrarTraza($conexion_bd, 'Inserción', 'Médicos', "Se creó el médico $nombre_medico $apellido_medico");
            }
        }

        header("Location: configuracionMedicos.php");
        exit;

    } catch (PDOException $e) {
        die("Error al guardar la información del médico: " . $e->getMessage());
    }
}

// 2. CARGAR TABLAS DE APOGO PARA LOS DESPLEGABLES (SELECTS)
// Listado de Especialidades
// 2. CARGAR TABLAS DE APOYO PARA LOS DESPLEGABLES (SELECTS)

// Listado de Especialidades
$stmt_esp = $conexion_bd->query("SELECT id_especialidad, nombre_especialidad FROM public.especialidad WHERE in_activo = 1 ORDER BY nombre_especialidad ASC");
$lista_especialidades = $stmt_esp->fetchAll(PDO::FETCH_ASSOC);

// Listado de Sexo (Consulta directa a public.sexo)
try {
    $stmt_sex = $conexion_bd->query("SELECT id_sexo, sexo FROM public.sexo ORDER BY id_sexo ASC");
    $lista_sexo = $stmt_sex->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    $lista_sexo = []; // En caso de que falle la tabla, evita detener la ejecución
}

// Listado de Nacionalidad (Consulta directa a public.nacionalidad)
try {
    $stmt_nac = $conexion_bd->query("SELECT id_nacionalidad, nombre_nacionalidad FROM public.nacionalidad ORDER BY id_nacionalidad ASC");
    $lista_nacionalidad = $stmt_nac->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // Si la columna en nacionalidad difiere, se intenta con el nombre correspondiente
    $stmt_nac = $conexion_bd->query("SELECT id_nacionalidad, nacionalidad AS nombre_nacionalidad FROM public.nacionalidad ORDER BY id_nacionalidad ASC");
    $lista_nacionalidad = $stmt_nac ? $stmt_nac->fetchAll(PDO::FETCH_ASSOC) : [];
}

// 3. DETERMINAR MODO: EDICIÓN, VER O NUEVO REGISTRO
$id_medico = isset($_GET['id']) ? trim($_GET['id']) : null;
$accion_url = isset($_GET['accion']) ? strtolower(trim($_GET['accion'])) : '';
$accion = $accion_url !== '' ? $accion_url : ($id_medico ? 'editar' : 'nuevo');

if ($id_medico !== null && !filter_var($id_medico, FILTER_VALIDATE_INT)) {
    $id_medico = null;
    $accion = 'nuevo';
}

$es_modo_ver = ($accion === 'ver' || isset($_GET['leer'])) ? 1 : 0;
$disabled_attr = $es_modo_ver ? 'disabled' : '';
$readonly_attr = $es_modo_ver ? 'readonly' : '';

if ($id_medico) {
    $sql_med = "SELECT id_medico, cedula_medico, nombre_medico, apellido_medico, 
                       correo_medico, telefono1_medico, telefono2_medico, 
                       id_sexo, id_nacionalidad, id_especialidad, in_activo 
                FROM public.medico WHERE id_medico = :id";
    $stmt = $conexion_bd->prepare($sql_med);
    $stmt->execute([':id' => $id_medico]);
    $datos_db = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($datos_db) {
        $medico_e = $datos_db;
        $titulo_formulario = $es_modo_ver ? "Información del Médico" : "Editar Médico";
    } else {
        $id_medico = null;
        $accion = 'nuevo';
        $es_modo_ver = 0;
        $disabled_attr = '';
        $readonly_attr = '';
        $medico_e = [
            'id_medico' => '', 'cedula_medico' => '', 'nombre_medico' => '', 'apellido_medico' => '',
            'correo_medico' => '', 'telefono1_medico' => '', 'telefono2_medico' => '',
            'id_sexo' => '', 'id_nacionalidad' => '', 'id_especialidad' => '', 'in_activo' => 1
        ];
        $titulo_formulario = "Registrar Nuevo Médico";
    }
} else {
    $medico_e = [
        'id_medico' => '', 'cedula_medico' => '', 'nombre_medico' => '', 'apellido_medico' => '',
        'correo_medico' => '', 'telefono1_medico' => '', 'telefono2_medico' => '',
        'id_sexo' => '', 'id_nacionalidad' => '', 'id_especialidad' => '', 'in_activo' => 1
    ];
    $titulo_formulario = "Registrar Nuevo Médico";
}

$chk_activo = (!isset($medico_e['in_activo']) || $medico_e['in_activo'] == 1) ? 'checked' : '';

// 4. MOSTRAR LA VISTA Y COMPILAR TBS
$valor = null;
$mi_menu_html = MostrarMenu($conexion_bd, $valor);
$mi_footer_html = MostrarFooter($conexion_bd, $valor);

if ($es_modo_ver) {
    $botones_html = '<a href="configuracionMedicos.php" class="btn btn-secondary btn-rounded px-4">Regresar</a>';
} else {
    $botones_html = '<a href="configuracionMedicos.php" class="btn btn-outline-secondary btn-rounded px-4">Cancelar</a>
                     <button type="submit" name="registrar" class="btn btn-primary btn-rounded px-5">Guardar Médico</button>';
}

$tbs->LoadTemplate('medicoRegistro.html', 'UTF-8');

$tbs->VarRef['botones_html'] = $botones_html;
$tbs->VarRef['mi_menu_html'] = $mi_menu_html;
$tbs->VarRef['mi_footer_html'] = $mi_footer_html;
$tbs->VarRef['titulo_formulario'] = $titulo_formulario;
$tbs->VarRef['disabled'] = $disabled_attr;
$tbs->VarRef['readonly'] = $readonly_attr;
$tbs->VarRef['chk_activo'] = $chk_activo;

$tbs->MergeField('medico_e', $medico_e);
$tbs->MergeBlock('esp', $lista_especialidades);
$tbs->MergeBlock('sex', $lista_sexo);
$tbs->MergeBlock('nac', $lista_nacionalidad);

$tbs->Show();
?>