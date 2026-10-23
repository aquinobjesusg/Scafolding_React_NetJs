<?php

	// ...
	// --- LISTADO DE ALMACEN ---
	$queryListadoClasificacion = "SELECT id_clasificacion, nom_clasificacion 
							FROM clasificacion 
							ORDER BY id_clasificacion DESC;";


			
	$stmtListadoClasificacion = $conexion_bd->prepare($queryListadoClasificacion);
	$stmtListadoClasificacion->execute();
	$listadoClasificacion = $stmtListadoClasificacion->fetchAll(PDO::FETCH_ASSOC);
	
	// --- CONTEO DE REGISTROS EN ALMACEN ---
	$queryConteoClasificacion = "SELECT COUNT(*) AS total FROM clasificacion;";


	
	$stmtConteoClasificacion = $conexion_bd->prepare($queryConteoClasificacion);
	$stmtConteoClasificacion->execute();
	$totalRegistros = $stmtConteoClasificacion->fetchColumn(0); 

	// ...
	// --- Integración con el Motor de Plantillas (TBS) ---

	$tbs->MergeBlock('conteoClasificacion', array(array('total' => $totalRegistros)));
	$tbs->MergeBlock('listadoClasificacion', $listadoClasificacion);

?>