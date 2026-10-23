<?php
//ini_set('display_errors', 0);
//error_reporting(0);

ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// Función para calcular edad automáticamente
function calcularEdad($fecha_nacimiento) {
    if (empty($fecha_nacimiento)) return 0;
    
    $fecha_nac = new DateTime($fecha_nacimiento);
    $fecha_actual = new DateTime();
    $diferencia = $fecha_actual->diff($fecha_nac);
    return $diferencia->y; // Retorna los años completos
}

// Personalizar manejo de errores
function customErrorHandler()
{
    // Redirigir o mostrar mensaje amigable
    header("Location: error.php");
    exit();
}
set_error_handler('customErrorHandler');
set_exception_handler('customErrorHandler');

// Conexión a la base de datos - RUTA CORREGIDA
require_once __DIR__ . '/../conexion/conexion.php';

// Verificar conexión
try {
    verificarConexion();
} catch (Exception $e) {
    die("Error crítico: " . $e->getMessage());
}


// Inicializar todas las variables
$accion = isset($_POST['accion']) ? $_POST['accion'] : "";
$error = "";
$txtID = isset($_POST['txtID']) ? $_POST['txtID'] : "";
$txtFecha = isset($_POST['txtFecha']) ? $_POST['txtFecha'] : "";
$txtEspecialidad = isset($_POST['txtEspecialidad']) ? $_POST['txtEspecialidad'] : "";
$txtTitular = isset($_POST['txtTitular']) ? $_POST['txtTitular'] : "";
$txtCedula_T = isset($_POST['txtCedula_T']) ? $_POST['txtCedula_T'] : "";
$txtPaciente = isset($_POST['txtPaciente']) ? $_POST['txtPaciente'] : "";
$txtCedula_P = isset($_POST['txtCedula_P']) ? $_POST['txtCedula_P'] : "";
$txtFecha_de_nacimiento = isset($_POST['txtFecha_de_nacimiento']) ? $_POST['txtFecha_de_nacimiento'] : "";
$txtSexo = isset($_POST['txtSexo']) ? $_POST['txtSexo'] : "";
$txtEdad = isset($_POST['txtEdad']) ? $_POST['txtEdad'] : "";
$txtDiagnostico = isset($_POST['txtDiagnostico']) ? $_POST['txtDiagnostico'] : "";
$txtTelefono = isset($_POST['txtTelefono']) ? $_POST['txtTelefono'] : "";
$txtUniversidad_ente = isset($_POST['txtUniversidad_ente']) ? $_POST['txtUniversidad_ente'] : "";
$txtMotivo_consulta = isset($_POST['txtMotivo_consulta']) ? $_POST['txtMotivo_consulta'] : "";
$txtTraslados = isset($_POST['txtTraslados']) ? $_POST['txtTraslados'] : "";
$txtObservaciones = isset($_POST['txtObservaciones']) ? $_POST['txtObservaciones'] : "";

//Variables de Estado de Acciones
$accionAgregar = "";
$accionModificar = $accionEliminar = $accionCancelar = "disabled";
$mostrarModal = false;

function limpiarCampos()
{
    global $txtID, $txtFecha, $txtEspecialidad, $txtTitular, $txtCedula_T,
    $txtPaciente, $txtCedula_P, $txtFecha_de_nacimiento, $txtSexo,
    $txtEdad, $txtDiagnostico, $txtTelefono, $txtUniversidad_ente,
    $txtMotivo_consulta, $txtTraslados, $txtObservaciones;

    $txtID = $txtFecha = $txtEspecialidad = $txtTitular = $txtCedula_T =
        $txtPaciente = $txtCedula_P = $txtFecha_de_nacimiento = $txtSexo =
        $txtEdad = $txtDiagnostico = $txtTelefono = $txtUniversidad_ente =
        $txtMotivo_consulta = $txtTraslados = $txtObservaciones = "";
}


// Procesar el formulario cuando se envía
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    switch ($accion) {
          case "btnAgregar":
            // Validar campos requeridos
            if (empty($txtMotivo_consulta)) {
                $error = "El motivo de consulta es requerido";
                // Resto de validaciones...
            } else {
                try {
                    // CALCULAR EDAD AUTOMÁTICAMENTE ANTES DE INSERTAR
                    if (!empty($txtFecha_de_nacimiento)) {
                        $txtEdad = calcularEdad($txtFecha_de_nacimiento);
                    } else {
                        $txtEdad = 0; // O el valor por defecto que prefieras
                    }
                    
                    $sentencia = $pdo->prepare("INSERT INTO pacientes (
                        Fecha, Especialidad, Titular, Cedula_T, Paciente, Cedula_P, 
                        Fecha_de_nacimiento, Sexo, Edad, Diagnostico, Telefono, 
                        Universidad_ente, Motivo_consulta, Traslados, Observaciones
                    ) VALUES (
                        :Fecha, :Especialidad, :Titular, :Cedula_T, :Paciente, :Cedula_P, 
                        :Fecha_de_nacimiento, :Sexo, :Edad, :Diagnostico, :Telefono, 
                        :Universidad_ente, :Motivo_consulta, :Traslados, :Observaciones
                    )");

                    $sentencia->bindParam(':Fecha', $txtFecha);
                    $sentencia->bindParam(':Especialidad', $txtEspecialidad);
                    $sentencia->bindParam(':Titular', $txtTitular);
                    $sentencia->bindParam(':Cedula_T', $txtCedula_T);
                    $sentencia->bindParam(':Paciente', $txtPaciente);
                    $sentencia->bindParam(':Cedula_P', $txtCedula_P);
                    $sentencia->bindParam(':Fecha_de_nacimiento', $txtFecha_de_nacimiento);
                    $sentencia->bindParam(':Sexo', $txtSexo);
                    $sentencia->bindParam(':Edad', $txtEdad);
                    $sentencia->bindParam(':Diagnostico', $txtDiagnostico);
                    $sentencia->bindParam(':Telefono', $txtTelefono);
                    $sentencia->bindParam(':Universidad_ente', $txtUniversidad_ente);
                    $sentencia->bindParam(':Motivo_consulta', $txtMotivo_consulta);
                    $sentencia->bindParam(':Traslados', $txtTraslados);
                    $sentencia->bindParam(':Observaciones', $txtObservaciones);
                    if ($sentencia->execute()) {
                        $mensaje = "Registro agregado correctamente";
                        limpiarCampos();
                        header('Location: index.php');
                        exit();
                    } else {
                        $error = "Error al agregar el registro";
                    }
                } catch (PDOException $e) {
                    $error = "Error en la base de datos: " . $e->getMessage();
                }
            }
            break;

    }
}

