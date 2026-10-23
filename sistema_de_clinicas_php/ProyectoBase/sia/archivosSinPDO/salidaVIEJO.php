<?php
include ("include/permisos_helper.php");
    include ('include/tbs_class.php');
    include ("include/config.php");
    include ("include/portada.php");

    session_start();
    $usuario = $_SESSION['id_usuario'];
    $rol = $_SESSION['rol_usuario'];
    $nombre = $_SESSION['nom_usuario'];
    $correo = $_SESSION['correo_usuario'];

    if ($usuario == 0) 
    {
        header("Location: login.php?valor=1");
    }
    else
    {

        $tbs = new clsTinyButStrong;
        $tbs->LoadTemplate('salida.html','UTF-8');

        // Conexion con la base de datos
        $conexion_bd = pg_connect("host = $dbhost dbname = $dbdatabase user = $dbuser password = $dbpasswd port=$dbport") or die('No pudo conectarse: ' . pg_last_error());

        //Aqui empieza el codigo. Consultas para los seleccionables

        $salida = "SELECT * FROM salida ORDER BY id_dependencia";
        $dependencia = "SELECT * FROM dependencia ORDER BY id_dependencia DESC";
        $articulo = "SELECT * FROM stock where cantidad_disponible > 0;";
        $almacen = "SELECT * FROM almacen ORDER BY id_almacen DESC";

        //Generar codigo de salida automatico

        function conteoSalida($contador, $mesActual, $mesUltimo)
        {
            if($mesActual == $mesUltimo)
            {
                $contador = intval($contador);
                $contador = $contador + 1;
                $contador = str_pad($contador, 3, "0", STR_PAD_LEFT);

            }elseif($mesActual != $mesUltimo)
            {
                $contador = 1;
                $contador = str_pad($contador, 3, "0", STR_PAD_LEFT);
            }

            return $contador;
        }

        $anioActual = date('Y');
        $mesActual = date ('m');

        $ordenSalida = "SELECT id_salida, orden_salida FROM salida ORDER BY id_salida DESC LIMIT 1";
        $resultado_ordenSalida = pg_query($conexion_bd, $ordenSalida);

        $dateOrden = pg_fetch_array($resultado_ordenSalida);

        if ($dateOrden) //si existe un registro en salida, esto:
        {
            $ultimaOrden = $dateOrden['orden_salida'];

            //Se extrae el mes y los tres ultimos caracteres de $ultimaOrden
            $mesUltimo = substr($ultimaOrden, 5, 2);
            $contador = substr($ultimaOrden, -3);
            
            $nuevaOrden = conteoSalida($contador, $mesActual, $mesUltimo);

        }else //si no existe un registro en salida, esto;
        {
            $contador = 0;
            $mesUltimo = $mesActual;
            $nuevaOrden = conteoSalida($contador, $mesActual, $mesUltimo);
        }

        $ordenCompleta = $anioActual . "-" . $mesActual . "-" . $nuevaOrden;

        //Fin del Generar codigo de salida automatico

        if(isset($_POST['Registrar']))
        {
            //PROCESOS TABLA SALIDA Y STOCK (INSERT y UPDATE)

            $campo = "orden_salida, fecha_salida, id_dependencia, id_almacen, id_articulo, cantidad_salida, observacion_s, id_usuario";

            //Arrays:
            $id_articulos = $_POST['id_articulo'];
            $cantidades_salida = $_POST['cantidad_salida'];
            $observaciones_s = $_POST['observacion_s'];

            //Validaciones de campos

            if (empty(trim($_POST['fecha_salida'])))
            {

                $fechaV = 'Debe ingresar la fecha de salida del articulo';

            } elseif (empty(trim($_POST['id_dependencia'])))
            {

                $dependenciaV = 'Debe seleccionar la dependencia del articulo';

            } elseif (empty(trim($_POST['id_almacen'])))
            {

                $almacenV = 'Debe seleccionar el nombre del almacen';

            } else
            {

                // Procesar cada artículo para verificar su cantidad disponible en stock
                $bandera = TRUE;
                
                foreach ($id_articulos as $indice => $id_articulo) 
                {
                    $cantidad_salida = intval($cantidades_salida[$indice]);
                    $id_almacen = intval($_POST['id_almacen']);

                    $consulta_stock1 = "SELECT cantidad_disponible FROM stock WHERE id_articulo = $id_articulo AND id_almacen = $id_almacen";
                    $resultado_stock1 = pg_query($conexion_bd, $consulta_stock1);

                    if (pg_num_rows($resultado_stock1) > 0) 
                    {
                        $fila_stock = pg_fetch_assoc($resultado_stock1);
                        $cantidad_disponible = intval($fila_stock['cantidad_disponible']);

                        if ($cantidad_disponible - $cantidad_salida < 0) 
                        {
                            $bandera = FALSE;
                            $exceder = "No puede exceder la cantidad disponible del artículo (ID: $id_articulo)";
                        }
                    } else 
                    {
                        $bandera = FALSE;
                        $noHay = "El artículo (ID: $id_articulo) no existe en el almacén seleccionado";
                    }

                } //fin del bucle

                if ($bandera == TRUE)
                { 
                    foreach ($id_articulos as $indice => $id_articulo) 
                    {
                        $cantidad_salida = intval($cantidades_salida[$indice]);
                        $observacion_s = pg_escape_string($observaciones_s[$indice]);

                        // Insertar en la tabla salida
                        $insert_salida1 = "INSERT INTO salida ($campo)
                                          VALUES ('$ordenCompleta', '{$_POST['fecha_salida']}', {$_POST['id_dependencia']}, {$_POST['id_almacen']}, $id_articulo, $cantidad_salida, '$observacion_s', $usuario)";
                        pg_query($conexion_bd, $insert_salida1);

                        // Actualizar el stock
                        $update_stock1 = "UPDATE stock 
                                         SET cantidad_disponible = cantidad_disponible - $cantidad_salida,
                                             cantidad_salida = cantidad_salida + $cantidad_salida
                                         WHERE id_articulo = $id_articulo AND id_almacen = {$_POST['id_almacen']}";
                        pg_query($conexion_bd, $update_stock1);
                        
                    } //fin del bucle   
                }
            }
            header("Location: " . $_SERVER['PHP_SELF']);
        }//Fin del boton Registrar

        //BUSQUEDA EN SALIDA

        //Consulta para el Seleccionable al realizar Busquedad Con Dependencia
        $salidaDependencia = "SELECT DISTINCT s.id_dependencia, nom_dependencia 
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                ORDER BY id_dependencia DESC;";

        //Consulta para el Seleccionable al realizar Busquedad Con Almacen
        $salidaAlmacen = "SELECT DISTINCT s.id_almacen, nom_almacen 
                                FROM salida s
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                ORDER BY id_almacen DESC;";

        //Consulta para el Seleccionable al realizar Busquedad Con Articulo
        $salidaArticulo = "SELECT DISTINCT s.id_articulo, nom_articulo 
                                FROM salida s
                                INNER JOIN articulo ar ON ar.id_articulo = s.id_articulo
                                ORDER BY id_articulo DESC;";

        if (!isset($_POST['Buscar']))
        {
            //CONTEO PARA SABER CUANTOS REGISTROS EXISTEN EN salida

            $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida;";
            $resultado6 = pg_query($conexion_bd, $consulta6);

            //LISTADO DE LOS REGISTROS EN salida        

            $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                            FROM salida s
                            INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                            INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                            INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                            GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                            ORDER BY fecha_salida DESC;";

            $resultado7 = pg_query($conexion_bd, $consulta7);

        } else
        {

            $buscaAlmacen = $_POST['id_almacen2'];
            $buscaDependencia = $_POST['id_dependencia2'];
            $buscaArticulo = $_POST['id_articulo2'];
            $fecha_desde = $_POST['fecha_desde'];
            $fecha_hasta = $_POST['fecha_hasta'];

            //Verificar si solo ha llenado una de las fechas en la busquedad
            if ((!empty($fecha_desde) AND empty($fecha_hasta)) OR (empty($fecha_desde) AND !empty($fecha_hasta)))
            {
                $malafecha = ("Formatos de fechas inválidos. Complete ambos campos de forma correcta.");
                $tbs->Var['malafecha'] = $malafecha; // Asigna el mensaje a la variable de TBS
                $tbs->Show(); // Muestra el mensaje
                exit; // Detiene la ejecución del script
            }

            //Verificar si las fechas en la busquedad tienen el formato correcto
            if (!empty($fecha_desde) AND !empty($fecha_hasta))
            {
                // Validación estricta del formato (YYYY-MM-DD)
                $regex_fecha = '/^\d{4}-\d{2}-\d{2}$/';

                if (!preg_match($regex_fecha, $fecha_desde) OR !preg_match($regex_fecha, $fecha_hasta))
                {
                    $malafecha = "Formatos de fechas inválidos en la busqueda. Las fechas deben tener el formato MM-DD-AAAA.";
                    $tbs->Var['malafecha'] = $malafecha; // Asigna el mensaje a la variable de TBS
                    $tbs->Show(); // Muestra el mensaje
                    exit; // Detiene la ejecución del script 
                }
            }

            //Agregar comillas a las fechas para la consulta SQL 
            $fecha_desde_sql = "'".$fecha_desde."'"; 
            $fecha_hasta_sql = "'".$fecha_hasta."'";

            //Busqueda 1: Solo por Almacen (con su conteo)
            if ($buscaAlmacen != 0 AND $buscaDependencia == 0 AND $buscaArticulo == 0 AND empty($fecha_desde) AND empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 1
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE id_almacen = $buscaAlmacen";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error1 en consulta 6: " . pg_last_error());

                //Busqueda por Almacen
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE s.id_almacen = $buscaAlmacen
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error1 en consulta 7: ". pg_last_error());
            }

            //Busqueda 2: Solo por Dependencia (con su conteo)
            if ($buscaAlmacen == 0 AND $buscaDependencia != 0 AND $buscaArticulo == 0 AND empty($fecha_desde) AND empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 2
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE id_dependencia = $buscaDependencia";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error2 en consulta 6: " . pg_last_error());

                //Busqueda por Dependencia
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE s.id_dependencia = $buscaDependencia
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error2 en consulta 7: ". pg_last_error());
            }

            //Busqueda 3: Solo por Articulo (con su conteo)
            if ($buscaAlmacen == 0 AND $buscaDependencia == 0 AND $buscaArticulo != 0 AND empty($fecha_desde) AND empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 3
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE id_articulo = $buscaArticulo";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error3 en consulta 6: " . pg_last_error());

                //Busqueda por Articulo
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE s.id_articulo = $buscaArticulo
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error3 en consulta 7: ". pg_last_error());
            }

            //Busqueda 4: Solo por Fechas (con su conteo)
            if ($buscaAlmacen == 0 AND $buscaDependencia == 0 AND $buscaArticulo == 0 AND !empty($fecha_desde) AND !empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 4
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql." ";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error4 en consulta 6: " . pg_last_error());

                //Busqueda por Fechas
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql."
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error4 en consulta 7: ". pg_last_error());
            }

            //Busqueda 5: Por Almacen y Fechas (con su conteo)
            if ($buscaAlmacen != 0 AND $buscaDependencia == 0 AND $buscaArticulo == 0 AND !empty($fecha_desde) AND !empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 5
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE id_almacen = $buscaAlmacen AND fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql." ";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error5 en consulta 6: " . pg_last_error());

                //Busqueda por Almacen y Fechas
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE s.id_almacen = $buscaAlmacen AND fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql."
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error5 en consulta 7: ". pg_last_error());
            }

            //Busqueda 6: Por Dependencia y Fechas (con su conteo)
            if ($buscaAlmacen == 0 AND $buscaDependencia != 0 AND $buscaArticulo == 0 AND !empty($fecha_desde) AND !empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 6
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE id_dependencia = $buscaDependencia AND fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql." ";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error6 en consulta 6: " . pg_last_error());

                //Busqueda por Dependencia y Fechas
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE s.id_dependencia = $buscaDependencia AND fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql."
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error6 en consulta 7: ". pg_last_error());
            }

            //Busqueda 7: Por Articulo y Fechas (con su conteo)
            if ($buscaAlmacen == 0 AND $buscaDependencia == 0 AND $buscaArticulo != 0 AND !empty($fecha_desde) AND !empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 7
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE id_articulo = $buscaArticulo AND fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql." ";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error7 en consulta 6: " . pg_last_error());

                //Busqueda por Articulo y Fechas
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE s.id_articulo = $buscaArticulo AND fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql."
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error7 en consulta 7: ". pg_last_error());
            }

            //Busqueda 8: Por Almacen y Dependencia (con su conteo)
            if ($buscaAlmacen != 0 AND $buscaDependencia != 0 AND $buscaArticulo == 0 AND empty($fecha_desde) AND empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 8
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE id_almacen = $buscaAlmacen AND id_dependencia = $buscaDependencia";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error8 en consulta 6: " . pg_last_error());

                //Busqueda por Almacen y Dependencia
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE s.id_almacen = $buscaAlmacen AND s.id_dependencia = $buscaDependencia
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error8 en consulta 7: ". pg_last_error());
            }

            //Busqueda 9: Por Almacen y Dependencia y Fechas (con su conteo)
            if ($buscaAlmacen != 0 AND $buscaDependencia != 0 AND $buscaArticulo == 0 AND !empty($fecha_desde) AND !empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 9
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE id_almacen = $buscaAlmacen AND id_dependencia = $buscaDependencia AND fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql." ";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error9 en consulta 6: " . pg_last_error());

                //Busqueda por Almacen y Dependencia y Fechas
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE s.id_almacen = $buscaAlmacen AND s.id_dependencia = $buscaDependencia AND fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql."
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error9 en consulta 7: ". pg_last_error());
            }

            //Busqueda 10: Por Almacen y Articulo (con su conteo)
            if ($buscaAlmacen != 0 AND $buscaDependencia == 0 AND $buscaArticulo != 0 AND empty($fecha_desde) AND empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 10
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE id_almacen = $buscaAlmacen AND id_articulo = $buscaArticulo";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error10 en consulta 6: " . pg_last_error());

                //Busqueda por Almacen y Articulo
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE s.id_almacen = $buscaAlmacen AND s.id_articulo = $buscaArticulo
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error10 en consulta 7: ". pg_last_error());
            }

            //Busqueda 11: Por Almacen y Articulo y Fechas (con su conteo)
            if ($buscaAlmacen != 0 AND $buscaDependencia == 0 AND $buscaArticulo != 0 AND !empty($fecha_desde) AND !empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 11
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE id_almacen = $buscaAlmacen AND id_articulo = $buscaArticulo AND fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql." ";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error11 en consulta 6: " . pg_last_error());

                //Busqueda por Almacen y Articulo y Fechas
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE s.id_almacen = $buscaAlmacen AND s.id_articulo = $buscaArticulo AND fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql."
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error11 en consulta 7: ". pg_last_error());
            }

            //Busqueda 12: Por Dependencia y Articulo (con su conteo)
            if ($buscaAlmacen == 0 AND $buscaDependencia != 0 AND $buscaArticulo != 0 AND empty($fecha_desde) AND empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 12
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE id_dependencia = $buscaDependencia AND id_articulo = $buscaArticulo";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error12 en consulta 6: " . pg_last_error());

                //Busqueda por Dependencia y Articulo
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE s.id_dependencia = $buscaDependencia AND s.id_articulo = $buscaArticulo
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error12 en consulta 7: ". pg_last_error());
            }

            //Busqueda 13: Por Dependencia y Articulo y Fechas (con su conteo)
            if ($buscaAlmacen == 0 AND $buscaDependencia != 0 AND $buscaArticulo != 0 AND !empty($fecha_desde) AND !empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 13
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE id_dependencia = $buscaDependencia AND id_articulo = $buscaArticulo AND fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql." ";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error13 en consulta 6: " . pg_last_error());

                //Busqueda porDependencia y Articulo y Fechas
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE s.id_dependencia = $buscaDependencia AND s.id_articulo = $buscaArticulo AND fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql."
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error13 en consulta 7: ". pg_last_error());
            }

            //Busqueda 14: Por Almacen y Dependencia y Articulo (con su conteo)
            if ($buscaAlmacen != 0 AND $buscaDependencia != 0 AND $buscaArticulo != 0 AND empty($fecha_desde) AND empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 14
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE id_almacen = $buscaAlmacen AND id_dependencia = $buscaDependencia AND id_articulo = $buscaArticulo";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error14 en consulta 6: " . pg_last_error());

                //Busqueda por Almacen y Dependencia y Articulo
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE s.id_almacen = $buscaAlmacen AND s.id_dependencia = $buscaDependencia AND s.id_articulo = $buscaArticulo
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error14 en consulta 7: ". pg_last_error());
            }

            //Busqueda 15: Por Almacen y Dependencia y Articulo y Fechas (con su conteo)
            if ($buscaAlmacen != 0 AND $buscaDependencia != 0 AND $buscaArticulo != 0 AND !empty($fecha_desde) AND !empty($fecha_hasta))
            {
                //Conteo de resultados en la busqueda 15
                $consulta6 = "SELECT COUNT(DISTINCT orden_salida) AS total FROM salida 
                              WHERE id_almacen = $buscaAlmacen AND id_dependencia = $buscaDependencia AND id_articulo = $buscaArticulo AND fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql." ";
                $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error15 en consulta 6: " . pg_last_error());

                //Busqueda por Almacen y Dependencia y Articulo y Fechas
                $consulta7 = "SELECT s.orden_salida, fecha_salida, nom_dependencia, nom_almacen, COUNT(DISTINCT a2.id_articulo) AS total_articulos
                                FROM salida s
                                INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                                INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                                INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                                WHERE s.id_almacen = $buscaAlmacen AND s.id_dependencia = $buscaDependencia AND s.id_articulo = $buscaArticulo AND fecha_salida >= ".$fecha_desde_sql." AND fecha_salida <= ".$fecha_hasta_sql."
                                GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida
                              ORDER BY fecha_salida DESC";

                $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error15 en consulta 7: ". pg_last_error());
            }

        }//fin del else Buscar
    
        if(isset($_POST['excel']))
        {
            $consultaExcel = "SELECT s.orden_salida as Orden, fecha_salida as Fecha, nom_dependencia as Dependencia, nom_almacen as Almacen, a2.nom_articulo as Articulo, s.cantidad_salida as Cantidad
                            FROM salida s
                            INNER JOIN dependencia d ON d.id_dependencia = s.id_dependencia
                            INNER JOIN almacen a ON a.id_almacen = s.id_almacen
                            INNER JOIN articulo a2 ON a2.id_articulo = s.id_articulo
                            GROUP BY s.fecha_salida, d.nom_dependencia, a.nom_almacen, s.orden_salida, a2.nom_articulo, s.cantidad_salida
                            ORDER BY fecha_salida DESC;";

            $resultadoExcel = pg_query($conexion_bd, $consultaExcel);
            $fields = pg_num_fields ( $resultadoExcel );

            for ( $i = 0; $i < $fields; $i++ )
            {

                $header .= pg_field_name( $resultadoExcel , $i ) . "\t";
            }

            while( $row = pg_fetch_row( $resultadoExcel ) )
            {
                $line = '';
                foreach( $row as $value )
                {
                    if ( ( !isset( $value ) ) || ( $value == "" ) )
                    {
                        $value = "\t";
                    }
                    else
                    {
                        $value = str_replace( '"' , '""' , $value );
                        $value = '"' . $value . '"' . "\t";
                    }
                    $line .= $value;
                }
                $data .= trim( $line ) . "\n" ;
            }
            $data = str_replace( "\r" , "" , $data );

            if ( $data == "" )
            {
                $data = "\n(0) Datos Encontrados\n";
            }
            $filename = "Distribuidos-" . date('dmY') . ".xls";
            header("Content-type: application/octet-stream");
            header("Content-Disposition: attachment; filename=\"$filename\"");
            header("Pragma: no-cache");
            header("Expires: 0");
            print "$header\n$data";
            exit;
        }

        //ELIMINAR UN REGISTRO EN SALIDA (Y RE-CALCULOS EN STOCK)

        if (isset($_POST['Eliminar'])) 
        {
            if ($rol == 1) 
            {
                // CAPTURA DE DATOS Y RECALCULOS DE STOCK
                $orden_capturada = $_POST['Eliminar']; // orden_salida de los registros a eliminar en la tabla salida

                // Obtener los registros de la tabla salida que corresponden a la orden de salida capturada
                $consulta_salida1 = "SELECT * FROM salida WHERE orden_salida = '$orden_capturada'";
                $resultado_salida1 = pg_query($conexion_bd, $consulta_salida1);

                if (pg_num_rows($resultado_salida1) > 0) 
                {
                    // Recorrer cada registro de la tabla salida
                    while ($fila_salida = pg_fetch_assoc($resultado_salida1)) 
                    {
                        $id_articulo = $fila_salida['id_articulo'];
                        $id_almacen = $fila_salida['id_almacen'];
                        $cantidad_salida = $fila_salida['cantidad_salida'];

                        // Actualizar la tabla stock
                        $update_stock2 = "UPDATE stock 
                                            SET cantidad_disponible = cantidad_disponible + $cantidad_salida,
                                                cantidad_salida = cantidad_salida - $cantidad_salida
                                            WHERE id_articulo = $id_articulo AND id_almacen = $id_almacen";
                        pg_query($conexion_bd, $update_stock2);

                        //PROCESO EN TABLA AUDITORIA, PARA HACER UNA COPIA DEL REGISTRO ELIMINADO
                        $campo_auditoria = "id_usuario, estado_registro, tabla_auditada, id_registro, orden_registro, fecha_registro, nom_almacen, nom_dependencia, nom_articulo, cantidad_articulo, observacion_registro";

                        $estado_registro = "Eliminado";
                        $tabla_auditada = "Salida";

                        $auditoria1 = "INSERT INTO auditoria ($campo_auditoria) 
                                        VALUES(
                                            {$fila_salida['id_usuario']},
                                            '$estado_registro',
                                            '$tabla_auditada',
                                            {$fila_salida['id_salida']},
                                            '{$fila_salida['orden_salida']}',
                                            '{$fila_salida['fecha_salida']}',
                                            (SELECT nom_almacen FROM almacen WHERE id_almacen = {$fila_salida['id_almacen']}),
                                            (SELECT nom_dependencia FROM dependencia WHERE id_dependencia = {$fila_salida['id_dependencia']}),
                                            (SELECT nom_articulo FROM articulo WHERE id_articulo = {$fila_salida['id_articulo']}),
                                            {$fila_salida['cantidad_salida']},
                                            '{$fila_salida['observacion_s']}'
                                        )";
                        $resultado_auditoria1 = pg_query($auditoria1) or die("Error en auditoria1 por: ". pg_last_error());
                    }

                    // Eliminar los registros de la tabla salida que corresponden a la orden de salida capturada
                    $delete_salida1 = "DELETE FROM salida WHERE orden_salida = '$orden_capturada'";
                    pg_query($conexion_bd, $delete_salida1);

                    $eliminado = "Registros eliminados correctamente.";
                } else {
                    $noEncontrado = "Error: No se puede eliminar este registro.";
                }
            } else {
                $permisoDenegado = "No tiene los permisos para eliminar un registro. Comuniquese con el administrador.";
            }
            header("Location: " . $_SERVER['PHP_SELF']);
        }


        //PROCESOS PARA EDITAR UN REGISTRO EN SALIDA

        if (isset($_POST['Editar']))
        {
            $tbs->LoadTemplate('salidaEditar.html','UTF-8');

            $orden_capturada = "'".$_POST['Editar']."'"; //orden de salida de los registros a editar en salida

            //PARA MOSTRAR LOS DATOS RELLENADOS EN EL FORMULARIO DE EDITAR
            $consulta12 = "SELECT id_salida, orden_salida, fecha_salida, d.id_dependencia, nom_dependencia, a.id_almacen, nom_almacen
                            FROM salida s 
                            INNER JOIN dependencia d on d.id_dependencia = s.id_dependencia 
                            INNER JOIN almacen a on a.id_almacen = s.id_almacen  
                            WHERE orden_salida = $orden_capturada;";

            $resultado12 = pg_query($conexion_bd, $consulta12);

            //Articulo, almacen, observacion
            $consulta13 = "SELECT id_salida, a2.id_articulo, nom_articulo, cantidad_salida, observacion_s 
                            FROM salida s 
                            INNER JOIN articulo a2 on a2.id_articulo = s.id_articulo
                            WHERE orden_salida = $orden_capturada;";

            $resultado13 = pg_query($conexion_bd, $consulta13);
        }

        if (isset($_POST['Guardarcambios'])) 
        {
            // Recuperar los datos del formulario editar
            $edit_orden_salida = "'".$_POST['orden_salida']."'";
            $edit_fecha_salida = "'".$_POST['fecha_salida']."'";
            $edit_id_dependencia = $_POST['id_dependencia'];
            $edit_id_almacen = $_POST['id_almacen'];
            $id_salidas = $_POST['id_salida']; // Array de id_salida
            $edit_id_articulos = $_POST['id_articulo']; // Array de id_articulo
            $edit_cantidades_salida = $_POST['cantidad_salida']; // Array de cantidad_salida
            $edit_observaciones_s = $_POST['observacion_s']; // Array de observacion_s

            $bandera =TRUE;

            foreach ($id_salidas as $index => $id_salida) 
            {
                $edit_id_articulo = $edit_id_articulos[$index];
                $edit_cantidad_salida = $edit_cantidades_salida[$index];
                $edit_observacion_s = $edit_observaciones_s[$index];

                // Consulta en salida para capturar los datos originales
                $consulta_salida2 = "SELECT * FROM salida WHERE id_salida = $id_salida;";
                $resultado_salida2 = pg_query($conexion_bd, $consulta_salida2);

                $dato1 = pg_fetch_array($resultado_salida2);
                $dato_id_articulo = $dato1['id_articulo'];
                $dato_id_almacen = $dato1['id_almacen'];
                $dato_cantidad_salida = $dato1['cantidad_salida'];
                $valor_id_articulo = "'".$dato_id_articulo."'";
                $valor_id_almacen = "'".$dato_id_almacen."'";
                $valor_cantidad_salida = "'".$dato_cantidad_salida."'";

                // Consulta en stock para capturar la cantidad disponible del articulo originales
                $consulta_stock2 = "SELECT cantidad_disponible 
                                    FROM stock 
                                    WHERE id_articulo = $valor_id_articulo AND id_almacen = $valor_id_almacen;";
                $resultado_stock2 = pg_query($conexion_bd, $consulta_stock2);

                $dato2 = pg_fetch_array($resultado_stock2);
                $dato_cantidad_disponible = $dato2['cantidad_disponible'];
                $valor_cantidad_disponible = "'".$dato_cantidad_disponible."'";

                if(pg_num_rows($resultado_stock2) > 0)
                {
                    if(($edit_id_articulo == $dato_id_articulo) AND ($edit_id_almacen == $dato_id_almacen))
                    {
                        if($dato_cantidad_disponible + $dato_cantidad_salida - $edit_cantidad_salida < 0)
                        {
                            $bandera =FALSE;
                            $exceder = "No puede exceder la cantidad disponible del artículo (ID: $id_articulo)";

                        }else
                        {
                            //Actualizar stock del articulo 
                            $bandera =TRUE;
                            $update_stock3 = "UPDATE stock 
                                                SET cantidad_salida = stock.cantidad_salida - $valor_cantidad_salida + $edit_cantidad_salida, 
                                                    cantidad_disponible = stock.cantidad_disponible + $valor_cantidad_salida - $edit_cantidad_salida 
                                                WHERE stock.id_articulo = $edit_id_articulo AND stock.id_almacen = $edit_id_almacen;";
                            pg_query($conexion_bd, $update_stock3);
                        }
                    }else
                    {
                        //Si se modifica el articulo o almacen original de un registro de salida, se ejecuta esto:

                        $consulta_stock3 = "SELECT cantidad_disponible 
                                            FROM stock 
                                            WHERE id_articulo = $edit_id_articulo AND id_almacen = $edit_id_almacen;";
                        $resultado_stock3 = pg_query($conexion_bd, $consulta_stock3);

                        $dato3 = pg_fetch_array ($resultado_stock3);
                        $dato3_cantidad_disponible = $dato3['cantidad_disponible']; 
                        $otro_valor_cantidad_disponible = "'".$dato3_cantidad_disponible."'"; //cantidad disponible en stock del registro editado

                        if($dato3_cantidad_disponible - $edit_cantidad_salida < 0)
                        {
                            $bandera =FALSE;
                            $exceder = "No puede exceder la cantidad disponible del artículo (ID: $id_articulo)";
                                
                        } else
                        {
                            //Actualizar stock, del articulo se elimina la cantidad que habia en el registro de salida antes de ser editado
                            $bandera =TRUE;
                            $update_stock4 = "UPDATE stock 
                                                SET cantidad_salida = stock.cantidad_salida - $valor_cantidad_salida, 
                                                    cantidad_disponible = stock.cantidad_disponible + $valor_cantidad_salida 
                                                WHERE stock.id_articulo = $valor_id_articulo AND stock.id_almacen = $valor_id_almacen;";
                            pg_query($conexion_bd, $update_stock4);

                            if(pg_num_rows($resultado_stock3) > 0)
                            {
                                //Actualizar stock, del articulo se suman la cantidad que fue editada en el registro de salida
                                $bandera =TRUE;
                                $update_stock5 = "UPDATE stock 
                                                    SET cantidad_salida = stock.cantidad_salida + $edit_cantidad_salida, 
                                                        cantidad_disponible = stock.cantidad_disponible - $edit_cantidad_salida 
                                                    WHERE stock.id_articulo = $edit_id_articulo AND stock.id_almacen = $edit_id_almacen;";
                                pg_query($conexion_bd, $update_stock5);
                            }
                        }
                    }
                }

                if($bandera == TRUE) 
                {

                    //PROCESO EN TABLA AUDITORIA, PARA HACER UNA COPIA DEL REGISTRO MODIFICADO
                    $campo_auditoria = "id_usuario, estado_registro, tabla_auditada, id_registro, orden_registro, fecha_registro, nom_almacen, nom_dependencia, nom_articulo, cantidad_articulo, observacion_registro";

                    $estado_registro = "Antes de Modificar";
                    $tabla_auditada = "Salida";

                    $auditoria2 = "INSERT INTO auditoria ($campo_auditoria) 
                                    VALUES(
                                        {$dato1['id_usuario']},
                                        '$estado_registro',
                                        '$tabla_auditada',
                                        {$dato1['id_salida']},
                                        '{$dato1['orden_salida']}',
                                        '{$dato1['fecha_salida']}',
                                        (SELECT nom_almacen FROM almacen WHERE id_almacen = {$dato1['id_almacen']}),
                                        (SELECT nom_dependencia FROM dependencia WHERE id_dependencia = {$dato1['id_dependencia']}),
                                        (SELECT nom_articulo FROM articulo WHERE id_articulo = {$dato1['id_articulo']}),
                                        {$dato1['cantidad_salida']},
                                        '{$dato1['observacion_s']}'
                                    )";
                    $resultado_auditoria2 = pg_query($auditoria2) or die("Error en auditoria2 por: ". pg_last_error());

                    //SE ACTUALIZA EL REGISTRO DE salida EDITADO
                    $update_salida1 = "UPDATE salida 
                                        SET orden_salida = '$edit_orden_salida',
                                            fecha_salida = $edit_fecha_salida,
                                            id_dependencia = $edit_id_dependencia,
                                            id_almacen = $edit_id_almacen,
                                            id_articulo = $edit_id_articulo,
                                            cantidad_salida = $edit_cantidad_salida, 
                                            observacion_s = '$edit_observacion_s',
                                            id_usuario = $usuario 
                                        WHERE salida.id_salida = $id_salida;";
                    pg_query($conexion_bd, $update_salida1);

                    $editado = "Registro actualizado exitosamente";
                }
            }//fin bucle
            header("Location: " . $_SERVER['PHP_SELF']);
        }//fin de Guardarcambios


        
        $tbs->MergeBlock('dependencia',$conexion_bd,$dependencia);
        $tbs->MergeBlock('b2',$conexion_bd,$articulo);
        $tbs->MergeBlock('b1,b1x',$conexion_bd,$almacen);
        $tbs->MergeBlock('salidaAlmacen',$conexion_bd,$salidaAlmacen); 
        $tbs->MergeBlock('salidaDependencia',$conexion_bd,$salidaDependencia);
        $tbs->MergeBlock('salidaArticulo',$conexion_bd,$salidaArticulo); 
        $tbs->MergeBlock('consulta6',$conexion_bd,$consulta6);
        $tbs->MergeBlock('consulta7',$conexion_bd,$consulta7);
        $tbs->MergeBlock('consulta12',$conexion_bd,$consulta12);
        $tbs->MergeBlock('consulta13',$conexion_bd,$consulta13);

        $tbs->Show();


        //cierro conexion.
        pg_close($conexion_bd);
        exit;

    }
    
?>