<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

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
if (!$super_admin && !verificar_permiso_rapido('Almacén', 'almacen_salida')) {
    header("Location: acceso_denegado.php");
    exit;
}

$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('recursoSalidaEditar.html','UTF-8');

// Variables para los MergeBlock
$dependenciaQuery = "SELECT id_dependencia, nom_dependencia FROM dependencia ORDER BY nom_dependencia;";
$almacenQuery = "SELECT id_almacen, nom_almacen FROM almacen ORDER BY nom_almacen;";
$opciones_pdo = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_PERSISTENT => false // Asegura que no es persistente
];
// Inicializar variables para prevenir errores si no se obtienen datos
$datosSalidaPrincipal = null;
$articulosSalida = [];
$orden_salida_a_editar = $_POST['orden_salida_hidden'] ?? $_POST['Editar'] ?? null; // Usamos el hidden si viene de POST actualizar

try {
    // Conexión a la base de datos PostgreSQL usando PDO
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // --- Lógica de ACTUALIZACIÓN ---
    if (isset($_POST['Actualizar']) && $orden_salida_a_editar) 
    {
        $conexion_bd->beginTransaction();

        // 1. Validar datos
        if (!isset($_POST['id_articulo']) || !is_array($_POST['id_articulo']) || count($_POST['id_articulo']) == 0) {
            throw new Exception("Debe seleccionar al menos un artículo para la salida.");
        }

        $id_almacen_nuevo = $_POST['id_almacen'];
        $id_dependencia_nuevo = $_POST['id_dependencia'];
        $fecha_salida_nueva = $_POST['fecha_salida'];
        $observacion_s_nueva = $_POST['observacion_s'];
        
        // --- REVERTIR STOCK ORIGINAL Y BORRAR LÍNEAS DE SALIDA ANTERIORES ---
        
        // A. Obtener las cantidades originales para revertir el stock
        $queryArticulosOriginales = "SELECT id_articulo, cantidad_salida, id_almacen FROM salida WHERE orden_salida = :orden_salida";
        $stmtArticulosOriginales = $conexion_bd->prepare($queryArticulosOriginales);
        $stmtArticulosOriginales->execute([':orden_salida' => $orden_salida_a_editar]);
        $articulosOriginales = $stmtArticulosOriginales->fetchAll(PDO::FETCH_ASSOC);

        // B. Revertir el stock original
        $stockRevertir = "UPDATE stock SET cantidad_disponible = cantidad_disponible + :cantidad_salida WHERE id_articulo = :id_articulo AND id_almacen = :id_almacen";
        $stmtRevertirStock = $conexion_bd->prepare($stockRevertir);

        foreach ($articulosOriginales as $articuloOriginal) {
    
            $stmtRevertirStock->execute([
                ':cantidad_salida' => $articuloOriginal['cantidad_salida'],
                ':id_articulo'     => $articuloOriginal['id_articulo'],
                ':id_almacen'      => $articuloOriginal['id_almacen']
            ]);
        }
        
        // C. Eliminar todas las líneas de salida de la orden
        $deleteSalida = "DELETE FROM salida WHERE orden_salida = :orden_salida";
        $stmtDeleteSalida = $conexion_bd->prepare($deleteSalida);
        $stmtDeleteSalida->execute([':orden_salida' => $orden_salida_a_editar]);

        // --- INSERTAR NUEVAS LÍNEAS DE SALIDA Y ACTUALIZAR STOCK NUEVO ---
        
        // 1. Prepare las sentencias SQL para la inserción y la actualización de stock
        $salidaInsert = "INSERT INTO salida (id_usuario, orden_salida, fecha_salida, id_dependencia, id_almacen, id_articulo, cantidad_salida, observacion_s)
                             VALUES (:id_usuario, :orden_salida, :fecha_salida, :id_dependencia, :id_almacen, :id_articulo, :cantidad_salida, :observacion_s)";
        $stmtInsertSalida = $conexion_bd->prepare($salidaInsert);
        
        $stockUpdate = "UPDATE stock SET cantidad_disponible = cantidad_disponible - :cantidad_salida
                         WHERE id_articulo = :id_articulo AND id_almacen = :id_almacen AND cantidad_disponible >= :cantidad_salida";
        $stmtUpdateStock = $conexion_bd->prepare($stockUpdate);

        // 2. Iterar sobre los arrays de artículos enviados en la edición
        $articulos_registrados = 0;
        $total_articulos = count($_POST['id_articulo']);

        for ($i = 0; $i < $total_articulos; $i++) {
            
            $id_articulo = $_POST['id_articulo'][$i];
            $cantidad = (int)$_POST['cantidad_salida'][$i];
            $observacion = $_POST['observacion_s_item'][$i]; // Usar nombre de campo diferente si la observación del ítem no es la general

            if ($cantidad <= 0 || empty($id_articulo)) {
                continue;
            }

            // A. Descontar el stock (usando el nuevo almacén seleccionado)
            $stmtUpdateStock->execute([
                ':cantidad_salida' => $cantidad,
                ':id_articulo'     => $id_articulo,
                ':id_almacen'      => $id_almacen_nuevo
            ]);

            if ($stmtUpdateStock->rowCount() === 0) {
                // Si la actualización falla, puede ser por stock insuficiente o por que el artículo
                // no existe en el stock del almacén seleccionado.
                throw new Exception("Stock insuficiente para el Artículo ID: " . $id_articulo . " en el almacén " . $id_almacen_nuevo . " o registro de stock no encontrado.");
            }

            // B. Insertar la nueva línea de salida (con el nuevo almacén y dependencia)
            $stmtInsertSalida->execute([
                ':id_usuario'       => $usuario,
                ':orden_salida'     => $orden_salida_a_editar,
                ':fecha_salida'     => $fecha_salida_nueva,
                ':id_dependencia'   => $id_dependencia_nuevo,
                ':id_almacen'       => $id_almacen_nuevo,
                ':id_articulo'      => $id_articulo,
                ':cantidad_salida'  => $cantidad,
                ':observacion_s'    => $observacion
            ]);
            
            $articulos_registrados++;
        }

        if ($articulos_registrados == 0) {
            // Si el usuario borró todas las líneas
            throw new Exception("La salida fue editada pero no se pudo registrar ninguna línea. Se ha borrado la orden original. Por favor, intente de nuevo o regrese.");
        }
        
        $conexion_bd->commit(); 

        $_SESSION['mensaje'] = 'Salida/Distribución de recurso **' . $orden_salida_a_editar . '** actualizada exitosamente. Se registraron ' . $articulos_registrados . ' artículos.';
        $_SESSION['tipo_mensaje'] = 'success';
        header("Location: recursoSalida.php"); // Redirigir al listado o al formulario principal
        exit();
    }
    
    // --- Lógica para obtener los datos de la salida a editar (Solo Lectura) ---
    if ($orden_salida_a_editar) {
        
        // Consulta para obtener los datos principales de la salida
        $querySalidaPrincipal = "SELECT DISTINCT
                                    s.orden_salida,
                                    s.fecha_salida,
                                    s.id_dependencia,
                                    s.id_almacen,
                                    (SELECT observacion_s FROM salida WHERE orden_salida = s.orden_salida LIMIT 1) as observacion_s_general
                                FROM salida s
                                WHERE s.orden_salida = :orden_salida
                                LIMIT 1";

        $stmtSalidaPrincipal = $conexion_bd->prepare($querySalidaPrincipal);
        $stmtSalidaPrincipal->execute([':orden_salida' => $orden_salida_a_editar]);
        $datosSalidaPrincipal = $stmtSalidaPrincipal->fetch(PDO::FETCH_ASSOC);

        if (!$datosSalidaPrincipal) {
            throw new Exception("Salida con orden '{$orden_salida_a_editar}' no encontrada.");
        }

        // Consulta para obtener todos los artículos asociados a esta salida
        $queryArticulosSalida = "SELECT 
                                    s.id_articulo,
                                    a.nom_articulo,
                                    s.cantidad_salida,
                                    s.observacion_s
                                FROM salida s
                                JOIN articulo a ON s.id_articulo = a.id_articulo
                                WHERE s.orden_salida = :orden_salida
                                ORDER BY a.nom_articulo";

        $stmtArticulosSalida = $conexion_bd->prepare($queryArticulosSalida);
        $stmtArticulosSalida->execute([':orden_salida' => $orden_salida_a_editar]);
        $articulosSalida = $stmtArticulosSalida->fetchAll(PDO::FETCH_ASSOC);

        if (empty($articulosSalida)) {
            throw new Exception("No se encontraron artículos asociados a la salida con orden '{$orden_salida_a_editar}'.");
        }

        // Consulta para obtener artículos disponibles en el almacén seleccionado + los ya incluidos en esta salida
        $articulosDisponiblesQuery = "SELECT DISTINCT 
                                            a.id_articulo, 
                                            a.nom_articulo, 
                                            COALESCE(s.cantidad_disponible, 0) AS cantidad_disponible
                                        FROM articulo a
                                        LEFT JOIN stock s ON a.id_articulo = s.id_articulo AND s.id_almacen = :id_almacen
                                        WHERE COALESCE(s.cantidad_disponible, 0) > 0
                                        OR a.id_articulo IN (
                                                SELECT id_articulo 
                                                FROM salida 
                                                WHERE orden_salida = :orden_salida
                                            )
                                        ORDER BY a.nom_articulo";
    
        // Pasar los datos a los MergeBlocks
        $tbs->MergeBlock('dependencia', $conexion_bd, $dependenciaQuery);
        $tbs->MergeBlock('almacen', $conexion_bd, $almacenQuery);
        $tbs->MergeBlock('articulos', $conexion_bd, $articulosDisponiblesQuery, [
            ':id_almacen' => $datosSalidaPrincipal['id_almacen'],
            ':orden_salida' => $orden_salida_a_editar
        ]);
    
        // Pasar los datos principales como variables individuales
        $tbs->MergeField('orden_salida', $datosSalidaPrincipal['orden_salida']);
        $tbs->MergeField('fecha_salida', $datosSalidaPrincipal['fecha_salida']);
        $tbs->MergeField('observacion_s', $datosSalidaPrincipal['observacion_s_general'] ?? '');
    
        // Crear arrays para pasar las variables seleccionadas
        $selected_values = array(
            array(
                'selected_dependencia_id' => $datosSalidaPrincipal['id_dependencia'],
                'selected_almacen_id' => $datosSalidaPrincipal['id_almacen']
            )
        );
    
        // Pasar las variables seleccionadas
        $tbs->MergeBlock('selected', $selected_values);
    
        // Pasar los artículos de la salida como bloque
        $tbs->MergeBlock('salida_items', $articulosSalida);
    } else {
        throw new Exception("Orden de salida no proporcionada para la edición.");
    }
    
} catch (PDOException $e) {
    if (isset($conexion_bd) && $conexion_bd->inTransaction()) {
        $conexion_bd->rollBack();
    }
    $_SESSION['mensaje'] = "Error de base de datos general: " . $e->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
    error_log("Error en recursoSalidaEditar.php (Outer PDOException): " . $e->getMessage());

} catch (Exception $e) {
    if (isset($conexion_bd) && $conexion_bd->inTransaction()) {
        $conexion_bd->rollBack();
    }
    $_SESSION['mensaje'] = "Error inesperado: " . $e->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
    error_log("Error en recursoSalidaEditar.php (Outer Exception): " . $e->getMessage());
}

// Recuperar y limpiar mensajes de sesión
$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje']);
unset($_SESSION['tipo_mensaje']);

$tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
$tbs->Show();
?>