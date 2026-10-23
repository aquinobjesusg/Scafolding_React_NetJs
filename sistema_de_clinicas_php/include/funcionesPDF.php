<?php     

# Funciona que hace el Select
function MostrarReporte($conexion_bd,$cedula_buscar) {
  $codigo = '';

        $sql_busca_ced = "SELECT id_titular, cedula_titular, nombre_titular, apellido_titular FROM titular WHERE cedula_titular = :cedula LIMIT 1";
        $stmt_b = $conexion_bd->prepare($sql_busca_ced);
        $stmt_b->execute([':cedula' => $cedula_buscar]);
        $resultado = $stmt_b->fetch(PDO::FETCH_ASSOC);

  return $resultado;
}

