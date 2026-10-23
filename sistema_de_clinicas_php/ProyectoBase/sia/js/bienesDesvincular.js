document.addEventListener('DOMContentLoaded', function() {

    // --- 1. SELECTORES DEPENDIENTES ---
    const selectoresDependientes = document.querySelectorAll('.selector-dependiente');
    selectoresDependientes.forEach(select => {
        select.addEventListener('change', function() {
            if (this.dataset.next) {
                cargarDependientes(this);
            }
        });
    });

    // --- 2. DINÁMICA DE FILAS (AGREGAR/QUITAR) ---
    const bienesContainer = document.getElementById('bienes-container');
    const initialBienRow = document.getElementById('bien-row-0');
    let bienRowCounter = 0;

    if (bienesContainer) {
        bienesContainer.addEventListener('click', function(event) {
            const btnAdd = event.target.closest('.btn-add-bien');
            const btnRemove = event.target.closest('.btn-remove-bien');
            const btnDetalles = event.target.closest('.btn-detalles-asignar');

            if (btnAdd) {
                agregarFilaBien();
            } 
            else if (btnRemove) {
                event.target.closest('.bien-row').remove();
                // Actualizar selects después de eliminar una fila
                const idFuncionario = document.getElementById('select_funcionario').value;
                if (idFuncionario !== '0') {
                    fetchBienesPorFuncionario(idFuncionario);
                }
            } 
            else if (btnDetalles) {
                // Obtenemos el select de la misma fila donde se hizo click
                const parentRow = btnDetalles.closest('.bien-row');
                const selectElement = parentRow.querySelector('.bien-select');
                if (selectElement && selectElement.value !== "0") {
                    showBienDetails(selectElement.value);
                } else {
                    alert("Por favor, seleccione un bien primero.");
                    // Evitamos que el modal se abra si no hay selección
                    event.stopPropagation();
                }
            }
        });
    }

    function agregarFilaBien() {
        bienRowCounter++;
        const newBienRow = initialBienRow.cloneNode(true);
        newBienRow.id = `bien-row-${bienRowCounter}`;

        // Limpiar select
        const select = newBienRow.querySelector('.bien-select');
        select.id = `id_bienes_${bienRowCounter}`;
        select.value = "0"; 

        // Configurar botón eliminar
        const addButton = newBienRow.querySelector('.btn-add-bien');
        if (addButton) {
            addButton.classList.remove('btn-acciones-plus', 'btn-add-bien');
            addButton.classList.add('btn-acciones-eliminar', 'btn-remove-bien');
            addButton.innerHTML = '<i class="fa-solid fa-minus"></i>';
        }

        bienesContainer.appendChild(newBienRow);
        
        // Actualizar selects después de agregar nueva fila
        const idFuncionario = document.getElementById('select_funcionario').value;
        if (idFuncionario !== '0') {
            fetchBienesPorFuncionario(idFuncionario);
        }
    }

    // --- 3. CARGA DE BIENES SEGÚN FUNCIONARIO ---
    const selectFuncionario = document.getElementById('select_funcionario');
    if (selectFuncionario) {
        selectFuncionario.addEventListener('change', function() {
            fetchBienesPorFuncionario(this.value);
        });
    }

    // --- 4. EVENTO PARA CUANDO CAMBIA LA SELECCIÓN DE BIENES ---
    inicializarEventosSelects();

    async function fetchBienesPorFuncionario(idFuncionario) {
        if (idFuncionario === '0' || idFuncionario === '') return;
        try {
            const excluirIds = obtenerIdsBienesSeleccionados();
            const formData = new URLSearchParams();
            formData.append('action', 'get_bienes_por_funcionario');
            formData.append('id_funcionario', idFuncionario);
            formData.append('excluir_ids', JSON.stringify(excluirIds));
            
            const response = await fetch('bienesDesvincular.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString()
            });
            const data = await response.json();
            
            actualizarTodosLosSelects(data.bienes);
        } catch (e) { console.error('Error cargando bienes:', e); }
    }

    function actualizarTodosLosSelects(bienesDisponibles) {
        const todosLosSelects = document.querySelectorAll('.bien-select');
        const bienesSeleccionados = obtenerIdsBienesSeleccionados();
        
        todosLosSelects.forEach(select => {
            const valorActual = select.value;
            select.innerHTML = '<option value="0">Seleccionar</option>';
            
            if (bienesDisponibles && bienesDisponibles.length > 0) {
                bienesDisponibles.forEach(bien => {
                    // Solo mostrar bienes que no están seleccionados en otras filas
                    // o que son el valor actual de este select
                    if (!bienesSeleccionados.includes(bien.id_bienes) || bien.id_bienes == valorActual) {
                        const option = document.createElement('option');
                        option.value = bien.id_bienes;
                        option.textContent = `${bien.codigo_bienes} - ${bien.equipob}`;
                        if (bien.id_bienes == valorActual) {
                            option.selected = true;
                        }
                        select.appendChild(option);
                    }
                });
            }
        });
    }

    function obtenerIdsBienesSeleccionados() {
        const selects = document.querySelectorAll('.bien-select');
        const seleccionados = [];
        
        selects.forEach(select => {
            if (select.value !== "0") {
                seleccionados.push(parseInt(select.value));
            }
        });
        
        return seleccionados;
    }

    function inicializarEventosSelects() {
        document.addEventListener('change', function(event) {
            if (event.target.classList.contains('bien-select')) {
                // Cuando cambia un select, actualizamos todos los demás
                const idFuncionario = document.getElementById('select_funcionario').value;
                if (idFuncionario !== '0') {
                    fetchBienesPorFuncionario(idFuncionario);
                }
            }
        });
    }

    // --- 5. DETALLES DEL BIEN (MODAL) ---
    async function showBienDetails(bienId) {
        limpiarCamposModal();
        try {
            const response = await fetch('bienesDesvincular.php', {
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
});

// --- FUNCIONES GLOBALES ---
async function cargarDependientes(selectActual) {
    const nextTarget = selectActual.dataset.next;
    const idPadre = selectActual.value;
    const nextSelect = document.getElementById(`select_${nextTarget}`);

    limpiarHijos(selectActual);
    if (idPadre === "0" || !nextSelect) return;

    try {
        const response = await fetch('bienesDesvincular.php', {
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
    } catch (e) { console.error(e); }
}

function limpiarHijos(elementoRaiz) {
    let proximo = elementoRaiz.dataset.next;
    while (proximo) {
        const el = document.getElementById(`select_${proximo}`);
        if (el) {
            el.innerHTML = '<option value="0">Seleccionar</option>';
            el.disabled = true;
            proximo = el.dataset.next;
        } else proximo = null;
    }
}