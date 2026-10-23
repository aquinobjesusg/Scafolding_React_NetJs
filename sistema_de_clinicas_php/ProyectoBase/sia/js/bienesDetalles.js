// LAS FUNCIONES DEBEN ESTAR AFUERA (GLOBALES)
 if (codigoInput) {
        codigoInput.addEventListener('input', function() {
            // Si la pistola escribe una comilla, la cambiamos por un guion al instante
            if (this.value.includes("'")) {
                this.value = this.value.replace(/'/g, '-');
            }
        });
    }

async function showBienDetails(idHistorial) {
    if (!idHistorial) {
        console.error("ID de historial no recibido");
        return;
    }

    limpiarCamposModal();

    try {
        const response = await fetch('bienesHistorial.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            // Enviamos el ID del historial que el PHP espera en $_POST['id_bienes']
            body: `action=get_bien_details&id_bienes=${idHistorial}`
        });
        
        const data = await response.json();

        if(data.error) {
            console.error('Error desde PHP:', data.error);
            alert("Error: " + data.error);
            return;
        }

        // Mapeo de datos al Modal
        document.getElementById('detalle_codigo_viejo').textContent = data.codigo_viejo || 'N/A';
        document.getElementById('detalle_codigo_nuevo').textContent = data.codigo_nuevo || 'N/A';
        document.getElementById('detalle_fecha_ingreso').textContent = data.fecha_ingresob || 'N/A';
        document.getElementById('detalle_equipo').textContent = data.equipo || 'N/A';
        document.getElementById('detalle_marca').textContent = data.marca || 'N/A';
        document.getElementById('detalle_modelo').textContent = data.modelo || 'N/A';
        document.getElementById('detalle_serial').textContent = data.serial || 'N/A';
        document.getElementById('detalle_color').textContent = data.color || 'N/A';
        document.getElementById('detalle_estado').textContent = data.estado || 'N/A';
        document.getElementById('detalle_clasificacion').textContent = data.clasificacion || 'N/A';
        document.getElementById('detalle_especificacion').textContent = data.especificacion || 'N/A';
        document.getElementById('detalle_fecha_adquisicion').textContent = data.fecha_adquisicion || 'N/A';
        document.getElementById('detalle_concepto').textContent = data.concepto || 'N/A';
        document.getElementById('detalle_precio').textContent = data.precio_bien || 'N/A';
        document.getElementById('detalle_ente').textContent = data.ente || 'N/A';
        document.getElementById('detalle_general').textContent = data.direccion_general || 'N/A';
        document.getElementById('detalle_linea').textContent = data.direccion_linea || 'N/A';
        document.getElementById('detalle_coordinacion').textContent = data.coordinacion || 'N/A';
        document.getElementById('detalle_funcionario').textContent = data.funcionario || 'N/A';
        document.getElementById('detalle_observacion').textContent = data.observacion || 'N/A';
        document.getElementById('detalle_usuario').textContent = data.nombre_completo_usuario || 'N/A';

    } catch (e) { 
        console.error('Error detalles:', e); 
    }
}

function limpiarCamposModal() {
    const spans = document.querySelectorAll('#detallesBienModal span[id^="detalle_"]');
    spans.forEach(span => span.textContent = 'Cargando...');
}

// Solo dejas aquí lo que sea inicialización de interfaz
document.addEventListener('DOMContentLoaded', function() {   
    console.log("Sistema de historial listo");
});