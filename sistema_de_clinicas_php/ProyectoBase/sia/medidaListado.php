<?php

	// ...
	// --- LISTADO DE ALMACEN ---
	$queryListadoMedida = "SELECT id_medida, nom_medida 
							FROM medida 
							ORDER BY id_medida DESC;";


			
	$stmtListadoMedida = $conexion_bd->prepare($queryListadoMedida);
	$stmtListadoMedida->execute();
	$listadoMedida = $stmtListadoMedida->fetchAll(PDO::FETCH_ASSOC);
	
	// --- CONTEO DE REGISTROS EN ALMACEN ---
	$queryConteoMedida = "SELECT COUNT(*) AS total FROM medida;";


	
	$stmtConteoMedida = $conexion_bd->prepare($queryConteoMedida);
	$stmtConteoMedida->execute();
	$totalRegistros = $stmtConteoMedida->fetchColumn(0); 

	// ...
	// --- Integración con el Motor de Plantillas (TBS) ---

	$tbs->MergeBlock('conteoMedida', array(array('total' => $totalRegistros)));
	$tbs->MergeBlock('listadoMedida', $listadoMedida);

?>