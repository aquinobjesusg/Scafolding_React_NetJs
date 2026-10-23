<?php
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
    } else {



        $tbs = new clsTinyButStrong;
        $tbs->LoadTemplate('articulo.html','UTF-8');

        // Conexion con la base de datos
        $conexion_bd = pg_connect("host = $dbhost dbname = $dbdatabase user = $dbuser password = $dbpasswd port=$dbport") or die('No pudo conectarse: ' . pg_last_error());

        //Aqui empieza el codigo

        $articulo = "SELECT * FROM articulo ORDER BY nom_articulo ;";
        $medida = "SELECT * FROM medida ORDER BY nom_medida ;";
        $clasificacion = "SELECT * FROM clasificacion ORDER BY nom_clasificacion ;";
        $stock = "SELECT * FROM stock ORDER BY cantidad_disponible ;";

        if(isset($_POST['Registrar']))
        {
            $campo = "nom_articulo, id_medida, id_clasificacion, id_usuario";
            $valor .= "'".$_POST['nom_articulo']."',";
            $valor .= "'".$_POST['id_medida']."',";
            $valor .= "'".$_POST['id_clasificacion']."',";
            $valor .= "'".$usuario."'";

             //Validacion de datos ingresados

            if (empty(trim($_POST['nom_articulo']))) 
            {
                $vacio = 'Debe escribir el nombre del articulo';
           

            }elseif(!preg_match('/^[\p{L}0-9\s\-_]+$/u', $_POST['nom_articulo']))
            {

                $noValido = 'El nombre del articulo contiene caracteres no válidos. Solo se permiten letras, números, espacios, guiones y guiones bajos.';

            } elseif (empty(trim($_POST['id_clasificacion'])))
            {

                $clasificacionV = 'Debe seleccionar la clasificacion del articulo';

            } elseif (empty(trim($_POST['id_medida'])))
            {

            $medidaV = 'Debe seleccionar la medida del articulo';

            }else{

                	$consulta = "INSERT INTO articulo ($campo) VALUES($valor);";
               
                	$resultado = pg_query($consulta) or die("No se pudieron insertar los datos por: ". pg_last_error());

                      if ($resultado) {
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

        }

            

            //LISTADO

            $consulta1 = "SELECT id_articulo, nom_articulo, nom_medida, nom_clasificacion 
                          FROM articulo a
                          INNER JOIN medida m on m.id_medida = a.id_medida 
                          INNER JOIN clasificacion c on c.id_clasificacion = a.id_clasificacion
                          ORDER BY id_articulo DESC;";
            $resultado1 = pg_query($conexion_bd, $consulta1);

            //PROCESO PARA EDITAR UN REGISTRO REGISTRO
            if (isset($_POST['Editar']))
                {
                  $tbs->LoadTemplate('articuloEditar.html','UTF-8');

                  $id_capturada = $_POST['Editar'];

                    $consulta4 = "SELECT id_articulo, nom_articulo, m.id_medida, nom_medida, c.id_clasificacion, nom_clasificacion 
                          FROM articulo a
                          INNER JOIN medida m on m.id_medida = a.id_medida 
                          INNER JOIN clasificacion c on c.id_clasificacion = a.id_clasificacion
                          WHERE id_articulo = $id_capturada;";
                    $resultado4 = pg_query($conexion_bd, $consulta4);


                } else{

                }

            if (isset($_POST['Guardarcambios']))

            {

                $id_guardar = $_POST['Guardarcambios'] ;

                $editArticulo = "'".$_POST['nom_articulo']."'";
                $editMedida = "'".$_POST['id_medida']."'";
                $editClasificacion = "'".$_POST['id_clasificacion']."'";

                 //Validacion de datos ingresados

                if (empty(trim($_POST['nom_articulo']))) 
                {
                    $vacio = 'Debe escribir el nombre del articulo';
               

                }elseif(!preg_match('/^[\p{L}0-9\s\-_]+$/u', $_POST['nom_articulo']))
                {

                    $noValido = 'El nombre del articulo contiene caracteres no válidos. Solo se permiten letras, números, espacios, guiones y guiones bajos.';

                } elseif (empty(trim($_POST['id_clasificacion'])))
                {

                    $clasificacionV = 'Debe seleccionar la clasificacion del articulo';

                } elseif (empty(trim($_POST['id_medida'])))
                {

                $medidaV = 'Debe seleccionar la medida del articulo';

                }else
                {

                    $consulta2 = "UPDATE articulo 
                                SET nom_articulo = $editArticulo,
                                    id_medida = $editMedida,
                                    id_clasificacion = $editClasificacion,
                                    id_usuario = $usuario
                                WHERE id_articulo = $id_guardar;";
                    $resultado2 = pg_query($consulta2) or die("No se pudieron eliminar los datos por: ". pg_last_error());

                    $editado = "Registro editado exitosamente";

                      if ($resultado2) {
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
            }else{

            }


                //CONTEO PARA SABER CUANTOS REGISTROS EXISTEN 

                $consulta3 = "SELECT COUNT(*) AS total FROM articulo;";
                $resultado3 = pg_query($conexion_bd, $consulta3);

          
            $tbs->MergeBlock('consulta1',$conexion_bd,$consulta1);
            $tbs->MergeBlock('consulta2',$conexion_bd,$consulta2);
            $tbs->MergeBlock('consulta3',$conexion_bd,$consulta3);
             $tbs->MergeBlock('consulta4',$conexion_bd,$consulta4);  
            $tbs->MergeBlock('articulo',$conexion_bd,$articulo);
            $tbs->MergeBlock('medida',$conexion_bd,$medida);
            $tbs->MergeBlock('clasificacion',$conexion_bd,$clasificacion);
            $tbs->MergeBlock('stock',$conexion_bd,$stock);

            $tbs->Show();


            //cierro conexion.
            pg_close($conexion_bd);
            exit;
    }

	
?>