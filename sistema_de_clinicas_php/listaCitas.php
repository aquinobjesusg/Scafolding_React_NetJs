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

$ltitulo = "Lista de Citas";

// La Consulta SQL optimizada
// La Consulta SQL optimizada y corregida con nombres largos y completos
$sql = "SELECT id_cita, ver_paciente(id_titular) id_titular, ver_paciente(id_paciente) id_paciente, fecha_de_registro, fecha_de_cita, ver_especialidad(id_especialidad) id_especialidad, ver_usuario(id_usuario) id_usuario, ver_medico(id_medico) id_medico, observacion, ver_estado_cita(id_estado_cita) id_estado_cita, ver_motivo_consulta( id_motivo_consulta ) id_motivo_consulta, calcular_edad(id_titular) edad, ver_paciente_ente(id_titular), ver_paciente_estado(id_titular), ver_paciente_universidad(id_titular) 
FROM public.cita;";



$mi_busqueda_html ='';

$encabezados = [
'id_cita', 'id_titular', 'id_paciente', 'fecha_de_cita', 'id_especialidad', 'id_medico',  'id_estado_cita', 
];

$campos = [
'id_cita', 'id_titular', 'id_paciente', 'fecha_de_cita', 'id_especialidad', 'id_medico',  'id_estado_cita', 
];

$codigoHTML = MostrarLista($conexion_bd, $ltitulo, $sql, $mi_busqueda_html, $encabezados, $campos,"VE",            "",              '',           '',                   '',    false, $borrarTabla = '', $borrarCampoid = '', $borrarPagina = '', $datatable = true,  $miPaginaVer ='obtener_detalles_paciente.php');

// 2. IMPORTANTE: Cargar el archivo HTML (Template)
$tbs->LoadTemplate('listaCitas.html');

// 4. Mostrar el resultado
$tbs->Show();
