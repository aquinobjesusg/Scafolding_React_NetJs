<?php
// 1. Configuración de errores y sesión
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

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
$super_admin = $_SESSION['super_admin'] ?? false;

if (!$super_admin && !verificar_permiso_rapido('Bienes', 'bienes_listado')) {
    header("Location: acceso_denegado.php");
    exit;
}

// 2. CONEXIÓN GLOBAL PDO
try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// --- 3. LÓGICA AJAX: DETALLES DEL BIEN ---
if (isset($_POST['action']) && $_POST['action'] === 'get_bien_details') {
    ob_clean();
    $id_bienes = $_POST['id_bienes'] ?? 0;
    $bienDetailsSql = "
        SELECT 
            b.codigo_viejo, 
            b.codigo_bienes AS codigo_nuevo, 
            b.equipob AS equipo,
            b.fecha_ingresob, 
            b.marca,         
            b.modelo,        
            b.serial,        
            b.color,         
            b.especificacion, 
            b.fecha_adquisicion, 
            b.precio_bien,
            COALESCE(con.nom_concepto, 'N/A') AS concepto,        
            COALESCE(e.nom_estado, 'N/A') AS estado,
            COALESCE(en.nom_ente, 'Sin asignar') AS ente,
            COALESCE(dg.nom_direccion_general, 'Sin asignar') AS direccion_general,
            COALESCE(dl.nom_direccion_linea, 'Sin asignar') AS direccion_linea,
            COALESCE(c.nom_coordinacion, 'Sin asignar') AS coordinacion,
            COALESCE(f.nom_funcionario || ' ' || f.ape_funcionario, 'Sin asignar') AS funcionario
        FROM oticbienes.bienes b
        LEFT JOIN oticbienes.estado e ON b.id_estado = e.id_estado
        LEFT JOIN oticbienes.distribucion d ON b.id_bienes = d.id_bienes
        LEFT JOIN oticbienes.concepto con ON b.id_concepto = con.id_concepto
        LEFT JOIN public.ente en ON d.id_ente = en.id_ente
        LEFT JOIN public.funcionario f ON d.id_funcionario = f.id_funcionario
        LEFT JOIN public.coordinacion c ON f.id_coordinacion = c.id_coordinacion
        LEFT JOIN public.direccion_linea dl ON c.id_direccion_linea = dl.id_direccion_linea
        LEFT JOIN public.direccion_general dg ON dl.id_direccion_general = dg.id_direccion_general
        WHERE b.id_bienes = :id_bienes";
    
    $stmt = $conexion_bd->prepare($bienDetailsSql);
    $stmt->execute([':id_bienes' => $id_bienes]);
    echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    exit;
}
// --- 4. LÓGICA AJAX: SELECTS DEPENDIENTES ---
if (isset($_POST['action']) && $_POST['action'] === 'get_dependientes') {
    ob_clean();
    $tipo = $_POST['tipo'] ?? '';
    $id_padre = $_POST['id_padre'] ?? 0;
    $sql = "";

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
            $sql = "SELECT id_funcionario AS id, (nom_funcionario || ' ' || ape_funcionario) AS nombre FROM funcionario WHERE id_coordinacion = :id ORDER BY nombre";
            break;
    }

    if ($sql != "") {
        $stmt = $conexion_bd->prepare($sql);
        $stmt->execute([':id' => $id_padre]);
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
    exit;
}

// --- 5. PROCESAMIENTO DEL FORMULARIO (POST ASIGNAR) ---
if (isset($_POST['Asignar'])) {
    try {
        $fecha_distribucion = !empty($_POST['fecha_distribucion']) ? $_POST['fecha_distribucion'] : null;
        $id_funcionario = filter_input(INPUT_POST, 'id_funcionario', FILTER_VALIDATE_INT);
        $id_ente = filter_input(INPUT_POST, 'id_ente', FILTER_VALIDATE_INT);
        
        // NUEVOS CAMPOS CAPTURADOS DEL FORMULARIO
        $id_direccion_general = filter_input(INPUT_POST, 'id_direccion_general', FILTER_VALIDATE_INT);
        $id_direccion_linea = filter_input(INPUT_POST, 'id_direccion_linea', FILTER_VALIDATE_INT);
        $id_coordinacion = filter_input(INPUT_POST, 'id_coordinacion', FILTER_VALIDATE_INT);
        
        $id_bienes_array = $_POST['id_bienes'] ?? [];
        $observaciond = htmlspecialchars($_POST['observaciond'] ?? '');

        if (!$fecha_distribucion || !$id_funcionario || !$id_ente || empty($id_bienes_array)) {
            throw new Exception("Faltan datos obligatorios.");
        }

        $conexion_bd->beginTransaction();

        // CONSULTA ACTUALIZADA CON TODOS LOS CAMPOS

        $distSql = "INSERT INTO oticbienes.distribucion 
                    (id_usuario, fecha_distribucion, id_bienes, id_funcionario, id_ente, 
                     id_direccion_general, id_direccion_linea, id_coordinacion, observaciond) 
                    VALUES (:u, :f, :b, :fun, :ente, :id_dg, :id_dl, :id_coor, :o)";
        
        $stmtDist = $conexion_bd->prepare($distSql);

        foreach ($id_bienes_array as $id_bien) {
            $id_bien = (int)$id_bien;
            if ($id_bien > 0) {
                $stmtDist->execute([
                    ':u'    => $usuario, 
                    ':f'    => $fecha_distribucion, 
                    ':b'    => $id_bien, 
                    ':fun'  => $id_funcionario, 
                    ':ente' => $id_ente,
                    ':id_dg' => $id_direccion_general,
                    ':id_dl' => ($id_direccion_linea > 0) ? $id_direccion_linea : null,
                    ':id_coor' => ($id_coordinacion > 0) ? $id_coordinacion : null,
                    ':o'    => $observaciond
                ]);
            }
        }

        $conexion_bd->commit();
        // ... resto del código de éxito
        $_SESSION['mensaje'] = "Asignación exitosa.";
        $_SESSION['tipo_mensaje'] = "success";
        header("Location: bienesListado.php");
        exit;

    } catch (Exception $e) {
        if ($conexion_bd->inTransaction()) $conexion_bd->rollBack();
        $_SESSION['mensaje'] = "Error: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = "danger";
        header("Location: bienesAsignar.php");
        exit;
    }
}

// --- 6. CARGA INICIAL DE LA PÁGINA (TBS) ---
// Consultas para llenar los primeros niveles
$enteSql = "SELECT id_ente, nom_ente FROM public.ente ORDER BY nom_ente ASC";
$entes = $conexion_bd->query($enteSql)->fetchAll(PDO::FETCH_ASSOC);

$bienesSql = "SELECT b.id_bienes, b.codigo_bienes, b.equipob 
              FROM oticbienes.bienes b
              LEFT JOIN oticbienes.distribucion d ON b.id_bienes = d.id_bienes
              WHERE /* b.id_clasificacionbien != 1  
                AND */ d.id_funcionario IS NULL 
                AND b.id_estado != 1";

$bienes = $conexion_bd->query($bienesSql)->fetchAll(PDO::FETCH_ASSOC);


// Iniciar TBS
$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('bienesAsignar.html', 'UTF-8');

// Manejo de mensajes de sesión
$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje'], $_SESSION['tipo_mensaje']);


// Fusionar bloques
$tbs->MergeBlock('msj', [['mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje]]);
$tbs->MergeBlock('ente', $entes); // Solo cargamos el primer nivel
$tbs->MergeBlock('bienesSinAsignar', $bienes);

$tbs->Show();