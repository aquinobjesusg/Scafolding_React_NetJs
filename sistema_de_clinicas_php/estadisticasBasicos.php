<?php
include("include/header_php.php");
include("Estadisticas/estadisticas_funciones.php");


// Conexión con la base de datos
    try {
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
        die("Error de conexión: " . $e->getMessage());
        }

        $valor = null;
$mi_menu_html = MostrarMenu($conexion_bd,$valor);
$mi_footer_html = MostrarFooter($conexion_bd,$valor);


$mi_estadisticas_html = MostrarEstadisticasBasicas($conexion_bd,$valor);


// 2. IMPORTANTE: Cargar el archivo HTML (Template) 
        $tbs->LoadTemplate('estadisticasBasicos.html');

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

// Ejecutar la consulta de forma segura
$query = $conexion_bd->query($sql);
$datos_titulares = $query->fetchAll(PDO::FETCH_ASSOC);

// Fusionar los datos con la plantilla HTML de TinyButStrong
$tbs->MergeBlock('titular', $datos_titulares);

// 3. Fusionar los datos con la tabla
$tbs->MergeBlock('titular', $conexion_bd, $sql);

// 4. Mostrar el resultado
$tbs->Show();
?>