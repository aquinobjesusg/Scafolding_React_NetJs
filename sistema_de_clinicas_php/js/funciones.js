
/*$(document).ready(function() {

    // =========================================================================
    // 1. CONTROLADOR DE INTERFAZ: ALTERNAR ADSCRIPCIÓN (UNIVERSIDAD / ENTE)
    // =========================================================================
    function alternarAdscripcion(form) {
        var infoSeleccionada = form.find('input[name="tipo_institucion"]:checked').val();
        
        var bloqueUniversidad = form.find('#grupo_universidad, .grupo-universidad');
        var bloqueEntes       = form.find('#grupo_entes_cascada, .grupo-entes');

        if (infoSeleccionada === 'U') {
            bloqueUniversidad.slideDown(200);
            bloqueEntes.slideUp(200);
        } else if (infoSeleccionada === 'E') {
            bloqueEntes.slideDown(200);
            bloqueUniversidad.slideUp(200);
        }
    }

    // Evaluación al cargar la página
    $('form').each(function() {
        if ($(this).find('input[name="tipo_institucion"]').length > 0) {
            alternarAdscripcion($(this));
        }
    });

    // Detectar cambios en los Radio Buttons
    $(document).on('change', 'input[name="tipo_institucion"]', function() {
        var formActual = $(this).closest('form');
        alternarAdscripcion(formActual);

        var seleccion = $(this).val();
        if (seleccion === 'U') {
            // Limpiar valores sin romper el estado AJAX abruptamente
            formActual.find('#registro_id_ente').val('');
            formActual.find('#registro_id_direccion_general').html('<option value="">Seleccione una Dirección General</option>').prop('disabled', true);
            formActual.find('#registro_id_direccion_linea').html('<option value="">Seleccione una Dirección de Línea</option>').prop('disabled', true);
            formActual.find('#registro_id_coordinacion').html('<option value="">Seleccione una Coordinación</option>').prop('disabled', true);
        } else if (seleccion === 'E') {
            formActual.find('#reg_id_universidad').val('');
        }
    });


    // =========================================================================
    // 2. CONTROLADOR AJAX: SELECTORES EN CASCADA (GET_DATOS.PHP)
    // =========================================================================

    // PASO A: Cuando cambia el Ente Adscrito Principal
    $(document).on('change', '#registro_id_ente', function() {
        var valor_id = $(this).val();
        
        var $dg   = $('#registro_id_direccion_general');
        var $dl   = $('#registro_id_direccion_linea');
        var $coor = $('#registro_id_coordinacion');

        if (valor_id !== "" && valor_id !== null) {
            $.ajax({
                url: 'get_datos.php',
                type: 'POST',
                data: { 
                    tipo: 'general', 
                    id_buscar: valor_id 
                },
                success: function(resultado) {
                    $dg.html('<option value="">Seleccione una Dirección General</option>' + resultado)
                       .prop('disabled', false);
                    $dl.html('<option value="">Seleccione una Dirección de Línea</option>').prop('disabled', true);
                    $coor.html('<option value="">Seleccione una Coordinación</option>').prop('disabled', true);
                },
                error: function(xhr, status, error) {
                    console.error("Error al cargar Dirección General:", error);
                }
            });
        } else {
            $dg.html('<option value="">Seleccione una Dirección General</option>').prop('disabled', true);
            $dl.html('<option value="">Seleccione una Dirección de Línea</option>').prop('disabled', true);
            $coor.html('<option value="">Seleccione una Coordinación</option>').prop('disabled', true);
        }
    });

    // PASO B: Cuando cambia la Dirección General
    $(document).on('change', '#registro_id_direccion_general', function() {
        var valor_id = $(this).val();
        
        var $dl   = $('#registro_id_direccion_linea');
        var $coor = $('#registro_id_coordinacion');

        if (valor_id !== "" && valor_id !== null) {
            $.ajax({
                url: 'get_datos.php',
                type: 'POST',
                data: { 
                    tipo: 'linea', 
                    id_buscar: valor_id 
                },
                success: function(resultado) {
                    $dl.html('<option value="">Seleccione una Dirección de Línea</option>' + resultado)
                       .prop('disabled', false);
                    $coor.html('<option value="">Seleccione una Coordinación</option>').prop('disabled', true);
                },
                error: function(xhr, status, error) {
                    console.error("Error al cargar Dirección de Línea:", error);
                }
            });
        } else {
            $dl.html('<option value="">Seleccione una Dirección de Línea</option>').prop('disabled', true);
            $coor.html('<option value="">Seleccione una Coordinación</option>').prop('disabled', true);
        }
    });

    // PASO C: Cuando cambia la Dirección de Línea
    $(document).on('change', '#registro_id_direccion_linea', function() {
        var valor_id = $(this).val();
        
        var $coor = $('#registro_id_coordinacion');

        if (valor_id !== "" && valor_id !== null) {
            $.ajax({
                url: 'get_datos.php',
                type: 'POST',
                data: { 
                    tipo: 'coordinacion', 
                    id_buscar: valor_id 
                },
                success: function(resultado) {
                    $coor.html('<option value="">Seleccione una Coordinación</option>')
                         .append(resultado)
                         .prop('disabled', false);
                },
                error: function(xhr, status, error) {
                    console.error("Error al cargar Coordinación:", error);
                }
            });
        } else {
            $coor.html('<option value="">Seleccione una Coordinación</option>').prop('disabled', true);
        }
    });


    // =========================================================================
    // 3. LÓGICA EXCLUSIVA PARA EL LISTADO DE TITULARES
    // =========================================================================
    function actualizarContadorListado() {
        if ($("#tabla_titulares").length > 0) {
            var totalFilas = $("#tabla_titulares tbody tr:visible").length;
            $("#total_registros").text(totalFilas);
        }
    }

    actualizarContadorListado();

    $(document).on("keyup", "#buscar_cedula, #buscar_general", function() {
        var cedula = $("#buscar_cedula").val().toLowerCase();
        var general = $("#buscar_general").val().toLowerCase();

        $("#tabla_titulares tbody tr").each(function() {
            var textoFila = $(this).text().toLowerCase();
            var textoCedula = $(this).find('td').eq(1).text().toLowerCase();

            var coincideCedula = textoCedula.indexOf(cedula) > -1;
            var coincideGeneral = textoFila.indexOf(general) > -1;

            if (coincideCedula && coincideGeneral) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        actualizarContadorListado();
    });


    // =========================================================================
    // 4. LÓGICA MEJORADA PARA EL CÁLCULO DE LA EDAD
    // =========================================================================
    function calcularEdad() {
        var valorFecha = $('#fecha_nacimiento_titular').val();
        var $inputEdad = $('#edad_titular');

        if (valorFecha) {
            // Dividir la fecha manualmente (YYYY-MM-DD) para evitar desfases por zona horaria UTC
            var partes = valorFecha.split('-');
            if (partes.length === 3) {
                var anioNac = parseInt(partes[0], 10);
                var mesNac  = parseInt(partes[1], 10) - 1; // Meses en JS son 0-11
                var diaNac  = parseInt(partes[2], 10);

                var hoy = new Date();
                var edad = hoy.getFullYear() - anioNac;
                var mes = hoy.getMonth() - mesNac;

                if (mes < 0 || (mes === 0 && hoy.getDate() < diaNac)) {
                    edad--;
                }

                $inputEdad.val(edad >= 0 ? edad : 0);
            }
        } else {
            $inputEdad.val('');
        }
    }

    // Se escucha 'change' e 'input' para capturar la fecha inmediatamente
    $(document).on('change input', '#fecha_nacimiento_titular', function() {
        calcularEdad();
    });

    // Calcular la edad si el campo ya viene lleno desde el servidor
    if ($('#fecha_nacimiento_titular').val()) {
        calcularEdad();
    }

}); 
*/                                                                                                                                                                                                