<?php
include ("include/header_php.php");
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

$error_msj = '';
$mensaje_exito = '';

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost;port=$dbport;dbname=$dbdatabase;user=$dbuser;password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die("Error de conexión: " . $e->getMessage());
}

// 4. Estructura de Interfaz
$valor = null;
$mi_menu_html = MostrarMenu($conexion_bd, $valor);
$mi_footer_html = MostrarFooter($conexion_bd, $valor);

echo $mi_menu_html;

$mensaje_exito = '';
$mensaje_error = '';

// Mensaje de éxito tras redirección
if (isset($_GET['exito']) && $_GET['exito'] == 1) {
    $mensaje_exito = '¡La cita y los datos del paciente se registraron exitosamente!';
}

// Mensaje de éxito tras redirección
if (isset($_GET['error']) && $_GET['error'] == 1) {
    $mensaje_error = 'No se pudo crear la cita';
}

?>

<div class="container pb-5">
	<div class="row justify-content-center">
		<div class="col-12">

<?php if (isset($_GET['exito']) && $_GET['exito'] == 1) { ?>
			<!-- ALERTA DE ÉXITO -->
			<div
				class="alert alert-success alert-dismissible fade show shadow-sm mb-3"
				role="alert">
				<i class="bi bi-check-circle-fill me-2"></i><?php echo $mensaje_exito; ?>
				<button type="button" class="btn-close" data-bs-dismiss="alert"
					aria-label="Close"></button>
			</div>
<?php }?>

<?php if (isset($_GET['error']) && $_GET['error'] == 1) {?>
    
			<!-- ALERTA DE ERROR -->
			<div
				class="alert alert-danger alert-dismissible fade show shadow-sm mb-3"
				role="alert">
				<i class="bi bi-exclamation-triangle-fill me-2"></i><?php echo $mensaje_error; ?>
				<button type="button" class="btn-close" data-bs-dismiss="alert"
					aria-label="Close"></button>
			</div>
<?php }?>

			<div class="card shadow-sm border-0 btn-rounded">
				<div class="card-body p-4">
					<h4 class="fw-bold text-dark mb-4">Registrar Cita</h4>
					</hr>
					<form method="POST" action="citasRegistrar.php">
						<input type="hidden" name="id_usuario"
							value="[usuario_e.id_usuario;noerr]">

						<!-- SECCIÓN DE LA CITA -->
						
						<script>
						const principal = document.getElementById('select-principal');
const secundario = document.getElementById('select-secundario');
const terciario = document.getElementById('select-terciario');

// 1. Cambio en select principal -> actualiza secundario
principal.addEventListener('change', async () => {
  const valPrincipal = principal.value;

  // Limpiar y bloquear dependientes
  secundario.innerHTML = '<option value="">Cargando...</option>';
  secundario.disabled = true;
  terciario.innerHTML = '<option value="">Primero elige secundario...</option>';
  terciario.disabled = true;

  if (!valPrincipal) {
    secundario.innerHTML = '<option value="">Elige principal primero</option>';
    return;
  }

  try {
    const respuesta = await fetch(`get-secundario.php?id=${valPrincipal}`);
    const htmlOpciones = await respuesta.text(); // o .json() según tu backend

    secundario.innerHTML = htmlOpciones;
    secundario.disabled = false;
  } catch (error) {
    console.error('Error al cargar secundario:', error);
    secundario.innerHTML = '<option value="">Error al cargar</option>';
  }
});

