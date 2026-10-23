<?php

function cargar_permisos_en_sesion(PDO $conexion_bd, int $id_usuario): array
{
    $sql = "
        SELECT 
            m.nom_modulo, 
            p.nom_permiso
        FROM 
            usuario_modulo_rol umr
        JOIN 
            modulo m ON umr.id_modulo = m.id_modulo
        JOIN 
            modulo_rol mr ON umr.id_modulo = mr.id_modulo AND umr.id_rol = mr.id_rol
        JOIN 
            rol_permiso rp ON mr.id_rol = rp.id_rol
        JOIN
            permiso p ON rp.id_permiso = p.id_permiso
        WHERE 
            umr.id_usuario = :id_usuario
        ORDER BY
            m.nom_modulo, p.nom_permiso;
    ";

    try {
        $stmt = $conexion_bd->prepare($sql);
        $stmt->bindParam(':id_usuario', $id_usuario, PDO::PARAM_INT);
        $stmt->execute();
        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $permisos_estructurados = [];
        
        // Estructurar los permisos: [Modulo] => [Permiso1, Permiso2, ...]
        foreach ($resultados as $row) {
            $modulo = $row['nom_modulo'];
            $permiso = $row['nom_permiso'];
            
            if (!isset($permisos_estructurados[$modulo])) {
                $permisos_estructurados[$modulo] = [];
            }
            
            $permisos_estructurados[$modulo][] = $permiso;
        }

        // GUARDAR EN LA CLAVE SINGULAR QUE USA TU CÓDIGO ACTUAL
        $_SESSION['permiso'] = $permisos_estructurados; 
        return $permisos_estructurados;

    } catch (PDOException $e) {
        error_log("Error al cargar permisos para el usuario $id_usuario: " . $e->getMessage());
        return [];
    }
}


function verificar_permiso_rapido($modulo_nombre, $permiso_nombre) {
    // VERIFICACIÓN PRIMARIA: SUPER ADMIN
    $super_admin = $_SESSION['super_admin'] ?? false;
    
    // DEBUG: Verificar estado de Super Admin
    error_log("DEBUG verificar_permiso_rapido - super_admin: " . ($super_admin ? 'true' : 'false'));
    error_log("DEBUG verificar_permiso_rapido - módulo: $modulo_nombre, permiso: $permiso_nombre");
    
    if ($super_admin) {
        error_log("DEBUG - Acceso concedido por Super Admin");
        return true; // Un Super Admin tiene todos los permisos
    }
    
    // VERIFICACIÓN DE PERMISOS NORMAL (RBAC)
    // Se usa la clave 'permiso' (singular)
    if (!isset($_SESSION['permiso'])) { 
        error_log("DEBUG - No hay permisos en sesión");
        return false;
    }
    
    if (!isset($_SESSION['permiso'][$modulo_nombre])) {
        error_log("DEBUG - No existe el módulo '$modulo_nombre' en permisos");
        return false;
    }

    $tiene_permiso = in_array($permiso_nombre, $_SESSION['permiso'][$modulo_nombre]);
    error_log("DEBUG - Permiso " . ($tiene_permiso ? "ENCONTRADO" : "NO ENCONTRADO"));
    
    return $tiene_permiso;
}

function confinar_acceso($modulo_nombre, $permiso_minimo) {
    // 1. CHEQUEO DE SUPER ADMINISTRADOR
    $super_admin = $_SESSION['super_admin'] ?? false; 
    
    error_log("DEBUG confinar_acceso - super_admin: " . ($super_admin ? 'true' : 'false'));
    
    if ($super_admin) {
        error_log("DEBUG - Acceso concedido a Super Admin");
        return; // Permite el acceso
    }
    
    // 2. CHEQUEO DE PERMISOS MODULAR
    if (!verificar_permiso_rapido($modulo_nombre, $permiso_minimo)) {
        error_log("DEBUG - Acceso DENEGADO, redirigiendo...");
        header("Location: acceso_denegado.php"); 
        exit;
    }
    
    error_log("DEBUG - Acceso concedido por permisos normales");
}