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

$usuario = $_SESSION['id_usuario'];
$nombre = $_SESSION['nom_usuario'];
$correo = $_SESSION['correo_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;

// VERIFICACIÓN DE PERMISOS
if (!$super_admin && !verificar_permiso_rapido('OTIC', 'consumible_ver_stock')) {
    header("Location: acceso_denegado.php");
    exit;
}
    $tbs = new clsTinyButStrong;
    $tbs->LoadTemplate('consumiblesDisponible.html','UTF-8');
    try
    {
    //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 

         
        // --- Variables para la construcción dinámica de la consulta ---

        $whereClauses = [];
        $parametros = [];

        // --- 1. Lógica para construir las cláusulas WHERE basadas en el formulario ---
        if (isset($_POST['Buscar'])) {
            $buscarCodigo = trim($_POST['codigo_consumible'] ?? ''); 
            $buscarConsumible = trim($_POST['nombre_consumible'] ?? '');

            if (!empty($buscarCodigo)) {
                $whereClauses[] = "c.codigo_consumible ILIKE :buscar_codigo";
                $parametros[':buscar_codigo'] = '%' . $buscarCodigo . '%';
            }

            if (!empty($buscarConsumible)) {
                $whereClauses[] = "c.consumible ILIKE :buscar_consumible";
                $parametros[':buscar_consumible'] = '%' . $buscarConsumible . '%';
            }
          
        }

    
        $listadoConsumiblesSqlFinal = "
            SELECT
                c.codigo_consumible,
                c.consumible,
                m.nom_medida,
                SUM(s.cantidad_disponible) AS total_disponible,
                c.observacionc
            FROM oticbienes.consumibles c
            LEFT JOIN medida m ON m.id_medida = c.id_medida
            LEFT JOIN oticbienes.stockc s ON s.id_consumibles = c.id_consumibles
        ";

        //Where dinamico
        if (!empty($whereClauses)) {
            $listadoConsumiblesSqlFinal .= " WHERE " . implode(" AND ", $whereClauses);
        }

         //Grupo dinamico
        $listadoConsumiblesSqlFinal .= "
            GROUP BY c.codigo_consumible, c.consumible, m.nom_medida, c.observacionc
        ";

        //Orden dinamico
        $listadoConsumiblesSqlFinal .= " ORDER BY c.codigo_consumible ASC;";

        // Preparar y ejecutar la consulta del listado 
        $consumiblesL = $conexion_bd->prepare($listadoConsumiblesSqlFinal);
        $consumiblesL->execute($parametros);
        $consumiblesDisponiblesListado = $consumiblesL->fetchAll(PDO::FETCH_ASSOC);

        // Lógica para la Consulta de Conteo 
        $consumiblesConteoSqlFinal = "
            SELECT COUNT(DISTINCT c.codigo_consumible) AS total_filtrados
            FROM oticbienes.consumibles c
            LEFT JOIN medida m ON m.id_medida = c.id_medida
            LEFT JOIN oticbienes.stockc s ON s.id_consumibles = c.id_consumibles
        ";

       
        if (!empty($whereClauses)) {
            $consumiblesConteoSqlFinal .= " WHERE " . implode(" AND ", $whereClauses);
        }

        $consumiblesC = $conexion_bd->prepare($consumiblesConteoSqlFinal);
        $consumiblesC->execute($parametros);
        $totalFiltrados = $consumiblesC->fetchColumn();

        // Seleccionable
        $consumibles = "SELECT DISTINCT consumible FROM oticbienes.consumibles ORDER BY consumible;";
        $stmt_select = $conexion_bd->prepare($consumibles);
        $stmt_select->execute();
        $consumiblesOptions = $stmt_select->fetchAll(PDO::FETCH_ASSOC);

        
        $tbs->MergeBlock('consumibles', $consumiblesOptions);
        $tbs->MergeBlock('consumiblesDisponiblesListado', $consumiblesDisponiblesListado);
        $tbs->MergeBlock('consumiblesConteo', [['total' => $totalFiltrados]]);
        $tbs->Show();

    } catch (PDOException $e) {
        echo "<h1>Error de Base de Datos:</h1>";
        echo "<p>" . $e->getMessage() . "</p>";
        error_log("Error de Base de Datos: " . $e->getMessage());
        exit();
    } catch (Exception $e) {
        echo "<h1>Ocurrió un Error:</h1>";
        echo "<p>" . $e->getMessage() . "</p>";
        error_log("Error general: " . $e->getMessage());
        exit();
    }

?>