<?php     

# Funciona que hace el Select
function objetoSelet($conexion_bd, $sql, $titulo, $campoId, $campoValor, $col = 4) {
    $datos = SelectFrom($conexion_bd,$sql);
    $codigoSelect = '';
    
    $codigoSelect = '
    
    <div class="col-md-'.$col.'">
    <label class="form-label fw-bold">'.$titulo.'</label> <select
    name="id_especialidad" id="id_especialidad"
        class="form-select shadow-sm js-example-basic-single" required>
        <option value="">Seleccionar</option>';

    foreach ($datos as $registro) {
        $codigoSelect = $codigoSelect . '<option value="'.$registro[$campoId].'">'.$registro[$campoValor].'</option>';
    }
    
    $codigoSelect = $codigoSelect . '</select>
        </div>';
       
    
  
  return $codigoSelect;
}

function obtenerIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP']; // IP compartida
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR']; // Pasada por proxy
    } else {
        return $_SERVER['REMOTE_ADDR']; // Conexión directa
    }
}

function obtenerUsuario() {
        return $_SESSION['id_usuario']; // Conexión directa
}

function obtenerFechaHora() {
  date_default_timezone_set('America/Caracas');
  $fechaHoraActual = date('Y-m-d H:i:s');
  return $fechaHoraActual; 
}


function registrarTraza($conexion_bd, $accion, $modulo, $texto)  {

    $Valor = $accion . ' ' . $modulo . ' ' ;

    $trazabilidad = '';
    $trazabilidad = $trazabilidad . "INSERT INTO trazabilidad ";
    $trazabilidad = $trazabilidad . "(fecha_de_registro,evento,id_usuario,direccion_ip,tx_datos) ";
    $trazabilidad = $trazabilidad . "VALUES ('".obtenerFechaHora()."','".$Valor."','".obtenerUsuario()."', '".obtenerIP()."', '" . $texto . "') ";
    $stmt = $conexion_bd->prepare($trazabilidad);
    $stmt->execute();

}  