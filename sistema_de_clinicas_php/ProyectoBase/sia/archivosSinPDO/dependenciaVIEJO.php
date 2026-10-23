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
            $tbs->LoadTemplate('dependencia.html','UTF-8');

            // Conexion con la base de datos
            $conexion_bd = pg_connect("host = $dbhost dbname = $dbdatabase user = $dbuser password = $dbpasswd port=$dbport") or die('No pudo conectarse: ' . pg_last_error());

            //Aqui empieza el codigo

            $dependencia= "SELECT * FROM dependencia ORDER BY nom_dependencia;";
            $ente= "SELECT * FROM ente ORDER BY id_ente DESC;";

            

            if(isset($_POST['Registrar']))
            {
                $campo = "nom_dependencia, ubicacion_dependencia, id_ente, id_usuario";
                $valor .= "'".$_POST['nom_dependencia']."',";
                $valor .= "'".$_POST['ubicacion_dependencia']."',";
                $valor .= "'".$_POST['id_ente']."',";
                $valor .= "'".$usuario."'";

                 //Validacion de datos ingresados nombre de dependencia

                    if (empty(trim($_POST['nom_dependencia']))) 
                    {
                        $vacioNomDep = 'Debe escribir el nombre de la dependencia';
                    } elseif (strlen($_POST['nom_dependencia']) < 3)
                    {

                        $mayorNomDep = 'El nombre de la dependencia debe tener al menos 3 caracteres.';

                    }elseif(!preg_match('/^[\p{L}0-9\s\-_]+$/u', ($_POST['nom_dependencia'])))
                    {

                        $noValidoNomDep = 'El nombre de la dependencia contiene caracteres no válidos. Solo se permiten letras, números, espacios, guiones y guiones bajos.';

                        //Validacion de datos ingresados nombre de dependencia

                    }elseif (empty(trim($_POST['ubicacion_dependencia']))) 
                    {
                        $vacioUdep = 'Debe escribir la ubicacion de la dependencia';
                    } elseif (strlen($_POST['ubicacion_dependencia']) < 3)
                    {

                        $mayorUdep = 'La ubicacion de la dependencia debe tener al menos 3 caracteres.';

                    }elseif (strlen($_POST['ubicacion_dependencia']) > 255)
                    {

                        $limiteUdep = 'La ubicacion de la dependencia  no puede tener más de 255 caracteres.';

                    }elseif(!preg_match('/^[\p{L}0-9\s\-_]+$/u', ($_POST['ubicacion_dependencia'])))
                    {

                        $noValidoUdep = 'La ubicacion de la dependencia contiene caracteres no válidos. Solo se permiten letras, números, espacios, guiones, guiones bajos y puntos.';

                    }elseif (empty(trim($_POST['id_ente'])))
                    {

                        $enteV = 'Debe seleccionar el Ente';

                    }else{

                	$consulta = "INSERT INTO dependencia($campo) VALUES($valor);";
                      
                	$resultado = pg_query($consulta) or die("No se pudieron insertar los datos por: ". pg_last_error());

                	$fino = "Registro Completado";

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
                     //LISTADO DE DEPENDENCIAS

                    $consulta1 = "SELECT id_dependencia, nom_dependencia, ubicacion_dependencia, nom_ente 
                                  FROM dependencia d
                                  INNER JOIN ente e on e.id_ente = d.id_ente
                                  ORDER BY id_dependencia DESC;";
                    $resultado1 = pg_query($conexion_bd, $consulta1);


                    
            if (isset($_POST['Editar']))
                {
                  $tbs->LoadTemplate('dependenciaEditar.html','UTF-8');

                  $id_capturada = $_POST['Editar'];

                    $consulta2 = "SELECT id_dependencia, nom_dependencia, ubicacion_dependencia,e.id_ente, nom_ente
                          FROM dependencia d
                          INNER JOIN ente e on e.id_ente = d.id_ente 
                          WHERE id_dependencia = $id_capturada;";
                    $resultado2 = pg_query($conexion_bd, $consulta2);


                } else{

                }

            if (isset($_POST['Guardarcambios']))

            {

                $id_guardar = $_POST['Guardarcambios'] ;

                $editDependencia = "'".$_POST['nom_dependencia']."'";
                $editUbicacion = "'".$_POST['ubicacion_dependencia']."'";
                $editEnte = "'".$_POST['id_ente']."'";

                if (empty(trim($_POST['nom_dependencia']))) 
                    {
                        $vacioNomDep = 'Debe escribir el nombre de la dependencia';
                    } elseif (strlen($_POST['nom_dependencia']) < 3)
                    {

                        $mayorNomDep = 'El nombre de la dependencia debe tener al menos 3 caracteres.';

                    }elseif(!preg_match('/^[\p{L}0-9\s\-_]+$/u', ($_POST['nom_dependencia'])))
                    {

                        $noValidoNomDep = 'El nombre de la dependencia contiene caracteres no válidos. Solo se permiten letras, números, espacios, guiones y guiones bajos.';

                        //Validacion de datos ingresados nombre de dependencia

                    }elseif (empty(trim($_POST['ubicacion_dependencia']))) 
                    {
                        $vacioUdep = 'Debe escribir la ubicacion de la dependencia';
                    } elseif (strlen($_POST['ubicacion_dependencia']) < 3)
                    {

                        $mayorUdep = 'La ubicacion de la dependencia debe tener al menos 3 caracteres.';

                    }elseif (strlen($_POST['ubicacion_dependencia']) > 255)
                    {

                        $limiteUdep = 'La ubicacion de la dependencia  no puede tener más de 255 caracteres.';

                    }elseif(!preg_match('/^[\p{L}0-9\s\-_]+$/u', ($_POST['ubicacion_dependencia'])))
                    {

                        $noValidoUdep = 'La ubicacion de la dependencia contiene caracteres no válidos. Solo se permiten letras, números, espacios, guiones, guiones bajos y puntos.';

                    }elseif (empty(trim($_POST['id_ente'])))
                    {

                        $enteV = 'Debe seleccionar el Ente';

                    }else{
             
                        $consulta3 = "UPDATE dependencia 
                                      SET nom_dependencia = $editDependencia,
                                          ubicacion_dependencia = $editUbicacion,
                                          id_ente = $editEnte,
                                          id_usuario = $usuario
                                      WHERE id_dependencia = $id_guardar;";
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

                        $consulta4 = "SELECT COUNT(*) AS total FROM dependencia;";
                        $resultado4 = pg_query($conexion_bd, $consulta4);


                    $tbs->MergeBlock('consulta1',$conexion_bd,$consulta1);
                    $tbs->MergeBlock('consulta2',$conexion_bd,$consulta2); 
                    $tbs->MergeBlock('consulta3',$conexion_bd,$consulta3);
                    $tbs->MergeBlock('consulta4',$conexion_bd,$consulta4);  
                    $tbs->MergeBlock('ente',$conexion_bd,$ente);
                    $tbs->MergeBlock('dependencia',$conexion_bd,$dependencia);
                    

                    $tbs->Show();


                    //cierro conexion.
                    pg_close($conexion_bd);
                    exit;
    }     
	
?>