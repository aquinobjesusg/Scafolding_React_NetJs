<?php
include("include/header_php.php");

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// Función para guardar o actualizar usuario (Incluye in_autoriza)
function guardarUsuario($conexion_bd, $datos)
{
    $id_usuario = !empty($datos['id_usuario']) ? $datos['id_usuario'] : null;
    $nombre = trim($datos['nombre']);
    $apellido = trim($datos['apellido']);
    $usuario = trim($datos['usuario']);
    $correo = trim($datos['correo']);
    $id_rol = $datos['id_rol'];
    $id_modulo = $datos['id_modulo'];
    
    // Capturamos el switch: si viene marcado es 1, de lo contrario 0
    $in_autoriza = isset($datos['in_autoriza']) ? 1 : 0;

    // Si escribes contraseña, tomamos tal cual lo que escribiste (máximo 20 caracteres)
    $contrasenia = !empty($datos['contrasenia']) ? substr(trim($datos['contrasenia']), 0, 20) : null;

    if ($id_usuario) {
        // --- EDICIÓN ---
        if ($contrasenia) {
            $sql = "UPDATE public.usuario 
                    SET nombre = :nombre, apellido = :apellido, usuario = :usuario, 
                        correo = :correo, id_rol = :id_rol, id_modulo = :id_modulo, 
                        contrasenia = :contrasenia, in_autoriza = :in_autoriza 
                    WHERE id_usuario = :id";
            $params = [
                ':nombre' => $nombre,
                ':apellido' => $apellido,
                ':usuario' => $usuario,
                ':correo' => $correo,
                ':id_rol' => $id_rol,
                ':id_modulo' => $id_modulo,
                ':contrasenia' => $contrasenia,
                ':in_autoriza' => $in_autoriza,
                ':id' => $id_usuario
            ];
        } else {
            $sql = "UPDATE public.usuario 
                    SET nombre = :nombre, apellido = :apellido, usuario = :usuario, 
                        correo = :correo, id_rol = :id_rol, id_modulo = :id_modulo, 
                        in_autoriza = :in_autoriza 
                    WHERE id_usuario = :id";
            $params = [
                ':nombre' => $nombre,
                ':apellido' => $apellido,
                ':usuario' => $usuario,
                ':correo' => $correo,
                ':id_rol' => $id_rol,
                ':id_modulo' => $id_modulo,
                ':in_autoriza' => $in_autoriza,
                ':id' => $id_usuario
            ];
        }
        $stmt = $conexion_bd->prepare($sql);
        $stmt->execute($params);

        if (function_exists('registrarTraza')) {
            registrarTraza($conexion_bd, 'Modificación', 'Usuarios', "Se editó el usuario $usuario (ID: $id_usuario)");
        }
    } else {
        // --- NUEVO REGISTRO ---
        $pass_final = $contrasenia ? $contrasenia : '123456';

        $sql = "INSERT INTO public.usuario (nombre, apellido, usuario, correo, id_rol, id_modulo, contrasenia, in_autoriza) 
                VALUES (:nombre, :apellido, :usuario, :correo, :id_rol, :id_modulo, :contrasenia, :in_autoriza)";

        $stmt = $conexion_bd->prepare($sql);
        $stmt->execute([
            ':nombre' => $nombre,
            ':apellido' => $apellido,
            ':usuario' => $usuario,
            ':correo' => $correo,
            ':id_rol' => $id_rol,
            ':id_modulo' => $id_modulo,
            ':contrasenia' => $pass_final,
            ':in_autoriza' => $in_autoriza
        ]);

        if (function_exists('registrarTraza')) {
            registrarTraza($conexion_bd, 'Inserción', 'Usuarios', "Se creó el nuevo usuario $usuario");
        }
    }
}

// 1. Procesamiento al hacer clic en Guardar
if (isset($_POST['guardar'])) {
    guardarUsuario($conexion_bd, $_POST);
    header("Location: listaUsuario.php");
    exit;
}

// 2. Determinar si es Edición o Nuevo Registro
$id_usuario = isset($_GET['id']) ? trim($_GET['id']) : null;
$accion_url = isset($_GET['accion']) ? strtolower(trim($_GET['accion'])) : '';
$accion = $accion_url !== '' ? $accion_url : ($id_usuario ? 'editar' : 'nuevo');

// Validar que realmente sea un número para evitar basura en la URL
if ($id_usuario !== null && !filter_var($id_usuario, FILTER_VALIDATE_INT)) {
    $id_usuario = null;
    $accion = 'nuevo';
}