// Consultar pacientes
try {
    // Consulta para obtener pacientes del mes actual
    $mesActual = date('Y-m-01');
    $finMes = date('Y-m-t');

    $sql = "SELECT * FROM pacientes WHERE Fecha BETWEEN ? AND ? ORDER BY Fecha DESC";
    $sentencia = $pdo->prepare($sql);
    if (!$sentencia) {
        throw new Exception("Error al preparar consulta");
    }

    if (!$sentencia->execute([$mesActual, $finMes])) {
        throw new Exception("Error al ejecutar consulta");
    }

    $listaPaciente = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    $cantidadPacientes = count($listaPaciente);

} catch (PDOException $e) {
    error_log("Error PDO: " . $e->getMessage());
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
}

?>

<script>
// Calcular edad automáticamente cuando cambia la fecha de nacimiento
document.addEventListener('DOMContentLoaded', function() {
    const fechaNacimientoInput = document.querySelector('[name="txtFecha_de_nacimiento"]');
    const edadInput = document.querySelector('[name="txtEdad"]');
    
    if (fechaNacimientoInput && edadInput) {
        fechaNacimientoInput.addEventListener('change', function() {
            if (this.value) {
                const fechaNac = new Date(this.value);
                const hoy = new Date();
                let edad = hoy.getFullYear() - fechaNac.getFullYear();
                const mes = hoy.getMonth() - fechaNac.getMonth();
                
                if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
                    edad--;
                }
                
                edadInput.value = edad;
            }
        });
    }
});
</script>

<!DOCTYPE html>
<html lang="es">

