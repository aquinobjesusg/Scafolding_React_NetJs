<?php
include("include/header_php.php");
try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
//el guardián de la puerta:
//aquí es para verificar si el usuario hizo clic en el botón eliminar

if (isset($_POST['id_titular_eliminar'])) {
    try {
//si se tocó el botón

        $id = $_POST['id_titular_eliminar'];
//sentencia: elimina lo que está en la tabla titular donde id_titular sea lo que está en el marcador de posición= :id

        $sqlDel = "DELETE FROM titular WHERE id_titular = :id";
//sentencia (stmt) = base de datos preparate para ejecutar lo eque está en la variable: sqlDel

        $stmt = $conexion_bd->prepare($sqlDel);
        
//¿Te acuerdas del casillero :id que preparamos? Ábrelo y mete este valor $id ahora".
        $stmt->execute([':id' => $id]);

//terminaste la sentencia vuelve a titular.php
        header("Location: titularLista.php");
        exit;
        
    } catch (Exception $e) {
        die("Error al eliminar el registro: " . $e->getMessage());
    } 
} else {
    header("Location: titularLista.php");
    exit;
}
?>