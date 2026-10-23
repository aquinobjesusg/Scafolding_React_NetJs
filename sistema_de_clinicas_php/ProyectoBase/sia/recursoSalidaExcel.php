<?php
session_start();
include ("include/config.php");
require_once 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

// Conexión a la base de datos PostgreSQL usando PDO
$conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
$conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Variables para la consulta
$whereClauses = [];
$parametros = [];

// Procesar parámetros de filtro (POST o GET)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_almacen2 = trim($_POST['id_almacen2'] ?? '');

    $id_articulo2 = trim($_POST['id_articulo2'] ?? '');
    $fecha_desde = trim($_POST['fecha_desde'] ?? '');
    $fecha_hasta = trim($_POST['fecha_hasta'] ?? '');
} else {
    $id_almacen2 = trim($_GET['id_almacen2'] ?? '');

    $id_articulo2 = trim($_GET['id_articulo2'] ?? '');
    $fecha_desde = trim($_GET['fecha_desde'] ?? '');
    $fecha_hasta = trim($_GET['fecha_hasta'] ?? '');
}

// Construcción de filtros (igual que en tu listado)
if (!empty($id_almacen2) && $id_almacen2 != '0') {
    $whereClauses[] = "s.id_almacen = :id_almacen";
    $parametros[':id_almacen'] = $id_almacen2;
}


if (!empty($id_articulo2) && $id_articulo2 != '0') {
    $whereClauses[] = "s.id_articulo = :id_articulo";
    $parametros[':id_articulo'] = $id_articulo2;
}

if (!empty($fecha_desde) && !empty($fecha_hasta)) {
    $whereClauses[] = "s.fecha_salida BETWEEN :fecha_desde AND :fecha_hasta";
    $parametros[':fecha_desde'] = $fecha_desde;
    $parametros[':fecha_hasta'] = $fecha_hasta;
}

// Construir WHERE
$whereSql = '';
if (!empty($whereClauses)) {
    $whereSql = " WHERE " . implode(" AND ", $whereClauses);
}

// Consulta SQL (sin paginación para obtener todos los resultados)
$sql = "SELECT
            s.orden_salida,
            MAX(s.fecha_salida) AS fecha_salida,
         
            MAX(a.nom_almacen) AS almacen_principal,
            STRING_AGG(ar.nom_articulo || ' (' || s.cantidad_salida || ' unidades)', ', ') AS detalles_articulos,
            SUM(s.cantidad_salida) AS cantidad_total_distribuida,
            MAX(s.observacion_s) AS observacion_s
        FROM salida s
        LEFT JOIN almacen a ON a.id_almacen = s.id_almacen
        LEFT JOIN articulo ar ON ar.id_articulo = s.id_articulo" 
        . $whereSql . 
        " GROUP BY s.orden_salida
          ORDER BY MAX(s.fecha_salida) DESC, s.orden_salida DESC";

