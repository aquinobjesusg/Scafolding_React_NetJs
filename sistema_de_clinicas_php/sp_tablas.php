<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);


include ("include/config.php");
//include 'include/utilidades.php';
//include 'include/funcionesPantalla.php';
//include 'include/funcionesDB.php';

// mod
try {

   $conexion_bd = new PDO("pgsql:host=$dbhost;port=$dbport;dbname=$dbdatabase", $dbuser, $dbpasswd);

    $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $sql = 'CREATE TABLE sp_tablas (id_sp_tablas SERIAL NOT NULL,sentencia_sql VARCHAR(1000) NULL DEFAULT NULL,procesado VARCHAR NULL DEFAULT NULL, PRIMARY KEY (id_sp_tablas))';
    $stmt = $conexion_bd->exec($sql);
    
    $sql = "SELECT public.iniciar_tablas();";
    $stmt = $conexion_bd->prepare($sql);
    
    // Calcular todas las Edades de los Pacientes
    $sql = "SELECT PUBLIC.calcular_todas_edades();";
    $stmt = $conexion_bd->prepare($sql);
    
    $sql = "INSERT INTO public.motivo_consulta (id_motivo_consulta, nombre_motivo_consulta) VALUES (1, 'CONSULTA GENERAL');";
    $stmt = $conexion_bd->prepare($sql);
    
    $sql = "INSERT INTO public.parametros_general (id_parametros, nombre_parametros, valor_parametros) VALUES (1, 'BENEFICIARIOS MENORES A 25', '25');";
    $stmt = $conexion_bd->prepare($sql);
    $sql = "INSERT INTO public.parametros_general (id_parametros, nombre_parametros, valor_parametros) VALUES (2, 'BENEFICIARIOS MENORES', '9');";
    $stmt = $conexion_bd->prepare($sql);
    
    $sql = "INSERT INTO public.parentesco (id_parentesco, nombre_parentesco) VALUES (1, 'PADRE');";
    $stmt = $conexion_bd->prepare($sql);
    $sql = "INSERT INTO public.parentesco (id_parentesco, nombre_parentesco) VALUES (2, 'MADRE');";
    $stmt = $conexion_bd->prepare($sql);
    $sql = "INSERT INTO public.parentesco (id_parentesco, nombre_parentesco) VALUES (3, 'HIJO');";
    $stmt = $conexion_bd->prepare($sql);
    $sql = "INSERT INTO public.parentesco (id_parentesco, nombre_parentesco) VALUES (4, 'CONYUGE');";
    $stmt = $conexion_bd->prepare($sql);
    
    $sql = "INSERT INTO public.sexo (id_sexo, sexo) VALUES (1, 'Masculino');";
    $stmt = $conexion_bd->prepare($sql);
    $sql = "INSERT INTO public.sexo (id_sexo, sexo) VALUES (2, 'Femenino');";
    $stmt = $conexion_bd->prepare($sql);
    
    $sql = "INSERT INTO public.nacionalidad (id_nacionalidad, nombre_nacionalidad, abreviatura) VALUES (1, 'Venezolana', 'V');";
    $stmt = $conexion_bd->prepare($sql);
    $sql = "INSERT INTO public.nacionalidad (id_nacionalidad, nombre_nacionalidad, abreviatura) VALUES (2, 'Extranjera', 'E');";
    $stmt = $conexion_bd->prepare($sql);
    
    $sql = "INSERT INTO public.tipo_de_empleado (id_tipo_de_empleado, nombre_tipo_de_empleado) VALUES (1, 'Actipo');";
    $stmt = $conexion_bd->prepare($sql);
    $sql = "INSERT INTO public.tipo_de_empleado (id_tipo_de_empleado, nombre_tipo_de_empleado) VALUES (2, 'Pensionado/Juvidado');";
    $stmt = $conexion_bd->prepare($sql);
    $sql = "INSERT INTO public.tipo_de_empleado (id_tipo_de_empleado, nombre_tipo_de_empleado) VALUES (3, 'Cortesía');";
    $stmt = $conexion_bd->prepare($sql);
    
    $sql = "INSERT INTO public.rol (id_rol, nombre) VALUES (1, 'ADMIN');";
    $stmt = $conexion_bd->prepare($sql);
    
    $sql = "INSERT INTO public.estado_cita (id_estado, descripción_estado) VALUES (1, 'Pendiente');";
    $stmt = $conexion_bd->prepare($sql);
    $sql = "INSERT INTO public.estado_cita (id_estado, descripción_estado) VALUES (2, 'Cancelada');";
    $stmt = $conexion_bd->prepare($sql);
    $sql = "INSERT INTO public.estado_cita (id_estado, descripción_estado) VALUES (3, 'Reprogramada');";
    $stmt = $conexion_bd->prepare($sql);
    $sql = "INSERT INTO public.estado_cita (id_estado, descripción_estado) VALUES (4, 'Anulada');";
    $stmt = $conexion_bd->prepare($sql);
    $sql = "INSERT INTO public.estado_cita (id_estado, descripción_estado) VALUES (5, 'Atendida');";
    $stmt = $conexion_bd->prepare($sql);
    
    
    
} catch (PDOException $e) {
    die("¡Error de conexión!: " . $e->getMessage());
}

echo "Fin del Proceso";


?>