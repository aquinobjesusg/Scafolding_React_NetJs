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

$ltitulo = "Lista de Beneficiario";

// La Consulta SQL optimizada
// La Consulta SQL optimizada y corregida con nombres largos y completos


/*	
    "id_titular" SERIAL NOT NULL,
	"id_usuario" INTEGER NULL DEFAULT NULL,
	"fecha_registro_titular" TIMESTAMPTZ NULL DEFAULT CURRENT_TIMESTAMP,
	"fecha_nacimiento_titular" DATE NULL DEFAULT NULL,
    "id_nacionalidad" INTEGER NULL DEFAULT NULL,
	"cedula_titular" VARCHAR(20) NULL DEFAULT NULL,
	"nombre_titular" VARCHAR(255) NULL DEFAULT NULL,
	"apellido_titular" VARCHAR(255) NULL DEFAULT NULL,
	"id_sexo" INTEGER NULL DEFAULT NULL,
	"id_universidad" INTEGER NULL DEFAULT NULL,
	"id_ente" INTEGER NULL DEFAULT NULL,
	"id_direccion_general" INTEGER NULL DEFAULT NULL,
	"id_direccion_linea" INTEGER NULL DEFAULT NULL,
	"id_coordinacion" INTEGER NULL DEFAULT NULL,
	"correo_titular" VARCHAR(20) NULL DEFAULT NULL,
	"edad_titular" INTEGER NULL DEFAULT NULL,
	"telefono_titular" VARCHAR(20) NULL DEFAULT NULL,
	"telefono2_titular" SERIAL NOT NULL,
	"direccion_corta_casa_titular" VARCHAR(250) NULL DEFAULT NULL,
	"id_estado" INTEGER NULL DEFAULT NULL,
	"in_activo" INTEGER NOT NULL DEFAULT 1,
	"id_paciente_titular" INTEGER NULL DEFAULT NULL,
	"in_condicion_especial" INTEGER NOT NULL DEFAULT 0,
	"in_cortesia" INTEGER NOT NULL DEFAULT 0,
	"id_parentesco" INTEGER NULL DEFAULT NULL,
*/


$sql = "SELECT *, ver_parentesco(id_parentesco) id_parentesco, ver_activo(in_condicion_especial) in_condicion_especial FROM paciente, sexo, nacionalidad WHERE paciente.in_cortesia = 0 AND sexo.id_sexo = paciente.id_sexo AND nacionalidad.id_nacionalidad = paciente.id_nacionalidad AND id_titular <> id_paciente_titular";

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
    'N#'
, "Nacionalidad", "cédula", "nombre", "apellido", "sexo", "edad", "telefono", "telefono2", "Parentesco", "Condicion Especial" ];

$campos = [
"id_titular", "abreviatura", "cedula_titular", "nombre_titular", "apellido_titular", "sexo", "edad_titular", "telefono_titular", "telefono2_titular", "id_parentesco", "in_condicion_especial"
];

//                  MostrarLista($conexion_bd, $ltitulo, $vsql, $mi_busqueda_html, $encabezados, $campos, $acciones = "CRUDVEP", $procesos = "AI", $formulario = '', $campos_formulario = '', $tipos_campos_formulario = '', $porPagina = false)
$codigoHTML =       MostrarLista($conexion_bd, $ltitulo, $sql, $mi_busqueda_html, $encabezados, $campos, ''             ,            'oo' ,               '',                     '' ,                            '', true );




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
$tbs->LoadTemplate('beneficiarioLista.html');

// 4. Mostrar el resultado
$tbs->Show();
