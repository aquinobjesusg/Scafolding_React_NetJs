<?php     

function MostrarEspecialidadad($conexion_bd,$valor) {

 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Especialidades
            </div>

            <table class="specialties-table">
                <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['ver_especialidad'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    

                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>
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
                <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['ver_tipo_de_empleado'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    

                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>
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
                <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['ver_especialidad'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['ver_sexo'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    

                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-specialty"><strong></strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>
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
                <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['ver_sexo'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    

                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>
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
                <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['ver_especialidad'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['ver_tipo_de_empleado'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    

                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-specialty"><strong></strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>
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
                Genero - Tipo de Paciente
            </div>

            <table class="specialties-table">
                <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['ver_sexo'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['ver_tipo_de_empleado'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    

                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-specialty"><strong></strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>
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
                <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['ver_estado_cita'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    

                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>
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
                <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['ver_especialidad'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['ver_estado_cita'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    

                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-specialty"><strong></strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>
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
                <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['ver_sexo'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['ver_estado_cita'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    

                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-specialty"><strong></strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>
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
                Tipo de Paciente - Estado
            </div>

            <table class="specialties-table">
                <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['ver_tipo_de_empleado'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['ver_estado_cita'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    

                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-specialty"><strong></strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>

';

  return $codigoSelect;


}


function MostrarEstadoP($conexion_bd,$valor) {

 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Estados del País
            </div>

            <table class="specialties-table">
                <tbody> ';
                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['nombre_estado_pais'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    

                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>

';
  return $codigoSelect;


}


function MostrarEntes($conexion_bd,$valor) {

 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Entes
            </div>

            <table class="specialties-table">
                <tbody> ';
                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['siglas_ente'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    

                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>


    </div>

';
  return $codigoSelect;


}



function MostrarEstadisticasBasicas($conexion_bd,$valor) {

$vsql = "SELECT ver_especialidad(id_especialidad), COUNT(id_especialidad) FROM cita GROUP BY id_especialidad;";
$MostrarEspecialidadad = SelectFrom($conexion_bd, $vsql);

$vsql = "SELECT ver_sexo(paciente.id_sexo), COUNT(paciente.id_sexo) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.id_sexo;";
$MostrarGenero = SelectFrom($conexion_bd, $vsql);

$vsql = "SELECT ver_especialidad(id_especialidad), ver_sexo(paciente.id_sexo), COUNT(paciente.id_sexo) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY cita.id_especialidad, paciente.id_sexo;";
$MostrarEspecialidadGenero = SelectFrom($conexion_bd, $vsql);


//SELECT '*TIPO DE EMPLEADO*' AS campo, '' AS campo2, '' AS campo3;
$vsql = "SELECT '' AS campo, ver_tipo_de_empleado(paciente.tipo_de_empleado), COUNT(paciente.tipo_de_empleado) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.tipo_de_empleado;";
$MostrarTipoPaciente = SelectFrom($conexion_bd, $vsql);

//
$vsql = "SELECT ver_tipo_de_empleado(paciente.tipo_de_empleado), ver_sexo(paciente.id_sexo), COUNT(paciente.id_sexo) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.tipo_de_empleado, paciente.id_sexo;";
$MostrarGeneroTipoPaciente = SelectFrom($conexion_bd, $vsql);

//
$vsql = "SELECT ver_tipo_de_empleado(paciente.tipo_de_empleado), ver_especialidad(id_especialidad), COUNT(cita.id_especialidad) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.tipo_de_empleado, cita.id_especialidad;";
$MostrarEspecialidadTipoPaciente = SelectFrom($conexion_bd, $vsql);


//SELECT '*ESTADO DE CITA*' AS campo, '' AS campo2, '' AS campo3;

$vsql = "SELECT ver_estado_cita(id_estado_cita), COUNT(id_estado_cita) FROM cita GROUP BY id_estado_cita;";
$MostrarEstado = SelectFrom($conexion_bd, $vsql);

//
$vsql = "SELECT ver_estado_cita(id_estado_cita), ver_sexo(paciente.id_sexo), COUNT(paciente.id_sexo) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY cita.id_estado_cita, paciente.id_sexo;";
$MostrarGeneroEstado = SelectFrom($conexion_bd, $vsql);

$vsql = "SELECT ver_estado_cita(id_estado_cita), ver_especialidad(id_especialidad), COUNT(cita.id_especialidad) FROM cita GROUP BY cita.id_estado_cita, cita.id_especialidad;";
$MostrarEspecialidadEstado = SelectFrom($conexion_bd, $vsql);

$vsql = "SELECT ver_tipo_de_empleado(paciente.tipo_de_empleado), ver_estado_cita(id_estado_cita), COUNT(cita.id_especialidad) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.tipo_de_empleado, cita.id_estado_cita;";
$MostrarTipoPacienteEstado = SelectFrom($conexion_bd, $vsql);

$vsql = "SELECT (SELECT estado_venezuela.nombre_estado_pais FROM estado_venezuela WHERE paciente.id_estado_pais = estado_venezuela.id_estado_pais ), COUNT(paciente.id_estado_pais) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.id_estado_pais;";
$MostrarEstadoP = SelectFrom($conexion_bd, $vsql);

$vsql = "SELECT (SELECT ente.siglas_ente FROM ente WHERE paciente.id_ente = ente.id_ente ), COUNT(paciente.id_ente) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.id_ente;";
$MostrarEntes = SelectFrom($conexion_bd, $vsql);



  $codigoSelect = '';
  $codigoSelect =  $codigoSelect  . MostrarEspecialidadad($conexion_bd,$MostrarEspecialidadad);
  $codigoSelect =  $codigoSelect  . MostrarGenero($conexion_bd,$MostrarGenero);
  $codigoSelect =  $codigoSelect  . MostrarTipoPaciente($conexion_bd,$MostrarTipoPaciente);
  $codigoSelect =  $codigoSelect  . MostrarEstado($conexion_bd,$MostrarEstado);

  $codigoSelect =  $codigoSelect  . MostrarEstadoP($conexion_bd,$MostrarEstadoP);

  $codigoSelect =  $codigoSelect  . MostrarEntes($conexion_bd,$MostrarEntes);

  $codigoSelect =  $codigoSelect  . MostrarEspecialidadGenero($conexion_bd,$MostrarEspecialidadGenero);

  $codigoSelect =  $codigoSelect  . MostrarEspecialidadTipoPaciente($conexion_bd,$MostrarEspecialidadTipoPaciente);
  $codigoSelect =  $codigoSelect  . MostrarGeneroTipoPaciente($conexion_bd,$MostrarGeneroTipoPaciente);

  $codigoSelect =  $codigoSelect  . MostrarEspecialidadEstado($conexion_bd,$MostrarEspecialidadEstado);
  $codigoSelect =  $codigoSelect  . MostrarGeneroEstado($conexion_bd,$MostrarGeneroEstado);
  $codigoSelect =  $codigoSelect  . MostrarTipoPacienteEstado($conexion_bd,$MostrarTipoPacienteEstado);

  $trazabilidad = '';
  $trazabilidad = $trazabilidad . "INSERT INTO trazabilidad ";
  $trazabilidad = $trazabilidad . "(fecha_de_registro,evento,id_usuario,direccion_ip) ";
  $trazabilidad = $trazabilidad . "VALUES ('".obtenerFechaHora()."','ESTADISTICAS-BASICAS"."','".obtenerUsuario()."', '".obtenerIP()."') ";
  $stmt = $conexion_bd->prepare($trazabilidad);
  $stmt->execute();
  
  
  return $codigoSelect;

}


