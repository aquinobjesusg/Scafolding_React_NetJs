<!--
    //ESTE ARCHIVO PHP FUE DESHABILITADO POR PREVENCION EL 15/07/25 

    //Para incorporar nuevamente al sistema SIA debe añadir el siguiente boton a bienesListado.php:

                                <button type="button" class="btn btn-outline-danger btn-sm btn-eliminar"
                                    data-bs-toggle="modal" data-bs-target="#confirmarEliminarModal"
                                    data-id-bien-eliminar="[listadoBienes.id_bienes;htmlconv=no]"
                                    data-codigo-bien-eliminar="[listadoBienes.codigo_bienes;htmlconv=no]"> Eliminar
                                </button>

    //Y el siguiente modal de confirmacion a bienes.js dentro del DOM

    //Lógica para el modal de Confirmación de Eliminación
    const confirmarEliminarModal = document.getElementById('confirmarEliminarModal');
    if (confirmarEliminarModal) {
        confirmarEliminarModal.addEventListener('show.bs.modal', function (event) {
            // Botón que disparó el modal (el botón "Eliminar" de la tabla)
            const button = event.relatedTarget; 
            const idBien = button.getAttribute('data-id-bien-eliminar');
            const codigoBien = button.getAttribute('data-codigo-bien-eliminar'); // Obtenemos el código

            // Actualizar el valor del input hidden con el ID del bien
            const idBienEliminarHidden = document.getElementById('idBienEliminarHidden');
            idBienEliminarHidden.value = idBien;

            // Mostrar el código del bien en el modal para mayor claridad
            const codigoBienAEliminarSpan = document.getElementById('codigoBienAEliminar');
            if (codigoBienAEliminarSpan) {
                codigoBienAEliminarSpan.textContent = codigoBien; // Asignamos el código
            }
        });
    } 

    //Y la estructura de dicho modal a bienesListado.html

        <div class="modal fade" id="confirmarEliminarModal" tabindex="-1" aria-labelledby="confirmarEliminarModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title" id="confirmarEliminarModalLabel">Confirmar Eliminación</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ¿Está seguro de que desea eliminar el bien con código <strong id="codigoBienAEliminar">[listadoBienes.codigo_bienes]</strong>? Esta acción es irreversible.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <form id="formEliminarBien" action="bienesEliminar.php" method="post" style="display:inline;">
                            <input type="hidden" name="Eliminar" id="idBienEliminarHidden">
                            <button type="submit" class="btn btn-danger">Eliminar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

-->

<?php
/*  
    include ('include/tbs_class.php');
    include ("include/config.php");

    session_start();

    try
    {
        //Conexión a la base de datos sia
        $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
        $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Manejo de errores con excepciones

        if (isset($_POST['Eliminar'])) 
        {   //Si el ID viene del botón "Eliminar" de bienes.php/html
            $id_bienes_eliminar = $_POST['Eliminar'];
            
            $bienSql = "DELETE FROM oticbienes.bienes WHERE id_bienes = :id_bienes_eliminar;";
            $bienPE = $conexion_bd->prepare($bienSql);
            $bienPE->execute([':id_bienes_eliminar' => $id_bienes_eliminar]);

            //Verificar si se eliminó alguna fila y mostrar mensaje**
            if ($bienPE->rowCount() > 0) 
            {
                $_SESSION['mensaje'] = 'Registro eliminado exitosamente.';
                $_SESSION['tipo_mensaje'] = 'success';
            } else 
            {
                $_SESSION['mensaje'] = 'Advertencia: El registro con ID ' . $id_bienes_eliminar . ' no fue encontrado o ya ha sido eliminado.';
                $_SESSION['tipo_mensaje'] = 'danger';
            }
            header("Location: bienesListado.php"); // Redirigir siempre a la página de listado después de la operación
            exit();

        } else 
        {
            //Manejar el caso donde no se recibe un ID
            $_SESSION['mensaje'] = 'Error: El bien a Eliminar no fue encontrado, recargue el sitio e intente nuevamente.';
            $_SESSION['tipo_mensaje'] = 'danger';
            header("Location: bienesListado.php"); // Redirigir a la página de listado
            exit();
        }

    } catch (PDOException $sqlError) {
        // Guardar mensaje de error en la sesión
        $_SESSION['mensaje'] = 'Error al eliminar el registro: ' . $sqlError->getMessage();
        $_SESSION['tipo_mensaje'] = 'danger';
        header("Location: bienesListado.php"); // Redirigir a la página de listado
        exit();
    } finally {
        // Cierre de la conexión
        
    }

    // Recuperar y limpiar el mensaje de la sesión para mostrarlo en el modal
    $mensaje = $_SESSION['mensaje'] ?? null;
    $tipo_mensaje = $_SESSION['tipo_mensaje'] ?? null;
    unset($_SESSION['mensaje']);
    unset($_SESSION['tipo_mensaje']);

    // Asignar las variables para TinyButStrong
    $tbs->MergeBlock('msj', array(array('mensaje' => $mensaje, 'tipo_mensaje' => $tipo_mensaje)));
    $tbs->Show();
*/
?>