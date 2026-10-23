<?php
include("include/header_php.php");

error_reporting(E_ALL & ~E_WARNING);
ini_set('display_errors', 1);
// Conexión con la base de datos
try {
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
        die("Error de conexión: " . $e->getMessage());
}

$valor = null;
$mi_menu_html = MostrarMenu($conexion_bd, $valor);
$mi_footer_html = MostrarFooter($conexion_bd, $valor);



// 2. IMPORTANTE: Cargar el archivo HTML (Template) 
// $tbs->LoadTemplate('interfaces.html');

// La Consulta SQL optimizada
// La Consulta SQL optimizada y corregida con nombres largos y completos
/*    $sql = "SELECT t.*, 
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

// Ejecutar la consulta de forma segura
$query = $conexion_bd->query($sql);
$datos_titulares = $query->fetchAll(PDO::FETCH_ASSOC);
*/


// Fusionar los datos con la plantilla HTML de TinyButStrong
//$tbs->MergeBlock('titular', $datos_titulares);

// 3. Fusionar los datos con la tabla
//$tbs->MergeBlock('titular', $conexion_bd, $sql);

// 4. Mostrar el resultado
//$tbs->Show();

$mensaje = '';
$mensajeOk = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $trazabilidad = '';
        $trazabilidad = $trazabilidad . "INSERT INTO trazabilidad ";
        $trazabilidad = $trazabilidad . "(fecha_de_registro,evento,id_usuario,direccion_ip) ";
        //$trazabilidad = $trazabilidad . "VALUES ('".obtenerFechaHora()."','INTERFACES"."','".obtenerUsuario()."', '".obtenerIP()."') ";
        $trazabilidad = $trazabilidad . "VALUES ('" . obtenerFechaHora() . "','INTERFACES-PROCESAR ARCHIVO','" . obtenerUsuario() . "', '" . obtenerIP() . "') ";


        // 1. Verificar que llegó el archivo sin errores
        if (!isset($_FILES['archivo']) || $_FILES['archivo']['error'] !== UPLOAD_ERR_OK) {
                $mensaje = '❌ Error al subir el archivo. Código: ' . ($_FILES['archivo']['error'] ?? 'desconocido');
        } else {
                $archivo = $_FILES['archivo'];

                // 2. Validar tamaño (máx 5 MB)
                $maxBytes = 100 * 1024 * 1024;
                if ($archivo['size'] > $maxBytes) {
                        $mensaje = '❌ El archivo supera los 100 MB permitidos.';
                } else {
                        // 3. Validar extensión / tipo MIME
                        //$permitidos = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'txt', 'docx', 'zip'];
                        $permitidos = ['xlsx'];

                        $ext = strtolower(pathinfo($archivo['name'], PATHINFO_EXTENSION));

                        if (!in_array($ext, $permitidos, true)) {
                                $mensaje = '❌ Extensión no permitida. Solo: ' . implode(', ', $permitidos);
                        } else {
                                // 4. Carpeta destino
                                $carpeta = __DIR__ . '/descarga/';
                                if (!is_dir($carpeta)) {
                                        mkdir($carpeta, 0755, true);
                                }

                                // 5. Generar nombre único y seguro (evita sobrescribir y path traversal)
                                $nombreSeguro = bin2hex(random_bytes(8)) . '.' . $ext;
                                $destino = $carpeta . $nombreSeguro;

                                // 6. Mover el archivo temporal
                                if (move_uploaded_file($archivo['tmp_name'], $destino)) {
                                        $mensajeOk = '✅ Archivo ' . $archivo['name'] . ' subido correctamente: <strong>' . htmlspecialchars($nombreSeguro) . '</strong>';

                                        $id_usuario = obtenerUsuario();
                                        $observacion = "Se cargo el archivo de Excel";
                                        $archivo_origen = $archivo['name'];
                                        $archivo_destino = $nombreSeguro;
                                        $in_procesado = 0;
                                        $in_activo = 1;
                                        $fecha_de_registro = obtenerFechaHora();

                                        $sql = "INSERT INTO log_archivos (id_usuario, fecha_de_registro, observacion, archivo_origen, archivo_destino, in_procesado, in_activo) 
                                                 VALUES (:id_usuario, :fecha_de_registro, :observacion, :archivo_origen, :archivo_destino, :in_procesado, :in_activo);";

                                        $stmt = $conexion_bd->prepare($sql);
                                        $stmt->execute([
                                                'id_usuario' => $id_usuario,
                                                'fecha_de_registro' => $fecha_de_registro,
                                                'observacion' => $observacion,
                                                'archivo_origen' => $archivo_origen,
                                                'archivo_destino' => $archivo_destino,
                                                'in_procesado' => $in_procesado,
                                                'in_activo' => $in_activo
                                        ]);

                                        if (function_exists('registrarTraza')) {
                                                registrarTraza($conexion_bd, 'REGISTRO-LOG', 'Archivo EXCEL', "Se cargo el archivo de Excel " . $archivo_origen);
                                        }
                                        
                                } else {
                                        $mensaje = '❌ No se pudo mover el archivo a la carpeta destino.';
                                }
                        }
                }
        }
                        if (function_exists('registrarTraza')) {
                                IF( $mensaje !== '' ) {
                                        registrarTraza($conexion_bd, 'REGISTRO-LOG-ERROR', 'ARCHIVO EXCEL', "Mensaje " . $mensaje );
                                }
                                IF( $mensajeOk !== '' ) {
                                        registrarTraza($conexion_bd, 'REGISTRO-LOG-OK', 'ARCHIVO EXCEL', "Mensaje " . $mensajeOk );
                                }
                }

}

