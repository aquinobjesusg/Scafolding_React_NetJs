<?php
// 

// Consulta de listado 
$queryListadoClasificacion = "SELECT id_clasificacionbien, nom_clasificacionbien 
                       FROM oticbienes.clasificacionbien
                       WHERE id_clasificacionbien != 1 
                       ORDER BY id_clasificacionbien DESC";


try {
    // Ejecutar Listado
    $stmtListadoClasificacion = $conexion_bd->prepare($queryListadoClasificacion);
    $stmtListadoClasificacion->execute();
    $listadoClasificacion = $stmtListadoClasificacion->fetchAll(PDO::FETCH_ASSOC);


   

    $tbs->MergeBlock('listadoClasificacion', $listadoClasificacion);

} catch (PDOException $e) {
   
    error_log("Error en bienesEstadoListado.php: " . $e->getMessage());
}
?>