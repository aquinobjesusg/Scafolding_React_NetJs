// js/common.js

/**
 * @param {HTMLInputElement} inputElement - El elemento input a validar.
 * @param {HTMLElement} errorElement - El elemento donde se mostrará el mensaje de error.
 */

//VALIDACION DEL FORMATO DE FECHA AAAA-MM-DD
function validarFormatoFecha(fecha) {
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    const isValid = regexFecha.test(fecha);
    return isValid;
}
//FIN VALIDACION DEL FORMATO DE FECHA AAAA-MM-DD

//VALIDACION DE CAMPO FECHA Y MOSTRAR MENSAJE ERROR
function validarFecha(inputElement, errorElement, formElement) {
    //Validación en tiempo real cuando el usuario cambia la fecha
    inputElement.addEventListener('input', function() {
        const fechaValue = this.value;

        //Si el campo está vacío, oculta el error de JS. El 'required' de HTML5 se encargará.
        if (fechaValue === '') {
            errorElement.style.display = 'none';
            return;
        }

        //Si el formato no es AAAA-MM-DD (tu función validarFormatoFecha)
        if (!validarFormatoFecha(fechaValue)) {
            errorElement.textContent = 'Formato de fecha inválido. Utilice DD-MM-AAAA.';
            errorElement.style.display = 'block';
        } else {
            errorElement.style.display = 'none';
        }
    });

    //Validación al intentar enviar el formulario
    formElement.addEventListener('submit', function(event) {
        const fechaValue = inputElement.value;

        //Si el campo no cumple el formato esperado
        if (!validarFormatoFecha(fechaValue)) {
            errorElement.textContent = 'Formato de fecha inválido. Utilice DD-MM-AAAA.';
            errorElement.style.display = 'block';
            event.preventDefault(); // Detiene el envío del formulario
        } else {
            errorElement.style.display = 'none';
        }
        /**
        * Dejamos que el navegador maneje:
        * Campo vacío (por 'required')
        * Fechas lógicamente inválidas (ej. 2024-02-30, por input type="date")
        */
    });
}
//FIN VALIDACION DE CAMPO FECHA Y MOSTRAR MENSAJE ERROR