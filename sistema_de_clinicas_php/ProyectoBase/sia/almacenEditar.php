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
if (!$super_admin && !verificar_permiso_rapido('Almacén', 'almacen_editar')) {
    header("Location: acceso_denegado.php");
    exit;
}
    $tbs = new clsTinyButStrong;
    $tbs->LoadTemplate('almacenEditar.html','UTF-8');
    try
    {
    //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        
        $almacen = "SELECT * FROM almacen ORDER BY nom_almacen ;";
        $ente= "SELECT * FROM ente ORDER BY id_ente DESC;";

        $id_almacen_edit = null;
        $almacen = [];

        // Primero verificar si estamos en modo actualización (Guardarcambios)
        if (isset($_POST['Guardarcambios']) && isset($_POST['id_almacen_actualizar'])) {
            $id_almacen_edit = $_POST['id_almacen_actualizar'];
            
            // Validación de campos obligatorios
            $camposObligatorios = [
                'nom_almacen',
                'id_ente'
            ];
            
            $camposVacios = [];
            foreach ($camposObligatorios as $campo) {
                if (empty(trim($_POST[$campo] ?? ''))) {
                    $camposVacios[] = $campo;
                }
            }
            
            if (!empty($camposVacios)) {
                $_SESSION['mensaje'] = "Todos los campos son obligatorios";
                $_SESSION['tipo_mensaje'] = 'danger';
                
                // Recargar los datos para mostrar el formulario con errores
                $almacenSql = "SELECT id_almacen, nom_almacen, e.id_ente, nom_ente
                              FROM almacen al
                              INNER JOIN ente e ON e.id_ente = al.id_ente 
                              WHERE id_almacen = :id_almacen_edit";
                
                $almacenPE = $conexion_bd->prepare($almacenSql);
                $almacenPE->execute([':id_almacen_edit' => $id_almacen_edit]);
                $almacen = $almacenPE->fetch(PDO::FETCH_ASSOC);
                
            } else {
                // Todos los campos están llenos, proceder con la actualización
                $conexion_bd->beginTransaction();

                $almacenUpdate = "UPDATE almacen
                                 SET id_usuario = :id_usuario,
                                     nom_almacen = :nom_almacen,
                                     id_ente = :id_ente
                                 WHERE id_almacen = :id_almacen";
                
                $resultadoalmacenUpdate = $conexion_bd->prepare($almacenUpdate);
                $resultadoalmacenUpdate->execute([
                    ':id_usuario' => $_SESSION['id_usuario'] ?? null,
                    ':nom_almacen' => trim($_POST['nom_almacen']),
                    ':id_ente' => (int)$_POST['id_ente'],
                    ':id_almacen' => $id_almacen_edit
                ]);
                
                $conexion_bd->commit();
                
                $_SESSION['mensaje'] = 'Registro actualizado exitosamente.';
                $_SESSION['tipo_mensaje'] = 'success';
                header("Location: almacen.php");
                exit();
            }
            
        } elseif (isset($_POST['Editar']) && !empty($_POST['Editar'])) {
            // Modo edición (mostrar formulario)
            $id_almacen_edit = $_POST['Editar'];
            
        } elseif (isset($_POST['id_almacen_actualizar']) && !empty($_POST['id_almacen_actualizar'])) {
            // Backup por si acaso
            $id_almacen_edit = $_POST['id_almacen_actualizar'];
            
        } else {
            $_SESSION['mensaje'] = 'Error: El almacén a editar no fue encontrado.';
            $_SESSION['tipo_mensaje'] = 'danger';
            header("Location: almacen.php");
            exit();
        }

        // Si no tenemos datos de almacén aún, cargarlos
        if (empty($almacen) && $id_almacen_edit) {
            // Consulta para obtener datos del almacén
            $almacenSql = "SELECT id_almacen, nom_almacen, e.id_ente, nom_ente
                          FROM almacen al
                          INNER JOIN ente e ON e.id_ente = al.id_ente 
                          WHERE id_almacen = :id_almacen_edit";
            
            $almacenPE = $conexion_bd->prepare($almacenSql);
            $almacenPE->execute([':id_almacen_edit' => $id_almacen_edit]);
            $almacen = $almacenPE->fetch(PDO::FETCH_ASSOC);

            if (!$almacen) {
                $_SESSION['mensaje'] = 'Error: El almacén no existe.';
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: almacen.php");
                exit();
            }
        }

        // Consultas para los dropdowns
        $ente = "SELECT * FROM ente ORDER BY id_ente DESC";
        $almacenes = "SELECT * FROM almacen ORDER BY nom_almacen";

        // Preparar datos para TBS
        $tbs->MergeField('almacen', $almacen);
        $tbs->MergeBlock('ente_option', $conexion_bd, $ente);
        $tbs->MergeBlock('almacenes', $conexion_bd, $almacenes);

    } catch (PDOException $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack(); 
        }
        $_SESSION['mensaje'] = "Error de base de datos: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en almacenEditar.php (PDOException): " . $e->getMessage());
        header("Location: almacen.php");
        exit();
    } catch (Exception $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en almacenEditar.php (Exception): " . $e->getMessage());
        header("Location: almacen.php");
        exit();
    }

    // Mensajes de sesión
    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje']);
    unset($_SESSION['tipo_mensaje']);

    $tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
    $tbs->Show();

    

?>