$sql = "SELECT id_log_archivos, fecha_de_registro, ver_usuario(id_usuario) id_usuario, observacion, archivo_origen, archivo_destino, in_procesado, in_activo FROM log_archivos";

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
	"id",
	"fecha_de_registro",
	"id_usuario",
	"observacion",
	"archivo_origen",
	"archivo_destino",
	"in_procesado",
	"in_activo",
];

$campos = [
	"id_log_archivos",
	"fecha_de_registro",
	"id_usuario",
	"observacion",
	"archivo_origen",
	"archivo_destino",
	"in_procesado",
	"in_activo",
];

$ltitulo = "Archivos Procesados";
echo $mi_menu_html;

$codigoHTML = MostrarLista($conexion_bd, $ltitulo, $sql, $mi_busqueda_html, $encabezados, $campos);



?>

<br>
<div class="container-fluid px-4 pb-5">

        <div class="row mb-4">
                <div class="col-12 text-center">
                        <h2 class="fw-bold text-dark mb-1">Interfaces</h2>
                </div>
        </div>

        <!-- ALERTA DE ÉXITO -->
        <?php if ($mensajeOk !== ''): ?>
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <strong><?= $mensajeOk ?></strong>
                        <!--  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button> -->
                </div>
        <?php endif; ?>


        <!-- ALERTA DE ERROR -->
        <?php if ($mensaje !== ''): ?>
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong><?= $mensaje ?></strong>
                        <!--  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button> -->
                </div>

        <?php endif; ?>








        <div class="card shadow-sm border-0 btn-rounded">
                <div class="card-body p-4">


                        <div class="col-md-4">
                                <div class="card h-100 shadow-sm carta-menu border-top border-info border-5">
                                        <div class="card-body p-4 text-center">
                                                <span class="card-icon text-primary"></span>
                                                <h4 class="card-title fw-bold">Actualizar Titulares - Beneficiarios
                                                </h4>
                                                <!--<p class="card-text text-muted small">
                                                        Actualizaci[on de los Archivos].
                                                </p>
                                                <a href="#" class="btn btn-primary w-100 btn-rounded">Acceder</a> -->
                                                <!-- enctype OBLIGATORIO para subir archivos -->
                                                <br>
                                                <form action="interfaces.php" method="POST"
                                                        enctype="multipart/form-data">
                                                        <!--label for="archivo">Selecciona un archivo:</label>-->
                                                        <input type="file" name="archivo" id="archivo" required><br>
                                                        <br>
                                                        <button class="btn btn-primary w-100 btn-rounded"
                                                                type="submit">Subir</button>
                                                </form>


                                        </div>
                                </div>
                        </div>



                </div>
        </div>

        <?php
        /*file_uploads = On
        upload_max_filesize = 10M
        post_max_size = 12M        ; debe ser mayor que upload_max_filesize
        upload_tmp_dir = /tmp      ; opcional
        max_file_uploads = 20
        */

        // index.php
//declare(strict_types=1);
        
        ?>

        <?php
        echo $codigoHTML;
        ?>

        <?php
        echo $mi_footer_html;
        ?>
</div>