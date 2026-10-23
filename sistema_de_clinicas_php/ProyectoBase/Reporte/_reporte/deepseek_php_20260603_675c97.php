<?php
require_once('vendor/autoload.php');

use TCPDF;

// Crear PDF básico
$pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8');

// Configuración básica
$pdf->SetCreator('Mi Aplicación');
$pdf->SetAuthor('Usuario');
$pdf->SetTitle('Mi PDF');
$pdf->SetMargins(15, 15, 15);
$pdf->AddPage();

// Contenido HTML
$html = '
<h1 style="color: blue;">Mi Título</h1>
<p>Este es un párrafo de ejemplo generado desde HTML.</p>
<table border="1">
    <tr>
        <th>Columna 1</th>
        <th>Columna 2</th>
    </tr>
    <tr>
        <td>Dato 1</td>
        <td>Dato 2</td>
    </tr>
</table>
';

// Convertir HTML a PDF
$pdf->writeHTML($html, true, false, true, false, '');

// Salida
$pdf->Output('mi_documento.pdf', 'I');
?>