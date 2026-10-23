<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

$_SESSION['id_usuario'] = "0";
$_SESSION['nombre_usuario'] = "0";
$_SESSION['id_rol'] = "0";
$_SESSION['nombre_rol'] = "0";


include("include/tbs_class.php");
include("include/config.php");
include 'include/utilidades.php';
include 'include/funcionesPantalla.php';
include 'include/funcionesDB.php';

function obtenerIP()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP']; // IP compartida
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR']; // Pasada por proxy
    } else {
        return $_SERVER['REMOTE_ADDR']; // Conexión directa
    }
}

function obtenerUsuario()
{
    return $_SESSION['id_usuario']; // Conexión directa
}

function obtenerFechaHora()
{
    date_default_timezone_set('America/Caracas');
    $fechaHoraActual = date('Y-m-d H:i:s');
    return $fechaHoraActual;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    if (isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])) {

        // Tu clave secreta provista por Google
        $secretKey = "6LdGqLAtAAAAABzScdTzCj1_dDhZSB7cKU0zwAKK";
        // El token enviado desde el formulario
        $userResponse = $_POST['g-recaptcha-response'];
        // IP del visitante
        $userIp = $_SERVER['REMOTE_ADDR'];

        // echo $userResponse;
        // echo "<br>";
        // echo $userIp;
        // echo "<br>";

        // 2. Construir la URL de verificación de Google
        $url = "https://google.com" . $secretKey . "&response=" . $userResponse . "&remoteip=" . $userIp;

        // 3. Realizar la solicitud a Google utilizando file_get_contents
        $response = @file_get_contents($url);
        $responseKeys = json_decode($response, true);

        // 4. Evaluar la respuesta final de Google
        if (isset($responseKeys)) {

            if ($responseKeys["success"]) {

                echo "Si OK ";

            } else {

                echo "Error en la Verificacion Humana ";


            }
        } else {
            echo "Respuesta Nula ";
        }

    } else {
        header("Location: index.php");
        exit;


    }
}



//}
//}
$tbs = new clsTinyButStrong;
// mod
try {

    $conexion_bd = new PDO("pgsql:host=$dbhost;port=$dbport;dbname=$dbdatabase", $dbuser, $dbpasswd);
    // 1. Conexión a la base de datos
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Calcular todas las Edades de los Pacientes
    $sql = "SELECT PUBLIC.calcular_todas_edades();";
    $stmt = $conexion_bd->prepare($sql);

    // 2. El Guardián: Verificar si el usuario envió el formulario
    if (isset($_POST['correo_usuario']) && !empty($_POST['clave_usuario'])) {

        $correo = trim($_POST['correo_usuario']);
        $clave = trim($_POST['clave_usuario']);

        // Buscamos al usuario incluyendo su estado de activación
        $sql = "SELECT id_usuario, nombre, contrasenia, id_rol, in_inactivo 
                FROM usuario 
                WHERE correo = :correo";
        $stmt = $conexion_bd->prepare($sql);
        $stmt->execute([':correo' => $correo]);
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        $trazabilidad = '';
        $trazabilidad = $trazabilidad . "INSERT INTO trazabilidad ";
        $trazabilidad = $trazabilidad . "(fecha_de_registro,evento,id_usuario,direccion_ip) ";
        $trazabilidad = $trazabilidad . "VALUES ('" . obtenerFechaHora() . "','LOGIN" . "','" . obtenerUsuario() . "', '" . obtenerIP() . "') ";
        $stmt = $conexion_bd->prepare($trazabilidad);
        $stmt->execute();

        // Comprobamos credenciales
        if ($usuario && $usuario['contrasenia'] === $clave) {

            // Validación de usuario activo
            if ((int) $usuario['in_inactivo'] !== 1) {
                $mensaje = "El usuario se encuentra inactivo en el sistema.";

                $trazabilidad = '';
                $trazabilidad = $trazabilidad . "INSERT INTO trazabilidad ";
                $trazabilidad = $trazabilidad . "(fecha_de_registro,evento,id_usuario,direccion_ip) ";
                $trazabilidad = $trazabilidad . "VALUES ('" . obtenerFechaHora() . "','LOGIN-USUARIO-INACTIVO','" . obtenerUsuario() . "', '" . obtenerIP() . "') ";
                $stmt = $conexion_bd->prepare($trazabilidad);
                $stmt->execute();

            } else {
                $_SESSION['id_usuario'] = $usuario['id_usuario'];
                $_SESSION['nombre_usuario'] = $usuario['nombre'];
                $_SESSION['id_rol'] = $usuario['id_rol'];
                $_SESSION['nombre_rol'] = MostrarRol($conexion_bd, $_SESSION['id_rol']);

                $trazabilidad = '';
                $trazabilidad = $trazabilidad . "INSERT INTO trazabilidad ";
                $trazabilidad = $trazabilidad . "(fecha_de_registro,evento,id_usuario,direccion_ip) ";
                $trazabilidad = $trazabilidad . "VALUES ('" . obtenerFechaHora() . "','LOGIN-USUARIO-INICIO-SESION','" . obtenerUsuario() . "', '" . obtenerIP() . "') ";
                $stmt = $conexion_bd->prepare($trazabilidad);
                $stmt->execute();

                // Redireccionar a la pantalla principal
                header("Location: pantallaPrincipal.php");
                exit;
            }
        } else {
            $mensaje = "Correo o contraseña incorrectos.";

            $trazabilidad = '';
            $trazabilidad = $trazabilidad . "INSERT INTO trazabilidad ";
            $trazabilidad = $trazabilidad . "(fecha_de_registro,evento,id_usuario,direccion_ip) ";
            $trazabilidad = $trazabilidad . "VALUES ('" . obtenerFechaHora() . "','LOGIN-USUARIO-DATOS-SESION','" . obtenerUsuario() . "', '" . obtenerIP() . "') ";

            $stmt = $conexion_bd->prepare($trazabilidad);
            $stmt->execute();

        }
    }// <-- Aquí faltaba cerrar el IF del POST

} catch (PDOException $e) {
    die("¡Error de conexión!: " . $e->getMessage());
}

// 3. Cargar y mostrar el Login
$tbs->LoadTemplate('login.html', 'UTF-8');

// Eliminé el MergeBlock de 'mostrar' porque ya no estamos listando usuarios aquí
// Si quieres mostrar un mensaje de error en el HTML, puedes usar MergeField
$tbs->Show();
?>