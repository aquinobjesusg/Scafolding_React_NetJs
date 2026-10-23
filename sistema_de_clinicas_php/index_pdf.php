<?php
require_once('vendor/autoload.php'); // Si usas Composer
class MYPDF extends TCPDF {
    // Header personalizado
    public function Header() {
        // Logo
        /*$image_file = K_PATH_IMAGES.'imagenes\LOGO_MPPEU_2025.jpg';
        //$image_file = 'imagenes/cabeceraMppeuSep2025.png';
        
        if (file_exists($image_file)) {
            $this->Image($image_file, 10, 10, 30, '', 'PNG', '', 'T', false, 300, '', false, false, 0, false, false, false);
        }
        
        // Título
        $this->SetFont('helvetica', 'B', 12);
        $this->SetY(15);
        $this->Cell(0, 10, 'DOCUMENTO GENERADO CON TCPDF', 0, false, 'C', 0, '', 0, false, 'M', 'M');
        
        // Línea decorativa
        $this->Line(10, 25, 200, 25);*/
    }
    
    // Footer personalizado
    public function Footer() {
        /*$this->SetY(-15);
        $this->SetFont('helvetica', 'I', 8);
        $this->Cell(0, 10, 'Página ' . $this->getAliasNumPage() . '/' . $this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
    */
        }
}

$pdf = new MYPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// Configurar información del documento
// $pdf->SetCreator('Tu Nombre o Empresa');
// $pdf->SetAuthor('Tu Nombre');
$pdf->SetTitle('Lista De Productos');
// $pdf->SetSubject('Generación de PDF con TCPDF');
// $pdf->SetKeywords('TCPDF, PDF, PHP, HTML');

// Configurar márgenes
$pdf->SetMargins(15, 35, 15);
$pdf->SetHeaderMargin(10);
$pdf->SetFooterMargin(10);

// Configurar auto page breaks
$pdf->SetAutoPageBreak(TRUE, 25);

// Configurar información de la fuente
$pdf->SetFont('helvetica', '', 7);
$pdf->AddPage('L');


$encc = '<table border="1">
    <tr>
        <td align="center">
        <h2>Detalle por Productos</h2>
        <br>
        </td>
    </tr>
</table>
<table border="1">
    <tr bgcolor="#0066cc" style="color:white"  align="center">
        <th>Código</th>
        <th>Producto</th>
        <th>Categoría</th>
        <th>Producto</th>
        <th>Stock</th>
        <th>Precio</th>
        <th>Precio</th>
        <th>Precio</th>
    </tr>';
 
    $tope =13;
//$html2 = $encc;
$html2 = '';
    $linea = 0;
    for ($i = 1; $i <= 100; $i++) {
    if( $linea == 0 ) {
        $linea = 0;
        $html2 = $html2 . $encc;    
    }
    $linea++;
    if( $linea == $tope ) {
        $linea = 0;
        $html2 = $html2 . '
</table>';
    }    
    $html2 = $html2 . '
    <tr  align="center">
        <td>'.$i.'</td>
        <td>Laptop HP ProBook</td>
        <td>Electrónicos</td>
        <td>Portail</td>
        <td>25</td>
        <td>$850</td>
        <td>$850</td>
        <td>$850</td>
    </tr>';
        
    }
    $html2 = $html2 . '
</table>
</br>
';

//$pdf->writeHTML($html2, true, false, true, false, '');

// --- FUNCIONES ÚTILES ADICIONALES ---

// Generar el PDF final
$nombreArchivo = 'reporte_' . date('Ymd_His') . '.pdf';

//descargarPDFDesdeHTML($html2, $nombreArchivo = 'documento.pdf');

generarPDFDesdeHTML($html2, $nombreArchivo = 'documento.pdf');

// Función para generar PDF desde HTML simple
function generarPDFDesdeHTML($html, $nombreArchivo = 'documento.pdf') {
    $pdf = new TCPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
    $pdf->SetCreator('Generador PDF');
    $pdf->SetAuthor('Sistema');
    $pdf->SetTitle('Documento PDF');
    $pdf->SetMargins(15, 20, 15);
    $pdf->SetAutoPageBreak(TRUE, 20);
    $pdf->AddPage('L');
    $pdf->writeHTML($html, true, false, true, false, '');
    
    // Salida del PDF
    $pdf->Output($nombreArchivo, 'I'); // 'I' para ver en navegador, 'D' para descargar, 'F' para guardar
}

function descargarPDFDesdeHTML($html, $nombreArchivo = 'documento.pdf') {
    $pdf = new TCPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
    $pdf->SetCreator('Generador PDF');
    $pdf->SetAuthor('Sistema');
    $pdf->SetTitle('Documento PDF');
    $pdf->SetMargins(15, 20, 15);
    $pdf->SetAutoPageBreak(TRUE, 20);
    $pdf->AddPage('L');
    $pdf->writeHTML($html, true, false, true, false, '');
    
    // Salida del PDF
    $pdf->Output($nombreArchivo, 'D'); // 'I' para ver en navegador, 'D' para descargar, 'F' para guardar
}


// Función para guardar PDF en servidor
function guardarPDF($html, $rutaArchivo) {
    $pdf = new TCPDF('L', PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
    $pdf->SetCreator('Generador PDF');
    $pdf->SetMargins(15, 20, 15);
    $pdf->SetAutoPageBreak(TRUE, 20);
    $pdf->AddPage('L');
    $pdf->writeHTML($html, true, false, true, false, '');
    $pdf->Output($rutaArchivo, 'F'); // Guardar en servidor
    return file_exists($rutaArchivo);
}


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