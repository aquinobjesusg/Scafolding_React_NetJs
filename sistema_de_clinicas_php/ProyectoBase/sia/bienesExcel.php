<?php
    session_start();
    include ("include/config.php");
    require_once 'vendor/autoload.php';

    use PhpOffice\PhpSpreadsheet\Spreadsheet;
    use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
    use PhpOffice\PhpSpreadsheet\Style\Fill;
    use PhpOffice\PhpSpreadsheet\Style\Border;
    use PhpOffice\PhpSpreadsheet\Style\Alignment;

    try {
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // --- 1. CONSTRUCCIÓN DE FILTROS ---
        // Nota: Asegúrate de que los nombres en $_POST coincidan con tu formulario HTML
        $whereClauses = [
  
        ];
        $parametros = [];

        if (!empty($_POST['buscar_codigo'])) {
            $whereClauses[] = "(b.codigo_bienes ILIKE :buscar_codigo OR b.codigo_viejo ILIKE :buscar_codigo)";
            $parametros[':buscar_codigo'] = "%" . trim($_POST['buscar_codigo']) . "%";
        }

        // Filtros Jerárquicos (Corregidos para usar el alias 'ent' o 'dg')
        if (!empty($_POST['id_funcionario']) && $_POST['id_funcionario'] != '0') {
            $whereClauses[] = "f.id_funcionario = :id_f";
            $parametros[':id_f'] = $_POST['id_funcionario'];
        } elseif (!empty($_POST['id_coordinacion']) && $_POST['id_coordinacion'] != '0') {
            $whereClauses[] = "coor.id_coordinacion = :id_c";
            $parametros[':id_c'] = $_POST['id_coordinacion'];
        } elseif (!empty($_POST['id_direccion_linea']) && $_POST['id_direccion_linea'] != '0') {
            $whereClauses[] = "dl.id_direccion_linea = :id_dl";
            $parametros[':id_dl'] = $_POST['id_direccion_linea'];
        } elseif (!empty($_POST['id_direccion_general']) && $_POST['id_direccion_general'] != '0') {
            $whereClauses[] = "dg.id_direccion_general = :id_dg";
            $parametros[':id_dg'] = $_POST['id_direccion_general'];
        } elseif (!empty($_POST['id_ente']) && $_POST['id_ente'] != '0') {
            $whereClauses[] = "ent.id_ente = :id_ente"; 
            $parametros[':id_ente'] = $_POST['id_ente'];
        }

        if (!empty($_POST['fecha_desde']) && !empty($_POST['fecha_hasta'])) {
            $whereClauses[] = "b.fecha_ingresob BETWEEN :desde AND :hasta";
            $parametros[':desde'] = $_POST['fecha_desde'];
            $parametros[':hasta'] = $_POST['fecha_hasta'];
        }

        $sqlWhere = (count($whereClauses) > 0) ? " WHERE " . implode(" AND ", $whereClauses) : "";

        // --- 2. CONSULTA SQL ROBUSTA ---
       $listadoBienesSql = "SELECT 
                                b.codigo_bienes, 
                                b.fecha_ingresob, 
                                b.codigo_viejo, 
                                b.equipob, 
                                b.marca, 
                                b.modelo, 
                                b.serial, 
                                b.color, 
                                b.especificacion, 
                                b.fecha_adquisicion, 
                                b.precio_bien,
                                e.nom_estado, 
                                c.nom_concepto, 
                                cb.nom_clasificacionbien,
                                ent.nom_ente, 
                                dg.nom_direccion_general, 
                                dl.nom_direccion_linea, 
                                coor.nom_coordinacion, 
                                COALESCE(f.nom_funcionario || ' ' || f.ape_funcionario, 'Sin asignar') AS funcionario_nombre
                                FROM oticbienes.bienes b 
                                LEFT JOIN oticbienes.estado e ON b.id_estado = e.id_estado
                                LEFT JOIN oticbienes.concepto c ON b.id_concepto = c.id_concepto
                                LEFT JOIN oticbienes.clasificacionbien cb ON b.id_clasificacionbien = cb.id_clasificacionbien
                                LEFT JOIN oticbienes.distribucion d ON b.id_bienes = d.id_bienes
                                -- Primero unimos el funcionario que está en la tabla distribución
                                LEFT JOIN public.funcionario f ON d.id_funcionario = f.id_funcionario
                                -- Luego la coordinación del funcionario
                                LEFT JOIN public.coordinacion coor ON f.id_coordinacion = coor.id_coordinacion
                                -- Luego la línea de esa coordinación
                                LEFT JOIN public.direccion_linea dl ON coor.id_direccion_linea = dl.id_direccion_linea
                                -- Luego la dirección general de esa línea
                                LEFT JOIN public.direccion_general dg ON dl.id_direccion_general = dg.id_direccion_general
                                -- Y finalmente el ente de esa dirección general
                                LEFT JOIN public.ente ent ON dg.id_ente = ent.id_ente
                                $sqlWhere 
                                ORDER BY b.fecha_ingresob DESC";
        $stmt = $conexion_bd->prepare($listadoBienesSql);
        $stmt->execute($parametros);
        $listadoBienes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // --- 3. EXCEL CONFIG ---
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        
        // Encabezados exactos (19 columnas: A hasta S)
        $encabezados = [
            'Fecha Incorporación', 'Cod. Nuevo', 'Cod. Viejo', 'Equipo', 'Marca', 'Modelo', 'Serial', 
            'Color', 'Estado', 'Especificaciones', 'Clasificación', 'Fecha de Adquisición', 
            'Concepto', 'Precio (Bs)', 'Ente', 'Dir. General', 'Dir. Línea', 'Coordinación', 'Funcionario'
        ];
        $sheet->fromArray($encabezados, NULL, 'A1');

       // --- 4. LLENADO DE DATOS CON MAPEO MANUAL ---
        $i = 2;
        foreach ($listadoBienes as $b) {
            // Formatear Fecha de Ingreso (A)
            $fechaIngreso = ($b['fecha_ingresob'] && $b['fecha_ingresob'] !== '0000-00-00') 
                ? date('d-m-Y', strtotime($b['fecha_ingresob'])) 
                : 'S/F';
            $sheet->setCellValue("A$i", $fechaIngreso);

            $sheet->setCellValue("B$i", $b['codigo_bienes']);
            $sheet->setCellValue("C$i", $b['codigo_viejo']);
            $sheet->setCellValue("D$i", $b['equipob']);
            $sheet->setCellValue("E$i", $b['marca']);
            $sheet->setCellValue("F$i", $b['modelo']);
            $sheet->setCellValue("G$i", $b['serial']);
            $sheet->setCellValue("H$i", $b['color']);
            $sheet->setCellValue("I$i", $b['nom_estado']);
            $sheet->setCellValue("J$i", $b['especificacion']);
            $sheet->setCellValue("K$i", $b['nom_clasificacionbien']);
            $fechaAdq = ($b['fecha_adquisicion'] && $b['fecha_adquisicion'] !== '0000-00-00') 
                ? date('d-m-Y', strtotime($b['fecha_adquisicion'])) 
                : 'S/F';
            $sheet->setCellValue("L$i", $fechaAdq);
            $sheet->setCellValue("M$i", $b['nom_concepto']);
            $sheet->setCellValue("N$i", $b['precio_bien']);
            $sheet->getStyle("N$i")->getNumberFormat()->setFormatCode('#,##0.00');
            $sheet->setCellValue("O$i", !empty($b['nom_ente']) ? $b['nom_ente'] : 'No asignado');
            $sheet->setCellValue("P$i", !empty($b['nom_direccion_general']) ? $b['nom_direccion_general'] : 'No asignado');
            $sheet->setCellValue("Q$i", !empty($b['nom_direccion_linea']) ? $b['nom_direccion_linea'] : 'No asignado');
            $sheet->setCellValue("R$i", !empty($b['nom_coordinacion']) ? $b['nom_coordinacion'] : 'No asignado');
            $sheet->setCellValue("S$i", !empty($b['funcionario_nombre']) ? $b['funcionario_nombre'] : 'Sin funcionario');

            $i++;
        }
        // --- 5. AUTO-FILTRO Y ESTILOS ---
        $lastRow = $i - 1;
        $sheet->setAutoFilter("A1:S$lastRow"); // ¡Esto activa las flechitas de filtro en Excel!

        // Ajuste de columnas
        foreach (range('A', 'S') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Estilo de cabecera
        $sheet->getStyle('A1:S1')->applyFromArray([
            'font' => ['bold' => true, 'color' => ['rgb' => '000000']],
            'fill' => ['fillType' => Fill::FILL_SOLID, 'startColor' => ['rgb' => 'CFF4FC']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER]
        ]);

        // --- 6. DESCARGA ---
        $fechaHoy = date('d-m-Y'); 
        $nombreArchivo = "Reporte_Bienes_" . $fechaHoy . ".xlsx";

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="' . $nombreArchivo . '"');
        header('Cache-Control: max-age=0');

        $writer = new Xlsx($spreadsheet);
        $writer->save('php://output');
        exit;
    } catch (Exception $e) {
        die("Error crítico: " . $e->getMessage());
    }