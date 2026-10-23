<?php
// 

//  Consulta de listado 
$queryListadoEstado = "SELECT id_estado, nom_estado 
                       FROM oticbienes.estado
                       WHERE id_estado != 1 
                       ORDER BY id_estado DESC";


try {
    // Ejecutar Listado
    $stmtListadoEstado = $conexion_bd->prepare($queryListadoEstado);
    $stmtListadoEstado->execute();
    $listadoEstado = $stmtListadoEstado->fetchAll(PDO::FETCH_ASSOC);


 
    $tbs->MergeBlock('listadoEstado', $listadoEstado);

} catch (PDOException $e) {
  
    error_log("Error en bienesEstadoListado.php: " . $e->getMessage());
}
?>