// 2. Cambio en select secundario -> actualiza terciario
secundario.addEventListener('change', async () => {
  const valSecundario = secundario.value;

  terciario.innerHTML = '<option value="">Cargando...</option>';
  terciario.disabled = true;

  if (!valSecundario) {
    terciario.innerHTML = '<option value="">Elige secundario primero</option>';
    return;
  }

  try {
    const respuesta = await fetch(`get-terciario.php?id=${valSecundario}`);
    const htmlOpciones = await respuesta.text();

    terciario.innerHTML = htmlOpciones;
    terciario.disabled = false;
  } catch (error) {
    console.error('Error al cargar terciario:', error);
    terciario.innerHTML = '<option value="">Error al cargar</option>';
  }
});
						</script>
						
						
						
						<h5 class="fw-bold text-dark mb-3">Datos de la Cita</h5>
						<div class="row g-3 mb-4">
							<div class="col-md-4">
								<label class="form-label fw-bold">*Especialidad</label> 
								<select
									name="id_especialidad" id="id_especialidad"
									class="form-select shadow-sm js-example-basic-single" required >
									<option value="0">Seleccionar</option>
									<?php
									$sql = "SELECT id_especialidad, nombre_especialidad FROM public.especialidad ORDER BY id_especialidad";
									$campoID = "id_especialidad";
									$campoValor = "nombre_especialidad";
									 echo objetoSelet($conexion_bd, $sql, $campoId, $campoValor); 
									 ?>
								</select>
							</div>

							<div class="col-md-4">
								<label class="form-label fw-bold">*Fecha de la Cita</label> 
								<input
									type="date" name="fcita" id="fcita" class="form-control shadow-sm"
									autocomplete="off" required>
							</div>

							<div class="col-md-4">
								<label class="form-label fw-bold">*Médico</label> <select
									name="id_medico" id="id_medico" class="form-select shadow-sm"
									required>
									<option value="">Seleccionar</option>
									<option value="[medico.id_medico;block=option]">[medico.nombre_medico]</option>
								</select>
							</div>
						</div>

						<hr>


						<!-- Nav tabs -->
						<ul class="nav nav-tabs" id="myTab" role="tablist">
							<li class="nav-item" role="presentation">
								<button class="nav-link active" id="home-tab"
									data-bs-toggle="tab" data-bs-target="#home" type="button"
									role="tab" aria-controls="home" aria-selected="true">TITULAR</button>
							</li>
							<li class="nav-item" role="presentation">
								<button class="nav-link" id="profile-tab" data-bs-toggle="tab"
									data-bs-target="#profile" type="button" role="tab"
									aria-controls="profile" aria-selected="false">BENEFICIARIO</button>
							</li>
							<li class="nav-item" role="presentation">
								<button class="nav-link" id="messages-tab" data-bs-toggle="tab"
									data-bs-target="#messages" type="button" role="tab"
									aria-controls="messages" aria-selected="false">CORTESIA</button>
							</li>
							<li class="nav-item" role="cita">
								<button class="nav-link active" id="cita-tab"
									data-bs-toggle="tab" data-bs-target="#cita" type="button"
									role="tab" aria-controls="home" aria-selected="true">CITA</button>
							</li>
						</ul>

						<!-- Tab panes -->
						<div class="tab-content">
							<div class="tab-pane active" id="home" role="tabpanel"
								aria-labelledby="home-tab">Formulario TITUALR</div>
							<div class="tab-pane" id="profile" role="tabpanel"
								aria-labelledby="profile-tab">FORMULARIO BENEFICIARIO</div>
							<div class="tab-pane" id="messages" role="tabpanel"
								aria-labelledby="messages-tab">FORMULARIO CORTESIA</div>

							<div class="tab-pane" id="cita" role="tabpanel"
								aria-labelledby="messages-tab">CITA</div>


						</div>

						</BR>












						<!-- SECCIÓN DEL PACIENTE -->
						<h5 class="fw-bold text-dark mb-3">Datos del Paciente</h5>
						<div class="row g-3 mb-3">
							<div class="col-md-2">
								<label class="form-label fw-bold">*Nacionalidad</label> <select
									name="id_nacionalidad" id="id_nacionalidad"
									class="form-select shadow-sm" required>
									<option value="">Seleccionar</option>
									<option value="[nacionalidad.id_nacionalidad;block=option]">[nacionalidad.nombre_nacionalidad]</option>
								</select>
							</div>

							<div class="col-md-2">
								<label class="form-label fw-bold">*Cédula</label> <input
									type="number" name="cedula_titular"
									value="[usuario_e.cedula_titular;noerr]"
									class="form-control shadow-sm" required>
							</div>

							<div class="col-md-4">
								<label class="form-label fw-bold">*Nombre(s)</label> <input
									type="text" name="nombre_titular"
									value="[usuario_e.nombre_titular;noerr]"
									class="form-control shadow-sm" required>
							</div>

							<div class="col-md-4">
								<label class="form-label fw-bold">*Apellido(s)</label> <input
									type="text" name="apellido_titular"
									value="[usuario_e.apellido_titular;noerr]"
									class="form-control shadow-sm" required>
							</div>
						</div>

						<div class="row g-3 mb-3">
							<div class="col-md-2">
								<label class="form-label fw-bold">*Sexo</label> <select
									name="id_sexo" id="id_sexo" class="form-select shadow-sm"
									required>
									<option value="">Seleccionar</option>
									<option value="[sexo.id_sexo;block=option]">[sexo.nombre_sexo]</option>
								</select>
							</div>

							<div class="col-md-3">
								<label class="form-label fw-bold">*Fecha de Nacimiento</label> <input
									type="date" name="fecha_nacimiento_titular"
									id="fecha_nacimiento_titular"
									value="[usuario_e.fecha_nacimiento_titular;noerr]"
									class="form-control shadow-sm" required>
							</div>

							<div class="col-md-2">
								<label class="form-label fw-bold">Edad</label> <input
									type="text" name="edad_titular" id="edad_titular"
									value="[usuario_e.edad_titular;noerr]"
									class="form-control shadow-sm bg-light" readonly
									placeholder="Automático">
							</div>

							<div class="col-md-2">
								<label class="form-label fw-bold">Teléfono 1</label> <input
									type="text" name="telefono_titular"
									value="[usuario_e.telefono_titular;noerr]"
									class="form-control shadow-sm" placeholder="04xx-xxxxxxx">
							</div>

							<div class="col-md-3">
								<label class="form-label fw-bold">Teléfono 2</label> <input
									type="text" name="telefono2_titular"
									value="[usuario_e.telefono2_titular;noerr]"
									class="form-control shadow-sm" placeholder="04xx-xxxxxxx">
							</div>
						</div>

						<div class="row g-3 mb-4">
							<div class="col-md-3">
								<label class="form-label fw-bold">Correo Electrónico</label> <input
									type="email" name="correo_titular"
									value="[usuario_e.correo_titular;noerr]"
									class="form-control shadow-sm" placeholder="ejemplo@correo.com">
							</div>

							<div class="col-md-3">
								<label class="form-label fw-bold">Dirección Corta</label> <input
									type="text" name="direccion_corta_casa_titular"
									value="[usuario_e.direccion_corta_casa_titular;noerr]"
									class="form-control shadow-sm"
									placeholder="Ej: Av. Urdaneta...">
							</div>

							<div class="col-md-3">
								<label class="form-label fw-bold">*Estado de Visita</label> <select
									name="id_estado_pais" id="id_estado_pais"
									class="form-select shadow-sm" required>
									<option value="">Seleccionar</option>
									<option value="[estado.id_estado_pais;block=option]">[estado.nombre_estado_pais]</option>
								</select>
							</div>

							<div class="col-md-3">
								<label class="form-label fw-bold">*Parentesco</label> <select
									name="id_parentesco" id="id_parentesco"
									class="form-select shadow-sm" required>
									<option value="">Seleccionar</option>
									<option value="[parentesco.id_parentesco;block=option]">[parentesco.nombre_parentesco]</option>
								</select>
							</div>

							<div class="col-md-3">
								<label class="form-label fw-bold">*Tipo de Empleado</label> <select
									name="id_tipo_de_empleado" id="id_tipo_de_empleado"
									class="form-select shadow-sm" required>
									<option value="">Seleccionar</option>
									<option
										value="[tipo_de_empleado.id_tipo_de_empleado;block=option]">[tipo_de_empleado.nombre_tipo_de_empleado]</option>
								</select>
							</div>
						</div>

						<h5 class="text-primary mb-3 border-bottom pb-2">Adscripción
							Institucional</h5>

						<div class="col-12 mb-4 text-center">
							<label class="form-label d-block fw-bold mb-2">Tipo de
								Adscripción o Institución</label>
							<div class="btn-group" role="group">
								<input type="radio" class="btn-check" name="tipo_institucion"
									id="radio_ente" value="E" autocomplete="off" checked> <label
									class="btn btn-outline-primary px-4" for="radio_ente">Ente
									Adscrito</label> <input type="radio" class="btn-check"
									name="tipo_institucion" id="radio_universidad" value="U"
									autocomplete="off"> <label class="btn btn-outline-primary px-4"
									for="radio_universidad">Universidad</label>
							</div>
						</div>

						<!-- BLOQUE UNIVERSIDAD (Oculto por defecto) -->
						<div class="col-12 mb-3 grupo-universidad" id="grupo_universidad"
							style="display: none;">
							<div class="row">
								<div class="col-md-6">
									<label class="form-label fw-bold">Universidad</label> <select
										name="id_universidad" id="reg_id_universidad"
										class="form-select shadow-sm">
										<option value="">Seleccione una Universidad</option>
										<option value="[universidad_opt.id_universidad;block=option]">[universidad_opt.nombre_universidad]</option>
									</select>
								</div>
							</div>
						</div>

						<!-- BLOQUE ENTES ADSCRITOS (Visible por defecto) -->
						<div id="grupo_entes_cascada" class="col-12 p-0 m-0 grupo-entes">
							<div class="row p-0 m-0">
								<div class="col-md-6 mb-3">
									<label class="form-label fw-bold">Ente Adscrito</label> <select
										name="id_ente" id="registro_id_ente"
										class="form-select shadow-sm">
										<option value="">Seleccione un Ente</option>
										<option value="[ente_opt.id_ente;block=option]">[ente_opt.nombre_ente]</option>
									</select>
								</div>

								<!-- <div class="col-md-6 mb-3">
                                                                                                                                                                                                            <label class="form-label fw-bold">Dirección General</label>
                                                                                                                                                                                                            <select name="id_direccion_general" id="registro_id_direccion_general" class="form-select shadow-sm" disabled>
                                                                                                                                                                                                            <option value="">Seleccione una Dirección General</option>
                                                                                                                                                                                                            </select>
                                                                                                                                                                                                            </div> -->

								<!-- <div class="col-md-6 mb-3">
                                                                                                                                                                                                            <label class="form-label fw-bold">Dirección de Línea</label>
                                                                                                                                                                                                            <select name="id_direccion_linea" id="registro_id_direccion_linea" class="form-select shadow-sm" disabled>
                                                                                                                                                                                                            <option value="">Seleccione una Dirección de Línea</option>
                                                                                                                                                                                                            </select>
                                                                                                                                                                                                            </div> -->

								<!-- <div class="col-md-6 mb-3">
                                                                                                                                                                                                            <label class="form-label fw-bold">Coordinación</label>
                                                                                                                                                                                                            <select name="id_coordinacion" id="registro_id_coordinacion" class="form-select shadow-sm" disabled>
                                                                                                                                                                                                            <option value="">Seleccione una Coordinación</option>
                                                                                                                                                                                                            </select>
                                                                                                                                                                                                            </div>  -->
							</div>
						</div>

						<div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
							[var.botones_html;htmlconv=no]</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Cargar jQuery PRIMERO, luego tu funciones.js -->
