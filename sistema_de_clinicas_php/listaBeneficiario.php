<?php
include "include/header_php.php";

// Conexión con la base de datos
try {
    $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

$valor          = null;
$mi_menu_html   = MostrarMenu($conexion_bd, $valor);
$mi_footer_html = MostrarFooter($conexion_bd, $valor);

$ltitulo = "Lista de Beneficiarios";

// La Consulta SQL optimizada
// La Consulta SQL optimizada y corregida con nombres largos y completos
$sql = "SELECT t.*,
               t.fecha_nacimiento_titular,
               t.cedula_titular,
               t.nombre_titular,
               t.apellido_titular,
               t.telefono_titular,
               s.sexo,
               u.nombre_universidad,
               e.nom_ente AS nombre_ente,
               n.nombre_nacionalidad,
               dg.nom_direccion_general AS nombre_direccion_general,
               dl.nom_direccion_linea AS nombre_direccion_linea,
               c.nom_coordinacion AS nombre_coordinacion
        FROM paciente t
        LEFT JOIN sexo s ON t.id_sexo = s.id_sexo
        LEFT JOIN universidad u ON t.id_universidad = u.id_universidad
        LEFT JOIN ente e ON t.id_ente = e.id_ente
        LEFT JOIN nacionalidad n ON t.id_nacionalidad = n.id_nacionalidad
        LEFT JOIN direccion_general dg ON t.id_direccion_general = dg.id_direccion_general
        LEFT JOIN direccion_linea dl ON t.id_direccion_linea = dl.id_direccion_linea
        LEFT JOIN coordinacion c ON t.id_coordinacion = c.id_coordinacion
        ORDER BY t.id_titular DESC;";

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
$mi_busqueda_html ='';

$encabezados = [
    'N#',
    'fecha_nacimiento_titular',
    'cedula_titular',
    'nombre_titular',
    'apellido_titular',
];

$campos = [
    'id_titular',
    'fecha_nacimiento_titular',
    'cedula_titular',
    'nombre_titular',
    'apellido_titular',
];

$codigoHTML = MostrarLista($conexion_bd, $ltitulo, $sql, $mi_busqueda_html, $encabezados, $campos);




/*
                                <td class="text-center">
                                    <div class="d-flex justify-content-center gap-2">
                                        <form action="titularEditar.php" method="post" class="m-0">
                                            <button type="submit" name="id_titular_edit" value="[titular.id_titular;noerr]" class="btn btn-sm btn-outline-primary shadow-sm px-2 py-1" title="Editar">
                                                Editar
                                            </button>
                                        </form>

                                        <form action="titularEliminar.php" method="post" class="m-0" onsubmit="return confirm('¿Estás seguro de eliminar este titular?');">
                                            <button type="submit" name="id_titular_eliminar" value="[titular.id_titular;noerr]" class="btn btn-sm btn-outline-danger shadow-sm px-2 py-1" title="Eliminar">
                                                Eliminar
                                            </button>
                                        </form>
                                    </div>
                                </td>
*/

// 2. IMPORTANTE: Cargar el archivo HTML (Template)
$tbs->LoadTemplate('listaBeneficiario.html');

// 4. Mostrar el resultado
$tbs->Show();
