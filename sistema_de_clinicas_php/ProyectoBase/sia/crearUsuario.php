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

$usuario = $_SESSION['id_usuario'];
$nombre = $_SESSION['nom_usuario'];
$correo = $_SESSION['correo_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;

// VERIFICACIÓN DE PERMISOS
if (!$super_admin && !verificar_permiso_rapido('Sistema', 'crear_usuario')) {
    header("Location: acceso_denegado.php");
    exit;
}

    define('ID_MODULO_SISTEMA', 4); // El ID real de 'Sistema'
    define('ID_ROL_ESTANDAR', 6);
    $tbs = new clsTinyButStrong;
    $tbs->LoadTemplate('crearUsuario.html','UTF-8');
     // Asegurar que la variable está definida
    
    try
    {
        // Conexión a la base de datos PostgreSQL
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // --- LÓGICA DE CARGA DE MÓDULOS CON TBS ---
        $sql_modulos = "SELECT * FROM modulo 
                        WHERE id_modulo NOT IN (4, 5) 
                        ORDER BY nom_modulo;";
        $stmt_modulos = $conexion_bd->prepare($sql_modulos);
        $stmt_modulos->execute();
        $data_modulos = $stmt_modulos->fetchAll(PDO::FETCH_ASSOC);
        $tbs->MergeBlock('mod', $data_modulos);

        
        if(isset($_POST['Registrar']))
        {
            // --- CAPTURA DE LAS CLAVES (CONTRASEÑA Y CONFIRMACIÓN) ---
            $clave = $_POST['clave_usuario'];
            $clave_confirmacion = $_POST['confirmar_clave_usuario'] ?? ''; 

            // --- INICIO DE LA TRANSACCIÓN ---
            $conexion_bd->beginTransaction();

            // --- VALIDACIÓN DEL FORMULARIO ---
            $errors = []; 
            if (empty($_POST['nom_usuario'])) $errors[] = 'El nombre de usuario es obligatorio.';
            if (empty($_POST['ape_usuario'])) $errors[] = 'El apellido de usuario es obligatorio.';
            if (empty($_POST['correo_usuario'])) $errors[] = 'El correo electrónico es obligatorio.';
            if (empty($clave)) $errors[] = 'La contraseña es obligatoria.';
            if (empty($clave_confirmacion)) $errors[] = 'Debe confirmar la contraseña.';
            if (empty($_POST['rol_usuario'])) $errors[] = 'El rol de usuario es obligatorio.'; 
            if (empty($_POST['id_modulo_principal'])) $errors[] = 'El módulo principal es obligatorio.';
            
            if (!filter_var($_POST['correo_usuario'], FILTER_VALIDATE_EMAIL)) {
                $errors[] = 'El formato del correo electrónico es inválido.';
            }

       
            if ($clave !== $clave_confirmacion) {
                $errors[] = 'La contraseña y la confirmación no coinciden.';
            }
    

            if (strlen($clave) < 8) {
                $errors[] = 'La contraseña debe tener al menos 8 caracteres.';
            }
            if (!preg_match('/[A-Z]/', $clave)) {
                $errors[] = 'La contraseña debe contener al menos una letra mayúscula.';
            }
            if (!preg_match('/[0-9]/', $clave)) {
                $errors[] = 'La contraseña debe contener al menos un número.';
            }



            if (count($errors) === 0) {
                
                // HASHEAR LA CONTRASEÑA
              
                $clave_hasheada = password_hash($clave, PASSWORD_DEFAULT);
                //Primer insert
                $camposUsuario = "nom_usuario, ape_usuario, correo_usuario, clave_usuario";
                $usuarioInsert = "INSERT INTO usuario ($camposUsuario) 
                                     VALUES (:nom_usuario, :ape_usuario, :correo_usuario, :clave_usuario) 
                                     RETURNING id_usuario";
                
                $resultadoUsuarioInsert = $conexion_bd->prepare($usuarioInsert);
                $resultadoUsuarioInsert->execute([
                    ':nom_usuario' => $_POST['nom_usuario'],
                    ':ape_usuario' => $_POST['ape_usuario'],
                    ':correo_usuario' => $_POST['correo_usuario'],
                    ':clave_usuario' => $clave_hasheada, 

                ]);
                
                // Obtener el ID del usuario recién creado
                $id_usuario_nuevo = $resultadoUsuarioInsert->fetchColumn(); 

                // Segundo insert, modulo y rol
                $id_modulo_seleccionado = $_POST['id_modulo_principal'];
                $id_rol_seleccionado = $_POST['rol_usuario']; 

                $sql_umr = "INSERT INTO usuario_modulo_rol (id_rol, id_usuario, id_modulo) 
                            VALUES (:id_rol, :id_usuario, :id_modulo)";
                $stmt_umr = $conexion_bd->prepare($sql_umr);
                $stmt_umr->execute([
                    ':id_rol' => $id_rol_seleccionado,
                    ':id_usuario' => $id_usuario_nuevo,
                    ':id_modulo' => $id_modulo_seleccionado
                ]);

                // 3. ASIGNACIÓN AUTOMÁTICA DEL MÓDULO 'SISTEMA' / ROL 'ESTÁNDAR'
                
                if ((int)$id_modulo_seleccionado !== ID_MODULO_SISTEMA) {
                    $stmt_umr->execute([
                        ':id_rol' => ID_ROL_ESTANDAR, // Rol "Usuario Estándar"
                        ':id_usuario' => $id_usuario_nuevo,
                        ':id_modulo' => ID_MODULO_SISTEMA // Módulo "Sistema"
                    ]);
                }


                $conexion_bd->commit();
                // --- FIN DE LA TRANSACCIÓN ---

                $_SESSION['mensaje'] = 'Usuario registrado exitosamente.';
                $_SESSION['tipo_mensaje'] = 'success';
                header("Location: crearUsuario.php");
                exit();

            } else {
                // Si hay errores de validación, se revierte la transacción si se inició
                if ($conexion_bd->inTransaction()) {
                    $conexion_bd->rollBack();
                }
                $_SESSION['mensaje'] = implode('<br>', $errors);
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: crearUsuario.php");
                exit();
            }
        }

    } catch (PDOException $e) {
        // Manejo de errores de la base de datos (y ROLLBACK)
        if ($conexion_bd && $conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error de la base de datos: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en crearUsuario.php (PDOException): " . $e->getMessage());
        header("Location: crearUsuario.php");
        exit();

    } catch (Exception $e) {
        // Captura cualquier otra excepción
        if ($conexion_bd && $conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en crearUsuario.php (Exception): " . $e->getMessage());
        header("Location: crearUsuario.php");
        exit();
    }

    // --- VISUALIZACIÓN ---
    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje']);
    unset($_SESSION['tipo_mensaje']);

    $tbs->MergeBlock('msj', [['mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje]]);
    $tbs->Show();
    exit;