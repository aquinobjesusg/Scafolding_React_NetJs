<?php

    
    // Variables para la consulta principal de consumibles
    $whereClauses = []; // Array para almacenar las condiciones WHERE
    $parametros = [];   // Array para almacenar los parámetros PDO

    $whereClauses[] = "d.id_consumibles IS NOT NULL"; // Esta condición parece ser siempre verdadera, considera si es necesaria.

    // Consulta SQL Base para el listado de consumibles
    $listadoConsumiblesSqlBase = "SELECT
                                        d.codigo_distribucion,
                                        MAX(d.fecha_distribucion) AS fecha_distribucion,
                                        MAX(f.nom_funcionario || ' ' || f.ape_funcionario) AS funcionario_principal,
                                        STRING_AGG(c.consumible || ' (' || d.cantidad_distribuidad || ' unidades)', ', ') AS detalles_consumibles,
                                        SUM(d.cantidad_distribuidad) AS cantidad_total_distribuida,
                                        MAX(d.observaciond) AS observaciond,
                                        d.codigo_distribucion AS id_para_editar
                                    FROM oticbienes.distribucion d
                                    LEFT JOIN oticbienes.funcionario f ON f.id_funcionario = d.id_funcionario
                                    LEFT JOIN oticbienes.consumibles c ON c.id_consumibles = d.id_consumibles";
                                    // Nota: GROUP BY y ORDER BY se añadirán después de la cláusula WHERE dinámica

    // Consulta SQL Base para el conteo de consumibles
    $consumiblesConteoSqlBase = "SELECT COUNT(*) AS total
                                 FROM oticbienes.distribucion d";


    if (isset($_POST['Buscar']))
    {
        // Se presionó el botón "Buscar"
        $buscarCodigo = trim($_POST['codigo_distribucion']);
        $fecha_desde = trim($_POST['fecha_desde']);
        $fecha_hasta = trim($_POST['fecha_hasta']);

        // --- Construcción dinámica de la cláusula WHERE basada en las condiciones de búsqueda ---

        // Condición 1: Si el campo 'Codigo Consumible' no está vacío
        if (!empty($buscarCodigo))
        {
            $whereClauses[] = "d.codigo_distribucion = :buscar_codigo";
            $parametros[':buscar_codigo'] = $buscarCodigo;
        }

        // Condición 2: Si AMBOS campos de fecha no están vacíos
        if (!empty($fecha_desde) && !empty($fecha_hasta))
        {
            $whereClauses[] = "d.fecha_distribucion BETWEEN :fecha_desde AND :fecha_hasta";
            $parametros[':fecha_desde'] = $fecha_desde;
            $parametros[':fecha_hasta'] = $fecha_hasta;
        }
    }

    // Construye la cláusula WHERE para ambas consultas
    $whereSql = '';
    if (!empty($whereClauses)) {
        $whereSql = " WHERE " . implode(" AND ", $whereClauses);
    }

    // --- Consulta SQL Final para el conteo de consumibles ---
    $consumiblesConteoSqlFinal = $consumiblesConteoSqlBase . $whereSql;

    // Preparar y ejecutar la consulta de conteo
    $consumiblesConteoPE = $conexion_bd->prepare($consumiblesConteoSqlFinal);
    $consumiblesConteoPE->execute($parametros);
    $consumiblesConteo = $consumiblesConteoPE->fetchColumn();


    // --- Consulta SQL Final para el listado de consumibles ---
    $listadoConsumiblesSqlFinal = $listadoConsumiblesSqlBase . $whereSql .
                                  " GROUP BY d.codigo_distribucion
                                    ORDER BY MAX(d.fecha_distribucion) DESC, d.codigo_distribucion DESC;";


    // Preparar y ejecutar la consulta de listado
    $listadoConsumiblesPE = $conexion_bd->prepare($listadoConsumiblesSqlFinal);
    $listadoConsumiblesPE->execute($parametros);
    $listadoConsumibles = $listadoConsumiblesPE->fetchAll(PDO::FETCH_ASSOC); // Importante: FETCH_ASSOC

    // --- Integración con el Motor de Plantillas (TBS) ---
    // Asegúrate de que $tbs esté inicializado y la plantilla cargada aquí, por ejemplo:
    // $tbs = new clsTinyButStrong;
    // $tbs->LoadTemplate('nombre_de_tu_plantilla.html');

    $tbs->MergeBlock('consumiblesConteo', array(array('total' => $consumiblesConteo)));
    $tbs->MergeBlock('listadoConsumibles', $listadoConsumibles);

?>