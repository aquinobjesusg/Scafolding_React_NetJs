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

$ltitulo = "Trazabilidad de Usuario";

$codigoHTML = '';
$val_fechad = '';
$val_fechah = '';

// Verificar si se hizo clic en el botón Buscar
if (isset($_POST['buscar'])) {
    $val_fechad  = $_POST['fechad'] ?? '';
    $val_fechah  = $_POST['fechah'] ?? '';
    $musuario    = $_POST['musuario'] ?? '*';
    $evento      = $_POST['evento'] ?? '*';
    $direccionip = $_POST['direccionip'] ?? '*';

    $sql = "SELECT id_trazabilidad, TO_CHAR(fecha_de_registro, 'YYYY-MM-DD') AS fecha_de_registro, evento, ver_usuario(id_usuario) id_usuario, direccion_ip, tx_datos
            FROM public.trazabilidad WHERE fecha_de_registro::date BETWEEN '$val_fechad' AND '$val_fechah'";

    if ($musuario !== '*') {
        $sql .= " AND id_usuario = " . intval($musuario);
    }
    if ($evento !== '*') {
        $sql .= " AND evento = '" . $evento . "'";
    }
    if ($direccionip !== '*') {
        $sql .= " AND direccion_ip = '" . $direccionip . "'";
    }

    $sql .= " ORDER BY id_trazabilidad DESC";

    // Comprobar resultados
    $stmt_check = $conexion_bd->prepare($sql);
    $stmt_check->execute();
    $total_resultados = $stmt_check->rowCount();

    $alerta_vacia = '';
    if ($total_resultados == 0) {
        $alerta_vacia = '<div class="alert alert-warning text-center fw-bold shadow-sm my-4 py-3" role="alert">
                            <i class="bi bi-exclamation-triangle-fill me-2"></i> No se encontró actividad para las fechas u opciones seleccionadas.
                         </div>';
    }

    $encabezados = ['id_trazabilidad', 'fecha_de_registro', 'evento', 'id_usuario', 'direccion_ip', 'tx_datos'];
    $campos = ['id_trazabilidad', 'fecha_de_registro', 'evento', 'id_usuario', 'direccion_ip', 'tx_datos'];

    $codigoHTML = $alerta_vacia . MostrarLista($conexion_bd, $ltitulo, $sql, '', $encabezados, $campos, 'RE', 'oo', '', '', '', false, '', '', '', true);
} else {
    // Mensaje inicial antes de realizar la búsqueda
    $codigoHTML = '<div class="alert alert-info text-center fw-bold shadow-sm my-4 py-3" role="alert">
                        <i class="bi bi-info-circle-fill me-2"></i> Por favor, seleccione los filtros y haga clic en <strong>Buscar</strong> para consultar la trazabilidad.
                   </div>';
}

// Cargar listas desplegables para el HTML
$ssql = "SELECT id_usuario, nombre || ' ' || apellido AS nom_usuario FROM usuario ORDER BY nombre || ' ' || apellido;";
$listau = SelectFrom($conexion_bd, $ssql);
foreach ($listau as &$u) {
    $u['selected'] = (isset($_POST['musuario']) && $_POST['musuario'] == $u['id_usuario']) ? 'selected' : '';
}

$esql = "SELECT evento FROM trazabilidad GROUP BY evento ORDER BY evento ASC;";
$listae = SelectFrom($conexion_bd, $esql);
foreach ($listae as &$e) {
    $e['selected'] = (isset($_POST['evento']) && $_POST['evento'] == $e['evento']) ? 'selected' : '';
}

$ipsql = "SELECT direccion_ip FROM trazabilidad GROUP BY direccion_ip ORDER BY direccion_ip ASC;";
$listaip = SelectFrom($conexion_bd, $ipsql);
foreach ($listaip as &$ip) {
    $ip['selected'] = (isset($_POST['direccionip']) && $_POST['direccionip'] == $ip['direccion_ip']) ? 'selected' : '';
}

// Variables para mantener estados seleccionados de '*' por defecto o seleccionados
$tbs->VarRef['sel_all_usuario'] = (!isset($_POST['musuario']) || $_POST['musuario'] == '*') ? 'selected' : '';
$tbs->VarRef['sel_all_evento']  = (!isset($_POST['evento']) || $_POST['evento'] == '*') ? 'selected' : '';
$tbs->VarRef['sel_all_ip']      = (!isset($_POST['direccionip']) || $_POST['direccionip'] == '*') ? 'selected' : '';

$tbs->LoadTemplate('trazabilidadLista.html');

$tbs->VarRef['mi_menu_html']   = $mi_menu_html;
$tbs->VarRef['mi_footer_html'] = $mi_footer_html;
$tbs->VarRef['ltitulo']        = $ltitulo;
$tbs->VarRef['val_fechad']     = $val_fechad;
$tbs->VarRef['val_fechah']     = $val_fechah;
$tbs->VarRef['codigoHTML']     = $codigoHTML;

$tbs->MergeBlock('listau', $listau);
$tbs->MergeBlock('listae', $listae);
$tbs->MergeBlock('listaip', $listaip);

$tbs->Show();
?>