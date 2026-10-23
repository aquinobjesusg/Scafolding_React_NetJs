<?php     

# Funciona que hace el Select
function SelectFrom($conexion_bd,$sql) {

       // Ejecutar la consulta de forma segura
        $query = $conexion_bd->query($sql);
        $datos = $query->fetchAll(PDO::FETCH_ASSOC);

  return $datos;
}

function InsertInto($conexion_bd,$cedula_buscar) {
  $codigo = '';

    try {
        $id_titular_hidden = $_SESSION['id_titular_actual'] ?? $_POST['id_titular_hidden'] ?? null;

        if (!$id_titular_hidden) {
            die("Error crítico: No se ha asociado ningún titular válido a este beneficiario.");
        }

        $fecha_registro_beneficiario   = $_POST['fecha_registro_beneficiario'] ?? date('Y-m-d');
        $fecha_nacimiento_beneficiario = $_POST['fecha_nacimiento_beneficiario'] ?? '';
        $cedula_beneficiario           = !empty($_POST['cedula_beneficiario']) ? $_POST['cedula_beneficiario'] : null;
        $nombre_beneficiario           = $_POST['nombre_beneficiario'] ?? '';
        $apellido_beneficiario         = $_POST['apellido_beneficiario'] ?? '';
        $telef_beneficiario            = !empty($_POST['telefono_beneficiario']) ? $_POST['telefono_beneficiario'] : null;
        $id_sexo                       = !empty($_POST['id_sexo']) ? $_POST['id_sexo'] : null;
        $id_nacionalidad               = !empty($_POST['id_nacionalidad']) ? $_POST['id_nacionalidad'] : null;

        $sql_insert = "INSERT INTO beneficiario (
                        fecha_registro_beneficiario, fecha_nacimiento_beneficiario, cedula_beneficiario, 
                        nombre_beneficiario, apellido_beneficiario, telefono_beneficiario, id_sexo, 
                        id_nacionalidad, id_titular
                       ) VALUES (
                        :f_reg, :f_nac, :ced, :nom, :ape, :tel, :sexo, :nac, :tit
                       )";

        $stmt_i = $conexion_bd->prepare($sql_insert);
        $stmt_i->execute([
            ':f_reg'   => $fecha_registro_beneficiario,
            ':f_nac'   => $fecha_nacimiento_beneficiario,
            ':ced'     => $cedula_beneficiario,
            ':nom'     => $nombre_beneficiario,
            ':ape'     => $apellido_beneficiario,
            ':tel'     => $telef_beneficiario,
            ':sexo'    => $id_sexo,
            ':nac'     => $id_nacionalidad,
            ':tit'     => $id_titular_hidden 
        ]);

        unset($_SESSION['id_titular_actual']);
        header("Location: pantallaPrincipal.php");
        exit;

    } catch (PDOException $e) {
        die("Error al insertar en la tabla beneficiario: " . $e->getMessage());
    }

  return $codigo;
}

function UpdateSet($conexion_bd,$cedula_buscar) {
  $codigo = '';

    try {
        // Capturar ID del titular a modificar
        $id_titular = !empty($_POST['id_titular']) ? $_POST['id_titular'] : null;

        if (!$id_titular) {
            die("Error: No se recibió el identificador del titular para actualizar.");
        }

        // Capturar datos básicos limpios
        $fecha_nacimiento_titular = $_POST['fecha_nacimiento_titular'] ?? '';
        $cedula_titular           = $_POST['cedula_titular'] ?? '';
        $nombre_titular           = $_POST['nombre_titular'] ?? '';
        $apellido_titular         = $_POST['apellido_titular'] ?? '';
        $telefono_titular         = $_POST['telefono_titular'] ?? '';
        $id_sexo                  = !empty($_POST['id_sexo']) ? $_POST['id_sexo'] : null;
        $id_nacionalidad          = !empty($_POST['id_nacionalidad']) ? $_POST['id_nacionalidad'] : null;
        
        // Lógica de discriminación según Radio Button
        $tipo_institucion = $_POST['tipo_institucion'] ?? 'U';

        if ($tipo_institucion === 'U') {
            $id_universidad       = !empty($_POST['id_universidad']) ? $_POST['id_universidad'] : null;
            $id_ente              = null;
            $id_direccion_general = null;
            $id_direccion_linea   = null;
            $id_coordinacion      = null;
        } else {
            $id_universidad       = null;
            $id_ente              = !empty($_POST['id_ente']) ? $_POST['id_ente'] : null;
            $id_direccion_general = !empty($_POST['id_direccion_general']) ? $_POST['id_direccion_general'] : null;
            $id_direccion_linea   = !empty($_POST['id_direccion_linea']) ? $_POST['id_direccion_linea'] : null;
            $id_coordinacion      = !empty($_POST['id_coordinacion']) ? $_POST['id_coordinacion'] : null;
        }

        // Consulta SQL estructurada para PostgreSQL
        $sqlUpd = "UPDATE titular SET 
                    fecha_nacimiento_titular = :fnt,
                    cedula_titular = :ct,
                    nombre_titular = :nom, 
                    apellido_titular = :ape,
                    telefono_titular = :tt,
                    id_sexo = :sex,
                    id_universidad = :uni,
                    id_ente = :ente,
                    id_direccion_general = :diregen,
                    id_direccion_linea = :direlin,
                    id_coordinacion = :coor,
                    id_nacionalidad = :nac
                  WHERE id_titular = :id";

        $stmt = $conexion_bd->prepare($sqlUpd);
        $stmt->execute([
            ':fnt'     => $fecha_nacimiento_titular,
            ':ct'      => $cedula_titular,
            ':nom'     => $nombre_titular,
            ':ape'     => $apellido_titular,
            ':tt'      => $telefono_titular,
            ':sex'     => $id_sexo,
            ':uni'     => $id_universidad,
            ':ente'    => $id_ente,
            ':diregen' => $id_direccion_general,
            ':direlin' => $id_direccion_linea,
            ':coor'    => $id_coordinacion,
            ':nac'     => $id_nacionalidad,
            ':id'      => $id_titular
        ]);

        header("Location: titularLista.php");
        exit;

    } catch (PDOException $e) {
        die("Error crítico al actualizar: " . $e->getMessage());
    }
    
  return $codigo;
}

function DeleteFrom($conexion_bd,$tabla,$campo,$id) {
  $codigo = '';

    try {

//sentencia: elimina lo que está en la tabla titular donde id_titular sea lo que está en el marcador de posición= :id

        $sqlDel = "DELETE FROM $tabla WHERE $campo = :id";
//sentencia (stmt) = base de datos preparate para ejecutar lo eque está en la variable: sqlDel

        $stmt = $conexion_bd->prepare($sqlDel);
        
//¿Te acuerdas del casillero :id que preparamos? Ábrelo y mete este valor $id ahora".
        $stmt->execute([':id' => $id]);
        
    } catch (Exception $e) {
        die("Error al eliminar el registro: " . $e->getMessage());
    } 
    
  return $codigo;
}
