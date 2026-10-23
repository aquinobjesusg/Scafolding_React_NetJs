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
            $tbs->LoadTemplate('ente.html','UTF-8');

            // Conexion con la base de datos
            $conexion_bd = pg_connect("host = $dbhost dbname = $dbdatabase user = $dbuser password = $dbpasswd port=$dbport") or die('No pudo conectarse: ' . pg_last_error());

            //Aqui empieza el codigo

            $ente = "SELECT * FROM ente ORDER BY nom_ente ;";
            $almacen = "select * from almacen b order by id_almacen desc";

            if(isset($_POST['Registrar']))
            {
                $campo = "nom_ente, siglas_ente, id_usuario";
                $valor .= "'".$_POST['nom_ente']."',";
                $valor .= "'".$_POST['siglas_ente']."',";
                $valor .= "'".$usuario."'";

                if (empty(trim($_POST['nom_ente']))) {
                  $vacio = 'Debe escribir el nombre del ente';

                } elseif (strlen($_POST['nom_ente']) < 3){

                  $mayor = 'El nombre del ente debe tener al menos 3 caracteres.';

                }elseif(!preg_match('/^[\p{L}0-9\s\-_]+$/u', ($_POST['nom_ente']))){

                  $noValido = 'El nombre del ente contiene caracteres no válidos. Solo se permiten letras, números, espacios, guiones y guiones bajos.';


                } else{
                    $consulta = "INSERT INTO ente($campo) VALUES($valor);";
                          
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
                 //LISTADO DE ENTES

                $consulta1 = "SELECT id_ente, nom_ente, siglas_ente 
                              FROM ente 
                              ORDER BY id_ente DESC;";
                $resultado1 = pg_query($conexion_bd, $consulta1);


                        
                    if (isset($_POST['Editar']))
                        {
                          $tbs->LoadTemplate('enteEditar.html','UTF-8');

                          $id_capturada = $_POST['Editar'];

                            $consulta2 = "SELECT id_ente, nom_ente, siglas_ente
                                  FROM ente 
                                  WHERE id_ente = $id_capturada
                                  ORDER BY id_ente;";
                            $resultado2 = pg_query($conexion_bd, $consulta2);


                        } else{

                        }

                    if (isset($_POST['Guardarcambios']))

                    {

                        $id_guardar = $_POST['Guardarcambios'] ;

                        $editEnte = "'".$_POST['nom_ente']."'";
                        $editSiglas = "'".$_POST['siglas_ente']."'";

                         if (empty(trim($_POST['nom_ente']))) {
                          $vacio = 'Debe escribir el nombre del ente';

                        } elseif (strlen($_POST['nom_ente']) < 3){

                          $mayor = 'El nombre del ente debe tener al menos 3 caracteres.';

                        }elseif(!preg_match('/^[\p{L}0-9\s\-_]+$/u', ($_POST['nom_ente']))){

                          $noValido = 'El nombre del ente contiene caracteres no válidos. Solo se permiten letras, números, espacios, guiones y guiones bajos.';

                        }else{
                     
                            $consulta3 = "UPDATE ente 
                                          SET nom_ente = $editEnte,
                                              siglas_ente = $editSiglas,
                                              id_usuario = $usuario
                                          WHERE id_ente = $id_guardar;";
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



                    $consulta4 = "SELECT COUNT(*) AS total FROM ente;";
                    $resultado4 = pg_query($conexion_bd, $consulta4);


                $tbs->MergeBlock('consulta1',$conexion_bd,$consulta1);
                $tbs->MergeBlock('consulta2',$conexion_bd,$consulta2);  
                $tbs->MergeBlock('consulta3',$conexion_bd,$consulta3);
                $tbs->MergeBlock('consulta4',$conexion_bd,$consulta4);      
                $tbs->MergeBlock('almacen',$conexion_bd,$almacen);

                $tbs->Show();


                //cierro conexion.
                pg_close($conexion_bd);
                exit;
    }
	
?>