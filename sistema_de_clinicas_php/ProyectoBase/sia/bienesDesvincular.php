<?php
session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");
include_once ('funcs/funcs.php');
include_once ('funcs/funcionAuditoriaBien.php');

if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) 
{
    header("Location: index.php?valor=0");
    exit;
}

$usuario = $_SESSION['id_usuario'];
$nombre = $_SESSION['nom_usuario'];
$correo = $_SESSION['correo_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;

// VERIFICACIÓN DE PERMISOS
if (!$super_admin && !verificar_permiso_rapido('Bienes', 'bienes_desvincular')) 
{
    header("Location: acceso_denegado.php");
    exit;
}

try 
{
    // --- 1. CONEXIÓN A LA BASE DE DATOS (Se abre primero para que esté disponible en AJAX) ---
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // --- 2. LÓGICA AJAX: SELECTS DEPENDIENTES ---
    if (isset($_POST['action']) && $_POST['action'] === 'get_dependientes') {
        ob_clean();
        header('Content-Type: application/json');
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
                $sql = "SELECT id_funcionario AS id, (nom_funcionario || ' ' || ape_funcionario) AS nombre FROM public.funcionario WHERE id_coordinacion = :id ORDER BY nombre";
                break;
        }

        if ($sql != "") {
            $stmt = $conexion_bd->prepare($sql);
            $stmt->execute([':id' => $id_padre]);
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
        exit;
    }

    // --- 3. LÓGICA AJAX: DETALLES DEL BIEN ---
    if (isset($_POST['action']) && $_POST['action'] === 'get_bien_details') {
        ob_clean();
        header('Content-Type: application/json');
        try {
            $id_bienes = $_POST['id_bienes'] ?? 0;
            $bienDetailsSql = "
                                SELECT
                                    COALESCE(NULLIF(b.codigo_viejo, ''), 'N/A') AS codigo_viejo,
                                    b.codigo_bienes AS codigo_nuevo,
                                    b.fecha_ingresob AS fecha_ingreso,
                                    b.equipob AS equipo,
                                    COALESCE(NULLIF(b.marca, ''), 'N/A') AS marca,
                                    COALESCE(NULLIF(b.modelo, ''), 'N/A') AS modelo,
                                    COALESCE(NULLIF(b.serial, ''), 'N/A') AS serial,
                                    COALESCE(NULLIF(b.color, ''), 'N/A') AS color,
                                    e.nom_estado AS estado,
                                    COALESCE(NULLIF(b.especificacion, ''), 'N/A') AS especificacion,
                                    COALESCE(NULLIF(b.fecha_adquisicion::text, ''), 'N/A') AS fecha_adquisicion,
                                    COALESCE(NULLIF(con.nom_concepto, ''), 'N/A') AS concepto, -- Cambiado alias a con
                                    COALESCE(NULLIF(b.precio_bien::text, ''), 'N/A') AS precio,
                                    COALESCE(NULLIF(cb.nom_clasificacionbien, ''), 'N/A') AS clasificacion,
                                    COALESCE(en.nom_ente, 'Sin asignar') AS ente,
                                    COALESCE(dg.nom_direccion_general, 'Sin asignar') AS direccion_general,
                                    COALESCE(dl.nom_direccion_linea, 'Sin asignar') AS direccion_linea,
                                    COALESCE(coor.nom_coordinacion, 'Sin asignar') AS coordinacion, -- Cambiado alias a coor
                                    COALESCE(f.nom_funcionario || ' ' || f.ape_funcionario, 'Sin asignar') AS funcionario
                                FROM oticbienes.bienes b
                                LEFT JOIN oticbienes.estado e on b.id_estado = e.id_estado
                                LEFT JOIN oticbienes.concepto con on b.id_concepto = con.id_concepto
                                LEFT JOIN oticbienes.clasificacionbien cb ON b.id_clasificacionbien = cb.id_clasificacionbien
                                LEFT JOIN oticbienes.distribucion d ON b.id_bienes = d.id_bienes
                                LEFT JOIN public.ente en ON d.id_ente = en.id_ente
                                LEFT JOIN public.funcionario f ON d.id_funcionario = f.id_funcionario
                                LEFT JOIN public.coordinacion coor ON f.id_coordinacion = coor.id_coordinacion
                                LEFT JOIN public.direccion_linea dl ON coor.id_direccion_linea = dl.id_direccion_linea
                                LEFT JOIN public.direccion_general dg ON dl.id_direccion_general = dg.id_direccion_general
                                WHERE b.id_bienes = :id_bienes;
                            ";
            $stmt = $conexion_bd->prepare($bienDetailsSql);
            $stmt->bindParam(':id_bienes', $id_bienes, PDO::PARAM_INT);
            $stmt->execute();
            echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
        } catch (Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);
        }
        exit;
    }

    // --- 4. LÓGICA AJAX: BIENES POR FUNCIONARIO ---
    if (isset($_POST['action']) && $_POST['action'] === 'get_bienes_por_funcionario') {
        ob_clean();
        header('Content-Type: application/json');
        $id_funcionario = $_POST['id_funcionario'] ?? 0;
        $bienesFuncionarioSql = "SELECT b.id_bienes, b.codigo_bienes, b.equipob 
                                 FROM oticbienes.distribucion d
                                 LEFT JOIN oticbienes.bienes b ON d.id_bienes = b.id_bienes
                                 WHERE d.id_consumibles IS NULL AND d.id_funcionario = :id_funcionario;";
        $stmt = $conexion_bd->prepare($bienesFuncionarioSql);
        $stmt->execute([':id_funcionario' => $id_funcionario]);
        echo json_encode(['bienes' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
        exit;
    }

    // --- 5. CARGA INICIAL DE ENTES (TBS) ---
    $enteSql = "SELECT id_ente, nom_ente FROM public.ente ORDER BY nom_ente ASC";
    $entes = $conexion_bd->query($enteSql)->fetchAll(PDO::FETCH_ASSOC);

    // --- 6. PROCESAMIENTO DEL FORMULARIO (POST) ---
    if(isset($_POST['Desvincular']))
    {
        $conexion_bd->beginTransaction();
        
        $fecha_distribucion = !empty(trim($_POST['fecha_distribucion'])) ? trim($_POST['fecha_distribucion']) : null;
        $id_funcionario = filter_input(INPUT_POST, 'id_funcionario', FILTER_VALIDATE_INT);
        $observaciond = !empty(trim($_POST['observaciond'])) ? htmlspecialchars(trim($_POST['observaciond'])) : null;

        $id_bienes = [];
        if (isset($_POST['id_bienes']) && is_array($_POST['id_bienes'])) {
            foreach ($_POST['id_bienes'] as $bien_id) {
                $bien_id_sanitized = filter_var($bien_id, FILTER_VALIDATE_INT);
                if ($bien_id_sanitized !== false) $id_bienes[] = $bien_id_sanitized;
            }
        }

        // Variables de sesión PostgreSQL
        $conexion_bd->exec("SET miphp.tipo_cambio = 'Desincorporado'");
        $conexion_bd->exec("SET miphp.id_usuario = '{$usuario}'");
        $conexion_bd->exec("SET miphp.fecha_desincorporacion = '{$fecha_distribucion}'");
        $conexion_bd->exec("SET miphp.observacion_desincorporacion = '{$observaciond}'");

        $distribucionDesincorporarSql = "DELETE FROM oticbienes.distribucion
                                         WHERE id_funcionario = :id_funcionario AND id_bienes = :id_bienes;";
        $distribucionDesincorporarPE = $conexion_bd->prepare($distribucionDesincorporarSql);

        foreach ($id_bienes as $id_bien) {
            
            $distribucionDesincorporarPE->execute([
                ':id_funcionario' => $id_funcionario,
                ':id_bienes' => $id_bien
            ]);
        }

        $conexion_bd->commit();
        
        // Reset Variables
        $conexion_bd->exec("RESET miphp.tipo_cambio");
        $conexion_bd->exec("RESET miphp.id_usuario");
        $conexion_bd->exec("RESET miphp.fecha_desincorporacion");
        $conexion_bd->exec("RESET miphp.observacion_desincorporacion");

        $_SESSION['mensaje'] = 'Movimiento realizado exitosamente.';
        $_SESSION['tipo_mensaje'] = 'success';
        header("Location: bienesListado.php");
        exit();
    }

} 
catch (PDOException $sqlError) 
{
    if (isset($conexion_bd) && $conexion_bd->inTransaction()) $conexion_bd->rollBack();
    
    // Resetear en caso de error si la conexión existe
    if (isset($conexion_bd)) {
        $conexion_bd->exec("RESET miphp.tipo_cambio");
        $conexion_bd->exec("RESET miphp.id_usuario");
        $conexion_bd->exec("RESET miphp.fecha_desincorporacion");
        $conexion_bd->exec("RESET miphp.observacion_desincorporacion");
    }

    $_SESSION['mensaje'] = 'Error: ' . $sqlError->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
    header("Location: bienesDesvincular.php");
    exit();
} 
finally 
{
    
}

// --- 7. RENDERIZADO CON TINYBUTSTRONG ---
$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('bienesDesvincular.html','UTF-8');

$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje'], $_SESSION['tipo_mensaje']);

$tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
$tbs->MergeBlock('ente', $entes); 
$tbs->Show();
?>