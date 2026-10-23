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
    }
    else
    {

        $tbs = new clsTinyButStrong;
        $tbs->LoadTemplate('clasificacion.html','UTF-8');


        // Conexion con la base de datos
        $conexion_bd = pg_connect("host = $dbhost dbname = $dbdatabase user = $dbuser password = $dbpasswd port=$dbport") or die('No pudo conectarse: ' . pg_last_error());

        //Aqui empieza el codigo de INSENTAR
        //Selecciono la tabla 

        $clasificacion = "SELECT * FROM clasificacion ORDER BY nom_clasificacion ;";
        $mostrar = "SELECT id_clasificacion, nom_clasificacion FROM clasificacion WHERE id_clasificacion= 20";

        //paso los datos

        if(isset($_POST['Registrar']))
        {

            $campo = "nom_clasificacion,id_usuario";
            $valor .= "'".$_POST['nom_clasificacion']."',";
            $valor .= "'".$usuario."'";

             //Validacion de datos ingresados

             if (empty(trim($_POST['nom_clasificacion']))) 
            {
                $vacio = 'Debe escribir el nombre de la clasificacion';
            } elseif (strlen($_POST['nom_clasificacion']) < 3)
            {

                $mayor = 'El nombre de la clasificacion debe tener al menos 3 caracteres.';


            }elseif(!preg_match('/^[\p{L}0-9\s\-_]+$/u', ($_POST['nom_clasificacion'])))
            {

                $noValido = 'El nombre de la clasificacion contiene caracteres no válidos. Solo se permiten letras, números, espacios, guiones y guiones bajos.';

            }else{


        //Guardo en la tabla                

            	$consulta = "INSERT INTO clasificacion ($campo) VALUES($valor);";
                  
            	$resultado1 = pg_query($consulta) or die("No se pudieron insertar los datos por: ". pg_last_error());

            	$fino = "Registro Completado";


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

        }

         //LISTADO DE REGISTROS

        $consulta1 = "SELECT id_clasificacion, nom_clasificacion FROM clasificacion ORDER BY id_clasificacion DESC;";
        $resultado1 = pg_query($conexion_bd, $consulta1);


            if (isset($_POST['Editar']))
                {
                  $tbs->LoadTemplate('clasificacionEditar.html','UTF-8');

                  $id_capturada = $_POST['Editar'];

                    $consulta2 = "SELECT id_clasificacion, nom_clasificacion
                          FROM clasificacion
                          WHERE id_clasificacion = $id_capturada;";
                    $resultado2 = pg_query($conexion_bd, $consulta2);


                } else{

                }

            if (isset($_POST['Guardarcambios']))

            {

                $id_guardar = $_POST['Guardarcambios'] ;

                $editClasificacion = "'".$_POST['nom_clasificacion']."'";

                if (empty(trim($_POST['nom_clasificacion']))) 
                {
                    $vacio = 'Debe escribir el nombre de la clasificacion';
                } elseif (strlen($_POST['nom_clasificacion']) < 3)
                {

                    $mayor = 'El nombre de la clasificacion debe tener al menos 3 caracteres.';


                }elseif(!preg_match('/^[\p{L}0-9\s\-_]+$/u', ($_POST['nom_clasificacion'])))
                {

                    $noValido = 'El nombre de la clasificacion contiene caracteres no válidos. Solo se permiten letras, números, espacios, guiones y guiones bajos.';

                }else
                {
             
                    $consulta3 = "UPDATE clasificacion 
                                  SET nom_clasificacion = $editClasificacion,
                                    id_usuario = $usuario
                                  WHERE id_clasificacion = $id_guardar;";
                    $resultado3 = pg_query($consulta3) or die("No se pudieron eliminar los datos por: ". pg_last_error());

                    $editado = "Registro editado exitosamente";

                      if ($resultado3) {
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

        $consulta4 = "SELECT COUNT(*) AS total FROM clasificacion;";
        $resultado4 = pg_query($conexion_bd, $consulta4);


        $tbs->MergeBlock('consulta1',$conexion_bd,$consulta1);
        $tbs->MergeBlock('consulta2',$conexion_bd,$consulta2);
        $tbs->MergeBlock('consulta3',$conexion_bd,$consulta3);
        $tbs->MergeBlock('consulta4',$conexion_bd,$consulta4); 
        $tbs->MergeBlock('clasificacion',$conexion_bd,$clasificacion);
        $tbs->MergeBlock('mostrar',$conexion_bd,$mostrar);
        $tbs->Show();

        //cierro conexion.
        pg_close($conexion_bd);
        exit;
    }
    	
?>