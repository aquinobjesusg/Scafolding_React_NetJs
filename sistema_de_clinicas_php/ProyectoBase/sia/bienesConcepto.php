<?php
session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");

if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) 
{
    header("Location: index.php?valor=0");
    exit;
}


if (!$super_admin && !verificar_permiso_rapido('Bienes', 'bienes_concepto')) 
{
    header("Location: acceso_denegado.php");
    exit;
}

$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('bienesConcepto.html','UTF-8');
try
{
    
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 


    if(isset($_POST['Registrar']))
    {        
   
        $nomConceptoInput = trim($_POST['nomConcepto'] ?? '');
        $nomConcepto = null;

   
        if (!empty($nomConceptoInput)) 
        {
          
            $nomConceptoFormato = ucfirst(strtolower($nomConceptoInput));
            
       
            $nomConcepto = htmlspecialchars($nomConceptoFormato);
        }
        

        $conceptoSql = "INSERT INTO oticbienes.concepto (nom_concepto) VALUES (:nomConcepto)";
        $conceptoPE = $conexion_bd->prepare($conceptoSql);
        $conceptoPE->execute([':nomConcepto' => $nomConcepto]);

    
        $_SESSION['mensaje'] = 'Concepto de adquisición registrada exitosamente.';
        $_SESSION['tipo_mensaje'] = 'success';
   
        header("Location: bienes.php"); 
        exit();
    }


    // LISTADO
    include ("bienesConceptoListado.php"); 

} 
catch (PDOException $sqlError)
{
  
    $_SESSION['mensaje'] = 'Error al registrar: ' . $sqlError->getMessage();

    if ($sqlError->getCode() === '23502')
    {
 
        $_SESSION['mensaje'] = 'Es obligatorio llenar el campo Nuevo Concepto.';
    }

    if ($sqlError->getCode() === '23505') 
    {
       
        $_SESSION['mensaje'] = '¡El Concepto: "' . $nomConcepto . '", ya existe! Por favor, ingrese un nuevo concepto de adquisición único.';
    }

    $_SESSION['tipo_mensaje'] = 'danger';
    header("Location: bienesConcepto.php");
    exit();
} 
finally
{
 
    
}


$mensaje = $_SESSION['mensaje'] ?? null;
$tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
unset($_SESSION['mensaje']);
unset($_SESSION['tipo_mensaje']);


$tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
$tbs->Show();
    
?>