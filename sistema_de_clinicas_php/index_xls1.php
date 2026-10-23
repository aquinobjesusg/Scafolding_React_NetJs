<?php
include("include/header_php.php");

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost;port=$dbport;dbname=$dbdatabase;user=$dbuser;password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
} catch (Exception $e) {
    die("Error de conexión: " . $e->getMessage());
}

/*if (isset($_COOKIE['conexion_bd'])) {
    // Aquí ejecutas el código cuando la variable sí existe
    echo "La conexión activa es: " . $_COOKIE['conexion_bd'];
} else {
    // Código alternativo si la variable no está definida
    echo "No hay una conexión de base de datos activa.";
}*/


//include "include/header_php.php";
require 'vendor/autoload.php';

//$conexion_bd = json_decode($_COOKIE['conexion_bd']);
$ltitulo = json_decode($_COOKIE['ltitulo']);
$vsql = json_decode($_COOKIE['vsql']);
$encabezados = json_decode($_COOKIE['encabezados']);
$campos = json_decode($_COOKIE['campos']);
$mi_busqueda_html = '';

try {
    $trazabilidad = '';
    $trazabilidad = $trazabilidad . "INSERT INTO trazabilidad ";
    $trazabilidad = $trazabilidad . "(fecha_de_registro,evento,id_usuario,direccion_ip) ";
    $trazabilidad = $trazabilidad . "VALUES ('".obtenerFechaHora()."','EXCEL-".$ltitulo."','".obtenerUsuario()."', '".obtenerIP()."') ";
    $stmt = $conexion_bd->prepare($trazabilidad);
    $stmt->execute();
    
    MostrarExcel($conexion_bd, $ltitulo, $vsql, $mi_busqueda_html, $encabezados, $campos);
    
    
    
} catch (Exception $e) {
    
    $trazabilidad = '';
    $trazabilidad = $trazabilidad . "INSERT INTO trazabilidad ";
    $trazabilidad = $trazabilidad . "(fecha_de_registro,evento,id_usuario,direccion_ip) ";
        $trazabilidad = $trazabilidad . "VALUES ('".obtenerFechaHora()."','EXCEL-ERROR".$ltitulo."','".obtenerUsuario()."', '".obtenerIP()."') ";
    $stmt = $conexion_bd->prepare($trazabilidad);
    $stmt->execute();
    
    die("Error al generar Excel: " . $e->getMessage());
}
