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
if (!$super_admin && !verificar_permiso_rapido('OTIC', 'consumible_distribuir')) {
    header("Location: acceso_denegado.php");
    exit;
}
    $tbs = new clsTinyButStrong;
    $tbs->LoadTemplate('consumiblesSalida.html','UTF-8');
    try
    {
    //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Manejo de errores con excepciones

        $funcionario = "SELECT id_funcionario, nom_funcionario FROM oticbienes.funcionario ORDER BY nom_funcionario;";

        $consumibles = "SELECT c.id_consumibles, c.consumible || ' ' || c.codigo_consumible AS consumible_display, s.cantidad_disponible
                              FROM oticbienes.consumibles c
                              JOIN oticbienes.stockc s ON c.id_consumibles = s.id_consumibles
                              WHERE s.cantidad_disponible > 0 
                              ORDER BY c.consumible;";
        
        //Variables para que el codigo de distribuido sea automatico
        
        $prefijo = 'DGOTIC';
        $anio_actual = date('Y'); 
        $mes_actual = date('m'); 
        
        $codigoActual = ''; // Variable para el código que se mostrará

        //Obtener el último número de secuencia

        $secuencia = "SELECT ultimo_numero 
                        FROM oticbienes.codigod 
                        WHERE prefijo_codigo = :prefijo AND anio = :anio AND mes = :mes";
        $stmtSecuencia = $conexion_bd->prepare($secuencia);
        $stmtSecuencia->execute([
                                    ':prefijo' => $prefijo,
                                    ':anio' => $anio_actual,
                                    ':mes' => $mes_actual
                                ]);
        $datosSecuencia = $stmtSecuencia->fetch(PDO::FETCH_ASSOC);

        $conteo = 1; 
        if ($datosSecuencia) {

            $conteo = $datosSecuencia['ultimo_numero'] + 1;
        }

        $numeroFormateado = sprintf("%04d", $conteo);

        $codigoActual = "{$prefijo}-{$anio_actual}-{$mes_actual}-{$numeroFormateado}";

        // Listo el codigo

        if (isset($_POST['Registrar'])) {

              $conexion_bd->beginTransaction();



            try {
                 // --- VALIDACIÓN DE CAMPOS PRINCIPALES DEL FORMULARIO ---
      
                if (empty($_POST['fecha_distribucion']) || empty($_POST['id_funcionario'])) {
                    throw new Exception("La fecha de distribución y el funcionario son campos obligatorios.");
                }
                // Recopilacion de datos

                $fechaDistribucion = $_POST['fecha_distribucion'];
                $idFuncionario = $_POST['id_funcionario'];
                $observaciond = $_POST['observaciond'];

                // Preparar la consulta para insertar cada consumible distribuido 

                $camposConsumible = "id_usuario, codigo_distribucion, fecha_distribucion, id_consumibles, id_funcionario, cantidad_distribuidad, observaciond";

                $consumiblesInsert = $conexion_bd->prepare("INSERT INTO oticbienes.distribucion ($camposConsumible)
                                                            VALUES (:id_usuario, :codigo_distribucion, :fecha_distribucion, :id_consumibles, :id_funcionario, :cantidad_distribuidad, :observaciond)");

                // --- 1. PRE-VALIDACIÓN (Antes de generar el código REAL o tocar el stock) ---

                foreach ($_POST['id_consumibles'] as $i => $idConsumibleDistribuir) 
                {
                    $cantidadConsumibleDistribuir = (float)$_POST['cantidad_distribuidad'][$i];

                    if (empty($idConsumibleDistribuir) || $idConsumibleDistribuir == '0' ||
                        empty($cantidadConsumibleDistribuir) || $cantidadConsumibleDistribuir <= 0) 
                    {
                        throw new Exception("Datos incompletos o inválidos para el consumible #" . ($i + 1) . ". Verifique que se haya seleccionado un consumible y una cantidad positiva.");
                    }

                    // Obtener stock actual para esta pre-validación.
                    $stockActual = "SELECT s.cantidad_disponible, c.consumible
                                          FROM oticbienes.stockc s
                                          JOIN oticbienes.consumibles c ON s.id_consumibles = c.id_consumibles
                                          WHERE s.id_consumibles = :id_consumibles";
                    $stmtStockActual = $conexion_bd->prepare($stockActual);
                    $stmtStockActual->execute([':id_consumibles' => $idConsumibleDistribuir]);
                    $datosConsumible = $stmtStockActual->fetch(PDO::FETCH_ASSOC);

                    if (!$datosConsumible) {

                        throw new Exception("Consumible con ID {$idConsumibleDistribuir} no encontrado o sin registro de stock.");
                    }

                    if ($cantidadConsumibleDistribuir > $datosConsumible['cantidad_disponible']) 
                    {
                        
                        throw new Exception("Stock insuficiente para el consumible **'{$datosConsumible['consumible']}'** en pre-validación. Disponible: " . number_format($datosConsumible['cantidad_disponible'], 0) . ", Solicitado: " . number_format($cantidadConsumibleDistribuir, 0) . ".");
                    }
                }

                // --- 2. GENERACIÓN DEL CÓDIGO REAL (SOLO SI TODAS LAS PRE-VALIDACIONES PASARON) ---

                // Este es el bloque que REALMENTE incrementa el número en la DB.
                $consultaIncrementarConteo = "SELECT ultimo_numero 
                                                FROM oticbienes.codigod 
                                                WHERE prefijo_codigo = :prefijo AND anio = :anio AND mes = :mes 
                                                FOR UPDATE";
                $stmtIncrementarConteo = $conexion_bd->prepare($consultaIncrementarConteo);
                $stmtIncrementarConteo->execute([
                                                    ':prefijo' => $prefijo,
                                                    ':anio' => $anio_actual,
                                                    ':mes' => $mes_actual
                                                ]);
                $secuenciaConteo = $stmtIncrementarConteo->fetch(PDO::FETCH_ASSOC);

                $nuevoConteo = 1;

                if ($secuenciaConteo) 
                {
                    $nuevoConteo = $secuenciaConteo['ultimo_numero'] + 1;
                    
                    $actualizarConteo = "UPDATE oticbienes.codigod 
                                        SET ultimo_numero = :nuevo_numero, fecha_ultima_actualizacion = NOW() 
                                        WHERE prefijo_codigo = :prefijo AND anio = :anio AND mes = :mes";

                    $stmtActualizarConteo = $conexion_bd->prepare($actualizarConteo);
                    $stmtActualizarConteo->execute([
                                                ':nuevo_numero' => $nuevoConteo,
                                                ':prefijo' => $prefijo,
                                                ':anio' => $anio_actual,
                                                ':mes' => $mes_actual
                                                ]);
                } else 
                {
                    $insertarConteo = "INSERT INTO oticbienes.codigod (prefijo_codigo, anio, mes, ultimo_numero, fecha_ultima_actualizacion) 
                                        VALUES (:prefijo, :anio, :mes, :ultimo_numero, NOW())";
                    $stmtInsertarConteo = $conexion_bd->prepare($insertarConteo);
                    $stmtInsertarConteo->execute([
                                                    ':prefijo' => $prefijo,
                                                    ':anio' => $anio_actual,
                                                    ':mes' => $mes_actual,
                                                    ':ultimo_numero' => $nuevoConteo
                    ]);
                }
                
                $conteoFormateado = sprintf("%04d", $nuevoConteo);
                $codigoDistribucionFinal = "{$prefijo}-{$anio_actual}-{$mes_actual}-{$conteoFormateado}";

                // --- FIN DE LA GENERACIÓN DEL CÓDIGO DISTRIBUCION ---


                // --- 3. REGISTRO DE DISTRIBUCIÓN Y ACTUALIZACIÓN DE STOCK ---
                for ($i = 0; $i < count($_POST['id_consumibles']); $i++) 
                {
                    $idConsumibleDistribuir = $_POST['id_consumibles'][$i];

                    $cantidadDistribuida = (float)$_POST['cantidad_distribuidad'][$i];

                    // Obtener datos de stock (con FOR UPDATE)
                    $consultaStock = "SELECT s.cantidad_disponible, s.cantidad_distribuida, c.consumible
                                                 FROM oticbienes.stockc s
                                                 JOIN oticbienes.consumibles c ON s.id_consumibles = c.id_consumibles
                                                 WHERE s.id_consumibles = :id_consumibles 
                                                 FOR UPDATE";
                    $stmtConsultaStock = $conexion_bd->prepare($consultaStock);
                    $stmtConsultaStock->execute([':id_consumibles' => $idConsumibleDistribuir]);
                    $consumibleDatos = $stmtConsultaStock->fetch(PDO::FETCH_ASSOC);

                    // Doble seguridad para stock (en caso de alta concurrencia)
                    if (!$consumibleDatos || $cantidadDistribuida > $consumibleDatos['cantidad_disponible']) 
                    {
                        $nombre_error = $consumibleDatos['consumible'] ?? 'desconocido';

                        throw new Exception("Error de concurrencia: Stock para '{$nombre_error}' cambió. Operación abortada.");
                    }

                    $cantidadDisponibleActual = $consumibleDatos['cantidad_disponible'];

                    $cantidadDistribuidaActual = $consumibleDatos['cantidad_distribuida'];

                    $nuevaCantidadDisponible = $cantidadDisponibleActual - $cantidadDistribuida;

                    $nuevaCantidadDistribuida = $cantidadDistribuidaActual + $cantidadDistribuida;

                    $consultaActualizarStock = "UPDATE oticbienes.stockc
                                            SET 
                                                cantidad_disponible = :nuevaCantidadDisponible,
                                                cantidad_distribuida = :nuevaCantidadDistribuida
                                            WHERE id_consumibles = :id_consumibles";
                    $stmtConsultaActualizarStock = $conexion_bd->prepare($consultaActualizarStock);

                    $stmtConsultaActualizarStock->execute([
                        ':nuevaCantidadDisponible' => $nuevaCantidadDisponible,
                        ':nuevaCantidadDistribuida' => $nuevaCantidadDistribuida,
                        ':id_consumibles' => $idConsumibleDistribuir
                    ]);

                    $consumiblesInsert->execute([
                        ':id_usuario' => $usuario,
                        ':codigo_distribucion' => $codigoDistribucionFinal,
                        ':fecha_distribucion' => $fechaDistribucion,
                        ':id_consumibles' => $idConsumibleDistribuir,
                        ':id_funcionario' => $idFuncionario,
                        ':cantidad_distribuidad' => $cantidadDistribuida,
                        ':observaciond' => $observaciond
                    ]);
                }

                $conexion_bd->commit(); // Confirmar la ÚNICA transacción si todo ha ido bien
                $_SESSION['mensaje'] = 'Distribución registrada exitosamente con código: **' . $codigoDistribucionFinal . '**';
                $_SESSION['tipo_mensaje'] = 'success';
                header("Location: consumiblesSalida.php"); // Redirección exitosa
                exit();

            } catch (Exception $e) {
                $conexion_bd->rollBack(); // Revertir si algo falla dentro de la transacción
                $_SESSION['mensaje'] = "Error al registrar distribución: " . $e->getMessage();
                $_SESSION['tipo_mensaje'] = 'danger';
                error_log("Error en consumiblesSalida.php (Inner Exception): " . $e->getMessage());
                // No redirigir aquí, para que el usuario vea el mensaje de error en la misma página del formulario.
            }

        } // Fin del boton Registrar

        $tbs->MergeField('codigo_distribucion_auto', $codigoActual);

        include ("consumiblesSalidaListado.php");

    } catch (PDOException $e) {
        if ($conexion_bd->inTransaction()) { 
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error de base de datos general: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en consumiblesSalida.php (Outer PDOException): " . $e->getMessage());

    } catch (Exception $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en consumiblesSalida.php (Outer Exception): " . $e->getMessage());
    }

    // --- RECUPERAR Y LIMPIAR MENSAJES DE SESIÓN PARA MOSTRAR EN EL FRONT-END ---
    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje']);
    unset($_SESSION['tipo_mensaje']);

    $tbs->MergeBlock('funcionario', $conexion_bd, $funcionario);
    $tbs->MergeBlock('consumibles', $conexion_bd, $consumibles);
    $tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
    $tbs->Show();
    exit;

?>