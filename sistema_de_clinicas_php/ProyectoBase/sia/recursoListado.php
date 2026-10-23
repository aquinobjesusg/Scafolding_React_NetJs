<?php

// Variables para la consulta principal
$whereClauses = []; // Array para almacenar las condiciones WHERE
$parametros = []; // Array para almacenar los parámetros PDO

// ----------------------------------------------------------------------
// 1. Procesar la búsqueda (si existe) para construir la cláusula WHERE
// ----------------------------------------------------------------------

if (isset($_POST['Buscar']))
{
    // Se presionó el botón "Buscar"
    $fecha_desde = trim($_POST['fecha_desde']);
    $fecha_hasta = trim($_POST['fecha_hasta']);

    // Condición: Si AMBOS campos de fecha no están vacíos
    // **NOTA IMPORTANTE:** La tabla principal en tu SELECT es 'ingreso' con el alias 'i'.
    // Tu cláusula WHERE debe usar el alias correcto, que es 'i' para fecha_ingreso.
    if (!empty($fecha_desde) && !empty($fecha_hasta))
    {
        $whereClauses[] = "i.fecha_ingreso BETWEEN :fecha_desde AND :fecha_hasta";
        $parametros[':fecha_desde'] = $fecha_desde;
        $parametros[':fecha_hasta'] = $fecha_hasta;
    }
}

// ----------------------------------------------------------------------
// 2. Construir la cláusula WHERE y la consulta SQL final
// ----------------------------------------------------------------------

// Si hay condiciones, las unimos con ' AND ' y las anteponemos con ' WHERE '
$whereSql = '';
if (!empty($whereClauses)) {
    $whereSql = " WHERE " . implode(" AND ", $whereClauses);
}


// Consulta SQL Base para el listado de consumibles
$listadoRecursoSqlBase = "SELECT id_ingreso, orden_ingreso, fecha_ingreso,
                                 nom_proveedor, nom_almacen,
                                 nom_articulo, c.nom_clasificacion, m.nom_medida, cantidad_ingreso, observacion_i
                          FROM ingreso i
                          INNER JOIN proveedor p on p.id_proveedor = i.id_proveedor
                          INNER JOIN almacen a on a.id_almacen = i.id_almacen
                          INNER JOIN articulo a2 on a2.id_articulo = i.id_articulo
                          INNER JOIN medida m ON m.id_medida = a2.id_medida
                          INNER JOIN clasificacion c ON c.id_clasificacion = a2.id_clasificacion"
                          . $whereSql .
                          " ORDER BY id_ingreso DESC";


// Consulta SQL Base para el conteo de consumibles (debe incluir WHERE)
$recursoConteoSqlBase = "SELECT COUNT(*) AS total FROM ingreso i" . $whereSql;


// ----------------------------------------------------------------------
// 3. Preparar y ejecutar las consultas con los parámetros y WHERE correctos
// ----------------------------------------------------------------------

// Preparar y ejecutar la consulta de listado
$listadoRecursoPE = $conexion_bd->prepare($listadoRecursoSqlBase);
$listadoRecursoPE->execute($parametros); // Se usan los parámetros (vacíos si no hubo búsqueda)
$listadoRecurso = $listadoRecursoPE->fetchAll();

// Preparar y ejecutar la consulta de conteo
$recursoConteoPE = $conexion_bd->prepare($recursoConteoSqlBase);
$recursoConteoPE->execute($parametros); // Se usan los parámetros
$recursoConteo = $recursoConteoPE->fetchColumn();


// --- Integración con el Motor de Plantillas (TBS) ---

$tbs->MergeBlock('recursoConteo', array(array('total' => $recursoConteo)));
$tbs->MergeBlock('listadoRecurso', $listadoRecurso);

?>