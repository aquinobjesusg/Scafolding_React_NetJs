<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servidor = "localhost:8189"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "empleados";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

$sqlEmpleaados = mysqli_query($conexionBD,"DELETE FROM empleados WHERE id=".$_GET["id"]);
if($sqlEmpleaados){
	echo json_encode(["success"=>1]);
	exit();
}
else{  echo json_encode(["success"=>0]); }

?>
