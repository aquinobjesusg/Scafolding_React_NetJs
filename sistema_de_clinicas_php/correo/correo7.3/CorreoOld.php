<?php
namespace Correo;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;

class Correo{

  public $asunto, $mensaje, $pie, $cDestino, $cRemitente, $pRemitente;
  public $error, $aviso;
  private $body;

  function __construct() 
  {
    $this->asunto      = 'Asunto';
    $this->mensaje     = '';
    $this->nRemitente  = 'Nombre del Remitente/Sistema';
    $this->cRemitente  = 'gmppeu@gmail.com';
    $this->pRemitente  = 'mhnyxmnzklpckglk';
    $this->cDestino    = '';
    $this->nDestino    = '';
    $this->pie         = '';
    $this->body        = '';
    $this->aviso       = ' <br>Mensaje ENVIADO correctamente al Correo.<br>';
    $this->error       = '';
  }

  public function enviarCorreo(): bool
  {

    if ($this->cDestino===''){
      $this->cDestino = $this->cRemitente;
    }

    if ($this->nDestino===''){
      $this->nDestino = $this->cDestino;
    }

    if ($this->pie===''){
      $this->pie  = "La distribuci&oacute;n de esta cuenta de correo electr&oacute;nico,";
      $this->pie .= "la reproducci&oacute;n, reenv&iacute;o o apropiaci&oacute;n de la informaci&oacute;n";
      $this->pie .= "aqu&iacute; contenida, sin el consentimiento previo del autor, est&aacute;";
      $this->pie .= "penado por Ley con prisi&oacute;n o multa, de acuerdo a lo contemplado en el Cap&iacute;tulo III";
      $this->pie .= "de los Delitos contra la Privacidad de las Personas y las Comunicaciones,";
      $this->pie .= "de la Ley Especial contra los Delitos Inform&aacute;ticos,";
      $this->pie .= "publicada en Gaceta Oficial de la Rep&uacute;blica Bolivariana de Venezuela #37.313 del 30/10/2001.";
    }
  
    if ($this->body===''){
      $this->mensaje = wordwrap($this->mensaje,70,"\n",false);
      $this->pie     = wordwrap($this->pie,70,"\n",false);

      $this->body  = "<html> <head> <meta http-equiv='Content-Type' content='text/html; charset=ISO-8859-1'/> </head> <body>";
      $this->body .= "<h2>".$this->nRemitente."</h2><br>";
      $this->body .= "<div>".$this->mensaje."</div>";
      $this->body .= "<br><br><br><br><br>";
      $this->body .= "<div align='justify' style='font-size: xx-small;' >".$this->pie."</div>";
      $this->body .= "<br> </body> </html>";
    }

    $mail = new PHPMailer();
    try {

      $mail->isSMTP();                                            
      $mail->SMTPSecure = 'ssl';
      $mail->Host = 'ssl://smtp.gmail.com';
      $mail->SMTPAuth = true;                                   
      //$mail->Port     = 587;                                    
      $mail->Port       = 465;

      $mail->setLanguage('es');
      $mail->CharSet = 'UTF-8';
      $mail->IsHTML(true);
      $mail->Timelimit = 10;
      $mail->Timeout   = 5;
      $mail->SMTPDebug = 0; 

      $mail->Username   = $this->cRemitente;
      $mail->Password   = $this->pRemitente;
      $mail->SMTPAuth   = true;
      
      $mail->setWordWrap(50);
      $mail->From     = $this->cRemitente;
      $mail->FromName = $this->nRemitente;
     
      $mail->Subject  = utf8_decode( $this->asunto );
      $mail->Body     = utf8_decode( $this->body );

      $mail->AddAddress($this->cDestino,$this->nDestino);
      $mail->send();
      $mail->ClearAddresses();

      return true;

    } catch (Exception $e) {

      $this->error = "No se pudo enviar el correo. Error: {$mail->ErrorInfo}";

      return false;
    }

  }

}