try {
    // Ejecutar consulta
    $stmt = $conexion_bd->prepare($sql);
    $stmt->execute($parametros);
    $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Crear nuevo Spreadsheet
    $spreadsheet = new Spreadsheet();
    $sheet = $spreadsheet->getActiveSheet();

    // Título del reporte
    $sheet->setCellValue('A1', 'REPORTE DE SALIDAS DE RECURSOS');
    $sheet->mergeCells('A1:G1');
    $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(16);
    $sheet->getStyle('A1')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

    // Información de filtros aplicados
    $fila_actual = 3;
    $filtros_aplicados = [];
    
    if (!empty($id_almacen2) && $id_almacen2 != '0') {
        // Obtener nombre del almacén
        $stmt_almacen = $conexion_bd->prepare("SELECT nom_almacen FROM almacen WHERE id_almacen = ?");
        $stmt_almacen->execute([$id_almacen2]);
        $almacen_nombre = $stmt_almacen->fetchColumn();
        $filtros_aplicados[] = "Almacén: " . $almacen_nombre;
    }
    
   
    
    if (!empty($id_articulo2) && $id_articulo2 != '0') {
        // Obtener nombre del artículo
        $stmt_art = $conexion_bd->prepare("SELECT nom_articulo FROM articulo WHERE id_articulo = ?");
        $stmt_art->execute([$id_articulo2]);
        $articulo_nombre = $stmt_art->fetchColumn();
        $filtros_aplicados[] = "Artículo: " . $articulo_nombre;
    }
    
    if (!empty($fecha_desde) && !empty($fecha_hasta)) {
        $filtros_aplicados[] = "Período: " . $fecha_desde . " al " . $fecha_hasta;
    }

    if (!empty($filtros_aplicados)) {
        $sheet->setCellValue('A2', 'Filtros aplicados: ' . implode(' | ', $filtros_aplicados));
        $sheet->mergeCells('A2:G2');
        $sheet->getStyle('A2')->getFont()->setItalic(true);
        $fila_actual = 4;
    }

    // Encabezados de columnas
    $encabezados = [
        'N°',
        'Orden Salida',
        'Fecha Salida',
        'Dependencia',
        'Almacén',
        'Artículos y Cantidades',
        'Cantidad Total',
        'Observaciones'
    ];

    $columna = 'A';
    foreach ($encabezados as $encabezado) {
        $sheet->setCellValue($columna . $fila_actual, $encabezado);
        $columna++;
    }

    // Estilo para encabezados
    $headerStyle = [
        'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
        'fill' => [
            'fillType' => Fill::FILL_SOLID,
            'startColor' => ['rgb' => '4472C4']
        ],
        'borders' => [
            'allBorders' => [
                'borderStyle' => Border::BORDER_THIN,
                'color' => ['rgb' => '000000']
            ]
        ],
        'alignment' => [
            'horizontal' => Alignment::HORIZONTAL_CENTER,
            'vertical' => Alignment::VERTICAL_CENTER
        ]
    ];
    
    $sheet->getStyle('A' . $fila_actual . ':H' . $fila_actual)->applyFromArray($headerStyle);

    // Datos
    $fila_actual++;
    $numero = 1;

    foreach ($resultados as $fila) {
        $sheet->setCellValue('A' . $fila_actual, $numero);
        $sheet->setCellValue('B' . $fila_actual, $fila['orden_salida']);
        $sheet->setCellValue('C' . $fila_actual, $fila['fecha_salida']);
 
        $sheet->setCellValue('E' . $fila_actual, $fila['almacen_principal']);
        $sheet->setCellValue('F' . $fila_actual, $fila['detalles_articulos']);
        $sheet->setCellValue('G' . $fila_actual, $fila['cantidad_total_distribuida']);
        $sheet->setCellValue('H' . $fila_actual, $fila['observacion_s']);
        
        $fila_actual++;
        $numero++;
    }

    // Ajustar anchos de columnas
    $sheet->getColumnDimension('A')->setWidth(8);  // N°
    $sheet->getColumnDimension('B')->setWidth(15); // Orden Salida
    $sheet->getColumnDimension('C')->setWidth(15); // Fecha
    $sheet->getColumnDimension('D')->setWidth(25); // Dependencia
    $sheet->getColumnDimension('E')->setWidth(25); // Almacén
    $sheet->getColumnDimension('F')->setWidth(40); // Artículos
    $sheet->getColumnDimension('G')->setWidth(15); // Cantidad Total
    $sheet->getColumnDimension('H')->setWidth(30); // Observaciones

    // Estilo para bordes de datos
    if ($fila_actual > 5) {
        $dataStyle = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000']
                ]
            ]
        ];
        $sheet->getStyle('A5:H' . ($fila_actual - 1))->applyFromArray($dataStyle);
    }

    // Ajustar alineación
    $sheet->getStyle('A:A')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
    $sheet->getStyle('B:B')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
    $sheet->getStyle('C:C')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
    $sheet->getStyle('G:G')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);



    // Preparar headers para descarga
    $filename = 'reporte_salidas_' . date('Y-m-d') . '.xlsx';

    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="' . $filename . '"');
    header('Cache-Control: max-age=0');
    header('Cache-Control: max-age=1');
    header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
    header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
    header('Cache-Control: cache, must-revalidate');
    header('Pragma: public');

    // Guardar y enviar archivo
    $writer = new Xlsx($spreadsheet);
    $writer->save('php://output');
    exit;

} catch (PDOException $e) {
    die("Error al generar el reporte: " . $e->getMessage());
} catch (Exception $e) {
    die("Error con PhpSpreadsheet: " . $e->getMessage());
}
?>