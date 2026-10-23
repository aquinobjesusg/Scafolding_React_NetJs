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
    $tbs->LoadTemplate('consumiblesSalidaEditar.html','UTF-8');

    try
    {
        //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

         // --- Lógica para obtener los datos de la distribución a editar ---
        $codigo_distribucion_a_editar = $_GET['codigo'] ?? null;

        if (!$codigo_distribucion_a_editar) {
            throw new Exception("Código de distribución no proporcionado para la edición.");
        }

        // Consulta para obtener los datos principales de la distribución
        $queryDistribucionPrincipal = "SELECT 
                                            d.codigo_distribucion,
                                            d.fecha_distribucion,
                                            d.id_funcionario,
                                            d.observaciond
                                        FROM oticbienes.distribucion d
                                        WHERE d.codigo_distribucion = :codigo_distribucion
                                        LIMIT 1"; // Solo necesitamos un registro para los datos principales

        $stmtDistribucionPrincipal = $conexion_bd->prepare($queryDistribucionPrincipal);
        $stmtDistribucionPrincipal->execute([':codigo_distribucion' => $codigo_distribucion_a_editar]);
        $datosDistribucionPrincipal = $stmtDistribucionPrincipal->fetch(PDO::FETCH_ASSOC);

        if (!$datosDistribucionPrincipal) {
            throw new Exception("Distribución con código '{$codigo_distribucion_a_editar}' no encontrada.");
        }

        // Consulta para obtener todos los consumibles asociados a esta distribución
        $queryConsumiblesDistribuidos = "SELECT 
                                            d.id_consumibles,
                                            c.consumible || ' ' || c.codigo_consumible AS consumible_display,
                                            d.cantidad_distribuidad,
                                            c.consumible AS nombre_consumible,  
                                            c.codigo_consumible,
                                            d.observaciond,
                                            d.id_funcionario                 
                                        FROM oticbienes.distribucion d
                                        JOIN oticbienes.consumibles c ON d.id_consumibles = c.id_consumibles
                                        WHERE d.codigo_distribucion = :codigo_distribucion
                                        ORDER BY c.consumible";

        $stmtConsumiblesDistribuidos = $conexion_bd->prepare($queryConsumiblesDistribuidos);
        $stmtConsumiblesDistribuidos->execute([':codigo_distribucion' => $codigo_distribucion_a_editar]);
        $consumiblesDistribuidos = $stmtConsumiblesDistribuidos->fetchAll(PDO::FETCH_ASSOC);

        if (empty($consumiblesDistribuidos)) {
            throw new Exception("No se encontraron consumibles asociados a la distribución con código '{$codigo_distribucion_a_editar}'.");
        }

        // Consultas para los SELECT boxes (funcionarios y todos los consumibles disponibles)
        $funcionarioQuery = "SELECT id_funcionario, nom_funcionario FROM oticbienes.funcionario ORDER BY nom_funcionario;";
        $consumiblesDisponiblesQuery = "SELECT c.id_consumibles, c.consumible || ' ' || c.codigo_consumible AS consumible_display, s.cantidad_disponible
                                        FROM oticbienes.consumibles c
                                        JOIN oticbienes.stockc s ON c.id_consumibles = s.id_consumibles
                                        WHERE s.cantidad_disponible > 0 
                                        ORDER BY c.consumible;";

        // Consulta para obtener todos los consumibles disponibles + los ya distribuidos en esta distribución
        $consumiblesDisponiblesQuery = "SELECT c.id_consumibles, 
                                      c.consumible || ' ' || c.codigo_consumible AS consumible_display, 
                                      s.cantidad_disponible
                               FROM oticbienes.consumibles c
                               JOIN oticbienes.stockc s ON c.id_consumibles = s.id_consumibles
                               WHERE s.cantidad_disponible > 0 
                               OR c.id_consumibles IN (
                                   SELECT id_consumibles 
                                   FROM oticbienes.distribucion 
                                   WHERE codigo_distribucion = :codigo_distribucion
                               )
                               ORDER BY c.consumible";

        // Pasar el código de distribución al MergeBlock
        $tbs->MergeBlock('consumibles', $conexion_bd, $consumiblesDisponiblesQuery, [':codigo_distribucion' => $codigo_distribucion_a_editar]);

        $tbs->MergeBlock('funcionario', $conexion_bd, $funcionarioQuery);
        $tbs->MergeBlock('consumibles', $conexion_bd, $consumiblesDisponiblesQuery);

        // Precargar los datos en el formulario
        $tbs->MergeField('codigo_distribucion', $datosDistribucionPrincipal['codigo_distribucion']);
        $tbs->MergeField('fecha_distribucion', $datosDistribucionPrincipal['fecha_distribucion']);
        $tbs->MergeField('observaciond', $datosDistribucionPrincipal['observaciond']);
        $tbs->MergeField('selected_funcionario_id', $datosDistribucionPrincipal['id_funcionario']); // Para precargar el select de funcionario

        $tbs->MergeBlock('distribucion_items', $consumiblesDistribuidos);


        // --- Lógica para procesar la ACTUALIZACIÓN de la distribución ---
        if (isset($_POST['Actualizar'])) {
            $conexion_bd->beginTransaction();
            try {
                $codigo_distribucion_original = $_POST['codigo_distribucion']; // El código de la distribución que estamos editando
                $fechaDistribucion = $_POST['fecha_distribucion'];
                $idFuncionario = $_POST['id_funcionario'];
                $observaciond = $_POST['observaciond'];

                $idConsumiblesNuevos = $_POST['id_consumibles'] ?? [];
                $cantidadesNuevas = $_POST['cantidad_distribuidad'] ?? [];

                // 1. Validar los datos de entrada
                if (empty($fechaDistribucion) || empty($idFuncionario) || $idFuncionario == '0' || empty($idConsumiblesNuevos)) {
                    throw new Exception("Los campos de fecha, funcionario y al menos un consumible son obligatorios.");
                }

                // Mapear los consumibles actuales para facilitar la comparación
                $consumiblesOriginalesMap = [];
                foreach ($consumiblesDistribuidos as $item) {
                    $consumiblesOriginalesMap[$item['id_consumibles']] = $item['cantidad_distribuidad'];
                }

                // Arrays para los consumibles a insertar, actualizar y eliminar
                $consumiblesToInsert = [];
                $consumiblesToUpdate = [];
                $currentConsumibleIds = []; // IDs de los consumibles presentes en el formulario de edición

                foreach ($idConsumiblesNuevos as $i => $idConsumibleNuevo) {
                    $cantidadNueva = (float)$cantidadesNuevas[$i];

                    if (empty($idConsumibleNuevo) || $idConsumibleNuevo == '0' || empty($cantidadNueva) || $cantidadNueva <= 0) {
                        throw new Exception("Datos incompletos o inválidos para el consumible #" . ($i + 1) . ". Verifique que se haya seleccionado un consumible y una cantidad positiva.");
                    }

                    $currentConsumibleIds[] = $idConsumibleNuevo;

                    // Verificar si el consumible ya existía en esta distribución
                    if (isset($consumiblesOriginalesMap[$idConsumibleNuevo])) {
                        // Es una actualización
                        $cantidadOriginal = $consumiblesOriginalesMap[$idConsumibleNuevo];
                        if ($cantidadNueva != $cantidadOriginal) {
                            $consumiblesToUpdate[$idConsumibleNuevo] = [
                                'cantidad_anterior' => $cantidadOriginal,
                                'cantidad_nueva' => $cantidadNueva
                            ];
                        }
                        // Eliminar del mapa de originales para identificar los que deben ser eliminados
                        unset($consumiblesOriginalesMap[$idConsumibleNuevo]);
                    } else {
                        // Es un nuevo consumible para esta distribución
                        $consumiblesToInsert[$idConsumibleNuevo] = $cantidadNueva;
                    }
                }

                // Consumibles que quedan en $consumiblesOriginalesMap deben ser eliminados
                $consumiblesToDelete = array_keys($consumiblesOriginalesMap);

                // --- Pre-validación de stock para inserciones y actualizaciones ---
                foreach ($consumiblesToInsert as $idConsumible => $cantidad) {
                    $stockActualData = $conexion_bd->prepare("SELECT s.cantidad_disponible, c.consumible FROM oticbienes.stockc s JOIN oticbienes.consumibles c ON s.id_consumibles = c.id_consumibles WHERE s.id_consumibles = :id_consumibles");
                    $stockActualData->execute([':id_consumibles' => $idConsumible]);
                    $datosConsumible = $stockActualData->fetch(PDO::FETCH_ASSOC);

                    if (!$datosConsumible) {
                        throw new Exception("Consumible con ID {$idConsumible} no encontrado o sin registro de stock.");
                    }
                    if ($cantidad > $datosConsumible['cantidad_disponible']) {
                        throw new Exception("Stock insuficiente para el consumible '{$datosConsumible['consumible']}' (nuevo). Disponible: " . number_format($datosConsumible['cantidad_disponible'], 0) . ", Solicitado: " . number_format($cantidad, 0) . ".");
                    }
                }

                foreach ($consumiblesToUpdate as $idConsumible => $data) {
                    $cantidadOriginal = $data['cantidad_anterior'];
                    $cantidadNueva = $data['cantidad_nueva'];
                    $diferenciaCantidad = $cantidadNueva - $cantidadOriginal; // Positivo si se aumenta, negativo si se disminuye

                    $stockActualData = $conexion_bd->prepare("SELECT s.cantidad_disponible, c.consumible FROM oticbienes.stockc s JOIN oticbienes.consumibles c ON s.id_consumibles = c.id_consumibles WHERE s.id_consumibles = :id_consumibles FOR UPDATE");
                    $stockActualData->execute([':id_consumibles' => $idConsumible]);
                    $datosConsumible = $stockActualData->fetch(PDO::FETCH_ASSOC);

                    if (!$datosConsumible) {
                        throw new Exception("Consumible con ID {$idConsumible} no encontrado o sin registro de stock durante la actualización.");
                    }

                    if ($diferenciaCantidad > 0 && $diferenciaCantidad > $datosConsumible['cantidad_disponible']) {
                        throw new Exception("Stock insuficiente para el consumible '{$datosConsumible['consumible']}' al intentar aumentar la cantidad. Disponible para aumentar: " . number_format($datosConsumible['cantidad_disponible'], 0) . ", Aumento solicitado: " . number_format($diferenciaCantidad, 0) . ".");
                    }
                }
                
                // 2. Actualizar los datos principales de la distribución
                $updateDistribucion = $conexion_bd->prepare("UPDATE oticbienes.distribucion
                                                            SET fecha_distribucion = :fecha_distribucion,
                                                                id_funcionario = :id_funcionario,
                                                                observaciond = :observaciond,
                                                                id_usuario = :id_usuario -- Puedes actualizar también el usuario que modifica
                                                            WHERE codigo_distribucion = :codigo_distribucion");
                $updateDistribucion->execute([
                    ':fecha_distribucion' => $fechaDistribucion,
                    ':id_funcionario' => $idFuncionario,
                    ':observaciond' => $observaciond,
                    ':id_usuario' => $usuario,
                    ':codigo_distribucion' => $codigo_distribucion_original
                ]);

                // 3. Procesar eliminaciones, actualizaciones e inserciones de consumibles
                // Eliminar consumibles que ya no están en la lista
                foreach ($consumiblesToDelete as $idConsumibleAEliminar) {
                    // Obtener la cantidad original para devolverla al stock
                    $stmtCantidadOriginal = $conexion_bd->prepare("SELECT cantidad_distribuidad FROM oticbienes.distribucion WHERE codigo_distribucion = :codigo AND id_consumibles = :id_consumibles FOR UPDATE");
                    $stmtCantidadOriginal->execute([
                        ':codigo' => $codigo_distribucion_original,
                        ':id_consumibles' => $idConsumibleAEliminar
                    ]);
                    $originalAmount = $stmtCantidadOriginal->fetchColumn();

                    if ($originalAmount) {
                        // Devolver al stock
                        $updateStock = $conexion_bd->prepare("UPDATE oticbienes.stockc SET cantidad_disponible = cantidad_disponible + :cantidad, cantidad_distribuida = cantidad_distribuida - :cantidad WHERE id_consumibles = :id_consumibles");
                        $updateStock->execute([
                            ':cantidad' => $originalAmount,
                            ':id_consumibles' => $idConsumibleAEliminar
                        ]);
                    }

                    // Eliminar de la tabla de distribución
                    $deleteItem = $conexion_bd->prepare("DELETE FROM oticbienes.distribucion WHERE codigo_distribucion = :codigo AND id_consumibles = :id_consumibles");
                    $deleteItem->execute([
                        ':codigo' => $codigo_distribucion_original,
                        ':id_consumibles' => $idConsumibleAEliminar
                    ]);
                }

                // Actualizar consumibles existentes
                foreach ($consumiblesToUpdate as $idConsumible => $data) {
                    $cantidadOriginal = $data['cantidad_anterior'];
                    $cantidadNueva = $data['cantidad_nueva'];
                    $diferenciaCantidad = $cantidadNueva - $cantidadOriginal;

                    // Actualizar en la tabla de distribución
                    $updateItem = $conexion_bd->prepare("UPDATE oticbienes.distribucion 
                                                        SET cantidad_distribuidad = :cantidad_nueva
                                                        WHERE codigo_distribucion = :codigo AND id_consumibles = :id_consumibles");
                    $updateItem->execute([
                        ':cantidad_nueva' => $cantidadNueva,
                        ':codigo' => $codigo_distribucion_original,
                        ':id_consumibles' => $idConsumible
                    ]);

                    // Actualizar stock
                    $updateStock = $conexion_bd->prepare("UPDATE oticbienes.stockc
                                                        SET cantidad_disponible = cantidad_disponible - :diferencia,
                                                            cantidad_distribuida = cantidad_distribuida + :diferencia
                                                        WHERE id_consumibles = :id_consumibles");
                    $updateStock->execute([
                        ':diferencia' => $diferenciaCantidad,
                        ':id_consumibles' => $idConsumible
                    ]);
                }

                // Insertar nuevos consumibles
                foreach ($consumiblesToInsert as $idConsumible => $cantidad) {
                    $insertItem = $conexion_bd->prepare("INSERT INTO oticbienes.distribucion (id_usuario, codigo_distribucion, fecha_distribucion, id_consumibles, id_funcionario, cantidad_distribuidad, observaciond)
                                                        VALUES (:id_usuario, :codigo_distribucion, :fecha_distribucion, :id_consumibles, :id_funcionario, :cantidad_distribuidad, :observaciond)");
                    $insertItem->execute([
                        ':id_usuario' => $usuario,
                        ':codigo_distribucion' => $codigo_distribucion_original,
                        ':fecha_distribucion' => $fechaDistribucion,
                        ':id_consumibles' => $idConsumible,
                        ':id_funcionario' => $idFuncionario,
                        ':cantidad_distribuidad' => $cantidad,
                        ':observaciond' => $observaciond
                    ]);

                    // Actualizar stock para el nuevo consumible
                    $updateStock = $conexion_bd->prepare("UPDATE oticbienes.stockc SET cantidad_disponible = cantidad_disponible - :cantidad, cantidad_distribuida = cantidad_distribuida + :cantidad WHERE id_consumibles = :id_consumibles");
                    $updateStock->execute([
                        ':cantidad' => $cantidad,
                        ':id_consumibles' => $idConsumible
                    ]);
                }

                $conexion_bd->commit();
                $_SESSION['mensaje'] = 'Distribución actualizada exitosamente con código: **' . $codigo_distribucion_original . '**';
                $_SESSION['tipo_mensaje'] = 'success';
                header("Location: consumiblesSalida.php"); // Redirige de nuevo al listado
                exit();

            } catch (Exception $e) {
                $conexion_bd->rollBack();
                $_SESSION['mensaje'] = "Error al actualizar distribución: " . $e->getMessage();
                $_SESSION['tipo_mensaje'] = 'danger';
                error_log("Error en consumiblesSalidaEditar.php (Inner Exception): " . $e->getMessage());
                // Para que el formulario se mantenga con los datos y el error
            }
        }

    } catch (PDOException $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error de base de datos general: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en consumiblesSalidaEditar.php (Outer PDOException): " . $e->getMessage());

    } catch (Exception $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en consumiblesSalidaEditar.php (Outer Exception): " . $e->getMessage());
    }

    // Recuperar y limpiar mensajes de sesión
    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje']);
    unset($_SESSION['tipo_mensaje']);

    $tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
    $tbs->Show();
    

?>