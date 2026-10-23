document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const openBtn = document.getElementById('openBtn'); // Botón para abrir el menú (puedes crearlo en tu HTML principal)
    const closeBtn = document.getElementById('closeBtn'); // Botón para cerrar el menú

    if (openBtn) {
        openBtn.addEventListener('click', function() {
            sidebar.classList.add('active');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }
});