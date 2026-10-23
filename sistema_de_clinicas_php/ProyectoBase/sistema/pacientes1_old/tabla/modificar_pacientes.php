<?php
// Configuración mejorada de errores
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function customErrorHandler($errno, $errstr, $errfile, $errline) {
    $error_message = "Error [$errno]: $errstr en $errfile línea $errline";
    header("Location: error.php?msg=" . urlencode($error_message));
    exit();
}

function customExceptionHandler($exception) {
    $error_message = "Excepción: " . $exception->getMessage() . " en " . $exception->getFile() . " línea " . $exception->getLine();
    header("Location: error.php?msg=" . urlencode($error_message));
    exit();
}

set_error_handler('customErrorHandler');
set_exception_handler('customExceptionHandler');

// Agregar después de obtener $idPaciente:
$mes = isset($_GET['mes']) ? $_GET['mes'] : null;

// Verificación de accesor
file_put_contents(
    'debug_modificar.log',
    date('Y-m-d H:i:s') . " - Acceso a modificar_pacientes.php\n" .
    "ID: " . ($_GET['ID'] ?? 'NULL') . "\n" .
    "MES: " . ($mes ?? 'NULL') . "\n",
    FILE_APPEND
);

header('Content-Type: text/html; charset=utf-8');

// CORREGIR RUTA DE CONEXIÓN (usando ruta relativa correcta)
require_once __DIR__ . '/../../conexion/conexion.php';

if (!isset($pdo)) {  // Corregido $pdo (sin cero)
    die("Error: Conexión no establecida");
}

$error = '';

// 1. Obtener ID del paciente a editar
$idPaciente = isset($_GET['ID']) ? (int) $_GET['ID'] : 0;

if (!$idPaciente) {
    die("Error: ID de paciente no especificado");
}

// 2. Cargar datos del paciente
try {
    $sql = "SELECT * FROM pacientes WHERE ID = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$idPaciente]);
    $paciente = $stmt->fetch(PDO::FETCH_ASSOC); 

    if (!$paciente) {
        die("Paciente no encontrado con ID: $idPaciente");
    }

    // Asignar a variables
    $txtID = $paciente['ID'];
    $txtFecha = $paciente['Fecha'];
    $txtEspecialidad = $paciente['Especialidad'];
    $txtTitular = $paciente['Titular'];
    $txtCedula_T = $paciente['Cedula_T'];
    $txtPaciente = $paciente['Paciente'];
    $txtCedula_P = $paciente['Cedula_P'];
    $txtFecha_de_nacimiento = $paciente['Fecha_de_nacimiento'];
    $txtSexo = $paciente['Sexo'];
    $txtEdad = $paciente['Edad'];
    $txtDiagnostico = $paciente['Diagnostico'];
    $txtTelefono = $paciente['Telefono'];
    $txtUniversidad_ente = $paciente['Universidad_ente'];
    $txtMotivo_consulta = $paciente['Motivo_consulta'];
    $txtTraslados = $paciente['Traslados'];
    $txtObservaciones = $paciente['Observaciones'];

} catch (PDOException $e) {
    die("Error al cargar paciente: " . $e->getMessage());
}

// 3. Definir opciones para menús desplegables
$opcionesEspecialidades = [
    'Enfermería',
    'Medicina General',
    'Medicina Interna',
    'Pediatría',
    'Oncología',
    'Fisioterapia',
    'Psicología'
];

