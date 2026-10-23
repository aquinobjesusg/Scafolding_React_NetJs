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
    $tbs->LoadTemplate('direccionGeneralEditar.html','UTF-8');
    try
    {
    //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        
        $dependencia= "SELECT * FROM dependencia ORDER BY nom_dependencia;";
        $ente= "SELECT * FROM ente ORDER BY id_ente DESC;"; 

        $id_dependencia_edit = null;
        $dependencia = [];

        // Primero verificar si estamos en modo actualización (Guardarcambios)
        if (isset($_POST['Guardarcambios']) && isset($_POST['id_dependencia_actualizar']))
        {
            $id_dependencia_edit = $_POST['id_dependencia_actualizar'];
            
            // Validación de campos obligatorios
            $camposObligatorios = [
                'nom_dependencia',
                'ubicacion_dependencia',
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
                $dependenciaSql = "SELECT id_dependencia, nom_dependencia, 
                                    ubicacion_dependencia, e.id_ente, nom_ente
                                  FROM dependencia d
                                  INNER JOIN ente e ON e.id_ente = d.id_ente 
                                  WHERE id_dependencia = :id_dependencia_edit";
                
                $dependenciaPE = $conexion_bd->prepare($dependenciaSql);
                $dependenciaPE->execute([':id_dependencia_edit' => $id_dependencia_edit]);
                $dependencia = $dependenciaPE->fetch(PDO::FETCH_ASSOC);
                
            } else {
                // Todos los campos están llenos, proceder con la actualización
                $conexion_bd->beginTransaction();

                $dependenciaUpdate = "UPDATE dependencia 
                                          SET id_usuario = :id_usuario,
                                              nom_dependencia = :nom_dependencia,
                                              ubicacion_dependencia = :ubicacion_dependencia,
                                              id_ente = :id_ente
                                          WHERE id_dependencia = :id_dependencia";
                
                $resultadoDependenciaUpdate = $conexion_bd->prepare($dependenciaUpdate);
                $resultadoDependenciaUpdate->execute([
                    ':id_usuario' => $_SESSION['id_usuario'] ?? null,
                    ':nom_dependencia' => trim($_POST['nom_dependencia']),
                    ':ubicacion_dependencia' => trim($_POST['ubicacion_dependencia']),
                    ':id_ente' => (int)$_POST['id_ente'],
                    ':id_dependencia' => $id_dependencia_edit
                ]);
                
                $conexion_bd->commit();
                
                $_SESSION['mensaje'] = 'Registro actualizado exitosamente.';
                $_SESSION['tipo_mensaje'] = 'success';
                header("Location: dependencia.php");
                exit();
            }
            
        } elseif (isset($_POST['Editar']) && !empty($_POST['Editar'])) {
            // Modo edición (mostrar formulario)
            $id_dependencia_edit = $_POST['Editar'];
            
        } elseif (isset($_POST['id_dependencia_actualizar']) && !empty($_POST['id_dependencia_actualizar'])) {
            // Backup por si acaso
            $id_dependencia_edit = $_POST['id_dependencia_actualizar'];
            
        } else {
            $_SESSION['mensaje'] = 'Error: La dependencia a editar no fue encontrada.';
            $_SESSION['tipo_mensaje'] = 'danger';
            header("Location: dependencia.php");
            exit();
        }

        // Si no tenemos datos de dependencia aún, cargarlos
        if (empty($dependencia) && $id_dependencia_edit) {
            // Consulta para obtener datos de la dependencia
            $dependenciaSql = "SELECT id_dependencia, nom_dependencia, 
                                ubicacion_dependencia, e.id_ente, nom_ente
                              FROM dependencia d
                              INNER JOIN ente e ON e.id_ente = d.id_ente 
                              WHERE id_dependencia = :id_dependencia_edit";
            
            $dependenciaPE = $conexion_bd->prepare($dependenciaSql);
            $dependenciaPE->execute([':id_dependencia_edit' => $id_dependencia_edit]);
            $dependencia = $dependenciaPE->fetch(PDO::FETCH_ASSOC);

            if (!$dependencia) {
                $_SESSION['mensaje'] = 'Error: La dependencia no existe.';
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: dependencia.php");
                exit();
            }
        }

        // Consulta para obtener la lista de entes (para el dropdown)
        $ente = "SELECT id_ente, nom_ente FROM ente ORDER BY nom_ente";
        
        // Preparar datos para TBS
        $tbs->MergeField('dependencia', $dependencia);
        $tbs->MergeBlock('ente_option', $conexion_bd, $ente);

    } catch (PDOException $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack(); 
        }
        $_SESSION['mensaje'] = "Error de base de datos: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en dependenciaEditar.php (PDOException): " . $e->getMessage());
        header("Location: dependencia.php");
        exit();
    } catch (Exception $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en dependenciaEditar.php (Exception): " . $e->getMessage());
        header("Location: dependencia.php");
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