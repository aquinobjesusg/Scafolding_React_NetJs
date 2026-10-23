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

// VERIFICACIÓN DE PERMISOS
if (!$super_admin && !verificar_permiso_rapido('OTIC', 'consumible_exportar_pdf')) {
    header("Location: acceso_denegado.php");
    exit;
}

//Conexión a la base de datos sia
$conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
$conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (isset($_POST['PDF'])) {

    $codigo_distribucion = $_POST['codigo_distribucion'];

    $listadoConsumiblesSqlBase = "SELECT 
                                d.codigo_distribucion,
                                d.fecha_distribucion, 
                                f.nom_funcionario || ' ' || f.ape_funcionario AS funcionario_principal, 
                                c.consumible,
                                c.codigo_consumible,
                                c.observacionc, 
                                d.cantidad_distribuidad,
                                m.nom_medida,
                                d.observaciond, 
                                dp.nom_dependencia,
                                dp.ubicacion_dependencia 
                            FROM oticbienes.distribucion d
                            LEFT JOIN oticbienes.funcionario f ON f.id_funcionario = d.id_funcionario
                            LEFT JOIN oticbienes.consumibles c ON c.id_consumibles = d.id_consumibles
                            LEFT JOIN dependencia dp ON dp.id_dependencia = f.id_dependencia
                            LEFT JOIN medida m ON m.id_medida = c.id_medida
                            WHERE d.codigo_distribucion = :codigo_distribucion
                            ORDER BY d.fecha_distribucion DESC";


    
    
    
    try {
        $stmt = $conexion_bd->prepare($listadoConsumiblesSqlBase);
        $stmt->bindParam(':codigo_distribucion', $codigo_distribucion, PDO::PARAM_STR);
        $stmt->execute();
        $resultadoR = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        if (empty($resultadoR)) {
            die('No se encontraron registros para la orden especificada.');
        }
        
        $primerRegistro = $resultadoR[0];
        
      class MiPDF extends TCPDF {
            function Header() {
                $this->Image('/var/www/html/sia/imagenes/cabeceraMppeuSep2025.png',10,8,193);
                $this->SetFont('helvetica','B',15);
                $this->Cell(80);
                $this->Ln(35);
            }

             function Footer() {
    
                $this->SetY(-18); 
                
                //Línea de separación 
                $this->SetLineWidth(0.1); 
                $this->Line(20, $this->GetY(), 190, $this->GetY());
                $this->SetLineWidth(0.2); 

                // 2. Configuración de la fuente
                $this->SetFont('helvetica','I',8);
                
                // 3. Texto del footer
                $this->SetX(20); 
                $this->Cell(0, 5, ('Sistema de Gestión de Almacén: Modulo OTIC'), 0, 1, 'C'); 
                
                // Número de página 
                $this->SetFont('helvetica','I', 7);
                $this->Cell(0, 3, $this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, 0, 'R');
            }
        }
        $pdf = new MiPDF('P', 'mm', 'A4');
        
        $pdf->SetMargins(15, 30, 15); // Ajustamos el margen superior a 30mm
        $pdf->SetAutoPageBreak(true, 25);
        $pdf->AddPage();
        
        // Configuración de fuente base
        $pdf->SetFont('helvetica', 'B', 8);
        
        // Fecha y Orden (alineados a la derecha)
        $fecha_formateada = date('d-m-Y', strtotime($primerRegistro['fecha_distribucion']));
        
    

        // Ancho de la página
        $pageWidth = $pdf->getPageWidth();
        // Margen derecho (usaremos para calcular la posición X)
        $marginRight = 20;
        // Ancho de cada cuadro
        $boxWidth = 45;
        // Altura de cada cuadro
        $boxHeight = 8;
        // Posición inicial Y para los cuadros
        $y_position = $pdf->getY();

        // --- Calcular la posición X de inicio para los cuadros ---
        // El ancho total es 45 (ancho del cuadro)
        $x_position = $pageWidth - $boxWidth - $marginRight;

        // --- Celda del número de control (primero) ---
        $pdf->SetXY($x_position, $y_position);
        $control_texto = 'Nº DE CONTROL: ' . $primerRegistro['codigo_distribucion'];
        $pdf->Cell($boxWidth, $boxHeight, $control_texto, 0, 0, 'C');

      

        // Salto de línea después de los cuadros
        $pdf->Ln(10);
        $pdf->SetFont('helvetica', 'B', 10);
        $pdf->Cell(0, 10, 'NOTA DE ENTREGA DE DGOTIC', 0, 1, 'C');

        // Si quieres la fecha a la derecha, calcularemos su posición.
        // Ancho de la celda de fecha
        $ancho_fecha = 45; 
        // La posición X debe ser el ancho total menos el ancho de la celda de fecha y el margen derecho
        $x_posicion_fecha = $pdf->getPageWidth() - $ancho_fecha - 15;
        // La posición Y será la misma que la del título de la tabla de dependencia
        $y_posicion_fecha = $pdf->getY();


        // --- DIBUJAR LA CELDA DE LA FECHA ---
        $fecha_formateada = date('d-m-Y', strtotime($primerRegistro['fecha_distribucion']));
        $pdf->SetFont('helvetica', 'B', 9);
        $pdf->SetXY($x_posicion_fecha, $y_posicion_fecha);
        $pdf->Cell($ancho_fecha, 8, 'FECHA: ' . $fecha_formateada, 1, 0, 'C');


       // Configuración inicial de la tabla
        $pdf->SetY($y_posicion_fecha + 8);
        $pdf->SetFont('helvetica', 'B', 7);
        $pdf->Cell(40, 8, 'DEPENDENCIA SOLICITANTE:', 1, 0, 'L');
        $pdf->SetFont('helvetica', '', 9);
        $pdf->Cell(80, 8, $primerRegistro['funcionario_principal'], 1, 0, 'L');
        $pdf->Cell(40, 8, 'UBICACIÓN', 1, 0, 'C');
        $pdf->Cell(20, 8, 'EXTENSIÓN', 1, 1, 'C');

        // Guardamos la posición X inicial para la fila de dependencia
        $x_inicial = $pdf->GetX();
        $y_before_dependencia = $pdf->GetY();

        // Configuramos la dependencia con MultiCell
        $pdf->SetFont('helvetica', '', 9);
        $nombre_dependencia =  $primerRegistro['nom_dependencia'];

        // Calculamos cuántas líneas ocupará el texto
        $pdf->startTransaction();
        $pdf->MultiCell(120, 5, $nombre_dependencia, 1, 'L', false, 1);
        $altura_dependencia = $pdf->GetY() - $y_before_dependencia;
        $pdf->rollbackTransaction(true);

        // Dibujamos las celdas con la altura calculada
        $pdf->SetXY($x_inicial, $y_before_dependencia);
        $pdf->MultiCell(120, $altura_dependencia, $nombre_dependencia, 1, 'L', false, 0);

        // Celda de Ubicación
        $pdf->SetXY($x_inicial + 120, $y_before_dependencia);
        $pdf->Cell(40, $altura_dependencia, $primerRegistro['ubicacion_dependencia'], 1, 0, 'C');

        // Celda de Extensión
        $pdf->SetXY($x_inicial + 160, $y_before_dependencia);
        $pdf->Cell(20, $altura_dependencia, '', 1, 1, 'C');

        // Aseguramos que estamos en una nueva línea para ESPECIFICACIONES
        $pdf->SetY($y_before_dependencia + $altura_dependencia + 2); // +2 para espacio adicional
        $pdf->SetFont('helvetica', 'B', 10);
        $pdf->Cell(0, 10, 'ESPECIFICACIONES', 0, 1, 'C');
        

        // Tabla de Artículos (con anchos proporcionales)
        $pdf->SetFont('helvetica', 'B', 9);
        $pdf->Cell(10, 8, 'Nº', 1, 0, 'C');
        $pdf->Cell(120, 8, 'CONSUMIBLE', 1, 0, 'C');
        $pdf->Cell(30, 8, 'MEDIDA', 1, 0, 'C');
        $pdf->Cell(20, 8, 'CANTIDAD', 1, 1, 'C');
        
        $pdf->SetFont('helvetica', '', 9);
        $contador = 1;
        foreach ($resultadoR as $row) {
            $pdf->Cell(10, 8, $contador, 1, 0, 'C');
            $pdf->Cell(120, 8, $row['consumible'] . ' ' . $row['codigo_consumible'] . ' ' . $row['observacionc'], 1);
            $pdf->Cell(30, 8, $row['nom_medida'], 1, 0, 'C');
            $pdf->Cell(20, 8, $row['cantidad_distribuidad'], 1, 1, 'C');
            $contador++;
        }

        // Observaciones (con bordes y alineación)
        $pdf->SetFont('helvetica', '', 9);
        $pdf->MultiCell(0, 7,'Observaciones: '  . $primerRegistro['observaciond'], 1, 'L');
      

        // Ancho de la página
        $pageWidth = $pdf->getPageWidth();
        // Margen izquierdo y derecho para centrar los cuadros
        $margin = 15;
        // Ancho que tendrán los dos cuadros
        $boxWidth = ($pageWidth - (2 * $margin)) / 2;
        // Altura del cuadro
        $boxHeight = 40;
        // Posición inicial Y para los cuadros
        $y_position = $pdf->getY();

        // Establecer el borde del cuadro
        $pdf->SetDrawColor(0, 0, 0); // Color del borde: negro
        $pdf->Rect($margin, $y_position, $boxWidth, $boxHeight, 'D'); // Dibuja el cuadro vacío

        // 1. Encabezado
        $pdf->SetFont('helvetica', 'B', 7); // Fuente en negrita
        $pdf->SetXY($margin, $y_position + 2); // Posiciona el cursor dentro del cuadro
        $pdf->Cell($boxWidth, 5, 'TECNOLOGÍA DE LA INFORMACIÓN Y LA COMUNICACIÓN (DGOTIC)', 0, 1, 'C'); // 'C' para centrar

        // 2. Nombre y cargo del coordinador
        $pdf->SetFont('helvetica', 'B', 7);
        $pdf->SetX($margin);
        $pdf->Cell($boxWidth, 5, 'Lenin Toro - COORDINADOR DE SOPORTE', 0, 1, 'C');

        // 3. Espacios en blanco (para simular el salto de línea)
        $pdf->SetY($y_position + 30); // Baja el cursor para dejar espacios
        $pdf->SetX($margin);

        // 5. Línea de firma
        $line_y = $pdf->getY();
        $pdf->Line($margin + 10, $line_y, $margin + $boxWidth - 10, $line_y);
        // 4. Texto "Entregado por DGOTIC"
        $pdf->SetFont('helvetica', 'B', 7);
        $pdf->Cell($boxWidth, 5, 'Entregado por DGOTIC', 0, 1, 'C');

        

        // Coordenada X para el segundo cuadro, justo al lado del primero
        $x2_position = $margin + $boxWidth;

        // Establecer el borde del segundo cuadro
        $pdf->Rect($x2_position, $y_position, $boxWidth, $boxHeight, 'D');

        // 1. Encabezado
        $pdf->SetFont('helvetica', 'B', 7);
        $pdf->SetXY($x2_position + 5, $y_position + 2); // Posiciona el cursor dentro del cuadro
        $pdf->Cell(0, 5, 'CARGO:', 0, 1);

        // 2. Nombre y apellido
        $pdf->SetX($x2_position + 5);
        $pdf->Cell(0, 5, 'NOMBRE Y APELLIDO:', 0, 1);


        // 4. Texto "Recibido por unidad solicitante"
        $pdf->SetY($y_position + 29);
        $pdf->SetX($x2_position);
        $pdf->Cell($boxWidth, 5, 'Recibido por Unidad Solicitante', 0, 1, 'C');

        $pdf->Output('nota_entrega_'.$codigo_distribucion.'.pdf', 'I');
        
    } catch (PDOException $e) {
        die('Error en la consulta: ' . $e->getMessage());
    }
}
    

 

?> 