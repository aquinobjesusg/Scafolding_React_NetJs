<?php
include("include/header_php.php"); 
// Asegúrate de incluir aquí el archivo donde declaraste la función inactivarUsuario() si no está en header_php.php

$id_usuario = $_GET['id'] ?? null;

// Validamos que el ID exista y sea un número entero
if ($id_usuario && filter_var($id_usuario, FILTER_VALIDATE_INT)) {
    try {
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Llamamos a la función
        inactivarUsuario($conexion_bd, $id_usuario);

    } catch (PDOException $e) {
        die("Error al inactivar el usuario: " . $e->getMessage());
    }
}

// Redireccionamos de vuelta a la lista de usuarios
header("Location: listaUsuario.php");
exit;
?>