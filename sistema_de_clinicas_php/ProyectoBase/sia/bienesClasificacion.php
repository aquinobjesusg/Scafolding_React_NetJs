<?php
session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");

// VERIFICACIÓN DE USUARIO LOGEADO
if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) 
{
    header("Location: index.php?valor=0");
    exit;
}

// VERIFICACIÓN DE PERMISOS
if (!$super_admin && !verificar_permiso_rapido('Bienes', 'bienes_clasificacion')) 
{
    header("Location: acceso_denegado.php");
    exit;
}

$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('bienesClasificacion.html','UTF-8');
try
{
    //Conexión a la base de datos sia
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Manejo de errores con excepciones

    //Registrar Clasificacion de Bienes
    if(isset($_POST['Registrar']))
    {        
        // Captura y elimina espacios
        $nomClasificacionInput = trim($_POST['nomClasificacion'] ?? '');
        $nomClasificacion = null;

        //Si $nomClasificacionInput no esta vacio
        if (!empty($nomClasificacionInput)) 
        {
            //Se coloca todo en minuscula y se pone la primera letra en mayusculas
            $nomClasificacionFormato = ucfirst(strtolower($nomClasificacionInput));
            
            //Saneamiento HTML
            $nomClasificacion = htmlspecialchars($nomClasificacionFormato);
        }
        
        //Consulta preparada y ejecuta, insert clasificacionbien
        $clasificacionSql = "INSERT INTO oticbienes.clasificacionbien (nom_clasificacionbien) VALUES (:nomClasificacion)";
        $clasificacionPE = $conexion_bd->prepare($clasificacionSql);
        $clasificacionPE->execute([':nomClasificacion' => $nomClasificacion]);

        // Guardar mensaje de éxito en la sesión
        $_SESSION['mensaje'] = 'Clasificación registrada exitosamente.';
        $_SESSION['tipo_mensaje'] = 'success';
        // Redirigir al registro de bienes para que compruebe la nueva Clasificacion en el campo desplegable 
        header("Location: bienes.php"); 
        exit();
    }//Fin de Registrar Clasificacion de Bienes

    
    include ("bienesClasificacionListado.php"); 
} 
catch (PDOException $sqlError)
{
    // Mensajes de error generico para errores SQL
    $_SESSION['mensaje'] = 'Error al registrar: ' . $sqlError->getMessage();

    if ($sqlError->getCode() === '23502')
    {
        //El error 23502 es porque nom_clasificacionbien NO puede ser NULL
        $_SESSION['mensaje'] = 'Es obligatorio llenar el campo Nueva Clasificación.';
    }

    if ($sqlError->getCode() === '23505') 
    {
        //El error 23505 es por violación de restricción UNIQUE (nom_clasificacionbien duplicado)
        $_SESSION['mensaje'] = '¡La Clasificación: "' . $nomClasificacion . '", ya existe! Por favor, ingrese una nueva clasificación única.';
    }

    $_SESSION['tipo_mensaje'] = 'danger';
    header("Location: bienesClasificacion.php"); // Redirigir a la misma página
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
$tbs->Show();
    
?>