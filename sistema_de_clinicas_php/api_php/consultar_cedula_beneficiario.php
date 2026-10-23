<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
//$servidor = "localhost:8189"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "empleados";
//$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

setlocale(LC_TIME, 'es_ES');
$dbhost = '172.17.10.23';
$dbuser = 'admin';
$dbpasswd = 'S1s-bienes';
$dbdatabase = 'sgp';
$dbport = '9876';

$cedula = '';
if (isset($_GET['cedula'])) {
  $cedula = intval($_GET['cedula']);
  $cedula = trim($cedula);
   
  if( $cedula == "" || $cedula == 0 ) {
    echo json_encode(["success" => -3, "mensaje" => "Datos en Blanco"]);
    exit();
  }
} else {
  echo json_encode(["success" => -1, "mensaje" => 'No existe paramentros']);
  exit();
}

$sql = "";
$re = 0;
//echo "a try";
try {
  $conexion_bd = new PDO("pgsql:host=$dbhost;port=$dbport;dbname=$dbdatabase", $dbuser, $dbpasswd);
  $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  //echo is_numeric($cedula);
  //echo is_null($cedula);
  //die();
  if ($cedula == '') {
    // Nothing
  } else {
//    $sql = "SELECT *, f_parentesco(parentesco)  FROM carga_masiva WHERE carga_masiva.cedula_beneficiario_ref = '" . $cedula . "'";
$sql = "SELECT 
    *, 
    f_parentesco(cm.parentesco), 
    CASE 
        WHEN cm.id_carga_masiva IN (
            SELECT ve.id_carga_masiva 
            FROM v_condicion_especial ve 
        ) THEN '1' 
        ELSE '0' 
    END AS in_condicion_especial ,
        CASE 
        WHEN cm.id_carga_masiva IN (
            SELECT vl.id_carga_masiva 
            FROM v_condicion_legal vl 
        ) THEN '1' 
        ELSE '0' 
    END AS in_condicion_legal 
FROM carga_masiva cm 
WHERE cm.cedula_beneficiario_ref = '" . $cedula . "'";

    }

  //echo $sql;
  //die();

  $query = $conexion_bd->query($sql);
  $datos_b = $query->fetchAll(PDO::FETCH_ASSOC);

  //        $vsql = 'select max (id_titular) as numero from public.paciente';
//        $valor = SelectFrom($conexion_bd, $vsql);

  $re = 1;
  $ced_titular = "";
  $can = 0;
  foreach ($datos_b as $registro) {
    $ced_titular = $registro['cedula_titular'];
    $can++;
  }

  if ($ced_titular == '') {
    // Nothing
  } else {
//    $sql = "SELECT *, f_parentesco(parentesco) FROM carga_masiva WHERE carga_masiva.cedula_titular = '" . $ced_titular . "' and carga_masiva.cedula_beneficiario_ref = '" . $ced_titular . "'";

$sql = "SELECT 
    *, 
    f_parentesco(cm.parentesco), 
    CASE 
        WHEN cm.id_carga_masiva IN (
            SELECT ve.id_carga_masiva 
            FROM v_condicion_especial ve 
            ) THEN '1' 
        ELSE '0' 
        END AS in_condicion_especial ,
        CASE 
        WHEN cm.id_carga_masiva IN (
            SELECT vl.id_carga_masiva 
            FROM v_condicion_legal vl 
        ) THEN '1' 
        ELSE '0' 
    END AS in_condicion_legal
FROM carga_masiva cm 
WHERE cm.cedula_titular = '" . $ced_titular . "' and cm.cedula_beneficiario_ref = '" . $ced_titular . "'";



    $queryt = $conexion_bd->query($sql);
    $datos_t = $queryt->fetchAll(PDO::FETCH_ASSOC);

    if (isset($datos_t) && isset($datos_b)) {
      $resultado_final = array_merge($datos_b, $datos_t);
      $re = 2;
    }

  }

  //  echo $ced_titular;

  //echo json_encode($datos_b);
  //print_r ($datos);

  if ($can > 0) {
    if ($re == 1) {
      echo json_encode(["success" => 0, "mensaje" => "Falta Titular", "data" => $datos_b]);
      exit();
    }

    if ($re == 2) {
      echo json_encode(["success" => 1, "mensaje" => "OK", "data" => $resultado_final]);
      exit();
    }
  } else {
    
      echo json_encode(["success" => 0, "mensaje" => "Cédula No Entrontrada","data" => []]);
      exit();
    
  }
} catch (PDOException $e) {
  echo json_encode(["success" => -2, "mensaje" => $e, "data" => [] ]);
}

exit();

?>