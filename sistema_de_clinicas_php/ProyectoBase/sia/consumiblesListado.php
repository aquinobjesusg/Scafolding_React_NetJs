<?php

    
    // Variables para la consulta principal de consumibles
    $whereClauses = []; // Array para almacenar las condiciones WHERE
    $parametros = [];    // Array para almacenar los parámetros PDO



    // Consulta SQL Base para el listado de consumibles
    $listadoConsumiblesSqlBase = "SELECT c.id_consumibles,
                                         c.codigo_consumible,
                                         c.fecha_ingresoc,
                                         c.consumible,
                                         c.cantidad_ingresadac,
                                         m.nom_medida,
                                         c.observacionc
                                  FROM oticbienes.consumibles c
                                  LEFT JOIN medida m ON m.id_medida = c.id_medida";

    // Consulta SQL Base para el conteo de consumibles
    $consumiblesConteoSqlBase = "SELECT COUNT(*) AS total
                                 FROM oticbienes.consumibles c
                                 LEFT JOIN medida m ON m.id_medida = c.id_medida";


    if (isset($_POST['Buscar']))
    {
        // Se presionó el botón "Buscar"
        $buscarCodigo = trim($_POST['codigo_consumible']);
        $fecha_desde = trim($_POST['fecha_desde']);
        $fecha_hasta = trim($_POST['fecha_hasta']);

        // --- Construcción dinámica de la cláusula WHERE basada en las condiciones de búsqueda ---

        // Condición 1: Si el campo 'Codigo Consumible' no está vacío
        if (!empty($buscarCodigo))
        {
            $whereClauses[] = "c.codigo_consumible = :buscar_codigo";
            $parametros[':buscar_codigo'] = $buscarCodigo;
        }

        // Condición 2: Si AMBOS campos de fecha no están vacíos
        if (!empty($fecha_desde) && !empty($fecha_hasta))
        {
            $whereClauses[] = "c.fecha_ingresoc BETWEEN :fecha_desde AND :fecha_hasta";
            $parametros[':fecha_desde'] = $fecha_desde;
            $parametros[':fecha_hasta'] = $fecha_hasta;
        }

      
    } 


    // --- Consulta SQL Final para el conteo de consumibles ---
    $consumiblesConteoSqlFinal = $consumiblesConteoSqlBase;

    // Solo añade la cláusula WHERE si el array $whereClauses tiene elementos.
    // Si no se usó el botón "Buscar" o si todos los campos de búsqueda estaban vacíos,
    // $whereClauses estará vacío (excepto si descomentaste las condiciones base arriba).
    if (!empty($whereClauses))
    {
        $consumiblesConteoSqlFinal .= " WHERE " . implode(" AND ", $whereClauses);
    }

    // Preparar y ejecutar la consulta de conteo
    $consumiblesConteoPE = $conexion_bd->prepare($consumiblesConteoSqlFinal);
    $consumiblesConteoPE->execute($parametros);
    $consumiblesConteo = $consumiblesConteoPE->fetchColumn();


    // --- Consulta SQL Final para el listado de consumibles ---
    $listadoConsumiblesSqlFinal = $listadoConsumiblesSqlBase;

    // Aplica la misma lógica para el WHERE clause que en la consulta de conteo
    if (!empty($whereClauses))
    {
        $listadoConsumiblesSqlFinal .= " WHERE " . implode(" AND ", $whereClauses);
    }

    // Ordenar el listado de consumibles (esto siempre se aplica)
    $listadoConsumiblesSqlFinal .= " ORDER BY c.id_consumibles DESC;";

    // Preparar y ejecutar la consulta de listado
    $listadoConsumiblesPE = $conexion_bd->prepare($listadoConsumiblesSqlFinal);
    $listadoConsumiblesPE->execute($parametros);
    $listadoConsumibles = $listadoConsumiblesPE->fetchAll();


    // --- Integración con el Motor de Plantillas (TBS) ---
  
    $tbs->MergeBlock('consumiblesConteo', array(array('total' => $consumiblesConteo)));
    $tbs->MergeBlock('listadoConsumibles', $listadoConsumibles);

?>