<?php
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("fpdf185/fpdf.php");




    // Conexion con la base de datos

    $conexion_bd = pg_connect("host = $dbhost dbname = $dbdatabase user = $dbuser password = $dbpasswd port=$dbport") or die('No pudo conectarse: ' . pg_last_error());

           if (isset($_POST['Reporte'])) 
        {

             // Obtener el valor de $orden desde POST
            $orden = "'".$_POST['orden_salida']."'";
        

            // Consulta SQL
            $consultaR = "SELECT s.orden_salida, s.fecha_salida, d.nom_dependencia, 
                                 d.ubicacion_dependencia, a.nom_articulo, m.nom_medida, 
                                 s.cantidad_salida
                          FROM salida s
                          INNER JOIN dependencia d ON s.id_dependencia = d.id_dependencia
                          INNER JOIN articulo a ON s.id_articulo = a.id_articulo
                          INNER JOIN medida m ON m.id_medida = a.id_medida
                          WHERE s.orden_salida = $orden;";

            $resultadoR = pg_query($consultaR) or die('La consulta falló: ' . pg_last_error());

          class MiPDF extends FPDF {
                
                // Cabecera de página
                function Header(){
                    // Logo
                    $this->Image('/var/www/html/sia/imagenes/cintillo_ayacucho.jpg',10,8,193);
                    // Arial bold 15
                    $this->SetFont('Arial','B',15);
                    // Movernos a la derecha
                    $this->Cell(80);     
                    // Salto de línea
                    $this->Ln(20);
                }

                // Footer
                function Footer() {
                    // Posición a 1.5 cm desde el final de la página
                    $this->SetY(-15);
                    
                    // Configuración de la fuente
                    $this->SetFont('Arial', 'I', 8);

                     // Texto del footer
                    $this->SetX(10); // Posición horizontal
                    $this->Cell(0, 10, utf8_decode('Sistema de Información de Almacén'), 0, 0, 'C');
                    
                    
                   
                }
            }


            // Crear una instancia de FPDF
            $pdf = new MiPDF('P', 'mm', 'A4');
            $pdf->SetMargins(20, 20, 20);
            $pdf->SetAutoPageBreak(true, 20);  
            $pdf->AddPage();
            $pdf->SetFont('Arial','B',8);


            // Variables para controlar el orden de salida y la dependencia actual
            $current_orden_salida = null;
      


           

            while ($row = pg_fetch_assoc($resultadoR)) {
                if ($row['orden_salida'] != $current_orden_salida) {
                    // Calcular la posición X para el lado derecho de la página
                    $x_position = $pdf->GetPageWidth() - 45 - 10; // 45 es el ancho de la celda, 10 es el margen derecho

                    // Imprimir "Fecha Salida" y "Orden Salida" en el orden deseado, alineados a la derecha
                    $pdf->SetX($x_position); // Establecer la posición X
                    $fecha_original = $row['fecha_salida']; // Fecha en formato AAAA-MM-DD
                    $fecha_formateada = date('d-m-Y', strtotime($fecha_original)); // Formato DD-MM-AAAA

                    $pdf->Cell(45, 10, 'FECHA: ' . $fecha_formateada, 1, 0, 'C');

                    $pdf->Ln(); // Salto de línea
                    $pdf->SetX($x_position); // Establecer la posición X
                    $pdf->Cell(45, 10, 'ORDEN: ' . $row['orden_salida'], 1, 0, 'C'); // Alinear a la derecha
                    $pdf->Ln(); // Salto de línea

                    $current_orden_salida = $row['orden_salida'];
                    $pdf->Ln(5);
                }



            }


             // Variables para controlar el orden de salida y la dependencia actual
          


            $pdf->SetFont('Arial', 'B', 10);
            $pdf->Cell(180, 10,utf8_decode('NOTA DE ENTREGA DE ALMACÉN'), 0, 0, 'C'); // Ancho de celda ajustado a 180 (suma de los anchos de las columnas)
            $pdf->SetFont('Arial', '', 10);
            $pdf->Ln(10); // Espacio vertical entre "NOTA DE ENTREGA" y las columnas



              while ($row = pg_fetch_assoc($resultadoR)) {
                if ($row['orden_salida'] != $current_orden_salida) {
                    // Calcular la posición X para el lado derecho de la página
                    $x_position = $pdf->GetPageWidth() - 45 - 10; // 45 es el ancho de la celda, 10 es el margen derecho

                    // Imprimir "Fecha Salida" y "Orden Salida" en el orden deseado, alineados a la derecha
                    $pdf->SetX($x_position); // Establecer la posición X
                    $fecha_original = $row['fecha_salida']; // Fecha en formato AAAA-MM-DD
                    $fecha_formateada = date('d-m-Y', strtotime($fecha_original)); // Formato DD-MM-AAAA

                    $pdf->Cell(45, 10, 'FECHA: ' . $fecha_formateada, 1, 0, 'C');

                    $pdf->Ln(); // Salto de línea
                    $pdf->SetX($x_position); // Establecer la posición X
                    $pdf->Cell(45, 10, 'ORDEN: ' . $row['orden_salida'], 1, 0, 'C'); // Alinear a la derecha
                    $pdf->Ln(); // Salto de línea

                    $current_orden_salida = $row['orden_salida'];
                    $pdf->Ln(5);
                }



            }

            $current_ubicacion = null;
            $current_dependencia = null;

            // Encabezados de la tabla 2 (se muestran una sola vez)
            $pdf->SetFont('Arial', 'B', 8); 
            $pdf->Cell(140,10,'DEPENDENCIA',1, 0,'C');
            $pdf->Cell(20,10,utf8_decode('UBICACIÓN'),1, 0,'C');
            $pdf->Cell(20,10,utf8_decode('EXTENSIÓN'),1, 0,'C');
            $pdf->SetFont('Arial', '', 8);
            $pdf->Ln();

            // Reiniciar el puntero para la tabla 2 (si es necesario)
            pg_result_seek($resultadoR, 0); // Si usas el mismo $resultadoR para ambas tablas

            $current_ubicacion = null;
            $current_dependencia = null;
        
           
            $dependencias_procesadas = [];

            while ($row = pg_fetch_assoc($resultadoR)) {
                // Decodifica UTF-8 *una sola vez* y guarda los valores en variables.
                $nom_dependencia = utf8_decode($row['nom_dependencia']);
                $ubicacion_dependencia = utf8_decode($row['ubicacion_dependencia']);
                $extension = $row['']; 

                // Verifica si la dependencia *ya fue procesada*.
                if (!in_array($nom_dependencia, $dependencias_procesadas)) {
                    $pdf->Cell(140,10,$nom_dependencia,1);
                    $pdf->Cell(20,10,$ubicacion_dependencia,1);
                    $pdf->Cell(20,10,$extension,1); 
                    $pdf->Ln();

                    // Agrega la dependencia actual al array de procesadas.
                    $dependencias_procesadas[] = $nom_dependencia;
                }
            }
                
            

            $pdf->SetFont('Arial', 'B', 10);
            $pdf->Cell(180, 10, 'ESPECIFICACIONES', 0, 0, 'C'); // Ancho de celda ajustado a 180 (suma de los anchos de las columnas)
            $pdf->SetFont('Arial', '', 10);

            // Tabla 3: Articulo, Medida y Clasificación
            $pdf->Ln(10); // Espacio vertical entre "ESPECIFICACIONES" y las columnas
            $pdf->SetFont('Arial', 'B', 9);
            $pdf->Cell(10, 10, utf8_decode('Nº'), 1, 0, 'C');
            $pdf->Cell(130, 10, utf8_decode('ARTÍCULO'), 1, 0, 'C');
            $pdf->Cell(20, 10, utf8_decode('MEDIDA'), 1, 0, 'C');
            $pdf->Cell(20, 10, utf8_decode('CANTIDAD'), 1, 0, 'C'); 
            $pdf->SetFont('Arial', '', 9);
            $pdf->Ln();

            pg_result_seek($resultadoR, 0);

            $contador = 1;

            $paginaActual = 1;

            while ($row = pg_fetch_assoc($resultadoR)) {
                if ($pdf->PageNo() != $paginaActual) { // Detectar salto de página
                    $paginaActual = $pdf->PageNo();
                    $contador = 1;
                }

                $pdf->Cell(10, 10, $contador, 1, 0, 'C');
                $pdf->Cell(130, 10, utf8_decode($row['nom_articulo']), 1);
                $pdf->Cell(20, 10, utf8_decode($row['nom_medida']), 1);
                $pdf->Cell(20, 10, $row['cantidad_salida'], 1, 0, 'C');
                $pdf->Ln();

                $contador++;
            }

            

            $pdf->SetFont('Arial', '', 8);

            $pdf->MultiCell(180, 5, utf8_decode('Observaciones: ESTE FORMATO SERA UTILIZADO SOLO PARA CASOS DE EMERGENCIA. QUEDA PENDIENTE LA SOLICITUD FORMAL "REQUISICIÓN DE BIENES MATERIALES" ANTES DE FINALIZAR EL MES DE RECEPCIÓN, DEBIDAMENTE FIRMADO POR EL DIRECTOR DEL ÁREA.'), 1);

            $pdf->SetFont('Arial', 'B', 8);

            // Celdas vacías en la misma línea (sin bordes)
            $pdf->Cell(90, 30, '________________________________', 1, 0, 'C');
            $pdf->Cell(90, 30, '________________________________', 1, 0, 'C');
            $pdf->Ln(); // Salto de línea después de las celdas

            // Celdas con borde inferior, izquierdo y derecho ('LBR')
            $pdf->Cell(90, 10, utf8_decode('Coordinación de Almacén'), 'LBR', 0, 'C');
            $pdf->Cell(90, 10, utf8_decode('Recibido por Unidad Solicitante'), 'LBR', 0, 'C');
            
            
         

            
            
            

    


      

            // Liberar el resultado
            pg_free_result($resultadoR);

            // Cerrar la conexión
            pg_close($conexion_bd);

            // Salida del PDF
            $pdf->Output();


        }

     

?>