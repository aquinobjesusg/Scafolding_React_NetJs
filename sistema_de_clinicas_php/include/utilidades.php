<?php

function MostrarQuitarBotonDerecho()
{
    $codigo = "  <script>
	document.addEventListener('contextmenu', function (event) {
		event.preventDefault();
	});
</script>";
  ;
    return $codigo;
}

function MostrarHead()
{
    $codigo = '
  <!DOCTYPE html>

<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <!-- muestra correctamente las ´ y la ñ -->
    <!-- hace que el diseño se adapte en cualquier pantalla -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- title: muestra el titulo -->
    <title>SGP - Panel Principal</title>
    <!-- importa la librería de bootstrap para que funcione las clases de diseño (botones y columnas )
    toma los archivos dentro de la carpeta css e indica la relación con el html-->

     <script src="node_modules/jquery/dist/jquery.js"></script>
     
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/style.css" rel="stylesheet" />

    <script src="node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <link href="node_modules/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet" type="text/css" />

    <link rel="icon" type="image/x-icon" href="favicon.ico">

    <script src="node_modules/select2/dist/js/select2.full.js"></script>
    <link href="node_modules/select2/dist/css/select2.css" rel="stylesheet" type="text/css" />

      <link href="node_modules/datatables.net-dt/css/dataTables.dataTables.css" rel="stylesheet" >
      <script src="node_modules/datatables.net/js/dataTables.js"></script>

    <!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0/dist/css/select2.min.css" rel="stylesheet"/> -->
    ';

 $codigo = $codigo . MostrarQuitarBotonDerecho();

 $codigo = $codigo . '  </head>
  <!-- el cuerpo y la navegación -->
  <body class="bg-light">
  ';
    return $codigo;
}

function MostrarCabecera()
{
    $codigo = '
    <center>
    <table>
    <tr>
    <td>
    <img src="imagenes/sgp.png" height="100px" />
    </td>
     <td>
     <img src="imagenes/cabeceraMppeuSep2025.png" height="100px" />
    </td>   
    </tr>
    </table>
    </center>';
    return $codigo;
}




function MostrarCargando($conexion_bd, $variable = '')
{
    $codigo = '
        <div id="cargando" style="display: none; color: blue; font-weight: bold;">
            <center>
            <img src="cargando.gif" width="50px" />
            </center>
        </div>
  ';
    return $codigo;
}



function MostrarHeader($conexion_bd, $cedula_buscar)
{
    $codigo = '
      <nav class="navbar navbar-dark navbar-custom shadow-sm mb-4">
          <div class="container">
              <a href="pantallaPrincipal.php" class="navbar-brand mb-0 h1 fw-bold">SGP | Registro</a>
            <a href="pantallaPrincipal.php" class="btn btn-outline-light btn-sm btn-rounded">Volver al Inicio</a>
        </div>
    </nav>
  ';

  
    return $codigo;
}

function MostrarFooter($conexion_bd, $valor)
{
    $codigo = '
        
        <!-- Footer Simple -->
    <footer class="mt-3 py-3 text-center text-muted border-top">
      <center>
        <!-- <img src="imagenes/pie.png?v=1" height="150px" /> -->
      </center>
      <small>&copy;  V 1.0.0 Gestión de Citas</small>
    </footer>
        
        
<!--<script src="funciones.js"></script>-->
        
        <script>
function calcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const diferenciaMeses = hoy.getMonth() - nacimiento.getMonth();
    
    // Si el mes es menor, o es el mismo mes pero el día es menor, aún no ha cumplido años
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    
    return edad;
}
    </script>

  </body>
</html>
        
';
    return $codigo;
}

function MostrarRol($conexion_bd, $valor)
{
    $codigo = $valor;
    
    $sql = " SELECT * FROM rol where id_rol = " . $codigo;
    $registros = SelectFrom($conexion_bd, $sql);
    
    $des = "";
    
    foreach ($registros as $reg) {
        if ($reg['id_rol'] == $codigo) {
            $des = $reg['nombre'];
        }
    }
    
    return $des;
}

function MostrarModulo($conexion_bd, $valor)
{
    $codigo = $valor;
    
    $sql = " SELECT id_modulos, nombre_modulos FROM modulos where id_modulos = " . $codigo;
    $registros = SelectFrom($conexion_bd, $sql);
    
    $des = "";
    
    foreach ($registros as $reg) {
        if ($reg['id_modulos'] == $codigo) {
            $des = $reg['nombre_modulos'];
        }
    }
    
    return $des;
}

function inActivo($conexion_bd, $valor)
{
    $codigo = $valor;
    
    if ($valor == 1) {
        $des = 'SI';
    } else {
        $des = 'NO';
    }
    
    return $des;
}


function MostrarDescripcion($conexion_bd, $valor, $campo)
{
/*    echo $campo;
    echo "<br>";
    echo $valor;
    echo "<hr>";*/
    
    $query = '';
    $default = false;
    $indicate = false;
    $des = '';
    switch ($campo) {
/*        case 'id_rol':
            $query = "Select nombre from rol where id_rol = ";
            break;
            
        case 'id_modulo':
            $query = "Select nombre_modulos from modulos where id_modulos = ";
            break;*/
            
        case 'in_activo':
            $des = 'NO';
            $indicate = true;
            if( $valor == 1 ) {
                $des = 'SI';
            }
            break;

        case 'in_inactivo':
            $des = 'NO';
            $indicate = true;
            if( $valor == 1 ) {
                $des = 'SI';
            }
            break;
            
        case 'in_cambiar_clave':
            $des = 'NO';
            $indicate = true;
            if( $valor == 1 ) {
                $des = 'SI';
            }
            break;
            
        default:
            $default = true;
            $des = $valor;
            break;
    }
    
    if( !$default && $query != '' && !$indicate ) {
        // Get SQL Data
        $codigo = $valor;
        
        $sql = $query . $valor;
        echo $sql;
        $registros = SelectFrom($conexion_bd, $sql);
        
        $des = "";
        foreach ($registros as $reg) {
            $des = $reg[0];
        }
    }
    
    if( $default && !$indicate ) {
        // Nothing        
    }

    if( $indicate ) {
        // Nothing        
    }
    
    return $des;
}

