<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// Depuración de rutas
echo "<script>console.log('Ruta base: " . $_SERVER['DOCUMENT_ROOT'] . "')</script>";

/*
// Personalizar manejo de errores
function customErrorHandler()
{
    // Redirigir o mostrar mensaje amigable
    header("Location: error.php");
    exit();
}
*/

function customErrorHandler($errno, $errstr, $errfile, $errline) {
    // Check if the error was suppressed by the @ operator
    if (!(error_reporting() & $errno)) {
        return false; // Let the standard PHP handler manage it
    }
    
    // Log the error (e.g., to a file, database, or a service like Sentry)
    error_log("Error: [$errno] $errstr in $errfile on line $errline\n", 3, "/var/tmp/my-errors.log");

    // Display a user-friendly message for certain errors (optional)
    if ($errno == E_USER_ERROR) {
        echo "A fatal error occurred! Please try again later.";
        exit(); // Stop script execution for fatal user errors
    }
    
    // For warnings and notices, you might just log them and continue
    // ...

    // Important: returning false passes the error to the standard PHP error handler
    // Returning true (or nothing) bypasses the standard handler.
    return true; 
}


// Set the custom error handler for all non-fatal errors
set_error_handler("customErrorHandler", E_ALL); 
// E_ALL & ~E_NOTICE handles all errors except notices, to avoid excessive logs.
//set_error_handler('customErrorHandler');
set_exception_handler('customErrorHandler');

// 1. Incluir conexión a la base de datos
require_once __DIR__ . '/../../conexion/conexion.php';
require_once __DIR__ . '/../../librerias/vendor/autoload.php';

        // 2. LUEGO las declaraciones use
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Color;

        // 3. FINALMENTE el resto del código
ob_clean();


if (!isset($pdo)) {
    die("Error: Conexión no establecida en " . __FILE__);
}


// 4. Obtener y validar el parámetro del mes
$mesParam = isset($_GET['mes']) ? trim($_GET['mes']) : null;
if (!$mesParam) {
    die("<div class='alert alert-danger'>No se ha especificado un mes.</div>");
}

// 5. Convertir mes en español a formato de fecha
$meses = [
    'enero' => '01',
    'febrero' => '02',
    'marzo' => '03',
    'abril' => '04',
    'mayo' => '05',
    'junio' => '06',
    'julio' => '07',
    'agosto' => '08',
    'septiembre' => '09',
    'octubre' => '10',
    'noviembre' => '11',
    'diciembre' => '12'
];

$partes = explode('-', $mesParam);
if (count($partes) !== 2) {
    die("<div class='alert alert-danger'>Formato de mes incorrecto. Use: Mes-Año (Ej: Junio-2025)</div>");
}

$mesNombre = strtolower($partes[0]);
$anio = $partes[1];

if (!isset($meses[$mesNombre])) {
    die("<div class='alert alert-danger'>Mes no reconocido: " . htmlspecialchars($partes[0]) . "</div>");
}

$mesNumero = $meses[$mesNombre];
$mesMostrar = ucfirst($mesNombre) . ' ' . $anio; // Para mostrar en título
$inicioMes = "$anio-$mesNumero-01";
$finMes = date("Y-m-t", strtotime($inicioMes));

