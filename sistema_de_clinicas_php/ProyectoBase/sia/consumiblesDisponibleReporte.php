<?php
session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");
require_once('vendor/autoload.php');
include_once ('funcs/funcs.php');

if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) {
    header("Location: index.php?valor=0");
    exit;
}

$usuario = $_SESSION['id_usuario'];
$nombre = $_SESSION['nom_usuario'];
$correo = $_SESSION['correo_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;

// VERIFICACIÓN DE PERMISOS
if (!$super_admin && !verificar_permiso_rapido('OTIC', 'consumible_ver_stock')) {
    header("Location: acceso_denegado.php");
    exit;
}
$conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
$conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);




	if (isset($_POST['PDF'])) 
    {

	    $codigoConsumible = $_POST['codigo_consumible'];

	     $listadoConsumiblesSqlFinal = "
		        SELECT
		            c.codigo_consumible,
		            c.consumible,
		            m.nom_medida,
		            COALESCE(SUM(s.cantidad_disponible), 0) AS total_disponible,
		            c.observacionc
		        FROM oticbienes.consumibles c
		        LEFT JOIN medida m ON m.id_medida = c.id_medida
		        LEFT JOIN oticbienes.stockc s ON s.id_consumibles = c.id_consumibles
		        GROUP BY c.codigo_consumible, c.consumible, m.nom_medida, c.observacionc
		    ";

		    try {
		        $consumible = $conexion_bd->prepare($listadoConsumiblesSqlFinal);
		        $consumible->execute();
		        $resultado = $consumible->fetchAll(PDO::FETCH_ASSOC);
		    } catch (PDOException $e) {
		        die("Error al ejecutar la consulta: " . $e->getMessage());
		    }
	    class MiPDF extends TCPDF {
	        // Cabecera de página
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

	    // Crear una instancia de PDF
	    $pdf = new MiPDF('P', 'mm', 'A4');
	    $pdf->SetMargins(20, 20, 20);
		$pdf->SetAutoPageBreak(true, 20); // Margen Inferior de 20mm
	    $pdf->AddPage();
	    $pdf->Ln(15);
	    $pdf->SetFont('helvetica','',8);

    // 1. Título principal (con espacio adicional después)
		$pdf->SetFont('helvetica', 'B', 10);
		$pdf->Cell(0, 10, utf8_decode('CONSUMIBLES DISPONIBLES'), 0, 1, 'C');
		$pdf->Ln(4); // Espacio extra después del título

		// 2. Posición Y después del título
		$y_pos = $pdf->GetY();

		// 3. Dibujar PRIMERO el texto descriptivo (usando writeHTMLCell para mejor control)
		$pdf->SetFont('helvetica', '', 10);
		$pdf->writeHTMLCell(0, 0, 20, $y_pos, 
		    '<span style="font-family: helvetica; font-size: 9pt;">'.
		    'Consumibles disponibles en la Oficina de las Tecnologías de la Información y la Comunicación (OTIC).'.
		    '</span>', 0, 1, false, true, 'L');

		// 4. Dibujar la fecha ENCIMA del texto (en posición absoluta)
		$pdf->SetFont('helvetica', '', 9);
		$pdf->SetXY(150, $y_pos - 10); // Ajuste fino de posición
		$pdf->Cell(40, 6, utf8_decode('Fecha: '.date('d-m-Y')), 1, 0, 'C');

		// 5. Espacio antes de la tabla
		$pdf->SetY($y_pos + 4); // Posición absoluta para la tabla
		$pdf->Ln(2); // Ajuste final

		// y no debería solaparse con el texto anterior.
		$pdf->SetFont('helvetica', 'B', 9);
		$pdf->SetFillColor(210, 240, 240);

		$ancho_numero = 8;
		$ancho_codigo = 25;
		$ancho_consumible = 50;
		$ancho_medida = 25;
		$ancho_cantidad = 20;
		$ancho_observaciones = 42; 

		$pdf->Cell($ancho_numero, 6, 'N°', 1, 0, 'C', true);
		$pdf->Cell($ancho_codigo, 6, 'Codigo', 1, 0, 'L', true);
		$pdf->Cell($ancho_consumible, 6, 'Consumible', 1, 0, 'L', true);
		$pdf->Cell($ancho_medida, 6, 'Medida', 1, 0, 'L', true);
		$pdf->Cell($ancho_cantidad, 6, 'Cantidad', 1, 0, 'L', true);
		$pdf->Cell($ancho_observaciones, 6, 'Observaciones', 1, 1, 'L', true);

		// --- Bucle para los datos de la consulta ---
		$pdf->SetFont('helvetica', '', 9);
		$contador = 1;

		foreach ($resultado as $fila) {
		    
		    // Calcular la altura máxima necesaria para la fila (basada en Observaciones)

		    $h = $pdf->getStringHeight($ancho_observaciones, utf8_decode($fila['observacionc']), false, true, '', 1);
		    $altura_fila = max(6, $h); 
		    $x_actual = $pdf->GetX();
		    $y_inicio_fila = $pdf->GetY();

		    // 1. DIBUJAR LA COLUMNA DE OBSERVACIONES (MultiCell con salto de línea)
		
		    $pdf->MultiCell($ancho_observaciones, $altura_fila, utf8_decode($fila['observacionc']), 1, 'L', false, 0, $x_actual + $ancho_numero + $ancho_codigo + $ancho_consumible + $ancho_medida + $ancho_cantidad, $y_inicio_fila, true, 0, false, true, $altura_fila, 'T');

		    // 2. REGRESAR Y DIBUJAR EL RESTO DE LAS CELDAS
	
		    $pdf->MultiCell($ancho_numero, $altura_fila, $contador, 1, 'C', false, 0, $x_actual, $y_inicio_fila, true, 0, false, true, $altura_fila, 'M');
	
		    $pdf->MultiCell($ancho_codigo, $altura_fila, $fila['codigo_consumible'], 1, 'L', false, 0, $x_actual + $ancho_numero, $y_inicio_fila, true, 0, false, true, $altura_fila, 'M');
		    
		    $pdf->MultiCell($ancho_consumible, $altura_fila, utf8_decode($fila['consumible']), 1, 'L', false, 0, $x_actual + $ancho_numero + $ancho_codigo, $y_inicio_fila, true, 0, false, true, $altura_fila, 'M');
		    
		    $pdf->MultiCell($ancho_medida, $altura_fila, utf8_decode($fila['nom_medida']), 1, 'L', false, 0, $x_actual + $ancho_numero + $ancho_codigo + $ancho_consumible, $y_inicio_fila, true, 0, false, true, $altura_fila, 'M');
		    
		    $pdf->MultiCell($ancho_cantidad, $altura_fila, $fila['total_disponible'], 1, 'L', false, 1, $x_actual + $ancho_numero + $ancho_codigo + $ancho_consumible + $ancho_medida, $y_inicio_fila, true, 0, false, true, $altura_fila, 'M');

		    $contador++;
		}

		   
	    // Salida del PDF
	    $pdf->Output('reporte_consumibles.pdf', 'I');

	}           

?> 
