<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost:8189"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "empleados";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

$data = json_decode(file_get_contents("php://input"));

$id=$_GET["id"];
$nombre=$data->nombre;

$sqlEmpleaados = mysqli_query($conexionBD,"UPDATE empleados SET nombre='$nombre' WHERE id='$id'");
echo json_encode(["success"=>1]);
exit();

?>
