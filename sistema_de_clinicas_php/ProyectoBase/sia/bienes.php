<?php
session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");
include_once ('funcs/funcionAuditoriaBien.php');

if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) 
{
    header("Location: index.php?valor=0");
    exit;
}

$usuario = $_SESSION['id_usuario'];
$nombre = $_SESSION['nom_usuario'];
$correo = $_SESSION['correo_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;

// VERIFICACIÓN DE PERMISOS
if (!$super_admin && !verificar_permiso_rapido('Bienes', 'bienes_registrar')) 
{
    header("Location: acceso_denegado.php");
    exit;
}

$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('bienes.html','UTF-8');
try
{
    //Conexión a la base de datos sia
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Manejo de errores con excepciones
    
    //Desplegable de estados de un bien (excluyendo a Desincorporar)
    $estadosSql = "SELECT * FROM oticbienes.estado 
                    WHERE id_estado != 1
                    ORDER BY nom_estado;";
    $estadosPE = $conexion_bd->prepare($estadosSql);
    $estadosPE->execute();
    $estados = $estadosPE->fetchAll(PDO::FETCH_ASSOC);

    //Desplegable de clasificacion de un bien
    $clasificacionSql = "SELECT * FROM oticbienes.clasificacionbien ORDER BY nom_clasificacionbien;";
    $clasificacionPE = $conexion_bd->prepare($clasificacionSql);
    $clasificacionPE->execute();
    $clasificacion = $clasificacionPE->fetchAll(PDO::FETCH_ASSOC);

    //Desplegable de conceptos de un bien
    $conceptosSql = "SELECT * FROM oticbienes.concepto ORDER BY nom_concepto;";
    $conceptosPE = $conexion_bd->prepare($conceptosSql);
    $conceptosPE->execute();
    $conceptos = $conceptosPE->fetchAll(PDO::FETCH_ASSOC);

    //Registrar Bienes
    if(isset($_POST['Registrar']))
    {
        //Captura y Saneamiento de Datos 
        
        // Reemplaza la comilla simple por el guion
        $limpio_codigo_bienes = trim($_POST['codigo_bienes'] ?? '');
        $limpio_codigo_bienes = str_replace("'", "-", $limpio_codigo_bienes); 
        $codigo_bienes = !empty($limpio_codigo_bienes) ? $limpio_codigo_bienes : null;

        $fecha_ingresob = !empty(trim($_POST['fecha_ingresob'] ?? '')) ? trim($_POST['fecha_ingresob'] ?? '') : null;
        $codigo_viejo = !empty(trim($_POST['codigo_viejo'] ?? '')) ? htmlspecialchars(trim($_POST['codigo_viejo'] ?? '')) : null;
        $equipob = !empty(trim($_POST['equipob'] ?? '')) ? htmlspecialchars(trim($_POST['equipob'] ?? '')) : null;
        $modelo = !empty(trim($_POST['modelo'] ?? '')) ? htmlspecialchars(trim($_POST['modelo'] ?? '')) : null;
        $marca = !empty(trim($_POST['marca'] ?? '')) ? htmlspecialchars(trim($_POST['marca'] ?? '')) : null;
        $serial = !empty(trim($_POST['serial'] ?? '')) ? htmlspecialchars(trim($_POST['serial'] ?? '')) : null;
        $color = !empty(trim($_POST['color'] ?? '')) ? htmlspecialchars(trim($_POST['color'] ?? '')) : null;
        $especificacion = !empty(trim($_POST['especificacion'] ?? '')) ? htmlspecialchars(trim($_POST['especificacion'] ?? '')) : null;
        $id_estado = filter_input(INPUT_POST, 'id_estado', FILTER_VALIDATE_INT) ?? 0;
        $id_concepto = filter_input(INPUT_POST, 'id_concepto', FILTER_VALIDATE_INT) ?: null;
        $fecha_adquisicion = !empty(trim($_POST['fecha_adquisicion'] ?? '')) ? trim($_POST['fecha_adquisicion'] ?? '') : null;
        $precio_bien_entrada = trim($_POST['precio_bien'] ?? '');
        $precio_bien = !empty($precio_bien_entrada) ? filter_var($precio_bien_entrada, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION) : '0.00';
        $id_clasificacionbien = filter_input(INPUT_POST, 'id_clasificacionbien', FILTER_VALIDATE_INT) ?? 0;
        
        //Campos de la tabla bienes que seran manipulados
        $campos = "id_usuario, codigo_bienes, fecha_ingresob, codigo_viejo, equipob, modelo, marca, serial, color, especificacion, id_estado, fecha_adquisicion, id_concepto, precio_bien, id_clasificacionbien";

        //Consulta preparada insert bienes
        $bienesInsert = "INSERT INTO oticbienes.bienes ($campos)
                            VALUES (:id_usuario, :codigo_bienes, :fecha_ingresob, :codigo_viejo, :equipob, :modelo, :marca, :serial, :color, :especificacion, :id_estado, :fecha_adquisicion, :id_concepto, :precio_bien, :id_clasificacionbien)";

        $resultadoBienesInsert = $conexion_bd->prepare($bienesInsert);

        //Obtención de datos del formulario y ejecución de la consulta
        $resultadoBienesInsert->execute([
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
            ':id_clasificacionbien' => $id_clasificacionbien
        ]);
        
        // Guardar mensaje de éxito en la sesión
        $_SESSION['mensaje'] = 'Registrado exitosamente.';
        $_SESSION['tipo_mensaje'] = 'success';
        header("Location: bienesListado.php"); // Redirigir a la misma página
        exit();
    }//Fin de Registrar Bienes

} 
catch (PDOException $sqlError)
{
    // Mensajes de error generico para errores SQL
    $_SESSION['mensaje'] = 'Error al registrar: ' . $sqlError->getMessage();

    if ($sqlError->getCode() === '23502')
    {
        //El error 23502 es porque codigo_bienes NO puede ser NULL
        $_SESSION['mensaje'] = 'Es obligatorio llenar los campos Nuevo Código y Equipo para registrar el Bien.';
    }

    if ($sqlError->getCode() === '23505') 
    {
        //El error 23505 es por violación de restricción UNIQUE (codigo_bienes duplicado)
        $_SESSION['mensaje'] = '¡El Código del Bien: ' . $codigo_bienes . ', ya existe! Por favor, ingrese un código único.';
    }

    if ($sqlError->getCode() === '22007') 
    {
        $_SESSION['mensaje'] = 'Es obligatorio colocar la Fecha de Incorporacion del Bien.';
    }

    if ($sqlError->getCode() === '23503') 
    {
        //El error 23503 es porque id_estado o id_clasificacionbien es 0 
        $_SESSION['mensaje'] = 'Es obligatorio seleccionar el Estado y la Clasificacion del bien.';
    } 

    $_SESSION['tipo_mensaje'] = 'danger';
    header("Location: bienes.php"); // Redirigir a la misma página
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

// Asignar las variables para TinyButStrong
$tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
$tbs->MergeBlock('estados', $estados);
$tbs->MergeBlock('clasificacion', $clasificacion);
$tbs->MergeBlock('conceptos', $conceptos);
$tbs->Show();
    
?>