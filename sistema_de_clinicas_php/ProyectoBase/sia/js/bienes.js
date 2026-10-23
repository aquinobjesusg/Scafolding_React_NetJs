//Este archivo JS es usado tanto por bienes.php como bienesListado.php
document.addEventListener('DOMContentLoaded', function() 
{
    const codigoInput = document.getElementById('codigo_bienes');

    if (codigoInput) {
        codigoInput.addEventListener('input', function() {
            // Si la pistola escribe una comilla, la cambiamos por un guion al instante
            if (this.value.includes("'")) {
                this.value = this.value.replace(/'/g, '-');
            }
        });
    }
   
    //VARIABLES PARA VALIDAR FECHA INGRESO DE UN BIEN
    const formBienes = document.getElementById('formBienes');
    const fechaIngresoInput = document.getElementById('fecha_ingresob');
    const fechaIngresoError = document.getElementById('fechaIngresoError');

    //VARIABLES PARA VALIDAR SELECCIONABLES id_estado y id_clasificacionbien
    const estadoSelect = document.getElementById('id_estado');
    const estadoErrorDiv = document.getElementById('estadoError');
    const clasificacionSelect = document.getElementById('id_clasificacionbien');
    const clasificacionErrorDiv = document.getElementById('clasificacionError');

    if (fechaIngresoInput && fechaIngresoError && formBienes) 
    {
        validarFecha(fechaIngresoInput, fechaIngresoError, formBienes);
    }
    //FIN LLAMADA A LA FUNCION VALIDARFECHA DE INGRESO

    if (formBienes) 
    {
        // La validación de los selectores debe ejecutarse antes del envío final
        formBienes.addEventListener('submit', function(event) 
        {
            let isValid = true;
            
            // 1. Validar id_estado
            if (!validarSelectRequerido(estadoSelect, estadoErrorDiv, 'Debe seleccionar un Estado.')) 
            {
                isValid = false;
            }

            // 2. Validar id_clasificacionbien
            if (!validarSelectRequerido(clasificacionSelect, clasificacionErrorDiv, 'Debe seleccionar una Clasificación.')) 
            {
                isValid = false;
            }
            
            // 3. Detener el envío si alguna validación falló
            if (!isValid) 
            {
                event.preventDefault(); 
            }
            // NOTA: La validación de fecha ya tiene su propio 'event.preventDefault()' 
            // dentro de la función 'validarFecha', pero es buena práctica agrupar los 'preventDefault'.
        });

        // Agregar listeners de 'change' para ocultar el error en tiempo real
        // Aunque la validación de submit es suficiente, el 'change' mejora la UX.
        estadoSelect.addEventListener('change', function() 
        {
            validarSelectRequerido(this, estadoErrorDiv, 'Debe seleccionar un Estado.');
        });

        clasificacionSelect.addEventListener('change', function() 
        {
            validarSelectRequerido(this, clasificacionErrorDiv, 'Debe seleccionar una Clasificación.');
        });
    }
    //FIN VALIDACIÓN PARA id_estado y id_clasificacionbien

    

}); //FIN DEL DOM


