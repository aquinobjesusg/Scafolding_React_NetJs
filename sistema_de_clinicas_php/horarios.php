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

$ltitulo = "Horarios Médicos";

// La Consulta SQL optimizada y corregida con nombres largos y completos
$sql = "SELECT id_horarios_medicos, id_especialidad, id_medico, lun_t1, lun_t2, mar_t1, mar_t2, mie_t1, mie_t2, jue_t1, jue_t2, vie_t1, vie_t2, sab_t1, sab_t2, dom_t1, dom_t2
FROM public.horarios_medicos; ";

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
 'Horarios Médicos', 'id_especialidad', 'id_medico', 'lun_t1', 'lun_t2', 'mar_t1', 'mar_t2', 'mie_t1', 'mie_t2', 'jue_t1', 'jue_t2', 'vie_t1', 'vie_t2', 'sab_t1', 'sab_t2', 'dom_t1', 'dom_t2'

];

$campos = [
'id_horarios_medicos', 'id_especialidad', 'id_medico', 'lun_t1', 'lun_t2', 'mar_t1', 'mar_t2', 'mie_t1', 'mie_t2', 'jue_t1', 'jue_t2', 'vie_t1', 'vie_t2', 'sab_t1', 'sab_t2', 'dom_t1', 'dom_t2'

];

$codigoHTML = MostrarLista($conexion_bd, $ltitulo, $sql, $mi_busqueda_html, $encabezados, $campos);

// 2. IMPORTANTE: Cargar el archivo HTML (Template)
$tbs->LoadTemplate('horarios.html');

// 4. Mostrar el resultado
$tbs->Show();