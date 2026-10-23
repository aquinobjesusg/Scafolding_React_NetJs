<?php
namespace Correo;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Correo
{
    public string $asunto;
    public string $mensaje;
    public string $pie;
    public string $cDestino;
    public string $cRemitente;
    public string $pRemitente;
    public string $nRemitente;   // <-- declarada
    public string $nDestino;     // <-- declarada
    public string $error;
    public string $aviso;
    private string $body;

    public function __construct()
    {
        $this->asunto      = 'Asunto';
        $this->mensaje     = '';
        $this->nRemitente  = 'Nombre del Remitente/Sistema';
        $this->cRemitente  = 'gmppeu@gmail.com';
        $this->pRemitente  = 'mhnyxmnzklpckglk';
        $this->cDestino    = 'aquinobjesusg@gmail.com';
        $this->nDestino    = 'jesus';
        $this->pie         = '';
        $this->body        = '';
        $this->aviso       = ' <br>Mensaje ENVIADO correctamente al Correo.<br>';
        $this->error       = '';
    }

    public function enviarCorreo(): bool
    {
        // Si no hay destino, enviar al remitente
        if ($this->cDestino === '') {
            $this->cDestino = $this->cRemitente;
        }

        if ($this->nDestino === '') {
            $this->nDestino = $this->cDestino;
        }

        // Pie predeterminado si está vacío
        if ($this->pie === '') {
            $this->pie  = "La distribución de esta cuenta de correo electrónico, ";
            $this->pie .= "la reproducción, reenvío o apropiación de la información ";
            $this->pie .= "aquí contenida, sin el consentimiento previo del autor, está ";
            $this->pie .= "penado por Ley con prisión o multa, de acuerdo a lo contemplado en el Capítulo III ";
            $this->pie .= "de los Delitos contra la Privacidad de las Personas y las Comunicaciones, ";
            $this->pie .= "de la Ley Especial contra los Delitos Informáticos, ";
            $this->pie .= "publicada en Gaceta Oficial de la República Bolivariana de Venezuela #37.313 del 30/10/2001.";
        }

        // Construir el cuerpo del mensaje si no se ha establecido manualmente
        if ($this->body === '') {
            // Wordwrap solo para texto plano (no necesario para HTML, pero se puede mantener)
            $this->mensaje = wordwrap($this->mensaje, 70, "\n", false);
            $this->pie     = wordwrap($this->pie, 70, "\n", false);

            // Usar UTF-8 en el meta
            $this->body  = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8'/></head><body>";
            $this->body .= "<h2>" . htmlspecialchars($this->nRemitente) . "</h2><br>";
            $this->body .= "<div>" . nl2br(htmlspecialchars($this->mensaje)) . "</div>";
            $this->body .= "<br><br><br><br><br>";
            $this->body .= "<div align='justify' style='font-size: xx-small;'>" . nl2br(htmlspecialchars($this->pie)) . "</div>";
            $this->body .= "<br></body></html>";
        }

        $mail = new PHPMailer();
        try {
            $mail->isSMTP();
            // Configuración SMTP para Gmail (recomendado TLS en puerto 587)
            $mail->Host       = 'smtp.gmail.com';
            $mail->SMTPAuth   = true;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // 'tls'
            $mail->Port       = 587;

            $mail->setLanguage('es');
            $mail->CharSet = 'UTF-8';   // <-- charset UTF-8 (ya no hace falta utf8_decode)
            $mail->IsHTML(true);
         //   $mail->Timelimit = 10;
            $mail->Timeout   = 5;
            $mail->SMTPDebug = 0;

            $mail->Username = $this->cRemitente;
            $mail->Password = $this->pRemitente;

            $mail->setWordWrap(50);
            $mail->setFrom($this->cRemitente, $this->nRemitente);

            // Ya no usamos utf8_decode porque el charset es UTF-8
            $mail->Subject = $this->asunto;
            $mail->Body    = $this->body;

            $mail->addAddress($this->cDestino, $this->nDestino);
            $mail->send();
            $mail->clearAddresses();

            return true;
        } catch (Exception $e) {
            $this->error = "No se pudo enviar el correo. Error: {$mail->ErrorInfo}";
            return false;
        }
    }
}