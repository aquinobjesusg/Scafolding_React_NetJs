<?php
include("include/header_php.php");

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}
//4. Procesamiento del Formulario (Inserción de Datos): solo se ejecuta cuando el usuario llene el formulario y haga clic en el botón de enviar
// Solo se ejecuta si el usuario hace clic en "Registrar Titular"
if (isset($_POST['registrar'])) {
    try {
        // 1. Capturar campos básicos limpios
        $fecha_nacimiento_titular      = $_POST['fecha_nacimiento_titular'] ?? '';
        $cedula_titular                = $_POST['cedula_titular'] ?? '';
        $nombre_titular                = $_POST['nombre_titular'] ?? '';
        $apellido_titular              = $_POST['apellido_titular'] ?? '';
        $telefono_titular              = $_POST['telefono_titular'] ?? '';
        $telefono2_titular             = $_POST['telefono2_titular'] ?? '';
        $correo_titular                = $_POST['correo_titular'] ?? '';
        $edad_titular                  = $_POST['edad_titular'] ?? '';
        $direccion_corta_casa_titular  = $_POST['direccion_corta_casa_titular'] ?? '';
        $id_sexo                       = !empty($_POST['id_sexo']) ? $_POST['id_sexo'] : null;
        $id_estado                     = !empty($_POST['id_estado']) ? $_POST['id_estado'] : null;
        $id_activo                     = !empty($_POST['id_activo']) ? $_POST['id_activo'] : null;
        $id_nacionalidad               = !empty($_POST['id_nacionalidad']) ? $_POST['id_nacionalidad'] : null;

//4.2: Lógica o Discriminación Inteligente de la Institución:El sistema diferencia si el titular pertenece a una Universidad ('U') o a un Ente público/Gubernamental ('E') mediante un botón de opción (Radio Button).
//
        $tipo_institucion = $_POST['tipo_institucion'] ?? 'U';

        if ($tipo_institucion === 'U') {
            $id_universidad       = !empty($_POST['id_universidad']) ? $_POST['id_universidad'] : null;
            $id_ente              = null;
            $id_direccion_general = null;
            $id_direccion_linea   = null;
            $id_coordinacion      = null;
        } else {
            $id_universidad       = null;
            $id_ente              = !empty($_POST['id_ente']) ? $_POST['id_ente'] : null;
            $id_direccion_general = !empty($_POST['id_direccion_general']) ? $_POST['id_direccion_general'] : null;
            $id_direccion_linea   = !empty($_POST['id_direccion_linea']) ? $_POST['id_direccion_linea'] : null;
            $id_coordinacion      = !empty($_POST['id_coordinacion']) ? $_POST['id_coordinacion'] : null;
        }

        // 3. Consulta SQL de Inserción preparada y ejecutada
        $titularInsert = "INSERT INTO titular (
                            fecha_nacimiento_titular, cedula_titular, 
                            nombre_titular, apellido_titular, telefono_titular,telefono2_titular,correo_titular,edad_titular,direccion_corta_casa_titular, id_sexo, id_estado,
                            id_universidad, id_ente, id_direccion_general, id_direccion_linea,id_activo, id_coordinacion, id_nacionalidad
                         ) VALUES (
                            :fecha_nacimiento_titular, :cedula_titular, 
                            :nombre_titular, :apellido_titular, :telefono_titular,:telefono2_titular, :correo_titular, :edad_titular, :direccion_corta_casa_titular, :id_sexo, :id_estado,
                            :id_universidad, :id_ente, :id_direccion_general, :id_direccion_linea, :id_activo,
                            :id_coordinacion, :id_nacionalidad
                         )";
        
        $resultadoTitularInsert = $conexion_bd->prepare($titularInsert);
        $resultadoTitularInsert->execute([
            'fecha_nacimiento_titular' => $fecha_nacimiento_titular,
            'cedula_titular'           => $cedula_titular,
            'nombre_titular'           => $nombre_titular,
            'apellido_titular'         => $apellido_titular,
            'telefono_titular'         => $telefono_titular,
            'telefono2_titular'        => $telefono2_titular,
            'correo_titular'           => $correo_titular,
            'edad_titular'             => $edad_titular,
            'direccion_corta_casa_titular' => $direccion_corta_casa_titular,
            'id_sexo'                  => $id_sexo,
            'id_estado'                => $id_estado,
            'id_universidad'           => $id_universidad,
            'id_ente'                  => $id_ente,
            'id_direccion_general'     => $id_direccion_general,
            'id_direccion_linea'       => $id_direccion_linea,
            'id_coordinacion'          => $id_coordinacion,
            'id_nacionalidad'          => $id_nacionalidad
        ]);

        // Redireccionar al listado principal tras un registro exitoso
        header("Location: cortesiaLista.php");
        exit;

    } catch (PDOException $e) {
        die("Error al registrar el titular: " . $e->getMessage());
    }
}

