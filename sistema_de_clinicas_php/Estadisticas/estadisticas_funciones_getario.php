<?php     


function MostrarEtario_Especialidadad($conexion_bd,$valor) {

$vsql = "SELECT nombre_etario, desde, hasta FROM etario;";
$Etario = SelectFrom($conexion_bd, $vsql);



 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Especialidades - Etario
            </div>

            <table class="specialties-table">
            <thead>
                <tr>
                    <th class="col-specialty">Especialidad</th>
                    <th class="col-quantity">Cantidad</th>';
                    foreach ($Etario as $et) {
                        $codigoSelect = $codigoSelect . '<th class="col-quantity">' . $et['nombre_etario'] . '</th>';
                    }

                $codigoSelect = $codigoSelect . '</tr>
            </thead>

            <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['ver_especialidad'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    


                    $gedad = "SELECT id_cita, ver_paciente(id_titular) id_titular, ver_paciente(id_paciente) id_paciente, fecha_de_registro, fecha_de_cita, ver_especialidad(id_especialidad) id_especialidad, ver_usuario(id_usuario) id_usuario, ver_medico(id_medico) id_medico, observacion, ver_estado_cita(id_estado_cita) id_estado_cita, ver_motivo_consulta( id_motivo_consulta ) id_motivo_consulta, calcular_edad(id_titular) edad
                    FROM public.cita WHERE ver_especialidad(id_especialidad) = '" . $registro['ver_especialidad'] . "'";
                    $gEtario = SelectFrom($conexion_bd, $gedad);

                    foreach ($gEtario as $ed) {
                       // $codigoSelect = $codigoSelect . '<br> ' . $ed['id_especialidad'] . ' - ' . $ed['edad'] ;
                    }

                    foreach ($Etario as $et) {
                        $si = 0;
                        foreach ($gEtario as $ed) {

                            if( $ed['edad'] >= $et['desde'] && $ed['edad'] <= $et['hasta'] && $ed['id_especialidad']  == $registro['ver_especialidad'] ) {
                                $si++;
                            } else {
                                
                            }

                        }
                        if( $si > 0 ) {
                            $codigoSelect = $codigoSelect . '<th class="col-quantity">'.$si.'</th>';
                        } else {
                            $codigoSelect = $codigoSelect . '<th class="col-quantity"> </th>';
                        }
                    }



                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>';

                                            foreach ($Etario as $et) {
                        $codigoSelect = $codigoSelect . '<th class="col-quantity">0</th>';
                    }

                    $codigoSelect = $codigoSelect . '</tr>
                </tbody>
            </table>
        </div>


    </div>

';


/* $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Especialidades
            </div>

            <table class="specialties-table1">
            <thead>
                <tr>
                    <th class="col-specialty">Especialidad</th>
                    <th class="col-quantity">Cantidad</th>
                    <th class="col-quantity">0 - 4</th>
                    <th class="col-quantity">5 - 10</th>
                    <th class="col-quantity">11 - 15</th>
                    <th class="col-quantity">16 - 20</th>
                    <th class="col-quantity">20 - 30</th>
                    <th class="col-quantity">30 - 40</th>
                    <th class="col-quantity">40 - 50</th>
                    <th class="col-quantity">50 - 60</th>
                    <th class="col-quantity">60 - 70</th>
                    <th class="col-quantity">70 - 80</th>
                    <th class="col-quantity">80 - 90</th>
                    <th class="col-quantity">90 - 100</th>
                </tr>
            </thead>
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

';*/
  return $codigoSelect;


}


function MostrarEtario_TipoPaciente($conexion_bd,$valor) {
$vsql = "SELECT nombre_etario, desde, hasta FROM etario;";
$Etario = SelectFrom($conexion_bd, $vsql);

 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Tipo de Paciente - Etario
            </div>

            <table class="specialties-table">
            <thead>
                <tr>
                    <th class="col-specialty">Tipo de Paciente</th>
                    <th class="col-quantity">Cantidad</th>';
                    foreach ($Etario as $et) {
                        $codigoSelect = $codigoSelect . '<th class="col-quantity">' . $et['nombre_etario'] . '</th>';
                    }

                $codigoSelect = $codigoSelect . '</tr>
            </thead>

            <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['ver_tipo_de_empleado'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    


                    $gedad = "SELECT id_cita, (SELECT tipo_de_empleado.nombre_tipo_de_empleado FROM tipo_de_empleado WHERE paciente.tipo_de_empleado = tipo_de_empleado.id_tipo_de_empleado ), ver_paciente(cita.id_titular) id_titular, ver_sexo(paciente.id_sexo) id_sexo, ver_paciente(cita.id_paciente) id_paciente, fecha_de_registro, fecha_de_cita, ver_especialidad(cita.id_especialidad) id_especialidad, ver_usuario(cita.id_usuario) id_usuario, ver_medico(cita.id_medico) id_medico, observacion, ver_estado_cita(cita.id_estado_cita) id_estado_cita, ver_motivo_consulta( cita.id_motivo_consulta ) id_motivo_consulta, calcular_edad(paciente.id_titular) edad FROM public.cita, PUBLIC.paciente WHERE cita.id_paciente = paciente.id_titular AND (SELECT tipo_de_empleado.nombre_tipo_de_empleado FROM tipo_de_empleado WHERE paciente.tipo_de_empleado = tipo_de_empleado.id_tipo_de_empleado ) = '" . $registro['ver_tipo_de_empleado'] . "'";
                   // echo $gedad;
                    //echo "<br>";
                    $gEtario = SelectFrom($conexion_bd, $gedad);

                    foreach ($gEtario as $ed) {
                       // $codigoSelect = $codigoSelect . '<br> ' . $ed['id_especialidad'] . ' - ' . $ed['edad'] ;
                    }

                    foreach ($Etario as $et) {
                        $si = 0;
                        foreach ($gEtario as $ed) {

                            if( $ed['edad'] >= $et['desde'] && $ed['edad'] <= $et['hasta'] && $ed['nombre_tipo_de_empleado']  == $registro['ver_tipo_de_empleado'] ) {
                                $si++;
                            } else {
                                
                            }

                        }
                        if( $si > 0 ) {
                            $codigoSelect = $codigoSelect . '<th class="col-quantity">'.$si.'</th>';
                        } else {
                            $codigoSelect = $codigoSelect . '<th class="col-quantity"> </th>';
                        }
                    }



                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>';

                                            foreach ($Etario as $et) {
                        $codigoSelect = $codigoSelect . '<th class="col-quantity">0</th>';
                    }

                    $codigoSelect = $codigoSelect . '</tr>
                </tbody>
            </table>
        </div>


    </div>

';

  return $codigoSelect;


}


function MostrarEtario_EspecialidadGenero($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Especialidad - Genero
            </div>

            <table class="specialties-table1">
                            <thead>
                <tr>
                    <th class="col-specialty">Especialidad</th>
                    <th class="col-specialty">Genero</th>
                    <th class="col-quantity">Cantidad</th>
                    <th class="col-quantity">0 - 4</th>
                    <th class="col-quantity">5 - 10</th>
                    <th class="col-quantity">11 - 15</th>
                    <th class="col-quantity">16 - 20</th>
                    <th class="col-quantity">20 - 30</th>
                    <th class="col-quantity">30 - 40</th>
                    <th class="col-quantity">40 - 50</th>
                    <th class="col-quantity">50 - 60</th>
                    <th class="col-quantity">60 - 70</th>
                    <th class="col-quantity">70 - 80</th>
                    <th class="col-quantity">80 - 90</th>
                    <th class="col-quantity">90 - 100</th>
                </tr>
            </thead>
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





function MostrarEtario_Genero($conexion_bd,$valor) {

$vsql = "SELECT nombre_etario, desde, hasta FROM etario;";
$Etario = SelectFrom($conexion_bd, $vsql);


 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Genero - Etario
            </div>

            <table class="specialties-table">
            <thead>
                <tr>
                    <th class="col-specialty">Especialidad</th>
                    <th class="col-quantity">Cantidad</th>';
                    foreach ($Etario as $et) {
                        $codigoSelect = $codigoSelect . '<th class="col-quantity">' . $et['nombre_etario'] . '</th>';
                    }

                $codigoSelect = $codigoSelect . '</tr>
            </thead>

            <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['ver_sexo'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    


                    $gedad = "SELECT id_cita, ver_paciente(cita.id_titular) id_titular, ver_sexo(paciente.id_sexo) id_sexo, ver_paciente(cita.id_paciente) id_paciente, fecha_de_registro, fecha_de_cita, ver_especialidad(cita.id_especialidad) id_especialidad, ver_usuario(cita.id_usuario) id_usuario, ver_medico(cita.id_medico) id_medico, observacion, ver_estado_cita(cita.id_estado_cita) id_estado_cita, ver_motivo_consulta( cita.id_motivo_consulta ) id_motivo_consulta, calcular_edad(paciente.id_titular) edad
                    FROM public.cita, PUBLIC.paciente WHERE cita.id_paciente = paciente.id_titular
 AND ver_sexo(paciente.id_sexo) = '" . $registro['ver_sexo'] . "'";
 
                    $gEtario = SelectFrom($conexion_bd, $gedad);

                    foreach ($gEtario as $ed) {
                       // $codigoSelect = $codigoSelect . '<br> ' . $ed['id_especialidad'] . ' - ' . $ed['edad'] ;
                    }

                    foreach ($Etario as $et) {
                        $si = 0;
                        foreach ($gEtario as $ed) {

                            if( $ed['edad'] >= $et['desde'] && $ed['edad'] <= $et['hasta'] && $ed['id_sexo']  == $registro['ver_sexo'] ) {
                                $si++;
                            } else {
                                
                            }

                        }
                        if( $si > 0 ) {
                            $codigoSelect = $codigoSelect . '<th class="col-quantity">'.$si.'</th>';
                        } else {
                            $codigoSelect = $codigoSelect . '<th class="col-quantity"> </th>';
                        }
                    }



                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>';

                                            foreach ($Etario as $et) {
                        $codigoSelect = $codigoSelect . '<th class="col-quantity">0</th>';
                    }

                    $codigoSelect = $codigoSelect . '</tr>
                </tbody>
            </table>
        </div>


    </div>

';


/* $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Genero
            </div>

            <table class="specialties-table1">
                            <thead>
                <tr>
                    <th class="col-specialty">Genero</th>
                    <th class="col-quantity">Cantidad</th>
                    <th class="col-quantity">0 - 4</th>
                    <th class="col-quantity">5 - 10</th>
                    <th class="col-quantity">11 - 15</th>
                    <th class="col-quantity">16 - 20</th>
                    <th class="col-quantity">20 - 30</th>
                    <th class="col-quantity">30 - 40</th>
                    <th class="col-quantity">40 - 50</th>
                    <th class="col-quantity">50 - 60</th>
                    <th class="col-quantity">60 - 70</th>
                    <th class="col-quantity">70 - 80</th>
                    <th class="col-quantity">80 - 90</th>
                    <th class="col-quantity">90 - 100</th>
                </tr>
            </thead>
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

';*/

  return $codigoSelect;


}


function MostrarEtario_EspecialidadTipoPaciente($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Especialidad - Tipo Paciente
            </div>

            <table class="specialties-table1">
                            <thead>
                <tr>
                    <th class="col-specialty">Especialidad</th>
                    <th class="col-specialty">Tipo de Paciente</th>
                    <th class="col-quantity">Cantidad</th>
                    <th class="col-quantity">0 - 4</th>
                    <th class="col-quantity">5 - 10</th>
                    <th class="col-quantity">11 - 15</th>
                    <th class="col-quantity">16 - 20</th>
                    <th class="col-quantity">20 - 30</th>
                    <th class="col-quantity">30 - 40</th>
                    <th class="col-quantity">40 - 50</th>
                    <th class="col-quantity">50 - 60</th>
                    <th class="col-quantity">60 - 70</th>
                    <th class="col-quantity">70 - 80</th>
                    <th class="col-quantity">80 - 90</th>
                    <th class="col-quantity">90 - 100</th>
                </tr>
            </thead>
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


function MostrarEtario_GeneroTipoPaciente($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Genero - Tipo Paciente
            </div>

            <table class="specialties-table1">
                            <thead>
                <tr>
                    <th class="col-specialty">Genero</th>
                    <th class="col-specialty">Tipo de Paciente</th>
                    <th class="col-quantity">Cantidad</th>
                    <th class="col-quantity">0 - 4</th>
                    <th class="col-quantity">5 - 10</th>
                    <th class="col-quantity">11 - 15</th>
                    <th class="col-quantity">16 - 20</th>
                    <th class="col-quantity">20 - 30</th>
                    <th class="col-quantity">30 - 40</th>
                    <th class="col-quantity">40 - 50</th>
                    <th class="col-quantity">50 - 60</th>
                    <th class="col-quantity">60 - 70</th>
                    <th class="col-quantity">70 - 80</th>
                    <th class="col-quantity">80 - 90</th>
                    <th class="col-quantity">90 - 100</th>
                </tr>
            </thead>
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


function MostrarEtario_Estado($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Estado de la Cita
            </div>

            <table class="specialties-table1">
                            <thead>
                <tr>
                    <th class="col-specialty">Estado de la Cita</th>
                    <th class="col-quantity">Cantidad</th>
                    <th class="col-quantity">0 - 4</th>
                    <th class="col-quantity">5 - 10</th>
                    <th class="col-quantity">11 - 15</th>
                    <th class="col-quantity">16 - 20</th>
                    <th class="col-quantity">20 - 30</th>
                    <th class="col-quantity">30 - 40</th>
                    <th class="col-quantity">40 - 50</th>
                    <th class="col-quantity">50 - 60</th>
                    <th class="col-quantity">60 - 70</th>
                    <th class="col-quantity">70 - 80</th>
                    <th class="col-quantity">80 - 90</th>
                    <th class="col-quantity">90 - 100</th>
                </tr>
            </thead>
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

function MostrarEtario_EspecialidadEstado($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Especialidad - Estado
            </div>

            <table class="specialties-table1">
                            <thead>
                <tr>
                    <th class="col-specialty">Especialidad</th>
                    <th class="col-specialty">Estado de la Cita</th>
                    <th class="col-quantity">Cantidad</th>
                    <th class="col-quantity">0 - 4</th>
                    <th class="col-quantity">5 - 10</th>
                    <th class="col-quantity">11 - 15</th>
                    <th class="col-quantity">16 - 20</th>
                    <th class="col-quantity">20 - 30</th>
                    <th class="col-quantity">30 - 40</th>
                    <th class="col-quantity">40 - 50</th>
                    <th class="col-quantity">50 - 60</th>
                    <th class="col-quantity">60 - 70</th>
                    <th class="col-quantity">70 - 80</th>
                    <th class="col-quantity">80 - 90</th>
                    <th class="col-quantity">90 - 100</th>
                </tr>
            </thead>
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


function MostrarEtario_GeneroEstado($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Genero - Estado
            </div>

            <table class="specialties-table1">
                            <thead>
                <tr>
                    <th class="col-specialty">Genero</th>
                    <th class="col-specialty">Estado</th>
                    <th class="col-quantity">Cantidad</th>
                    <th class="col-quantity">0 - 4</th>
                    <th class="col-quantity">5 - 10</th>
                    <th class="col-quantity">11 - 15</th>
                    <th class="col-quantity">16 - 20</th>
                    <th class="col-quantity">20 - 30</th>
                    <th class="col-quantity">30 - 40</th>
                    <th class="col-quantity">40 - 50</th>
                    <th class="col-quantity">50 - 60</th>
                    <th class="col-quantity">60 - 70</th>
                    <th class="col-quantity">70 - 80</th>
                    <th class="col-quantity">80 - 90</th>
                    <th class="col-quantity">90 - 100</th>
                </tr>
            </thead>
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


function MostrarEtario_TipoPacienteEstado($conexion_bd,$valor) {
 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Tipo Paciente - Estado
            </div>

            <table class="specialties-table1">
                            <thead>
                <tr>
                    <th class="col-specialty">Tipo de Paciente</th>
                    <th class="col-specialty">Estado</th>
                    <th class="col-quantity">Cantidad</th>
                    <th class="col-quantity">0 - 4</th>
                    <th class="col-quantity">5 - 10</th>
                    <th class="col-quantity">11 - 15</th>
                    <th class="col-quantity">16 - 20</th>
                    <th class="col-quantity">20 - 30</th>
                    <th class="col-quantity">30 - 40</th>
                    <th class="col-quantity">40 - 50</th>
                    <th class="col-quantity">50 - 60</th>
                    <th class="col-quantity">60 - 70</th>
                    <th class="col-quantity">70 - 80</th>
                    <th class="col-quantity">80 - 90</th>
                    <th class="col-quantity">90 - 100</th>
                </tr>
            </thead>
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


function MostrarEstadoPEtario($conexion_bd,$valor) {

$vsql = "SELECT nombre_etario, desde, hasta FROM etario;";
$Etario = SelectFrom($conexion_bd, $vsql);

 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Estado del País - Etario
            </div>

            <table class="specialties-table">
            <thead>
                <tr>
                    <th class="col-specialty">Estado del País</th>
                    <th class="col-quantity">Cantidad</th>';
                    foreach ($Etario as $et) {
                        $codigoSelect = $codigoSelect . '<th class="col-quantity">' . $et['nombre_etario'] . '</th>';
                    }

                $codigoSelect = $codigoSelect . '</tr>
            </thead>

            <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['nombre_estado_pais'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    


                    $gedad = "SELECT id_cita, (SELECT estado_venezuela.nombre_estado_pais FROM estado_venezuela WHERE paciente.id_estado_pais = estado_venezuela.id_estado_pais ), ver_paciente(cita.id_titular) id_titular, ver_sexo(paciente.id_sexo) id_sexo, ver_paciente(cita.id_paciente) id_paciente, fecha_de_registro, fecha_de_cita, ver_especialidad(cita.id_especialidad) id_especialidad, ver_usuario(cita.id_usuario) id_usuario, ver_medico(cita.id_medico) id_medico, observacion, ver_estado_cita(cita.id_estado_cita) id_estado_cita, ver_motivo_consulta( cita.id_motivo_consulta ) id_motivo_consulta, calcular_edad(paciente.id_titular) edad FROM public.cita, PUBLIC.paciente WHERE cita.id_paciente = paciente.id_titular AND (SELECT estado_venezuela.nombre_estado_pais FROM estado_venezuela WHERE paciente.id_estado_pais = estado_venezuela.id_estado_pais ) = '" . $registro['nombre_estado_pais'] . "'";
                   // echo $gedad;
                    //echo "<br>";
                    $gEtario = SelectFrom($conexion_bd, $gedad);

                    foreach ($gEtario as $ed) {
                       // $codigoSelect = $codigoSelect . '<br> ' . $ed['id_especialidad'] . ' - ' . $ed['edad'] ;
                    }

                    foreach ($Etario as $et) {
                        $si = 0;
                        foreach ($gEtario as $ed) {

                            if( $ed['edad'] >= $et['desde'] && $ed['edad'] <= $et['hasta'] && $ed['nombre_estado_pais']  == $registro['nombre_estado_pais'] ) {
                                $si++;
                            } else {
                                
                            }

                        }
                        if( $si > 0 ) {
                            $codigoSelect = $codigoSelect . '<th class="col-quantity">'.$si.'</th>';
                        } else {
                            $codigoSelect = $codigoSelect . '<th class="col-quantity"> </th>';
                        }
                    }



                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>';

                                            foreach ($Etario as $et) {
                        $codigoSelect = $codigoSelect . '<th class="col-quantity">0</th>';
                    }

                    $codigoSelect = $codigoSelect . '</tr>
                </tbody>
            </table>
        </div>


    </div>

';


/*
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
*/


  return $codigoSelect;


}

function MostrarEntes_Getario($conexion_bd,$valor) {

$vsql = "SELECT nombre_etario, desde, hasta FROM etario;";
$Etario = SelectFrom($conexion_bd, $vsql);

 $codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Entes - Etario
            </div>

            <table class="specialties-table">
            <thead>
                <tr>
                    <th class="col-specialty">Estado del País</th>
                    <th class="col-quantity">Cantidad</th>';
                    foreach ($Etario as $et) {
                        $codigoSelect = $codigoSelect . '<th class="col-quantity">' . $et['nombre_etario'] . '</th>';
                    }

                $codigoSelect = $codigoSelect . '</tr>
            </thead>

            <tbody> ';

                 
                $total = 0;
                foreach ($valor as $registro) {

                    $codigoSelect = $codigoSelect . '<tr><td class="col-specialty">' . $registro['siglas_ente'] . '</td>';
                    $codigoSelect = $codigoSelect . '<td class="col-quantity">' . $registro['count'] . '</td>';
                    $total = $total + $registro['count'];    


                    $gedad = "SELECT id_cita, (SELECT ente.siglas_ente FROM ente WHERE paciente.id_ente = ente.id_ente ), ver_paciente(cita.id_titular) id_titular, ver_sexo(paciente.id_sexo) id_sexo, ver_paciente(cita.id_paciente) id_paciente, fecha_de_registro, fecha_de_cita, ver_especialidad(cita.id_especialidad) id_especialidad, ver_usuario(cita.id_usuario) id_usuario, ver_medico(cita.id_medico) id_medico, observacion, ver_estado_cita(cita.id_estado_cita) id_estado_cita, ver_motivo_consulta( cita.id_motivo_consulta ) id_motivo_consulta, calcular_edad(paciente.id_titular) edad FROM public.cita, PUBLIC.paciente WHERE cita.id_paciente = paciente.id_titular AND (SELECT ente.siglas_ente FROM ente WHERE paciente.id_ente =ente.id_ente ) = '" . $registro['siglas_ente'] . "'";
                   // echo $gedad;
                    //echo "<br>";
                    $gEtario = SelectFrom($conexion_bd, $gedad);

                    foreach ($gEtario as $ed) {
                       // $codigoSelect = $codigoSelect . '<br> ' . $ed['id_especialidad'] . ' - ' . $ed['edad'] ;
                    }

                    foreach ($Etario as $et) {
                        $si = 0;
                        foreach ($gEtario as $ed) {

                            if( $ed['edad'] >= $et['desde'] && $ed['edad'] <= $et['hasta'] && $ed['siglas_ente']  == $registro['siglas_ente'] ) {
                                $si++;
                            } else {
                                
                            }

                        }
                        if( $si > 0 ) {
                            $codigoSelect = $codigoSelect . '<th class="col-quantity">'.$si.'</th>';
                        } else {
                            $codigoSelect = $codigoSelect . '<th class="col-quantity"> </th>';
                        }
                    }



                    }
                    
                    $codigoSelect = $codigoSelect . '<tr class="total-row">
                        <td class="col-specialty"><strong>TOTAL</strong></td>
                        <td class="col-quantity"><strong>'.$total.'</strong></td>';

                                            foreach ($Etario as $et) {
                        $codigoSelect = $codigoSelect . '<th class="col-quantity">0</th>';
                    }

                    $codigoSelect = $codigoSelect . '</tr>
                </tbody>
            </table>
        </div>


    </div>

';



 /*$codigoSelect = '    <div class="card shadow-sm border-0 btn-rounded">

        <div class="card">
            <!-- Optional title (not in the image, but adds context) -->
            <div class="card-title">
                Entes - Getario
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

';*/
  return $codigoSelect;


}


function MostrarEtario_EstadisticasBasicas($conexion_bd,$valor) {

$vsql = "SELECT ver_especialidad(id_especialidad), COUNT(id_especialidad) FROM cita GROUP BY id_especialidad;";
$MostrarEtario_Especialidadad = SelectFrom($conexion_bd, $vsql);

$vsql = "SELECT ver_sexo(paciente.id_sexo), COUNT(paciente.id_sexo) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.id_sexo;";
$MostrarEtario_Genero = SelectFrom($conexion_bd, $vsql);

$vsql = "SELECT (SELECT estado_venezuela.nombre_estado_pais FROM estado_venezuela WHERE paciente.id_estado_pais = estado_venezuela.id_estado_pais ), COUNT(paciente.id_estado_pais) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.id_estado_pais;";
$MostrarEstadoPEtario = SelectFrom($conexion_bd, $vsql);

//SELECT '*TIPO DE EMPLEADO*' AS campo, '' AS campo2, '' AS campo3;
$vsql = "SELECT '' AS campo, ver_tipo_de_empleado(paciente.tipo_de_empleado), COUNT(paciente.tipo_de_empleado) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.tipo_de_empleado;";
$MostrarEtario_TipoPaciente = SelectFrom($conexion_bd, $vsql);

$vsql = "SELECT ver_estado_cita(id_estado_cita), ver_sexo(paciente.id_sexo), COUNT(paciente.id_sexo) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY cita.id_estado_cita, paciente.id_sexo;";
$MostrarEtario_Estado = SelectFrom($conexion_bd, $vsql);

$vsql = "SELECT (SELECT ente.siglas_ente FROM ente WHERE paciente.id_ente = ente.id_ente ), COUNT(paciente.id_ente) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.id_ente;";
$MostrarEntes = SelectFrom($conexion_bd, $vsql);


  $codigoSelect = '';
  $codigoSelect =  $codigoSelect  . MostrarEtario_Especialidadad($conexion_bd,$MostrarEtario_Especialidadad);
   $codigoSelect =  $codigoSelect  . MostrarEtario_Genero($conexion_bd,$MostrarEtario_Genero);
$codigoSelect =  $codigoSelect  . MostrarEstadoPEtario($conexion_bd,$MostrarEstadoPEtario);

 $codigoSelect =  $codigoSelect  . MostrarEtario_TipoPaciente($conexion_bd,$MostrarEtario_TipoPaciente);
 
$codigoSelect =  $codigoSelect  . MostrarEntes_Getario($conexion_bd,$MostrarEntes);

 //$codigoSelect =  $codigoSelect  . MostrarEtario_Estado($conexion_bd,$MostrarEtario_Estado);
   /*  $codigoSelect =  $codigoSelect  . MostrarEtario_EspecialidadGenero($conexion_bd,$valor);

  $codigoSelect =  $codigoSelect  . MostrarEtario_EspecialidadTipoPaciente($conexion_bd,$valor);
  $codigoSelect =  $codigoSelect  . MostrarEtario_GeneroTipoPaciente($conexion_bd,$valor);

  $codigoSelect =  $codigoSelect  . MostrarEtario_Estado($conexion_bd,$valor);
  $codigoSelect =  $codigoSelect  . MostrarEtario_EspecialidadEstado($conexion_bd,$valor);
  $codigoSelect =  $codigoSelect  . MostrarEtario_GeneroEstado($conexion_bd,$valor);
  $codigoSelect =  $codigoSelect  . MostrarEtario_TipoPacienteEstado($conexion_bd,$valor);
 */
  $trazabilidad = '';
  $trazabilidad = $trazabilidad . "INSERT INTO trazabilidad ";
  $trazabilidad = $trazabilidad . "(fecha_de_registro,evento,id_usuario,direccion_ip) ";
  $trazabilidad = $trazabilidad . "VALUES ('".obtenerFechaHora()."','ESTADISTICAS-GETARIO"."','".obtenerUsuario()."', '".obtenerIP()."') ";
  $stmt = $conexion_bd->prepare($trazabilidad);
  $stmt->execute();
  
  
  return $codigoSelect;

}


