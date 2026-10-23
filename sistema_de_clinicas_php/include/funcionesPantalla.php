<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

/**
 * Función principal para mostrar una lista con acciones (CRUD, exportaciones, procesos)
 *
 * @param resource $conexion_bd
 *            Conexión a la base de datos
 * @param string $ltitulo
 *            Título de la lista
 * @param string $vsql
 *            Consulta SQL para obtener los datos
 * @param string $mi_busqueda_html
 *            HTML del buscador (opcional)
 * @param array $encabezados
 *            Array con nombres de columnas (para la cabecera)
 * @param array $campos
 *            Array con nombres de campos de la consulta (para mostrar)
 * @param string $acciones
 *            Cadena con letras: C=Crear, R=Leer, U=Editar, D=Eliminar, V=Ver, E=Excel, P=PDF
 * @param string $procesos
 *            "AI" o "IA" (Activar/Inactivar), "A" solo activar, "I" solo inactivar, vacío sin procesos
 * @param string $formulario
 *            (no usado)
 * @param string $campos_formulario
 *            (no usado)
 * @param string $tipos_campos_formulario
 *            (no usado)
 * @return string HTML completo de la tabla
 */
function MostrarLista($conexion_bd, $ltitulo, $vsql, $mi_busqueda_html, $encabezados, $campos, $acciones = "E", $procesos = "", $formulario = '', $campos_formulario = '', $tipos_campos_formulario = '', $porPagina = false, $borrarTabla = '', $borrarCampoid = '', $borrarPagina = '', $datatable = true, $miPaginaVer ='', $miPaginaEditar='')
{
    $codigoHTML = '';
    if( $datatable ) {
        
    
        //$codigoHTML .= '<script src="https://code.jquery.com/jquery-3.7.1.js"></script>';
//        $codigoHTML .= '<script src="node_modules/jquery/dist/jquery.js"></script>';
        
        
        

        
        //$codigoHTML .= '<link href="node_modules/datatables.net-dt/css/dataTables.dataTables.css" rel="stylesheet" >';
//        $codigoHTML .= '<link href="https://cdn.datatables.net/2.3.8/css/dataTables.dataTables.css" rel="stylesheet" >';
//        $codigoHTML .= '<script src="https://cdn.datatables.net/2.3.8/js/dataTables.min.js"></script>';
        //$codigoHTML .= '<script src="node_modules/datatables.net-dt/js/dataTables.dataTables.min.js"></script>';

  //      $codigoHTML .= '<link href="node_modules/datatables.net-dt/css/dataTables.dataTables.css" rel="stylesheet" >';
  //      $codigoHTML .= '<script src="node_modules/datatables.net-dt/js/dataTables.dataTables.js"></script>';

        


    }
    
    
    $trazabilidad = '';
    $trazabilidad = $trazabilidad . "INSERT INTO trazabilidad ";
    $trazabilidad = $trazabilidad . "(fecha_de_registro,evento,id_usuario,direccion_ip) ";
    $trazabilidad = $trazabilidad . "VALUES ('".obtenerFechaHora()."','LISTAR-".$ltitulo."','".obtenerUsuario()."', '".obtenerIP()."') ";
    $stmt = $conexion_bd->prepare($trazabilidad);
    $stmt->execute();
    
        
        // Guardar datos en cookies (excepto la conexión, que no se puede serializar)
    // Solo se guardan cadenas y arrays simples
    setcookie('ltitulo', json_encode($ltitulo), [
        'expires' => time() + 86400,
        'path' => '/',
        'secure' => false,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    setcookie('vsql', json_encode($vsql), [
        'expires' => time() + 86400,
        'path' => '/',
        'secure' => false,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    setcookie('encabezados', json_encode($encabezados), [
        'expires' => time() + 86400,
        'path' => '/',
        'secure' => false,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    setcookie('campos', json_encode($campos), [
        'expires' => time() + 86400,
        'path' => '/',
        'secure' => false,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);

    // Obtener datos
    $lista = SelectFrom($conexion_bd, $vsql);

    // Inicio del HTML
    $codigoHTML .= '<div class="container-fluid px-4 pb-5">';
    $codigoHTML .= '<div class="row mb-4"><div class="col-12 text-center"><br><h2 class="fw-bold text-dark mb-1">' . $ltitulo . '</h2></div></div>';

    // ==========================================
    // LÓGICA AUTOMÁTICA DE RUTAS (REGLA GENERAL)
    // ==========================================
    $pagina_actual = basename($_SERVER['PHP_SELF'], '.php');
    // ======================
    // SE AGREGO la OPCION DE ELIMINAR cuando se le pasan los parametros
    // ======================

   $borrarPagina = $pagina_actual . '.php';
    $nombre_base = str_ireplace('lista', '', $pagina_actual); // Quita "lista" o "Lista"
    $nombre_base = lcfirst($nombre_base); // Primera letra en minúscula
    $pagina_destino = $nombre_base . 'Registro.php';
    $pagina_editar = $pagina_destino;

    // Si le pasamos $miPaginaVer, usamos esa ruta exacta para Nuevo y Editar
    if( $miPaginaVer != '' ) {
        $pagina_destino = $miPaginaVer;
        $pagina_editar = $miPaginaVer;
    }
    if($miPaginaEditar !=''){
         $pagina_editar = $miPaginaEditar;
    }
    $cadena = $acciones;

    // Inicializar botones
    $botonCrear = '';
    $botonEditar = false; // se usará como booleano
    $botonVer = false;
    $botonBorrar = '';
    $botonExportarExcel = '';
    $botonExportarPDF = '';
    $botonProcesos = '';

    // ======================
    // Control del Manejo de si es por Pagina registro.Php
    // o de forma automatica cuando se la pasan los parametros
    // ======================
    $enc_col = 1;
    $pagina = false;
    foreach ($campos as $camp) {
        if ($enc_col == 1 && $camp == 'id_usuario') {
            $pagina = true; // Solo Aplica para el CRUD de Usuario
        }
        $enc_col ++;
    }

    // Si el Parametro pasado al Filan es por Pagina toma la del Parametro
    if ($porPagina) {
        $pagina = true;
    }

    // ======================
    // BOTÓN NUEVO (C)
    // ======================
    if (str_contains($cadena, 'C') && $pagina) {
        $botonCrear = '<a href="' . $pagina_destino . '" class="btn btn-outline-primary btn-rounded btn-sm me-2">NUEVO</a>';
    }

    if (str_contains($cadena, 'C') && ! $pagina) {
        $botonCrear = '
    <button href="index_xls1.php" onclick="verNuevo()" target="_blank" class="btn btn-outline-primary btn-rounded  btn-sm">NUEVO</button>
    <script>
      function verNuevo(){
        const modal = document.getElementById("miModal");
        modal.style.display = "flex";
        //alert("Nuevo Registro");
        //const myModal = document.getElementById("myModal");
        //const myInput = document.getElementById("myInput");
        //myModal.addEventListener("shown.bs.modal", () => {
        //myInput.focus()
        //})
      }
    </script>
  ';
    }

    // ======================
    // BOTONES DE PROCESOS (A/I)PARA LOS REGISTROS
    // ======================
    if ($procesos == "P01") {
        $botonProcesos = '
            <div class="btn btn-sm btn-outline-primary btn-rounded" onclick="Activar()">Autorizar Cita</div>
            <div class="btn btn-sm btn-outline-danger btn-rounded" onclick="InActivar()">Quitar Autorización</div>';
    } else {

        if ($procesos == "AI" || $procesos == "IA") {
        $botonProcesos = '
            <div class="btn btn-sm btn-outline-primary btn-rounded" onclick="Activar()">111Activar</div>
            <div class="btn btn-sm btn-outline-danger btn-rounded" onclick="InActivar()">222Inactivar</div>';
    } elseif ($procesos == "A") {
        $botonProcesos = '<div class="btn btn-sm btn-outline-primary btn-rounded" onclick="Activar()">Activar</div>';
    } elseif ($procesos == "I") {
        $botonProcesos = '<div class="btn btn-sm btn-outline-danger btn-rounded" onclick="InActivar()">Inactivar</div>';
    } 

    }

    // Añadir scripts para las funciones (si hay procesos)
    if ($botonProcesos != '') {
        $botonProcesos .= '
        <script>
            function Activar(){ alert("Activar Registro"); }
            function InActivar(){ alert("InActivar Registro"); }
        </script>';
    }

    // ======================
    // BOTÓN VER (V)
    // ======================
    if (str_contains($cadena, 'V')) {
        $botonVer = true;
    }

    // ======================
    // BOTÓN EDITAR (U) - se habilita en cada fila con ID
    // ======================
    if (str_contains($cadena, 'U')) {
        $botonEditar = true; // se usará en la fila
    }


    // ======================
    // BOTÓN ELIMINAR (D)
    // ======================
    if (str_contains($cadena, 'D')) {
        $botonBorrar = 'D'; // No Colocar el Boton Borrar por Ahora
    }

    // ======================
    // BOTÓN EXCEL (E)
    // ======================
    if (str_contains($cadena, 'E')) {
        $botonExportarExcel = '<button onclick="verExcel()" class="btn btn-outline-success btn-rounded btn-sm me-2">EXCEL</button>
        <script> function verExcel(){ 
        //alert("Exportar Excel");
        window.open("index_xls1.php", "_blank");
         } </script>';
    }

    // ======================
    // BOTÓN PDF (P)
    // ======================
    if (str_contains($cadena, 'P')) {
        $botonExportarPDF = '<button onclick="verPDF()" class="btn btn-outline-danger btn-rounded btn-sm me-2">PDF</button>
        <script> function verPDF(){ alert("Exportar PDF"); 
         window.open("index_pdf1.php", "_blank");
        } </script>';
        $botonExportarPDF = ''; // No Mostrar el PDF momentaneamente
    }

    // ======================
    // ARMAR BARRA DE BOTONES SUPERIOR
    // ======================
    $codigoHTML .= $botonCrear;
    $codigoHTML .= $botonExportarExcel;
    $codigoHTML .= $botonExportarPDF;

    // ======================
    // INICIO DEL CARD Y BUSCADOR
    // ======================
    $codigoHTML .= '<div class="card shadow-sm border-0 btn-rounded mt-3">
        <div class="card-body p-4">
            <div class="row align-items-end mb-4 p-3 buscar-contenedor g-3">';

    $codigoHTML .= $mi_busqueda_html; // HTML del buscador (si viene)
    
      // Modal (puede ser usado por los botones)
      $codigoHTML .= '
      <style>
     
      .modal-contenedor {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      }
     
     
      .modal-contenido {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      width: 80%;
      text-align: center;
      position: relative;
      }
     
     
      .cerrar-modal {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 24px;
      cursor: pointer;
      }
     
      </style>';
     
      $codigoHTML .= '<!-- Botón para abrir el modal -->
     
      <!-- Estructura del Modal -->
      <div id="miModal" class="modal-contenedor">
      <div class="modal-contenido">
      <span onclick="verCerrar()" class="cerrar-modal" id="cerrarModal">&times;</span>';
      $codigoHTML .= '<br>';
    $enc = 1;
    foreach ($encabezados as $encabezado) {
        // Limpiar y formatear
        $cadena_enc = str_replace([
            'id_',
            'ID_',
            'iD_',
            'Id_',
            'in_',
            '-',
            '_',
            '  '
        ], ' ', $encabezado);
        $cadena_enc = str_replace([
            'N#',
            'Id',
            'ID'
        ], 'N°', $cadena_enc);
        $cadena_enc = ucwords($cadena_enc);
        /*if ($enc == 1) {
            $tencabezado .= '<th style="width: 5%;">' . $cadena_enc . '</th>';
        } else {
            $tencabezado .= '<th>' . $cadena_enc . '</th>';
        }*/
        $codigoHTML .= '
          <label class="form-label fw-bold">'.$cadena_enc.'</label>
          <input type="text" name="nombre_titular" class="form-control shadow-sm" >
        ' . '<br>';
        $enc ++;
    }


     
    $codigoHTML .= '<button class="btn btn-sm btn-primary" onclick="verCerrar()" >Cerrar</button>

      </div>
      </div>' .
          '           <script>
                 function verCerrar(){
                 //alert("Ver Formulario");
                    const modal = document.getElementById("miModal");
                    modal.style.display = "none";

                 }
                 </script>';

      ;
     
      $codigoHTML .= "<script>
      // Seleccionamos los elementos del DOM";

    if (str_contains($cadena, 'C') && ! $pagina) {
        $codigoHTML .= "const abrirBtn = document.getElementById('nuevo');";
    }

        if (str_contains($cadena, 'V') && ! $pagina) {
        $codigoHTML .= "
              const verBtn = document.getElementById('verver');
        ";
    }

        if (str_contains($cadena, 'V') && ! $pagina) {
        $codigoHTML .= "
              const editarBtn = document.getElementById('editarver');
        ";
    }

      $codigoHTML .= "
     
      const cerrarBtn = document.getElementById('cerrarModal');
      const modal = document.getElementById('miModal');";

    if (str_contains($cadena, 'C') && ! $pagina) {
        $codigoHTML .= "// Función para abrir el modal
                abrirBtn.addEventListener('click', () => {
                modal.style.display = 'flex';
                });";
    }


    if (str_contains($cadena, 'V') && ! $pagina) {
        $codigoHTML .= "
      verBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
      });";
    }


    if (str_contains($cadena, 'U') && ! $pagina) {
        $codigoHTML .= "
      // Función para abrir el modal
      editarBtn.addEventListener('click', () => {
      modal.style.display = 'flex';
      });";
          }


$codigoHTML .= "
     
     
      // Función para cerrar el modal
      cerrarBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      });
     
      // Opcional: Cerrar el modal si el usuario hace clic fuera del contenido
      window.addEventListener('click', (event) => {
      if (event.target === modal) {
      modal.style.display = 'none';
      }
      });
     
      </script>
      ";
     
    // ======================
    // TABLA
    // ======================
      if( $datatable ) {
          $codigoHTML .= '<div class="table-responsive rounded-3 shadow-sm">
        <table id="example" class="display">';
          
      } else {
              $codigoHTML .= '<div class="table-responsive rounded-3 shadow-sm">
           <table class="table table-hover .table-striped table-striped align-middle mb-0 bg-white" id="example">';
      }
    
    // Encabezados
    $tencabezado = '<thead class="table-sgp-azul text-center"><tr>';
    $enc = 1;
    foreach ($encabezados as $encabezado) {
        // Limpiar y formatear
        $cadena_enc = str_replace([
            'id_',
            'ID_',
            'iD_',
            'Id_',
            'in_',
            '-',
            '_',
            '  '
        ], ' ', $encabezado);
        $cadena_enc = str_replace([
            'N#',
            'Id',
            'ID'
        ], 'N°', $cadena_enc);
        $cadena_enc = ucwords($cadena_enc);
        if ($enc == 1) {
            $tencabezado .= '<th style="width: 5%;">' . $cadena_enc . '</th>';
        } else {
            $tencabezado .= '<th>' . $cadena_enc . '</th>';
        }
        $enc ++;
    }

    // Añadir columnas de acciones y procesos según corresponda
    $hayAcciones = ($botonVer === true || $botonEditar === true);
    if ($hayAcciones) {
        $tencabezado .= '<th style="width: 15%;">Acciones</th>';
    }
    if ($botonBorrar != '') {
        $tencabezado .= '<th style="width: 10%;"></th>';
    }
    if ($botonProcesos != '') {
        $tencabezado .= '<th style="width: 15%;">Procesos</th>';
    }
    $tencabezado .= '</tr></thead>';
    $codigoHTML .= $tencabezado;

    // Cuerpo de la tabla
    $tdatos = '<tbody>';
    foreach ($lista as $registro) {
        $btnProcesosFila = '';
        $tdatos .= '<tr class="text-center">';
        $enc_col = 1;
        $in_acctivo = -1;
        foreach ($campos as $camp) {
            $valor = $registro[$camp] ?? '';
            if( $camp == 'in_activo' ) {
                $in_acctivo = $registro[$camp] ?? -1;
            }
            $valor = MostrarDescripcion($conexion_bd, $valor, $camp);
            if ($enc_col == 1) {
                $tdatos .= '<td class="text-muted small text-center">' . $valor . '</td>';
            } else {
                $tdatos .= '<td class="text-start text-center">' . $valor . '</td>';
            }
            $enc_col ++;
        }

// Columna de Acciones (Ver y Editar)
        if ($hayAcciones) {
            $id_reg = reset($registro); // primer campo como ID

            // --- BOTÓN VER ---
            if( $miPaginaVer != '' ) {
                $btnVerFila = ($botonVer === true) ? '<a href="' . $miPaginaVer . '?id=' . $id_reg . '&leer=1" class="btn btn-primary btn-rounded btn-sm text-white me-1">VER</a>' : '';
            } elseif ($pagina) {
                $btnVerFila = ($botonVer === true) ? '<a href="' . $pagina_editar . '?id=' . $id_reg . '&leer=1" class="btn btn-primary btn-rounded btn-sm text-white me-1">VER</a>' : '';
            } else {
                $btnVerFila = '<button onclick="verVer()" class="btn btn-primary btn-rounded btn-sm me-1">VER</button>
                 <script>
                 function verVer(){
                    const modal = document.getElementById("miModal");
                    modal.style.display = "flex";
                 }
                 </script>';
            }

            // --- BOTÓN EDITAR ---
            if( $miPaginaEditar != '' ) {
                $btnEditFila = ($botonEditar === true) ? '<a href="' . $miPaginaEditar . '?id=' . $id_reg . '" class="btn btn-info btn-rounded btn-sm text-black">EDITAR</a>' : '';
            } elseif ($pagina) {
                $btnEditFila = ($botonEditar === true) ? '<a href="' . $pagina_editar . '?id=' . $id_reg . '" class="btn btn-info btn-rounded btn-sm text-black">EDITAR</a>' : '';
            } else {
                $btnEditFila = '<button id="editar" onclick="verEdit()" href="index_xls1.php" target="_blank" class="btn btn-info btn-rounded btn-sm text-black">EDITAR</button>
                 <script>
                 function verEdit(){
                    const modal = document.getElementById("miModal");
                    modal.style.display = "flex";
                 }
                 </script>';
            }
        }

        if ($hayAcciones) {
            $tdatos .= '<td>' . $btnVerFila . ' ' . $btnEditFila . '</td>';
        }

        // Columna de Eliminar (si existe)
        if ($botonBorrar != '') {
            $btnDel = '
            <button onclick="verBorrar' . $id_reg . '(' . $id_reg . ')" class="btn btn-danger btn-rounded btn-sm">ELIMINAR</button>
            <script>
                function verBorrar' . $id_reg . '(valor){
                    if (confirm("¿Estás seguro de Eliminar el Registro " + valor + " ?")) {
                        window.location.href = "del_datos.php?id="+valor+"&tabla=' . $borrarTabla . '&campoid=' . $borrarCampoid . '&pagina=' . $borrarPagina . '";
                    } else {
                        alert("Cancelado el Proceso");
                    }
                }
            </script>';

            $tdatos .= '<td>' . $btnDel . '</td>';
        }

                // Columna de Procesos (Activar/Inactivar)
        if ($botonProcesos != '') {
                    $id_reg = reset($registro); 

                    if( $in_acctivo == 1 ) {
                        $btnProcesosFila = '
                            <a href="inactivar.php?tabla='.$borrarTabla.'&id=' . $id_reg . '&campoid=' . $borrarCampoid . '&pagina=' . $borrarPagina . '"
                            class="btn btn-sm btn-outline-danger btn-rounded" 
                            onclick="return confirm(\'¿Desea inactivar el registro?\');">Inactivar</a>';
                    }

                    if( $in_acctivo == 0 ) {
                        $btnProcesosFila = '
                            <a href="activar.php?tabla='.$borrarTabla.'&id=' . $id_reg . '&campoid=' . $borrarCampoid . '&pagina=' . $borrarPagina . '"
                            class="btn btn-sm btn-outline-primary btn-rounded me-1" 
                            onclick="return confirm(\'¿Desea activar el registro?\');">Activar</a>';
                    }

                    $tdatos .= '<td>' . $btnProcesosFila . '</td>';
                }

                $tdatos .= '</tr>';
            }
    $tdatos .= '</tbody>';

    $codigoHTML .= $tdatos;
    $codigoHTML .= '</table></div></div></div></div>'; // cierres

    if( $datatable ) {
        $codigoHTML .= "<script>
            function tabla() {
            //new DataTable('#example');

            var table = new DataTable('#example', {
                language: {
                    url: 'es-ES.json',
                },
            });

            }
            tabla();
        </script>";
    }
    
    return $codigoHTML;
}

