<?php
include("include/header_php.php");

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// 1. PROCESAR FORMULARIO AL GUARDAR O EDITAR
if (isset($_POST['guardar'])) {
    try {
        $id_horarios_medicos = !empty($_POST['id_horarios_medicos']) ? $_POST['id_horarios_medicos'] : null;
        $id_especialidad     = !empty($_POST['id_especialidad']) ? $_POST['id_especialidad'] : null;
        $id_medico           = !empty($_POST['id_medico']) ? $_POST['id_medico'] : null;
        $in_activo           = isset($_POST['in_activo']) ? 1 : 0;

        $lun_t1 = !empty($_POST['lun_t1']) ? $_POST['lun_t1'] : null;
        $lun_t2 = !empty($_POST['lun_t2']) ? $_POST['lun_t2'] : null;
        $mar_t1 = !empty($_POST['mar_t1']) ? $_POST['mar_t1'] : null;
        $mar_t2 = !empty($_POST['mar_t2']) ? $_POST['mar_t2'] : null;
        $mie_t1 = !empty($_POST['mie_t1']) ? $_POST['mie_t1'] : null;
        $mie_t2 = !empty($_POST['mie_t2']) ? $_POST['mie_t2'] : null;
        $jue_t1 = !empty($_POST['jue_t1']) ? $_POST['jue_t1'] : null;
        $jue_t2 = !empty($_POST['jue_t2']) ? $_POST['jue_t2'] : null;
        $vie_t1 = !empty($_POST['vie_t1']) ? $_POST['vie_t1'] : null;
        $vie_t2 = !empty($_POST['vie_t2']) ? $_POST['vie_t2'] : null;
        $sab_t1 = !empty($_POST['sab_t1']) ? $_POST['sab_t1'] : null;
        $sab_t2 = !empty($_POST['sab_t2']) ? $_POST['sab_t2'] : null;
        $dom_t1 = !empty($_POST['dom_t1']) ? $_POST['dom_t1'] : null;
        $dom_t2 = !empty($_POST['dom_t2']) ? $_POST['dom_t2'] : null;

        if ($id_horarios_medicos) {
            // --- ACTUALIZAR HORARIO ---
            $sql = "UPDATE public.horarios_medicos SET 
                        id_especialidad = :id_especialidad,
                        in_activo = :in_activo,
                        lun_t1 = :lun_t1, lun_t2 = :lun_t2,
                        mar_t1 = :mar_t1, mar_t2 = :mar_t2,
                        mie_t1 = :mie_t1, mie_t2 = :mie_t2,
                        jue_t1 = :jue_t1, jue_t2 = :jue_t2,
                        vie_t1 = :vie_t1, vie_t2 = :vie_t2,
                        sab_t1 = :sab_t1, sab_t2 = :sab_t2,
                        dom_t1 = :dom_t1, dom_t2 = :dom_t2
                    WHERE id_horarios_medicos = :id";

            $stmt = $conexion_bd->prepare($sql);
            $stmt->execute([
                ':id_especialidad' => $id_especialidad,
                ':in_activo'       => $in_activo,
                ':lun_t1' => $lun_t1, ':lun_t2' => $lun_t2,
                ':mar_t1' => $mar_t1, ':mar_t2' => $mar_t2,
                ':mie_t1' => $mie_t1, ':mie_t2' => $mie_t2,
                ':jue_t1' => $jue_t1, ':jue_t2' => $jue_t2,
                ':vie_t1' => $vie_t1, ':vie_t2' => $vie_t2,
                ':sab_t1' => $sab_t1, ':sab_t2' => $sab_t2,
                ':dom_t1' => $dom_t1, ':dom_t2' => $dom_t2,
                ':id'     => $id_horarios_medicos
            ]);

            if (function_exists('registrarTraza')) {
                registrarTraza($conexion_bd, 'Modificación', 'Horarios Médicos', "Se actualizó el horario ID: $id_horarios_medicos");
            }
        } else {
            // --- NUEVO HORARIO ---
            $sql = "INSERT INTO public.horarios_medicos (
                        id_especialidad, id_medico,in_activo,
                        lun_t1, lun_t2, mar_t1, mar_t2, mie_t1, mie_t2,
                        jue_t1, jue_t2, vie_t1, vie_t2, sab_t1, sab_t2, dom_t1, dom_t2
                    ) VALUES (
                        :id_especialidad,:id_medico, :in_activo,
                        :lun_t1, :lun_t2, :mar_t1, :mar_t2, :mie_t1, :mie_t2,
                        :jue_t1, :jue_t2, :vie_t1, :vie_t2, :sab_t1, :sab_t2, :dom_t1, :dom_t2
                    )";

            $stmt = $conexion_bd->prepare($sql);
            $stmt->execute([
                ':id_especialidad' => $id_especialidad,
                ':id_medico'       => $id_medico,
                ':in_activo'       => $in_activo,
                ':lun_t1' => $lun_t1, ':lun_t2' => $lun_t2,
                ':mar_t1' => $mar_t1, ':mar_t2' => $mar_t2,
                ':mie_t1' => $mie_t1, ':mie_t2' => $mie_t2,
                ':jue_t1' => $jue_t1, ':jue_t2' => $jue_t2,
                ':vie_t1' => $vie_t1, ':vie_t2' => $vie_t2,
                ':sab_t1' => $sab_t1, ':sab_t2' => $sab_t2,
                ':dom_t1' => $dom_t1, ':dom_t2' => $dom_t2
            ]);

            if (function_exists('registrarTraza')) {
                registrarTraza($conexion_bd, 'Inserción', 'Horarios Médicos', "Se creó una nueva grilla de horario");
            }
        }

        header("Location: listaHorarios.php");
        exit;

    } catch (PDOException $e) {
        die("Error al guardar la configuración de horarios: " . $e->getMessage());
    }
}

