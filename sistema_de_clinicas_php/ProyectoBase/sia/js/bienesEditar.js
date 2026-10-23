document.addEventListener('DOMContentLoaded', function() 
{
    //LLAMADA A LA FUNCION VALIDARFECHA DE EDITAR
    const fechaIngresoEditInput = document.getElementById('fecha_ingresob_edit');
    const fechaIngresoError2 = document.getElementById('fechaIngresoError2');
    const formEditarBienes = document.getElementById('formEditarBienes');

    if (fechaIngresoEditInput && fechaIngresoError2 && formEditarBienes) {
        validarFecha(fechaIngresoEditInput, fechaIngresoError2, formEditarBienes);
    }
    //LLAMADA A LA FUNCION VALIDARFECHA DE EDITAR
    
}); //FIN DEL DOM