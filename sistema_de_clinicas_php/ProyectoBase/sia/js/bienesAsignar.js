document.addEventListener('DOMContentLoaded', function() {
    // --- INICIALIZACIÓN ---
    if (typeof obtenerSelect === 'function') {
        obtenerSelect();
    }

    let bienRowCounter = 0;
    const bienesContainer = document.getElementById('bienes-container');
    const initialBienRow = document.getElementById('bien-row-0');
    const selectGeneral = document.getElementById('select_general');
    
    // Obtener todas las opciones de bienes disponibles
    const opcionesBienes = [];
    const selectOriginal = document.getElementById('id_bienes_0');
    if (selectOriginal) {
        for (let i = 0; i < selectOriginal.options.length; i++) {
            const option = selectOriginal.options[i];
            opcionesBienes.push({
                value: option.value,
                text: option.textContent
            });
        }
    }

    // Inicializamos el modal de error
    const errorModalEl = document.getElementById('errorModal');
    const errorModal = new bootstrap.Modal(errorModalEl);
    const errorModalBody = errorModalEl.querySelector('.modal-body');

    // --- FUNCIÓN PARA RECONSTRUIR TODOS LOS SELECTS ---
    function reconstruirTodosLosSelects() {
        // Obtener todos los valores seleccionados actualmente
        const valoresSeleccionados = [];
        document.querySelectorAll('.bien-select').forEach(select => {
            if (select.value && select.value !== "0") {
                valoresSeleccionados.push(select.value);
            }
        });

        // Reconstruir cada select
        document.querySelectorAll('.bien-select').forEach((select, index) => {
            const valorActual = select.value;
            
            // Limpiar el select
            select.innerHTML = '';
            
            // Agregar opción "Seleccionar"
            const optionDefault = document.createElement('option');
            optionDefault.value = "0";
            optionDefault.textContent = "Seleccionar";
            select.appendChild(optionDefault);
            
            // Agregar las opciones disponibles
            opcionesBienes.forEach(opcion => {
                // Si es la opción por defecto, la saltamos
                if (opcion.value === "0") return;
                
                // Mostrar la opción si:
                // 1. Es el valor actualmente seleccionado en este select, o
                // 2. No está seleccionada en ningún otro select
                if (opcion.value === valorActual || !valoresSeleccionados.includes(opcion.value)) {
                    const option = document.createElement('option');
                    option.value = opcion.value;
                    option.textContent = opcion.text;
                    select.appendChild(option);
                }
            });
            
            // Restaurar el valor si aún existe
            if (valorActual && valorActual !== "0") {
                // Verificar si el valor aún está disponible
                const opcionDisponible = Array.from(select.options).some(opt => opt.value === valorActual);
                if (opcionDisponible) {
                    select.value = valorActual;
                } else {
                    select.value = "0";
                }
            } else {
                select.value = "0";
            }
        });
    }

    // --- FUNCIÓN PARA VERIFICAR SI HAY BIENES DISPONIBLES ---
    function hayBienesDisponibles() {
        const valoresSeleccionados = [];
        document.querySelectorAll('.bien-select').forEach(select => {
            if (select.value && select.value !== "0") {
                valoresSeleccionados.push(select.value);
            }
        });
        
        // Verificar si hay alguna opción no seleccionada
        return opcionesBienes.some(opcion => 
            opcion.value !== "0" && !valoresSeleccionados.includes(opcion.value)
        );
    }

    // --- FUNCIÓN DE VALIDACIÓN ---
    function puedeAgregarFila() {
        const direccionGeneralVal = selectGeneral.value;
        
        // Verificar Dirección General
        if (direccionGeneralVal === "0" || selectGeneral.disabled) {
            errorModalBody.textContent = "Debe seleccionar una Dirección General válida antes de agregar más bienes.";
            errorModal.show();
            return false;
        }

        // Verificar que el último select tenga un valor seleccionado
        const todosLosSelects = document.querySelectorAll('.bien-select');
        const ultimoSelect = todosLosSelects[todosLosSelects.length - 1];
        
        if (!ultimoSelect || ultimoSelect.value === "0") {
            errorModalBody.textContent = "Por favor, seleccione un código de bien en la fila actual antes de añadir una nueva.";
            errorModal.show();
            return false;
        }

        // Verificar si hay bienes disponibles
        if (!hayBienesDisponibles()) {
            errorModalBody.textContent = "No hay más bienes disponibles para asignar.";
            errorModal.show();
            return false;
        }

        return true;
    }

    // --- FUNCIÓN PARA CREAR UNA NUEVA FILA ---
    function crearNuevaFila() {
        bienRowCounter++;
        
        // Crear nueva fila desde cero en lugar de clonar
        const newRow = document.createElement('div');
        newRow.className = 'row mb-3 bien-row';
        newRow.id = `bien-row-${bienRowCounter}`;
        
        // Crear el contenido de la fila
        newRow.innerHTML = `
            <div class="col-md-4">
                <label for="id_bienes_${bienRowCounter}" class="form-label negrita">Codigo de Bien:</label>
            </div>
            <div class="d-flex justify-content-start align-items-center">
                <div class="col-md-4 me-3">
                    <select name="id_bienes[]" id="id_bienes_${bienRowCounter}" class="form-select bien-select" title="Codigo de Bien">
                        <option value="0">Seleccionar</option>
                    </select>
                    <div class="form-text text-danger bien-error" style="display: none;">Debe seleccionar un Bien.</div>
                </div>
                <div class="col-md-4">
                    <button type="button" title="Detalles del Bien" class="btn-acciones-detalles btn-detalles-asignar me-2"
                        data-bs-toggle="modal" data-bs-target="#detallesBienModal">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button type="button" class="btn-acciones-eliminar btn-remove-bien" title="Quitar Bien">
                        <i class="fa-solid fa-minus"></i>
                    </button>
                </div>
            </div>
        `;
        
        bienesContainer.appendChild(newRow);
        
        // Reconstruir todos los selects para actualizar opciones disponibles
        reconstruirTodosLosSelects();
    }

    // --- FUNCIÓN PARA ELIMINAR FILA ---
    function eliminarFila(button) {
        const fila = button.closest('.bien-row');
        if (fila) {
            // No permitir eliminar la última fila si es la única
            const totalFilas = document.querySelectorAll('.bien-row').length;
            if (totalFilas > 1) {
                fila.remove();
                reconstruirTodosLosSelects();
            } else {
                errorModalBody.textContent = "No puede eliminar la única fila de bienes.";
                errorModal.show();
            }
        }
    }

    // --- FUNCIÓN PARA MOSTRAR DETALLES ---
    async function showBienDetails(bienId) {
        if (bienId === "0") {
            limpiarCamposModal();
            return;
        }

        try {
            const response = await fetch('bienesAsignar.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `action=get_bien_details&id_bienes=${bienId}`
            });

            const data = await response.json();

            // Mapeo de campos
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
            document.getElementById('detalle_ente').textContent = data.ente || 'N/A';
            document.getElementById('detalle_general').textContent = data.direccion_general || 'N/A';
            document.getElementById('detalle_linea').textContent = data.direccion_linea || 'N/A';
            document.getElementById('detalle_coordinacion').textContent = data.coordinacion || 'N/A';
            document.getElementById('detalle_funcionario').textContent = data.funcionario || 'N/A';

        } catch (error) {
            console.error('Error AJAX:', error);
        }
    }

    function limpiarCamposModal() {
        const campos = [
            'detalle_codigo_viejo', 'detalle_codigo_nuevo', 'detalle_fecha_ingreso',
            'detalle_equipo', 'detalle_marca', 'detalle_modelo', 'detalle_serial',
            'detalle_color', 'detalle_estado', 'detalle_especificacion',
            'detalle_fecha_adquisicion', 'detalle_concepto', 'detalle_precio',
            'detalle_ente', 'detalle_general', 'detalle_linea', 'detalle_coordinacion',
            'detalle_funcionario'
        ];
        
        campos.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        });
    }

    // --- EVENTOS ---
    bienesContainer.addEventListener('click', function(event) {
        const btnAdd = event.target.closest('.btn-add-bien');
        const btnRemove = event.target.closest('.btn-remove-bien');
        const btnDetalles = event.target.closest('.btn-detalles-asignar');

        if (btnAdd) {
            if (puedeAgregarFila()) {
                crearNuevaFila();
            }
        } 
        else if (btnRemove) {
            eliminarFila(btnRemove);
        } 
        else if (btnDetalles) {
            const parentRow = btnDetalles.closest('.bien-row');
            const selectElement = parentRow?.querySelector('.bien-select');
            if (selectElement) showBienDetails(selectElement.value);
        }
    });

    // Evento para cuando cambia un select
    bienesContainer.addEventListener('change', function(event) {
        if (event.target.classList.contains('bien-select')) {
            reconstruirTodosLosSelects();
        }
    });

    // Eventos para selects dependientes
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('selector-dependiente')) {
            cargarDependientes(e.target);
        }
    });

    // Inicializar
    reconstruirTodosLosSelects();

});

// Funciones para selects dependientes
async function cargarDependientes(selectActual) {
    const nextTarget = selectActual.dataset.next;
    const idPadre = selectActual.value;
    const nextSelect = document.getElementById(`select_${nextTarget}`);

    limpiarHijos(selectActual);

    if (idPadre === "0" || !nextSelect) return;

    try {
        const response = await fetch('bienesAsignar.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=get_dependientes&tipo=${nextTarget}&id_padre=${idPadre}`
        });

        const data = await response.json();

        if (data.length > 0) {
            nextSelect.disabled = false;
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.nombre;
                nextSelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error al cargar dependientes:', error);
    }
}

function limpiarHijos(elementoRaiz) {
    let proximo = elementoRaiz.dataset.next;
    while (proximo) {
        const el = document.getElementById(`select_${proximo}`);
        if (el) {
            el.innerHTML = '<option value="0">Seleccionar</option>';
            el.disabled = true;
            proximo = el.dataset.next;
        } else {
            proximo = null;
        }
    }
}