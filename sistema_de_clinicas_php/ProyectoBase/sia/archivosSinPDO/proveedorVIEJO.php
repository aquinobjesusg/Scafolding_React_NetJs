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
        $tbs->LoadTemplate('proveedor.html','UTF-8');

        // Conexion con la base de datos
        $conexion_bd = pg_connect("host = $dbhost dbname = $dbdatabase user = $dbuser password = $dbpasswd port=$dbport") or die('No pudo conectarse: ' . pg_last_error());

        //Aqui empieza el codigo

        $proveedor = "SELECT * FROM proveedor ORDER BY nom_proveedor ;";

        if(isset($_POST['Registrar']))
        {
            $campo = "nom_proveedor, rif_proveedor, correo_proveedor, telefono_proveedor, id_usuario";
            $valor .= "'".$_POST['nom_proveedor']."',";
            $valor .= "'".$_POST['rif_proveedor']."',";
            $valor .= "'".$_POST['correo_proveedor']."',";
            $valor .= "'".$_POST['telefono_proveedor']."',";
            $valor .= "'".$usuario."'";

            //Validacion para nombre del proveedor

            if (empty(trim($_POST['nom_proveedor']))) 
            {
                $vacio = 'Debe escribir el nombre del proveedor';

            } elseif (strlen($_POST['nom_proveedor']) < 3)
            {

                $mayor = 'El nombre del proveedor debe tener al menos 3 caracteres.';


            }elseif(empty(trim($_POST['rif_proveedor']))) 
            {
                $vacioRif = 'Debe escribir el rif del proveedor';

            } elseif (strlen($_POST['rif_proveedor']) < 11)
            {

                $mayorRif = 'El rif del proveedor debe tener al menos 11 caracteres.';

            }elseif (strlen($_POST['rif_proveedor']) > 30)
            {

                $limiteRif = 'El rif del proveedor no puede tener más de 30 caracteres.';

            }elseif(!preg_match('/^[a-zA-Z0-9\-]+$/', ($_POST['rif_proveedor'])))
            {

                $noValidoRif = 'El rif del proveedor contiene caracteres no válidos. Solo se permiten letras, números y guion sin espacios.';
            
            }elseif (!filter_var($_POST['correo_proveedor'], FILTER_VALIDATE_EMAIL)) {

                $errorCorreo = "Error: Correo electrónico no válido.";

            }elseif (!preg_match('/^[0-9\s\-\(\)\+]+$/', $_POST['telefono_proveedor'])) {

                $errorTelefono = "El número de teléfono no es válido. Solo se permiten números, espacios, guiones, paréntesis y el signo más.";

            }else{


            	$consulta = "INSERT INTO proveedor ($campo) VALUES($valor);";
                  
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
         //LISTADO DE PROVEEDOR

        $consulta1 = "SELECT id_proveedor, nom_proveedor, rif_proveedor, correo_proveedor, 
                        telefono_proveedor 
                        FROM proveedor ORDER BY id_proveedor DESC;";
        $resultado1 = pg_query($conexion_bd, $consulta1);


                
            if (isset($_POST['Editar']))
                {
                  $tbs->LoadTemplate('proveedorEditar.html','UTF-8');

                  $id_capturada = $_POST['Editar'];

                    $consulta2 = "SELECT id_proveedor, nom_proveedor, rif_proveedor, correo_proveedor, telefono_proveedor
                          FROM proveedor p
                          WHERE id_proveedor = $id_capturada
                          ORDER BY id_proveedor DESC;";
                    $resultado2 = pg_query($conexion_bd, $consulta2);


                } else{

                }

            if (isset($_POST['Guardarcambios']))

            {

                $id_guardar = $_POST['Guardarcambios'] ;

                $editProveedor = "'".$_POST['nom_proveedor']."'";
                $editRif = "'".$_POST['rif_proveedor']."'";
                $editCorreo = "'".$_POST['correo_proveedor']."'";
                $editTelefono = "'".$_POST['telefono_proveedor']."'";

                if (empty(trim($_POST['nom_proveedor']))) 
                {
                    $vacio = 'Debe escribir el nombre del proveedor';

                } elseif (strlen($_POST['nom_proveedor']) < 3)
                {

                    $mayor = 'El nombre del proveedor debe tener al menos 3 caracteres.';


                }elseif(empty(trim($_POST['rif_proveedor']))) 
                {
                    $vacioRif = 'Debe escribir el rif del proveedor';

                } elseif (strlen($_POST['rif_proveedor']) < 11)
                {

                    $mayorRif = 'El rif del proveedor debe tener al menos 11 caracteres.';

                }elseif (strlen($_POST['rif_proveedor']) > 30)
                {

                    $limiteRif = 'El rif del proveedor no puede tener más de 30 caracteres.';

                }elseif(!preg_match('/^[a-zA-Z0-9\-]+$/', ($_POST['rif_proveedor'])))
                {

                    $noValidoRif = 'El rif del proveedor contiene caracteres no válidos. Solo se permiten letras, números y guion sin espacios.';
                
                }elseif (!filter_var($_POST['correo_proveedor'], FILTER_VALIDATE_EMAIL)) {
                    
                    $errorCorreo = "Error: Correo electrónico no válido.";

                }elseif (!preg_match('/^[0-9\s\-\(\)\+]+$/', $_POST['telefono_proveedor'])) {

                    $errorTelefono = "El número de teléfono no es válido. Solo se permiten números, espacios, guiones, paréntesis y el signo más.";

                }else{

             
                    $consulta3 = "UPDATE proveedor 
                                  SET nom_proveedor = $editProveedor,
                                      rif_proveedor = $editRif,
                                      correo_proveedor = $editCorreo,
                                      telefono_proveedor = $editTelefono,
                                      id_usuario = $usuario
                                  WHERE id_proveedor = $id_guardar;";
                    $resultado3 = pg_query($consulta3) or die("No se pudieron editar los datos por: ". pg_last_error());

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

            $consulta4 = "SELECT COUNT(*) AS total FROM proveedor;";
            $resultado4 = pg_query($conexion_bd, $consulta4);


        $tbs->MergeBlock('consulta1',$conexion_bd,$consulta1);
        $tbs->MergeBlock('consulta2',$conexion_bd,$consulta2);
        $tbs->MergeBlock('consulta3',$conexion_bd,$consulta3);
        $tbs->MergeBlock('consulta4',$conexion_bd,$consulta4);
        $tbs->MergeBlock('proveedor',$conexion_bd,$proveedor);        
        
        $tbs->Show();


        //cierro conexion.
        pg_close($conexion_bd);
        exit;
	}
?>