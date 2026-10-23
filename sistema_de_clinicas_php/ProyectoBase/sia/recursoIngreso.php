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
if (!$super_admin && !verificar_permiso_rapido('Almacén', 'almacen_ingreso')) {
    header("Location: acceso_denegado.php");
    exit;
}

$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('recursoIngreso.html','UTF-8');

try {
    // Conexión a la base de datos sia
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 

    $proveedor = "SELECT * FROM proveedor ORDER BY id_proveedor DESC;";
    $articulo = "SELECT * FROM articulo ORDER BY id_articulo DESC;";
    $medida = "SELECT * FROM medida ORDER BY id_medida DESC;";
    $clasificacion = "SELECT * FROM clasificacion ORDER BY id_clasificacion DESC;";
    $almacen = "SELECT * FROM almacen ORDER BY id_almacen DESC;";

    if (isset($_POST['Registrar'])) 
    {
        $conexion_bd->beginTransaction();

        // 1. INSERTAR EN LA TABLA INGRESO
        $camposInsertEnIngreso = "id_usuario, orden_ingreso, fecha_ingreso, id_proveedor, id_almacen, id_articulo, cantidad_ingreso, observacion_i";
        
        $ingresoInsert = "INSERT INTO ingreso ($camposInsertEnIngreso)
                                  VALUES (:id_usuario, :orden_ingreso, :fecha_ingreso, :id_proveedor, :id_almacen, :id_articulo, :cantidad_ingreso, :observacion_i)";
        $resultadocamposInsertEnIngreso = $conexion_bd->prepare($ingresoInsert);
        $resultadocamposInsertEnIngreso->execute([
                ':id_usuario' => $usuario,
                ':orden_ingreso' => $_POST['orden_ingreso'],
                ':fecha_ingreso' => $_POST['fecha_ingreso'],
                ':id_proveedor' => $_POST['id_proveedor'],
                ':id_almacen' => $_POST['id_almacen'],
                ':id_articulo' => $_POST['id_articulo'],
                ':cantidad_ingreso' => $_POST['cantidad_ingreso'],
                ':observacion_i' => $_POST['observacion_i']
        ]);

        // 2. ACTUALIZAR O INSERTAR EN LA TABLA STOCK
        $id_articulo = $_POST['id_articulo'];
        $id_almacen = $_POST['id_almacen'];
        $cantidad_ingreso = $_POST['cantidad_ingreso'];

        // Primero verificamos si ya existe un registro en stock para este artículo y almacén
        $verificarStock = "SELECT COUNT(*) as existe FROM stock 
                          WHERE id_articulo = :id_articulo AND id_almacen = :id_almacen";
        $stmtVerificar = $conexion_bd->prepare($verificarStock);
        $stmtVerificar->execute([
            ':id_articulo' => $id_articulo,
            ':id_almacen' => $id_almacen
        ]);
        $resultado = $stmtVerificar->fetch(PDO::FETCH_ASSOC);

      if ($resultado['existe'] > 0) {
            // Si existe, actualizamos sumando la cantidad
            $stockUpdate = "UPDATE stock 
                           SET cantidad_disponible = cantidad_disponible + :cantidad_ingreso,
                               cantidad_ingreso = cantidad_ingreso + :cantidad_ingreso2
                           WHERE id_articulo = :id_articulo AND id_almacen = :id_almacen";
            $stmtUpdateStock = $conexion_bd->prepare($stockUpdate);
            $stmtUpdateStock->execute([
                ':cantidad_ingreso' => $cantidad_ingreso,
                ':cantidad_ingreso2' => $cantidad_ingreso,
                ':id_articulo' => $id_articulo,
                ':id_almacen' => $id_almacen
            ]);
        } else {
            // Si no existe, insertamos un nuevo registro
            // Primero obtenemos el nombre del artículo
            $consulta_nombre = "SELECT nom_articulo FROM articulo WHERE id_articulo = :id_articulo";
            $stmt_nombre = $conexion_bd->prepare($consulta_nombre);
            $stmt_nombre->execute([':id_articulo' => $id_articulo]);
            $articulo_info = $stmt_nombre->fetch(PDO::FETCH_ASSOC);
            $nom_articulo = $articulo_info['nom_articulo'] ?? '';
            
            $stockInsert = "INSERT INTO stock (id_articulo, id_almacen, nom_articulo, cantidad_ingreso, cantidad_disponible, cantidad_salida)
                           VALUES (:id_articulo, :id_almacen, :nom_articulo, :cantidad_ingreso, :cantidad_disponible, 0)";
            $stmtInsertStock = $conexion_bd->prepare($stockInsert);
            $stmtInsertStock->execute([
                ':id_articulo' => $id_articulo,
                ':id_almacen' => $id_almacen,
                ':nom_articulo' => $nom_articulo,
                ':cantidad_ingreso' => $cantidad_ingreso,
                ':cantidad_disponible' => $cantidad_ingreso
            ]);
        }
        $conexion_bd->commit(); 

        // --- FIN DE LA TRANSACCIÓN ---

        $_SESSION['mensaje'] = 'Ingreso de recurso registrado exitosamente. Stock actualizado.';
        $_SESSION['tipo_mensaje'] = 'success';
        header("Location: recursoIngreso.php"); 
        exit();

    }

    // MOSTRAR EL LISTADO 
    include ("recursoListado.php"); 

} catch (PDOException $e) {
    // Si ocurre un error de base de datos, revertimos la transacción.
    if ($conexion_bd->inTransaction()) {
        $conexion_bd->rollBack(); 
    }
    $_SESSION['mensaje'] = "Error de base de datos al registrar/actualizar el ingreso de recursos: " . $e->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
    error_log("Error en recursoIngreso.php (PDOException): " . $e->getMessage());

} catch (Exception $e) {
    // Captura cualquier otra excepción que no sea de PDO (ej. `throw new Exception`).
    if ($conexion_bd->inTransaction()) {
        $conexion_bd->rollBack();
    }
    $_SESSION['mensaje'] = "Error inesperado al registrar/actualizar el ingreso de recursos: " . $e->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
    error_log("Error en recursoIngreso.php (Exception): " . $e->getMessage());
}

// --- RECUPERAR Y LIMPIAR MENSAJES DE SESIÓN PARA MOSTRAR EN EL FRONT-END ---
$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje']); // Limpiar el mensaje después de usarlo
unset($_SESSION['tipo_mensaje']); // Limpiar el tipo de mensaje después de usarlo

$tbs->MergeBlock('proveedor', $conexion_bd, $proveedor ?? null);
$tbs->MergeBlock('articulo', $conexion_bd, $articulo ?? null); 
$tbs->MergeBlock('medida', $conexion_bd, $medida ?? null);
$tbs->MergeBlock('clasificacion', $conexion_bd, $clasificacion ?? null); 
$tbs->MergeBlock('almacen', $conexion_bd, $almacen ?? null);  
$tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
$tbs->Show();
exit;
?>