<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");
include_once ('funcs/funcs.php');

if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) {
    header("Location: index.php?valor=0");
    exit;
}

$usuario = $_SESSION['id_usuario'];
$nombre = $_SESSION['nom_usuario'];

if (!verificar_permiso_rapido('Almacén', 'almacen_distribuir')) {
    header("Location: acceso_denegado.php");
    exit;
}

$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('recursoSalidaListado.html', 'UTF-8');

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 

   // --- LÓGICA AJAX: SELECTS DEPENDIENTES ---
  // --- LÓGICA AJAX: SELECTS DEPENDIENTES ---
if (isset($_POST['action']) && $_POST['action'] === 'get_dependientes') {
    // 1. Limpiar cualquier buffer de salida previo
    while (ob_get_level()) { ob_end_clean(); }
    
    header('Content-Type: application/json');
    
    $tipo = $_POST['tipo'] ?? '';
    $id_padre = intval($_POST['id_padre'] ?? 0); // Forzar entero
    $data = [];

    try {
        if ($id_padre > 0) { // Solo ejecutar si hay un ID válido
            switch ($tipo) {
                case 'general':
                    $sql = "SELECT id_direccion_general AS id, nom_direccion_general AS nombre 
                            FROM public.direccion_general 
                            WHERE id_ente = :id ORDER BY nombre";
                    break;
                case 'linea':
                    $sql = "SELECT id_direccion_linea AS id, nom_direccion_linea AS nombre 
                            FROM public.direccion_linea 
                            WHERE id_direccion_general = :id ORDER BY nombre";
                    break;
                case 'coordinacion':
                    $sql = "SELECT id_coordinacion AS id, nom_coordinacion AS nombre 
                            FROM public.coordinacion 
                            WHERE id_direccion_linea = :id ORDER BY nombre";
                    break;
                default: $sql = "";
            }

            if ($sql != "") {
                $stmt = $conexion_bd->prepare($sql);
                $stmt->execute([':id' => $id_padre]);
                $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
        }
        echo json_encode($data);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit; // Salida inmediata
}

    // --- CARGA DE DATOS PARA SELECTS INICIALES ---
    
    // 1. Carga de Entes (Para el primer select que no cargaba)
    $enteSql = "SELECT id_ente, nom_ente FROM public.ente ORDER BY nom_ente ASC";
    $entes = $conexion_bd->query($enteSql)->fetchAll(PDO::FETCH_ASSOC);

    // 2. Otros selects de filtrado
    $salidaAlmacen = $conexion_bd->query("SELECT DISTINCT a.id_almacen, a.nom_almacen FROM almacen a INNER JOIN salida s ON a.id_almacen = s.id_almacen ORDER BY a.nom_almacen")->fetchAll(PDO::FETCH_ASSOC);
    $salidaArticulo = $conexion_bd->query("SELECT DISTINCT ar.id_articulo, ar.nom_articulo FROM articulo ar INNER JOIN salida s ON ar.id_articulo = s.id_articulo ORDER BY ar.nom_articulo")->fetchAll(PDO::FETCH_ASSOC);

    // --- LÓGICA DE BÚSQUEDA / FILTRADO ---
    $whereClauses = [];
    $parametros = [];

    $selected_almacen = '0';
    $selected_ente = '0';
    $selected_articulo = '0';
    $selected_fecha_desde = '';
    $selected_fecha_hasta = '';

    if (isset($_POST['Buscar'])) {
        $selected_almacen = trim($_POST['id_almacen2'] ?? '0');
        // Importante: En el HTML el name debe ser id_ente2 para que coincida aquí
        $selected_ente = trim($_POST['id_ente2'] ?? '0'); 
        $selected_articulo = trim($_POST['id_articulo2'] ?? '0');
        $selected_fecha_desde = trim($_POST['fecha_desde'] ?? '');
        $selected_fecha_hasta = trim($_POST['fecha_hasta'] ?? '');

        if ($selected_almacen != '0') {
            $whereClauses[] = "s.id_almacen = :id_almacen";
            $parametros[':id_almacen'] = $selected_almacen;
        }
        if ($selected_ente != '0') {
            $whereClauses[] = "s.id_ente = :id_ente";
            $parametros[':id_ente'] = $selected_ente;
        }
        if ($selected_articulo != '0') {
            $whereClauses[] = "s.id_articulo = :id_articulo";
            $parametros[':id_articulo'] = $selected_articulo;
        }
        if (!empty($selected_fecha_desde) && !empty($selected_fecha_hasta)) {
            $whereClauses[] = "s.fecha_salida BETWEEN :fecha_desde AND :fecha_hasta";
            $parametros[':fecha_desde'] = $selected_fecha_desde;
            $parametros[':fecha_hasta'] = $selected_fecha_hasta;
        }
    }

    $whereSql = !empty($whereClauses) ? " WHERE " . implode(" AND ", $whereClauses) : '';

    // --- CONSULTA DEL LISTADO PRINCIPAL ---
    $listadoSql = "SELECT
                    s.orden_salida,
                    MAX(s.fecha_salida) AS fecha_salida,
                    MAX(e.nom_ente) AS ente_principal,
                    MAX(a.nom_almacen) AS almacen_principal,
                    STRING_AGG(ar.nom_articulo || ' (' || s.cantidad_salida || ')', ', ') AS detalles_articulos,
                    SUM(s.cantidad_salida) AS cantidad_total_distribuida,
                    MAX(s.observacion_s) AS observacion_s
                FROM salida s
                LEFT JOIN ente e ON e.id_ente = s.id_ente
                LEFT JOIN almacen a ON a.id_almacen = s.id_almacen
                LEFT JOIN articulo ar ON ar.id_articulo = s.id_articulo" . 
                $whereSql . 
                " GROUP BY s.orden_salida
                  ORDER BY MAX(s.fecha_salida) DESC, s.orden_salida DESC";

    $stmtListado = $conexion_bd->prepare($listadoSql);
    $stmtListado->execute($parametros);
    $listadoRecurso = $stmtListado->fetchAll(PDO::FETCH_ASSOC);

    $total_registros = count($listadoRecurso);

} catch (PDOException $e) {
    die("Error crítico: " . $e->getMessage());
}

// --- UNIÓN CON TBS (MERGE) ---

// Bloque de entes para el select (Asegúrate que en HTML diga [ente.id_ente;block=option])
$tbs->MergeBlock('ente', $entes); 

// Bloque de la tabla principal
$tbs->MergeBlock('listadoRecurso', $listadoRecurso);

// Bloques para los selects de filtro
$tbs->MergeBlock('salidaAlmacen', $salidaAlmacen);
$tbs->MergeBlock('salidaArticulo', $salidaArticulo);

// Campos de estado y variables globales
$tbs->MergeField('selected_almacen', $selected_almacen);
$tbs->MergeField('selected_ente', $selected_ente);
$tbs->MergeField('selected_articulo', $selected_articulo);
$tbs->MergeField('selected_fecha_desde', $selected_fecha_desde);
$tbs->MergeField('selected_fecha_hasta', $selected_fecha_hasta);

// Conteo para el <p> de la tabla
$tbs->MergeField('recursoConteo.total', $total_registros); 
$tbs->MergeField('nombre', $nombre);

$tbs->Show();
?>