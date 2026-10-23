<?php
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Color;

// # Funciona que hace el Select
// function MostrarExcel($conexion_bd,$cedula_buscar) {
// $codigo = '';

// $sql_busca_ced = "SELECT id_titular, cedula_titular, nombre_titular, apellido_titular FROM titular WHERE cedula_titular = :cedula LIMIT 1";
// $stmt_b = $conexion_bd->prepare($sql_busca_ced);
// $stmt_b->execute([':cedula' => $cedula_buscar]);
// $resultado = $stmt_b->fetch(PDO::FETCH_ASSOC);

// return $resultado;
// }
function MostrarExcel($conexion_bd, $ltitulo, $vsql, $mi_busqueda_html, $encabezados, $campos)
{

    // Crear Excel
    $spreadsheet = new Spreadsheet();

    $mi_busqueda_html = '';

    $sheet = $spreadsheet->getActiveSheet();
    $sheet->setTitle($ltitulo);

    // ENCABEZADOS
    // $encabezados = ['ID', 'Fecha', 'Especialidad', 'Titular', 'Cédula Titular', 'Paciente', 'Cédula Paciente', 'Fecha Nac.', 'Sexo', 'Edad', 'Diagnóstico', 'Teléfono', 'Universidad/Ente', 'Motivo Consulta', 'Traslados', 'Observaciones'];

    // Escribir encabezados
    $columna = 'A';
    foreach ($encabezados as $encabezado) {
        $sheet->setCellValue($columna . '1', $encabezado);
        $columna = chr(ord($columna) + 1);
    }
    $rangoF = $columna;

    $lista = SelectFrom($conexion_bd, $vsql);
    $ultimaFila = count($lista) + 1;
    $fila = 2;
    $columna = 'A';
    // foreach ($datosFila as $valor) {
    // $sheet->setCellValue($columna . $fila, $valor);
    // $columna++;
    // }
    // $fila++;
    foreach ($lista as $registro) {
        // $enc == 1;
        $columna = 'A';
        foreach ($campos as $camp) {
            $valor = $registro[$camp];
            $sheet->setCellValue($columna . $fila, $valor);
            $columna = chr(ord($columna) + 1);
            // $enc = $enc + 1;
        }

        $fila ++;
    }

    // 1. ESTILO PARA ENCABEZADOS (Fondo azul, texto blanco, negrita)
    $headerStyle = [
        'font' => [
            'bold' => true,
            'color' => [
                'rgb' => 'FFFFFF'
            ],
            'size' => 11
        ],
        'fill' => [
            'fillType' => Fill::FILL_SOLID,
            'startColor' => [
                'rgb' => '2E75B6'
            ] // Azul profesional
        ],
        'alignment' => [
            'horizontal' => Alignment::HORIZONTAL_LEFT,
            'vertical' => Alignment::VERTICAL_CENTER
        ],
        'borders' => [
            'allBorders' => [
                'borderStyle' => Border::BORDER_THIN,
                'color' => [
                    'rgb' => '000000'
                ]
            ]
        ]
    ];

    // $rangoF--;

    // echo $rangoF;
    // die();

    $sheet->getStyle('A1:' . $rangoF . '1')->applyFromArray($headerStyle);

    // 2. ESTILO PARA DATOS (Alineación izquierda, bordes)
    $dataStyle = [
        'alignment' => [
            'horizontal' => Alignment::HORIZONTAL_LEFT,
            'vertical' => Alignment::VERTICAL_CENTER
        ],
        'borders' => [
            'allBorders' => [
                'borderStyle' => Border::BORDER_THIN,
                'color' => [
                    'rgb' => 'DDDDDD'
                ]
            ]
        ]
    ];

    $sheet->getStyle('A2:' . $rangoF . $ultimaFila)->applyFromArray($dataStyle);

    // 3. ESTILO PARA FILAS ALTERNADAS (Zebra effect)
    for ($fila = 2; $fila <= $ultimaFila; $fila ++) {
        if ($fila % 2 == 0) {
            // Filas pares - fondo gris muy claro
            $sheet->getStyle('A' . $fila . ':' . $rangoF . $fila)
                ->getFill()
                ->setFillType(Fill::FILL_SOLID)
                ->getStartColor()
                ->setARGB('FFF2F2F2');
        }
    }

    // 4. AUTO-AJUSTAR COLUMNAS AL CONTENIDO
    foreach (range('A', $rangoF) as $columna) {
        $sheet->getColumnDimension($columna)->setAutoSize(true);
    }

    // 5. ALTURA DE FILAS
    $sheet->getRowDimension(1)->setRowHeight(25); // Encabezados más altos
    for ($fila = 2; $fila <= $ultimaFila; $fila ++) {
        $sheet->getRowDimension($fila)->setRowHeight(20);
    }

    // 6. CONGELAR ENCABEZADOS (para scroll)
    $sheet->freezePane('A2');

    // ====================
    // 💾 DESCARGAR ARCHIVO
    // ====================
    $mesParam = 'archivo';
    $filename = $ltitulo . '_' . preg_replace('/[^a-zA-Z0-9]/', '_', $mesParam) . '.xlsx';

    header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    header('Content-Disposition: attachment;filename="' . $filename . '"');
    header('Cache-Control: max-age=0');
    header('Pragma: no-cache');
    header('Expires: 0');

    $writer = new Xlsx($spreadsheet);
    $writer->save('php://output');

    // $codigoHTML = '';

    // $datos_titulares = SelectFrom( $conexion_bd, $vsql );
    // $lista = $datos_titulares;

    // $codigoHTML = $codigoHTML .'<div class="container-fluid px-4 pb-5">';

    // $ttitulo = '<div class="row mb-4">
    // <div class="col-12 text-center">
    // <br>
    // <h2 class="fw-bold text-dark mb-1">'.$ltitulo.'</h2>
    // </div>
    // </div>';

    // $codigoHTML = $codigoHTML . $ttitulo;

    // $codigoHTML = $codigoHTML .'<div class="card shadow-sm border-0 btn-rounded">
    // <div class="card-body p-4">
    // <div class="row align-items-end mb-4 p-3 buscar-contenedor g-3">';

    // $codigoHTML = $codigoHTML . $mi_busqueda_html;

    // $codigoHTML = $codigoHTML . '<div class="table-responsive rounded-3 shadow-sm">
    // <table class="table table-hover table-striped align-middle mb-0 bg-white" id="tabla_titulares">'
    // ;

    // Escribir encabezados
    // $tencabezado = '<thead class="table-sgp-azul text-center"><tr>';
    // $enc = 1;
    // foreach ($encabezados as $encabezado) {
    // if ($enc == 1) {
    // $tencabezado = $tencabezado . '<th style="width: 5%;">' . $encabezado . '</th>';
    // } else {
    // $tencabezado = $tencabezado . '<th>' . $encabezado . '</th>';
    // }
    // $enc = $enc + 1;
    // }
    // $tencabezado = $tencabezado . '<th style="width: 15%;">Acciones</th>';
    // $tencabezado = $tencabezado . '</tr></thead>';

    // $codigoHTML = $codigoHTML . $tencabezado;

    // DATOS
    // $tdatos = '<tbody>
    // <tr class="text-center">';

    // $fila = 1;

    // foreach ($lista as $registro) {
    // $enc == 1;
    // foreach ($campos as $camp) {
    // $valor = $registro[$camp];
    // if ($enc == 1) {
    // // $tdatos = $tdatos . '<th style="width: 5%;">'. $valor .'</th>';
    // $tdatos = $tdatos . '<td class="text-muted small">' . $valor . '</td>';
    // } else {
    // // $tdatos = $tdatos . '<th>' . $valor . '</th>';
    // $tdatos = $tdatos . '<td class="text-start">' . $valor . '</td>';
    // }
    // $enc = $enc + 1;
    // }

    // $fila++;
    // }
    // $tdatos = $tdatos . '</tr>
    // </tbody>';

    // $codigoHTML = $codigoHTML . $tdatos;

    // $codigoHTML = $codigoHTML .'</table>
    // </div>
    // </div>
    // <div>';

    return true;
}

