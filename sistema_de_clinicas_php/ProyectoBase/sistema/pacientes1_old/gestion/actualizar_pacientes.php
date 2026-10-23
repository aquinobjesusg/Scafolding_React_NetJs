<?php
$mes = $_POST['mes'] ?? '';
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Personalizar manejo de errores
function customErrorHandler()
{
    // Redirigir o mostrar mensaje amigable
    header("Location: error.php");
    exit();
}
set_error_handler('customErrorHandler');
set_exception_handler('customErrorHandler');
// Registrar datos recibidos
file_put_contents('debug.log', date('Y-m-d H:i:s') . " - Datos recibidos:\n" . print_r($_POST, true) . "\n", FILE_APPEND);

// 1. Incluir conexión - RUTA CORREGIDA
$rutaConexion = realpath(__DIR__ . '/../../conexion/conexion.php');
if (!$rutaConexion) {
    die("Error: No se pudo encontrar conexion.php. Búsqueda en: " . __DIR__ . '/../../conexion/conexion.php');
}

require_once $rutaConexion;

// Verificar conexión
try {
    verificarConexion();
} catch (Exception $e) {
    error_log("Error de conexión en actualizar_pacientes: " . $e->getMessage());
    die("Error crítico: " . $e->getMessage());
}

// Verificar conexión
if (!isset($pdo)) {
    die("Error: Conexión a BD no establecida");
}

// 2. Validar método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: tabla_pacientes_mes.php?mes=" . urlencode($mes));

    exit();
}

// 3. Verificar existencia de tabla
try {
    $stmt = $pdo->query("SHOW TABLES LIKE 'pacientes'");
    if ($stmt->rowCount() === 0) {
        die("Error: La tabla pacientes no existe en la base de datos");
    }
} catch (PDOException $e) {
    $pdo->rollBack();
    $errorMsg = "Error en la base de datos: " . $e->getMessage();
    file_put_contents('debug.log', date('Y-m-d H:i:s') . " - $errorMsg\n", FILE_APPEND);
    header("Location: tabla_pacientes_mes.php?success=update&id=" . $_POST['txtID'] . "&mes=" . urlencode($_POST['mes']));
    exit();
} catch (Exception $e) {
    $pdo->rollBack();
    $errorMsg = "Error general: " . $e->getMessage();
    file_put_contents('debug.log', date('Y-m-d H:i:s') . " - $errorMsg\n", FILE_APPEND);
    header("Location: tabla_pacientes_mes.php?success=update&id=" . $_POST['txtID'] . "&mes=" . urlencode($_POST['mes']));
    exit();
}

// 4. Validar campos obligatorios
$camposRequeridos = [
    'txtID' => 'ID',
    'txtFecha' => 'Fecha de consulta',
    'txtEspecialidad' => 'Especialidad',
    'txtTitular' => 'Titular',
    'txtCedula_T' => 'Cedula Titular',
    'txtPaciente' => 'Paciente',
    'txtCedula_P' => 'Cedula Paciente',
    'txtFecha_de_nacimiento' => 'Fecha de nacimiento',
    'txtSexo' => 'Sexo',
    'txtEdad' => 'Edad',
    'txtDiagnostico' => 'Diagnostico',
    'txtTelefono' => 'Telefono',
   // 'txtUniversidad_ente' => 'Universidad_ente',
    'txtMotivo_consulta' => 'Motivo_consulta',
    'txtTraslados' => 'Traslados',
    'txtObservaciones' => 'Observaciones'
];

$errores = [];
foreach ($camposRequeridos as $campo => $nombre) {
    if (empty($_POST[$campo])) {
        $errores[] = "El campo $nombre es requerido";
    }
}

if (!empty($errores)) {
    $mes = $_POST['mes'] ?? '';
    header("Location: modificar_pacientes.php?ID=" . $_POST['txtID'] . "&mes=" . urlencode($mes) . "&error=" . urlencode(implode(', ', $errores)));
    exit();
}
// 5. Procesar actualización con transacción
try {
    $pdo->beginTransaction();

    $sql = "UPDATE pacientes SET 
        Fecha = :Fecha,
        Especialidad = :Especialidad,
        Titular = :Titular,
        Cedula_T = :Cedula_T,
        Paciente = :Paciente,
        Cedula_P = :Cedula_P,
        Fecha_de_nacimiento = :Fecha_de_nacimiento,
        Sexo = :Sexo,
        Edad = :Edad,
        Diagnostico = :Diagnostico,
        Telefono = :Telefono,
        Universidad_ente = :Universidad_ente,
        Motivo_consulta = :Motivo_consulta,
        Traslados = :Traslados,
        Observaciones = :Observaciones
        WHERE ID = :ID";

    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(':ID', $_POST['txtID']);
    $stmt->bindParam(':Fecha', $_POST['txtFecha']);
    $stmt->bindParam(':Especialidad', $_POST['txtEspecialidad']);
    $stmt->bindParam(':Titular', $_POST['txtTitular']);
    $stmt->bindParam(':Cedula_T', $_POST['txtCedula_T']);
    $stmt->bindParam(':Paciente', $_POST['txtPaciente']);
    $stmt->bindParam(':Cedula_P', $_POST['txtCedula_P']);
    $stmt->bindParam(':Fecha_de_nacimiento', $_POST['txtFecha_de_nacimiento']);
    $stmt->bindParam(':Sexo', $_POST['txtSexo']);
    $stmt->bindParam(':Edad', $_POST['txtEdad']);
    $stmt->bindParam(':Diagnostico', $_POST['txtDiagnostico']);
    $stmt->bindParam(':Telefono', $_POST['txtTelefono'] );
    $universidad_ente = !empty($_POST['txtUniversidad_ente']) ? $_POST['txtUniversidad_ente'] : null;
    $stmt->bindParam(':Universidad_ente', $universidad_ente);
    $stmt->bindParam(':Motivo_consulta', $_POST['txtMotivo_consulta'] );
    $stmt->bindParam(':Traslados', $_POST['txtTraslados'] );
    $stmt->bindParam(':Observaciones', $_POST['txtObservaciones'] );
    if ($stmt->execute()) {
        $pdo->commit();
        $mes = $_POST['mes'] ?? '';
        header("Location: tabla_pacientes_mes.php?mes=" . urlencode($mes));
        exit();
    } else {
        $error = "Error al actualizar el registro";
    }
} catch (PDOException $e) {
    $pdo->rollBack();
    $error = "Error en la base de datos";
    // Registrar error en log para administradores
    error_log($e->getMessage());
}

// Redirigir con mensaje de error si es necesario
if (!empty($error)) {
    header("Location: modificar_pacientes.php?ID=" . $_POST['txtID'] . "&mes=" . urlencode($_POST['mes']) . "&error=" . urlencode($error));
    exit();
}
?>