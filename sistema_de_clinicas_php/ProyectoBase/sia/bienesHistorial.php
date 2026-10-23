<?php
session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");
include_once ('funcs/funcs.php');

// 1. VERIFICACIÓN DE SESIÓN
if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) {
    header("Location: index.php?valor=0");
    exit;
}

$usuario = $_SESSION['id_usuario'];
$nombre = $_SESSION['nom_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;

// 2. VERIFICACIÓN DE PERMISOS
if (!$super_admin && !verificar_permiso_rapido('Bienes', 'bienes_historial')) {
    header("Location: acceso_denegado.php");
    exit;
}

// 3. INICIALIZACIÓN DE VARIABLES
$tbs = new clsTinyButStrong;
$historialBien = array();
$buscar_codigo = "";
$datosBien = array(); // Para mostrar info general del bien arriba de la tabla

try {
    // Conexión a la base de datos
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


if (isset($_POST['action']) && $_POST['action'] === 'get_bien_details') {
    ob_clean();
    header('Content-Type: application/json');
    try {
        $id_h = (int)$_POST['id_bienes']; 
        
        $sql = "SELECT 
            detalles_json->>'codigo_bienes' AS codigo_nuevo,
            detalles_json->>'codigo_viejo' AS codigo_viejo,
            detalles_json->>'fecha_ingresob' AS fecha_ingresob,
            detalles_json->>'equipob' AS equipo,
            detalles_json->>'marca' AS marca,
            detalles_json->>'modelo' AS modelo,
            detalles_json->>'serial' AS serial,
            detalles_json->>'color' AS color,
            detalles_json->>'especificacion' AS especificacion,
            detalles_json->>'fecha_adquisicion' AS fecha_adquisicion,
            detalles_json->>'precio_bien' AS precio_bien,

            
            -- CLASIFICACIÓN: Usando los nombres de tabla y campos que indicaste
            (SELECT nom_clasificacionbien 
             FROM oticbienes.clasificacionbien 
             WHERE id_clasificacionbien = (NULLIF(detalles_json->>'id_clasificacionbien', '')::int)
            ) AS clasificacion,

            -- ESTADO Y CONCEPTO
            (SELECT nom_estado FROM oticbienes.estado WHERE id_estado = (NULLIF(detalles_json->>'id_estado', '')::int)) as estado,
            (SELECT nom_concepto FROM oticbienes.concepto WHERE id_concepto = (NULLIF(detalles_json->>'id_concepto', '')::int)) as concepto,
            
            -- ESTRUCTURA ORGANIZATIVA (DIRECCIONES)
            (SELECT ent.nom_ente FROM public.ente ent WHERE ent.id_ente = (NULLIF(detalles_json->>'id_ente', '')::int)) as ente,
            (SELECT dg.nom_direccion_general FROM public.direccion_general dg WHERE dg.id_direccion_general = (NULLIF(detalles_json->>'id_direccion_general', '')::int)) as direccion_general,
            
            -- DIRECCIÓN DE LÍNEA
            (SELECT dl.nom_direccion_linea 
             FROM public.direccion_linea dl 
             WHERE dl.id_direccion_linea = (NULLIF(detalles_json->>'id_direccion_linea', '')::int)
            ) as direccion_linea,
            
            -- COORDINACIÓN
            (SELECT c.nom_coordinacion 
             FROM public.coordinacion c 
             WHERE c.id_coordinacion = (NULLIF(detalles_json->>'id_coordinacion', '')::int)
            ) as coordinacion,

            (SELECT f.nom_funcionario || ' ' || f.ape_funcionario FROM public.funcionario f WHERE f.id_funcionario = (NULLIF(detalles_json->>'id_funcionario', '')::int)) as funcionario,
            observaciones as observacion,
             (SELECT nom_usuario || ' ' || ape_usuario FROM public.usuario WHERE id_usuario = (NULLIF(detalles_json->>'id_usuario', '')::int)) as nombre_completo_usuario
        FROM oticbienes.historial_bienes
        WHERE id_historial = :id";

        // --- LAS LÍNEAS QUE FALTABAN ---
        $stmt = $conexion_bd->prepare($sql);
        $stmt->execute([':id' => $id_h]);
        $res = $stmt->fetch(PDO::FETCH_ASSOC);
        // -------------------------------
        
        echo json_encode($res ? $res : ['error' => 'No se encontró el registro histórico']);
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit;
}
   
    if (isset($_POST['Buscar'])) {
        // 1. Recibimos el código y quitamos espacios
        $entrada_codigo = trim($_POST['buscar_codigo']);

        // 2. Aplicamos el reemplazo: de comilla simple (') a guion (-)
        $buscar_codigo = str_replace("'", "-", $entrada_codigo);

        // A. BUSCAR INFORMACIÓN BÁSICA DEL BIEN
        $bienSql = "SELECT id_bienes, codigo_bienes, equipob, marca, modelo, serial 
                    FROM oticbienes.bienes 
                    WHERE codigo_bienes = :buscar_codigo";
        $bienPE = $conexion_bd->prepare($bienSql);
        $bienPE->execute([':buscar_codigo' => $buscar_codigo]);
        $datosBien = $bienPE->fetch(PDO::FETCH_ASSOC);

        if ($datosBien) {
                $idBien = $datosBien['id_bienes'];

         
          // B. CONSULTAR EL HISTORIAL CENTRALIZADO
            $sql = "SELECT 
                        h.id_historial as id_historial,
                        -- LÓGICA DE FECHA DINÁMICA
                        CASE 
                            WHEN h.accion = 'REGISTRO' THEN COALESCE(NULLIF(h.detalles_json->>'fecha_ingresob', ''), h.fecha_evento::text)
                            WHEN h.accion IN ('ASIGNACION', 'REASIGNACION') THEN COALESCE(NULLIF(h.detalles_json->>'fecha_distribucion', ''), h.fecha_evento::text)
                            ELSE h.fecha_evento::text -- Para DESINCORPORACION o quitar asignación
                        END as fecha, 
                        
                        h.accion as tipo_movimiento,
                        COALESCE(
                            (SELECT f.nom_funcionario || ' ' || f.ape_funcionario 
                             FROM public.funcionario f 
                             WHERE f.id_funcionario = (NULLIF(h.detalles_json->>'id_funcionario', '')::int)),
                            CASE 
                                WHEN h.accion IN ('REGISTRO', 'EDICION', 'DESINCORPORACION') THEN 'N/A'
                                ELSE 'SIN ASIGNAR'
                            END
                        ) as funcionario,
                        h.observaciones as observacion
                    FROM oticbienes.historial_bienes h
                    WHERE h.id_bien = :idBien AND h.accion != 'EDICION'
                    ORDER BY h.fecha_evento DESC";
            
            $stmt = $conexion_bd->prepare($sql);
            $stmt->execute([':idBien' => $idBien]);
            
            // Importante: TBS necesita un array para MergeBlock
            $historialBien = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if (empty($historialBien)) {
                $_SESSION['mensaje'] = 'El bien existe pero no tiene eventos registrados en la tabla de auditoría.';
                $_SESSION['tipo_mensaje'] = 'info';
            }
        } else {
            $_SESSION['mensaje'] = 'No se encontró ningún bien con el código: ' . $buscar_codigo;
            $_SESSION['tipo_mensaje'] = 'danger';
        }
    }
} catch (PDOException $sqlError) {
    $_SESSION['mensaje'] = 'Error de base de datos: ' . $sqlError->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
} finally {
    
}

// 4. GESTIÓN DE MENSAJES PARA EL USUARIO
$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje'], $_SESSION['tipo_mensaje']);

// 5. RENDERIZADO CON TBS
$tbs->LoadTemplate('bienesHistorial.html', 'UTF-8');

// Combinamos bloques
$tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
$tbs->MergeBlock('datosBien', array($datosBien)); 
$tbs->MergeBlock('historialBien', $historialBien);
$codigo_buscado = $buscar_codigo;
$tbs->MergeBlock('busqueda', array(array('codigo' => $buscar_codigo)));

$tbs->Show();
?>