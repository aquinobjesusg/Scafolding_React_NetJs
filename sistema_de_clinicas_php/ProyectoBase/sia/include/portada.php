<?php
$tituloProyecto = '<title>Sistema de Gestión de Almacen</title>';

$headJsCss = '<meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="css/bootstrap.min.css" rel="stylesheet">
            <link href="css/style.css" rel="stylesheet" type="text/css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="js/despegable.js"></script>
            <script src="js/mensaje.js"></script>
            <script src="js/modal.js"></script>
            <script src="js/bootstrap.bundle.min.js"></script>';
            
$url_logo = 'bienvenido.php'; 

// --- Carga de Variables de Sesión 
$usuario = $_SESSION['id_usuario'] ?? null;
$nombre = $_SESSION['nom_usuario'] ?? null;
$correo = $_SESSION['correo_usuario'] ?? null;
$super_admin = $_SESSION['super_admin'] ?? false;
$permisos_usuario = $_SESSION['permiso'] ?? [];

// 1. DETERMINAR SUBTÍTULO DEL MÓDULO (Lógica movida arriba)
$subtituloModulo = '';
if ($usuario && !$super_admin) {
    if (isset($_SESSION['permiso']['Almacén'])) {
        $url_logo = 'recursoDisponible.php';
        $subtituloModulo = '<h5 style="text-align:center; color: #6c757d; margin-top:-10px; margin-bottom:15px;">Módulo Almacén</h5>';
    } elseif (isset($_SESSION['permiso']['Bienes'])) {
        $url_logo = 'bienesListado.php';
        $subtituloModulo = '<h5 style="text-align:center; color: #6c757d; margin-top:-10px; margin-bottom:15px;">Módulo Bienes Nacionales</h5>';
    } elseif (isset($_SESSION['permiso']['OTIC'])) {
        $url_logo = 'consumiblesDisponible.php';
        $subtituloModulo = '<h5 style="text-align:center; color: #6c757d; margin-top:-10px; margin-bottom:15px;">Módulo OTIC</h5>';
    }
} elseif (!$usuario) {
    $url_logo = 'index.php';
}

$cintillo = '<div class="container">
                <div class="cintillo-container">
                    <a href="' . $url_logo . '" style="display: block; max-width: 130%;">
                        <img class="img-responsive" src="imagenes/cabeceraMppeuSep2025.png" title="Página Principal" data-bs-toggle="tooltip"/>
                    </a>
                </div>
            </div>';

$cintilloLogin = '<div class="container">
                <div class="cintillo-container">
                    <a href="index.php" style="display: block;">
                        <img class="img-responsive" src="imagenes/LOGO_MPPEU_2025.jpg" title="MPPEU" data-bs-toggle="tooltip"/>
                    </a>
                </div>
            </div>';

$titulo = ' <div class="container">
        <h2 class="titulo-login" align="center">Sistema Integral de Gestión y Activos</h2>';

// 2. CONSTRUCCIÓN DEL ENCABEZADO CON SUBTÍTULO CONDICIONAL
$encabezado = '
    <div class="container">
        <h2 class="titulo-principal" align="center">Sistema Integral de Gestión y Activos</h2>';

// Insertar el subtítulo solo si existe y NO es super admin
if (!$super_admin && !empty($subtituloModulo)) {
    $encabezado .= $subtituloModulo;
}

$encabezado .= '
        <nav class="navbar-dark navbar-expand-lg color-barra">
            <div class="container-fluid d-flex justify-content-center">';

// -----------------------
// --- LÓGICA DE MENÚ 
// -----------------------

