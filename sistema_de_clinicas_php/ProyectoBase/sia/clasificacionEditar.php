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
    $tbs->LoadTemplate('clasificacionEditar.html','UTF-8');
    try
    {
    //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 

       $id_clasificacion_edit = null;
        $clasificacion = [];

        // Primero verificar si estamos en modo actualización (Guardarcambios)
        if (isset($_POST['Guardarcambios']) && isset($_POST['id_clasificacion_actualizar'])) {
            $id_clasificacion_edit = $_POST['id_clasificacion_actualizar'];
            
            // Validación de campos obligatorios
            $camposObligatorios = [
                'nom_clasificacion'
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
                $clasificacionSql = "SELECT id_clasificacion, nom_clasificacion
                              FROM clasificacion 
                              WHERE id_clasificacion = :id_clasificacion_edit";
                
                $clasificacionPE = $conexion_bd->prepare($clasificacionSql);
                $clasificacionPE->execute([':id_clasificacion_edit' => $id_clasificacion_edit]);
                $clasificacion = $clasificacionPE->fetch(PDO::FETCH_ASSOC);
                
            } else {
                // Todos los campos están llenos, proceder con la actualización
                $conexion_bd->beginTransaction();

                $clasificacionUpdate = "UPDATE clasificacion 
                                      SET nom_clasificacion = :nom_clasificacion,
                                        id_usuario = :id_usuario
                                      WHERE id_clasificacion = :id_clasificacion";
                
                $resultadoClasificacionUpdate = $conexion_bd->prepare($clasificacionUpdate);
                $resultadoClasificacionUpdate->execute([
                    ':id_usuario' => $_SESSION['id_usuario'] ?? null,
                    ':nom_clasificacion' => trim($_POST['nom_clasificacion']),
                    ':id_clasificacion' => $id_clasificacion_edit 
                ]);
                
                $conexion_bd->commit();
                
                $_SESSION['mensaje'] = 'Registro actualizado exitosamente.';
                $_SESSION['tipo_mensaje'] = 'success';
                header("Location: clasificacion.php");
                exit();
            }
            
        } elseif (isset($_POST['Editar']) && !empty($_POST['Editar'])) {
            // Modo edición (mostrar formulario)
            $id_clasificacion_edit = $_POST['Editar'];
            
        } elseif (isset($_POST['id_clasificacion_actualizar']) && !empty($_POST['id_clasificacion_actualizar'])) {
            // Backup por si acaso
            $id_clasificacion_edit = $_POST['id_clasificacion_actualizar'];
            
        } else {
            $_SESSION['mensaje'] = 'Error: La clasificación a editar no fue encontrada.';
            $_SESSION['tipo_mensaje'] = 'danger';
            header("Location: clasificacion.php");
            exit();
        }

        // Si no tenemos datos de clasificación aún, cargarlos
        if (empty($clasificacion) && $id_clasificacion_edit) {
            // Consulta para obtener datos de clasificacion
            $clasificacionSql = "SELECT id_clasificacion, nom_clasificacion
                          FROM clasificacion 
                          WHERE id_clasificacion = :id_clasificacion_edit";
            
            $clasificacionPE = $conexion_bd->prepare($clasificacionSql);
            $clasificacionPE->execute([':id_clasificacion_edit' => $id_clasificacion_edit]);
            $clasificacion = $clasificacionPE->fetch(PDO::FETCH_ASSOC);

            if (!$clasificacion) {
                $_SESSION['mensaje'] = 'Error: La clasificación no existe.';
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: clasificacion.php");
                exit();
            }
        }

        // Preparar datos para TBS
        $tbs->MergeField('clasificacion', $clasificacion);

    } catch (PDOException $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack(); 
        }
        $_SESSION['mensaje'] = "Error de base de datos: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en clasificacionEditar.php (PDOException): " . $e->getMessage());
        header("Location: clasificacion.php");
        exit();
    } catch (Exception $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en clasificacionEditar.php (Exception): " . $e->getMessage());
        header("Location: clasificacion.php");
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