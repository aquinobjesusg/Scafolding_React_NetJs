<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Cargar el autoloader de Composer
require 'vendor/autoload.php';

$mail = new PHPMailer(true);

if( !isset($_GET['correo']) ){
    $_GET['correo'] = "Jhoannapantoja914@gmail.com";
}

if( isset($_GET['correo']) ){

try {
    // --- Configuración del Servidor SMTP ---
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER; // Descomenta esta línea para ver errores detallados durante pruebas
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    
//gmppeu@gmail.com

//mhnyxmnzklpckglk

    // Tu dirección completa de Gmail
    $mail->Username   = 'gmppeu@gmail.com'; 
    
    // Tu contraseña de aplicación de 16 dígitos (sin espacios)
    $mail->Password   = 'mhnyxmnzklpckglk'; 
    
    // Cifrado TLS/STARTTLS
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
    $mail->Port       = 587; 

    // O bien puedes usar SSL en el puerto 465:
    // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    // $mail->Port       = 465;

    // --- Remitente y Destinatarios ---
    $mail->setFrom('sistema.mppue@correo.com', 'SGP - Gestión de Citas');
	$mail->addAddress($_GET['correo'], 'Johanna Pantoja');
	$mail->addAddress("aquinobjesusg@gmail.com", 'Jesús Aquino');
    
    // Si deseas responder a otra dirección:
    // $mail->addReplyTo('info@tu-dominio.com', 'Información');

    // --- Contenido del Correo ---
    $mail->isHTML(true); // Permitir contenido HTML
    $mail->Subject = 'Asunto del correo de prueba';
    $mail->Body    = '
	
<html lang="es"><head></head><body class="bg-light"><div>
  
    <meta charset="UTF-8">
    <!-- muestra correctamente las ´ y la ñ -->
    <!-- hace que el diseño se adapte en cualquier pantalla -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- title: muestra el titulo -->
    <title>SGP - CITA</title>
    <!-- importa la librería de bootstrap para que funcione las clases de diseño (botones y columnas )
    toma los archivos dentro de la carpeta css e indica la relación con el html-->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
  <!-- el cuerpo y la navegación -->
  
  
    <center>
    <h4>SGP - Sistema Gestión de Citas </h4>
	 <hr>
    </center>

			

			<div class="card shadow-sm border-0 btn-rounded">
				<div class="card-body p-4">
					<h5 class="fw-bold text-dark mb-4">Ud. Posee una cita registrada en el Sistema con los siguientes datos:</h5>
										<!-- cita -->

										<hr>
										<h5 class="fw-bold text-dark mb-3">Datos de la Cita</h5>
										<hr>
										<div class="row g-3 mb-4">

											<div class="col-md-3">
												<label class="form-label fw-bold">Epecialidad</label> 
												<input type="text" name="especialidad"  class="form-control shadow-sm" value="Medicina General" readonly>
											</div>
											<div class="col-md-3">
												<label class="form-label fw-bold">Medico</label> 
												<input type="text" name="medico"  class="form-control shadow-sm" value="Vicdeney" readonly>
											</div>
											<div class="col-md-3">
												<label class="form-label fw-bold">Turno</label> 
												<input type="text" name="Turno"  class="form-control shadow-sm" value="M" readonly>
											</div>

											<div class="col-md-3">
												<label class="form-label fw-bold">Fecha</label> 
												<input type="text" name="Fecha"  class="form-control shadow-sm" value="23/09/2026" readonly>
											</div>

										</div>



										<!-- cita -->
				

										<!-- paciente -->




										<!-- SECCIÓN DEL PACIENTE -->
										<hr>
										<h5 class="fw-bold text-dark mb-3">Datos del Paciente</h5>
										<hr>
										<div class="row g-3 mb-3">
											<div class="col-md-2">
												<label class="form-label fw-bold">Nacionalidad</label> 
												<input type="text" name="nac"  class="form-control shadow-sm" value="Venezolano" readonly>
											</div>

											<div class="col-md-2">
												<label class="form-label fw-bold">Cédula</label> <input type="number" name="cedula_titular"  class="form-control shadow-sm" value="12457234" readonly>
											</div>

											<div class="col-md-4">
												<label class="form-label fw-bold">Nombre(s)</label> <input type="text" name="nombre_titular"  class="form-control shadow-sm" value="Johanna" readonly>
											</div>

											<div class="col-md-4">
												<label class="form-label fw-bold">Apellido(s)</label> <input type="text" name="apellido_titular"  class="form-control shadow-sm" value="Pantoja" readonly>
											</div>
										</div>

										<div class="row g-3 mb-3">
											<div class="col-md-2">
												<label class="form-label fw-bold">Sexo</label> <input type="text" name="apellido_titular"  class="form-control shadow-sm" value="Femenino" readonly>											
												</div>

											<div class="col-md-3">
												<label class="form-label fw-bold">Fecha de Nacimiento</label> <input type="text" name="fecha_nacimiento_titular" id="fecha_nacimiento_titular"  class="form-control shadow-sm" value="26/05/2005" readonly>
											</div>

											<div class="col-md-2">
												<label class="form-label fw-bold">Edad</label> <input type="text" name="edad_titular" id="edad_titular"  class="form-control shadow-sm bg-light" value="25" readonly>
											</div>

											<div class="col-md-2">
												<label class="form-label fw-bold">Teléfono 1</label> <input type="text" name="telefono_titular"  class="form-control shadow-sm" value="04121352689" readonly>
											</div>

											<div class="col-md-3">
												<label class="form-label fw-bold">Teléfono 2</label> <input type="text" name="telefono2_titular"  class="form-control shadow-sm" value="" readonly>
											</div>
										</div>

										<div class="row g-3 mb-4">
											<div class="col-md-3">
												<label class="form-label fw-bold">Correo Electrónico</label> <input type="email" name="correo_titular" size="80" class="form-control shadow-sm" value="Jhoannapantoja914@gmail.com"  readonly>
											</div>

											<div class="col-md-3">
												<label class="form-label fw-bold">Dirección Corta</label> <input type="text" name="direccion_corta_casa_titular"  class="form-control shadow-sm" value="Guatire" readonly>
											</div>

											<div class="col-md-3">
												<label class="form-label fw-bold">Estado de Visita</label> 
												<input type="text" name="direccion_corta_casa_titular"  class="form-control shadow-sm" value="Distrito Capital" readonly>
											</div>

											<div class="col-md-3">
												<label class="form-label fw-bold">Parentesco</label> 
												<input type="text" name="direccion_corta_casa_titular"  class="form-control shadow-sm" value="Hija" readonly>
											</div>





										</div>


											<div class="row g-3 mb-4">

<hr>
												<h5 class="fw-bold text-dark mb-3">Datos del Titular</h5>
												<hr>

										<div class="row g-3 mb-3">
											<div class="col-md-2">
												<label class="form-label fw-bold">Nacionalidad</label> 
												<input type="text" name="nac"  class="form-control shadow-sm" value="Venezolano" readonly>
											</div>

											<div class="col-md-2">
												<label class="form-label fw-bold">Cédula</label> <input type="number" name="cedula_titular"  class="form-control shadow-sm" value="11558578" readonly>
											</div>

											<div class="col-md-4">
												<label class="form-label fw-bold">Nombre(s)</label> <input type="text" name="nombre_titular"  class="form-control shadow-sm" value="Jesús" readonly>
											</div>

											<div class="col-md-4">
												<label class="form-label fw-bold">Apellido(s)</label> <input type="text" name="apellido_titular"  class="form-control shadow-sm" value="Aquino" readonly>
											</div>
										</div>

										<div class="row g-3 mb-3">
											<div class="col-md-2">
												<label class="form-label fw-bold">Sexo</label> <input type="text" name="apellido_titular"  class="form-control shadow-sm" value="Femenino" readonly>											
												</div>

											<div class="col-md-3">
												<label class="form-label fw-bold">Fecha de Nacimiento</label> <input type="text" name="fecha_nacimiento_titular" id="fecha_nacimiento_titular"  class="form-control shadow-sm" value="14/07/1973" readonly>
											</div>

											<div class="col-md-2">
												<label class="form-label fw-bold">Edad</label> <input type="text" name="edad_titular" id="edad_titular"  class="form-control shadow-sm bg-light" value="53" readonly>
											</div>

											<div class="col-md-2">
												<label class="form-label fw-bold">Teléfono 1</label> <input type="text" name="telefono_titular"  class="form-control shadow-sm" value="04121352689" readonly>
											</div>

											<div class="col-md-3">
												<label class="form-label fw-bold">Teléfono 2</label> <input type="text" name="telefono2_titular"  class="form-control shadow-sm" value="" readonly>
											</div>
										</div>

										<div class="row g-3 mb-4">
											<div class="col-md-3">
												<label class="form-label fw-bold">Correo Electrónico</label> <input type="email" name="correo_titular"  class="form-control shadow-sm"  size="80" value="aquinobjesusg@gmail.com" readonly>
											</div>

											<div class="col-md-3">
												<label class="form-label fw-bold">Dirección Corta</label> <input type="text" name="direccion_corta_casa_titular"  class="form-control shadow-sm" value="Av Sucre" readonly>
											</div>


										</div>





											<!-- FORMULARIO cortesia  -->
										</div>

									</div>

									<br>


        
  

        
</div></body></html>	


	';
    $mail->AltBody = 'Este es el cuerpo del mensaje en texto plano para clientes sin soporte HTML.';

    // --- Archivos Adjuntos (Opcional) ---
    // $mail->addAttachment('/ruta/al/archivo.pdf'); 

    // --- Enviar el correo ---
    $mail->send();
    echo json_encode([
        "success"=>1,
        "mensaje"=>'El mensaje ha sido enviado con éxito.'
        ]);

} catch (Exception $e) {
    echo json_encode([
        "success"=>-1,
        "mensaje"=>'No pudo enviar el correo ' . $e
        ]);

}

} else {
    echo json_encode([
        "success"=>-2,
        "mensaje"=>'Faltan campos para enviar '
        ]);

}

?>
