document.addEventListener('DOMContentLoaded', function() {
    
    // --- VARIABLES GLOBALES ---
    let bienRowCounter = 0;
    const bienesContainer = document.getElementById('bienes-container');
    const initialBienRow = document.getElementById('bien-row-0');
    
    // Array para guardar todas las opciones de bienes disponibles
    let opcionesBienes = [];

    // --- FUNCIÓN PARA MOSTRAR ERROR MODAL ---
    function mostrarErrorModal(mensaje) {
        const errorModalEl = document.getElementById('errorModal');
        if (errorModalEl) {
            const errorModalBody = errorModalEl.querySelector('.modal-body');
            if (errorModalBody) errorModalBody.textContent = mensaje;
            
            let errorModal = bootstrap.Modal.getInstance(errorModalEl);
            if (!errorModal) {
                errorModal = new bootstrap.Modal(errorModalEl);
            }
            errorModal.show();
        } else {
            alert(mensaje);
        }
    }

    // --- FUNCIÓN PARA OBTENER BIENES SELECCIONADOS ---
    function getBienesSeleccionados() {
        const bienesSeleccionados = [];
        document.querySelectorAll('.bien-select').forEach(select => {
            if (select.value && select.value !== "0") {
                bienesSeleccionados.push(select.value);
            }
        });
        return bienesSeleccionados;
    }

    // --- FUNCIÓN PARA ACTUALIZAR OPCIONES DE BIENES EN TODOS LOS SELECTS ---
    function actualizarOpcionesBienes() {
        const bienesSeleccionados = getBienesSeleccionados();
        
        document.querySelectorAll('.bien-select').forEach(select => {
            const valorActual = select.value;
            
            // Guardar el valor actual
            select.innerHTML = '<option value="0">Seleccionar</option>';
            
            // Agregar las opciones disponibles
            if (opcionesBienes && opcionesBienes.length > 0) {
                opcionesBienes.forEach(opcion => {
                    // Mostrar la opción si:
                    // 1. Es el valor actualmente seleccionado en este select, o
                    // 2. No está seleccionada en ningún otro select
                    if (opcion.value === valorActual || !bienesSeleccionados.includes(opcion.value)) {
                        const option = document.createElement('option');
                        option.value = opcion.value;
                        option.textContent = opcion.text;
                        select.appendChild(option);
                    }
                });
            }
            
            // Restaurar el valor si aún existe
            if (valorActual && valorActual !== "0") {
                const opcionDisponible = Array.from(select.options).some(opt => opt.value === valorActual);
                if (opcionDisponible) {
                    select.value = valorActual;
                } else {
                    select.value = "0";
                }
            }
        });
    }

    // --- FUNCIÓN PARA VERIFICAR SI HAY BIENES DISPONIBLES ---
    function hayBienesDisponibles() {
        if (!opcionesBienes || opcionesBienes.length === 0) return false;
        
        const bienesSeleccionados = getBienesSeleccionados();
        return opcionesBienes.some(opcion => !bienesSeleccionados.includes(opcion.value));
    }

    // --- FUNCIÓN DE VALIDACIÓN PARA AGREGAR BIENES ---
    function validarAgregarBien() {
        const filasBienes = document.querySelectorAll('.bien-row');
        if (filasBienes.length === 0) return false;
        
        // Verificar que el último select tenga un valor seleccionado
        const ultimoSelect = filasBienes[filasBienes.length - 1].querySelector('.bien-select');
        if (!ultimoSelect || ultimoSelect.value === "0") {
            mostrarErrorModal(`Debe seleccionar un bien en la fila actual antes de agregar uno nuevo`);
            return false;
        }
        
        // Verificar si hay bienes disponibles
        if (!hayBienesDisponibles()) {
            mostrarErrorModal("No hay más bienes disponibles para asignar");
            return false;
        }
        
        return true;
    }

    // --- FUNCIÓN PARA CREAR UNA NUEVA FILA ---
    function crearNuevaFila() {
        bienRowCounter++;
        
        // Crear nueva fila desde cero
        const newRow = document.createElement('div');
        newRow.className = 'row mb-3 bien-row';
        newRow.id = `bien-row-${bienRowCounter}`;
        
        newRow.innerHTML = `
            <div class="col-md-4">
                <label for="id_bienes_${bienRowCounter}" class="form-label negrita">Código de Bien:</label>
            </div>
            <div class="d-flex justify-content-start align-items-center">
                <div class="col-md-4 me-3">
                    <select name="id_bienes[]" id="id_bienes_${bienRowCounter}" class="form-select bien-select" title="Código de Bien">
                        <option value="0">Seleccionar</option>
                    </select>
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
        
        configurarEventosFila(newRow);
        bienesContainer.appendChild(newRow);
        
        // Actualizar opciones de todos los selects
        actualizarOpcionesBienes();
    }

    // --- FUNCIÓN PARA ELIMINAR FILA ---
    function eliminarFila(button) {
        const fila = button.closest('.bien-row');
        if (fila) {
            const totalFilas = document.querySelectorAll('.bien-row').length;
            if (totalFilas > 1) {
                fila.remove();
                actualizarOpcionesBienes();
            } else {
                mostrarErrorModal("No puede eliminar la única fila de bienes.");
            }
        }
    }

    // --- CONFIGURAR EVENTOS DE UNA FILA ---
    function configurarEventosFila(fila) {
        const btnDetalles = fila.querySelector('.btn-detalles-asignar');
        if (btnDetalles) {
            // Eliminar eventos anteriores
            const nuevoBtnDetalles = btnDetalles.cloneNode(true);
            btnDetalles.parentNode.replaceChild(nuevoBtnDetalles, btnDetalles);
            
            nuevoBtnDetalles.addEventListener('click', function(e) {
                e.preventDefault();
                const bienRow = this.closest('.bien-row');
                const selectBien = bienRow.querySelector('.bien-select');
                const bienId = selectBien.value;
                
                if (bienId && bienId !== "0") {
                    showBienDetails(bienId);
                    
                    const modalElement = document.getElementById('detallesBienModal');
                    let modal = bootstrap.Modal.getInstance(modalElement);
                    if (!modal) {
                        modal = new bootstrap.Modal(modalElement);
                    }
                    modal.show();
                } else {
                    mostrarErrorModal('Por favor, seleccione un bien primero para ver sus detalles');
                }
            });
        }
    }

    // --- 1. LÓGICA DE CASCADA (SELECTS DEPENDIENTES) ---
    async function cargarCascada(idPadre, tipo, targetId) {
        const targetSelect = document.getElementById(targetId);
        if (!targetSelect) return;

        if (idPadre === "0" || idPadre === "") {
            targetSelect.innerHTML = '<option value="0">Seleccionar</option>';
            return;
        }

        try {
            const response = await fetch('bienesReasignar.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `action=get_dependientes&tipo=${tipo}&id_padre=${idPadre}`
            });
            const data = await response.json();
            
            targetSelect.innerHTML = '<option value="0">Seleccionar</option>';
            if (data && Array.isArray(data)) {
                data.forEach(item => {
                    const opt = document.createElement('option');
                    opt.value = item.id;
                    opt.textContent = item.nombre;
                    targetSelect.appendChild(opt);
                });
            }
        } catch (error) {
            console.error("Error cargando cascada:", error);
        }
    }

    // EVENTOS ORIGEN
    const selectEnte = document.getElementById('select_ente');
    if (selectEnte) {
        selectEnte.addEventListener('change', (e) => cargarCascada(e.target.value, 'general', 'select_direccion_general'));
    }
    
    const selectDireccionGeneral = document.getElementById('select_direccion_general');
    if (selectDireccionGeneral) {
        selectDireccionGeneral.addEventListener('change', (e) => cargarCascada(e.target.value, 'linea', 'select_direccion_linea'));
    }
    
    const selectDireccionLinea = document.getElementById('select_direccion_linea');
    if (selectDireccionLinea) {
        selectDireccionLinea.addEventListener('change', (e) => cargarCascada(e.target.value, 'coordinacion', 'select_coordinacion'));
    }
    
    const selectCoordinacion = document.getElementById('select_coordinacion');
    if (selectCoordinacion) {
        selectCoordinacion.addEventListener('change', (e) => cargarCascada(e.target.value, 'funcionario', 'select_funcionario'));
    }
    
    const selectFuncionario = document.getElementById('select_funcionario');
    if (selectFuncionario) {
        selectFuncionario.addEventListener('change', (e) => {
            fetchBienesPorFuncionario(e.target.value);
        });
    }

    // EVENTOS DESTINO
    const selectEnteD = document.getElementById('select_enteD');
    if (selectEnteD) {
        selectEnteD.addEventListener('change', (e) => cargarCascada(e.target.value, 'general', 'select_direccion_generalD'));
    }
    
    const selectDireccionGeneralD = document.getElementById('select_direccion_generalD');
    if (selectDireccionGeneralD) {
        selectDireccionGeneralD.addEventListener('change', (e) => cargarCascada(e.target.value, 'linea', 'select_direccion_lineaD'));
    }
    
    const selectDireccionLineaD = document.getElementById('select_direccion_lineaD');
    if (selectDireccionLineaD) {
        selectDireccionLineaD.addEventListener('change', (e) => cargarCascada(e.target.value, 'coordinacion', 'select_coordinacionD'));
    }
    
    const selectCoordinacionD = document.getElementById('select_coordinacionD');
    if (selectCoordinacionD) {
        selectCoordinacionD.addEventListener('change', (e) => cargarCascada(e.target.value, 'funcionario', 'select_funcionarioD'));
    }

    // --- 2. GESTIÓN DE BIENES DINÁMICOS ---
    bienesContainer.addEventListener('click', function(e) {
        const btnAdd = e.target.closest('.btn-add-bien');
        const btnRemove = e.target.closest('.btn-remove-bien');

        if (btnAdd) {
            e.preventDefault();
            if (validarAgregarBien()) {
                crearNuevaFila();
            }
        }
        
        if (btnRemove) {
            e.preventDefault();
            eliminarFila(btnRemove);
        }
    });

    // Evento para cuando cambia un select de bienes
    bienesContainer.addEventListener('change', function(e) {
        if (e.target.classList.contains('bien-select')) {
            actualizarOpcionesBienes();
        }
    });

    // Configurar eventos de la fila inicial
    if (initialBienRow) {
        configurarEventosFila(initialBienRow);
    }

    // --- 3. AJAX BIENES POR FUNCIONARIO ---
    async function fetchBienesPorFuncionario(idFuncionario) {
        if (idFuncionario === '0') {
            opcionesBienes = [];
            actualizarOpcionesBienes();
            return;
        }

        try {
            const response = await fetch('bienesReasignar.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `action=get_bienes_por_funcionario&id_funcionario=${idFuncionario}`
            });
            const data = await response.json();
            
            // Limpiar opciones anteriores
            opcionesBienes = [];
            
            if (data.bienes && Array.isArray(data.bienes) && data.bienes.length > 0) {
                data.bienes.forEach(bien => {
                    opcionesBienes.push({
                        value: bien.id_bienes.toString(),
                        text: `${bien.codigo_bienes} - ${bien.equipob}`
                    });
                });
            }
            
            // Limpiar todos los selects primero
            document.querySelectorAll('.bien-select').forEach(select => {
                select.innerHTML = '<option value="0">Seleccionar</option>';
                select.value = "0";
            });
            
            // Actualizar opciones
            actualizarOpcionesBienes();
            
        } catch (e) { 
            console.error("Error cargando bienes:", e); 
        }
    }

    // --- 4. FUNCIÓN PARA MOSTRAR DETALLES DEL BIEN ---
    async function showBienDetails(bienId) {
        if (!bienId || bienId === "0") {
            limpiarCamposModal();
            return;
        }

        try {
            const response = await fetch('bienesReasignar.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `action=get_bien_details&id_bienes=${bienId}`
            });

            const data = await response.json();
            if (data.error) return;

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
            'detalle_color', 'detalle_estado', 'detalle_clasificacion', 
            'detalle_especificacion', 'detalle_fecha_adquisicion', 'detalle_concepto', 
            'detalle_precio', 'detalle_ente', 'detalle_general', 'detalle_linea', 
            'detalle_coordinacion', 'detalle_funcionario'
        ];
        
        campos.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = '';
        });
    }

    const detallesModal = document.getElementById('detallesBienModal');
    if (detallesModal) {
        detallesModal.addEventListener('hidden.bs.modal', limpiarCamposModal);
    }

    // --- VALIDACIÓN DEL FORMULARIO ---
    const formReasignar = document.getElementById('formReasignarBienes');
    if (formReasignar) {
        formReasignar.addEventListener('submit', function(e) {
            const selectsBienes = document.querySelectorAll('.bien-select');
            let bienesSeleccionados = 0;
            const valoresSeleccionados = [];
            
            // Validar que cada fila tenga un bien seleccionado
            for (let i = 0; i < selectsBienes.length; i++) {
                const valor = selectsBienes[i].value;
                
                if (valor === "0") {
                    e.preventDefault();
                    mostrarErrorModal(`Debe seleccionar un bien en la fila ${i + 1}`);
                    return;
                }
                
                // Verificar duplicados
                if (valoresSeleccionados.includes(valor)) {
                    e.preventDefault();
                    mostrarErrorModal(`No puede seleccionar el mismo bien múltiples veces. Bien duplicado.`);
                    return;
                }
                
                valoresSeleccionados.push(valor);
                bienesSeleccionados++;
            }
            
            if (bienesSeleccionados === 0) {
                e.preventDefault();
                mostrarErrorModal('Debe seleccionar al menos un bien para reasignar');
                return;
            }
            
            // Validar fecha
            const fechaInput = document.getElementById('fecha_distribucion');
            if (fechaInput && !fechaInput.value) {
                e.preventDefault();
                mostrarErrorModal('Debe seleccionar una fecha de reasignación');
                return;
            }
            
            // Validar destino
            const funcionarioDestino = document.getElementById('select_funcionarioD');
            if (funcionarioDestino && funcionarioDestino.value === "0") {
                e.preventDefault();
                mostrarErrorModal('Debe seleccionar un funcionario destino');
                return;
            }
        });
    }

    // Inicializar
    opcionesBienes = [];
});