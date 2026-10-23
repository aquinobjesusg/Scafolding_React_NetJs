<?php
session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");
include_once ('funcs/funcs.php');

try {
    // 1. CONTROL DE ACCESO
    if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) {
        header("Location: index.php?valor=0");
        exit;
    }

    $usuario = $_SESSION['id_usuario'];
    $nombre = $_SESSION['nom_usuario'];
    $correo = $_SESSION['correo_usuario'];
    $super_admin = $_SESSION['super_admin'] ?? false;

    if (!$super_admin && !verificar_permiso_rapido('OTIC', 'consumible_registrar')) {
        header("Location: acceso_denegado.php");
        exit;
    }

    $tbs = new clsTinyButStrong;
    $tbs->LoadTemplate('consumiblesListado.html', 'UTF-8');

    // VERIFICAR QUE LAS VARIABLES DE CONFIGURACIÓN EXISTAN
    if (!isset($dbhost) || !isset($dbport) || !isset($dbdatabase) || !isset($dbuser) || !isset($dbpasswd)) {
        throw new Exception("Las variables de configuración de la base de datos no están definidas en config.php");
    }

    // 2. CONEXIÓN A LA BASE DE DATOS
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $whereClauses = []; 
    $parametros = [];   

  
    $listadoConsumiblesSqlBase = "SELECT c.id_consumibles,
                                         r.codigo_consumible,
                                         c.fecha_ingresoc,
                                         r.nom_consumible AS consumible,
                                         co.nom_color AS color,
                                         tc.nom_tipo_consumible AS tipo_consumible,
                                         r.marca_consumible AS marca,
                                         r.modelo_impresora,
                                         c.cantidad_ingresadac,
                                         m.nom_medida,
                                         c.observacionc
                                  FROM oticbienes.consumibles c
                                  INNER JOIN oticbienes.registro_consumibles r ON r.id_registro_consumible = c.id_registro_consumible
                                  LEFT JOIN oticbienes.colores co ON co.id_color = r.id_color
                                  LEFT JOIN oticbienes.tipos_consumibles tc ON tc.id_tipo_consumible = r.id_tipo_consumible
                                  LEFT JOIN medida m ON m.id_medida = r.id_medida
                                  WHERE c.estadoc IS TRUE";

    // 2. CONSULTA BASE DEL CONTEO (Corregida idéntica para que no rompa al buscar)
    $consumiblesConteoSqlBase = "SELECT COUNT(*) AS total
                                 FROM oticbienes.consumibles c
                                 INNER JOIN oticbienes.registro_consumibles r ON r.id_registro_consumible = c.id_registro_consumible
                                 LEFT JOIN medida m ON m.id_medida = r.id_medida
                                 WHERE c.estadoc IS TRUE";

    if (isset($_POST['Buscar'])) {
        $buscarCodigo = trim($_POST['codigo_consumible']);
        $fecha_desde = trim($_POST['fecha_desde']);
        $fecha_hasta = trim($_POST['fecha_hasta']);

        if (!empty($buscarCodigo)) {
            $whereClauses[] = "r.codigo_consumible = :buscar_codigo";
            $parametros[':buscar_codigo'] = $buscarCodigo;
        }

        if (!empty($fecha_desde) && !empty($fecha_hasta)) {
            $whereClauses[] = "c.fecha_ingresoc BETWEEN :fecha_desde AND :fecha_hasta";
            $parametros[':fecha_desde'] = $fecha_desde;
            $parametros[':fecha_hasta'] = $fecha_hasta;
        }
    } 

    $consumiblesConteoSqlFinal = $consumiblesConteoSqlBase;

    if (!empty($whereClauses)) {
        $consumiblesConteoSqlFinal .= " AND " . implode(" AND ", $whereClauses);
    }

    $consumiblesConteoPE = $conexion_bd->prepare($consumiblesConteoSqlFinal);
    $consumiblesConteoPE->execute($parametros);
    $consumiblesConteo = $consumiblesConteoPE->fetchColumn();

    $listadoConsumiblesSqlFinal = $listadoConsumiblesSqlBase;

    if (!empty($whereClauses)) {
        $listadoConsumiblesSqlFinal .= " AND " . implode(" AND ", $whereClauses);
    }

    $listadoConsumiblesSqlFinal .= " ORDER BY c.id_consumibles DESC;";

    $listadoConsumiblesPE = $conexion_bd->prepare($listadoConsumiblesSqlFinal);
    $listadoConsumiblesPE->execute($parametros);
    $listadoConsumibles = $listadoConsumiblesPE->fetchAll();

    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje'], $_SESSION['tipo_mensaje']);

    $tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
    $tbs->MergeBlock('consumiblesConteo', array(array('total' => $consumiblesConteo)));
    $tbs->MergeBlock('listadoConsumibles', $listadoConsumibles);
    $tbs->Show();

} catch (PDOException $e) {
    // Mostrar el error real para debugging
    echo "<div style='background:#f8d7da; color:#721c24; padding:15px; margin:10px; border-radius:5px; border:1px solid #f5c6cb;'>";
    echo "<strong>Error en la base de datos:</strong><br>";
    echo "Mensaje: " . $e->getMessage() . "<br>";
    echo "Código: " . $e->getCode() . "<br>";
    echo "Archivo: " . $e->getFile() . "<br>";
    echo "Línea: " . $e->getLine() . "<br>";
    echo "</div>";
    
    // Registrar en log del servidor
    error_log("Error PDO: " . $e->getMessage() . " en " . $e->getFile() . " línea " . $e->getLine());
    
} catch (Exception $e) {
    // Mostrar el error real para debugging
    echo "<div style='background:#f8d7da; color:#721c24; padding:15px; margin:10px; border-radius:5px; border:1px solid #f5c6cb;'>";
    echo "<strong>Error crítico:</strong><br>";
    echo "Mensaje: " . $e->getMessage() . "<br>";
    echo "Archivo: " . $e->getFile() . "<br>";
    echo "Línea: " . $e->getLine() . "<br>";
    echo "</div>";
    
    // Registrar en log del servidor
    error_log("Error general: " . $e->getMessage() . " en " . $e->getFile() . " línea " . $e->getLine());
}
?>