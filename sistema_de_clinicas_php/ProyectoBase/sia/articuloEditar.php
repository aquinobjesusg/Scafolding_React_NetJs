<?php
session_start();
include ("include/permisos_helper.php");
include ('include/tbs_class.php');
include ("include/config.php");
include ("include/portada.php");
include_once ('funcs/funcs.php');

if (!isset($_SESSION['id_usuario']) || $_SESSION['id_usuario'] == 0) {
    header("Location: index.php?valor=0");
    exit;
}

$usuario = $_SESSION['id_usuario'];
$nombre = $_SESSION['nom_usuario'];
$correo = $_SESSION['correo_usuario'];
$super_admin = $_SESSION['super_admin'] ?? false;

// VERIFICACIÓN DE PERMISOS
if (!$super_admin && !verificar_permiso_rapido('Almacén', 'almacen_editar')) {
    header("Location: acceso_denegado.php");
    exit;
}
    $tbs = new clsTinyButStrong;
    $tbs->LoadTemplate('articuloEditar.html','UTF-8');
    try
    {
    //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
        
      
        $medidaListado = "SELECT * FROM medida ORDER BY nom_medida ;";
        $clasificacionListado = "SELECT * FROM clasificacion ORDER BY nom_clasificacion;";

        $medidaPE = $conexion_bd->query($medidaListado); // $medida ya es la cadena SQL
        $medida = $medidaPE->fetchAll(PDO::FETCH_ASSOC);

        // Ejecutar la consulta para clasificaciones
        $clasificacionPE = $conexion_bd->query($clasificacionListado); // $clasificacion ya es la cadena SQL
        $clasificacion = $clasificacionPE->fetchAll(PDO::FETCH_ASSOC);

        $id_articulo_edit = null;
        $articulo = [];

        // Primero verificar si estamos en modo actualización (Guardarcambios)
        if (isset($_POST['Guardarcambios']) && isset($_POST['id_articulo_actualizar'])) {
            $id_articulo_edit = $_POST['id_articulo_actualizar'];
            
            // Validación de campos obligatorios
            $camposObligatorios = [
                'nom_articulo',
                'id_medida',
                'id_clasificacion'
            ];
            
            $camposVacios = [];
            foreach ($camposObligatorios as $campo) {
                if (empty(trim($_POST[$campo] ?? ''))) {
                    $camposVacios[] = $campo;
                }
            }
            
            if (!empty($camposVacios)) {
                $_SESSION['mensaje'] = "Todos los campos son obligatorios";
                $_SESSION['tipo_mensaje'] = 'danger';
                
                // Recargar los datos para mostrar el formulario con errores
                $articuloSql = "SELECT id_articulo, nom_articulo, 
                                    m.id_medida, nom_medida, c.id_clasificacion, nom_clasificacion 
                                FROM articulo a
                                INNER JOIN medida m ON m.id_medida = a.id_medida 
                                INNER JOIN clasificacion c ON c.id_clasificacion = a.id_clasificacion 
                                WHERE id_articulo = :id_articulo_edit";
                
                $articuloPE = $conexion_bd->prepare($articuloSql);
                $articuloPE->execute([':id_articulo_edit' => $id_articulo_edit]);
                $articulo = $articuloPE->fetch(PDO::FETCH_ASSOC);
                
            } else {
                // Todos los campos están llenos, proceder con la actualización
                $conexion_bd->beginTransaction();

                $articuloUpdate = "UPDATE articulo
                                     SET id_usuario = :id_usuario,
                                         nom_articulo = :nom_articulo,
                                         id_medida = :id_medida,
                                         id_clasificacion = :id_clasificacion
                                  WHERE id_articulo = :id_articulo_edit";
                
                $resultadoArticuloUpdate = $conexion_bd->prepare($articuloUpdate);
                $resultadoArticuloUpdate->execute([
                    ':id_usuario' => $_SESSION['id_usuario'] ?? null,
                    ':nom_articulo' => trim($_POST['nom_articulo']),
                    ':id_medida' => (int)$_POST['id_medida'],
                    ':id_clasificacion' => (int)$_POST['id_clasificacion'],
                    ':id_articulo_edit' => $id_articulo_edit
                ]);
                
                $conexion_bd->commit();
                
                $_SESSION['mensaje'] = 'Registro actualizado exitosamente.';
                $_SESSION['tipo_mensaje'] = 'success';
                header("Location: articulo.php");
                exit();
            }
            
        } elseif (isset($_POST['Editar']) && !empty($_POST['Editar'])) {
            // Modo edición (mostrar formulario)
            $id_articulo_edit = $_POST['Editar'];
            
        } elseif (isset($_POST['id_articulo_actualizar']) && !empty($_POST['id_articulo_actualizar'])) {
            // Backup por si acaso
            $id_articulo_edit = $_POST['id_articulo_actualizar'];
            
        } else {
            $_SESSION['mensaje'] = 'Error: El artículo a editar no fue encontrado.';
            $_SESSION['tipo_mensaje'] = 'danger';
            header("Location: articulo.php");
            exit();
        }

        // Si no tenemos datos de artículo aún, cargarlos
        if (empty($articulo) && $id_articulo_edit) {
            // Consulta para obtener datos del artículo
            $articuloSql = "SELECT id_articulo, nom_articulo, 
                                m.id_medida, nom_medida, c.id_clasificacion, nom_clasificacion 
                            FROM articulo a
                            INNER JOIN medida m ON m.id_medida = a.id_medida 
                            INNER JOIN clasificacion c ON c.id_clasificacion = a.id_clasificacion 
                            WHERE id_articulo = :id_articulo_edit";
            
            $articuloPE = $conexion_bd->prepare($articuloSql);
            $articuloPE->execute([':id_articulo_edit' => $id_articulo_edit]);
            $articulo = $articuloPE->fetch(PDO::FETCH_ASSOC);

            if (!$articulo) {
                $_SESSION['mensaje'] = 'Error: El artículo no existe.';
                $_SESSION['tipo_mensaje'] = 'danger';
                header("Location: articulo.php");
                exit();
            }
        }

        // Consultas para obtener las listas de medidas y clasificaciones
        $medida = "SELECT id_medida, nom_medida FROM medida ORDER BY nom_medida";
        $clasificacion = "SELECT id_clasificacion, nom_clasificacion FROM clasificacion ORDER BY nom_clasificacion";
        
        // Preparar datos para TBS
        $tbs->MergeField('articulo', $articulo);
        $tbs->MergeBlock('medida_option', $conexion_bd, $medida);
        $tbs->MergeBlock('clasificacion_option', $conexion_bd, $clasificacion);

    } catch (PDOException $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack(); 
        }
        $_SESSION['mensaje'] = "Error de base de datos: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en articuloEditar.php (PDOException): " . $e->getMessage());
        header("Location: articulo.php");
        exit();
    } catch (Exception $e) {
        if ($conexion_bd->inTransaction()) {
            $conexion_bd->rollBack();
        }
        $_SESSION['mensaje'] = "Error inesperado: " . $e->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        error_log("Error en articuloEditar.php (Exception): " . $e->getMessage());
        header("Location: articulo.php");
        exit();
    }

    // Mensajes de sesión
    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje']);
    unset($_SESSION['tipo_mensaje']);

    $tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
    $tbs->Show();
    

?>