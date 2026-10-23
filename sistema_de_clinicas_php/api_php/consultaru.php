<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
//$servidor = "localhost:8189"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "empleados";
//$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

  setlocale(LC_TIME,'es_ES');
  $dbhost='172.17.10.23';
  $dbuser='admin';
  $dbpasswd='S1s-bienes';
  $dbdatabase='sgp';
  $dbport='9876';

  try {
    $conexion_bd = new PDO("pgsql:host=$dbhost;port=$dbport;dbname=$dbdatabase", $dbuser, $dbpasswd);
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT * FROM usuario ";
    $query = $conexion_bd->query($sql);
    $datos = $query->fetchAll(PDO::FETCH_ASSOC);

	echo json_encode($datos);
  //echo ($datos);

} catch (PDOException $e) {
	echo json_encode(["success"=>0]);
}

//echo json_encode(["nombre"=>"gabriela","correo"=>"mendes","id_rol"=>"2"]);

exit();

?>