<script src="node_modules/jquery/dist/jquery.min.js"></script>
<script src="js/funciones.js"></script>
<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0/dist/js/select2.min.js">
</script>

<script>
    function cambioEspecialidad() {
    	let texto = $("#id_especialidad option:selected").text();
    	let valor = $("#id_especialidad option:selected").val();
    	alert( texto );
    	alert( valor );
    	verMedicos( valor );
    }
    function verMedicos( valor, texto ) {
    	alert('cambio de medicos' + valor + " " + texto );
    }
</script>


<script>
// In your Javascript (external .js resource or <script> tag)
$(document).ready(function() {
    $('.js-example-basic-single').select2();
});

$("#id_especialidad").on("change", function() {
	var valorNuevo = document.getElementById('id_especialidad').value
    alert("Cambió a:", valorNuevo);
});

$("#fcita").on("change", function() {
    var valorNuevo = document.getElementById('fcita').value
    alert("Cambió a:", valorNuevo);
});


</script>

<?php
echo $mi_footer_html;

die();

// 1. Procesamiento al enviar el formulario (Captura botón o tecla Enter)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // echo "después del post";
    try {
        $conexion_bd->beginTransaction();

        // Conversión segura de campos numéricos (convierte "" a null)
        $id_usuario = ! empty($_POST['id_usuario']) ? intval($_POST['id_usuario']) : null;
        $id_nacionalidad = ! empty($_POST['id_nacionalidad']) ? intval($_POST['id_nacionalidad']) : null;
        $cedula_titular = ! empty($_POST['cedula_titular']) ? intval($_POST['cedula_titular']) : null;
        $nombre_titular = ! empty($_POST['nombre_titular']) ? trim($_POST['nombre_titular']) : null;
        $apellido_titular = ! empty($_POST['apellido_titular']) ? trim($_POST['apellido_titular']) : null;
        $id_sexo = ! empty($_POST['id_sexo']) ? intval($_POST['id_sexo']) : null;
        $fecha_nacimiento_titular = ! empty($_POST['fecha_nacimiento_titular']) ? $_POST['fecha_nacimiento_titular'] : null;

        // Cálculo automático de edad si el campo llega vacío
        if (! empty($_POST['edad_titular'])) {
            $edad_titular = intval($_POST['edad_titular']);
        } elseif (! empty($fecha_nacimiento_titular)) {
            $fecha_nac = new DateTime($fecha_nacimiento_titular);
            $hoy = new DateTime();
            $edad_titular = $hoy->diff($fecha_nac)->y;
        } else {
            $edad_titular = null;
        }

        $telefono_titular = ! empty($_POST['telefono_titular']) ? trim($_POST['telefono_titular']) : null;
        $telefono2_titular = ! empty($_POST['telefono2_titular']) ? trim($_POST['telefono2_titular']) : null;
        $correo_titular = ! empty($_POST['correo_titular']) ? trim($_POST['correo_titular']) : null;
        $direccion_corta_casa_titular = ! empty($_POST['direccion_corta_casa_titular']) ? trim($_POST['direccion_corta_casa_titular']) : null;
        $id_estado_pais = ! empty($_POST['id_estado_pais']) ? intval($_POST['id_estado_pais']) : null;
        $id_parentesco = ! empty($_POST['id_parentesco']) ? intval($_POST['id_parentesco']) : null;
        $id_tipo_de_empleado = ! empty($_POST['id_tipo_de_empleado']) ? intval($_POST['id_tipo_de_empleado']) : null;

        // PARTE DE LOS ENTES Y UNIVERSIDADES
        // Datos de la Cita
        $id_especialidad = ! empty($_POST['id_especialidad']) ? intval($_POST['id_especialidad']) : null;
        $fecha_de_cita = ! empty($_POST['fcita']) ? $_POST['fcita'] : null;
        $id_medico = ! empty($_POST['id_medico']) ? intval($_POST['id_medico']) : null;

        $tipo_institucion = $_POST['tipo_institucion'] ?? 'U';

        if ($tipo_institucion === 'U') {
            $id_universidad = ! empty($_POST['id_universidad']) ? $_POST['id_universidad'] : null;
            $id_ente = null;
            $id_direccion_general = null;
            $id_direccion_linea = null;
            $id_coordinacion = null;
        } else {
            $id_universidad = null;
            $id_ente = ! empty($_POST['id_ente']) ? $_POST['id_ente'] : null;
            $id_direccion_general = ! empty($_POST['id_direccion_general']) ? $_POST['id_direccion_general'] : null;
            $id_direccion_linea = ! empty($_POST['id_direccion_linea']) ? $_POST['id_direccion_linea'] : null;
            $id_coordinacion = ! empty($_POST['id_coordinacion']) ? $_POST['id_coordinacion'] : null;
        }

        /*
         * // Consultar paciente existente
         * $sql_verif = "SELECT id_paciente FROM public.paciente WHERE cedula_titular = :cedula";
         * $stmt_v = $conexion_bd->prepare($sql_verif);
         * $stmt_v->execute([':cedula' => $cedula_titular]);
         * $paciente_existente = $stmt_v->fetch(PDO::FETCH_ASSOC);
         */
        /* if (!$paciente_existente) { */
        // Insertar Paciente

        $sql_paciente = "INSERT INTO public.paciente 
        (id_usuario, id_nacionalidad, 
        cedula_titular, nombre_titular,
        apellido_titular, id_sexo, fecha_nacimiento_titular, 
        edad_titular, telefono_titular,
        telefono2_titular, correo_titular,
        direccion_corta_casa_titular, 
        id_estado_pais, id_parentesco, id_tipo_de_empleado, 
        id_universidad, id_ente, id_direccion_general, 
        id_direccion_linea, id_coordinacion) 
                        VALUES
        (:id_usuario, :id_nacionalidad,
        :cedula_titular, :nombre_titular,
        :apellido_titular, :id_sexo,
        :fecha_nacimiento_titular, :edad_titular,
        :telefono_titular, :telefono2_titular,
        :correo_titular, :direccion_corta_casa_titular,
        :id_estado_pais, :id_parentesco, :id_tipo_de_empleado,
        :id_universidad, :id_ente, :id_direccion_general, 
        :id_direccion_linea,:id_coordinacion)";

        $stmt_p = $conexion_bd->prepare($sql_paciente);
        $stmt_p->execute([
            ':id_usuario' => $id_usuario,
            ':id_nacionalidad' => $id_nacionalidad,
            ':cedula_titular' => $cedula_titular,
            ':nombre_titular' => $nombre_titular,
            ':apellido_titular' => $apellido_titular,
            ':id_sexo' => $id_sexo,
            ':fecha_nacimiento_titular' => $fecha_nacimiento_titular,
            ':edad_titular' => $edad_titular,
            ':telefono_titular' => $telefono_titular,
            ':telefono2_titular' => $telefono2_titular,
            ':correo_titular' => $correo_titular,
            ':direccion_corta_casa_titular' => $direccion_corta_casa_titular,
            ':id_estado_pais' => $id_estado_pais,
            ':id_parentesco' => $id_parentesco,
            ':id_tipo_de_empleado' => $id_tipo_de_empleado,
            'id_universidad' => $id_universidad,
            'id_ente' => $id_ente,
            'id_direccion_general' => $id_direccion_general,
            'id_direccion_linea' => $id_direccion_linea,
            'id_coordinacion' => $id_coordinacion
        ]);
        // echo "antes de la secuencia";
        // Obtener el id del paciente recién insertado
        // $id_paciente_registrado = $conexion_bd->lastInsertId('paciente_id_paciente_seq');
        // echo "después de la secuencia";
        // echo $id_paciente_registrado;

        /*
         * } else {
         * $id_paciente_registrado = $paciente_existente['id_paciente'];
         * }
         */

        $vsql = 'select max (id_titular) as numero from public.paciente';
        $valor = SelectFrom($conexion_bd, $vsql);
        foreach ($valor as $registro) {
            $id_paciente_registrado = $registro['numero'];
        }

        // $id_paciente_registrado = 11;
        // Insertar Cita relacionando los ID correspondientes
        $sql_cita = "INSERT INTO public.cita (id_usuario, id_especialidad, fecha_de_cita, id_medico, id_paciente, id_titular, fecha_de_registro, id_estado_cita) 
                     VALUES (:id_usuario, :id_especialidad, :fecha_de_cita, :id_medico, :id_paciente, :id_titular, CURRENT_TIMESTAMP, :id_estado_cita)";

        $stmt_c = $conexion_bd->prepare($sql_cita);
        $stmt_c->execute([
            ':id_usuario' => $id_usuario,
            ':id_especialidad' => $id_especialidad,
            ':fecha_de_cita' => $fecha_de_cita,
            ':id_medico' => $id_medico,
            ':id_paciente' => $id_paciente_registrado,
            ':id_titular' => $id_paciente_registrado,
            ':id_estado_cita' => "1"
        ]);

        // echo "antes del commit";
        $conexion_bd->commit();
        // echo "después del commit";

        if (isset($correo_titular)) {

            $mail = new PHPMailer(true);

            // try {
            // --- Configuración del Servidor SMTP ---
            // $mail->SMTPDebug = SMTP::DEBUG_SERVER; // Descomenta esta línea para ver errores detallados durante pruebas
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;

            // gmppeu@gmail.com

            // mhnyxmnzklpckglk

            // Tu dirección completa de Gmail
            $mail->Username = 'gmppeu@gmail.com';

            // Tu contraseña de aplicación de 16 dígitos (sin espacios)
            $mail->Password = 'mhnyxmnzklpckglk';

            // Cifrado TLS/STARTTLS
            // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            // $mail->Port = 587;

            // O bien puedes usar SSL en el puerto 465:
            // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            // $mail->Port = 465;

            // --- Remitente y Destinatarios ---
            $mail->setFrom('sistema.mppue@correo.com', 'Sistema MPPU');
            $mail->addAddress($correo_titular, '$correo_titular');

            // Si deseas responder a otra dirección:
            // $mail->addReplyTo('info@tu-dominio.com', 'Información');

            // --- Contenido del Correo ---
            $mail->isHTML(true); // Permitir contenido HTML
            $mail->Subject = 'Cita Medica';
            $mail->Body = '<a href="http://172.17.10.44/sgp/confirmarCita.php" target="_blank">Cita</a>';
            $mail->AltBody = 'Este es el cuerpo del mensaje en texto plano para clientes sin soporte HTML.';

            // --- Archivos Adjuntos (Opcional) ---
            // $mail->addAttachment('/ruta/al/archivo.pdf');

            // --- Enviar el correo ---

            $mail->send();

            // echo 'El mensaje ha sido enviado con éxito.';

            // } catch (Exception $e) {
            // echo "No se pudo enviar el mensaje. Error de PHPMailer: {$mail->ErrorInfo}";
            // }
        }

        if (function_exists('registrarTraza')) {
            registrarTraza($conexion_bd, 'Inserción', 'Citas paciente', "Se creó el Registro de Cita");
        }

        header("Location: citasRegistrar.php?exito=1");

        exit();
    } catch (Exception $ex) {
        $conexion_bd->rollBack();
        $error_msj = "No se pudo registrar: " . $ex->getMessage();
        echo "dentro del catch " . $error_msj;
    }
    // die();
}

