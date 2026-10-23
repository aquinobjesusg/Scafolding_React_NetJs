<?php
session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");
include_once ('funcs/funcs.php');

require_once 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx; 
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;

if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) {
    header("Location: index.php?valor=0");
    exit;
}

$usuario = $_SESSION['id_usuario'];
$nombre = $_SESSION['nom_usuario'];
$correo = $_SESSION['correo_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;

// VERIFICACIÓN DE PERMISOS
if (!$super_admin && !verificar_permiso_rapido('Almacén', 'almacen_ver_stock')) {
    header("Location: acceso_denegado.php");
    exit;
}


$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('recursoDisponible.html','UTF-8');

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
    
    $disponible = '';
    $almacen = "SELECT * FROM almacen ORDER BY nom_almacen ;";
    $articulo = "SELECT * FROM articulo ORDER BY nom_articulo ;";

    if (!isset($_POST['Buscar'])){
        $queryConteoStock = "SELECT COUNT(*) AS total FROM stock WHERE cantidad_disponible != 0;";
        $stmtConteoStock = $conexion_bd->prepare($queryConteoStock);
        $stmtConteoStock->execute();
        $totalRegistros = $stmtConteoStock->fetchColumn(0); 

        $consultaDisponible = "SELECT 
                                a2.nom_articulo, 
                                a.nom_almacen, 
                                c.nom_clasificacion,  
                                m.nom_medida,      
                                st.cantidad_disponible AS disponible
                            FROM ingreso i
                            INNER JOIN almacen a ON a.id_almacen = i.id_almacen
                            INNER JOIN articulo a2 ON a2.id_articulo = i.id_articulo
                            INNER JOIN medida m ON m.id_medida = a2.id_medida        
                            INNER JOIN clasificacion c ON c.id_clasificacion = a2.id_clasificacion 
                            INNER JOIN stock st ON st.id_articulo = a2.id_articulo AND st.id_almacen = a.id_almacen
                            ORDER BY a2.nom_articulo, a.nom_almacen;";
     
        $stmtConsultaDisponible = $conexion_bd->prepare($consultaDisponible);
        $stmtConsultaDisponible->execute();
        $disponible = $stmtConsultaDisponible->fetchAll(PDO::FETCH_ASSOC);

    } else {
        $id_articulo = $_POST['id_articulo'] ?? 0;
        $id_almacen = $_POST['id_almacen'] ?? 0;

        $queryBusquedaStock = "SELECT COUNT(*) AS total 
                                FROM stock 
                                WHERE (id_articulo = :id_articulo OR :id_articulo = 0) 
                                AND (id_almacen = :id_almacen OR :id_almacen = 0);";

        $stmtBusquedaStock = $conexion_bd->prepare($queryBusquedaStock);
        $stmtBusquedaStock->bindParam(':id_articulo', $id_articulo, PDO::PARAM_INT);
        $stmtBusquedaStock->bindParam(':id_almacen', $id_almacen, PDO::PARAM_INT);
        $stmtBusquedaStock->execute();
        $totalRegistros = $stmtBusquedaStock->fetchColumn(0); 

        $consultaDisponible = "SELECT DISTINCT 
                                a2.nom_articulo, 
                                a.nom_almacen, 
                                c.nom_clasificacion, 
                                m.nom_medida, 
                                st.cantidad_disponible AS disponible
                            FROM ingreso i
                            INNER JOIN almacen a ON a.id_almacen = i.id_almacen
                            INNER JOIN articulo a2 ON a2.id_articulo = i.id_articulo
                            INNER JOIN medida m ON m.id_medida = a2.id_medida      
                            INNER JOIN clasificacion c ON c.id_clasificacion = a2.id_clasificacion  
                            INNER JOIN stock st ON st.id_articulo = a2.id_articulo AND st.id_almacen = a.id_almacen
                            WHERE (i.id_articulo = :id_articulo OR :id_articulo = 0) 
                            AND (a.id_almacen = :id_almacen OR :id_almacen = 0)
                            ORDER BY a2.nom_articulo, a.nom_almacen;";
      
        $stmtConsultaDisponible = $conexion_bd->prepare($consultaDisponible);
        $stmtConsultaDisponible->bindParam(':id_articulo', $id_articulo, PDO::PARAM_INT);
        $stmtConsultaDisponible->bindParam(':id_almacen', $id_almacen, PDO::PARAM_INT);
        $stmtConsultaDisponible->execute();
        $disponible = $stmtConsultaDisponible->fetchAll(PDO::FETCH_ASSOC);
    }

    // VERIFICAR PERMISO PARA EXPORTAR EXCEL - CORRECCIÓN ADICIONAL
    if (isset($_POST['excel'])) {
        
        // Verificar permiso de exportación
        if (!$super_admin && !verificar_permiso_rapido('Almacén', 'almacen_exportar_datos')) {
            $_SESSION['mensaje'] = "No tiene permisos para exportar datos.";
            $_SESSION['tipo_mensaje'] = 'warning';
            header("Location: index.php");
            exit;
        }

        // 2. Definición de encabezados
        $encabezadosPersonalizados = [
            'Artículo',
            'Almacén',
            'Clasificación',
            'Medida',
            'Disponible'
        ];

        $consultaExcel = "SELECT
                                a2.nom_articulo AS Articulo,
                                a.nom_almacen AS Almacen,
                                c.nom_clasificacion AS Clasificacion,
                                m.nom_medida AS Medida,
                                st.cantidad_disponible AS Disponible
                            FROM ingreso i
                            INNER JOIN almacen a ON a.id_almacen = i.id_almacen
                            INNER JOIN articulo a2 ON a2.id_articulo = i.id_articulo
                            INNER JOIN medida m ON m.id_medida = a2.id_medida
                            INNER JOIN clasificacion c ON c.id_clasificacion = a2.id_clasificacion
                            INNER JOIN stock st ON st.id_articulo = a2.id_articulo AND st.id_almacen = a.id_almacen
                            ORDER BY a2.nom_articulo, a.nom_almacen;";

        $stmtExcel = $conexion_bd->prepare($consultaExcel);
        $stmtExcel->execute();
        $data = $stmtExcel->fetchAll(PDO::FETCH_ASSOC);

        if (empty($data)) {
            $_SESSION['mensaje'] = "No hay datos para exportar a Excel.";
            $_SESSION['tipo_mensaje'] = 'warning';
            header("Location: index.php");
            exit;
        }

        // --- Generación del Archivo XLSX ---

        // 4. Crear un nuevo objeto Spreadsheet
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // 5. Encabezados (fila 1)
        $sheet->fromArray($encabezadosPersonalizados, NULL, 'A1');
        
        // 6. Datos (fila 2)
        $sheet->fromArray($data, NULL, 'A2');
        
        // Estilos y determinar rango
        $numRows = count($data);
        $numCols = count($encabezadosPersonalizados);
        $lastColumn = \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($numCols);
        $headerRange = 'A1:' . $lastColumn . '1';
        $dataRange = 'A1:' . $lastColumn . ($numRows + 1); // Rango que incluye encabezados y datos

        $headerStyle = [
            'font' => ['bold' => true, 'color' => ['rgb' => '050505']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'color' => ['rgb' => 'CFF4FC']],
            'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN]],
        ];
        
        // Aplicar estilo al encabezado
        $sheet->getStyle($headerRange)->applyFromArray($headerStyle);
        
        // Auto-ajustar ancho de columnas
        foreach (range('A', $lastColumn) as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }
        
        // 8. Filtro de búsqueda al rango de datos completo
        $sheet->setAutoFilter($dataRange); 
        
        // 9. Configurar y enviar la descarga
        $filename = "Disponibles-" . date('dmY') . ".xlsx";
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="' . $filename . '"');
        header('Cache-Control: max-age=0');
        
        $writer = new Xlsx($spreadsheet);
        $writer->save('php://output');
        exit;
    }

} catch (PDOException $e) {
    if (isset($conexion_bd) && $conexion_bd->inTransaction()) {
        $conexion_bd->rollBack(); 
    }
    $_SESSION['mensaje'] = "Error de base de datos: " . $e->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
    error_log("Error en index.php (PDOException): " . $e->getMessage());

} catch (Exception $e) {
    if (isset($conexion_bd) && $conexion_bd->inTransaction()) {
        $conexion_bd->rollBack();
    }
    $_SESSION['mensaje'] = "Error inesperado: " . $e->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
    error_log("Error en index.php (Exception): " . $e->getMessage());
}
    
$tbs->MergeBlock('articulo', $conexion_bd, $articulo ?? null);
$tbs->MergeBlock('almacen', $conexion_bd, $almacen ?? null);
$tbs->MergeBlock('disponible', $disponible); 
$tbs->MergeBlock('conteoStock', array(array('total' => $totalRegistros)));
$tbs->Show();
exit;
?>