// 6. Manejar la generación del archivo XLS con PHPSpreadsheet
if (isset($_GET['generar_xls'])) {
    try {

        ob_clean();

       // Obtener datos
        $sentencia = $pdo->prepare("SELECT * FROM pacientes WHERE Fecha BETWEEN :inicio AND :fin ORDER BY Fecha DESC");
        $sentencia->bindParam(':inicio', $inicioMes);
        $sentencia->bindParam(':fin', $finMes);
        $sentencia->execute();
        $listaPaciente = $sentencia->fetchAll(PDO::FETCH_ASSOC);

        // Crear Excel
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Pacientes ' . $mesParam);

        // ENCABEZADOS
        $encabezados = ['ID', 'Fecha', 'Especialidad', 'Titular', 'Cédula Titular', 'Paciente', 'Cédula Paciente', 'Fecha Nac.', 'Sexo', 'Edad', 'Diagnóstico', 'Teléfono', 'Universidad/Ente', 'Motivo Consulta', 'Traslados', 'Observaciones'];
        
        // Escribir encabezados
        $columna = 'A';
        foreach ($encabezados as $encabezado) {
            $sheet->setCellValue($columna . '1', $encabezado);
            $columna++;
        }

        // DATOS
        $fila = 2;
        foreach ($listaPaciente as $paciente) {
            $datosFila = [
                $paciente['ID'],
                $paciente['Fecha'],
                $paciente['Especialidad'],
                $paciente['Titular'],
                $paciente['Cedula_T'],
                $paciente['Paciente'],
                $paciente['Cedula_P'],
                $paciente['Fecha_de_nacimiento'],
                $paciente['Sexo'],
                $paciente['Edad'],
                $paciente['Diagnostico'],
                $paciente['Telefono'],
                $paciente['Universidad_ente'],
                $paciente['Motivo_consulta'],
                $paciente['Traslados'],
                $paciente['Observaciones']
            ];
            
            $columna = 'A';
            foreach ($datosFila as $valor) {
                $sheet->setCellValue($columna . $fila, $valor);
                $columna++;
            }
            $fila++;
        }

        // ====================
        // 🎨 ESTILOS PROFESIONALES
        // ====================

        // 1. ESTILO PARA ENCABEZADOS (Fondo azul, texto blanco, negrita)
        $headerStyle = [
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
                'size' => 11
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '2E75B6'] // Azul profesional
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_LEFT,
                'vertical' => Alignment::VERTICAL_CENTER
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000']
                ]
            ]
        ];
        
        $sheet->getStyle('A1:P1')->applyFromArray($headerStyle);

        // 2. ESTILO PARA DATOS (Alineación izquierda, bordes)
        $dataStyle = [
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_LEFT,
                'vertical' => Alignment::VERTICAL_CENTER
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => 'DDDDDD']
                ]
            ]
        ];
        
        $ultimaFila = count($listaPaciente) + 1;
        $sheet->getStyle('A2:P' . $ultimaFila)->applyFromArray($dataStyle);

        // 3. ESTILO PARA FILAS ALTERNADAS (Zebra effect)
        for ($fila = 2; $fila <= $ultimaFila; $fila++) {
            if ($fila % 2 == 0) {
                // Filas pares - fondo gris muy claro
                $sheet->getStyle('A' . $fila . ':P' . $fila)
                    ->getFill()
                    ->setFillType(Fill::FILL_SOLID)
                    ->getStartColor()
                    ->setARGB('FFF2F2F2');
            }
        }

        // 4. AUTO-AJUSTAR COLUMNAS AL CONTENIDO
        foreach (range('A', 'P') as $columna) {
            $sheet->getColumnDimension($columna)->setAutoSize(true);
        }

        // 5. ALTURA DE FILAS
        $sheet->getRowDimension(1)->setRowHeight(25); // Encabezados más altos
        for ($fila = 2; $fila <= $ultimaFila; $fila++) {
            $sheet->getRowDimension($fila)->setRowHeight(20);
        }

        // 6. CONGELAR ENCABEZADOS (para scroll)
        $sheet->freezePane('A2');

        // ====================
        // 💾 DESCARGAR ARCHIVO
        // ====================

        $filename = 'pacientes_' . preg_replace('/[^a-zA-Z0-9]/', '_', $mesParam) . '.xlsx';
        
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="' . $filename . '"');
        header('Cache-Control: max-age=0');
        header('Pragma: no-cache');
        header('Expires: 0');

        $writer = new Xlsx($spreadsheet);
        $writer->save('php://output');
        exit();

    } catch (Exception $e) {
        die("Error al generar Excel: " . $e->getMessage());
    }
}

// 7. Mensajes de éxito/error
$mensaje = '';
$error = '';

// Manejar mensajes de éxito/error de la URL (AGREGADO)
if (isset($_GET['success']) && $_GET['success'] === 'delete') {
    $mensaje = "Paciente eliminado correctamente";
}

if (isset($_GET['error']) && $_GET['error'] === 'delete_fallido' && isset($_GET['msg'])) {
    $error = htmlspecialchars($_GET['msg']);
}

