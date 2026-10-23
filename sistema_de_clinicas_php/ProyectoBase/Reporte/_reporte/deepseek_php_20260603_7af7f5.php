<!-- generar_pdf.php -->
<?php
require_once('vendor/autoload.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = htmlspecialchars($_POST['titulo']);
    $contenido = nl2br(htmlspecialchars($_POST['contenido']));
    $color = $_POST['color'] ?? '#000000';
    
    $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8');
    $pdf->SetMargins(15, 15, 15);
    $pdf->AddPage();
    
    $html = "
    <h1 style='color: $color;'>$titulo</h1>
    <p>$contenido</p>
    <p><small>Generado el: " . date('d/m/Y H:i:s') . "</small></p>
    ";
    
    $pdf->writeHTML($html, true, false, true, false, '');
    $pdf->Output('documento.pdf', 'I');
}
?>