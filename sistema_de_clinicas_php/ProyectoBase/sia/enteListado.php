<?php

	
    $queryListadoEnte = "SELECT id_ente, nom_ente, siglas_ente 
    				FROM ente 
    				ORDER BY id_ente DESC;";

    $stmtListadoEnte = $conexion_bd->prepare($queryListadoEnte);
	$stmtListadoEnte->execute();
	$listadoEnte = $stmtListadoEnte->fetchAll(PDO::FETCH_ASSOC);

	$queryConteoEnte = "SELECT COUNT(*) AS total FROM ente;";

	$stmtConteoEnte = $conexion_bd->prepare($queryConteoEnte);
	$stmtConteoEnte->execute();
	$totalRegistros = $stmtConteoEnte->fetchColumn(0);


	$tbs->MergeBlock('conteoEnte', array(array('total' => $totalRegistros)));
	$tbs->MergeBlock('listadoEnte', $listadoEnte); 
  
?>