<?php
session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");
include_once ('funcs/funcs.php');
include_once ('funcs/funcionAuditoriaBien.php');

if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) {
    header("Location: index.php?valor=0");
    exit;
}

$usuario = $_SESSION['id_usuario'];
$nombre = $_SESSION['nom_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// --- LÓGICA AJAX ---
if (isset($_POST['action'])) {
    ob_clean();
    header('Content-Type: application/json');

    try {
        if ($_POST['action'] === 'get_bien_details') {
            $id_bienes = $_POST['id_bienes'] ?? 0;
            $sql = "SELECT 
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
                        COALESCE(cb.nom_clasificacionbien, 'Sin asignar') AS clasificacion,
                        COALESCE(en.nom_ente, 'Sin asignar') AS ente,
                        COALESCE(dg.nom_direccion_general, 'Sin asignar') AS direccion_general,
                        COALESCE(dl.nom_direccion_linea, 'Sin asignar') AS direccion_linea,
                        COALESCE(coord.nom_coordinacion, 'Sin asignar') AS coordinacion,
                        COALESCE(f.nom_funcionario || ' ' || f.ape_funcionario, 'Sin asignar') AS funcionario
                    FROM oticbienes.bienes b
                    LEFT JOIN oticbienes.estado e ON b.id_estado = e.id_estado 
                    LEFT JOIN oticbienes.concepto con ON b.id_concepto = con.id_concepto
                    LEFT JOIN oticbienes.clasificacionbien cb ON b.id_clasificacionbien = cb.id_clasificacionbien
                    LEFT JOIN oticbienes.distribucion d ON b.id_bienes = d.id_bienes
                    LEFT JOIN public.ente en ON d.id_ente = en.id_ente
                    LEFT JOIN public.funcionario f ON d.id_funcionario = f.id_funcionario
                    LEFT JOIN public.coordinacion coord ON f.id_coordinacion = coord.id_coordinacion
                    LEFT JOIN public.direccion_linea dl ON coord.id_direccion_linea = dl.id_direccion_linea
                    LEFT JOIN public.direccion_general dg ON dl.id_direccion_general = dg.id_direccion_general
                    WHERE b.id_bienes = :id";
            $stmt = $conexion_bd->prepare($sql);
            $stmt->execute([':id' => $id_bienes]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // Verifica qué datos estás recibiendo (para debug)
            error_log(print_r($result, true));
            
            echo json_encode($result);
        } 
        
        if ($_POST['action'] === 'get_bienes_por_funcionario') {
            $id_fun = $_POST['id_funcionario'] ?? 0;
            $sql = "SELECT b.id_bienes, b.codigo_bienes, b.equipob 
                    FROM oticbienes.distribucion d
                    JOIN oticbienes.bienes b ON d.id_bienes = b.id_bienes
                    WHERE d.id_funcionario = :id /* AND b.id_clasificacionbien != 1 */
                    AND b.id_estado != 1";
            $stmt = $conexion_bd->prepare($sql);
            $stmt->execute([':id' => $id_fun]);
            echo json_encode(['bienes' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
        }

        if ($_POST['action'] === 'get_dependientes') {
            $tipo = $_POST['tipo'] ?? '';
            $id = $_POST['id_padre'] ?? 0;
            $sql = "";
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
                case 'funcionario': 
                    $sql = "SELECT id_funcionario AS id, (nom_funcionario || ' ' || ape_funcionario) AS nombre 
                            FROM public.funcionario 
                            WHERE id_coordinacion = :id ORDER BY nombre"; 
                    break;
            }
            if ($sql != "") {
                $stmt = $conexion_bd->prepare($sql);
                $stmt->execute([':id' => $id]);
                echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
            }
        }
    } catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
    exit;
}

// --- PROCESAMIENTO POST (REASIGNAR) ---
if (isset($_POST['Reasignar'])) {
    try {
        $conexion_bd->beginTransaction();
        $id_bienes = $_POST['id_bienes'] ?? [];
        $stmt = $conexion_bd->prepare("UPDATE oticbienes.distribucion 
                                      SET id_usuario = :u, 
                                          fecha_distribucion = :f, 
                                          id_funcionario = :fun, 
                                          id_ente = :ente, 
                                          observaciond = :o 
                                      WHERE id_bienes = :id_b");
        
        foreach ($id_bienes as $id) {
            $stmt->execute([
                ':u' => $usuario, 
                ':f' => $_POST['fecha_distribucion'], 
                ':fun' => $_POST['id_funcionarioD'],
                ':ente' => $_POST['id_enteD'], 
                ':o' => $_POST['observaciond'], 
                ':id_b' => (int)$id
            ]);
        }
        $conexion_bd->commit();
        // ... resto del código de éxito
        $_SESSION['mensaje'] = "Reasignación exitosa.";
        $_SESSION['tipo_mensaje'] = "success";
        header("Location: bienesListado.php");
        exit;
      
    } catch (Exception $e) {
        if ($conexion_bd->inTransaction()) $conexion_bd->rollBack();
        $_SESSION['mensaje'] = "Error: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = "danger";
        header("Location: bienesReasignar.php");
        exit;
    }
}

// --- CARGA TBS ---
$entes = $conexion_bd->query("SELECT id_ente, nom_ente FROM public.ente ORDER BY nom_ente ASC")
                     ->fetchAll(PDO::FETCH_ASSOC);



$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('bienesReasignar.html', 'UTF-8');



$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;


$tbs->MergeBlock('msj', [['mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje]]);
$tbs->MergeBlock('ente', $entes);   // Para Origen
$tbs->MergeBlock('enteD', $entes);  // Para Destino
$tbs->Show();
?>