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
        $tbs->LoadTemplate('medida.html','UTF-8');

        // CONEXION CON LA BASE DE DATOS
        $conexion_bd = pg_connect("host = $dbhost dbname = $dbdatabase user = $dbuser password = $dbpasswd port=$dbport") or die('No pudo conectarse: ' . pg_last_error());

        //AQUI EMPIEZA EL CODIGO

        if(isset($_POST['Registrar']))
        {
        
            $campo = "nom_medida,id_usuario";
            $valor .= "'".$_POST['nom_medida']."',";
            $valor .= "'".$usuario."'";



            if (empty(trim($_POST['nom_medida']))) 
            {
                $vacio = 'Debe escribir el nombre de la medida';
            } elseif (strlen($_POST['nom_medida']) < 3)
            {

                $mayor = 'El nombre de la medida debe tener al menos 3 caracteres.';


            }elseif(!preg_match('/^[\p{L}0-9\s\-_()]+$/u', ($_POST['nom_medida'])))
            {

                $noValido = 'El nombre de la medida contiene caracteres no válidos. Solo se permiten letras, números, espacios, guiones, guiones bajos y parentesis.';
            }else{


        	$consulta = "INSERT INTO medida ($campo) VALUES($valor);";
              
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
        
        
        //LISTADO DE REGISTROS

        $consulta1 = "SELECT id_medida, nom_medida 
                      FROM medida 
                      ORDER BY id_medida DESC;";
        $resultado1 = pg_query($conexion_bd, $consulta1);


        
            if (isset($_POST['Editar']))
                {
                  $tbs->LoadTemplate('medidaEditar.html','UTF-8');

                  $id_capturada = $_POST['Editar'];

                    $consulta2 = "SELECT id_medida, nom_medida
                          FROM medida 
                          WHERE id_medida = $id_capturada
                          ORDER BY id_medida DESC;";
                    $resultado2 = pg_query($conexion_bd, $consulta2);


                } else{

                }

            if (isset($_POST['Guardarcambios']))

            {

                $id_guardar = $_POST['Guardarcambios'] ;

                $editMedida = "'".$_POST['nom_medida']."'";

                if (empty(trim($_POST['nom_medida']))) 
                {
                    $vacio = 'Debe escribir el nombre de la medida';
                } elseif (strlen($_POST['nom_medida']) < 3)
                {

                    $mayor = 'El nombre de la medida debe tener al menos 3 caracteres.';


                }elseif(!preg_match('/^[\p{L}0-9\s\-_()]+$/u', ($_POST['nom_medida'])))
                {

                    $noValido = 'El nombre de la medida contiene caracteres no válidos. Solo se permiten letras, números, espacios, guiones, guiones bajos y parentesis.';
                }else{

             
                    $consulta3 = "UPDATE medida 
                                  SET nom_medida = $editMedida,
                                        id_usuario = $usuario
                                  WHERE id_medida = $id_guardar;";
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
        



        //CONTEO PARA SABER CUANTOS REGISTROS EXISTEN EN MEDIDA

        $consulta4 = "SELECT COUNT(*) AS total FROM medida;";
        $resultado4 = pg_query($conexion_bd, $consulta4);


        $tbs->MergeBlock('consulta1',$conexion_bd,$consulta1);
        $tbs->MergeBlock('consulta2',$conexion_bd,$consulta2);
        $tbs->MergeBlock('consulta3',$conexion_bd,$consulta3);
        $tbs->MergeBlock('consulta4',$conexion_bd,$consulta4);
        $tbs->Show();

        //cierro conexion.
        pg_close($conexion_bd);
        exit;

    }
	
?>