// 2. Configuración de la vista
$titulo_formulario = "Nueva Cita";
$es_modo_ver = false;
$readonly = '';

$usuario_e = [
    'id_usuario' => $_SESSION['id_usuario'] ?? '',
    'cedula_titular' => '',
    'nombre_titular' => '',
    'apellido_titular' => '',
    'id_nacionalidad' => '',
    'fecha_nacimiento_titular' => '',
    'edad_titular' => '',
    'telefono_titular' => '',
    'telefono2_titular' => '',
    'correo_titular' => '',
    'id_sexo' => '',
    'direccion_corta_casa_titular' => '',
    'id_estado_pais' => '',
    'id_parentesco' => '',
    'id_tipo_de_empleado' => ''
];

// 3. Cargar Listas Desplegables
$nacionalidades = $conexion_bd->query("SELECT id_nacionalidad, nombre_nacionalidad FROM public.nacionalidad ORDER BY id_nacionalidad")->fetchAll(PDO::FETCH_ASSOC);
$especialidades = $conexion_bd->query("SELECT id_especialidad, nombre_especialidad FROM public.especialidad ORDER BY id_especialidad")->fetchAll(PDO::FETCH_ASSOC);
$medicos = $conexion_bd->query("SELECT id_medico, nombre_medico FROM public.medico ORDER BY id_medico")->fetchAll(PDO::FETCH_ASSOC);
$parentesco = $conexion_bd->query("SELECT id_parentesco, nombre_parentesco FROM public.parentesco ORDER BY id_parentesco")->fetchAll(PDO::FETCH_ASSOC);
$sexos = $conexion_bd->query("SELECT id_sexo, sexo AS nombre_sexo FROM public.sexo ORDER BY id_sexo")->fetchAll(PDO::FETCH_ASSOC);
$estados = $conexion_bd->query("SELECT id_estado_pais, nombre_estado_pais FROM public.estado_venezuela ORDER BY id_estado_pais")->fetchAll(PDO::FETCH_ASSOC);
$tipo_de_empleado = $conexion_bd->query("SELECT id_tipo_de_empleado, nombre_tipo_de_empleado FROM public.tipo_de_empleado ORDER BY id_tipo_de_empleado")->fetchAll(PDO::FETCH_ASSOC);
$universidad_data = $conexion_bd->query("SELECT id_universidad, nombre_universidad FROM universidad ORDER BY id_universidad DESC")->fetchAll(PDO::FETCH_ASSOC);
$entes_data = $conexion_bd->query("SELECT id_ente, nom_ente AS nombre_ente FROM ente ORDER BY id_ente DESC")->fetchAll(PDO::FETCH_ASSOC);
$nacionalidad_data = $conexion_bd->query("SELECT id_nacionalidad, nombre_nacionalidad FROM nacionalidad ORDER BY id_nacionalidad DESC")->fetchAll(PDO::FETCH_ASSOC);