// 2. DETERMINAR MODO (NUEVO, EDITAR O VER)
$id_horario = isset($_GET['id']) ? trim($_GET['id']) : null;
$accion_url = isset($_GET['accion']) ? strtolower(trim($_GET['accion'])) : '';

if ($accion_url === 'nuevo' || !$id_horario) {
    $accion = 'nuevo';
    $id_horario = null;
} else {
    $accion = $accion_url !== '' ? $accion_url : 'editar';
}

$es_modo_ver = ($accion === 'ver' || isset($_GET['leer'])) ? 1 : 0;
$disabled_attr = $es_modo_ver ? 'disabled' : '';

if ($id_horario) {
    $stmt = $conexion_bd->prepare("SELECT * FROM public.horarios_medicos WHERE id_horarios_medicos = :id");
    $stmt->execute([':id' => $id_horario]);
    $horario_e = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($horario_e) {
        $titulo_formulario = $es_modo_ver ? "Consultar Horario Médico" : "Editar Horario Médico";
    } else {
        $accion = 'nuevo';
        $id_horario = null;
    }
} 

if ($accion === 'nuevo' || !$id_horario) {
    $horario_e = [
        'id_horarios_medicos' => '', 'id_especialidad' => '', 'in_activo' => 1,
        'lun_t1' => '', 'lun_t2' => '', 'mar_t1' => '', 'mar_t2' => '',
        'mie_t1' => '', 'mie_t2' => '', 'jue_t1' => '', 'jue_t2' => '',
        'vie_t1' => '', 'vie_t2' => '', 'sab_t1' => '', 'sab_t2' => '',
        'dom_t1' => '', 'dom_t2' => ''
    ];
    $titulo_formulario = "Registrar Nuevo Horario";
}

$chk_activo = (!isset($horario_e['in_activo']) || $horario_e['in_activo'] == 1) ? 'checked' : '';

