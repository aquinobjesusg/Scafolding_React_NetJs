<?php
session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");
include_once ('funcs/funcs.php');

if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) {
    header("Location: index.php?valor=0");
    exit;
}

// Asegúrate de usar la variable de sesión correcta
$id_usuario = $_SESSION['id_usuario']; 
$nombre = $_SESSION['nom_usuario'];
$correo = $_SESSION['correo_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;

// VERIFICACIÓN DE PERMISOS
if (!$super_admin && !verificar_permiso_rapido('Sistema', 'usuario_cambiar_password')) {
    header("Location: acceso_denegado.php");
    exit;
}
    $tbs = new clsTinyButStrong;
    $tbs->LoadTemplate('cambiarContrasenia.html','UTF-8');
        
    try
    {
    // Conexión a la base de datos sia
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        if(isset($_POST['Actualizar']))
        {

            // --- INICIO DE LA TRANSACCIÓN ---
            $conexion_bd->beginTransaction();

            $clave_actual = $_POST['clave_actual'];
            $nueva_clave = $_POST['nueva_clave'];
            $confirmar_clave = $_POST['confirmar_clave'];

            // 1. OBTENER EL HASH DE LA CONTRASEÑA ACTUAL DEL USUARIO
            $consultaHash = "SELECT clave_usuario FROM usuario WHERE id_usuario = :id_usuario";
            $stmtHash = $conexion_bd->prepare($consultaHash);
            $stmtHash->execute([':id_usuario' => $id_usuario]);
            $hash_actual_db = $stmtHash->fetchColumn();

            // Validación básica si se encontró el usuario
            if (!$hash_actual_db) {
                $conexion_bd->rollBack();
                $_SESSION['mensaje'] = "Error interno: Usuario no encontrado.";
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: cambiarContrasenia.php");
                exit();
            }

            // 2. VERIFICACIÓN DE CLAVE ACTUAL USANDO password_verify()
            // Esto compara la clave en texto plano ($clave_actual) contra el hash guardado ($hash_actual_db)
            if (!password_verify($clave_actual, $hash_actual_db)) {
                $_SESSION['mensaje'] = "La clave actual es incorrecta.";
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: cambiarContrasenia.php");
                exit();
            }

            // --- INICIO DE VALIDACIONES DE LA NUEVA CLAVE ---

            if (empty(trim($nueva_clave))) {
                $_SESSION['mensaje'] = "Debe escribir una nueva contraseña.";
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: cambiarContrasenia.php");
                exit(); 
                    
            } elseif (strlen($nueva_clave) < 8) {
                $_SESSION['mensaje'] = "La contraseña debe tener al menos 8 caracteres.";
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: cambiarContrasenia.php");
                exit(); 
                    
            } elseif ($nueva_clave !== $confirmar_clave) {
                $_SESSION['mensaje'] = "Las nuevas contraseñas no coinciden.";
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: cambiarContrasenia.php");
                exit(); 

            } else {
                
                // 3. HASHEAR LA NUEVA CONTRASEÑA ANTES DE GUARDAR
                $nueva_clave_hasheada = password_hash($nueva_clave, PASSWORD_DEFAULT);
                    
                $actualizarContraseña = "UPDATE usuario
                                            SET clave_usuario = :nueva_clave_hasheada
                                            WHERE id_usuario = :id_usuario";
                    
                $resultadoActualizarContraseña = $conexion_bd->prepare($actualizarContraseña);
                $resultadoActualizarContraseña->execute([
                    ':nueva_clave_hasheada' => $nueva_clave_hasheada, // Usar el hash
                    ':id_usuario' => $id_usuario // Usar $id_usuario
                ]);
                    
                $conexion_bd->commit();
                    
                $_SESSION['mensaje'] = 'Contraseña actualizada exitosamente.';
                $_SESSION['tipo_mensaje'] = 'success';
                header("Location: cambiarContrasenia.php");
                exit();
            }
        }

    } catch (Exception $e) {
        // En caso de error, se revierte la transacción
        if (isset($conexion_bd) && $conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado al actualizar contraseña: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en cambiarContrasenia.php (Exception): " . $e->getMessage());
        // Redirigir siempre para evitar doble envío de formulario
        header("Location: cambiarContrasenia.php"); 
        exit();
    }

    // --- RECUPERAR Y LIMPIAR MENSAJES DE SESIÓN PARA MOSTRAR EN EL FRONT-END ---
    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje']); // Limpiar el mensaje después de usarlo
    unset($_SESSION['tipo_mensaje']); // Limpiar el tipo de mensaje después de usarlo
            
    // Mostrar la plantilla
    $tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
    $tbs->Show();
    exit;
?>