<?php
session_start();
header('Content-Type: image/png');

$im = imagecreatetruecolor(120, 30);
$bg = imagecolorallocate($im, 255, 255, 255);
$fg = imagecolorallocate($im, 0, 0, 0);
imagefill($im, 0, 0, $bg);
imagestring($im, 5, 5, 5, "TEST", $fg);
imagepng($im);
imagedestroy($im);

$_SESSION['captcha'] = "TEST"; //Valor de prueba

?>
