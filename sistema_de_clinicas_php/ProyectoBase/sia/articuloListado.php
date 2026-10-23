<?php

	// ...
	// --- LISTADO DE ALMACEN ---
	$queryListadoArticulo = "SELECT id_articulo, 
								nom_articulo, nom_medida, nom_clasificacion 
	                        FROM articulo a
	                        INNER JOIN medida m on m.id_medida = a.id_medida 
	                        INNER JOIN clasificacion c on c.id_clasificacion = a.id_clasificacion
	                        ORDER BY id_articulo DESC";


	
	// ...
	// --- CONTEO DE REGISTROS EN ALMACEN ---
	$queryConteoArticulo = "SELECT COUNT(*) AS total FROM articulo;";

		
	$stmtListadoArticulo = $conexion_bd->prepare($queryListadoArticulo);
	$stmtListadoArticulo->execute();
	$listadoArticulo = $stmtListadoArticulo->fetchAll(PDO::FETCH_ASSOC);
	
	$stmtConteoArticulo = $conexion_bd->prepare($queryConteoArticulo);
	$stmtConteoArticulo->execute();
	$totalRegistros = $stmtConteoArticulo->fetchColumn(0); 

	// ...
	// --- Integración con el Motor de Plantillas (TBS) ---

	$tbs->MergeBlock('conteoArticulo', array(array('total' => $totalRegistros)));
	$tbs->MergeBlock('listadoArticulo', $listadoArticulo);

?>