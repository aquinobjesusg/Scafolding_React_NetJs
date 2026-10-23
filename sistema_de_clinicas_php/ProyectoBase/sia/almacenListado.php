<?php

	// ...
	// --- LISTADO DE ALMACEN ---
	$queryListadoAlmacen = "SELECT id_almacen, nom_almacen, nom_ente 
	                        FROM almacen a
	                        INNER JOIN ente e on e.id_ente = a.id_ente 
	                        ORDER BY id_almacen DESC;";


	
	// ...
	// --- CONTEO DE REGISTROS EN ALMACEN ---
	$queryConteoAlmacen = "SELECT COUNT(*) AS total FROM almacen;";

		
	$stmtListadoAlmacen = $conexion_bd->prepare($queryListadoAlmacen);
	$stmtListadoAlmacen->execute();
	$listadoAlmacen = $stmtListadoAlmacen->fetchAll(PDO::FETCH_ASSOC);
	
	$stmtConteoAlmacen = $conexion_bd->prepare($queryConteoAlmacen);
	$stmtConteoAlmacen->execute();
	$totalRegistros = $stmtConteoAlmacen->fetchColumn(0); 

	// ...
	// --- Integración con el Motor de Plantillas (TBS) ---

	$tbs->MergeBlock('conteoAlmacen', array(array('total' => $totalRegistros)));
	$tbs->MergeBlock('listadoAlmacen', $listadoAlmacen);

?>