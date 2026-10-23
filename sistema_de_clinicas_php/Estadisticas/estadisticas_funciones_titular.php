<?php     

function MostrarEspecialidadad($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Especialidades
            </div>

            <table class="specialties-table">
                <tbody>
                    <!-- Fisiatria -->
                    <tr>
                        <td class="col-specialty">Fisiatria</td>
                        <td class="col-quantity">4</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Pediatria</td>
                        <td class="col-quantity">4</td>
                    </tr>
                    <!-- TOTAL row -->
                    <tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>8</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>

';
  return $codigoSelect;


}


function MostrarTipoPaciente($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Tipo Paciente
            </div>

            <table class="specialties-table">
                <tbody>
                    <!-- Fisiatria -->
                    <tr>
                        <td class="col-specialty">Activo</td>
                        <td class="col-quantity">3</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Jubilado</td>
                        <td class="col-quantity">4</td>
                    </tr>
                    <tr>
                        <td class="col-specialty">Cortesia</td>
                        <td class="col-quantity">1</td>
                    </tr>
                    <!-- TOTAL row -->
                    <tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>8</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>

';
  return $codigoSelect;


}


function MostrarEspecialidadGenero($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Especialidad - Genero
            </div>

            <table class="specialties-table">
                <tbody>
                    <!-- Fisiatria -->
                    <tr>
                        <td class="col-specialty">Fisiatria</td>
                        <td class="col-specialty">Masculino</td>
                        <td class="col-quantity">2</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Fisiatria</td>
                        <td class="col-specialty">Femenino</td>
                        <td class="col-quantity">2</td>
                    </tr>
                        
                    <tr>
                        <td class="col-specialty">Pediatría</td>
                        <td class="col-specialty">Masculino</td>
                        <td class="col-quantity">2</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Pediatría</td>
                        <td class="col-specialty">Femenino</td>
                        <td class="col-quantity">2</td>
                    </tr>
                        
                    <!-- TOTAL row -->
                    <tr class="total-row">
                        <td class="col-specialty"><strong> </strong></td>
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>8</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>

';
  return $codigoSelect;


}





function MostrarGenero($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Genero
            </div>

            <table class="specialties-table">
                <tbody>
                    <!-- Fisiatria -->
                    <tr>
                        <td class="col-specialty">Masculino</td>
                        <td class="col-quantity">4</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Femenino</td>
                        <td class="col-quantity">4</td>
                    </tr>
                    <!-- TOTAL row -->
                    <tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>8</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>

';
  return $codigoSelect;


}


function MostrarEspecialidadTipoPaciente($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Especialidad - Tipo Paciente
            </div>

            <table class="specialties-table">
                <tbody>
                    <!-- Fisiatria -->
                    <tr>
                        <td class="col-specialty">Fisiatria</td>
                        <td class="col-specialty">Activo</td>
                        <td class="col-quantity">2</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Fisiatria</td>
                        <td class="col-specialty">Jubilado</td>
                        <td class="col-quantity">2</td>
                    </tr>
                        
                    <tr>
                        <td class="col-specialty">Pediatría</td>
                        <td class="col-specialty">Activo</td>
                        <td class="col-quantity">2</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Pediatría</td>
                        <td class="col-specialty">Jubilado</td>
                        <td class="col-quantity">2</td>
                    </tr>
                        
                    <!-- TOTAL row -->
                    <tr class="total-row">
                        <td class="col-specialty"><strong> </strong></td>
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>8</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>

';
  return $codigoSelect;


}


function MostrarGeneroTipoPaciente($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Genero - Tipo Paciente
            </div>

            <table class="specialties-table">
                <tbody>
                    <!-- Fisiatria -->
                    <tr>
                        <td class="col-specialty">Masculino</td>
                        <td class="col-specialty">Activo</td>
                        <td class="col-quantity">2</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Femenino</td>
                        <td class="col-specialty">Jubilado</td>
                        <td class="col-quantity">2</td>
                    </tr>
                        
                    <tr>
                        <td class="col-specialty">Masculino</td>
                        <td class="col-specialty">Activo</td>
                        <td class="col-quantity">2</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Femenino</td>
                        <td class="col-specialty">Jubilado</td>
                        <td class="col-quantity">2</td>
                    </tr>
                        
                    <!-- TOTAL row -->
                    <tr class="total-row">
                        <td class="col-specialty"><strong> </strong></td>
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>8</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>

';
  return $codigoSelect;


}


function MostrarEstado($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Estado de la Cita
            </div>

            <table class="specialties-table">
                <tbody>
                    <!-- Fisiatria -->
                    <tr>
                        <td class="col-specialty">Pendiente</td>
                        <td class="col-quantity">3</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Atendida</td>
                        <td class="col-quantity">4</td>
                    </tr>
                                        <tr>
                        <td class="col-specialty">Cancelada</td>
                        <td class="col-quantity">1</td>
                    </tr>

                    <!-- TOTAL row -->
                    <tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>8</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>

';
  return $codigoSelect;


}

