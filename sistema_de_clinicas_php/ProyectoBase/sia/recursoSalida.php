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
$correo = $_SESSION['correo_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;

if (!$super_admin && !verificar_permiso_rapido('Almacén', 'almacen_distribuir')) {
    header("Location: acceso_denegado.php");
    exit;
}

$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('recursoSalida.html','UTF-8');

$ente = null;
$almacen = null;
$mensaje = null;
$tipo_mensaje = null;

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 

    // --- LÓGICA AJAX: SELECTS DEPENDIENTES ---
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
        }

        if ($sql != "") {
            $stmt = $conexion_bd->prepare($sql);
            $stmt->execute([':id' => $id_padre]);
            echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        }
        exit;
    }

    // Consultas para carga inicial de la página
    $enteSql = "SELECT id_ente, nom_ente FROM public.ente ORDER BY nom_ente ASC";
    $entes = $conexion_bd->query($enteSql)->fetchAll(PDO::FETCH_ASSOC);
    $almacenQuery = "SELECT * FROM almacen ORDER BY id_almacen DESC";

    function preGenerarOrdenSalida($conexion_bd) {
        $anioActual = date('Y');
        $mesActual = date('m');
        $ordenSalidaQuery = "SELECT orden_salida FROM salida WHERE orden_salida LIKE :anio_mes ORDER BY orden_salida DESC LIMIT 1";
        $anioMesPattern = $anioActual . '-' . $mesActual . '-%';
        $stmt_ordenSalida = $conexion_bd->prepare($ordenSalidaQuery);
        $stmt_ordenSalida->execute([':anio_mes' => $anioMesPattern]);
        $ultimaOrden = $stmt_ordenSalida->fetch(PDO::FETCH_ASSOC); 

        if ($ultimaOrden && !empty($ultimaOrden['orden_salida'])) {
            $partes = explode('-', $ultimaOrden['orden_salida']);
            $ultimoContador = intval(end($partes));
            $nuevoContador = $ultimoContador + 1;
        } else {
            $nuevoContador = 1;
        }
        return $anioActual . '-' . $mesActual . '-' . str_pad($nuevoContador, 3, "0", STR_PAD_LEFT);
    }

    $ordenParaMostrar = preGenerarOrdenSalida($conexion_bd);
    $ordenCompleta = $ordenParaMostrar;

    // --- PROCESAR REGISTRO ---
    if (isset($_POST['Registrar'])) 
    {
        if (!isset($_POST['id_articulo']) || !is_array($_POST['id_articulo']) || count($_POST['id_articulo']) == 0) {
             throw new Exception("Debe seleccionar al menos un artículo para la salida.");
        }

        $conexion_bd->beginTransaction();

        // Verificar si la orden ya existe
        $stmtVerificar = $conexion_bd->prepare("SELECT COUNT(*) as existe FROM salida WHERE orden_salida = :orden");
        $stmtVerificar->execute([':orden' => $ordenCompleta]);
        if ($stmtVerificar->fetch(PDO::FETCH_ASSOC)['existe'] > 0) {
            $ordenCompleta = preGenerarOrdenSalida($conexion_bd);
        }

        // 1. Sentencia SQL con las nuevas columnas de dirección
        $salidaInsert = "INSERT INTO salida (
            id_usuario, orden_salida, fecha_salida, id_ente, id_almacen, 
            id_articulo, cantidad_salida, observacion_s, 
            id_direccion_general, id_direccion_linea, id_coordinacion
        ) VALUES (
            :id_usuario, :orden_salida, :fecha_salida, :id_ente, :id_almacen, 
            :id_articulo, :cantidad_salida, :observacion_s,
            :id_dg, :id_dl, :id_co
        )";
        $stmtInsertSalida = $conexion_bd->prepare($salidaInsert);

        $stockUpdate = "UPDATE stock SET cantidad_disponible = cantidad_disponible - :cant, cantidad_salida = cantidad_salida + :cant2 
                        WHERE id_articulo = :id_art AND id_almacen = :id_alm AND cantidad_disponible >= :cant3";
        $stmtUpdateStock = $conexion_bd->prepare($stockUpdate);

        // Capturar datos de cabecera
        $id_almacen = $_POST['id_almacen'];
        $id_ente = $_POST['id_ente'];
        $fecha_salida = $_POST['fecha_salida'];
        
        // Manejo de nulos para selects dependientes
        $id_dg = (!empty($_POST['id_direccion_general']) && $_POST['id_direccion_general'] != "0") ? $_POST['id_direccion_general'] : null;
        $id_dl = (!empty($_POST['id_direccion_linea']) && $_POST['id_direccion_linea'] != "0") ? $_POST['id_direccion_linea'] : null;
        $id_co = (!empty($_POST['id_coordinacion']) && $_POST['id_coordinacion'] != "0") ? $_POST['id_coordinacion'] : null;

        $articulos_registrados = 0;
        $total_articulos = count($_POST['id_articulo']);

        for ($i = 0; $i < $total_articulos; $i++) {
            $id_articulo = $_POST['id_articulo'][$i];
            $cantidad = (int)$_POST['cantidad_salida'][$i];
            $observacion = $_POST['observacion_s'][$i];

            if ($cantidad <= 0 || empty($id_articulo)) continue;

            // Actualizar Stock
            $stmtUpdateStock->execute([
                ':cant' => $cantidad, ':cant2' => $cantidad, ':cant3' => $cantidad,
                ':id_art' => $id_articulo, ':id_alm' => $id_almacen
            ]);

            if ($stmtUpdateStock->rowCount() === 0) {
                throw new Exception("Stock insuficiente para el Artículo ID: " . $id_articulo);
            }

            // Insertar Salida con direcciones
            $stmtInsertSalida->execute([
                ':id_usuario'   => $usuario,
                ':orden_salida' => $ordenCompleta,
                ':fecha_salida' => $fecha_salida,
                ':id_ente'      => $id_ente,
                ':id_almacen'   => $id_almacen,
                ':id_articulo'  => $id_articulo,
                ':cantidad_salida' => $cantidad,
                ':observacion_s'   => $observacion,
                ':id_dg' => $id_dg,
                ':id_dl' => $id_dl,
                ':id_co' => $id_co
            ]);
            $articulos_registrados++;
        }
        
        if ($articulos_registrados == 0) throw new Exception("No se registraron artículos.");
        
        $conexion_bd->commit(); 
        $_SESSION['mensaje'] = "Registro exitoso. Orden: $ordenCompleta";
        $_SESSION['tipo_mensaje'] = 'success';
        header("Location: recursoSalida.php"); 
        exit();
    }
} catch (Exception $e) {
    if (isset($conexion_bd) && $conexion_bd->inTransaction()) $conexion_bd->rollBack();
    $_SESSION['mensaje'] = "Error: " . $e->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
}

// Renderizado TBS
$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje'], $_SESSION['tipo_mensaje']);

$tbs->MergeBlock('ente', $entes); 
$tbs->MergeBlock('almacen', $conexion_bd, $almacenQuery);
$tbs->MergeField('orden_salida_auto', $ordenParaMostrar); 
$tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
$tbs->Show();
?>