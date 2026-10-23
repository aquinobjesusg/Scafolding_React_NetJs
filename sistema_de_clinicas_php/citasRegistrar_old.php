<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Cargar el autoloader de Composer
require 'vendor/autoload.php';

include("include/header_php.php");

$error_msj = '';
$mensaje_exito = '';

try {
    $conexion_bd = new PDO("pgsql:host=$dbhost;port=$dbport;dbname=$dbdatabase;user=$dbuser;password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    die("Error de conexión: " . $e->getMessage());
}

// Mensaje de éxito tras redirección
if (isset($_GET['exito']) && $_GET['exito'] == 1) {
    $mensaje_exito = '¡La cita y los datos del paciente se registraron exitosamente!';
}

// 1. Procesamiento al enviar el formulario (Captura botón o tecla Enter)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     //echo "después del post";
    try {
        $conexion_bd->beginTransaction();

        // Conversión segura de campos numéricos (convierte "" a null)
        $id_usuario = !empty($_POST['id_usuario']) ? intval($_POST['id_usuario']) : null;
        $id_nacionalidad = !empty($_POST['id_nacionalidad']) ? intval($_POST['id_nacionalidad']) : null;
        $cedula_titular = !empty($_POST['cedula_titular']) ? intval($_POST['cedula_titular']) : null;
        $nombre_titular = !empty($_POST['nombre_titular']) ? trim($_POST['nombre_titular']) : null;
        $apellido_titular = !empty($_POST['apellido_titular']) ? trim($_POST['apellido_titular']) : null;
        $id_sexo = !empty($_POST['id_sexo']) ? intval($_POST['id_sexo']) : null;
        $fecha_nacimiento_titular = !empty($_POST['fecha_nacimiento_titular']) ? $_POST['fecha_nacimiento_titular'] : null;

        // Cálculo automático de edad si el campo llega vacío
        if (!empty($_POST['edad_titular'])) {
            $edad_titular = intval($_POST['edad_titular']);
        } elseif (!empty($fecha_nacimiento_titular)) {
            $fecha_nac = new DateTime($fecha_nacimiento_titular);
            $hoy = new DateTime();
            $edad_titular = $hoy->diff($fecha_nac)->y;
        } else {
            $edad_titular = null;
        }

        $telefono_titular = !empty($_POST['telefono_titular']) ? trim($_POST['telefono_titular']) : null;
        $telefono2_titular = !empty($_POST['telefono2_titular']) ? trim($_POST['telefono2_titular']) : null;
        $correo_titular = !empty($_POST['correo_titular']) ? trim($_POST['correo_titular']) : null;
        $direccion_corta_casa_titular = !empty($_POST['direccion_corta_casa_titular']) ? trim($_POST['direccion_corta_casa_titular']) : null;
        $id_estado_pais = !empty($_POST['id_estado_pais']) ? intval($_POST['id_estado_pais']) : null;
        $id_parentesco = !empty($_POST['id_parentesco']) ? intval($_POST['id_parentesco']) : null;
        $id_tipo_de_empleado = !empty($_POST['id_tipo_de_empleado']) ? intval($_POST['id_tipo_de_empleado']) : null;

//PARTE DE LOS ENTES Y UNIVERSIDADES
        // Datos de la Cita
        $id_especialidad = !empty($_POST['id_especialidad']) ? intval($_POST['id_especialidad']) : null;
        $fecha_de_cita = !empty($_POST['fcita']) ? $_POST['fcita'] : null;
        $id_medico = !empty($_POST['id_medico']) ? intval($_POST['id_medico']) : null;

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


        /*  // Consultar paciente existente
          $sql_verif = "SELECT id_paciente FROM public.paciente WHERE cedula_titular = :cedula";
          $stmt_v = $conexion_bd->prepare($sql_verif);
          $stmt_v->execute([':cedula' => $cedula_titular]);
          $paciente_existente = $stmt_v->fetch(PDO::FETCH_ASSOC);
  */
        /*  if (!$paciente_existente) {*/
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
            ':id_usuario'                   => $id_usuario,
            ':id_nacionalidad'              => $id_nacionalidad, 
            ':cedula_titular'               => $cedula_titular,
            ':nombre_titular'               => $nombre_titular, 
            ':apellido_titular'             => $apellido_titular, 
            ':id_sexo'                      => $id_sexo, 
            ':fecha_nacimiento_titular'     => $fecha_nacimiento_titular, 
            ':edad_titular'                 => $edad_titular, 
            ':telefono_titular'             => $telefono_titular, 
            ':telefono2_titular'            => $telefono2_titular, 
            ':correo_titular'               => $correo_titular,
            ':direccion_corta_casa_titular' => $direccion_corta_casa_titular, 
            ':id_estado_pais'               => $id_estado_pais,
            ':id_parentesco'                => $id_parentesco,
            ':id_tipo_de_empleado'          => $id_tipo_de_empleado, 
            'id_universidad'                => $id_universidad,
            'id_ente'                       => $id_ente,
            'id_direccion_general'          => $id_direccion_general,
            'id_direccion_linea'            => $id_direccion_linea,
            'id_coordinacion'               => $id_coordinacion
        ]);
      // echo "antes de la secuencia";
        // Obtener el id del paciente recién insertado
         //$id_paciente_registrado = $conexion_bd->lastInsertId('paciente_id_paciente_seq');
         // echo "después de la secuencia";
           // echo $id_paciente_registrado;

        /*} else {
            $id_paciente_registrado = $paciente_existente['id_paciente'];
        }*/

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
        
        //echo "antes del commit";
        $conexion_bd->commit();
        //echo "después del commit";

        if( isset( $correo_titular ) ) {

$mail = new PHPMailer(true);

//try {
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
    //$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
    //$mail->Port       = 587; 

    // O bien puedes usar SSL en el puerto 465:
    //  $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    //  $mail->Port       = 465;

    // --- Remitente y Destinatarios ---
    $mail->setFrom('sistema.mppue@correo.com', 'Sistema MPPU');
    $mail->addAddress($correo_titular, '$correo_titular');
    
    // Si deseas responder a otra dirección:
    // $mail->addReplyTo('info@tu-dominio.com', 'Información');

    // --- Contenido del Correo ---
    $mail->isHTML(true); // Permitir contenido HTML
    $mail->Subject = 'Cita Medica';
    $mail->Body    = '<a href="http://172.17.10.44/sgp/confirmarCita.php" target="_blank">Cita</a>';
    $mail->AltBody = 'Este es el cuerpo del mensaje en texto plano para clientes sin soporte HTML.';

    // --- Archivos Adjuntos (Opcional) ---
    // $mail->addAttachment('/ruta/al/archivo.pdf'); 

    // --- Enviar el correo ---
   
   
     $mail->send();
   
   
   // echo 'El mensaje ha sido enviado con éxito.';

//} catch (Exception $e) {
 //   echo "No se pudo enviar el mensaje. Error de PHPMailer: {$mail->ErrorInfo}";
//}
}

        if (function_exists('registrarTraza')) {
            registrarTraza($conexion_bd, 'Inserción', 'Citas paciente', "Se creó el Registro de Cita");
        }

        header("Location: citasRegistrar_old.php?exito=1");


        exit;


    } catch (Exception $ex) {
        $conexion_bd->rollBack();
        $error_msj = "No se pudo registrar: " . $ex->getMessage();
         echo "dentro del catch " . $error_msj;
    }
//    die();
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

$tbs->LoadTemplate('citasRegistrar_old.html', 'UTF-8');

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