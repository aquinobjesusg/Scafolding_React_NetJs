document.addEventListener('DOMContentLoaded', function () {
    // Reemplaza la comilla simple por el guion
    const codigoInput = document.getElementById('buscar_codigo');

    if (codigoInput) {
        codigoInput.addEventListener('input', function() {
            // Si la pistola escribe una comilla, la cambiamos por un guion al instante
            if (this.value.includes("'")) {
                this.value = this.value.replace(/'/g, '-');
            }
        });
    }

    // --- 1. INICIALIZACIÓN ---
    // Ejecuta la carga de la cascada de selects si hay valores guardados (después de una búsqueda)
    mantenerSeleccionados();

    // --- 2. EVENT DELEGATION PARA SELECTS ---
    document.addEventListener('change', function (e) {
        if (e.target.classList.contains('selector-dependiente')) {
            const select = e.target;
            const idPadre = select.value;
            const nextType = select.getAttribute('data-next');

            if (!nextType) return;
            resetChildren(select);

            if (idPadre !== "0" && idPadre !== "") {
                cargarDependientes(nextType, idPadre, select);
            }
        }
    });

    // --- 3. FUNCIONES DE CARGA DINÁMICA ---
    function cargarDependientes(nextType, idPadre, parentSelect) {
        const formData = new FormData();
        formData.append('action', 'get_dependientes');
        formData.append('tipo', nextType);
        formData.append('id_padre', idPadre);

        fetch('bienesListado.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) throw new Error('Error en la red');
            return response.json();
        })
        .then(data => {
            const nextSelect = document.getElementById('select_' + nextType);
            if (nextSelect) {
                nextSelect.disabled = false;
                nextSelect.innerHTML = '<option value="0">Seleccionar</option>';
                        
                if (data.error) {
                    console.error("Error SQL:", data.error);
                    return;
                }

                data.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = item.nombre;
                    nextSelect.appendChild(option);
                });
            }
        })
        .catch(error => {
            console.error('Error en fetch:', error);
        });
    }

    function resetChildren(currentSelect) {
        let nextType = currentSelect.getAttribute('data-next');
        while (nextType) {
            const nextSelect = document.getElementById('select_' + nextType);
            if (nextSelect) {
                nextSelect.innerHTML = '<option value="0">Seleccionar</option>';
                nextSelect.disabled = true;
                nextSelect.value = "0";
                nextType = nextSelect.getAttribute('data-next');
            } else {
                nextType = null;
            }
        }
    }

    // --- 4. PERSISTENCIA DE FILTROS (CASCADA) ---
    async function mantenerSeleccionados() {
        const niveles = [
            { id: 'select_ente', next: 'general' },
            { id: 'select_general', next: 'linea' },
            { id: 'select_linea', next: 'coordinacion' },
            { id: 'select_coordinacion', next: 'funcionario' }
        ];

        for (let i = 0; i < niveles.length; i++) {
            const config = niveles[i];
            const currentSelect = document.getElementById(config.id);
            if (!currentSelect) continue;

            const savedValue = currentSelect.getAttribute('data-saved-value');

            if (savedValue && savedValue !== "0") {
                currentSelect.value = savedValue;
                
                const nextSelect = document.getElementById('select_' + config.next);
                if (nextSelect) {
                    // Esperamos a que cargue el siguiente nivel antes de continuar el bucle
                    await cargarDependientesPromesa(config.next, savedValue, nextSelect);
                }
            } else {
                // Si un nivel no tiene valor guardado, rompemos la cadena
                break;
            }
        }
    }

    function cargarDependientesPromesa(nextType, idPadre, nextSelect) {
        const formData = new FormData();
        formData.append('action', 'get_dependientes');
        formData.append('tipo', nextType);
        formData.append('id_padre', idPadre);

        return fetch('bienesListado.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            nextSelect.disabled = false;
            nextSelect.innerHTML = '<option value="0">Seleccionar</option>';
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.nombre;
                nextSelect.appendChild(option);
            });
            
            const savedValue = nextSelect.getAttribute('data-saved-value');
            if (savedValue && savedValue !== "0") {
                nextSelect.value = savedValue;
            }
        })
        .catch(err => console.error("Error en cascada:", err));
    }

    // --- 5. DETALLES DEL BIEN (AJAX GLOBAL) ---
    // La asignamos a window para que sea accesible desde el onclick del HTML
    window.showBienDetails = async function (bienId) {
        if (!bienId || bienId === "0") {
            limpiarCamposModal();
            return;
        }

        try {
            const response = await fetch('bienesListado.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `action=get_bien_details&id_bienes=${bienId}`
            });

            const data = await response.json();

            if (data.error) {
                alert("Error al obtener detalles: " + data.error);
                return;
            }

            // Mapeo de campos al Modal
            document.getElementById('detalle_codigo_viejo').textContent = data.codigo_viejo || 'N/A';
            document.getElementById('detalle_codigo_nuevo').textContent = data.codigo_nuevo || 'N/A';
            document.getElementById('detalle_fecha_ingreso').textContent = data.fecha_ingresob || 'N/A';
            document.getElementById('detalle_equipo').textContent = data.equipo || 'N/A';
            document.getElementById('detalle_marca').textContent = data.marca || 'N/A';
            document.getElementById('detalle_modelo').textContent = data.modelo || 'N/A';
            document.getElementById('detalle_serial').textContent = data.serial || 'N/A';
            document.getElementById('detalle_color').textContent = data.color || 'N/A';
            document.getElementById('detalle_estado').textContent = data.estado || 'N/A';
            document.getElementById('detalle_especificacion').textContent = data.especificacion || 'N/A';
            document.getElementById('detalle_fecha_adquisicion').textContent = data.fecha_adquisicion || 'N/A';
            document.getElementById('detalle_concepto').textContent = data.concepto || 'N/A';
            document.getElementById('detalle_precio').textContent = data.precio_bien || '0.00';
            document.getElementById('detalle_clasificacion').textContent = data.clasificacion || 'N/A';
            document.getElementById('detalle_ente').textContent = data.ente || 'N/A';
            document.getElementById('detalle_general').textContent = data.direccion_general || 'N/A';
            document.getElementById('detalle_linea').textContent = data.direccion_linea || 'N/A';
            document.getElementById('detalle_coordinacion').textContent = data.coordinacion || 'N/A';
            document.getElementById('detalle_funcionario').textContent = data.funcionario || 'N/A';
            document.getElementById('detalle_observacion').textContent = data.observacion || 'Sin observaciones';

        } catch (error) {
            console.error('Error AJAX:', error);
        }
    };

    function limpiarCamposModal() {
        const ids = [
            'detalle_codigo_viejo', 'detalle_codigo_nuevo', 'detalle_fecha_ingreso', 'detalle_equipo', 
            'detalle_marca', 'detalle_modelo', 'detalle_serial', 'detalle_color', 'detalle_estado', 
            'detalle_especificacion', 'detalle_fecha_adquisicion', 'detalle_concepto', 'detalle_precio', 
            'detalle_clasificacion','detalle_ente', 'detalle_general', 'detalle_linea', 'detalle_coordinacion', 
            'detalle_funcionario', 'detalle_observacion'
        ];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = 'Cargando...';
        });
    }
    // Manejar el envío del Excel para capturar los filtros actuales
    document.querySelector('button[title="Exportar a Excel"]').addEventListener('click', function(e) {
        // Sincronizar campos de texto y fecha
        document.getElementById('export_buscar_codigo').value = document.getElementById('buscar_codigo').value;
        document.getElementById('export_fecha_desde').value = document.getElementById('fecha_desde').value;
        document.getElementById('export_fecha_hasta').value = document.getElementById('fecha_hasta').value;

        // Sincronizar los nuevos selectores jerárquicos
        document.getElementById('export_id_ente').value = document.getElementById('select_ente').value;
        document.getElementById('export_id_dg').value = document.getElementById('select_general').value;
        document.getElementById('export_id_dl').value = document.getElementById('select_linea').value;
        document.getElementById('export_id_coor').value = document.getElementById('select_coordinacion').value;
        document.getElementById('export_id_func').value = document.getElementById('select_funcionario').value;
    });
});

// Sincronizar campos de búsqueda con el formulario de Excel al cargar la página
const syncExcel = () => {
    document.getElementById('export_buscar_codigo').value = document.getElementById('buscar_codigo').value;
    document.getElementById('export_fecha_desde').value = document.getElementById('fecha_desde').value;
    document.getElementById('export_fecha_hasta').value = document.getElementById('fecha_hasta').value;
    document.getElementById('export_id_ente').value = document.getElementById('select_ente').value;
    // Los demás IDs de selects se actualizarán dinámicamente si el usuario cambia algo, 
    // pero para el arranque inicial:
    document.getElementById('export_id_dg').value = document.getElementById('select_general').getAttribute('data-saved-value');
};

syncExcel();