<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Cargar el autoloader de Composer
require 'vendor/autoload.php';

$mail = new PHPMailer(true);

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
    $mail->setFrom('sistema.mppue@correo.com', 'Sistema MPPU');
    $mail->addAddress('aquinobjesusg@gmail.com', 'jon');
    $mail->addAddress('gabimend67@gmail.com', 'gabi');
    
    // Si deseas responder a otra dirección:
    // $mail->addReplyTo('info@tu-dominio.com', 'Información');

    // --- Contenido del Correo ---
    $mail->isHTML(true); // Permitir contenido HTML
    $mail->Subject = 'Asunto del correo de prueba';
    $mail->Body    = '<a href="http://172.17.10.44/sgp/" target="_blank">Confirmar Sistema</a><h1>¡Hola!</h1><p>Este es un correo enviado mediante <b>PHPMailer</b> usando Gmail.</p> ';
    $mail->AltBody = 'Este es el cuerpo del mensaje en texto plano para clientes sin soporte HTML.';

    // --- Archivos Adjuntos (Opcional) ---
    // $mail->addAttachment('/ruta/al/archivo.pdf'); 

    // --- Enviar el correo ---
    $mail->send();
    echo 'El mensaje ha sido enviado con éxito.';

} catch (Exception $e) {
    echo "No se pudo enviar el mensaje. Error de PHPMailer: {$mail->ErrorInfo}";
}