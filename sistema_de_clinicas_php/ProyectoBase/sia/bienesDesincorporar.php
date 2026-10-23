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
if (!$super_admin && !verificar_permiso_rapido('Bienes', 'bienes_desincorporar')) 
{
    header("Location: acceso_denegado.php");
    exit;
}

$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('bienesDesincorporar.html','UTF-8');

try 
{
    // --- 1. CONEXIÓN A LA BASE DE DATOS ---
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // --- 2. OBTENER LISTADO DE BIENES SIN FUNCIONARIO (Para el Select/Tabla en HTML) ---
    $sqlSelectBienes = "SELECT b.id_bienes, b.codigo_bienes, b.equipob, b.marca, b.serial 
                        FROM oticbienes.bienes b
                        LEFT JOIN oticbienes.distribucion d ON b.id_bienes = d.id_bienes
                        WHERE d.id_funcionario IS NULL";
    $res = $conexion_bd->query($sqlSelectBienes);
    $bienesSinFuncionario = $res->fetchAll(PDO::FETCH_ASSOC);

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
                    COALESCE(NULLIF(con.nom_concepto, ''), 'N/A') AS concepto,
                    COALESCE(NULLIF(b.precio_bien::text, ''), 'N/A') AS precio,
                    COALESCE(NULLIF(cb.nom_clasificacionbien, ''), 'N/A') AS clasificacion,
                    COALESCE(en.nom_ente, 'Sin asignar') AS ente,
                    COALESCE(dg.nom_direccion_general, 'Sin asignar') AS direccion_general,
                    COALESCE(dl.nom_direccion_linea, 'Sin asignar') AS direccion_linea,
                    COALESCE(coor.nom_coordinacion, 'Sin asignar') AS coordinacion,
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

   
   // --- 4. PROCESAMIENTO DEL FORMULARIO (POST) ---
    // --- 4. PROCESAMIENTO DEL FORMULARIO (POST) ---
    if(isset($_POST['Desincorporar']))
    {
        try {
            $id_bienes_array = $_POST['id_bienes'] ?? [];
            $observacion_motivo = $_POST['observaciond'] ?? ''; 
            $fecha_desinc = $_POST['fecha_distribucion'] ?? date('Y-m-d');

            if (empty($id_bienes_array) || $id_bienes_array[0] == "0") {
                throw new Exception("Debe seleccionar al menos un bien para desincorporar.");
            }

            $conexion_bd->beginTransaction();

            $sqlDeleteDist = "DELETE FROM oticbienes.distribucion WHERE id_bienes = :id";
            
            // CORRECCIÓN: Se añadió la coma antes de id_usuario
            $sqlUpdateBien = "UPDATE oticbienes.bienes 
                              SET id_estado = 1, 
                                  observacion_bien = :obs,
                                  id_usuario = :user 
                              WHERE id_bienes = :id";
            
            $stmtDel = $conexion_bd->prepare($sqlDeleteDist);
            $stmtUpd = $conexion_bd->prepare($sqlUpdateBien);

            foreach ($id_bienes_array as $id_bien) {
                $id_bien = (int)$id_bien;
                if ($id_bien > 0) {
                    // Quitamos asignación
                    $stmtDel->execute([':id' => $id_bien]);

                    // Actualizamos bien y disparamos el trigger
                    $stmtUpd->execute([
                        ':id'   => $id_bien,
                        ':obs'  => $observacion_motivo,
                        ':user' => $usuario 
                    ]);
                }
            }

            $conexion_bd->commit();
            $_SESSION['mensaje'] = "Bien desincorporado exitosamente.";
            $_SESSION['tipo_mensaje'] = 'success';
            
            header("Location: bienesListado.php");
            exit();

        } catch (Exception $e) {
            if ($conexion_bd->inTransaction()) $conexion_bd->rollBack();
            $_SESSION['mensaje'] = "Error en el proceso: " . $e->getMessage();
            $_SESSION['tipo_mensaje'] = 'danger';
        }
    }

} catch (Exception $sqlError) 
{
    $_SESSION['mensaje'] = 'Error: ' . $sqlError->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
    header("Location: bienesDesincorporar.php");
    exit();
} 

try {
    // Asegúrate de que el nombre sea id_estado y no estado
    $bienesSql = "SELECT b.id_bienes, b.codigo_bienes, b.equipob 
                  FROM oticbienes.bienes b
                  LEFT JOIN oticbienes.distribucion d ON b.id_bienes = d.id_bienes
                  WHERE b.id_estado != 1 
                    /* AND b.id_clasificacionbien != 1 */
                    AND d.id_funcionario IS NULL";
    
    $resBienes = $conexion_bd->query($bienesSql);
    $bienes = $resBienes->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    // Si hay error en la consulta, lo guardamos para mostrarlo
    $mensaje = "Error en la consulta de bienes: " . $e->getMessage();
    $tipo_mensaje = 'danger';
    $bienes = []; // Evita que TBS falle por variable inexistente
}

// --- 6. MANEJO DE MENSAJES Y RENDER ---
$mensaje = $mensaje ?? ($_SESSION['mensaje'] ?? null);
$tipo_mensaje = $tipo_mensaje ?? ($_SESSION['tipo_mensaje'] ?? null);
unset($_SESSION['mensaje'], $_SESSION['tipo_mensaje']);

// Fusionar datos con el template
$tbs->MergeBlock('msj', [['mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje]]);
$tbs->MergeBlock('bienesSinAsignar', $bienes);
$tbs->Show();
?>