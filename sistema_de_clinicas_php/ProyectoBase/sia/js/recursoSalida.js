$(document).ready(function() {
    let almacenActual = '';

    // ==========================================
    // 1. LÓGICA DE SELECTS DEPENDIENTES (JERARQUÍA)
    // ==========================================
    
    $(document).on('change', '.selector-dependiente', function() {
        const $selectActual = $(this);
        const tipoSiguiente = $selectActual.data('next'); // Obtiene "general", "linea" o "coordinacion"
        const idPadre = $selectActual.val();
        
        // Buscamos el select que sigue por su ID (ej: #select_general)
        const $selectSiguiente = $('#select_' + tipoSiguiente);
        
        if (!$selectSiguiente.length) return;

        // Resetear todos los selects que están por debajo en la cadena
        limpiarSelectsHijos(tipoSiguiente);

        if (idPadre != 0 && idPadre != "") {
            $.ajax({
                url: 'recursoSalida.php',
                type: 'POST',
                data: {
                    action: 'get_dependientes',
                    tipo: tipoSiguiente,
                    id_padre: idPadre
                },
                dataType: 'json',
                success: function(response) {
                    $selectSiguiente.prop('disabled', false);
                    $selectSiguiente.empty();
                    $selectSiguiente.append('<option value="0">Seleccionar</option>');
                    
                    if (response && response.length > 0) {
                        $.each(response, function(i, item) {
                            $selectSiguiente.append($('<option>', {
                                value: item.id,
                                text: item.nombre
                            }));
                        });
                    } else {
                        $selectSiguiente.append('<option value="0">Sin registros</option>');
                    }
                },
                error: function(xhr, status, error) {
                    console.error("Error en la carga de dependientes:", error);
                }
            });
        }
    });

    // Función para limpiar en cascada
    function limpiarSelectsHijos(nivelCambiado) {
        const orden = ['general', 'linea', 'coordinacion'];
        let banderaLimpiar = false;

        orden.forEach(nivel => {
            if (nivel === nivelCambiado) banderaLimpiar = true;
            if (banderaLimpiar) {
                const $s = $('#select_' + nivel);
                $s.html('<option value="0">Seleccionar</option>').prop('disabled', true);
            }
        });
    }

    // ==========================================
    // 2. LÓGICA DE ARTÍCULOS Y ALMACÉN
    // ==========================================

    $('#sel_continent').change(function() {
        almacenActual = $(this).val();
        actualizarSelectsArticulos();
    });

    function actualizarSelectsArticulos() {
        if (!almacenActual) {
            $('.articulo-select').each(function() {
                if ($(this).val() === '') {
                    $(this).html('<option value="">Seleccione un almacén primero</option>').prop('disabled', true);
                }
            });
            return;
        }

        $.ajax({
            url: 'recursoSalidaArticuloPorAlmacen.php',
            type: 'GET',
            data: { id_almacen: almacenActual },
            dataType: 'json',
            success: function(response) {
                var optionsHtml = '';
                if (response.success && response.articulos && response.articulos.length > 0) {
                    optionsHtml = '<option value="">Seleccionar artículo</option>';
                    $.each(response.articulos, function(index, articulo) {
                        optionsHtml += '<option value="' + articulo.id_articulo + '">' + articulo.nom_articulo + '</option>';
                    });
                    
                    $('.articulo-select').each(function() {
                        if ($(this).val() === '' || $(this).prop('disabled')) {
                            $(this).html(optionsHtml).prop('disabled', false);
                        }
                    });
                } else {
                    var mensaje = response.error || 'No hay artículos disponibles';
                    $('.articulo-select').html('<option value="">' + mensaje + '</option>').prop('disabled', true);
                }
            }
        });
    }

    // Agregar y eliminar filas (dinámico)
    $(document).on('click', '.add-articulo-btn', function() {
        if (!almacenActual) {
            mostrarModalError('Por favor, seleccione un almacén primero.');
            return;
        }
        var filaOriginal = $('.articulo-original');
        var nuevaFila = filaOriginal.clone().removeClass('articulo-original');
        nuevaFila.find('.add-articulo-btn').replaceWith('<button type="button" class="btn-acciones-eliminar remove-articulo-btn" title="Eliminar Fila"><i class="fa-solid fa-minus"></i></button>');
        nuevaFila.find('input, select').val('');
        $('#articulos-wrapper').append(nuevaFila);
        actualizarSelectsArticulos();
    });

    $(document).on('click', '.remove-articulo-btn', function() {
        $(this).closest('.articulo-item').remove();
    });

    // ==========================================
    // 3. VALIDACIÓN Y MODALES
    // ==========================================

    $('form[name="tbs"]').on('submit', function(e) {
        // Validación básica de artículos
        let articulosValidos = 0;
        $('.articulo-select').each(function() {
            if ($(this).val() !== "") articulosValidos++;
        });

        if (articulosValidos === 0) {
            e.preventDefault();
            mostrarModalError('Debe agregar al menos un artículo.');
        }
    });

    function mostrarModalError(mensaje) {
        $('#errorModal .modal-body').text(mensaje);
        $('#errorModal').modal('show');
    }

    // Ejecutar modales de éxito/error al cargar (si vienen de PHP)
    const msg = $('#body').data('mensaje');
    const tipo = $('#body').data('tipo-mensaje');
    if (msg) {
        if (tipo === 'success') $('#successModal').modal('show');
        else $('#errorModal').modal('show');
    }
});