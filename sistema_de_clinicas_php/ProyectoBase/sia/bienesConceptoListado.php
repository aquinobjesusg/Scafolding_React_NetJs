<?php
// 

//  Consulta de listado 
$queryListadoConcepto = "SELECT id_concepto, nom_concepto 
                           FROM oticbienes.concepto
                           ORDER BY id_concepto DESC";


try {
    // Ejecutar Listado
    $stmtListadoConcepto = $conexion_bd->prepare($queryListadoConcepto);
    $stmtListadoConcepto->execute();
    $listadoConcepto = $stmtListadoConcepto->fetchAll(PDO::FETCH_ASSOC);



    $tbs->MergeBlock('listadoConcepto', $listadoConcepto);

} catch (PDOException $e) {
    // Si falla algo aquí, lo reportamos para no ver la página en blanco
    error_log("Error en bienesEstadoListado.php: " . $e->getMessage());
}
?>