document.addEventListener('DOMContentLoaded', function() {
   async function showBienDetails(bienId) {
    limpiarCamposModal();
    try {
        const response = await fetch('bienesDesincorporar.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=get_bien_details&id_bienes=${bienId}`
        });
        const data = await response.json();

        // Mapeo corregido según los IDs del HTML y nombres del SQL
        document.getElementById('detalle_codigo_viejo').textContent = data.codigo_viejo;
        document.getElementById('detalle_codigo_nuevo').textContent = data.codigo_nuevo;
        document.getElementById('detalle_fecha_ingreso').textContent = data.fecha_ingreso;
        document.getElementById('detalle_equipo').textContent = data.equipo;
        document.getElementById('detalle_marca').textContent = data.marca;
        document.getElementById('detalle_modelo').textContent = data.modelo;
        document.getElementById('detalle_serial').textContent = data.serial;
        document.getElementById('detalle_color').textContent = data.color;
        document.getElementById('detalle_estado').textContent = data.estado;
        document.getElementById('detalle_clasificacion').textContent = data.clasificacion;
        document.getElementById('detalle_especificacion').textContent = data.especificacion;
        document.getElementById('detalle_fecha_adquisicion').textContent = data.fecha_adquisicion;
        document.getElementById('detalle_concepto').textContent = data.concepto;
        document.getElementById('detalle_precio').textContent = data.precio;
        document.getElementById('detalle_ente').textContent = data.ente;
        
        // IDs corregidos para que coincidan con el HTML del modal
        document.getElementById('detalle_general').textContent = data.direccion_general;
        document.getElementById('detalle_linea').textContent = data.direccion_linea;
        document.getElementById('detalle_coordinacion').textContent = data.coordinacion;
        document.getElementById('detalle_funcionario').textContent = data.funcionario;

    } catch (e) { console.error('Error detalles:', e); }
}

    function limpiarCamposModal() {
        const spans = document.querySelectorAll('#detallesBienModal span[id^="detalle_"]');
        spans.forEach(span => span.textContent = 'Cargando...');
    }
    // Dentro de document.addEventListener('DOMContentLoaded', function() { ...

    // Manejar click en el botón de detalles
    document.addEventListener('click', function(e) {
        if (e.target && (e.target.classList.contains('btn-acciones-detalles') || e.target.closest('.btn-acciones-detalles'))) {
            const btn = e.target.classList.contains('btn-acciones-detalles') ? e.target : e.target.closest('.btn-acciones-detalles');
            // Buscamos el select que está en la misma fila
            const row = btn.closest('.bien-row');
            const select = row.querySelector('.bien-select');
            const bienId = select.value;

            if (bienId !== "0") {
                showBienDetails(bienId);
            } else {
                alert("Por favor seleccione un bien primero");
                // Evita que el modal se abra si no hay ID
                e.stopPropagation();
            }
        }
    });
});