// 8. Manejar acciones POST (Eliminar) - CÓDIGO CORREGIDO
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['accion']) && $_POST['accion'] === 'btnEliminar' && isset($_POST['txtID'])) {
        $idEliminar = $_POST['txtID'];
        try {
            // 1. Verificar que el paciente existe
            $stmt = $pdo->prepare("SELECT * FROM pacientes WHERE ID = ?");
            $stmt->execute([$idEliminar]);

            if ($stmt->rowCount() > 0) {
                // 2. Eliminar realmente el registro
                $deleteStmt = $pdo->prepare("DELETE FROM pacientes WHERE ID = ?");
                $deleteStmt->execute([$idEliminar]);

                if ($deleteStmt->rowCount() > 0) {
                    // Éxito: redirigir con mensaje
                    header("Location: tabla_pacientes_mes.php?success=delete&mes=" .
                        urlencode($mesParam));
                    exit();
                } else {
                    $error = "Error al eliminar el paciente con ID " . htmlspecialchars($idEliminar);
                }
            } else {
                $error = "No se encontró el paciente con ID " . htmlspecialchars($idEliminar);
            }
        } catch (PDOException $e) {
            $error = "Error al eliminar el paciente: " . $e->getMessage();
        }

        // Si hubo error, redirigir con el mensaje de error
        if (!empty($error)) {
            header("Location: tabla_pacientes_mes.php?error=delete_fallido&msg=" .
                urlencode($error) . "&mes=" . urlencode($mesParam));
            exit();
        }
    }
}

// 9. Obtener pacientes del mes específico
$listaPaciente = [];
$cantidadPacientes = 0;

