<?php
session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");
include_once ('funcs/funcs.php');
require_once('vendor/autoload.php');
include ("include/variables.php");

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

$conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
$conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (isset($_POST['Reporte'])) {
    $orden = $_POST['orden_salida'];

    $consultaR = "SELECT s.orden_salida, s.fecha_salida, 
                         a.nom_articulo, m.nom_medida, 
                         s.cantidad_salida
                  FROM salida s
                
                  INNER JOIN articulo a ON s.id_articulo = a.id_articulo
                  INNER JOIN medida m ON m.id_medida = a.id_medida
                  WHERE s.orden_salida = :orden";

    try {
        $stmt = $conexion_bd->prepare($consultaR);
        $stmt->bindParam(':orden', $orden, PDO::PARAM_STR);
        $stmt->execute();
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if (empty($rows)) {
            die('No se encontraron registros para la orden especificada.');
        }

        $primerRegistro = $rows[0];

        class MiPDF extends TCPDF {
            function Header() {
                // Imagen de cabecera (180mm de ancho según tu ajuste)
                $this->Image('/var/www/html/sia/imagenes/cabeceraMppeuSep2025.png', 10, 8, 180);
                $this->Ln(25);
            }

            function Footer() {
                $this->SetY(-15);
                $this->SetFont('helvetica', 'I', 8);
                $this->Cell(0, 10, 'Sistema de Información de Almacén', 0, 0, 'C');
                $this->SetFont('helvetica', 'I', 7);
                $this->Cell(0, 10, $this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, 0, 'R');
            }
        }

        $pdf = new MiPDF('P', 'mm', 'A4');
        // Margen superior en 40 para dar espacio al Header
        $pdf->SetMargins(20, 40, 20);
        $pdf->SetAutoPageBreak(true, 25);
        $pdf->AddPage();

        // --- FECHA Y ORDEN ---
        $pdf->SetFont('helvetica', 'B', 8);
        $fecha_formateada = date('d-m-Y', strtotime($primerRegistro['fecha_salida']));
        $pageWidth = $pdf->getPageWidth();
        $marginRight = 20;
        $boxWidth = 45;
        $boxHeight = 8;
        $x_position = $pageWidth - $boxWidth - $marginRight;
        
        $pdf->SetXY($x_position, $pdf->GetY());
        $pdf->Cell($boxWidth, $boxHeight, 'FECHA: ' . $fecha_formateada, 1, 1, 'C');
        $pdf->SetX($x_position);
        $pdf->Cell($boxWidth, $boxHeight, 'ORDEN: ' . $primerRegistro['orden_salida'], 1, 1, 'C');
        $pdf->Ln(5);

        // --- TÍTULO ---
        $pdf->SetFont('helvetica', 'B', 10);
        $pdf->Cell(0, 10, 'NOTA DE ENTREGA DE ALMACÉN', 0, 1, 'C');

        // --- TABLA DEPENDENCIA (MULTICELL PARA ALINEACIÓN TOTAL) ---
        $pdf->SetFont('helvetica', 'B', 8);
        $col1 = 110; $col2 = 40; $col3 = 20; 
        $totalWidthArt = $col1 + $col2 + $col3; 

        $pdf->Cell($col1, 7, 'DEPENDENCIA', 1, 0, 'C');
        $pdf->Cell($col2, 7, 'UBICACIÓN', 1, 0, 'C');
        $pdf->Cell($col3, 7, 'EXTENSIÓN', 1, 1, 'C');
        
        $pdf->SetFont('helvetica', '', 8);
        $currentY = $pdf->GetY();

        // Cálculo de altura máxima de la fila
        $pdf->startTransaction();
      
        $h1 = $pdf->GetY() - $currentY;
        $pdf->rollbackTransaction(true);

        $pdf->startTransaction();
        $pdf->MultiCell($col2, 7, $primerRegistro['ubicacion_dependencia'], 0, 'L');
        $h2 = $pdf->GetY() - $currentY;
        $pdf->rollbackTransaction(true);

        $maxH_Dep = max($h1, $h2, 10); // Mínimo 10mm de alto

        // Dibujado de fila de dependencia
        $pdf->MultiCell($col1, $maxH_Dep, $primerRegistro['nom_dependencia'], 1, 'L', 0, 0);
        $pdf->MultiCell($col2, $maxH_Dep, $primerRegistro['ubicacion_dependencia'], 1, 'L', 0, 0);
        $pdf->MultiCell($col3, $maxH_Dep, '', 1, 'C', 0, 1);
        $pdf->Ln(5);

        // --- TABLA ARTÍCULOS ---
        $pdf->SetFont('helvetica', 'B', 10);
        $pdf->Cell(0, 10, 'ESPECIFICACIONES', 0, 1, 'C');
        
        $pdf->SetFont('helvetica', 'B', 9);
        $c_num = 10; $c_art = 100; $c_med = 35; $c_cant = 25;

        $pdf->Cell($c_num, 8, 'Nº', 1, 0, 'C');
        $pdf->Cell($c_art, 8, 'ARTÍCULO', 1, 0, 'C');
        $pdf->Cell($c_med, 8, 'MEDIDA', 1, 0, 'C');
        $pdf->Cell($c_cant, 8, 'CANTIDAD', 1, 1, 'C');

        $pdf->SetFont('helvetica', '', 9);
        $contador = 1; 

        foreach ($rows as $row) {
            $startY = $pdf->GetY();
            
            // Medimos altura del artículo
            $pdf->startTransaction();
            $pdf->MultiCell($c_art, 6, $row['nom_articulo'], 0, 'L');
            $h_art = $pdf->GetY() - $startY;
            $pdf->rollbackTransaction(true);
            $maxH_Art = ($h_art < 8) ? 8 : $h_art;

            $pdf->Cell($c_num, $maxH_Art, $contador, 1, 0, 'C');
            $pdf->MultiCell($c_art, $maxH_Art, $row['nom_articulo'], 1, 'L', 0, 0);
            $pdf->Cell($c_med, $maxH_Art, $row['nom_medida'], 1, 0, 'C');
            $pdf->Cell($c_cant, $maxH_Art, $row['cantidad_salida'], 1, 1, 'C');
            
            $contador++; 
        }

        // --- OBSERVACIONES ---
        $obsText = 'Observaciones: ESTE FORMATO SERÁ UTILIZADO SOLO PARA CASOS DE EMERGENCIA. QUEDA PENDIENTE LA SOLICITUD FORMAL "REQUISICIÓN DE BIENES MATERIALES" ANTES DE FINALIZAR EL MES DE RECEPCIÓN, DEBIDAMENTE FIRMADO POR EL DIRECTOR DEL ÁREA.';
        $obsHeight = 18; 
        $yObs = $pdf->GetY();
        $obsX = 20;

        $pdf->SetFont('helvetica', '', 8);
        $pdf->Rect($obsX, $yObs, $totalWidthArt, $obsHeight); 
        $pdf->SetXY($obsX + 2, $yObs + 2);
        $pdf->MultiCell($totalWidthArt - 4, 4, $obsText, 0, 'L');

        // --- SECCIÓN DE FIRMAS ---
        $yFirmas = $yObs + $obsHeight; 
        $boxH = 35; 
        $boxW = $totalWidthArt / 2;

        if (($yFirmas + $boxH) > ($pdf->getPageHeight() - 25)) {
            $pdf->AddPage();
            $yFirmas = $pdf->GetY();
        }

        // Firma Izquierda
        $pdf->Rect($obsX, $yFirmas, $boxW, $boxH);
        $pdf->SetXY($obsX + 5, $yFirmas + 24); 
        $pdf->Cell($boxW - 10, 0, '', 'T', 1, 'C'); 
        $pdf->SetX($obsX + 5);
        $pdf->SetFont('helvetica', 'B', 7);
        $pdf->Cell($boxW - 10, 5, 'Coordinación de Almacén', 0, 0, 'C');

        // Firma Derecha
        $pdf->Rect($obsX + $boxW, $yFirmas, $boxW, $boxH);
        $pdf->SetXY($obsX + $boxW + 5, $yFirmas + 24);
        $pdf->Cell($boxW - 10, 0, '', 'T', 1, 'C'); 
        $pdf->SetX($obsX + $boxW + 5);
        $pdf->Cell($boxW - 10, 5, 'Recibido por Unidad Solicitante', 0, 0, 'C');

        $pdf->Output('nota_entrega_' . $primerRegistro['orden_salida'] . '.pdf', 'I');

    } catch (PDOException $e) {
        die('Error en la consulta: ' . $e->getMessage());
    }
}
?>