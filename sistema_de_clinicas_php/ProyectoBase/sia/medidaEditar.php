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
    $tbs->LoadTemplate('medidaEditar.html','UTF-8');
    try
    {
    //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 

        $id_medida_edit = null;
        $medida = [];

        // Primero verificar si estamos en modo actualización (Guardarcambios)
        if (isset($_POST['Guardarcambios']) && isset($_POST['id_medida_actualizar'])) {
            $id_medida_edit = $_POST['id_medida_actualizar'];
            
            // Validación de campos obligatorios
            $camposObligatorios = [
                'nom_medida'
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
                $medidaSql = "SELECT id_medida, nom_medida
                              FROM medida 
                              WHERE id_medida = :id_medida_edit";
                
                $medidaPE = $conexion_bd->prepare($medidaSql);
                $medidaPE->execute([':id_medida_edit' => $id_medida_edit]);
                $medida = $medidaPE->fetch(PDO::FETCH_ASSOC);
                
            } else {
                // Todos los campos están llenos, proceder con la actualización
                $conexion_bd->beginTransaction();

                $medidaUpdate = "UPDATE medida 
                                      SET nom_medida = :nom_medida,
                                        id_usuario = :id_usuario
                                      WHERE id_medida = :id_medida";
                
                $resultadoMedidaUpdate = $conexion_bd->prepare($medidaUpdate);
                $resultadoMedidaUpdate->execute([
                    ':id_usuario' => $_SESSION['id_usuario'] ?? null,
                    ':nom_medida' => trim($_POST['nom_medida']),
                    ':id_medida' => $id_medida_edit 
                ]);
                
                $conexion_bd->commit();
                
                $_SESSION['mensaje'] = 'Registro actualizado exitosamente.';
                $_SESSION['tipo_mensaje'] = 'success';
                header("Location: medida.php");
                exit();
            }
            
        } elseif (isset($_POST['Editar']) && !empty($_POST['Editar'])) {
            // Modo edición (mostrar formulario)
            $id_medida_edit = $_POST['Editar'];
            
        } elseif (isset($_POST['id_medida_actualizar']) && !empty($_POST['id_medida_actualizar'])) {
            // Backup por si acaso
            $id_medida_edit = $_POST['id_medida_actualizar'];
            
        } else {
            $_SESSION['mensaje'] = 'Error: La clasificación a editar no fue encontrada.';
            $_SESSION['tipo_mensaje'] = 'danger';
            header("Location: medida.php");
            exit();
        }

        // Si no tenemos datos de clasificación aún, cargarlos
        if (empty($medida) && $id_medida_edit) {
            // Consulta para obtener datos de medida
            $medidaSql = "SELECT id_medida, nom_medida
                          FROM medida 
                          WHERE id_medida = :id_medida_edit";
            
            $medidaPE = $conexion_bd->prepare($medidaSql);
            $medidaPE->execute([':id_medida_edit' => $id_medida_edit]);
            $medida = $medidaPE->fetch(PDO::FETCH_ASSOC);

            if (!$medida) {
                $_SESSION['mensaje'] = 'Error: La clasificación no existe.';
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: medida.php");
                exit();
            }
        }

        // Preparar datos para TBS
        $tbs->MergeField('medida', $medida);

    } catch (PDOException $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack(); 
        }
        $_SESSION['mensaje'] = "Error de base de datos: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en medidaEditar.php (PDOException): " . $e->getMessage());
        header("Location: medida.php");
        exit();
    } catch (Exception $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en medidaEditar.php (Exception): " . $e->getMessage());
        header("Location: medida.php");
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