$opcionesUniversidadesEntes = array_map('trim', [
    'Cortesía',
    'OPSU - Servicio Autónomo Oficinas Técnicas del Consejo Nacional de Universidades',
    ' MPPEU - Ministerio del Poder Popular para la Educacion Universitario',
    'CIM - Fundación Centro Internacional Miranda',
    'ELAM -	Fundación Dr. Salvador Allende (Antes Fundación Alejandro Próspero Reverend)',
    'FUNDAYACUCHO - Fundación Gran Mariscal de Ayacucho',
    'FMS - Fundación Misión Sucre',
    'FAMES - Fundación para el Servicio de Asistencia Médica Hospitalaria para Estudiantes de Educación Superior',
    'FUVIDIT - Fundacion Venezolana de Investigacion Desarrollo e Innovacion Transporte',
    'IALA -	Instituto Universitario Latinoamericano de Agroecología Paulo Freire',
    'UBTJR - Universidad Bolivariana de Trabajadores Jesús Rivero',
    'UBV - Universidad Bolivariana de Venezuela',
    'UCVAG - Universidad Campesina de Venezuela Argimiro Gabaldon',
    'UCV - Universidad Central de Venezuela',
    'UCLA - Universidad Centroccidental Lisandro Alvarado',
    'UC - Universidad de Carabobo',
    'UCS - Universidad De Las Ciencias De La Salud Hugo Chávez Frías',
    'ULA - Universidad de Los Andes',
    'UDO - Universidad de Oriente',
    'LUZ - Universidad del Zulia',
    'UDS - Universidad Deportiva del Sur',
    'UICOM - Universidad Internacional de las Comunicaciones',
    'UNA - Universidad Nacional Abierta',
    'UNATUR - Universidad Nacional del Turismo',
    'UNEG -	Universidad Nacional Experimental de Guayana',
    'UNEXCA - Universidad Nacional Experimental de la Gran Caracas',
    'UNELMLK - Universidad Nacional Experimental de Lara Martin  Luther King',
    'UNEARTE - Universidad Nacional Experimental de Las Artes',
    'UNETI - Universidad Nacional Experimental de las Telecomunicaciones e Informática',
    'UNERG - Universidad Nacional Experimental de los Llanos Centrales Rómulo Gallegos',
    'UNELLEZ - Universidad Nacional Experimental de los Llanos Occidentales Ezequiel Zamora',
    'UNET - Universidad Nacional Experimental del Táchira',
    'UNETRANS - Universidad Nacional Experimental del Transporte',
    'UNEY - Universidad Nacional Experimental del Yaracuy',
    'UNEFM - Universidad Nacional Experimental Francisco Miranda',
    'UNEIT - Universidad Nacional Experimental Indigena Del Tauca',
    'UMC - Universidad Nacional Experimental Marítima  del Caribe',
    'UNEXPO - Universidad Nacional Experimental Politecnica Antonio Jose de Sucre',
    'UNEFA - Universidad Nacional Experimental Politecnica de las Fuerza Armada Nacional',
    'UNERMB - Universidad Nacional Experimental Rafael Maria Baralt',
    'USB - Universidad Nacional Experimental Simón Bolívar',
    'UNESR - Universidad Nacional Experimental Simón Rodríguez',
    'UNESUR - Universidad Nacional Experimental Sur del Lago Jesus Maria Semprum',
    'UPEL - Universidad Pedagógica Experimental Libertador',
    'UPTAT - Universidad Politécnica Territorial Agroindustrial del Estado Táchira',
    'UPTBAL - Universidad Politécnica Territorial de Barlovento Argelia Laya',
    'UPTMS - Universidad Politécnica Territorial de Caracas Mariscal Sucre',
    'UPTFAG - Universidad Politécnica Territorial de Falcón Alonso Gamero',
    'UPTAMCA - Universidad Politécnica Territorial de los Altos Mirandinos Cecilio Acosta',
    'UPTLLJR - Universidad Politécnica territorial de los Llanos Juana Ramirez',
    'UPTM - Universidad Politécnica Territorial de Maracaibo',
    'UPTP -	Universidad Politécnica Territorial de Paria Luis Mariano Rivera',
    'UPTPC - Universidad Politécnica Territorial de Puerto Cabello',
    'UPTV -	Universidad Politécnica Territorial de Valencia',
    'UPTYAB - Universidad Politécnica Territorial de Yaracuy Aristides Bastidas',
    'UPTA - Universidad Politécnica Territorial del Alto Apure Pedro Camejo',
    'UPTAFBF - Universidad Politécnica Territorial Del Estado Aragua Federico Brito Figueroa',
    'UPT BARINAS - Universidad Politécnica Territorial del Estado Barinas José Félix Ribas',
    'UPT BOLIVAR - Universidad Politécnica Territorial del Estado Bolívar',
    'UPTAEB - Universidad Politécnica Territorial del Estado Lara Andrés Eloy Blanco',
    'UPTMKR - Universidad Politécnica Territorial del Estado Mérida Kleber Ramirez',
    'UPT Portuguesa - Universidad Politécnica Territorial del Estado Portuguesa Juan de Jesús Montilla',
    'UPTTMBI - Universidad Politécnica Territorial del Estado Trujillo Mario Briceño Iragorry',
    'UPT - Norte Monagas Universidad Politécnica Territorial del Norte de Monagas Ludovico Silva',
    'UPT TACHIRA -	Universidad Politécnica Territorial del Norte del Táchira Manuela Sáenz',
    'UPT Clodosbaldo Russian - Universidad Politécnica Territorial del Oeste de Sucre Clodosbaldo Russian',
    'UPTZ -	Universidad Politécnica Territorial del Zulia',
    'UPTJAA - Universidad Politécnica Territorial Jose Antonio Anzoategui',
    'UPTVT - Universidad Politécnica Territorial Valles del Tuy',
    'UPAFV - Universidad Popular del Ambiente Fruto Vivas',
    'UTDFT - Universidad Territorial Deltaica Francisco Tamayo'
]);
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Editar Paciente <?= htmlspecialchars($txtTitular) ?></title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        body {
            background-color: rgb(33, 97, 162);
            color: white;
            padding: 20px;
        }

        .edit-box {
            background-color: white;
            color: #333;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            padding: 25px;
            margin: 20px auto;
        }

        .edit-title {
            color: #115191;
            border-bottom: 2px solid #115191;
            padding-bottom: 15px;
            margin-bottom: 25px;
            text-align: center;
        }

        .btn-submit {
            background: linear-gradient(to bottom, #28a745, #218838);
            color: white;
            font-weight: bold;
            padding: 10px 25px;
            border: none;
            transition: all 0.3s;
        }

        .btn-submit:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
    </style>
</head>

<body>
    <div class="container">
        <?php if ($error): ?>
            <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <div class="d-flex justify-content-between mb-4 mt-3">
            <a href="javascript:history.back()" class="btn btn-light">
                <i class="fas fa-arrow-left"></i> Volver
            </a>
            <div></div> <!-- Espaciador -->
        </div>

        <div class="edit-box">
            <h3 class="edit-title">
                <i class="fas fa-edit"></i> Editar Titular: <?= htmlspecialchars($txtTitular) ?>
            </h3>
            <form action="../gestion/actualizar_pacientes.php" method="post">
    <input type="hidden" name="txtID" value="<?= $txtID ?>">
                <?php if ($mes): ?>
                    <input type="hidden" name="mes" value="<?= htmlspecialchars($mes) ?>">
                <?php endif; ?>


                    

                <div class="form-group">
                   <label for="txtFecha">Fecha:</label>
                       <input type="date" class="form-control" name="txtFecha" id="txtFecha" 
                           value="<?= htmlspecialchars($txtFecha) ?>" required>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="txtEspecialidad">Especialidad:</label>
                            <select class="form-control" name="txtEspecialidad" id="txtEspecialidad" required>
                                <option value="">Seleccionar...</option>
                                <?php foreach ($opcionesEspecialidades as $especialidad): ?>
                                    <option value="<?= $especialidad ?>" <?= ($txtEspecialidad == $especialidad) ? 'selected' : '' ?>>
                                        <?= $especialidad ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="txtTitular">Titular:</label>
                            <input type="text" class="form-control" name="txtTitular" id="txtTitular"
                                value="<?= htmlspecialchars($txtTitular) ?>" required>
                        </div>

                        <div class="form-group">
                            <label for="txtCedula_T">Cédula Titular:</label>
                            <input type="text" class="form-control" name="txtCedula_T" id="txtCedula_T"
                                value="<?= htmlspecialchars($txtCedula_T) ?>" required>
                        </div>

                        <div class="form-group">
                            <label for="txtPaciente">Paciente:</label>
                            <input type="text" class="form-control" name="txtPaciente" id="txtPaciente"
                                value="<?= htmlspecialchars($txtPaciente) ?>" required>
                        </div>

                        <div class="form-group">
                            <label for="txtCedula_P">Cédula Paciente:</label>
                            <input type="text" class="form-control" name="txtCedula_P" id="txtCedula_P"
                                value="<?= htmlspecialchars($txtCedula_P) ?>" required>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="txtFecha_de_nacimiento">Fecha de Nacimiento:</label>
                            <input type="date" class="form-control" name="txtFecha_de_nacimiento"
                                id="txtFecha_de_nacimiento" value="<?= htmlspecialchars($txtFecha_de_nacimiento) ?>"
                                required>
                        </div>

                        <div class="form-group">
                            <label for="txtSexo">Sexo:</label>
                            <select class="form-control" name="txtSexo" id="txtSexo" required>
                                <option value="">Seleccionar...</option>
                                <option value="Masculino" <?= ($txtSexo == 'Masculino') ? 'selected' : '' ?>>Masculino
                                </option>
                                <option value="Femenino" <?= ($txtSexo == 'Femenino') ? 'selected' : '' ?>>Femenino
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="txtEdad">Edad:</label>
                            <input type="number" class="form-control" name="txtEdad" id="txtEdad"
                                value="<?= htmlspecialchars($txtEdad) ?>" required>
                        </div>

                        <div class="form-group">
                            <label for="txtDiagnostico">Diagnóstico:</label>
                            <input type="text" class="form-control" name="txtDiagnostico" id="txtDiagnostico"
                                value="<?= htmlspecialchars($txtDiagnostico) ?>" required>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="txtTelefono">Teléfono:</label>
                            <input type="tel" class="form-control" name="txtTelefono" id="txtTelefono"
                                value="<?= htmlspecialchars($txtTelefono) ?>">
                        </div>

                        <div class="form-group">
                            <label for="txtUniversidad_ente">Universidad/Ente:</label>
                            <select class="form-control" name="txtUniversidad_ente" id="txtUniversidad_ente">
                                <option value="">Seleccionar...</option>
                                <?php foreach ($opcionesUniversidadesEntes as $ente): ?>
                                    <option value="<?= $ente ?>" <?= (trim($txtUniversidad_ente) == trim($ente)) ? 'selected' : '' ?>>

                                        <?= $ente ?>
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="txtMotivo_consulta">Motivo de Consulta:</label>
                            <input type="text" class="form-control" name="txtMotivo_consulta" id="txtMotivo_consulta"
                                value="<?= htmlspecialchars($txtMotivo_consulta) ?>">
                        </div>

                        <div class="form-group">
                            <label for="txtTraslados">Traslados:</label>
                            <input type="text" class="form-control" name="txtTraslados" id="txtTraslados"
                                value="<?= htmlspecialchars($txtTraslados) ?>">
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="txtObservaciones">Observaciones:</label>
                    <textarea class="form-control" name="txtObservaciones" id="txtObservaciones"
                        rows="3"><?= htmlspecialchars($txtObservaciones) ?></textarea>
                </div>

                <div class="text-center mt-4">
                    <button type="submit" class="btn btn-submit">
                        <i class="fas fa-save mr-2"></i> Guardar Cambios
                    </button>
                    <a href="javascript:history.back()" class="btn btn-secondary ml-2">
                        <i class="fas fa-times mr-2"></i> Cancelar
                    </a>
                </div>
            </form>
        </div>
    </div>

    
</body>

</html>