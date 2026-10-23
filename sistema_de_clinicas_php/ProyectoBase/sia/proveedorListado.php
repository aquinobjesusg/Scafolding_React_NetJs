<?php

	// ...
	// --- LISTADO DE PROVEEDOR ---
	$queryListadoProveedor = 	"SELECT id_proveedor, nom_proveedor, rif_proveedor,
									correo_proveedor, telefono_proveedor 
                        		FROM proveedor 
                        		ORDER BY id_proveedor DESC;";


		
	$stmtListadoProveedor = $conexion_bd->prepare($queryListadoProveedor);
	$stmtListadoProveedor->execute();
	$listadoProveedor = $stmtListadoProveedor->fetchAll(PDO::FETCH_ASSOC);

	// ...
	// --- CONTEO DE REGISTROS EN PROVEEDOR ---
	$queryConteoProveedor = "SELECT COUNT(*) AS total FROM proveedor;";
	
	$stmtConteoProveedor = $conexion_bd->prepare($queryConteoProveedor);
	$stmtConteoProveedor->execute();
	$totalRegistros = $stmtConteoProveedor->fetchColumn(0); 

	// ...
	// --- Integración con el Motor de Plantillas (TBS) ---

	$tbs->MergeBlock('conteoProveedor', array(array('total' => $totalRegistros)));
	$tbs->MergeBlock('listadoProveedor', $listadoProveedor);

?>