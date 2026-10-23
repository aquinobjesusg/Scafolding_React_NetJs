<?php
include("include/header_php.php");

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// 1. PROCESAR ACTUALIZACIÓN (Al presionar Guardar Cambios)
if (isset($_POST['actualizar_titular'])) {
    try {
        // Capturar ID del titular a modificar
        $id_titular = !empty($_POST['id_titular']) ? $_POST['id_titular'] : null;

        if (!$id_titular) {
            die("Error: No se recibió el identificador del titular para actualizar.");
        }

        // Capturar datos básicos limpios
        $fecha_nacimiento_titular = $_POST['fecha_nacimiento_titular'] ?? '';
        $cedula_titular           = $_POST['cedula_titular'] ?? '';
        $nombre_titular           = $_POST['nombre_titular'] ?? '';
        $apellido_titular         = $_POST['apellido_titular'] ?? '';
        $telefono_titular         = $_POST['telefono_titular'] ?? '';
        $id_sexo                  = !empty($_POST['id_sexo']) ? $_POST['id_sexo'] : null;
        $id_nacionalidad          = !empty($_POST['id_nacionalidad']) ? $_POST['id_nacionalidad'] : null;
        
        // Lógica de discriminación según Radio Button
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

        // Consulta SQL estructurada para PostgreSQL
        $sqlUpd = "UPDATE titular SET 
                    fecha_nacimiento_titular = :fnt,
                    cedula_titular = :ct,
                    nombre_titular = :nom, 
                    apellido_titular = :ape,
                    telefono_titular = :tt,
                    id_sexo = :sex,
                    id_universidad = :uni,
                    id_ente = :ente,
                    id_direccion_general = :diregen,
                    id_direccion_linea = :direlin,
                    id_coordinacion = :coor,
                    id_nacionalidad = :nac
                  WHERE id_titular = :id";

        $stmt = $conexion_bd->prepare($sqlUpd);
        $stmt->execute([
            ':fnt'     => $fecha_nacimiento_titular,
            ':ct'      => $cedula_titular,
            ':nom'     => $nombre_titular,
            ':ape'     => $apellido_titular,
            ':tt'      => $telefono_titular,
            ':sex'     => $id_sexo,
            ':uni'     => $id_universidad,
            ':ente'    => $id_ente,
            ':diregen' => $id_direccion_general,
            ':direlin' => $id_direccion_linea,
            ':coor'    => $id_coordinacion,
            ':nac'     => $id_nacionalidad,
            ':id'      => $id_titular
        ]);

        header("Location: titularLista.php");
        exit;

    } catch (PDOException $e) {
        die("Error crítico al actualizar: " . $e->getMessage());
    }
}

// 2. MOSTRAR EL FORMULARIO (Cuando viene del listado mediante POST)
if (isset($_POST['id_titular_edit'])) {
    $id = $_POST['id_titular_edit'];

    // Buscar información actual del Titular
    $stmt = $conexion_bd->prepare("SELECT * FROM titular WHERE id_titular = :id");
    $stmt->execute([':id' => $id]);
    $titular = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$titular) {
        die("Titular no encontrado en la base de datos.");
    }

    // Consultas maestras para cargar los catálogos en los selects
    $sexo = $conexion_bd->query("SELECT id_sexo, sexo FROM sexo ORDER BY id_sexo DESC")->fetchAll(PDO::FETCH_ASSOC);
    $universidad = $conexion_bd->query("SELECT id_universidad, nombre_universidad FROM universidad ORDER BY id_universidad DESC")->fetchAll(PDO::FETCH_ASSOC);
    $entes = $conexion_bd->query("SELECT id_ente, nom_ente AS nombre_ente FROM ente ORDER BY id_ente DESC")->fetchAll(PDO::FETCH_ASSOC);
    $direccion_general = $conexion_bd->query("SELECT id_direccion_general, nom_direccion_general AS nombre_direccion_general FROM direccion_general")->fetchAll(PDO::FETCH_ASSOC);
    $direccion_linea = $conexion_bd->query("SELECT id_direccion_linea, nom_direccion_linea AS nombre_direccion_linea FROM direccion_linea")->fetchAll(PDO::FETCH_ASSOC);
    $coordinacion = $conexion_bd->query("SELECT id_coordinacion, nom_coordinacion AS nombre_coordinacion FROM coordinacion")->fetchAll(PDO::FETCH_ASSOC);
    $nacionalidad = $conexion_bd->query("SELECT id_nacionalidad, nombre_nacionalidad FROM nacionalidad ORDER BY id_nacionalidad DESC")->fetchAll(PDO::FETCH_ASSOC);

    $valor = null;
$mi_menu_html = MostrarMenu($conexion_bd,$valor);
$mi_footer_html = MostrarFooter($conexion_bd,$valor);

    // Renderizado e inyección de datos con TinyButStrong
    $tbs->LoadTemplate('titularEditar.html', 'UTF-8');
    $tbs->MergeField('titular', $titular);
    $tbs->MergeBlock('sexo_opt', $sexo);
    $tbs->MergeBlock('universidad_opt', $universidad);
    $tbs->MergeBlock('ente_opt', $entes);
    $tbs->MergeBlock('dg_opt', $direccion_general);
    $tbs->MergeBlock('dl_opt', $direccion_linea);
    $tbs->MergeBlock('coor_opt', $coordinacion);
    $tbs->MergeBlock('nacionalidad_opt', $nacionalidad);

    $tbs->Show();
} else {
    header("Location: titularLista.php");
    exit;
}
?>