function MostrarEspecialidadEstado($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Especialidad - Estado
            </div>

            <table class="specialties-table">
                <tbody>
                    <!-- Fisiatria -->
                    <tr>
                        <td class="col-specialty">Fisiatria</td>
                        <td class="col-specialty">Pendiente</td>
                        <td class="col-quantity">2</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Pediatria</td>
                        <td class="col-specialty">Cancelada</td>
                        <td class="col-quantity">2</td>
                    </tr>
                        
                    <tr>
                        <td class="col-specialty">Fisiatria</td>
                        <td class="col-specialty">Anuladas</td>
                        <td class="col-quantity">2</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Pediatria</td>
                        <td class="col-specialty">Reprogramadas</td>
                        <td class="col-quantity">2</td>
                    </tr>
                        
                    <!-- TOTAL row -->
                    <tr class="total-row">
                        <td class="col-specialty"><strong> </strong></td>
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>8</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>

';
  return $codigoSelect;


}


function MostrarGeneroEstado($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Genero - Estado
            </div>

            <table class="specialties-table">
                <tbody>
                    <!-- Fisiatria -->
                    <tr>
                        <td class="col-specialty">Masculino</td>
                        <td class="col-specialty">Pendiente</td>
                        <td class="col-quantity">2</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Femenino</td>
                        <td class="col-specialty">Cancelada</td>
                        <td class="col-quantity">2</td>
                    </tr>
                        
                    <tr>
                        <td class="col-specialty">Masculino</td>
                        <td class="col-specialty">Anuladas</td>
                        <td class="col-quantity">2</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Femenino</td>
                        <td class="col-specialty">Reprogramadas</td>
                        <td class="col-quantity">2</td>
                    </tr>
                        
                    <!-- TOTAL row -->
                    <tr class="total-row">
                        <td class="col-specialty"><strong> </strong></td>
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>8</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>

';
  return $codigoSelect;


}


function MostrarTipoPacienteEstado($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Tipo Paciente - Estado
            </div>

            <table class="specialties-table">
                <tbody>
                    <!-- Fisiatria -->
                    <tr>
                        <td class="col-specialty">Activos</td>
                        <td class="col-specialty">Pendiente</td>
                        <td class="col-quantity">2</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Jubilados</td>
                        <td class="col-specialty">Cancelada</td>
                        <td class="col-quantity">2</td>
                    </tr>
                        
                    <tr>
                        <td class="col-specialty">Cortesia</td>
                        <td class="col-specialty">Anuladas</td>
                        <td class="col-quantity">2</td>
                    </tr>
                    <!-- Pediatria -->
                    <tr>
                        <td class="col-specialty">Activos</td>
                        <td class="col-specialty">Reprogramadas</td>
                        <td class="col-quantity">2</td>
                    </tr>
                        
                    <!-- TOTAL row -->
                    <tr class="total-row">
                        <td class="col-specialty"><strong> </strong></td>
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>8</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>

';
  return $codigoSelect;


}


function MostrarEstadisticasBasicas($conexion_bd,$valor) {

  $codigoSelect = '';
  $codigoSelect =  $codigoSelect  . MostrarEspecialidadad($conexion_bd,$valor);
  $codigoSelect =  $codigoSelect  . MostrarGenero($conexion_bd,$valor);
  $codigoSelect =  $codigoSelect  . MostrarEspecialidadGenero($conexion_bd,$valor);

  $codigoSelect =  $codigoSelect  . MostrarTipoPaciente($conexion_bd,$valor);
  $codigoSelect =  $codigoSelect  . MostrarEspecialidadTipoPaciente($conexion_bd,$valor);
  $codigoSelect =  $codigoSelect  . MostrarGeneroTipoPaciente($conexion_bd,$valor);

  $codigoSelect =  $codigoSelect  . MostrarEstado($conexion_bd,$valor);
  $codigoSelect =  $codigoSelect  . MostrarEspecialidadEstado($conexion_bd,$valor);
  $codigoSelect =  $codigoSelect  . MostrarGeneroEstado($conexion_bd,$valor);
  $codigoSelect =  $codigoSelect  . MostrarTipoPacienteEstado($conexion_bd,$valor);

  $trazabilidad = '';
  $trazabilidad = $trazabilidad . "INSERT INTO trazabilidad ";
  $trazabilidad = $trazabilidad . "(fecha_de_registro,evento,id_usuario,direccion_ip) ";
  $trazabilidad = $trazabilidad . "VALUES ('".obtenerFechaHora()."','ESTADISTICAS-TITULAR"."','".obtenerUsuario()."', '".obtenerIP()."') ";
  $stmt = $conexion_bd->prepare($trazabilidad);
  $stmt->execute();
  
  
  return $codigoSelect;

}


