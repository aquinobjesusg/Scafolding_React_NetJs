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
if (!$super_admin && !verificar_permiso_rapido('Bienes', 'bienes_editar')) {
    header("Location: acceso_denegado.php");
    exit;
}

$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('bienesEditar.html','UTF-8');

try
{
    //Conexión a la base de datos sia
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Manejo de errores con excepciones

    //Captura del ID bien a editar
    if (isset($_POST['Editar'])) 
    {   //Si el ID viene del botón "Editar" de bienes.php (carga inicial)
        $id_bienes_edit = $_POST['Editar'];

    } elseif (isset($_POST['id_bienes_actualizar'])) 
    {   //Si el ID viene del campo oculto del formulario de edición
        $id_bienes_edit = $_POST['id_bienes_actualizar'];

    } else 
    {
        //Manejar el caso donde no se recibe un ID
        $_SESSION['mensaje'] = 'Error: El bien a editar no fue encontrado.';
        $_SESSION['tipo_mensaje'] = 'danger';
        header("Location: bienesListado.php"); // Redirigir a la página de listado
        exit();
    }

    //Desplegable de estados de un bien (excluyendo a Desincorporar)
    $estadosSql = "SELECT * FROM oticbienes.estado 
                    WHERE id_estado != 1
                    ORDER BY nom_estado DESC;";
    $estadosPE = $conexion_bd->prepare($estadosSql);
    $estadosPE->execute();
    $estados = $estadosPE->fetchAll(PDO::FETCH_ASSOC);

    //Desplegable de clasificacion de un bien
    $clasificacionSql = "SELECT * FROM oticbienes.clasificacionbien ORDER BY nom_clasificacionbien DESC;";
    $clasificacionPE = $conexion_bd->prepare($clasificacionSql);
    $clasificacionPE->execute();
    $clasificacion = $clasificacionPE->fetchAll(PDO::FETCH_ASSOC);

    //Desplegable de conceptos de un bien
    $conceptosSql = "SELECT * FROM oticbienes.concepto ORDER BY nom_concepto DESC;";
    $conceptosPE = $conexion_bd->prepare($conceptosSql);
    $conceptosPE->execute();
    $conceptos = $conceptosPE->fetchAll(PDO::FETCH_ASSOC);

    //Consulta para llenar el formulario con la info del bien a editar
    $bienSql = "SELECT b.id_bienes, 
                       b.codigo_bienes, 
                       b.fecha_ingresob,
                       COALESCE(NULLIF(b.codigo_viejo, ''), 'N/A') AS codigo_viejo, 
                       b.equipob, 
                       COALESCE(NULLIF(b.especificacion, ''), 'N/A') AS especificacion,
                       COALESCE(NULLIF(b.modelo, ''), 'N/A') AS modelo, 
                       COALESCE(NULLIF(b.marca, ''), 'N/A') AS marca,
                       COALESCE(NULLIF(b.serial, ''), 'N/A') AS serial,
                       COALESCE(NULLIF(b.color, ''), 'N/A') AS color,
                       cb.id_clasificacionbien,
                       COALESCE(NULLIF(cb.nom_clasificacionbien, ''), 'N/A') AS nom_clasificacionbien,
                       e.id_estado, 
                       e.nom_estado,
                       COALESCE(NULLIF(b.fecha_adquisicion::text, ''), 'N/A')  AS fecha_adquisicion,
                       c.id_concepto,
                       COALESCE(NULLIF(c.nom_concepto, ''), 'N/A') AS nom_concepto,
                       COALESCE(NULLIF(b.precio_bien::text, ''), 'N/A') AS precio_bien
                       FROM oticbienes.bienes b
                       LEFT JOIN oticbienes.estado e on b.id_estado = e.id_estado
                       LEFT JOIN oticbienes.concepto c on b.id_concepto = c.id_concepto
                       LEFT JOIN oticbienes.clasificacionbien cb  on b.id_clasificacionbien = cb.id_clasificacionbien
                       WHERE b.id_bienes = :id_bienes_edit;";
    $bienPE = $conexion_bd->prepare($bienSql);
    $bienPE->execute([':id_bienes_edit' => $id_bienes_edit]);
    $bien = $bienPE->fetchAll(PDO::FETCH_ASSOC);

    //Editar Bien
    if(isset($_POST['GuardarCambios']))
    {
        //Captura y Saneamiento de Datos 
        $codigo_bienes = !empty(trim($_POST['codigo_bienes_edit'] ?? '')) ? htmlspecialchars(trim($_POST['codigo_bienes_edit'] ?? '')) : null;
        $fecha_ingresob = !empty(trim($_POST['fecha_ingresob_edit'] ?? '')) ? trim($_POST['fecha_ingresob_edit'] ?? '') : null;
        $codigo_viejo = !empty(trim($_POST['codigo_viejo_edit'] ?? '')) ? htmlspecialchars(trim($_POST['codigo_viejo_edit'] ?? '')) : null;
        $equipob = !empty(trim($_POST['equipob_edit'] ?? '')) ? htmlspecialchars(trim($_POST['equipob_edit'] ?? '')) : null;
        $modelo = !empty(trim($_POST['modelo_edit'] ?? '')) ? htmlspecialchars(trim($_POST['modelo_edit'] ?? '')) : null;
        $marca = !empty(trim($_POST['marca_edit'] ?? '')) ? htmlspecialchars(trim($_POST['marca_edit'] ?? '')) : null;
        $serial = !empty(trim($_POST['serial_edit'] ?? '')) ? htmlspecialchars(trim($_POST['serial_edit'] ?? '')) : null;
        $color = !empty(trim($_POST['color_edit'] ?? '')) ? htmlspecialchars(trim($_POST['color_edit'] ?? '')) : null;
        $especificacion = !empty(trim($_POST['especificacion_edit'] ?? '')) ? htmlspecialchars(trim($_POST['especificacion_edit'] ?? '')) : null;
        $id_estado = filter_input(INPUT_POST, 'id_estado_edit', FILTER_VALIDATE_INT) ?: null;
        $id_concepto = filter_input(INPUT_POST, 'id_concepto_edit', FILTER_VALIDATE_INT) ?: null;
        $fecha_adquisicion = !empty(trim($_POST['fecha_adquisicion_edit'] ?? '')) ? trim($_POST['fecha_adquisicion_edit'] ?? '') : null;
        $precio_bien_entrada = trim($_POST['precio_bien_edit'] ?? '');
        $precio_bien = !empty($precio_bien_entrada) ? filter_var($precio_bien_entrada, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) : '0.00';
        $id_clasificacionbien = filter_input(INPUT_POST, 'id_clasificacionbien_edit', FILTER_VALIDATE_INT) ?: null;

        // Establecer la variable de sesión en PostgreSQL para el trigger
        $conexion_bd->exec("SET miphp.id_usuario = '{$usuario}'");

        //Consulta preparada update bienes
        $bienesUpdate = "UPDATE oticbienes.bienes
                         SET id_usuario = :id_usuario, 
                             codigo_bienes = :codigo_bienes, 
                             fecha_ingresob = :fecha_ingresob, 
                             codigo_viejo = :codigo_viejo, 
                             equipob = :equipob, 
                             modelo = :modelo, 
                             marca = :marca, 
                             serial = :serial,
                             color = :color,
                             especificacion = :especificacion,
                             id_estado = :id_estado,
                             fecha_adquisicion = :fecha_adquisicion,
                             id_concepto = :id_concepto,
                             precio_bien = :precio_bien,
                             id_clasificacionbien = :id_clasificacionbien
                         WHERE id_bienes = :id_bienes_edit";

        $resultadoBienesUpdate = $conexion_bd->prepare($bienesUpdate);

        //Asignar valores a los marcadores y ejecución de la consulta
        $resultadoBienesUpdate->execute([
            ':id_usuario' => $usuario,
            ':codigo_bienes' => $codigo_bienes,
            ':fecha_ingresob' => $fecha_ingresob,
            ':codigo_viejo' => $codigo_viejo,
            ':equipob' => $equipob,
            ':modelo' => $modelo,
            ':marca' => $marca,
            ':serial' => $serial,
            ':color' => $color,
            ':especificacion' => $especificacion,
            ':id_estado' => $id_estado,
            ':fecha_adquisicion' => $fecha_adquisicion,
            ':id_concepto' => $id_concepto,
            ':precio_bien' => $precio_bien,
            ':id_clasificacionbien' => $id_clasificacionbien,
            ':id_bienes_edit' => $id_bienes_edit
        ]);

        // Restablecer la variable de sesión después de la operación
        $conexion_bd->exec("RESET miphp.id_usuario");

        // Guardar mensaje de éxito en la sesión
        $_SESSION['mensaje'] = 'Registrado actualizado exitosamente.';
        $_SESSION['tipo_mensaje'] = 'success';
        header("Location: bienesListado.php"); //Redirigir a la página inicial
        exit();
    }//Fin de Editar Bienes
} 
catch (PDOException $sqlError)
{
    // Guardar mensaje de error en la sesión
    $_SESSION['mensaje'] = 'Error al editar, vuelva a intentarlo: ' . $sqlError->getMessage();
    $_SESSION['tipo_mensaje'] = 'danger';
    header("Location: bienesEditar.php"); //Redirigir a la misma página
    exit();

} 
finally
{
    //Cierre de la conexión
    
}

// Recuperar y limpiar el mensaje de la sesión para mostrarlo en el modal
$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje']);
unset($_SESSION['tipo_mensaje']);

// Cambia esto para que $bien sea un array simple y no una lista
$bien_datos = (count($bien) > 0) ? $bien[0] : [];

// Asignar las variables para TinyButStrong
$tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
$tbs->MergeField('bien', $bien_datos); // Usamos MergeField o pasamos el array simple
$tbs->MergeBlock('estados', $estados);
$tbs->MergeBlock('clasificacion', $clasificacion);
$tbs->MergeBlock('conceptos', $conceptos);
$tbs->Show();
    
?>