// 3. CARGAR ESPECIALIDADES Y MARCAR LA SELECCIONADA EN MODO EDICIÓN
$especialidad = $conexion_bd->query("SELECT DISTINCT especialidad.id_especialidad, nombre_especialidad 
                                      FROM especialidad, medico 
                                      WHERE medico.id_especialidad = especialidad.id_especialidad 
                                        AND medico.in_activo = 1 
                                        AND especialidad.in_activo = 1 
                                      ORDER BY especialidad.nombre_especialidad")->fetchAll(PDO::FETCH_ASSOC);

foreach ($especialidad as &$esp) {
    $esp['selected'] = ($esp['id_especialidad'] == ($horario_e['id_especialidad'] ?? '')) ? 'selected' : '';
}
unset($esp);

// Cargar lista de médicos según la especialidad seleccionada (para pre-cargar la grilla en edición)
$lista_medicos_esp = [];
if (!empty($horario_e['id_especialidad'])) {
    $stmt_med = $conexion_bd->prepare("SELECT id_medico, CONCAT(nombre_medico, ' ', apellido_medico) AS nombre_completo 
                                       FROM public.medico 
                                       WHERE id_especialidad = :id_esp AND in_activo = 1 
                                       ORDER BY nombre_medico ASC");
    $stmt_med->execute([':id_esp' => $horario_e['id_especialidad']]);
    $lista_medicos_esp = $stmt_med->fetchAll(PDO::FETCH_ASSOC);
}

function generarOpcionesMedicos($lista_medicos, $id_seleccionado) {
    $html = '<option value="">Sin Médico</option>';
    foreach ($lista_medicos as $med) {
        $selected = ($id_seleccionado != '' && $med['id_medico'] == $id_seleccionado) ? 'selected' : '';
        $html .= "<option value=\"{$med['id_medico']}\" {$selected}>{$med['nombre_completo']}</option>";
    }
    return $html;
}

$dias_turnos = ['lun_t1', 'lun_t2', 'mar_t1', 'mar_t2', 'mie_t1', 'mie_t2', 'jue_t1', 'jue_t2', 'vie_t1', 'vie_t2', 'sab_t1', 'sab_t2', 'dom_t1', 'dom_t2'];
$selects_turnos = [];
foreach ($dias_turnos as $dt) {
    $val_sel = $horario_e[$dt] ?? '';
    $selects_turnos[$dt] = generarOpcionesMedicos($lista_medicos_esp, $val_sel);
}

// 4. RENDEREAR PLANTILLA TBS
$valor = null;
$mi_menu_html = MostrarMenu($conexion_bd, $valor);
$mi_footer_html = MostrarFooter($conexion_bd, $valor);

if ($es_modo_ver) {
    $botones_html = '<a href="listaHorarios.php" class="btn btn-secondary btn-rounded px-4">Regresar</a>';
} else {
    $botones_html = '<a href="listaHorarios.php" class="btn btn-outline-secondary btn-rounded px-4">Cancelar</a>
                     <button type="submit" name="guardar" class="btn btn-primary btn-rounded px-5">Guardar Horario</button>';
}

$tbs->LoadTemplate('nuevoHorariomedico.html', 'UTF-8');

$tbs->VarRef['botones_html'] = $botones_html;
$tbs->VarRef['mi_menu_html'] = $mi_menu_html;
$tbs->VarRef['mi_footer_html'] = $mi_footer_html;
$tbs->VarRef['titulo_formulario'] = $titulo_formulario;
$tbs->VarRef['disabled'] = $disabled_attr;
$tbs->VarRef['chk_activo'] = $chk_activo;

foreach ($selects_turnos as $key => $html_select) {
    $tbs->VarRef['select_' . $key] = $html_select;
}

$tbs->MergeField('horario_e', $horario_e);
$tbs->MergeBlock('especialidad', $especialidad);

$tbs->Show();
?>