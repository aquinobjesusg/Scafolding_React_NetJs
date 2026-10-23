<?php 

include("include/header_php.php");


try {
    $conexion_bd = new PDO("pgsql:host=$dbhost;port=$dbport;dbname=$dbdatabase;user=$dbuser;password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
} catch (Exception $e) {
    die("Error de conexión: " . $e->getMessage());
}

$titular_datos = [
    'id_titular' => '',
    'cedula_titular' => '',
    'nombre_titular' => '',
    'apellido_titular' => ''
];

// =========================================================================
// BUSCADOR INTERNO POR CÉDULA DEL TITULAR
// =========================================================================
if (isset($_POST['buscar_titular'])) {
    $cedula_buscar = trim($_POST['cedula_buscar']);
    
    if (!empty($cedula_buscar)) {
        $sql_busca_ced = "SELECT id_titular, cedula_titular, nombre_titular, apellido_titular FROM titular WHERE cedula_titular = :cedula LIMIT 1";
        $stmt_b = $conexion_bd->prepare($sql_busca_ced);
        $stmt_b->execute([':cedula' => $cedula_buscar]);
        $resultado = $stmt_b->fetch(PDO::FETCH_ASSOC);
        
        if ($resultado) {
            $titular_datos = $resultado;
            $_SESSION['id_titular_actual'] = $resultado['id_titular'];
        } else {
            echo "<script>alert('Titular no encontrado. Verifique la cédula.');</script>";
        }
    }
}

// =========================================================================
// PROCESAR EL REGISTRO FINAL DEL BENEFICIARIO
// =========================================================================
if (isset($_POST['registrar'])) {
    try {
        $id_titular_hidden = $_SESSION['id_titular_actual'] ?? $_POST['id_titular_hidden'] ?? null;

        if (!$id_titular_hidden) {
            die("Error crítico: No se ha asociado ningún titular válido a este beneficiario.");
        }

        $fecha_registro_beneficiario          = $_POST['fecha_registro_beneficiario'] ?? date('Y-m-d');
        $fecha_nacimiento_beneficiario        = $_POST['fecha_nacimiento_beneficiario'] ?? '';
        $cedula_beneficiario                  = !empty($_POST['cedula_beneficiario']) ? $_POST['cedula_beneficiario'] : null;
        $nombre_beneficiario                  = $_POST['nombre_beneficiario'] ?? '';
        $apellido_beneficiario                = $_POST['apellido_beneficiario'] ?? '';
        $telefono_beneficiario                = !empty($_POST['telefono_beneficiario']) ? $_POST['telefono_beneficiario'] : null;
        $telefono2_beneficiario               = !empty($_POST['telefono2_beneficiario']) ? $_POST['telefono2_beneficiario'] : null;
        $direccion_corta_casa_beneficiario    = !empty($_POST['direccion_corta_casa_beneficiario ']) ? $_POST['direccion_corta_casa_beneficiario '] : null;
        $id_sexo                       = !empty($_POST['id_sexo']) ? $_POST['id_sexo'] : null;
        $id_estado                     = !empty($_POST['id_estado']) ? $_POST['id_estado'] : null;

        $id_nacionalidad               = !empty($_POST['id_nacionalidad']) ? $_POST['id_nacionalidad'] : null;

        $sql_insert = "INSERT INTO beneficiario (
                        fecha_registro_beneficiario, fecha_nacimiento_beneficiario, cedula_beneficiario, 
                        nombre_beneficiario, apellido_beneficiario, telefono_beneficiario, id_sexo, 
                        id_nacionalidad, id_titular
                       ) VALUES (
                        :f_reg, :f_nac, :ced, :nom, :ape, :tel, :sexo, :nac, :tit
                       )";

        $stmt_i = $conexion_bd->prepare($sql_insert);
        $stmt_i->execute([
            ':f_reg'   => $fecha_registro_beneficiario,
            ':f_nac'   => $fecha_nacimiento_beneficiario,
            ':ced'     => $cedula_beneficiario,
            ':nom'     => $nombre_beneficiario,
            ':ape'     => $apellido_beneficiario,
            ':tel'     => $telef_beneficiario,
            ':sexo'    => $id_sexo,
            ':nac'     => $id_nacionalidad,
            ':tit'     => $id_titular_hidden 
        ]);

        unset($_SESSION['id_titular_actual']);
        header("Location: pantallaPrincipal.php");
        exit;

    } catch (PDOException $e) {
        die("Error al insertar en la tabla beneficiario: " . $e->getMessage());
    }
}

// CARGA DE CATÁLOGOS CIVILES BÁSICOS
$sexo_data = $conexion_bd->query("SELECT id_sexo, sexo AS nombre_sexo FROM sexo ORDER BY id_sexo DESC")->fetchAll(PDO::FETCH_ASSOC);
$estado_data = $conexion_bd->query('SELECT id_estado_pais, nombre_estado_pais AS nombre_estado FROM "estado_venezuela" ORDER BY id_estado_pais DESC')->fetchAll(PDO::FETCH_ASSOC);

$nacionalidad_data = $conexion_bd->query("SELECT id_nacionalidad, nombre_nacionalidad FROM nacionalidad ORDER BY id_nacionalidad DESC")->fetchAll(PDO::FETCH_ASSOC);

$valor = null;
$mi_menu_html = MostrarMenu($conexion_bd,$valor);
$mi_footer_html = MostrarFooter($conexion_bd,$valor);


$tbs->LoadTemplate('perfilActualizar.html', 'UTF-8');
$tbs->MergeField('titular_b', $titular_datos);
$tbs->MergeBlock('sexo', $sexo_data);
$tbs->MergeBlock('id_estado', $estado_data);
$tbs->MergeBlock('nacionalidad', $nacionalidad_data);



$tbs->Show();
?>