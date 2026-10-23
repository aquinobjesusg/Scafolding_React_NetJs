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
    $tbs->LoadTemplate('proveedorEditar.html','UTF-8');
    try
    {
    //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        
        $id_proveedor_edit = null;
        $proveedor = [];

        // Primero verificar si estamos en modo actualización (Guardarcambios)
        if (isset($_POST['Guardarcambios']) && isset($_POST['id_proveedor_actualizar'])) {
            $id_proveedor_edit = $_POST['id_proveedor_actualizar'];
            
            // Validación de campos obligatorios
            $camposObligatorios = [
                'nom_proveedor',
                'rif_proveedor',
                'correo_proveedor'
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
                $proveedorSql = "SELECT id_proveedor, nom_proveedor, rif_proveedor, correo_proveedor, telefono_proveedor
                              FROM proveedor 
                              WHERE id_proveedor = :id_proveedor_edit";
                
                $proveedorPE = $conexion_bd->prepare($proveedorSql);
                $proveedorPE->execute([':id_proveedor_edit' => $id_proveedor_edit]);
                $proveedor = $proveedorPE->fetch(PDO::FETCH_ASSOC);
                
            } else {
                // Todos los campos están llenos, proceder con la actualización
                $conexion_bd->beginTransaction();

                $proveedorUpdate = "UPDATE proveedor 
                                  SET nom_proveedor = :nom_proveedor,
                                      rif_proveedor = :rif_proveedor,
                                      correo_proveedor = :correo_proveedor,
                                      telefono_proveedor = :telefono_proveedor,
                                      id_usuario = :id_usuario
                                  WHERE id_proveedor = :id_proveedor";
                
                $resultadoProveedorUpdate = $conexion_bd->prepare($proveedorUpdate);
                $resultadoProveedorUpdate->execute([
                    ':id_usuario' => $_SESSION['id_usuario'] ?? null,
                    ':nom_proveedor' => trim($_POST['nom_proveedor']),
                    ':rif_proveedor' => trim($_POST['rif_proveedor']), // FALTABA ESTE PARÁMETRO
                    ':correo_proveedor' => trim($_POST['correo_proveedor']),
                    ':telefono_proveedor' => trim($_POST['telefono_proveedor']),
                    ':id_proveedor' => $id_proveedor_edit
                ]);
                
                $conexion_bd->commit();
                
                $_SESSION['mensaje'] = 'Registro actualizado exitosamente.';
                $_SESSION['tipo_mensaje'] = 'success';
                header("Location: proveedor.php");
                exit();
            }
            
        } elseif (isset($_POST['Editar']) && !empty($_POST['Editar'])) {
            // Modo edición (mostrar formulario)
            $id_proveedor_edit = $_POST['Editar'];
            
        } elseif (isset($_POST['id_proveedor_actualizar']) && !empty($_POST['id_proveedor_actualizar'])) {
            // Backup por si acaso
            $id_proveedor_edit = $_POST['id_proveedor_actualizar'];
            
        } else {
            $_SESSION['mensaje'] = 'Error: El proveedor a editar no fue encontrado.';
            $_SESSION['tipo_mensaje'] = 'danger';
            header("Location: proveedor.php");
            exit();
        }

        // Si no tenemos datos de proveedor aún, cargarlos
        if (empty($proveedor) && $id_proveedor_edit) {
            // Consulta para obtener datos del proveedor
            $proveedorSql = "SELECT id_proveedor, nom_proveedor, rif_proveedor, correo_proveedor, telefono_proveedor
                            FROM proveedor
                            WHERE id_proveedor = :id_proveedor_edit";
            
            $proveedorPE = $conexion_bd->prepare($proveedorSql);
            $proveedorPE->execute([':id_proveedor_edit' => $id_proveedor_edit]);
            $proveedor = $proveedorPE->fetch(PDO::FETCH_ASSOC);

            if (!$proveedor) {
                $_SESSION['mensaje'] = 'Error: El proveedor no existe.';
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: proveedor.php");
                exit();
            }
        }

        // Preparar datos para TBS - CORREGIDO: usar MergeField en lugar de MergeBlock
        $tbs->MergeField('proveedor', $proveedor);

    } catch (PDOException $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack(); 
        }
        $_SESSION['mensaje'] = "Error de base de datos: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en proveedorEditar.php (PDOException): " . $e->getMessage());
        header("Location: proveedor.php");
        exit();
    } catch (Exception $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en proveedorEditar.php (Exception): " . $e->getMessage());
        header("Location: proveedor.php");
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