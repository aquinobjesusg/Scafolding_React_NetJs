<?php

include "include/header_php.php";

// Conexión con la base de datos
try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

if (isset($_GET['accion']) && isset($_GET['id'])) {
    $id = (int) $_GET['id'];
    
    // Si la acción es 'activar', in_inactivo debe ser 0. Si es 'inactivar', debe ser 1.
    $estado = ($_GET['accion'] === 'activar') ? 0 : 1;
    
    cambiarEstadoUsuario($conexion_bd, $id, $estado);
    header("Location: listaUsuario.php");
    exit;
}

$valor          = null;
$mi_menu_html   = MostrarMenu($conexion_bd, $valor);
$mi_footer_html = MostrarFooter($conexion_bd, $valor);

$ltitulo = "Lista de Usuarios";

// La Consulta SQL optimizada y corregida con nombres largos y completos
$sql = "SELECT u.id_usuario, u.nombre || ' ' || u.apellido AS nombre, u.correo, u.id_rol, 
               r.nombre AS nombre_rol, u.contrasenia, u.usuario, u.in_activo, 
               u.in_cambiar_clave, u.id_modulo, m.nombre_modulos, m.comportamiento , ver_activo(u.in_autoriza) as in_autoriza , ver_activo(u.in_cita_autorizacion) as in_cita_autorizacion
        FROM public.usuario u
        LEFT JOIN public.modulos m ON m.id_modulos = u.id_modulo
        LEFT JOIN public.rol r ON u.id_rol = r.id_rol
        ORDER BY u.id_usuario DESC;";

/*
$mi_busqueda_html ='
                <div class="col-md-3">
                    <label class="form-label fw-bold small text-muted"><i class="bi bi-card-text me-1"></i>Buscar por
                        Cédula</label>
                    <input type="text" id="buscar_cedula" class="form-control input-buscar shadow-sm"
                        placeholder="Ej: 12345678..." />
                </div>

                <div class="col-md-5">
                    <label class="form-label fw-bold small text-muted"><i class="bi bi-search me-1"></i>Búsqueda General
                        (Nombres,
                        Universidades, Entes...)</label>
                    <input type="text" id="buscar_general" class="form-control input-buscar shadow-sm"
                        placeholder="Escriba un término para buscar..." />
                </div>

                <div class="col-md-4">
                    <div class="d-flex align-items-center justify-content-md-end justify-content-center gap-2 mb-1">
                        <span class="badge-contador shadow-sm fw-bold py-2 px-3 m-0 text-nowrap">
                            <i class="bi bi-people-fill me-1"></i>Total:
                            <span id="total_registros">0</span>
                        </span>

                        <a href="titularRegistro.html"
                            class="btn btn-success shadow-sm btn-rounded py-2 px-3 fw-bold text-white text-nowrap">
                            <i class="bi bi-person-plus-fill me-1"></i>Registrar Nuevo
                        </a>
                    </div>
                </div>

';*/
$mi_busqueda_html = '';

$encabezados = [
    'ID','Nombre y Apellido','Nombre de Usuario','Rol','Módulo',  "in_activo", "Autorizado", "Autorizar Cita"
];
/*
$campos = [
    'id_usuario', 'nombre','apellido','correo','nombre_rol','nombre_modulos', "in_cambiar_clave", "in_activo"
];
*/
$campos = [
    'id_usuario', 'nombre','correo','nombre_rol','nombre_modulos',  "in_activo", "in_autoriza", "in_cita_autorizacion"
];

$formulario = [
   'id','nombre', 'apellido', 'correo','rol','modulo'
];

$campos_formulario = [
   'id_usuario','nombre', 'apellido', 'correo','nombre','nombre_modulos'
];

$tipos_campos_formulario = [
   'int','text', 'text', 'email','text','text'
];

// Create Read Update Delete View Exel Pdf
$acciones ="CRUDVEP";
$acciones ="CRUVE";

// Activar Inactivar
$procesos = "AI"; 

if( $_SESSION['in_autoriza'] == 1 ) {
 //   $procesos = "P01"; 
}

// Create Read Update Delete View Exel Pdf
//$acciones ="";

// Activar Inactivar
//$procesos = ""; 

function cambiarEstadoUsuario($conexion_bd, $id, $estado)
{
    // Actualiza la columna in_inactivo con el nuevo estado (0 o 1)
    $sql = "UPDATE public.usuario SET in_activo = :estado WHERE id_usuario = :id";
    $stmt = $conexion_bd->prepare($sql);
    $stmt->execute([
        ':estado' => $estado,
        ':id'     => $id
    ]);
}

$codigoHTML = MostrarLista($conexion_bd, $ltitulo, $sql, $mi_busqueda_html, $encabezados, $campos, $acciones, $procesos, $formulario, $campos_formulario, $tipos_campos_formulario = '', $porPagina = false, $borrarTabla = 'usuario', $borrarCampoid = 'id_usuario', $borrarPagina = 'listaUsuario.php', $datatable = true );

// 2. IMPORTANTE: Cargar el archivo HTML (Template)
$tbs->LoadTemplate('listaUsuario.html');

// 4. Mostrar el resultado
$tbs->Show();
