<?php
session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");
include_once ('funcs/funcs.php');

if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) {
    header("Location: index.php?valor=0");
    exit;
}

$usuario = $_SESSION['id_usuario'];
$nombre = $_SESSION['nom_usuario'];
$correo = $_SESSION['correo_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;

// VERIFICACIÓN DE PERMISOS
if (!$super_admin && !verificar_permiso_rapido('Almacén', 'almacen_crud_config')) {
    header("Location: acceso_denegado.php");
    exit;
}
    $tbs = new clsTinyButStrong;
    $tbs->LoadTemplate('articulo.html','UTF-8');
    try
    {
    //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        
        $articulo = "SELECT * FROM articulo ORDER BY nom_articulo ;";
        $medida = "SELECT * FROM medida ORDER BY nom_medida ;";
        $clasificacion = "SELECT * FROM clasificacion ORDER BY nom_clasificacion ;";

        if(isset($_POST['Registrar']))
        {
            // --- INICIO DE LA TRANSACCIÓN ---
            $conexion_bd->beginTransaction();

            if (empty(trim($_POST['nom_articulo'])) ||
                empty($_POST['id_medida']) ||
                empty($_POST['id_clasificacion'])) {

               
                $conexion_bd->rollBack();

                $_SESSION['mensaje'] = "Todos los campos son obligatorios.";
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: articulo.php");
                exit();
            }
            
            $camposArticulo = "id_usuario, nom_articulo, id_medida, id_clasificacion";
            $articuloInsert = "INSERT INTO articulo ($camposArticulo)
                                      VALUES (:id_usuario, :nom_articulo, :id_medida, :id_clasificacion)";
            $resultadoArticuloInsert = $conexion_bd->prepare($articuloInsert);
            $resultadoArticuloInsert->execute([
                    ':id_usuario' => $usuario,
                    ':nom_articulo' => $_POST['nom_articulo'],
                    ':id_medida' => $_POST['id_medida'],
                    ':id_clasificacion' => $_POST['id_clasificacion']
            ]);

            $conexion_bd->commit(); // Confirma todas las operaciones si todo fue exitoso.
            // --- FIN DE LA TRANSACCIÓN ---

            $_SESSION['mensaje'] = 'Artículo registrado exitosamente.';
            $_SESSION['tipo_mensaje'] = 'success';
            header("Location: articulo.php"); // Redirige a la página de consumibles para ver el listado actualizado.
            exit();

        }

         // MOSTRAR EL  LISTADO 
      
      
        include ("articuloListado.php"); 

    } catch (PDOException $e) {
        // Si ocurre un error de base de datos, revertimos la transacción.
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack(); 
        }
        $_SESSION['mensaje'] = "Error de base de datos al registrar/actualizar articulo: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en almacen.php (PDOException): " . $e->getMessage());

    } catch (Exception $e) {
        // Captura cualquier otra excepción que no sea de PDO (ej. `throw new Exception`).
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado al registrar/actualizar articulo: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en almacen.php (Exception): " . $e->getMessage()); // Para depuración
    }

    // --- RECUPERAR Y LIMPIAR MENSAJES DE SESIÓN PARA MOSTRAR EN EL FRONT-END ---
    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje']); // Limpiar el mensaje después de usarlo
    unset($_SESSION['tipo_mensaje']); // Limpiar el tipo de mensaje después de usarlo
    $tbs->MergeBlock('articulo', $conexion_bd, $articulo ?? null);
    $tbs->MergeBlock('medida', $conexion_bd, $medida ?? null);
    $tbs->MergeBlock('clasificacion', $conexion_bd, $clasificacion ?? null);  
    $tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
    $tbs->Show();
    exit;

 

?>