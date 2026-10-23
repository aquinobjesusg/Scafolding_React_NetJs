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
if (!$super_admin && !verificar_permiso_rapido('OTIC', 'consumible_registrar')) {
    header("Location: acceso_denegado.php");
    exit;
}
    $tbs = new clsTinyButStrong;
    $tbs->LoadTemplate('consumibles.html','UTF-8');
    try
    {
    //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        
        $medida = "SELECT * FROM medida ORDER BY nom_medida ;";

      if (isset($_POST['Registrar'])) {
            $codigo_consumible_form = $_POST['codigo_consumible'];
            $cantidad_ingresada_form = (float)$_POST['cantidad_ingresadac']; 

            //VALIDACIONES
            if (empty($codigo_consumible_form) || 
                empty($_POST['consumible']) || 
                empty($_POST['id_medida']) || 
                empty($_POST['cantidad_ingresadac']) || 
                empty($_POST['fecha_ingresoc'])) {

                $_SESSION['mensaje'] = "Todos los campos, excepto el de Observaciones, son obligatorios.";
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: consumibles.php");
                exit(); // Detiene la ejecución del script
            }
            
            //  INICIO DE LA TRANSACCIÓN 
        
            $conexion_bd->beginTransaction(); 

            // 1. Verificar si el consumible ya existe en la tabla 
            $query_check_consumible_exist = "SELECT id_consumibles FROM oticbienes.consumibles WHERE codigo_consumible = :codigo_consumible";
            $stmt_check_consumible_exist = $conexion_bd->prepare($query_check_consumible_exist);
            $stmt_check_consumible_exist->execute([':codigo_consumible' => $codigo_consumible_form]);
            $existing_consumible = $stmt_check_consumible_exist->fetch(PDO::FETCH_ASSOC);

            $id_consumible_actual = null; // Variable para almacenar el id_consumibles, ya sea nuevo o existente.

            if ($existing_consumible) {
                // Caso: El consumible YA EXISTE.
                // Obtenemos su id_consumibles para futuras operaciones.
                $id_consumible_actual = $existing_consumible['id_consumibles'];

                $update_consumible_details = "
                    UPDATE oticbienes.consumibles
                    SET 
                        consumible = :consumible,
                        id_medida = :id_medida,
                        observacionc = :observacionc,
                        fecha_ingresoc = :fecha_ingresoc 
                    WHERE id_consumibles = :id_consumibles
                ";
                $stmt_update_details = $conexion_bd->prepare($update_consumible_details);
                $stmt_update_details->execute([
                    ':consumible' => $_POST['consumible'],
                    ':id_medida' => $_POST['id_medida'],
                    ':observacionc' => $_POST['observacionc'],
                    ':fecha_ingresoc' => $_POST['fecha_ingresoc'],
                    ':id_consumibles' => $id_consumible_actual
                ]);

            } else {
                // Caso: El consumible NO EXISTE.
                
                $camposConsumible = "id_usuario, codigo_consumible, fecha_ingresoc, consumible, id_medida, cantidad_ingresadac, observacionc";
                $consumiblesInsert = "INSERT INTO oticbienes.consumibles ($camposConsumible)
                                      VALUES (:id_usuario, :codigo_consumible, :fecha_ingresoc, :consumible, :id_medida, :cantidad_ingresadac, :observacionc)";
                $resultadoConsumiblesInsert = $conexion_bd->prepare($consumiblesInsert);
                $resultadoConsumiblesInsert->execute([
                    ':id_usuario' => $usuario,
                    ':codigo_consumible' => $codigo_consumible_form,
                    ':fecha_ingresoc' => $_POST['fecha_ingresoc'],
                    ':consumible' => $_POST['consumible'],
                    ':id_medida' => $_POST['id_medida'],
                    ':cantidad_ingresadac' => $cantidad_ingresada_form, // Cantidad de este ingreso específico
                    ':observacionc' => $_POST['observacionc']
                ]);
                // Obtenemos el ID del consumible recién insertado para usarlo en la tabla 'stock'.
              
                $id_consumible_actual = $conexion_bd->lastInsertId('oticbienes.consumibles_id_consumibles_seq'); 
            }

            // 2. Actualizar o insertar en la tabla 'oticbienes.stock'
     
            $query_check_stock = "SELECT cantidad_ingresada, cantidad_disponible, cantidad_distribuida FROM oticbienes.stockc WHERE id_consumibles = :id_consumibles FOR UPDATE";
            $stmt_check_stock = $conexion_bd->prepare($query_check_stock);
            $stmt_check_stock->execute([':id_consumibles' => $id_consumible_actual]);
            $existing_stock = $stmt_check_stock->fetch(PDO::FETCH_ASSOC);

            if ($existing_stock) {
                // Caso: Ya existe un registro de stock para este id_consumibles. Lo actualizamos.
                $nueva_cantidad_ingresada_total = $existing_stock['cantidad_ingresada'] + $cantidad_ingresada_form;
                $nueva_cantidad_disponible = $existing_stock['cantidad_disponible'] + $cantidad_ingresada_form;

                $update_stock = "
                    UPDATE oticbienes.stockc
                    SET 
                        cantidad_ingresada = :nueva_cantidad_ingresada_total,
                        cantidad_disponible = :nueva_cantidad_disponible
                       
                    WHERE id_consumibles = :id_consumibles
                ";
                $stmt_update_stock = $conexion_bd->prepare($update_stock);
                $stmt_update_stock->execute([
                    ':nueva_cantidad_ingresada_total' => $nueva_cantidad_ingresada_total,
                    ':nueva_cantidad_disponible' => $nueva_cantidad_disponible,
                    ':id_consumibles' => $id_consumible_actual
                ]);

            } else {
                // Caso: NO existe un registro de stock para este id_consumibles. Lo insertamos.
                $insert_stock = "
                    INSERT INTO oticbienes.stockc (id_consumibles, cantidad_ingresada, cantidad_disponible, cantidad_distribuida)
                    VALUES (:id_consumibles, :cantidad_ingresada, :cantidad_disponible, :cantidad_distribuida)
                ";
                $stmt_insert_stock = $conexion_bd->prepare($insert_stock);
                $stmt_insert_stock->execute([
                    ':id_consumibles' => $id_consumible_actual,
                    ':cantidad_ingresada' => $cantidad_ingresada_form, 
                    // La cantidad ingresada inicial
                    ':cantidad_disponible' => $cantidad_ingresada_form, 
                    // Al inicio, lo disponible es igual a lo ingresado
                    ':cantidad_distribuida' => 0 // Comienza en 0 para un nuevo registro de stock
                ]);
            }

            $conexion_bd->commit(); // Confirma todas las operaciones si todo fue exitoso.
            // --- FIN DE LA TRANSACCIÓN ---

            $_SESSION['mensaje'] = 'Consumible y stock registrados/actualizados exitosamente.';
            $_SESSION['tipo_mensaje'] = 'success';
            header("Location: consumibles.php"); // Redirige a la página de consumibles para ver el listado actualizado.
            exit();
        }

        // MOSTRAR EL  LISTADO 
      
      
        include ("consumiblesListado.php"); 

    } catch (PDOException $e) {
        // Si ocurre un error de base de datos, revertimos la transacción.
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack(); 
        }
        $_SESSION['mensaje'] = "Error de base de datos al registrar/actualizar consumible: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en consumibles.php (PDOException): " . $e->getMessage());

    } catch (Exception $e) {
        // Captura cualquier otra excepción que no sea de PDO (ej. `throw new Exception`).
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado al registrar/actualizar consumible: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en consumibles.php (Exception): " . $e->getMessage()); // Para depuración
    }

    // --- RECUPERAR Y LIMPIAR MENSAJES DE SESIÓN PARA MOSTRAR EN EL FRONT-END ---
    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje']); // Limpiar el mensaje después de usarlo
    unset($_SESSION['tipo_mensaje']); // Limpiar el tipo de mensaje después de usarlo


    $tbs->MergeBlock('medida', $conexion_bd, $medida ?? null); // Asumo que $medida ya es una query o un array
    $tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
    $tbs->Show();
    exit;
    
?>