// 2. Determinar si es Edición o Nuevo Registro
$id = $_GET['id'] ?? null;

// Validar que realmente sea un número para evitar basura en la URL
if ($id !== null && !filter_var($id, FILTER_VALIDATE_INT)) {
    $id = null;
}

if (isset($id)) {
    echo "El Id es " . $id ;
}


if ($id) {
    $stmt = $conexion_bd->prepare("SELECT * FROM public.paciente WHERE id_titular = :id");
    $stmt->execute([':id' => $id]);
    $datos_db = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($datos_db) {
        $usuario_e = $datos_db;
        $titulo_formulario = "Editar Paciente de Cortesia";
    } else {
        // Si mandaron un ID por URL que no existe en la base de datos, forzamos modo nuevo
        $id = null;
        //limpiarCamposUsuario($usuario_e, $titulo_formulario);
    }
} else {
    // Modo Nuevo Registro asegurado
    // $usuario_e = [
    //     'id_usuario' => '',
    //     'nombre' => '',
    //     'apellido' => '',
    //     'usuario' => '',
    //     'correo' => '',
    //     'id_rol' => '',
    //     'id_modulo' => ''
    // ];
    // $titulo_formulario = "Registrar Nuevo Usuario";
}

// 3. Cargar datos para las listas desplegables marcando la opción seleccionada

// $roles = $conexion_bd->query("SELECT id_rol, nombre FROM public.rol ORDER BY id_rol")->fetchAll(PDO::FETCH_ASSOC);
// foreach ($roles as &$r) {
//     $r['selected'] = ($r['id_rol'] == $usuario_e['id_rol']) ? 'selected' : '';
// }

// $modulos = $conexion_bd->query("SELECT id_modulos, nombre_modulos FROM public.modulos ORDER BY id_modulos")->fetchAll(PDO::FETCH_ASSOC);
// foreach ($modulos as &$m) {
//     $id_mod_usr = $usuario_e['id_modulo'] ?? $usuario_e['id_modulos'] ?? '';
//     $m['selected'] = ($m['id_modulos'] == $id_mod_usr) ? 'selected' : '';
// }

// =========================================================================
// CARGAR LA PLANTILLA Y EJECUTAR CONSULTAS (BLOQUE ÚNICO OPTIMIZADO)
// =========================================================================
$valor = null;
$mi_menu_html = MostrarMenu($conexion_bd,$valor);
$mi_footer_html = MostrarFooter($conexion_bd,$valor);

// 1. CARGAR LA PLANTILLA PRIMERO (Buenas prácticas de TBS)
$tbs->LoadTemplate('cortesiaRegistro.html', 'UTF-8');

// 2. EJECUTAR CONSULTAS Y EXTRAER DATOS REALES CON ALIAS CLAROS
$sexo_data = SelectFrom($conexion_bd,"SELECT id_sexo, sexo AS nombre_sexo FROM sexo ORDER BY id_sexo DESC");
// Usamos "sexo AS nombre_sexo" para que mapee correctamente con tu bloque HTML
//$sexo_data = $conexion_bd->query("SELECT id_sexo, sexo AS nombre_sexo FROM sexo ORDER BY id_sexo DESC")->fetchAll(PDO::FETCH_ASSOC);
foreach ($sexo_data as &$r) {
    $r['selected'] = ($r['id_sexo'] == $usuario_e['id_sexo']) ? 'selected' : '';
}


// Consulta corregida con comillas simples externas y comillas dobles en el nombre de la tabla para respetar la 'V' mayúscula
$estado_data = $conexion_bd->query('SELECT id_estado_pais, nombre_estado_pais AS nombre_estado FROM "estado_venezuela" ORDER BY id_estado_pais DESC')->fetchAll(PDO::FETCH_ASSOC);
foreach ($estado_data as &$e) {
    $e['selected'] = ($e['id_estado_pais'] == $usuario_e['id_estado']) ? 'selected' : '';
}

$nacionalidad_data = $conexion_bd->query("SELECT id_nacionalidad, nombre_nacionalidad FROM nacionalidad ORDER BY id_nacionalidad DESC")->fetchAll(PDO::FETCH_ASSOC);
foreach ($nacionalidad_data as &$n) {
    $n['selected'] = ($n['id_nacionalidad'] == $usuario_e['id_nacionalidad']) ? 'selected' : '';
}

// 3. FUSIONAR LOS ARREGLOS CON LOS BLOQUES DEFINIDOS EN TU HTML
$tbs->MergeBlock('sexo', $sexo_data);
$tbs->MergeBlock('id_estado', $estado_data);
$tbs->MergeField('usuario_e', $usuario_e);

$tbs->MergeBlock('nacionalidad', $nacionalidad_data);




// 4. MOSTRAR LA PANTALLA RELLENA
$tbs->Show();
?>