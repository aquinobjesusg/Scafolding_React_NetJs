$(document).ready(function() {
    $(document).on('change', '.selector-dependiente', function() {
        const $selectActual = $(this);
        const tipoSiguiente = $selectActual.data('next'); 
        const idPadre = $selectActual.val();
        
        const $selectSiguiente = $('#select_' + tipoSiguiente);
        if (!$selectSiguiente.length) return;

        // Limpiar todos los niveles inferiores antes de la carga
        limpiarSelectsHijos(tipoSiguiente);

        if (idPadre && idPadre !== "0" && idPadre !== "") {
            $.ajax({
                url: 'recursoSalidaListado.php',
                type: 'POST',
                data: {
                    action: 'get_dependientes',
                    tipo: tipoSiguiente,
                    id_padre: idPadre
                },
                dataType: 'json',
                success: function(response) {
                    $selectSiguiente.prop('disabled', false).empty();
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
                error: function(xhr) {
                    console.error("Error crítico:", xhr.responseText);
                }
            });
        }
    });

    function limpiarSelectsHijos(nivelCambiado) {
        const orden = ['general', 'linea', 'coordinacion', 'funcionario'];
        let startCleaning = false;

        orden.forEach(nivel => {
            if (nivel === nivelCambiado) startCleaning = true;
            if (startCleaning) {
                const $s = $('#select_' + nivel);
                if($s.length) {
                    $s.html('<option value="0">Seleccionar</option>').prop('disabled', true);
                }
            }
        });
    }
});