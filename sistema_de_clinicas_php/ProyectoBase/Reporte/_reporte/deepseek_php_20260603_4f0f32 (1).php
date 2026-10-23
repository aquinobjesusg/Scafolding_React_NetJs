<?php
// Incluir la librería TCPDF
require_once('vendor/autoload.php'); // Si usas Composer
// O require_once('tcpdf/tcpdf.php'); // Si es descarga manual

// Crear una clase personalizada que extienda TCPDF (opcional)
class MYPDF extends TCPDF {
    // Header personalizado
    public function Header() {
        // Logo
        $image_file = K_PATH_IMAGES.'logo_example.jpg';
        if (file_exists($image_file)) {
            $this->Image($image_file, 10, 10, 30, '', 'JPG', '', 'T', false, 300, '', false, false, 0, false, false, false);
        }
        
        // Título
        $this->SetFont('helvetica', 'B', 12);
        $this->SetY(15);
        $this->Cell(0, 10, 'DOCUMENTO GENERADO CON TCPDF', 0, false, 'C', 0, '', 0, false, 'M', 'M');
        
        // Línea decorativa
        $this->Line(10, 25, 200, 25);
    }
    
    // Footer personalizado
    public function Footer() {
        $this->SetY(-15);
        $this->SetFont('helvetica', 'I', 8);
        $this->Cell(0, 10, 'Página ' . $this->getAliasNumPage() . '/' . $this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
    }
}

// Crear nuevo documento PDF
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// Configurar información del documento
$pdf->SetCreator('Tu Nombre o Empresa');
$pdf->SetAuthor('Tu Nombre');
$pdf->SetTitle('Ejemplo de PDF desde HTML');
$pdf->SetSubject('Generación de PDF con TCPDF');
$pdf->SetKeywords('TCPDF, PDF, PHP, HTML');

// Configurar márgenes
$pdf->SetMargins(15, 35, 15);
$pdf->SetHeaderMargin(10);
$pdf->SetFooterMargin(10);

// Configurar auto page breaks
$pdf->SetAutoPageBreak(TRUE, 25);

// Configurar información de la fuente
$pdf->SetFont('helvetica', '', 10);

// Agregar una página
$pdf->AddPage();

// Contenido HTML que se convertirá a PDF
$html = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: helvetica;
            font-size: 11px;
            color: #333;
        }
        h1 {
            color: #0066cc;
            font-size: 24px;
            text-align: center;
            margin-bottom: 20px;
        }
        h2 {
            color: #0099ff;
            font-size: 18px;
            margin-top: 20px;
            border-bottom: 2px solid #0099ff;
            padding-bottom: 5px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th {
            background-color: #0066cc;
            color: white;
            padding: 8px;
            text-align: left;
        }
        td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .highlight {
            background-color: #ffffcc;
            padding: 10px;
            border-left: 4px solid #ff9900;
        }
        .footer-note {
            font-size: 9px;
            color: #666;
            text-align: center;
            margin-top: 30px;
            font-style: italic;
        }
    </style>
</head>
<body>
    <h1>📄 Reporte de Ventas</h1>
    
    <p>Este es un documento generado automáticamente a partir de contenido HTML utilizando la librería <strong>TCPDF</strong> para PHP. 
    Esta librería permite convertir código HTML en documentos PDF de alta calidad.</p>
    
    <div class="highlight">
        <strong>📊 Información del Reporte:</strong><br>
        Fecha de generación: ' . date('d/m/Y H:i:s') . '<br>
        Usuario: Sistema Automatizado<br>
        Período: ' . date('F Y') . '
    </div>
    
    <h2>📈 Resumen de Ventas</h2>
    
    <table>
        <thead>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Laptop HP ProBook</td>
                <td>5</td>
                <td>$850.00</td>
                <td>$4,250.00</td>
            </tr>
            <tr>
                <td>Mouse Logitech</td>
                <td>15</td>
                <td>$25.00</td>
                <td>$375.00</td>
            </tr>
            <tr>
                <td>Teclado Mecánico</td>
                <td>8</td>
                <td>$65.00</td>
                <td>$520.00</td>
            </tr>
            <tr>
                <td>Monitor 24"</td>
                <td>3</td>
                <td>$180.00</td>
                <td>$540.00</td>
            </tr>
            <tr style="background-color: #e6f3ff;">
                <td colspan="3" style="text-align: right;"><strong>TOTAL:</strong></td>
                <td><strong>$5,685.00</strong></td>
            </tr>
        </tbody>
    </table>
    
    <h2>📝 Notas Adicionales</h2>
    <ul>
        <li>Los precios no incluyen IVA</li>
        <li>Los productos tienen garantía de 1 año</li>
        <li>El envío es gratuito para compras superiores a $500</li>
    </ul>
    
    <div class="footer-note">
        Este documento fue generado automáticamente. Para cualquier consulta, contacte a soporte@ejemplo.com<br>
        Gracias por confiar en nosotros.
    </div>
</body>
</html>
';

// Escribir el HTML en el PDF
$pdf->writeHTML($html, true, false, true, false, '');

// Agregar otra página con más contenido
$pdf->AddPage();

$html2 = '
<h2>📋 Detalle por Productos</h2>
<table border="1" cellpadding="5" cellspacing="0">
    <tr bgcolor="#0066cc" style="color:white">
        <th>Código</th>
        <th>Producto</th>
        <th>Categoría</th>
        <th>Stock</th>
        <th>Precio</th>
    </tr>
    <tr>
        <td>P001</td>
        <td>Laptop HP ProBook</td>
        <td>Electrónicos</td>
        <td>25</td>
        <td>$850</td>
    </tr>
    <tr>
        <td>P002</td>
        <td>Mouse Logitech</td>
        <td>Periféricos</td>
        <td>100</td>
        <td>$25</td>
    </tr>
    <tr>
        <td>P003</td>
        <td>Teclado Mecánico</td>
        <td>Periféricos</td>
        <td>45</td>
        <td>$65</td>
    </tr>
</table>

<p style="margin-top: 30px;">
    <strong>Firma Autorizada:</strong><br>
    _________________________
</p>
';

$pdf->writeHTML($html2, true, false, true, false, '');

// --- FUNCIONES ÚTILES ADICIONALES ---

// Función para generar PDF desde HTML simple
function generarPDFDesdeHTML($html, $nombreArchivo = 'documento.pdf') {
    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
    $pdf->SetCreator('Generador PDF');
    $pdf->SetAuthor('Sistema');
    $pdf->SetTitle('Documento PDF');
    $pdf->SetMargins(15, 20, 15);
    $pdf->SetAutoPageBreak(TRUE, 20);
    $pdf->AddPage();
    $pdf->writeHTML($html, true, false, true, false, '');
    
    // Salida del PDF
    $pdf->Output($nombreArchivo, 'I'); // 'I' para ver en navegador, 'D' para descargar, 'F' para guardar
}

// Función para guardar PDF en servidor
function guardarPDF($html, $rutaArchivo) {
    $pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
    $pdf->SetCreator('Generador PDF');
    $pdf->SetMargins(15, 20, 15);
    $pdf->SetAutoPageBreak(TRUE, 20);
    $pdf->AddPage();
    $pdf->writeHTML($html, true, false, true, false, '');
    $pdf->Output($rutaArchivo, 'F'); // Guardar en servidor
    return file_exists($rutaArchivo);
}

// Generar el PDF final
$nombreArchivo = 'reporte_' . date('Ymd_His') . '.pdf';

// Opciones de salida:
// 'I': ver en navegador
// 'D': descargar
// 'F': guardar en servidor
// 'S': retornar como string

// Ejemplo: Ver en navegador
$pdf->Output($nombreArchivo, 'I');

// Ejemplo alternativo: Guardar en servidor
// $pdf->Output('archivos/' . $nombreArchivo, 'F');

// Ejemplo alternativo 2: Descargar directamente
// $pdf->Output($nombreArchivo, 'D');
?>