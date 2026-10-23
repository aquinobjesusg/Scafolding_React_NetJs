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
if (!$super_admin && !verificar_permiso_rapido('OTIC', 'consumible_editar')) {
    header("Location: acceso_denegado.php");
    exit;
}
    $tbs = new clsTinyButStrong;
    $tbs->LoadTemplate('consumiblesEditar.html','UTF-8');

    try
    {
        //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  
        $medida_query = "SELECT id_medida, nom_medida FROM medida ORDER BY nom_medida;";
        $stmt_medidas = $conexion_bd->prepare($medida_query);
        $stmt_medidas->execute();
        $todas_las_medidas = $stmt_medidas->fetchAll(PDO::FETCH_ASSOC);
      
        // Obtener el ID del consumible a editar
        if (isset($_POST['Editar']) && !empty($_POST['Editar'])) 
        {
            $id_consumibles_edit = $_POST['Editar'];

        } elseif (isset($_POST['id_consumibles_actualizar']) && !empty($_POST['id_consumibles_actualizar'])) 
        {
            $id_consumibles_edit = $_POST['id_consumibles_actualizar'];

        } else 
        {
            $_SESSION['mensaje'] = 'Error: El bien a editar no fue encontrado.';
            $_SESSION['tipo_mensaje'] = 'danger';
            header("Location: consumibles.php");
            exit();
        }

        

        // Si se está cargando el formulario para edición (no se ha enviado 'GuardarCambios')
        if (!isset($_POST['GuardarCambios'])) 
        {
            $consumibleSql = "SELECT c.id_consumibles,
                                     c.codigo_consumible,
                                     c.fecha_ingresoc,
                                     c.consumible,
                                     m.id_medida,
                                     m.nom_medida,
                                     c.cantidad_ingresadac,
                                     c.observacionc
                              FROM oticbienes.consumibles c
                              INNER JOIN medida m ON m.id_medida = c.id_medida 
                              WHERE c.id_consumibles = :id_consumibles_edit;";
            
            $consumiblePE = $conexion_bd->prepare($consumibleSql);
            $consumiblePE->execute([':id_consumibles_edit' => $id_consumibles_edit]);
            $consumible = $consumiblePE->fetch(PDO::FETCH_ASSOC);

            // Si no se encontró el consumible
            if (!$consumible) 
            {
                $_SESSION['mensaje'] = 'Error: El consumible a editar no existe.';
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: consumibles.php");
                exit();
            }
        }

        // Procesar el formulario cuando se envía
        if (isset($_POST['GuardarCambios'])) 
        {
            // Recuperar el ID del consumible que se está editando
            if (isset($_POST['id_consumibles_actualizar']) && !empty($_POST['id_consumibles_actualizar'])) 
            {
                $id_consumibles_edit = (int)$_POST['id_consumibles_actualizar'];

            } else 
            {
                $_SESSION['mensaje'] = 'Error: ID del consumible para actualizar no proporcionado.';
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: consumibles.php");
                exit();
            }

            $nueva_cantidad_ingresada_form = (float)$_POST['cantidad_ingresadac_edit'];

            // --- INICIO DE LA TRANSACCIÓN ---
            $conexion_bd->beginTransaction();

            try {
                // 1. Obtener la cantidad_ingresadac actual
                $query_get_old_quantity = "SELECT cantidad_ingresadac 
                                            FROM oticbienes.consumibles 
                                            WHERE id_consumibles = :id_consumibles FOR UPDATE";
                $stmt_get_old_quantity = $conexion_bd->prepare($query_get_old_quantity);
                $stmt_get_old_quantity->execute([':id_consumibles' => $id_consumibles_edit]);
                $old_quantity_data = $stmt_get_old_quantity->fetch(PDO::FETCH_ASSOC);

                if (!$old_quantity_data) 
                {
                    throw new Exception("No se pudo encontrar el consumible original para el ID: " . $id_consumibles_edit);
                }
                $cantidad_anterior_consumible = (float)$old_quantity_data['cantidad_ingresadac'];

                // 2. Actualizar la tabla consumibles
                $consumiblesUpdate = "UPDATE oticbienes.consumibles
                                    SET id_usuario = :id_usuario,
                                        codigo_consumible = :codigo_consumible,
                                        fecha_ingresoc = :fecha_ingresoc,
                                        consumible = :consumible,
                                        id_medida = :id_medida,
                                        cantidad_ingresadac = :cantidad_ingresadac,
                                        observacionc = :observacionc
                                    WHERE id_consumibles = :id_consumibles";

                $resultadoConsumiblesUpdate = $conexion_bd->prepare($consumiblesUpdate);
                $resultadoConsumiblesUpdate->execute([
                    ':id_usuario' => $_SESSION['id_usuario'] ?? null,
                    ':codigo_consumible' => trim($_POST['codigo_consumible_edit']),
                    ':fecha_ingresoc' => trim($_POST['fecha_ingresoc_edit']),
                    ':consumible' => trim($_POST['consumible_edit']),
                    ':id_medida' => (int)$_POST['id_medida_edit'],
                    ':cantidad_ingresadac' => $nueva_cantidad_ingresada_form,
                    ':observacionc' => trim($_POST['observacionc_edit']),
                    ':id_consumibles' => $id_consumibles_edit
                ]);

                // 3. Calcular la diferencia en la cantidad
                $diferencia_cantidad = $nueva_cantidad_ingresada_form - $cantidad_anterior_consumible;

                // 4. Actualizar el stock
                $query_check_stock = "SELECT cantidad_ingresada, cantidad_disponible FROM oticbienes.stockc WHERE id_consumibles = :id_consumibles FOR UPDATE";
                $stmt_check_stock = $conexion_bd->prepare($query_check_stock);
                $stmt_check_stock->execute([':id_consumibles' => $id_consumibles_edit]);
                $existing_stock = $stmt_check_stock->fetch(PDO::FETCH_ASSOC);

                if ($existing_stock) {
                    $nueva_cantidad_ingresada_total = $existing_stock['cantidad_ingresada'] + $diferencia_cantidad;
                    $nueva_cantidad_disponible = $existing_stock['cantidad_disponible'] + $diferencia_cantidad;

                    if ($nueva_cantidad_disponible < 0) {
                        throw new Exception("No se puede reducir la cantidad disponible por debajo de cero.");
                    }

                    $update_stock = "UPDATE oticbienes.stockc
                                    SET cantidad_ingresada = :nueva_cantidad_ingresada_total,
                                        cantidad_disponible = :nueva_cantidad_disponible
                                    WHERE id_consumibles = :id_consumibles";

                    $stmt_update_stock = $conexion_bd->prepare($update_stock);
                    $stmt_update_stock->execute([
                        ':nueva_cantidad_ingresada_total' => $nueva_cantidad_ingresada_total,
                        ':nueva_cantidad_disponible' => $nueva_cantidad_disponible,
                        ':id_consumibles' => $id_consumibles_edit
                    ]);
                } else {
                    throw new Exception("No se encontró el registro de stock para el consumible.");
                }

                $conexion_bd->commit();
                $_SESSION['mensaje'] = 'Registro actualizado exitosamente.';
                $_SESSION['tipo_mensaje'] = 'success';
                header("Location: consumibles.php");
                exit();

            } catch (Exception $e) {
                $conexion_bd->rollBack();
                throw $e;
            }
        }

    } catch (PDOException $e) {
        $_SESSION['mensaje'] = "Error de base de datos: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en consumiblesEditar.php (PDOException): " . $e->getMessage());
    } catch (Exception $e) {
        $_SESSION['mensaje'] = "Error: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en consumiblesEditar.php (Exception): " . $e->getMessage());
    }

    // Asignar variables para TinyButStrong
    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje']);
    unset($_SESSION['tipo_mensaje']);

    $tbs->MergeBlock('msj', [['mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje]]);
    $tbs->MergeBlock('consumible', isset($consumible) ? [$consumible] : []);
    $tbs->MergeBlock('medida_option', isset($todas_las_medidas) && is_array($todas_las_medidas) ? $todas_las_medidas : []);
    $tbs->Show();


?>