<head>

    <!-- Meta y estilos -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sistema de Pacientes</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"></script>
    <style>
        .required:after {
            content: " *";
            color: red;
        }

        .form-container {
            max-width: 800px;
            margin: 100px auto;
            padding: 90px;
            background-color: rgb(160, 201, 255);
            border-radius: 5px;
            box-shadow: 0 0 10px rgb(79, 153, 238);
        }

        .btn-eliminar {
            background-color: rgb(214, 47, 47);
            color: white;
            margin-top: 5px;
        }

        .btn-seleccionar {
            background-color: rgb(38, 218, 3);
            color: white;
            margin-bottom: 5px;
        }

        .text-center {
            text-align: center;
        }

        body {
            background-color: rgb(17, 81, 145);
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        /* Añade estos estilos adicionales */
        .main-container {
            display: flex;
            flex-direction: column;
            min-height: 200vh;
        }

        .content {
            flex: 1;
        }

        .btn-ver-tabla {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #2c3e50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
        }

        .btn-ver-tabla:hover {
            background-color: #1a252f;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <form action="" method="post">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Registro de Pacientes</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-row">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="hidden" class="form-control" name="txtID" id="txtID"
                                                value="<?php echo htmlspecialchars($txtID); ?>">
                                        </div>

                                        <div class="form-group">
                                            <label for="txtFecha" class="required">Fecha:</label>
                                            <input type="date" class="form-control" name="txtFecha" id="txtFecha"
                                                value="<?php echo htmlspecialchars($txtFecha); ?>" required>
                                        </div>

                                        <div class="form-group">
                                            <label for="txtEspecialidad" class="required">Especialidad:</label>
                                            <select class="form-control" name="txtEspecialidad" id="txtEspecialidad"
                                                required>
                                                <option value="">Seleccionar...</option>
                                                <option value="Enfermería" <?php echo ($txtEspecialidad == 'Enfermería') ? 'selected' : ''; ?>>Enfermería</option>
                                                <option value="Medicina General" <?php echo ($txtEspecialidad == 'Medicina General') ? 'selected' : ''; ?>>Medicina General</option>
                                                <option value="Medicina Interna" <?php echo ($txtEspecialidad == 'Medicina Interna') ? 'selected' : ''; ?>>Medicina Interna</option>
                                                <option value="Pediatría" <?php echo ($txtEspecialidad == 'Pediatría') ? 'selected' : ''; ?>>Pediatría</option>
                                                <option value="Oncología" <?php echo ($txtEspecialidad == 'Oncología') ? 'selected' : ''; ?>>Oncología</option>
                                                <option value="Fisioterapia" <?php echo ($txtEspecialidad == 'Fisioterapia') ? 'selected' : ''; ?>>
                                                    Fisioterapia</option>
                                                <option value="Psicología" <?php echo ($txtEspecialidad == 'Psicología') ? 'selected' : ''; ?>>Psicología</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label for="txtTitular" class="required">Titular:</label>
                                            <input type="text" class="form-control" name="txtTitular" id="txtTitular"
                                                value="<?php echo htmlspecialchars($txtTitular); ?>" required>
                                        </div>

                                        <div class="form-group">
                                            <label for="txtCedula_T" class="required">Cedula_T:</label>
                                            <input type="text" class="form-control" name="txtCedula_T" id="txtCedula_T"
                                                value="<?php echo htmlspecialchars($txtCedula_T); ?>" required>
                                        </div>

                                        <div class="form-group">
                                            <label for="txtPaciente" class="required">Paciente:</label>
                                            <input type="text" class="form-control" name="txtPaciente" id="txtPaciente"
                                                value="<?php echo htmlspecialchars($txtPaciente); ?>" required>
                                        </div>

                                        <div class="form-group">
                                            <label for="txtCedula_P" class="required">Cedula_P:</label>
                                            <input type="text" class="form-control" name="txtCedula_P" id="txtCedula_P"
                                                value="<?php echo htmlspecialchars($txtCedula_P); ?>" required>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="txtFecha_de_nacimiento">Fecha de Nacimiento:</label>
                                            <input type="date" class="form-control" name="txtFecha_de_nacimiento"
                                                id="txtFecha_de_nacimiento"
                                                value="<?php echo htmlspecialchars($txtFecha_de_nacimiento); ?>"
                                                required>
                                        </div>

                                        <div class="form-group">
                                            <label for="txtSexo">Sexo:</label>
                                            <select class="form-control" name="txtSexo" id="txtSexo">
                                                <option value="">Seleccionar...</option>
                                                <option value="Masculino" <?php echo ($txtSexo == 'Masculino') ? 'selected' : ''; ?>>Masculino</option>
                                                <option value="Femenino" <?php echo ($txtSexo == 'Femenino') ? 'selected' : ''; ?>>Femenino</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label for="txtEdad">Edad:</label>
                                            <input type="number" class="form-control" name="txtEdad" id="txtEdad"
                                                value="<?php echo htmlspecialchars($txtEdad); ?>" required>
                                        </div>

                                        <div class="form-group">
                                            <label for="txtDiagnostico">Diagnóstico:</label>
                                            <input type="text" class="form-control" name="txtDiagnostico"
                                                id="txtDiagnostico"
                                                value="<?php echo htmlspecialchars($txtDiagnostico); ?>" required>
                                        </div>

                                        <div class="form-group">
                                            <label for="txtTelefono">Teléfono:</label>
                                            <input type="tel" class="form-control" name="txtTelefono" id="txtTelefono"
                                                value="<?php echo htmlspecialchars($txtTelefono); ?>">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="txtUniversidad_ente">Universidad_ente:</label>
                                            <select class="form-control" name="txtUniversidad_ente"
                                                id="txtUniversidad_ente">
                                                <option value="">Seleccionar...</option>

                                                <option value="Cortesía" <?php echo ($txtUniversidad_ente == 'Cortesía') ? 'selected' : ''; ?>>cortesía</option>
                                                <option
                                                    value="OPSU - Servicio Autónomo Oficinas Técnicas del Consejo Nacional de Universidades"
                                                    <?php echo ($txtUniversidad_ente == 'OPSU - Servicio Autónomo Oficinas Técnicas del Consejo Nacional de Universidades') ? 'selected' : ''; ?>>OPSU - Servicio Autónomo Oficinas Técnicas del Consejo Nacional
                                                    de Universidades</option>
                                                <option
                                                    value="MPPEU -	Ministerio del Poder Popular para la Educacion Universitario"
                                                    <?php echo ($txtUniversidad_ente == 'MPPEU -	Ministerio del Poder Popular para la Educacion Universitario') ? 'selected' : ''; ?>>
                                                    MPPEU - Ministerio del Poder Popular para la Educacion Universitario
                                                </option>
                                                <option value="CIM	- Fundación Centro Internacional Miranda" <?php echo ($txtUniversidad_ente == 'CIM	- Fundación Centro Internacional Miranda') ? 'selected' : ''; ?>>CIM - Fundación Centro Internacional
                                                    Miranda
                                                <option
                                                    value="ELAM -	Fundación Dr. Salvador Allende (Antes Fundación Alejandro Próspero Reverend)"
                                                    <?php echo ($txtUniversidad_ente == 'ELAM -	Fundación Dr. Salvador Allende (Antes Fundación Alejandro Próspero Reverend)') ? 'selected' : ''; ?>>ELAM - Fundación Dr. Salvador Allende (Antes Fundación
                                                    Alejandro Próspero Reverend)</option>
                                                <option value=" FUNDAYACUCHO -	Fundación Gran Mariscal de Ayacucho"
                                                    <?php echo ($txtUniversidad_ente == ' FUNDAYACUCHO -	Fundación Gran Mariscal de Ayacucho') ? 'selected' : ''; ?>> FUNDAYACUCHO -
                                                    Fundación Gran Mariscal de Ayacucho</option>
                                                <option value="FMS -	Fundación Misión Sucre" <?php echo ($txtUniversidad_ente == 'FMS -	Fundación Misión Sucre') ? 'selected' : ''; ?>>FMS - Fundación Misión Sucre</option>
                                                <option
                                                    value="FAMES -	Fundación para el Servicio de Asistencia Médica Hospitalaria para Estudiantes de Educación Superior"
                                                    <?php echo ($txtUniversidad_ente == 'FAMES -	Fundación para el Servicio de Asistencia Médica Hospitalaria para Estudiantes de Educación Superior') ? 'selected' : ''; ?>>FAMES - Fundación para el
                                                    Servicio de Asistencia Médica Hospitalaria para Estudiantes de
                                                    Educación Superior</option>
                                                <option
                                                    value="FUVIDIT -	Fundacion Venezolana de Investigacion Desarrollo e Innovacion Transporte"
                                                    <?php echo ($txtUniversidad_ente == 'FUVIDIT -	Fundacion Venezolana de Investigacion Desarrollo e Innovacion Transporte') ? 'selected' : ''; ?>>FUVIDIT - Fundacion Venezolana de Investigacion Desarrollo e
                                                    Innovacion Transporte</option>
                                                <option
                                                    value="IALA -	Instituto Universitario Latinoamericano de Agroecología Paulo Freire"
                                                    <?php echo ($txtUniversidad_ente == 'IALA -	Instituto Universitario Latinoamericano de Agroecología Paulo Freire') ? 'selected' : ''; ?>>IALA - Instituto Universitario Latinoamericano de Agroecología
                                                    Paulo Freire</option>
                                                <option
                                                    value="UBTJR -	Universidad Bolivariana de Trabajadores Jesús Rivero "
                                                    <?php echo ($txtUniversidad_ente == 'UBTJR -	Universidad Bolivariana de Trabajadores Jesús Rivero ') ? 'selected' : ''; ?>>UBTJR -
                                                    Universidad Bolivariana de Trabajadores Jesús Rivero </option>
                                                <option value="UBV -	Universidad Bolivariana de Venezuela " <?php echo ($txtUniversidad_ente == 'UBV -	Universidad Bolivariana de Venezuela ') ? 'selected' : ''; ?>>UBV - Universidad Bolivariana de Venezuela
                                                </option>
                                                <option
                                                    value="UCVAG -	Universidad Campesina de Venezuela Argimiro Gabaldon "
                                                    <?php echo ($txtUniversidad_ente == 'UCVAG -	Universidad Campesina de Venezuela Argimiro Gabaldon ') ? 'selected' : ''; ?>>UCVAG -
                                                    Universidad Campesina de Venezuela Argimiro Gabaldon </option>
                                                <option value="UCV -	Universidad Central de Venezuela" <?php echo ($txtUniversidad_ente == 'UCV -	Universidad Central de Venezuela') ? 'selected' : ''; ?>>UCV - Universidad Central de Venezuela</option>
                                                <option value=" UCLA	 -Universidad Centroccidental Lisandro Alvarado "
                                                    <?php echo ($txtUniversidad_ente == ' UCLA	 -Universidad Centroccidental Lisandro Alvarado ') ? 'selected' : ''; ?>> UCLA
                                                    -Universidad Centroccidental Lisandro Alvarado </option>
                                                <option value="UC -	Universidad de Carabobo" <?php echo ($txtUniversidad_ente == 'UC -	Universidad de Carabobo') ? 'selected' : ''; ?>>UC - Universidad de Carabobo</option>
                                                <option
                                                    value=" UCS -	Universidad De Las Ciencias De La Salud Hugo Chávez Frías "
                                                    <?php echo ($txtUniversidad_ente == ' UCS -	Universidad De Las Ciencias De La Salud Hugo Chávez Frías ') ? 'selected' : ''; ?>> UCS
                                                    - Universidad De Las Ciencias De La Salud Hugo Chávez Frías
                                                </option>
                                                <option value=" ULA -	Universidad de Los Andes " <?php echo ($txtUniversidad_ente == ' ULA -	Universidad de Los Andes') ? 'selected' : ''; ?>> ULA - Universidad de Los Andes</option>
                                                <option value="UDO -	Universidad de OrienteO" <?php echo ($txtUniversidad_ente == 'UDO -	Universidad de Oriente') ? 'selected' : ''; ?>>UDO - Universidad de Oriente</option>
                                                <option value="LUZ -	Universidad del Zulia " <?php echo ($txtUniversidad_ente == 'LUZ -	Universidad del Zulia ') ? 'selected' : ''; ?>>LUZ - Universidad del Zulia </option>
                                                <option value=" UDS -	Universidad Deportiva del Sur  " <?php echo ($txtUniversidad_ente == ' UDS -	Universidad Deportiva del Sur  ') ? 'selected' : ''; ?>> UDS - Universidad Deportiva del Sur</option>
                                                <option
                                                    value=" UICOM -	Universidad Internacional de las Comunicaciones   "
                                                    <?php echo ($txtUniversidad_ente == ' UICOM -	Universidad Internacional de las Comunicaciones   ') ? 'selected' : ''; ?>> UICOM
                                                    - Universidad Internacional de las Comunicaciones</option>
                                                <option value="UNA -	Universidad Nacional Abierta   " <?php echo ($txtUniversidad_ente == 'UNA -	Universidad Nacional Abierta   ') ? 'selected' : ''; ?>>UNA - Universidad Nacional Abierta </option>
                                                <option value="UNATUR - Universidad Nacional del Turismo" <?php echo ($txtUniversidad_ente == 'UNATUR - Universidad Nacional del Turismo') ? 'selected' : ''; ?>>UNATUR - Universidad Nacional del Turismo
                                                </option>
                                                <option value="UNEG - Universidad Nacional Experimental de Guayana"
                                                    <?php echo ($txtUniversidad_ente == 'UNEG - Universidad Nacional Experimental de Guayana') ? 'selected' : ''; ?>>UNEG - Universidad
                                                    Nacional Experimental de
                                                    Guayana</option>
                                                <option
                                                    value="UNEXCA - Universidad Nacional Experimental de la Gran Caracas"
                                                    <?php echo ($txtUniversidad_ente == 'UNEXCA - Universidad Nacional Experimental de la Gran Caracas') ? 'selected' : ''; ?>>UNEXCA -
                                                    Universidad Nacional
                                                    Experimental de la Gran Caracas</option>
                                                <option
                                                    value="UNELMLK - Universidad Nacional Experimental de Lara Martin Luther King"
                                                    <?php echo ($txtUniversidad_ente == 'UNELMLK - Universidad Nacional Experimental de Lara Martin Luther King') ? 'selected' : ''; ?>>
                                                    UNELMLK - Universidad Nacional Experimental de Lara Martin Luther
                                                    King</option>
                                                <option value="UNEARTE - Universidad Nacional Experimental de Las Artes"
                                                    <?php echo ($txtUniversidad_ente == 'UNEARTE - Universidad Nacional Experimental de Las Artes') ? 'selected' : ''; ?>>UNEARTE -
                                                    Universidad Nacional Experimental
                                                    de Las Artes</option>
                                                <option
                                                    value="UNETI - Universidad Nacional Experimental de las Telecomunicaciones e Informática"
                                                    <?php echo ($txtUniversidad_ente == 'UNETI - Universidad Nacional Experimental de las Telecomunicaciones e Informática') ? 'selected' : ''; ?>>UNETI - Universidad Nacional Experimental de las
                                                    Telecomunicaciones e Informática</option>
                                                <option
                                                    value="UNERG - Universidad Nacional Experimental de los Llanos Centrales Rómulo Gallegos"
                                                    <?php echo ($txtUniversidad_ente == 'UNERG - Universidad Nacional Experimental de los Llanos Centrales Rómulo Gallegos') ? 'selected' : ''; ?>>UNERG - Universidad Nacional Experimental de los Llanos
                                                    Centrales Rómulo Gallegos</option>
                                                <option
                                                    value="UNELLEZ - Universidad Nacional Experimental de los Llanos Occidentales Ezequiel Zamora"
                                                    <?php echo ($txtUniversidad_ente == 'UNELLEZ - Universidad Nacional Experimental de los Llanos Occidentales Ezequiel Zamora') ? 'selected' : ''; ?>>UNELLEZ - Universidad Nacional Experimental de
                                                    los Llanos Occidentales Ezequiel Zamora</option>
                                                <option value="UNET - Universidad Nacional Experimental del Táchira"
                                                    <?php echo ($txtUniversidad_ente == 'UNET - Universidad Nacional Experimental del Táchira') ? 'selected' : ''; ?>>UNET - Universidad
                                                    Nacional Experimental del
                                                    Táchira</option>
                                                <option
                                                    value="UNETRANS - Universidad Nacional Experimental del Transporte"
                                                    <?php echo ($txtUniversidad_ente == 'UNETRANS - Universidad Nacional Experimental del Transporte') ? 'selected' : ''; ?>>UNETRANS -
                                                    Universidad Nacional
                                                    Experimental del Transporte</option>
                                                <option value="UNEY - Universidad Nacional Experimental del Yaracuy"
                                                    <?php echo ($txtUniversidad_ente == 'UNEY - Universidad Nacional Experimental del Yaracuy') ? 'selected' : ''; ?>>UNEY - Universidad
                                                    Nacional Experimental del
                                                    Yaracuy</option>
                                                <option
                                                    value="UNEFM - Universidad Nacional Experimental Francisco Miranda"
                                                    <?php echo ($txtUniversidad_ente == 'UNEFM - Universidad Nacional Experimental Francisco Miranda') ? 'selected' : ''; ?>>UNEFM -
                                                    Universidad Nacional
                                                    Experimental Francisco Miranda</option>
                                                <option
                                                    value="UNEIT - Universidad Nacional Experimental Indigena Del Tauca"
                                                    <?php echo ($txtUniversidad_ente == 'UNEIT - Universidad Nacional Experimental Indigena Del Tauca') ? 'selected' : ''; ?>>UNEIT -
                                                    Universidad Nacional
                                                    Experimental Indigena Del Tauca</option>
                                                <option
                                                    value="UMC - Universidad Nacional Experimental Marítima del Caribe"
                                                    <?php echo ($txtUniversidad_ente == 'UMC - Universidad Nacional Experimental Marítima del Caribe') ? 'selected' : ''; ?>>UMC -
                                                    Universidad Nacional
                                                    Experimental Marítima del Caribe</option>
                                                <option
                                                    value="UNEXPO - Universidad Nacional Experimental Politecnica Antonio Jose de Sucre"
                                                    <?php echo ($txtUniversidad_ente == 'UNEXPO - Universidad Nacional Experimental Politecnica Antonio Jose de Sucre') ? 'selected' : ''; ?>>UNEXPO - Universidad Nacional Experimental Politecnica Antonio
                                                    Jose de Sucre</option>
                                                <option
                                                    value="UNEFA - Universidad Nacional Experimental Politecnica de las Fuerza Armada Nacional"
                                                    <?php echo ($txtUniversidad_ente == 'UNEFA - Universidad Nacional Experimental Politecnica de las Fuerza Armada Nacional') ? 'selected' : ''; ?>>UNEFA - Universidad Nacional Experimental
                                                    Politecnica de las Fuerza Armada Nacional</option>
                                                <option
                                                    value="UNERMB - Universidad Nacional Experimental Rafael Maria Baralt"
                                                    <?php echo ($txtUniversidad_ente == 'UNERMB - Universidad Nacional Experimental Rafael Maria Baralt') ? 'selected' : ''; ?>>UNERMB -
                                                    Universidad Nacional
                                                    Experimental Rafael Maria Baralt</option>
                                                <option value="USB - Universidad Nacional Experimental Simón Bolívar"
                                                    <?php echo ($txtUniversidad_ente == 'USB - Universidad Nacional Experimental Simón Bolívar') ? 'selected' : ''; ?>>USB - Universidad
                                                    Nacional Experimental
                                                    Simón Bolívar</option>
                                                <option
                                                    value="UNESR - Universidad Nacional Experimental Simón Rodríguez"
                                                    <?php echo ($txtUniversidad_ente == 'UNESR - Universidad Nacional Experimental Simón Rodríguez') ? 'selected' : ''; ?>>UNESR -
                                                    Universidad Nacional Experimental
                                                    Simón Rodríguez</option>
                                                <option
                                                    value="UNESUR - Universidad Nacional Experimental Sur del Lago Jesus Maria Semprum"
                                                    <?php echo ($txtUniversidad_ente == 'UNESUR - Universidad Nacional Experimental Sur del Lago Jesus Maria Semprum') ? 'selected' : ''; ?>>UNESUR - Universidad Nacional Experimental Sur del Lago Jesus
                                                    Maria Semprum</option>
                                                <option value="UPEL - Universidad Pedagógica Experimental Libertador"
                                                    <?php echo ($txtUniversidad_ente == 'UPEL - Universidad Pedagógica Experimental Libertador') ? 'selected' : ''; ?>>UPEL - Universidad
                                                    Pedagógica Experimental
                                                    Libertador</option>
                                                <option
                                                    value="UPTAT - Universidad Politécnica Territorial Agroindustrial del Estado Táchira"
                                                    <?php echo ($txtUniversidad_ente == 'UPTAT - Universidad Politécnica Territorial Agroindustrial del Estado Táchira') ? 'selected' : ''; ?>>UPTAT - Universidad Politécnica Territorial Agroindustrial del
                                                    Estado Táchira</option>
                                                <option
                                                    value="UPTBAL - Universidad Politécnica Territorial de Barlovento Argelia Laya"
                                                    <?php echo ($txtUniversidad_ente == 'UPTBAL - Universidad Politécnica Territorial de Barlovento Argelia Laya') ? 'selected' : ''; ?>>
                                                    UPTBAL - Universidad Politécnica Territorial de Barlovento Argelia
                                                    Laya</option>
                                                <option
                                                    value="UPTMS - Universidad Politécnica Territorial de Caracas Mariscal Sucre"
                                                    <?php echo ($txtUniversidad_ente == 'UPTMS - Universidad Politécnica Territorial de Caracas Mariscal Sucre') ? 'selected' : ''; ?>>UPTMS
                                                    - Universidad Politécnica Territorial de Caracas Mariscal Sucre
                                                </option>
                                                <option
                                                    value="UPTFAG - Universidad Politécnica Territorial de Falcón Alonso Gamero"
                                                    <?php echo ($txtUniversidad_ente == 'UPTFAG - Universidad Politécnica Territorial de Falcón Alonso Gamero') ? 'selected' : ''; ?>>UPTFAG -
                                                    Universidad Politécnica Territorial de Falcón Alonso Gamero</option>
                                                <option
                                                    value="UPTAMCA - Universidad Politécnica Territorial de los Altos Mirandinos Cecilio Acosta"
                                                    <?php echo ($txtUniversidad_ente == 'UPTAMCA - Universidad Politécnica Territorial de los Altos Mirandinos Cecilio Acosta') ? 'selected' : ''; ?>>UPTAMCA - Universidad Politécnica Territorial de los Altos
                                                    Mirandinos Cecilio Acosta</option>
                                                <option
                                                    value="UPTLLJR - Universidad Politécnica territorial de los Llanos Juana Ramirez"
                                                    <?php echo ($txtUniversidad_ente == 'UPTLLJR - Universidad Politécnica territorial de los Llanos Juana Ramirez') ? 'selected' : ''; ?>>
                                                    UPTLLJR - Universidad Politécnica territorial de los Llanos Juana
                                                    Ramirez</option>
                                                <option value="UPTM - Universidad Politécnica Territorial de Maracaibo"
                                                    <?php echo ($txtUniversidad_ente == 'UPTM - Universidad Politécnica Territorial de Maracaibo') ? 'selected' : ''; ?>>UPTM - Universidad
                                                    Politécnica Territorial
                                                    de Maracaibo</option>
                                                <option
                                                    value="UPTP - Universidad Politécnica Territorial de Paria Luis Mariano Rivera"
                                                    <?php echo ($txtUniversidad_ente == 'UPTP - Universidad Politécnica Territorial de Paria Luis Mariano Rivera') ? 'selected' : ''; ?>>
                                                    UPTP - Universidad Politécnica Territorial de Paria Luis Mariano
                                                    Rivera</option>
                                                <option
                                                    value="UPTPC - Universidad Politécnica Territorial de Puerto Cabello"
                                                    <?php echo ($txtUniversidad_ente == 'UPTPC - Universidad Politécnica Territorial de Puerto Cabello') ? 'selected' : ''; ?>>UPTPC -
                                                    Universidad Politécnica
                                                    Territorial de Puerto Cabello</option>
                                                <option value="UPTV - Universidad Politécnica Territorial de Valencia"
                                                    <?php echo ($txtUniversidad_ente == 'UPTV - Universidad Politécnica Territorial de Valencia') ? 'selected' : ''; ?>>UPTV - Universidad
                                                    Politécnica Territorial
                                                    de Valencia</option>
                                                <option
                                                    value="UPTYAB - Universidad Politécnica Territorial de Yaracuy Aristides Bastidas"
                                                    <?php echo ($txtUniversidad_ente == 'UPTYAB - Universidad Politécnica Territorial de Yaracuy Aristides Bastidas') ? 'selected' : ''; ?>>
                                                    UPTYAB - Universidad Politécnica Territorial de Yaracuy Aristides
                                                    Bastidas</option>
                                                <option
                                                    value="UPTA - Universidad Politécnica Territorial del Alto Apure Pedro Camejo"
                                                    <?php echo ($txtUniversidad_ente == 'UPTA - Universidad Politécnica Territorial del Alto Apure Pedro Camejo') ? 'selected' : ''; ?>>UPTA
                                                    - Universidad Politécnica Territorial del Alto Apure Pedro Camejo
                                                </option>
                                                <option
                                                    value="UPTAFBF - Universidad Politécnica Territorial Del Estado Aragua Federico Brito Figueroa"
                                                    <?php echo ($txtUniversidad_ente == 'UPTAFBF - Universidad Politécnica Territorial Del Estado Aragua Federico Brito Figueroa') ? 'selected' : ''; ?>>UPTAFBF - Universidad Politécnica Territorial Del Estado
                                                    Aragua Federico Brito Figueroa</option>
                                                <option
                                                    value="UPT BARINAS - Universidad Politécnica Territorial del Estado Barinas José Félix Ribas"
                                                    <?php echo ($txtUniversidad_ente == 'UPT BARINAS - Universidad Politécnica Territorial del Estado Barinas José Félix Ribas') ? 'selected' : ''; ?>>UPT BARINAS - Universidad Politécnica
                                                    Territorial del Estado Barinas José Félix Ribas</option>
                                                <option
                                                    value="UPT BOLIVAR - Universidad Politécnica Territorial del Estado Bolívar"
                                                    <?php echo ($txtUniversidad_ente == 'UPT BOLIVAR - Universidad Politécnica Territorial del Estado Bolívar') ? 'selected' : ''; ?>>
                                                    UPT BOLIVAR - Universidad Politécnica Territorial del Estado Bolívar
                                                </option>
                                                <option
                                                    value="UPTAEB - Universidad Politécnica Territorial del Estado Lara Andrés Eloy Blanco"
                                                    <?php echo ($txtUniversidad_ente == 'UPTAEB - Universidad Politécnica Territorial del Estado Lara Andrés Eloy Blanco') ? 'selected' : ''; ?>>UPTAEB - Universidad Politécnica Territorial del Estado Lara
                                                    Andrés Eloy Blanco</option>
                                                <option
                                                    value="UPTMKR - Universidad Politécnica Territorial del Estado Mérida Kleber Ramirez"
                                                    <?php echo ($txtUniversidad_ente == 'UPTMKR - Universidad Politécnica Territorial del Estado Mérida Kleber Ramirez') ? 'selected' : ''; ?>>UPTMKR - Universidad Politécnica Territorial del Estado Mérida
                                                    Kleber Ramirez</option>
                                                <option
                                                    value="UPT Portuguesa - Universidad Politécnica Territorial del Estado Portuguesa Juan de Jesús Montilla"
                                                    <?php echo ($txtUniversidad_ente == 'UPT Portuguesa - Universidad Politécnica Territorial del Estado Portuguesa Juan de Jesús Montilla') ? 'selected' : ''; ?>>UPT Portuguesa - Universidad
                                                    Politécnica Territorial del Estado Portuguesa
                                                    Juan de Jesús Montilla</option>
                                                <option
                                                    value="UPTTMBI - Universidad Politécnica Territorial del Estado Trujillo Mario Briceño Iragorry"
                                                    <?php echo ($txtUniversidad_ente == 'UPTTMBI - Universidad Politécnica Territorial del Estado Trujillo Mario Briceño Iragorry') ? 'selected' : ''; ?>>UPTTMBI - Universidad Politécnica Territorial
                                                    del Estado Trujillo Mario Briceño Iragorry
                                                </option>
                                                <option
                                                    value="UPT Norte Monagas - Universidad Politécnica Territorial del Norte de Monagas Ludovico Silva"
                                                    <?php echo ($txtUniversidad_ente == 'UPT Norte Monagas - Universidad Politécnica Territorial del Norte de Monagas Ludovico Silva') ? 'selected' : ''; ?>>UPT Norte Monagas - Universidad Politécnica
                                                    Territorial del Norte de Monagas Ludovico
                                                    Silva</option>
                                                <option
                                                    value="UPT TACHIRA - Universidad Politécnica Territorial del Norte del Táchira Manuela Sáenz"
                                                    <?php echo ($txtUniversidad_ente == 'UPT TACHIRA - Universidad Politécnica Territorial del Norte del Táchira Manuela Sáenz') ? 'selected' : ''; ?>>UPT TACHIRA - Universidad Politécnica
                                                    Territorial del Norte del Táchira Manuela Sáenz</option>
                                                <option
                                                    value="UPT Clodosbaldo Russian - Universidad Politécnica Territorial del Oeste de Sucre Clodosbaldo Russian"
                                                    <?php echo ($txtUniversidad_ente == 'UPT Clodosbaldo Russian - Universidad Politécnica Territorial del Oeste de Sucre Clodosbaldo Russian') ? 'selected' : ''; ?>>UPT Clodosbaldo Russian -
                                                    Universidad Politécnica Territorial del Oeste
                                                    de Sucre Clodosbaldo Russian</option>
                                                <option value="UPTZ - Universidad Politécnica Territorial del Zulia"
                                                    <?php echo ($txtUniversidad_ente == 'UPTZ - Universidad Politécnica Territorial del Zulia') ? 'selected' : ''; ?>>UPTZ - Universidad
                                                    Politécnica Territorial del
                                                    Zulia</option>
                                                <option
                                                    value="UPTJAA - Universidad Politécnica Territorial Jose Antonio Anzoategui"
                                                    <?php echo ($txtUniversidad_ente == 'UPTJAA - Universidad Politécnica Territorial Jose Antonio Anzoategui') ? 'selected' : ''; ?>>UPTJAA -
                                                    Universidad Politécnica Territorial Jose Antonio Anzoategui</option>
                                                <option
                                                    value="UPTVT - Universidad Politécnica Territorial Valles del Tuy"
                                                    <?php echo ($txtUniversidad_ente == 'UPTVT - Universidad Politécnica Territorial Valles del Tuy') ? 'selected' : ''; ?>>UPTVT -
                                                    Universidad Politécnica
                                                    Territorial Valles del Tuy</option>
                                                <option value="UPAFV - Universidad Popular del Ambiente Fruto Vivas"
                                                    <?php echo ($txtUniversidad_ente == 'UPAFV - Universidad Popular del Ambiente Fruto Vivas') ? 'selected' : ''; ?>>UPAFV - Universidad
                                                    Popular del Ambiente Fruto
                                                    Vivas</option>
                                                <option
                                                    value="UTDFT - Universidad Territorial Deltaica Francisco Tamayo"
                                                    <?php echo ($txtUniversidad_ente == 'UTDFT - Universidad Territorial Deltaica Francisco Tamayo') ? 'selected' : ''; ?>>UTDFT -
                                                    Universidad Territorial Deltaica
                                                    Francisco Tamayo</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="txtMotivo_consulta">Motivo de Consulta:</label>
                                            <input type="text" class="form-control" name="txtMotivo_consulta"
                                                id="txtMotivo_consulta"
                                                value="<?php echo htmlspecialchars($txtMotivo_consulta); ?>">
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="txtTraslados">Traslados:</label>
                                            <input type="text" class="form-control" name="txtTraslados"
                                                id="txtTraslados"
                                                value="<?php echo htmlspecialchars($txtTraslados); ?>">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="txtObservaciones">Observaciones:</label>
                                            <input type="text" class="form-control" name="txtObservaciones"
                                                id="txtObservaciones"
                                                value="<?php echo htmlspecialchars($txtObservaciones); ?>">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="submit" <?php echo $accionAgregar; ?> class="btn btn-primary" name="accion"
                                value="btnAgregar">Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="form-container text-center">
            <h2 class="text-center mb-4">Registro de Pacientes</h2>

            <?php if (!empty($error)): ?>
                <div class="alert alert-danger"><?php echo $error; ?></div>
            <?php endif; ?>

            <?php if (isset($mensaje)): ?>
                <div class="alert alert-success"><?php echo $mensaje; ?></div>
            <?php endif; ?>

            <button type="button" class="btn btn-primary mb-3" data-toggle="modal" data-target="#exampleModal">
                Agregar registro +
            </button>
        </div>
        </button>
        <!-- Versión mejorada con icono y estilo -->
        <a href="gestion/gestion_carpetas.php" class="btn btn-info">
            <i class="fas fa-folder-open mr-2"></i> Gestionar Carpetas por Mes
        </a>
    </div>

    </div>
    </div>
    </div>
    </div>


    <script>
        
        <?php if ($mostrarModal): ?>
            $(document).ready(function () {
                $('#exampleModal').modal('show');
            });
        <?php endif; ?>
    </script>
</body>

</html>