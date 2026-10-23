document.addEventListener('DOMContentLoaded', function() {
    
    //MOSTRAR EL MENSAJE DEL MODAL
    const bodyElement = document.getElementById('body');
    const mensaje = bodyElement.dataset.mensaje;
    const tipoMensaje = bodyElement.dataset.tipoMensaje;
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));

    if (mensaje && tipoMensaje === 'success') 
    {
        //Mostrando modal de éxito;
        successModal.show();
    } else if (mensaje && tipoMensaje === 'danger') 
    {
        //Mostrando modal de error;
        errorModal.show();
    } else 
    {
        //No se cumple la condición para mostrar el modal;
    }
    //FIN DE MOSTRAR EL MENSAJE DEL MODAL
});