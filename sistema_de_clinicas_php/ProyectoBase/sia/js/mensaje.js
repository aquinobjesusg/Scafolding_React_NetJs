 //Para el mensaje de error
    document.addEventListener('DOMContentLoaded', function() 
    {
        const mensaje1 = document.getElementById('mensaje');
        if (mensaje1.textContent.trim() === '') 
        {
            mensaje1.style.display = 'none';
        } else 
        {
            mensaje1.style.display = 'block'; // O el display que necesites
        }
    });

    //Debe llenar todos los campos
        document.addEventListener('DOMContentLoaded', function() 
    {
        const mensaje2 = document.getElementById('mensaje2');
        if (mensaje2.textContent.trim() === '') 
        {
            mensaje2.style.display = 'none';
        } else 
        {
            mensaje2.style.display = 'block'; // O el display que necesites
        }
    });