if ($usuario) { 
    
    $encabezado .= '<div class="navbar-nav">';
    
    if ($super_admin) {
        $menu_super_admin = <<<EOT
            <div class="dropdown">
                <button type="button" class="boton dropdown-toggle mx-1" data-bs-toggle="dropdown">Gestión departamental</button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="almacen.php">Almacén</a>
                    <a class="dropdown-item" href="ente.php">Ente</a>
                    <a class="dropdown-item" href="dependencia.php">Dirección General</a>
                </div>
            </div>
            <div class="dropdown">
                <button type="button" class="boton dropdown-toggle mx-1" data-bs-toggle="dropdown">Almacén</button>
                <div class="dropdown-menu">
                    <h6 class="dropdown-header">Gestión de Recursos</h6>
                    <a class="dropdown-item" href="articulo.php">Artículo</a>
                    <a class="dropdown-item" href="clasificacion.php">Clasificación</a>
                    <a class="dropdown-item" href="medida.php">Medida</a>
                    <a class="dropdown-item" href="proveedor.php">Proveedor</a>
                    <h6 class="dropdown-header">Movimientos</h6>
                    <a class="dropdown-item" href="recursoIngreso.php">Ingreso de Recursos</a>
                    <a class="dropdown-item" href="recursoSalida.php">Distribución de Recursos</a>
                    <h6 class="dropdown-header">Listado</h6>
                    <a class="dropdown-item" href="recursoDisponible.php"> Disponible en Almacén</a>
                    <a class="dropdown-item" href="recursoSalidaListado.php">Listado de Recursos Distribuidos</a>
                </div>
            </div>
            <div class="dropdown">
                <button type="button" class="boton dropdown-toggle mx-1" data-bs-toggle="dropdown">Bienes</button>
                <div class="dropdown-menu">
                    <h6 class="dropdown-header">Movimientos</h6>
                    <a class="dropdown-item" href="bienes.php">Registro de Bien</a>
                    <a class="dropdown-item" href="bienesAsignar.php">Asignar Bien</a>
                    <a class="dropdown-item" href="bienesReasignar.php">Re-Asignar Bien</a>
                    <a class="dropdown-item" href="bienesDesvincular.php">Desuso del Bien</a>
                    <a class="dropdown-item" href="bienesDesincorporar.php">Desincorporar Bien</a>
                    <h6 class="dropdown-header">Definiciones</h6>
                    <a class="dropdown-item" href="bienesEstado.php">Estado del Bien</a>
                    <a class="dropdown-item" href="bienesClasificacion.php">Clasificacion del Bien</a>
                    <a class="dropdown-item" href="bienesConcepto.php">Concepto del Bien</a>
                     <h6 class="dropdown-header">Listado</h6>
                    <a class="dropdown-item" href="bienesListado.php">Listado de Bienes</a>
                    <a class="dropdown-item" href="bienesHistorial.php">Historial de Bienes</a>
                </div>
            </div>
            <div class="dropdown">
                <button type="button" class="boton dropdown-toggle mx-1" data-bs-toggle="dropdown">OTIC</button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="consumibles.php">Ingreso de consumibles</a>
                    <a class="dropdown-item" href="consumiblesSalida.php">Distribución de consumibles</a>
                    <a class="dropdown-item" href="consumiblesDisponible.php">Consumibles Disponibles</a>
                </div>
            </div>
            <div class="dropdown">
                <button type="button" class="boton dropdown-toggle mx-1" data-bs-toggle="dropdown">Usuario</button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" href="crearUsuario.php" title="Crear Usuario">Crear Usuario</a>
                    <a class="dropdown-item" href="cambiarContrasenia.php">Cambiar Contraseña</a>
                </div>
            </div>
EOT; 
        $encabezado .= $menu_super_admin;
            
    } else {
        // LÓGICA USUARIOS NORMALES

        //--MODULO: ALMACEN
        $puede_configurar_almacen = verificar_permiso_rapido('Almacén', 'almacen_crud_config'); 
        $menu_gestion_recursos = '';
        if ($puede_configurar_almacen) {
            $menu_gestion_recursos .= '<a class="dropdown-item" href="articulo.php">Artículo</a>';
            $menu_gestion_recursos .= '<a class="dropdown-item" href="clasificacion.php">Clasificación</a>';
            $menu_gestion_recursos .= '<a class="dropdown-item" href="medida.php">Medida</a>';
            $menu_gestion_recursos .= '<a class="dropdown-item" href="proveedor.php">Proveedor</a>';
        }

        if (!empty($menu_gestion_recursos)) {
            $encabezado .= '<div class="dropdown"><button type="button" class="boton dropdown-toggle mx-1" data-bs-toggle="dropdown">Gestión de Recursos</button><div class="dropdown-menu">' . $menu_gestion_recursos . '</div></div>';
        }

        $menu_movimientos_almacen = '';
        if (verificar_permiso_rapido('Almacén', 'almacen_ingreso')) { $menu_movimientos_almacen .= '<a class="dropdown-item" href="recursoIngreso.php">Ingreso de Recursos</a>'; }
        if (verificar_permiso_rapido('Almacén', 'almacen_distribuir')) { $menu_movimientos_almacen .= '<a class="dropdown-item" href="recursoSalida.php">Distribución de Recursos</a>'; }

        if (!empty($menu_movimientos_almacen)) {
            $encabezado .= '<div class="dropdown"><button type="button" class="boton dropdown-toggle mx-1" data-bs-toggle="dropdown">Movimientos</button><div class="dropdown-menu">' . $menu_movimientos_almacen . '</div></div>';
        }

         //--MODULO: BIENES
        $menu_bienes = '';
        $menu_movimientos_bienes = '';
        $menu_definiciones_bienes = '';
        $puede_ver_listado_bienes = verificar_permiso_rapido('Bienes', 'bienes_listado');

        if (verificar_permiso_rapido('Bienes', 'bienes_registrar')) { $menu_movimientos_bienes .= '<a class="dropdown-item" href="bienes.php">Registro de Bien</a>'; }
        if (verificar_permiso_rapido('Bienes', 'bienes_asignar')) { $menu_movimientos_bienes .= '<a class="dropdown-item" href="bienesAsignar.php">Asignar Bien</a>'; }
        if (verificar_permiso_rapido('Bienes', 'bienes_re_asignar')) { $menu_movimientos_bienes .= '<a class="dropdown-item" href="bienesReasignar.php">Re-Asignar Bien</a>'; }
        if (verificar_permiso_rapido('Bienes', 'bienes_desvincular')) { $menu_movimientos_bienes .= '<a class="dropdown-item" href="bienesDesvincular.php">Desuso del Bien</a>'; }
        if (verificar_permiso_rapido('Bienes', 'bienes_desincorporar')) { 
            $menu_movimientos_bienes .= '<a class="dropdown-item" href="bienesDesincorporar.php">Desincorporar Bien</a>'; }

        if (!empty($menu_movimientos_bienes)) {
            $menu_bienes .= '<div class="dropdown" style="display:inline-block;"><button type="button" class="boton dropdown-toggle mx-1" data-bs-toggle="dropdown">Movimientos</button><div class="dropdown-menu">' . $menu_movimientos_bienes . '</div></div>';
        }

        if (verificar_permiso_rapido('Bienes', 'bienes_estado')) { $menu_definiciones_bienes .= '<a class="dropdown-item" href="bienesEstado.php">Estado del Bien</a>'; }
        if (verificar_permiso_rapido('Bienes', 'bienes_clasificacion')) { $menu_definiciones_bienes .= '<a class="dropdown-item" href="bienesClasificacion.php">Clasificación del Bien</a>'; }
        if (verificar_permiso_rapido('Bienes', 'bienes_concepto')) { $menu_definiciones_bienes .= '<a class="dropdown-item" href="bienesConcepto.php">Concepto del Bien</a>'; }

        if (!empty($menu_definiciones_bienes)) {
            $menu_bienes .= '<div class="dropdown" style="display:inline-block;"><button type="button" class="boton dropdown-toggle mx-1" data-bs-toggle="dropdown">Definiciones</button><div class="dropdown-menu">' . $menu_definiciones_bienes . '</div></div>';
        }

        if ($puede_ver_listado_bienes) { $menu_bienes .= '<a class="boton mx-1" href="bienesListado.php">Listado de Bienes</a><a class="boton mx-1" href="bienesHistorial.php">Historial de Bienes</a>'; }
        if (!empty($menu_bienes)) { $encabezado .= $menu_bienes; }

         //--MODULO: OTIC
        $menu_movimientos_otic = '';
        if (verificar_permiso_rapido('OTIC', 'consumible_registrar')) { $menu_movimientos_otic .= '<a class="dropdown-item" href="consumibles.php">Ingreso de consumibles</a>'; }
        if (verificar_permiso_rapido('OTIC', 'consumible_distribuir')) { $menu_movimientos_otic .= '<a class="dropdown-item" href="consumiblesSalida.php">Distribución de consumibles</a>'; }

        if (!empty($menu_movimientos_otic)) {
            $encabezado .= '<div class="dropdown"><button type="button" class="boton dropdown-toggle mx-1" data-bs-toggle="dropdown">Movimientos</button><div class="dropdown-menu">' . $menu_movimientos_otic . '</div></div>';
        }
        if (verificar_permiso_rapido('OTIC', 'consumible_ver_stock')) { $encabezado .= '<a class="boton mx-1" href="consumiblesDisponible.php">Consumibles Disponibles</a>'; }
        
         //--FUNCIONES GENERALES DEL USUARIO
        $menu_usuario = '';
        if ($super_admin || verificar_permiso_rapido('Creador', 'crear_usuario')) { $menu_usuario .= '<a class="dropdown-item" href="crearUsuario.php">Crear Usuario</a>'; }
        if (verificar_permiso_rapido('Sistema', 'usuario_cambiar_password')) { $menu_usuario .= '<a class="dropdown-item" href="cambiarContrasenia.php">Cambiar Contraseña</a><a class="dropdown-item" href="#">Manual de Usuario</a>'; }
        
        if (!empty($menu_usuario)) {
            $encabezado .= '<div class="dropdown"><button type="button" class="boton dropdown-toggle mx-1" data-bs-toggle="dropdown">Usuario</button><div class="dropdown-menu">' . $menu_usuario . '</div></div>';
        }
    }
    
    $encabezado .= '</div>';
    $encabezado .= '<a class="boton" href="logout.php" role="button" data-bs-toggle="tooltip" title="Cerrar Sesión">Cerrar Sesión</a>';
}

$encabezado .= '
            </div>
        </nav>
    </div>';

$pie = '<footer>
            <div style="background-color: #CFF4FC; padding: 10px 0; border-top: 1px solid #dee2e6; text-align: center; font-size: 0.8rem; color: #6c757d;">
                <p> SISTEMA DE GESTIÓN DE ALMACÉN (SGA) &copy; 2025 | Coordinación de Desarrollo | MPPEU</p>
            </div>
        </footer>';
?>