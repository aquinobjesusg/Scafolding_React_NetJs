<?php
require_once ('ipg2-bdv.php');

if( isset($_POST) ){		

	//Instanciación de la API de pago con usuario y clave
	$PaymentProcess = new IpgBdv2 ("70527030","z0tTsYq3");
	
	$response = $PaymentProcess->checkPayment($_POST['token']);
    echo json_encode($response);
}
else{
	echo 'Not a post';
}
?>