// 4. Estructura de Interfaz
$valor = null;
$mi_menu_html = MostrarMenu($conexion_bd, $valor);
$mi_footer_html = MostrarFooter($conexion_bd, $valor);

$botones_html = '<a href="citasRegistrar.php" class="btn btn-outline-secondary btn-rounded px-4">Cancelar</a>
                 <button type="submit" name="guardar" class="btn btn-primary btn-rounded px-5">Crear Cita</button>';

$tbs->LoadTemplate('citasRegistrar.html', 'UTF-8');

$tbs->VarRef['botones_html'] = $botones_html;
$tbs->VarRef['mi_menu_html'] = $mi_menu_html;
$tbs->VarRef['mi_footer_html'] = $mi_footer_html;
$tbs->VarRef['titulo_formulario'] = $titulo_formulario;
$tbs->VarRef['readonly'] = $readonly;
$tbs->VarRef['error_msj'] = $error_msj;
$tbs->VarRef['mensaje_exito'] = $mensaje_exito;

// Fusionar datos y bloques
$tbs->MergeField('usuario_e', $usuario_e);
$tbs->MergeBlock('nacionalidad', $nacionalidades);
$tbs->MergeBlock('especialidad', $especialidades);
$tbs->MergeBlock('medico', $medicos);
$tbs->MergeBlock('sexo', $sexos);
$tbs->MergeBlock('parentesco', $parentesco);
$tbs->MergeBlock('estado', $estados);
$tbs->MergeBlock('tipo_de_empleado', $tipo_de_empleado);
$tbs->MergeBlock('universidad_opt', $universidad_data);
$tbs->MergeBlock('ente_opt', $entes_data);

$tbs->Show();
?>