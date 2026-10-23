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
        $tbs->LoadTemplate('ingreso.html','UTF-8');

        // CONEXION CON LA BASE DE DATOS
        $conexion_bd = pg_connect("host = $dbhost dbname = $dbdatabase user = $dbuser password = $dbpasswd port=$dbport") or die('No pudo conectarse: ' . pg_last_error());


        //AQUI EMPIEZA EL CODIGO. CONSULTAS PARA DESPLEGABLES
        
        $proveedor = "SELECT * FROM proveedor ORDER BY id_proveedor DESC;";
        $articulo = "SELECT * FROM articulo ORDER BY id_articulo DESC;";
        $medida = "SELECT * FROM medida ORDER BY id_medida DESC;";
        $clasificacion = "SELECT * FROM clasificacion ORDER BY id_clasificacion DESC;";
        $almacen = "SELECT * FROM almacen ORDER BY id_almacen DESC;";


        //PROCESO EN LA TABLA INGRESO PARA REGISTRAR (INSERT) 

        if(isset($_POST['Registrar']))
        {
            $campo = "orden_ingreso, fecha_ingreso, id_proveedor, id_almacen, id_articulo, cantidad_ingreso, observacion_i, id_usuario";
            $valor .= "'".$_POST['orden_ingreso']."',";
            $valor .= "'".$_POST['fecha_ingreso']."',";
            $valor .= "'".$_POST['id_proveedor']."',";
            $valor .= "'".$_POST['id_almacen']."',";
            $valor .= "'".$_POST['id_articulo']."',";
            $valor .= "'".$_POST['cantidad_ingreso']."',";
            $valor .= "'".$_POST['observacion_i']."',";
            $valor .= "'".$usuario."'";

            //Validaciones de campos

            if (empty(trim($_POST['orden_ingreso']))) 
            {
                $ordenV = 'Debe escribir el orden de ingreso';

            } elseif (empty(trim($_POST['fecha_ingreso'])))
            {

                $fechaV = 'Debe ingresar la fecha de ingreso del articulo';

            } elseif (empty(trim($_POST['id_proveedor'])))
            {

                $proveedorV = 'Debe seleccionar el proveedor del articulo';

            } elseif (empty(trim($_POST['id_almacen'])))
            {

                $almacenV = 'Debe seleccionar el nombre del almacen';

            } elseif (empty(trim($_POST['id_articulo'])))
            {

                $articuloV = 'Debe seleccionar el articulo';

            } elseif (!preg_match('/^[0-9]+$/',($_POST['cantidad_ingreso'])))
            {

                $cantidadV = 'Debe seleccionar la cantidad del articulo ingresado';

            } elseif ($_POST['cantidad_ingreso'] < 0) {
                
                $cantidadN = 'No se permiten números negativos';

            } elseif (preg_match('/"/', $_POST['observacion_i']))
            {

                 $observacionV = 'No debe ingresar comillas';

            //HASTA AQUI LA VALIDACION
            
            }else {


                $consulta1 = "INSERT INTO ingreso ($campo) VALUES($valor);";
                $resultado1 = pg_query($consulta1) or die("No se pudieron insertar los datos por: ". pg_last_error());


            //PROCESOS EN STOCK AL REGISTRAR EN INGRESO (INSERT Y UPDATE)
            
                $campo1 = "id_articulo, cantidad_ingreso, cantidad_disponible, id_almacen, nom_articulo";
                
                $consulta2 = "SELECT i.id_articulo AS articulo, cantidad_ingreso AS ingresan, id_almacen AS almacen, a.nom_articulo AS nom_articulo
                                FROM ingreso i
                                INNER JOIN articulo a on a.id_articulo = i.id_articulo
                                ORDER BY id_ingreso DESC LIMIT 1;";
                $resultado2 = pg_query($conexion_bd, $consulta2);
                $dato1 = pg_fetch_array ($resultado2);

                $entregados1 = $dato1['articulo'];
                $entregados2 = $dato1['ingresan'];
                $entregados3 = $dato1['almacen'];
                $entregadosnom1 = $dato1['nom_articulo'];
                $valor1 = "'".$entregados1."'"; //id_articulo, del ultimo registro en ingreso
                $valor2 = "'".$entregados2."'"; //cantidad ingresada, del ultimo registro en ingreso
                $valor3 = "'".$entregados3."'"; //id_almacen, del ultimo registro en ingreso
                $valornom1 = "'".$entregadosnom1."'"; //nombre articulo, del ultimo registro en ingreso
                $valor4 = "'".$entregados1."',"."'".$entregados2."',"."'".$entregados2."',"."'".$entregados3."',"."'".$entregadosnom1."'"; //valores del $campo1

                $consulta3 = "SELECT * FROM stock WHERE id_articulo = $valor1 AND id_almacen = $valor3;";
                $resultado3 = pg_query($conexion_bd, $consulta3);

                if(pg_num_rows($resultado3) > 0)
                {
                    
                    $consulta4 = "UPDATE stock 
                                    SET cantidad_ingreso = stock.cantidad_ingreso + $valor2,
                                        cantidad_disponible = stock.cantidad_disponible + $valor2,
                                        id_almacen = $valor3 
                                    WHERE stock.id_articulo = $valor1 AND stock.id_almacen = $valor3;";

                    $resultado4 = pg_query($consulta4) or die("No se pudieron insertar los datos por: ". pg_last_error());

                } else{

                    $consulta5 = "INSERT INTO stock ($campo1) VALUES($valor4);";

                    $resultado5 = pg_query($consulta5) or die("No se pudieron insertar los datos por: ". pg_last_error());
                }


                if ($resultado1) {
                // Para redirigir a la pagina
                $_SESSION['mensaje'] = "Registro Completado";
                header("Location: " . $_SERVER['PHP_SELF']); // Redirige a la misma página

                exit; 
                } else {
                //Por si da error
                    $_SESSION['error_db'] = "Error al insertar los datos: " . pg_last_error();
                    header("Location: " . $_SERVER['PHP_SELF']); // Redirige a la misma página
                    exit; 
                }
            

            }


        } else{
                //...;
        }


        if (!isset($_POST['Buscar'])){

             //CONTEO PARA SABER CUANTOS REGISTROS EXISTEN EN INGRESO

            $consulta6 = "SELECT COUNT(*) AS total FROM ingreso;";
            $resultado6 = pg_query($conexion_bd, $consulta6);


            //LISTADO DE LOS REGISTROS EN INGRESO        

            $consulta7 = "SELECT id_ingreso, orden_ingreso, fecha_ingreso, nom_proveedor, nom_almacen, 
                            nom_articulo, c.nom_clasificacion, m.nom_medida, cantidad_ingreso, observacion_i 
                            FROM ingreso i 
                            INNER JOIN proveedor p on p.id_proveedor = i.id_proveedor 
                            INNER JOIN almacen a on a.id_almacen = i.id_almacen 
                            INNER JOIN articulo a2 on a2.id_articulo = i.id_articulo
                            INNER JOIN medida m ON m.id_medida = a2.id_medida        
                            INNER JOIN clasificacion c ON c.id_clasificacion = a2.id_clasificacion
                            ORDER BY id_ingreso DESC;";

            $resultado7 = pg_query($conexion_bd, $consulta7);

        } else{


            $fecha_desde = $_POST['fecha_desde'];
            $fecha_hasta = $_POST['fecha_hasta'];

            // Validación estricta del formato (YYYY-MM-DD)
            $regex_fecha = '/^\d{4}-\d{2}-\d{2}$/';
            if (!preg_match($regex_fecha, $fecha_desde) || !preg_match($regex_fecha, $fecha_hasta)) {
                die("Formato de fecha inválido. Use AAAA-MM-DD."); 
            }

            // Formatear las fechas para la consulta SQL 
            $fecha_desde_sql = "'".$fecha_desde."'"; 
            $fecha_hasta_sql = "'".$fecha_hasta."'";

        
            $consulta6 = "SELECT COUNT(*) AS total FROM ingreso 
                          WHERE fecha_ingreso >= ".$fecha_desde_sql." AND fecha_ingreso <= ".$fecha_hasta_sql;
            $resultado6 = pg_query($conexion_bd, $consulta6) or die("Error en consulta 6: " . pg_last_error()); 

        
            $consulta7 = "SELECT id_ingreso, orden_ingreso, fecha_ingreso, nom_proveedor, nom_almacen,
                            nom_articulo, c.nom_clasificacion, m.nom_medida, cantidad_ingreso,observacion_i 
                          FROM ingreso i 
                          INNER JOIN proveedor p ON p.id_proveedor = i.id_proveedor 
                          INNER JOIN almacen a ON a.id_almacen = i.id_almacen 
                          INNER JOIN articulo a2 ON a2.id_articulo = i.id_articulo
                          INNER JOIN medida m ON m.id_medida = a2.id_medida        
                          INNER JOIN clasificacion c ON c.id_clasificacion = a2.id_clasificacion 
                          WHERE fecha_ingreso >= ".$fecha_desde_sql." AND fecha_ingreso <= ".$fecha_hasta_sql."
                          ORDER BY fecha_ingreso DESC";

            $resultado7 = pg_query($conexion_bd, $consulta7) or die("Error en consulta 7: ". pg_last_error());

               

           }


        //ELIMINAR UN REGISTRO EN INGRESO (Y RE-CALCULOS EN STOCK)

        if (isset($_POST['Eliminar']))
        {
          //CAPTURA DE DATOS Y RECALCULOS DE STOCK

          $id_capturada = $_POST['Eliminar']; //id del registro a eliminar en ingreso

          $consulta8 = "SELECT * FROM ingreso WHERE id_ingreso = $id_capturada;";
          $resultado8 = pg_query($conexion_bd, $consulta8);

          $dato2 = pg_fetch_array ($resultado8);
          $entregados4 = $dato2['id_articulo'];
          $entregados5 = $dato2['cantidad_ingreso'];
          $entregados6 = $dato2['id_almacen'];
          $valor5 = "'".$entregados4."'"; //id_articulo, capturado del registro a eliminar en ingreso
          $valor6 = "'".$entregados5."'"; //cantidad ingresada, capturado del registro a eliminar en ingreso
          $valor7 = "'".$entregados6."'"; //id_almacen, capturado del registro a eliminar en ingreso
 
          $consulta9 = "SELECT cantidad_disponible FROM stock WHERE id_articulo = $valor5 AND id_almacen = $valor7;";
          $resultado9 = pg_query($conexion_bd, $consulta9);

          $dato3 = pg_fetch_array ($resultado9);
          $entregados7 = $dato3['cantidad_disponible']; 
          $valor8 = "'".$entregados7."'"; //cantidad disponible en stock del registro a eliminar

          if(pg_num_rows($resultado9) > 0)
          {
            if($entregados7 - $entregados5 < 0) //cantidad disponible en stock - cantidad ingresada en ingreso
            {

                 $noDisponible = "No puede eliminar este registro, parte de la cantidad registrada ya fue distribuida y no esta disponible en el almacen";

            }else{

                //PROCESO EN TABLA AUDITORIA, PARA HACER UNA COPIA DEL REGISTRO ELIMINADO
                $campo_auditoria = "id_usuario, estado_registro, tabla_auditada, id_registro, orden_registro, fecha_registro, nom_almacen, nom_proveedor, nom_articulo, cantidad_articulo, observacion_registro";

                $estado_registro = "Eliminado";
                $tabla_auditada = "Ingreso";
                
                $auditoria1 = "INSERT INTO auditoria ($campo_auditoria) 
                                VALUES(
                                    {$dato2['id_usuario']},
                                    '$estado_registro',
                                    '$tabla_auditada',
                                    {$dato2['id_ingreso']},
                                    '{$dato2['orden_ingreso']}',
                                    '{$dato2['fecha_ingreso']}',
                                    (SELECT nom_almacen FROM almacen WHERE id_almacen = {$dato2['id_almacen']}),
                                    (SELECT nom_proveedor FROM proveedor WHERE id_proveedor = {$dato2['id_proveedor']}),
                                    (SELECT nom_articulo FROM articulo WHERE id_articulo = {$dato2['id_articulo']}),
                                    {$dato2['cantidad_ingreso']},
                                    '{$dato2['observacion_i']}'
                                )";
                $resultado_auditoria1 = pg_query($auditoria1) or die("Error en auditoria1 por: ". pg_last_error());

                //ACTUALIZAR STOCK, RESTANDO LA CANTIDAD DEL REGISTRO DE INGRESO ELIMINADO

                $consulta10 = "UPDATE stock 
                               SET cantidad_ingreso = stock.cantidad_ingreso - $valor6, 
                                   cantidad_disponible = stock.cantidad_disponible - $valor6 
                               WHERE stock.id_articulo = $valor5 AND stock.id_almacen = $valor7;";

                $resultado10 = pg_query($consulta10) or die("No se pudieron insertar los datos por: ". pg_last_error());

                //SE ELIMINA EL REGISTRO DE INGRESO

                $consulta11 = "DELETE FROM ingreso WHERE id_ingreso = $id_capturada;";
                $resultado11 = pg_query($consulta11) or die("No se pudieron eliminar los datos por: ". pg_last_error());

                $eliminado = "Registro eliminado exitosamente";
            }
          }else{
            $noExiste =  "Hubo un error, ya no existe este registro.";
          }
        }


        //PROCESOS PARA EDITAR UN REGISTRO EN INGRESO

        if (isset($_POST['Editar']))
        {
            $tbs->LoadTemplate('ingresoEditar.html','UTF-8');

            $id_editar = $_POST['Editar']; //id del registro a editar en ingreso

            //PARA MOSTRAR LOS DATOS RELLENADOS EN EL FORMULARIO DE EDITAR
            $consulta12 = "SELECT id_ingreso, orden_ingreso, fecha_ingreso, p.id_proveedor, nom_proveedor, a.id_almacen, nom_almacen, 
                          a2.id_articulo, nom_articulo, cantidad_ingreso, observacion_i 
                        FROM ingreso i 
                        INNER JOIN proveedor p on p.id_proveedor = i.id_proveedor 
                        INNER JOIN almacen a on a.id_almacen = i.id_almacen 
                        INNER JOIN articulo a2 on a2.id_articulo = i.id_articulo
                        WHERE id_ingreso = $id_editar;";

            $resultado12 = pg_query($conexion_bd, $consulta12);
            
        }

        if (isset($_POST['Guardarcambios']))
        {
            //CAPTURA DE DATOS
            $id_guardar = $_POST['Guardarcambios'] ;
            $edit_orden_ingreso = "'".$_POST['orden_ingreso']."'";
            $edit_fecha_ingreso = "'".$_POST['fecha_ingreso']."'";
            $edit_id_proveedor = "'".$_POST['id_proveedor']."'";
            $edit_id_almacen = "'".$_POST['id_almacen']."'";
            $edit_id_articulo = "'".$_POST['id_articulo']."'";
            $edit_cantidad_ingreso = "'".$_POST['cantidad_ingreso']."'";
            $edit_observacion_i = "'".$_POST['observacion_i']."'";

            $edit_id_almacen_if = $_POST['id_almacen'];
            $edit_id_articulo_if = $_POST['id_articulo'];
            $edit_cantidad_ingreso_if = $_POST['cantidad_ingreso'];

            $consulta13 = "SELECT * FROM ingreso WHERE id_ingreso = $id_guardar;";
            $resultado13 = pg_query($conexion_bd, $consulta13);

            $dato4 = pg_fetch_array ($resultado13);
            $entregados8 = $dato4['id_articulo'];
            $entregados9 = $dato4['cantidad_ingreso'];
            $entregados10 = $dato4['id_almacen'];
            $valor9 = "'".$entregados8."'"; //id_articulo, capturado del registro original que sera editado en ingreso
            $valor10 = "'".$entregados9."'"; //cantidad ingresada, capturado del registro original que sera editado en ingreso
            $valor11 = "'".$entregados10."'"; //id_almacen, capturado del registro original que sera editado en ingreso

            $consulta14 = "SELECT cantidad_disponible FROM stock WHERE id_articulo = $valor9 AND id_almacen = $valor11;";
            $resultado14 = pg_query($conexion_bd, $consulta14);

            $dato5 = pg_fetch_array ($resultado14);
            $entregados11 = $dato5['cantidad_disponible']; 
            $valor12 = "'".$entregados11."'"; //cantidad disponible en stock del registro original que sera editado

            $consulta_nomArticulo = "SELECT nom_articulo FROM articulo WHERE id_articulo = $edit_id_articulo_if;";
            $resultado_nomArticulo = pg_query($conexion_bd, $consulta_nomArticulo);

            $dato_nom = pg_fetch_array ($resultado_nomArticulo);
            $nomArticulo = $dato_nom['nom_articulo'];
            $nom_articulo = "'".$nomArticulo."'";

            $campo1 = "id_articulo, cantidad_ingreso, cantidad_disponible, id_almacen, nom_articulo";
            $valor13 = $edit_id_articulo.",".$edit_cantidad_ingreso.",".$edit_cantidad_ingreso.",".$edit_id_almacen.",".$nom_articulo;

            $bandera = TRUE;
            
            if(pg_num_rows($resultado14) > 0)
            {
                if(($edit_id_articulo_if == $entregados8) AND ($edit_id_almacen_if == $entregados10))
                {
                    if($entregados11 - $entregados9 + $edit_cantidad_ingreso_if < 0)
                    { 
                        $bandera = FALSE;

                        $cantidadInvalidaI = "La cantidad ingresada es invalida, parte de la cantidad registrada inicialmente ya fue distribuida y no esta disponible en el almacen";

                    } else{

                        //ACTUALIZAR STOCK DEL ARTICULO CON LAS CANDIDADES DEL REGISTRO DE INGRESO EDITADO

                        $consulta15 = "UPDATE stock 
                                        SET cantidad_ingreso = stock.cantidad_ingreso - $valor10 + $edit_cantidad_ingreso, 
                                            cantidad_disponible = stock.cantidad_disponible - $valor10 + $edit_cantidad_ingreso
                                        WHERE stock.id_articulo = $edit_id_articulo AND stock.id_almacen = $edit_id_almacen;";

                        $resultado15 = pg_query($consulta15) or die("No se pudieron insertar los datos por: ". pg_last_error());
                    }

                } else
                {
                    //SI SE EDITA EL ARTICULO O ALMACEN DE UN REGISTRO DE INGRESO, SE EJECUTA ESTO:
                    
                    $consulta16 = "SELECT cantidad_disponible FROM stock WHERE id_articulo = $edit_id_articulo AND id_almacen = $edit_id_almacen;";
                    $resultado16 = pg_query($conexion_bd, $consulta16);

                    $dato6 = pg_fetch_array ($resultado16);
                    $entregados12 = $dato6['cantidad_disponible']; 
                    $valor14 = "'".$entregados12."'"; //cantidad disponible en stock del registro editado
                    
                    
                    if($entregados11 - $entregados9 < 0)
                    {
                        $bandera = FALSE;
                        $noPuedeEditar = "No puede editar este registro, parte de la cantidad registrada inicialmente ya fue distribuida y no esta disponible en el almacen";

                    } else
                    {
                        //ACTUALIZAR STOCK, DEL ARTICULO SE ELIMINA LA CANTIDAD QUE HABIA EN EL REGISTRO DE INGRESO ANTES DE SER EDITADO

                        $consulta17 = "UPDATE stock 
                                        SET cantidad_ingreso = stock.cantidad_ingreso - $valor10, 
                                            cantidad_disponible = stock.cantidad_disponible - $valor10 
                                        WHERE stock.id_articulo = $valor9 AND stock.id_almacen = $valor11;";

                        $resultado17 = pg_query($consulta17) or die("No se pudieron insertar los datos por: ". pg_last_error());

                        if(pg_num_rows($resultado16) > 0)
                        {
                            //ACTUALIZAR STOCK, DEL ARTICULO SE SUMAN LA CANTIDAD QUE FUE EDITADA EN EL REGISTRO DE INGRESO

                            $consulta18 = "UPDATE stock 
                                            SET cantidad_ingreso = stock.cantidad_ingreso + $edit_cantidad_ingreso, 
                                                cantidad_disponible = stock.cantidad_disponible + $edit_cantidad_ingreso 
                                            WHERE stock.id_articulo = $edit_id_articulo AND stock.id_almacen = $edit_id_almacen;";

                            $resultado18 = pg_query($consulta18) or die("No se pudieron insertar los datos por: ". pg_last_error());

                        } else{

                            //INSERT EN STOCK PORQUE NO EXISTE UN REGISTRO DE ESE ARTICULO Y ALMACEN. 

                            $consulta19 = "INSERT INTO stock ($campo1) VALUES($valor13);";
                            $resultado19 = pg_query($consulta19) or die("No se pudieron insertar los datos por: ". pg_last_error());
                        }  
                    }
                }
            }

            if($bandera == TRUE) {

                //PROCESO EN TABLA AUDITORIA, PARA HACER UNA COPIA DEL REGISTRO ANTES DE QUE SEA EDITADO
                $campo_auditoria = "id_usuario, estado_registro, tabla_auditada, id_registro, orden_registro, fecha_registro, nom_almacen, nom_proveedor, nom_articulo, cantidad_articulo, observacion_registro";

                $estado_registro = "Antes de Modificar";
                $tabla_auditada = "Ingreso";
                
                $auditoria2 = "INSERT INTO auditoria ($campo_auditoria) 
                                VALUES(
                                    {$dato4['id_usuario']},
                                    '$estado_registro',
                                    '$tabla_auditada',
                                    {$dato4['id_ingreso']},
                                    '{$dato4['orden_ingreso']}',
                                    '{$dato4['fecha_ingreso']}',
                                    (SELECT nom_almacen FROM almacen WHERE id_almacen = {$dato4['id_almacen']}),
                                    (SELECT nom_proveedor FROM proveedor WHERE id_proveedor = {$dato4['id_proveedor']}),
                                    (SELECT nom_articulo FROM articulo WHERE id_articulo = {$dato4['id_articulo']}),
                                    {$dato4['cantidad_ingreso']},
                                    '{$dato4['observacion_i']}'
                                )";
                $resultado_auditoria2 = pg_query($auditoria2) or die("Error en auditoria2 por: ". pg_last_error());

                //SE ACTUALIZA EL REGISTRO DE INGRESO EDITADO

                $consulta99 = "UPDATE ingreso 
                                SET orden_ingreso = $edit_orden_ingreso,
                                    fecha_ingreso = $edit_fecha_ingreso,
                                    id_proveedor = $edit_id_proveedor,
                                    id_almacen = $edit_id_almacen,
                                    id_articulo = $edit_id_articulo,
                                    cantidad_ingreso = $edit_cantidad_ingreso, 
                                    observacion_i = $edit_observacion_i 
                                WHERE ingreso.id_ingreso = $id_guardar;";

                $resultado99 = pg_query($consulta99) or die("No se pudieron insertar los datos por: ". pg_last_error());

                $editado = "Registro actualizado exitosamente";

            }
        }


        $tbs->MergeBlock('proveedor',$conexion_bd,$proveedor);
        $tbs->MergeBlock('articulo',$conexion_bd,$articulo);
        $tbs->MergeBlock('medida',$conexion_bd,$medida);
        $tbs->MergeBlock('clasificacion',$conexion_bd,$clasificacion);
        $tbs->MergeBlock('almacen',$conexion_bd,$almacen);
        $tbs->MergeBlock('consulta6',$conexion_bd,$consulta6);
        $tbs->MergeBlock('consulta7',$conexion_bd,$consulta7);
        $tbs->MergeBlock('consulta12',$conexion_bd,$consulta12);

        $tbs->Show();


        //cierro conexion.
        pg_close($conexion_bd);
        exit;
    }
?>