try {
    $sentencia = $pdo->prepare("SELECT * FROM  pacientes
                               WHERE Fecha BETWEEN :inicio AND :fin
                               ORDER BY Fecha DESC");

    $sentencia->bindParam(':inicio', $inicioMes);
    $sentencia->bindParam(':fin', $finMes);
    $sentencia->execute();

    $listaPaciente = $sentencia->fetchAll(PDO::FETCH_ASSOC);
    $cantidadPacientes = count($listaPaciente);

} catch (PDOException $e) {
    $error = "Error al cargar pacientes: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pacientes de <?= htmlspecialchars($mesMostrar) ?></title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap4.min.css">
    <style>
        body {
            background-color: rgb(17, 81, 145);
            color: white;
        }

        .container {
            margin-top: 30px;
            background-color: rgba(255, 255, 255, 0.9);
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
            color: #333;
        }

        .mes-titulo {
            color: #115191;
            border-bottom: 2px solid #115191;
            padding-bottom: 15px;
            margin-bottom: 25px;
            text-align: center;
        }



        .search-box {
            background-color: #e9ecef;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .search-label {
            font-weight: bold;
            color: #13329bff;
        }

        .dataTables_filter label {
            display: flex;
            align-items: center;
        }

        .dataTables_filter input {
            margin-left: 10px;
            border-radius: 20px;
            padding: 5px 15px;
            border: 1px solid #ced4da;
        }

        .table th {
            background-color: #115191;
            color: white;
        }

        .table-hover tbody tr:hover {
            background-color: rgba(17, 81, 145, 0.1);
        }

        .btn-action {
            margin: 3px;
            min-width: 80px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1 class="mes-titulo">Pacientes de <?= htmlspecialchars($mesMostrar) ?></h1>

        <div class="d-flex justify-content-between align-items-center mb-4">
            <a href="gestion_carpetas.php" class="btn btn-light">
                <i class="fas fa-arrow-left"></i> Volver a Gestión de Carpetas
            </a>

        <a href="./tabla_pacientes_mes.php?generar_xls=1&mes=<?= urlencode($mesParam) ?>" 
        class="btn btn-success">
            <i class="fas fa-file-excel"></i> Generar Excel
        </a>

        </div>

        <div class="search-box">
            <div class="row">
                <div class="col-md-12">
                    <p class="search-label"><i class="fas fa-info-circle"></i> Puede buscar pacientes por cédula, nombre
                        o cualquier campo</p>
                </div>
            </div>
        </div>

        <p class="text-center lead mb-4">Total registros: <span
                class="badge badge-primary"><?= $cantidadPacientes ?></span></p>

        <?php if ($mensaje): ?>
            <div class="alert alert-success"><?= $mensaje ?></div>
        <?php endif; ?>

        <?php if ($error): ?>
            <div class="alert alert-danger"><?= $error ?></div>
        <?php endif; ?>

        <div class="table-responsive">
            <table id="tablaPacientes" class="table table-striped table-bordered table-hover" style="width:100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Especialidad</th>
                        <th>Titular</th>
                        <th>Cédula Titular</th>
                        <th>Paciente</th>
                        <th>Cédula Paciente</th>
                        <th>Fecha Nac.</th>
                        <th>Sexo</th>
                        <th>Edad</th>
                        <th>Diagnóstico</th>
                        <th>Teléfono</th>
                        <th>Universidad/Ente</th>
                        <th>Motivo Consulta</th>
                        <th>Traslados</th>
                        <th>Observaciones</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!empty($listaPaciente)): ?>
                        <?php foreach ($listaPaciente as $paciente): ?>
                            <tr>
                                <td><?= htmlspecialchars($paciente['ID']) ?></td>
                                <td><?= htmlspecialchars($paciente['Fecha']) ?></td>
                                <td><?= htmlspecialchars($paciente['Especialidad']) ?></td>
                                <td><?= htmlspecialchars($paciente['Titular']) ?></td>
                                <td><?= htmlspecialchars($paciente['Cedula_T']) ?></td>
                                <td><?= htmlspecialchars($paciente['Paciente']) ?></td>
                                <td><?= htmlspecialchars($paciente['Cedula_P']) ?></td>
                                <td><?= htmlspecialchars($paciente['Fecha_de_nacimiento']) ?></td>
                                <td><?= htmlspecialchars($paciente['Sexo']) ?></td>
                                <td><?= htmlspecialchars($paciente['Edad']) ?></td>
                                <td><?= htmlspecialchars($paciente['Diagnostico']) ?></td>
                                <td><?= htmlspecialchars($paciente['Telefono']) ?></td>
                                <td><?= htmlspecialchars($paciente['Universidad_ente']) ?></td>
                                <td><?= htmlspecialchars($paciente['Motivo_consulta']) ?></td>
                                <td><?= htmlspecialchars($paciente['Traslados']) ?></td>
                                <td><?= htmlspecialchars($paciente['Observaciones']) ?></td>
                                <td>

                                  <a href="../tabla/modificar_pacientes.php?ID=<?= $paciente['ID'] ?>&mes=<?= urlencode($mesParam) ?>"
                                    class="btn btn-primary btn-sm btn-action">
                                        <i class="fas fa-edit"></i> Editar
                                    </a>

                                        <button type="button" class="btn btn-danger btn-sm btn-action btn-eliminar"
                                            data-id="<?= htmlspecialchars($paciente['ID']) ?>"
                                            data-nombre="<?= htmlspecialchars($paciente['Paciente']) ?>" data-toggle="modal"
                                            data-target="#confirmDeleteModal">
                                            <i class="fas fa-trash-alt"></i> Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr>
                            <td colspan="17" class="text-center">No hay pacientes registrados para este mes.</td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Modal de confirmación de eliminación -->
    <div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-labelledby="confirmDeleteModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="confirmDeleteModalLabel">Confirmar Eliminación</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>¿Estás seguro de eliminar al paciente <strong><span id="nombrePaciente"></span></strong>?</p>
                    <p class="text-danger"><i class="fas fa-exclamation-triangle"></i> Esta acción no se puede deshacer
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <form id="deleteForm" method="post" style="display: inline;">
                        <input type="hidden" name="txtID" id="deleteId">
                        <input type="hidden" name="accion" value="btnEliminar">
                        <input type="hidden" name="mes" value="<?= htmlspecialchars($mesParam) ?>">
                        <button type="submit" class="btn btn-danger">Sí, Eliminar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap4.min.js"></script>
    <script>
        $(document).ready(function () {
            // Inicializar DataTable con búsqueda mejorada
            var table = $('#tablaPacientes').DataTable({
                language: {
                    url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json',
                    search: "_INPUT_",
                    searchPlaceholder: "Buscar por cédula o nombre..."
                },
                order: [[0, 'desc']],
                dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>><"row"<"col-sm-12"tr>><"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>'
            });

            // Personalizar campo de búsqueda
            $('.dataTables_filter input').addClass('form-control form-control-sm');
            $('.dataTables_filter label').contents().filter(function () {
                return this.nodeType === 3;
            }).remove();

            // Manejar eliminación - ACTUALIZADO
            $('#confirmDeleteModal').on('show.bs.modal', function (event) {
                var button = $(event.relatedTarget);
                var id = button.data('id');
                var nombre = button.data('nombre');

                $('#deleteId').val(id);
                $('#nombrePaciente').text(nombre);
            });

            // Evitar envío doble del formulario - AGREGADO
            $('#deleteForm').submit(function () {
                $(this).find('button[type="submit"]').prop('disabled', true);
            });
        });
    </script>
</body>

</html>