// Definir variables de bloqueo para cuando la acción sea 'ver'
$es_modo_ver = ($accion === 'ver') ? 1 : 0;
$disabled_attr = $es_modo_ver ? 'disabled' : '';
$readonly_attr = $es_modo_ver ? 'readonly' : '';
if (isset($_GET['leer'])) {
   $es_modo_ver = true;
}

if ($id_usuario) {
    $stmt = $conexion_bd->prepare("SELECT * FROM public.usuario WHERE id_usuario = :id");
    $stmt->execute([':id' => $id_usuario]);
    $datos_db = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($datos_db) {
        $usuario_e = $datos_db;
        
        // Asignar checked si el switch está activado en la base de datos
        $usuario_e['in_autoriza_checked'] = (isset($usuario_e['in_autoriza']) && $usuario_e['in_autoriza'] == 1) ? 'checked' : '';
        
        if ($es_modo_ver) {
            $titulo_formulario = "Usuario"; 
        } else {
            $titulo_formulario = "Editar Usuario";
        }
        
    } else {
        // Si no se encuentra el ID
        $id_usuario = null;
        $accion = 'nuevo';
        $es_modo_ver = 0;
        $disabled_attr = '';
        $readonly_attr = '';
        $usuario_e = [
            'id_usuario' => '', 'nombre' => '', 'apellido' => '', 
            'usuario' => '', 'correo' => '', 'id_rol' => '', 'id_modulo' => '', 'in_autoriza' => 0
        ];
        $usuario_e['in_autoriza_checked'] = '';
        $titulo_formulario = "Registrar Nuevo Usuario";
    }
} else {
    // Modo Nuevo Registro asegurado
    $usuario_e = [
        'id_usuario' => '',
        'nombre' => '',
        'apellido' => '',
        'usuario' => '',
        'correo' => '',
        'id_rol' => '',
        'id_modulo' => '',
        'in_autoriza' => 0
    ];
    $usuario_e['in_autoriza_checked'] = '';
    $titulo_formulario = "Registrar Nuevo Usuario";
}

// 3. Cargar datos para las listas desplegables marcando la opción seleccionada
$roles = $conexion_bd->query("SELECT id_rol, nombre FROM public.rol ORDER BY id_rol")->fetchAll(PDO::FETCH_ASSOC);
foreach ($roles as &$r) {
    $r['selected'] = ($r['id_rol'] == $usuario_e['id_rol']) ? 'selected' : '';
}

$modulos = $conexion_bd->query("SELECT id_modulos, nombre_modulos FROM public.modulos ORDER BY id_modulos")->fetchAll(PDO::FETCH_ASSOC);
foreach ($modulos as &$m) {
    $id_mod_usr = $usuario_e['id_modulo'] ?? $usuario_e['id_modulos'] ?? '';
    $m['selected'] = ($m['id_modulos'] == $id_mod_usr) ? 'selected' : '';
}

// 4. Mostrar la vista
$valor = null;
$mi_menu_html = MostrarMenu($conexion_bd, $valor);
$mi_footer_html = MostrarFooter($conexion_bd, $valor);

$trazabilidad = '';
$trazabilidad = $trazabilidad . "INSERT INTO trazabilidad ";
$trazabilidad = $trazabilidad . "(fecha_de_registro,evento,id_usuario,direccion_ip) ";
$trazabilidad = $trazabilidad . "VALUES ('".obtenerFechaHora()."','USUARIO-".$titulo_formulario."','".obtenerUsuario()."', '".obtenerIP()."') ";

// Generación de botones
if ($es_modo_ver) {
    $botones_html = '<a href="listaUsuario.php" class="btn btn-secondary btn-rounded px-4">Regresar</a>';
} else {
    $botones_html = '<a href="listaUsuario.php" class="btn btn-outline-secondary btn-rounded px-4">Cancelar</a>
                     <button type="submit" name="guardar" class="btn btn-primary btn-rounded px-5">Guardar Usuario</button>';
}

$tbs->LoadTemplate('usuarioRegistro.html', 'UTF-8');

// Registrar variables en TBS
$tbs->VarRef['botones_html'] = $botones_html;
$tbs->VarRef['mi_menu_html'] = $mi_menu_html;
$tbs->VarRef['mi_footer_html'] = $mi_footer_html;
$tbs->VarRef['titulo_formulario'] = $titulo_formulario;
$tbs->VarRef['disabled'] = $disabled_attr;
$tbs->VarRef['readonly'] = $readonly_attr;

$tbs->MergeField('usuario_e', $usuario_e);
$tbs->MergeBlock('rol', $roles);
$tbs->MergeBlock('modulo', $modulos);

$tbs->Show();
?>