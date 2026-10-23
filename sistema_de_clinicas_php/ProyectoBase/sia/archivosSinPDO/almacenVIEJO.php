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
    } else
    {
      

        $tbs = new clsTinyButStrong;
        $tbs->LoadTemplate('almacen.html','UTF-8');

        // Conexion con la base de datos
        $conexion_bd = pg_connect("host = $dbhost dbname = $dbdatabase user = $dbuser password = $dbpasswd port=$dbport") or die('No pudo conectarse: ' . pg_last_error());

        //Aqui empieza el codigo

        $almacen = "SELECT * FROM almacen ORDER BY nom_almacen ;";
        $ente= "SELECT * FROM ente ORDER BY id_ente DESC;";

        if(isset($_POST['Registrar']))
        {
            $campo = "nom_almacen,id_ente, id_usuario";
            $valor .= "'".$_POST['nom_almacen']."',";
            $valor .= "'".$_POST['id_ente']."',";
            $valor .= "'".$usuario."'";

            //Validacion de datos ingresados

            if (empty(trim($_POST['nom_almacen']))) {
              $vacio = 'Debe escribir el nombre del almacen';
            } elseif (strlen($_POST['nom_almacen']) < 3){

              $mayor = 'El nombre del almacén debe tener al menos 3 caracteres.';

            }elseif(!preg_match('/^[\p{L}0-9\s\-_()]+$/u', $_POST['nom_almacen'])){

              $noValido = 'El nombre del almacén contiene caracteres no válidos. Solo se permiten letras, números, espacios, guiones y guiones bajos.';

            }elseif (empty(trim($_POST['id_ente'])))
            {

                $enteV = 'Debe seleccionar el Ente del Almacen';

            }else{



            	$consulta1 = "INSERT INTO almacen($campo) VALUES($valor);";
                  
            	$respuesta1 = pg_query($consulta1) or die("No se pudieron insertar los datos por: ". pg_last_error());

            	$fino = "Registro Completado";

                if ($respuesta1) {
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

            $consulta1 = "SELECT id_almacen, nom_almacen, nom_ente 
                          FROM almacen a
                          INNER JOIN ente e on e.id_ente = a.id_ente 
                          ORDER BY id_almacen DESC;";
            $resultado1 = pg_query($conexion_bd, $consulta1);

            //PROCEOS PARA EDITAR PROXIMAMENTE, HAZLO, ACUERDATE


            if (isset($_POST['Editar']))
                {
                  $tbs->LoadTemplate('almacenEditar.html','UTF-8');

                  $id_capturada = $_POST['Editar'];

                    $consulta2 = "SELECT id_almacen, nom_almacen, e.id_ente, nom_ente
                          FROM almacen al
                          INNER JOIN ente e on e.id_ente = al.id_ente 
                          WHERE id_almacen = $id_capturada;";
                    $resultado2 = pg_query($conexion_bd, $consulta2);


                } else{

                }

            if (isset($_POST['Guardarcambios']))

            {

                $id_guardar = $_POST['Guardarcambios'] ;

                $editAlmacen = "'".$_POST['nom_almacen']."'";
                $editEnte = "'".$_POST['id_ente']."'";

                if (empty(trim($_POST['nom_almacen']))) {

                  $vacio = 'Edicion no cumplida: Debe escribir el nombre del almacen';

                } elseif (strlen($_POST['nom_almacen']) < 3){

                  $mayor = 'Edicion no cumplida: El nombre del almacén debe tener al menos 3 caracteres.';

                }elseif(!preg_match('/^[\p{L}0-9\s\-_]+$/u', ($_POST['nom_almacen']))){

                  $noValido = 'Edicion no cumplida: El nombre del almacén contiene caracteres no válidos. Solo se permiten letras, números, espacios, guiones y guiones bajos.';

                }elseif (empty(trim($_POST['id_ente'])))
                {

                    $enteV = 'Edicion no cumplida: Debe seleccionar el Ente del Almacen';

                }else{

               
                    $consulta3 = "UPDATE almacen 
                                  SET nom_almacen = $editAlmacen,
                                      id_ente = $editEnte,
                                      id_usuario = $usuario
                                  WHERE id_almacen = $id_guardar;";
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

            $consulta4 = "SELECT COUNT(*) AS total FROM almacen;";
            $resultado4 = pg_query($conexion_bd, $consulta4);

        $tbs->MergeBlock('consulta1',$conexion_bd,$consulta1);
        $tbs->MergeBlock('consulta2',$conexion_bd,$consulta2);
        $tbs->MergeBlock('consulta3',$conexion_bd,$consulta3);
        $tbs->MergeBlock('consulta4',$conexion_bd,$consulta4);
        $tbs->MergeBlock('ente',$conexion_bd,$ente);
        $tbs->Show();
        


        //cierro conexion.
        pg_close($conexion_bd);
        exit;
    }

	
?>