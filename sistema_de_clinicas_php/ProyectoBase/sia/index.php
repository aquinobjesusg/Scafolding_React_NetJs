<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/permisos_helper.php");
include ("include/portada.php");
include_once ('funcs/funcs.php');

$tbs = new clsTinyButStrong;
$tbs->LoadTemplate('login.html'); 

$mensaje = null;
$tipo_mensaje = 'danger'; 

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (isset($_POST['Aceptar'])) {
        $correo = $_POST['correo_usuario'] ?? '';
        $clave = $_POST['clave_usuario'] ?? ''; // Contraseña sin hashear (del formulario)
        $codigo = $_POST['codigo'] ?? '';

        // Validar campos vacíos
        if (empty($correo) || empty($clave) || empty($codigo)) {
            $mensaje = 'Los campos son obligatorios';
        } else {

            $codigoVerificacion = $_SESSION['codigo_verificacion'] ?? '';
            $captcha = sha1($codigo);
            
            if ($codigoVerificacion !== $captcha) {
                
                $mensaje = 'El código de verificación es incorrecto.';

             } else {

                // CAMBIO 1: Consulta SQL para obtener la clave hasheada y otros datos
                $sql = "SELECT id_usuario, correo_usuario, nom_usuario, super_admin, clave_usuario FROM usuario WHERE correo_usuario = :correo";
                $stmt = $conexion_bd->prepare($sql);
                $stmt->bindValue(':correo', $correo, PDO::PARAM_STR);
                $stmt->execute();
                $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

                // CAMBIO 2: Verificar la existencia del usuario Y la contraseña hasheada
                if ($usuario && password_verify($clave, $usuario['clave_usuario'])) {
                    // Login exitoso (se mantiene el resto de tu lógica)
                    
                    // Paso 1: Establecer variables básicas de sesión
                    $_SESSION['id_usuario'] = $usuario['id_usuario'];
                    $_SESSION['nom_usuario'] = $usuario['nom_usuario'];
                    $_SESSION['correo_usuario'] = $usuario['correo_usuario'];
                    $_SESSION['super_admin'] = ($usuario['super_admin'] === 't' || $usuario['super_admin'] === true); 

                    // ---------------------------------------------------------------
                    // --- NUEVA LÓGICA: OBTENER Y ESTABLECER ROL PRINCIPAL ---
                    // ---------------------------------------------------------------
                    $queryRolPrincipal = "
                        SELECT id_rol 
                        FROM usuario_modulo_rol 
                        WHERE id_usuario = :id_usuario
                        ORDER BY id_rol ASC 
                        LIMIT 1
                    ";
                    $stmtRol = $conexion_bd->prepare($queryRolPrincipal);
                    $stmtRol->execute([':id_usuario' => $usuario['id_usuario']]);
                    $id_rol_principal = $stmtRol->fetchColumn();

                    if ($id_rol_principal) {
                        $_SESSION['id_rol_principal_actual'] = $id_rol_principal;
                    } else {
            
                        $_SESSION['id_rol_principal_actual'] = null; 
                    }

                    // --- CARGA DE PERMISOS (Lógica de permisos no modificada) ---
                    $id_usuario = $usuario['id_usuario']; 
                    $es_super_admin = ($usuario['super_admin'] === 't' || $usuario['super_admin'] === true);

                    // ... [Lógica de carga de permisos] ... (Se omiten por espacio)
                    // ... [La lógica de carga de permisos es idéntica a tu código original] ...

                    if ($es_super_admin) {
                        // SUPER ADMIN: OBTENER TODOS LOS PERMISOS (código original)
                        $sql_todos_permisos = "
                            SELECT m.nom_modulo, p.nom_permiso
                            FROM modulo AS m CROSS JOIN permiso AS p
                            ORDER BY m.nom_modulo, p.nom_permiso;
                        ";
                        $stmt_permisos = $conexion_bd->prepare($sql_todos_permisos);
                        $stmt_permisos->execute();
                        $permisos_db = $stmt_permisos->fetchAll(PDO::FETCH_ASSOC);

                    } else {
                        // USUARIO NORMAL: PERMISOS POR ROL (código original)
                        $sql_permisos = "
                            SELECT m.nom_modulo, p.nom_permiso
                            FROM usuario_modulo_rol AS umr
                            JOIN modulo AS m ON umr.id_modulo = m.id_modulo
                            JOIN rol_permiso AS rp ON umr.id_rol = rp.id_rol
                            JOIN permiso AS p ON rp.id_permiso = p.id_permiso
                            WHERE umr.id_usuario = :id_usuario;
                        ";
                        $stmt_permisos = $conexion_bd->prepare($sql_permisos);
                        $stmt_permisos->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
                        $stmt_permisos->execute();
                        $permisos_db = $stmt_permisos->fetchAll(PDO::FETCH_ASSOC);
                    }

                    // Formatear y Almacenar la Matriz de Permisos (código original)
                    $permisos_usuario = [];
                    foreach ($permisos_db as $fila) {
                        $modulo = $fila['nom_modulo'];
                        $permiso = $fila['nom_permiso'];
                        
                        if (!isset($permisos_usuario[$modulo])) {
                            $permisos_usuario[$modulo] = [];
                        }
                        $permisos_usuario[$modulo][] = $permiso;
                    }

                    $_SESSION['permiso'] = $permisos_usuario;
                    
                    // --- REDIRECCIÓN (Lógica de redirección no modificada) ---
                    $destino = 'bienvenido.php'; 

                    if ($es_super_admin) {
                        $destino = 'bienvenido.php'; 
                    } elseif (isset($permisos_usuario['Almacén'])) {
                        $destino = 'recursoDisponible.php'; 
                    } elseif (isset($permisos_usuario['Bienes'])) {
                        $destino = 'bienesListado.php';
                    } elseif (isset($permisos_usuario['OTIC'])) {
                        $destino = 'consumiblesDisponible.php';
                    }
                    
                    redirect($destino);
                    exit;

                } else {
                  
                    $mensaje = 'Datos incorrectos. Inténtalo de nuevo.';
                }
            }
        }
    }
} catch (PDOException $e) {
    error_log("Error PDO en login: " . $e->getMessage());
    $mensaje = "Error de base de datos";
} catch (Exception $e) {
    error_log("Error general en login: " . $e->getMessage());
    $mensaje = "Error inesperado";
}

if ($mensaje !== null) {
    $tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
}

$tbs->Show();


exit;
?>