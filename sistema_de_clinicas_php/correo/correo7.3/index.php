<!DOCTYPE html>
<?php
  require_once(__DIR__ . '/vendor/autoload.php');
  require_once('Correo.php');

  $rstCorreo = new Correo\Correo();

  $rstCorreo->asunto   = 'Aqui va el Asunto';
  $rstCorreo->cDestino = "aquinobjesusg@gmail.com";
  $rstCorreo->nDestino = "YoSoyYo";
  $rstCorreo->mensaje  = "Aqui va el Mensaje....";

  $rr = $rstCorreo->enviarCorreo();
  
  die('.Listo');

?>
