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
$tbs->LoadTemplate('recursoEditar.html','UTF-8');

try
{
    // Conexión a la base de datos sia
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $proveedor = "SELECT id_proveedor, nom_proveedor 
                    FROM proveedor ORDER BY nom_proveedor ASC;";
    $articulo = "SELECT id_articulo, nom_articulo 
                    FROM articulo ORDER BY nom_articulo ASC;";
    $almacen = "SELECT id_almacen, nom_almacen 
                    FROM almacen ORDER BY nom_almacen ASC;";
  
    
    $id_recurso_edit = null;

    // --- 2. Determinar el ID del recurso a editar ---
    if (isset($_POST['Editar']) && !empty($_POST['Editar'])) {
        // Se envía desde el botón de la tabla (POST inicial)
        $id_recurso_edit = (int)$_POST['Editar'];

    } elseif (isset($_POST['id_recurso_actualizar']) && !empty($_POST['id_recurso_actualizar'])) 
    {
        // Se envía desde el formulario de edición al guardar cambios
        $id_recurso_edit = (int)$_POST['id_recurso_actualizar'];

    } else 
    {
        $_SESSION['mensaje'] = 'Error: El recurso a editar no fue encontrado.';
        $_SESSION['tipo_mensaje'] = 'danger';
        header("Location: recursoIngreso.php");
        exit();
    }
    
    // Inicializamos el array de datos del recurso
    $recurso = [];

    // --- 3. Procesar el formulario cuando se envía (Guardar Cambios) ---
    if (isset($_POST['Actualizar'])) {
        
        $conexion_bd->beginTransaction();

        $updateSql = "UPDATE ingreso SET 
                        orden_ingreso = :orden_ingreso,
                        fecha_ingreso = :fecha_ingreso,
                        id_proveedor = :id_proveedor,
                        id_almacen = :id_almacen,
                        id_articulo = :id_articulo,
                        cantidad_ingreso = :cantidad_ingreso,
                        observacion_i = :observacion_i
                      WHERE id_ingreso = :id_ingreso";

        $updatePE = $conexion_bd->prepare($updateSql);
        $updatePE->execute([
            ':orden_ingreso' => $_POST['orden_ingreso'],
            ':fecha_ingreso' => $_POST['fecha_ingreso'],
            ':id_proveedor' => $_POST['id_proveedor'],
            ':id_almacen' => $_POST['id_almacen'],
            ':id_articulo' => $_POST['id_articulo'],
            ':cantidad_ingreso' => $_POST['cantidad_ingreso'],
            ':observacion_i' => $_POST['observacion_i'],
            ':id_ingreso' => $id_recurso_edit // Usamos el ID recuperado
        ]);
           
        $conexion_bd->commit();
        
        $_SESSION['mensaje'] = 'Ingreso de recurso actualizado exitosamente.';
        $_SESSION['tipo_mensaje'] = 'success';
        header("Location: recursoIngreso.php");
        exit();

    }

    // --- 4. Cargar datos del recurso para mostrar en el formulario ---
    // Esto se ejecuta si NO se presionó "GuardarCambios" (es decir, es la carga inicial para editar)
    $recursoEditarSql = "SELECT i.id_ingreso, i.orden_ingreso, i.fecha_ingreso, 
                                i.id_proveedor, i.id_almacen, i.id_articulo, i.cantidad_ingreso, i.observacion_i, 
                                nom_proveedor, nom_almacen, nom_articulo 
                          FROM ingreso i 
                          INNER JOIN proveedor p on p.id_proveedor = i.id_proveedor 
                          INNER JOIN almacen a on a.id_almacen = i.id_almacen 
                          INNER JOIN articulo a2 on a2.id_articulo = i.id_articulo
                          WHERE i.id_ingreso = :id_recurso_edit";
    
    // **CORRECCIÓN AQUÍ** (usar $recursoEditarSql en lugar de $recursoSql)
    $recursoEditarPE = $conexion_bd->prepare($recursoEditarSql); 
    $recursoEditarPE->execute([':id_recurso_edit' => $id_recurso_edit]);
    $recurso = $recursoEditarPE->fetch(PDO::FETCH_ASSOC);

    // Si no se encontró el consumible
    if (!$recurso) {
        $_SESSION['mensaje'] = 'Error: El recurso a editar no existe.';
        $_SESSION['tipo_mensaje'] = 'danger';
        header("Location: recursoIngreso.php");
        exit();
    }


} catch (PDOException $e) {
    // Si ocurre un error de base de datos, revertimos la transacción.
    if (isset($conexion_bd) && $conexion_bd->inTransaction()) {
        $conexion_bd->rollBack();
    }
    $_SESSION['mensaje'] = "Error de base de datos al editar/actualizar el ingreso de recursos: " . $e->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
    error_log("Error en recursoEditar.php (PDOException): " . $e->getMessage());

} catch (Exception $e) {
    // Captura cualquier otra excepción
    if (isset($conexion_bd) && $conexion_bd->inTransaction()) {
        $conexion_bd->rollBack();
    }
    $_SESSION['mensaje'] = "Error inesperado al editar/actualizar el ingreso de recursos: " . $e->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
    error_log("Error en recursoEditar.php (Exception): " . $e->getMessage());
}

// --- RECUPERAR Y LIMPIAR MENSAJES DE SESIÓN PARA MOSTRAR EN EL FRONT-END ---
$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje']);
unset($_SESSION['tipo_mensaje']);

// --- Fusión de datos en el template ---

// Fusión de datos del recurso (para llenar los campos del formulario)
$tbs->MergeBlock('recurso', [$recurso]); 

// Fusión de listas desplegables (asegúrate de que las variables $proveedor, $articulo, $almacen estén definidas)
$tbs->MergeBlock('proveedor', $conexion_bd, $proveedor ?? null);
$tbs->MergeBlock('articulo', $conexion_bd, $articulo ?? null);
$tbs->MergeBlock('almacen', $conexion_bd, $almacen ?? null);

// Fusión de mensajes
$tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));

$tbs->Show();
exit;
?>