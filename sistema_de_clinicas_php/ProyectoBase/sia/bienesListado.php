<?php
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

$puede_editar = ($super_admin || verificar_permiso_rapido('Bienes', 'bienes_editar')) ? 1 : 0;
// 2. CONEXIÓN GLOBAL PDO
try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// --- 3. LÓGICA AJAX: SELECTS DEPENDIENTES ---
if (isset($_POST['action']) && $_POST['action'] === 'get_dependientes') {
    ob_clean(); 
    header('Content-Type: application/json');
    
    try {
        $tipo = $_POST['tipo'] ?? '';
        $id_padre = isset($_POST['id_padre']) ? (int)$_POST['id_padre'] : 0;
        $res = [];

        if ($id_padre > 0) {
            switch ($tipo) {
                case 'general':
                    $sql = "SELECT id_direccion_general AS id, nom_direccion_general AS nombre FROM public.direccion_general WHERE id_ente = :id ORDER BY nombre";
                    break;
                case 'linea':
                    $sql = "SELECT id_direccion_linea AS id, nom_direccion_linea AS nombre FROM public.direccion_linea WHERE id_direccion_general = :id ORDER BY nombre";
                    break;
                case 'coordinacion':
                    $sql = "SELECT id_coordinacion AS id, nom_coordinacion AS nombre FROM public.coordinacion WHERE id_direccion_linea = :id ORDER BY nombre";
                    break;
                case 'funcionario':
                    $sql = "SELECT id_funcionario AS id, (nom_funcionario || ' ' || ape_funcionario) AS nombre FROM public.funcionario WHERE id_coordinacion = :id ORDER BY nombre";
                    break;
                default:
                    $sql = "";
            }

            if ($sql !== "") {
                $stmt = $conexion_bd->prepare($sql);
                $stmt->execute([':id' => $id_padre]);
                $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
        }
        echo json_encode($res);
    } catch (Exception $e) {
        echo json_encode([["id" => 0, "nombre" => "Error: " . $e->getMessage()]]);
    }
    exit; 
}

// AJAX: Detalles del bien
if (isset($_POST['action']) && $_POST['action'] === 'get_bien_details') {
    ob_clean();
    header('Content-Type: application/json');
    try {
        $id = (int)$_POST['id_bienes'];
        $sql = "SELECT b.codigo_bienes AS codigo_nuevo, 
                b.codigo_viejo, 
                b.fecha_ingresob, 
                b.equipob AS equipo,
                b.marca, 
                b.modelo, 
                b.serial, 
                b.color, 
                b.especificacion, 
                b.fecha_adquisicion, 
                b.precio_bien,
                e.nom_estado AS estado, 
                c.nom_concepto AS concepto,
                COALESCE(cb.nom_clasificacionbien, 'Sin asignar') AS clasificacion,
                ent.nom_ente AS ente, 
                dg.nom_direccion_general AS direccion_general, 
                dl.nom_direccion_linea AS direccion_linea, 
                coor.nom_coordinacion AS coordinacion,
                f.nom_funcionario || ' ' || f.ape_funcionario AS funcionario,
                d.observaciond AS observacion
                FROM oticbienes.bienes b
                LEFT JOIN oticbienes.estado e ON b.id_estado = e.id_estado
                LEFT JOIN oticbienes.concepto c ON b.id_concepto = c.id_concepto
                LEFT JOIN oticbienes.distribucion d ON b.id_bienes = d.id_bienes
                LEFT JOIN oticbienes.clasificacionbien cb ON b.id_clasificacionbien = cb.id_clasificacionbien
                LEFT JOIN public.funcionario f ON d.id_funcionario = f.id_funcionario
                LEFT JOIN public.coordinacion coor ON f.id_coordinacion = coor.id_coordinacion
                LEFT JOIN public.direccion_linea dl ON coor.id_direccion_linea = dl.id_direccion_linea
                LEFT JOIN public.direccion_general dg ON dl.id_direccion_general = dg.id_direccion_general
                LEFT JOIN public.ente ent ON dg.id_ente = ent.id_ente
                WHERE b.id_bienes = :id";
        
        $stmt = $conexion_bd->prepare($sql);
        $stmt->execute([':id' => $id]);
        echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit;
}

// --- 4. LÓGICA DE BÚSQUEDA Y FILTRADO ---

$id_ente_sel = $_POST['id_ente'] ?? '0';
$id_dg_sel   = $_POST['id_direccion_general'] ?? '0';
$id_dl_sel   = $_POST['id_direccion_linea'] ?? '0';
$id_coor_sel = $_POST['id_coordinacion'] ?? '0';
$id_func_sel = $_POST['id_funcionario'] ?? '0';
$buscar_codigo_val = $_POST['buscar_codigo'] ?? '';
$fecha_desde_val   = $_POST['fecha_desde'] ?? '';
$fecha_hasta_val   = $_POST['fecha_hasta'] ?? '';

// FILTROS BASE
$whereClauses = [
    "b.codigo_bienes IS NOT NULL", 
    "b.codigo_bienes != ''"
];
$parametros = [];

if (isset($_POST['Buscar'])) {

   

    if (!empty($_POST['buscar_codigo'])) {
        // Reemplaza la comilla simple por el guion
        $buscar_codigo = str_replace("'", "-", trim($_POST['buscar_codigo']));
        $whereClauses[] = "(b.codigo_bienes ILIKE :buscar_codigo OR b.codigo_viejo ILIKE :buscar_codigo)";
        $parametros[':buscar_codigo'] = "%" . $buscar_codigo . "%";
    }

    if ($id_func_sel !== '0') {
        $whereClauses[] = "f.id_funcionario = :id_f";
        $parametros[':id_f'] = $id_func_sel;
    } elseif ($id_coor_sel !== '0') {
        $whereClauses[] = "coor.id_coordinacion = :id_c";
        $parametros[':id_c'] = $id_coor_sel;
    } elseif ($id_dl_sel !== '0') {
        $whereClauses[] = "dl.id_direccion_linea = :id_dl";
        $parametros[':id_dl'] = $id_dl_sel;
    } elseif ($id_dg_sel !== '0') {
        $whereClauses[] = "dg.id_direccion_general = :id_dg";
        $parametros[':id_dg'] = $id_dg_sel;
    } elseif ($id_ente_sel !== '0') {
        $whereClauses[] = "ent.id_ente = :id_ente";
        $parametros[':id_ente'] = $id_ente_sel;
    }

    if (!empty($_POST['fecha_desde']) && !empty($_POST['fecha_hasta'])) {
        $whereClauses[] = "b.fecha_ingresob BETWEEN :desde AND :hasta";
        $parametros[':desde'] = $_POST['fecha_desde'];
        $parametros[':hasta'] = $_POST['fecha_hasta'];
    }
}

$sqlWhere = " WHERE " . implode(" AND ", $whereClauses);

// --- 5. CONSULTA PRINCIPAL ---
$listadoBienesSql = "SELECT b.id_bienes, b.codigo_bienes, b.fecha_ingresob, b.id_estado, 
                    COALESCE(b.codigo_viejo, 'N/A') AS codigo_viejo, b.equipob,
                    COALESCE(b.codigo_viejo, 'N/A') AS codigo_viejo, b.equipob, 
                    COALESCE(b.especificacion, 'N/A') AS especificacion,
                    COALESCE(b.modelo, 'N/A') AS modelo, b.marca, b.serial, b.color,
                    COALESCE(d.observaciond, 'Sin observaciones') AS observacion,
                    COALESCE(cb.nom_clasificacionbien, 'N/A') AS nom_clasificacionbien,
                    e.nom_estado, b.fecha_adquisicion, c.nom_concepto, b.precio_bien,
                    COALESCE(ent.nom_ente, 'N/A') AS nom_ente,
                    COALESCE(dg.nom_direccion_general, 'N/A') AS nom_dg,
                    COALESCE(dl.nom_direccion_linea, 'N/A') AS nom_dl,
                    COALESCE(coor.nom_coordinacion, 'N/A') AS nom_coor,
                    COALESCE(f.nom_funcionario || ' ' || f.ape_funcionario, 'Sin asignar') AS funcionario_asignado 
                    FROM oticbienes.bienes b 
                    LEFT JOIN oticbienes.estado e on b.id_estado = e.id_estado
                    LEFT JOIN oticbienes.concepto c on b.id_concepto = c.id_concepto
                    LEFT JOIN oticbienes.clasificacionbien cb on b.id_clasificacionbien = cb.id_clasificacionbien
                    LEFT JOIN oticbienes.distribucion d ON b.id_bienes = d.id_bienes
                    LEFT JOIN public.funcionario f ON d.id_funcionario = f.id_funcionario
                    LEFT JOIN public.coordinacion coor ON f.id_coordinacion = coor.id_coordinacion
                    LEFT JOIN public.direccion_linea dl ON coor.id_direccion_linea = dl.id_direccion_linea
                    LEFT JOIN public.direccion_general dg ON dl.id_direccion_general = dg.id_direccion_general
                    LEFT JOIN public.ente ent ON dg.id_ente = ent.id_ente
                    $sqlWhere ORDER BY b.fecha_ingresob DESC";

// Conteo total para la vista
$conteoSql = "SELECT COUNT(DISTINCT b.id_bienes) FROM oticbienes.bienes b 
              LEFT JOIN oticbienes.distribucion d ON b.id_bienes = d.id_bienes 
              LEFT JOIN public.funcionario f ON d.id_funcionario = f.id_funcionario
              LEFT JOIN public.coordinacion coor ON f.id_coordinacion = coor.id_coordinacion
              LEFT JOIN public.direccion_linea dl ON coor.id_direccion_linea = dl.id_direccion_linea
              LEFT JOIN public.direccion_general dg ON dl.id_direccion_general = dg.id_direccion_general
              LEFT JOIN public.ente ent ON dg.id_ente = ent.id_ente
              $sqlWhere";

$stmtConteo = $conexion_bd->prepare($conteoSql);
$stmtConteo->execute($parametros);
$bienesConteo = $stmtConteo->fetchColumn();

$stmtListado = $conexion_bd->prepare($listadoBienesSql);
$stmtListado->execute($parametros);
$listadoBienes = $stmtListado->fetchAll(PDO::FETCH_ASSOC);

$entes = $conexion_bd->query("SELECT id_ente, nom_ente FROM public.ente ORDER BY nom_ente ASC")->fetchAll(PDO::FETCH_ASSOC);

// --- 6. RENDERIZADO CON TBS ---
$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('bienesListado.html', 'UTF-8');



$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje'], $_SESSION['tipo_mensaje']);

$tbs->MergeBlock('msj', [['mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje]]);
$tbs->MergeBlock('ente', $entes);
$tbs->MergeBlock('listadoBienes', $listadoBienes);
$tbs->MergeBlock('bienesConteo', [['total' => $bienesConteo]]);
$tbs->MergeField('perm', ['can_edit' => $puede_editar]);
$tbs->MergeField('sel', [
    'ente'   => $id_ente_sel,
    'dg'     => $id_dg_sel,
    'dl'     => $id_dl_sel,
    'coor'   => $id_coor_sel,
    'func'   => $id_func_sel,
    'codigo' => $buscar_codigo_val, 
    'desde'  => $fecha_desde_val,   
    'hasta'  => $fecha_hasta_val    
]);

$tbs->Show();
?>