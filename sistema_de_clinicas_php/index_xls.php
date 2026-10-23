<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Helper\Html;

// // 1. Aquí tienes tu HTML con la tabla
// $htmlContent = '
// <!DOCTYPE html>
// <html>
// <head>
//     <style>
//         table {
//             border-collapse: collapse;
//             width: 100%;
//         }
//         th, td {
//             border: 1px solid #ddd;
//             padding: 8px;
//             text-align: left;
//         }
//         th {
//             background-color: #4CAF50;
//             color: white;
//         }
//         tr:nth-child(even) {
//             background-color: #f2f2f2;
//         }
//     </style>
// </head>
// <body>
//     <table>
//         <thead>
//             <tr>
//                 <th>ID</th>
//                 <th>Nombre</th>
//                 <th>Email</th>
//                 <th>Edad</th>
//             </tr>
//         </thead>
//         <tbody>
//             <tr><td>1</td><td>Juan Pérez</td><td>juan@email.com</td><td>28</td></tr>
//             <tr><td>2</td><td>María García</td><td>maria@email.com</td><td>34</td></tr>
//             <tr><td>3</td><td>Carlos López</td><td>carlos@email.com</td><td>45</td></tr>
//             <tr><td>4</td><td>Ana Martínez</td><td>ana@email.com</td><td>23</td></tr>
//         </tbody>
//     </table>
// </body>
// </html>
// ';

// // 2. Crear nuevo objeto Spreadsheet
// $spreadsheet = new Spreadsheet();
// $sheet = $spreadsheet->getActiveSheet();

// // 3. Usar el helper de HTML para convertir la tabla a Excel
// $htmlHelper = new Html();
// $htmlHelper->setSheet($sheet);

// // Cargar el HTML y convertirlo a celdas de Excel
// $htmlHelper->loadHtml($htmlContent);

// // 4. Configurar el ancho automático de columnas
// foreach (range('A', $sheet->getHighestColumn()) as $column) {
//     $sheet->getColumnDimension($column)->setAutoSize(true);
// }

// // 5. Configurar cabeceras para descargar el archivo
// header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
// header('Content-Disposition: attachment;filename="mi_archivo_excel.xlsx"');
// header('Cache-Control: max-age=0');

// // 6. Crear el writer y enviar el archivo al navegador
// $writer = new Xlsx($spreadsheet);
// $writer->save('php://output');
// exit;

require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Reader\Html as HtmlReader;


$encc = '<table border="1">
    <tr>
        <td align="center">
        <h2>Detalle por Productos</h2>
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
//     if( $linea == $tope ) {
//         $linea = 0;
//         $html2 = $html2 . '
// </table>';
//     }    
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
';


$htmlString = $html2;

// El HTML con tabla
// $htmlString = '<table border="1">
//     <tr><th>Nombre</th><th>Edad</th><th>Ciudad</th></tr>
//     <tr><td>Juan</td><td>30</td><td>Madrid</td></tr>
//     <tr><td>Ana</td><td>25</td><td>Barcelona</td></tr>
// </table>';

//echo $htmlString;
//die();

// Cargar desde string
$reader = new HtmlReader();
$spreadsheet = $reader->loadFromString($htmlString);

// // 5. Configurar cabeceras para descargar el archivo
header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
header('Content-Disposition: attachment;filename="mi_archivo_excel.xlsx"');
header('Cache-Control: max-age=0');

// Guardar como Excel
$writer = new Xlsx($spreadsheet);
$writer->save('php://output');

echo "Archivo creado exitosamente";