<?php

	// ...
	// --- LISTADO DE DEPENDENCIA ---
	$queryListadoDireccionGeneral = "SELECT id_dependencia, nom_dependencia, 
									ubicacion_dependencia, nom_ente 
                                  FROM dependencia d
                                  INNER JOIN ente e on e.id_ente = d.id_ente
                                  ORDER BY id_dependencia DESC;";



	$stmtListadoDireccionGeneral = $conexion_bd->prepare($queryListadoDireccionGeneral);
	$stmtListadoDireccionGeneral->execute();
	$listadoDireccionGeneral = $stmtListadoDireccionGeneral->fetchAll(PDO::FETCH_ASSOC);
	
	// ...
	// --- CONTEO DE REGISTROS EN DEPENDENCIA ---
	$queryConteoDireccionGeneral = "SELECT COUNT(*) AS total FROM dependencia;";
	
	$stmtConteoDireccionGeneral = $conexion_bd->prepare($queryConteoDireccionGeneral);
	$stmtConteoDireccionGeneral->execute();
	$totalRegistros = $stmtConteoDireccionGeneral->fetchColumn(0); 

	// ...
	// --- Integración con el Motor de Plantillas (TBS) ---

	$tbs->MergeBlock('conteoDireccionGeneral', array(array('total' => $totalRegistros)));
	$tbs->MergeBlock('listadoDireccionGeneral', $listadoDireccionGeneral);

?>