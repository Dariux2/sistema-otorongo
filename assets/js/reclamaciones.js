// Sistema de Libro de Reclamaciones
// Centro Oftalmológico El Otorongo

// Inicializar sistema de reclamaciones
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('reclamaciones.html')) {
        initializeComplaintsForm();
    } else if (window.location.pathname.includes('gestion-reclamaciones.html')) {
        initializeComplaintsManagement();
    }
});

// ============================================
// FORMULARIO PÚBLICO DE RECLAMACIONES
// ============================================

function initializeComplaintsForm() {
    const form = document.getElementById('complaintsForm');
    if (form) {
        form.addEventListener('submit', handleComplaintSubmit);
        
        // Validación en tiempo real
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateComplaintField);
        });
        
        // Generar número de reclamo automático
        generateComplaintNumber();
    }
}

function generateComplaintNumber() {
    const numberField = document.getElementById('complaintNumber');
    if (numberField) {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        const complaintNumber = `REC-${timestamp}-${random}`;
        numberField.value = complaintNumber;
    }
}

function validateComplaintField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Limpiar errores previos
    clearFieldError(field);
    
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Ingrese un email válido';
    } else if (field.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
        errorMessage = 'Ingrese un teléfono válido';
    } else if (field.name === 'dni' && value && !isValidDNI(value)) {
        isValid = false;
        errorMessage = 'Ingrese un DNI válido (8 dígitos)';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--danger-color)';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]{9,}$/;
    return phoneRegex.test(phone);
}

function isValidDNI(dni) {
    const dniRegex = /^\d{8}$/;
    return dniRegex.test(dni);
}

function handleComplaintSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validar todos los campos
    const fields = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    fields.forEach(field => {
        if (!validateComplaintField({ target: field })) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification('Por favor, corrija los errores en el formulario', 'error');
        return;
    }
    
    // Crear objeto de reclamación
    const complaint = {
        id: generateId(),
        numero: formData.get('numero'),
        tipo: formData.get('tipo'),
        fecha: new Date().toISOString(),
        estado: 'nueva',
        
        // Datos del reclamante
        nombreCompleto: formData.get('nombreCompleto'),
        dni: formData.get('dni'),
        telefono: formData.get('telefono'),
        email: formData.get('email'),
        direccion: formData.get('direccion'),
        
        // Detalles de la reclamación
        fechaIncidente: formData.get('fechaIncidente'),
        servicioRelacionado: formData.get('servicioRelacionado'),
        descripcion: formData.get('descripcion'),
        pedido: formData.get('pedido'),
        
        // Metadata
        fechaRegistro: new Date().toISOString().split('T')[0],
        horaRegistro: new Date().toLocaleTimeString('es-PE')
    };
    
    // Guardar reclamación
    saveComplaint(complaint);
    
    // Mostrar confirmación
    showComplaintConfirmation(complaint);
    
    // Limpiar formulario
    form.reset();
    generateComplaintNumber();
}

function saveComplaint(complaint) {
    try {
        // Obtener reclamaciones existentes
        const complaints = getComplaints();
        
        // Agregar nueva reclamación
        complaints.push(complaint);
        
        // Guardar en localStorage
        localStorage.setItem('otorongo_complaints', JSON.stringify(complaints));
        
        // Registrar actividad
        if (window.OtorongoSystem && window.OtorongoSystem.logActivity) {
            window.OtorongoSystem.logActivity(
                'complaint_created',
                `Nueva ${complaint.tipo}: ${complaint.nombreCompleto}`,
                complaint
            );
        }
        
        console.log('Reclamación guardada:', complaint);
        return true;
    } catch (error) {
        console.error('Error al guardar reclamación:', error);
        showNotification('Error al guardar la reclamación. Por favor, intente nuevamente.', 'error');
        return false;
    }
}

function getComplaints() {
    try {
        const complaints = localStorage.getItem('otorongo_complaints');
        return complaints ? JSON.parse(complaints) : [];
    } catch (error) {
        console.error('Error al obtener reclamaciones:', error);
        return [];
    }
}

function showComplaintConfirmation(complaint) {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">
                    <i class="fas fa-check-circle" style="color: var(--success-color);"></i>
                    Reclamación Registrada
                </h3>
            </div>
            <div class="modal-body">
                <div style="text-align: center; padding: 2rem 0;">
                    <div style="font-size: 3rem; color: var(--success-color); margin-bottom: 1rem;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 style="color: var(--dark-color); margin-bottom: 1rem;">
                        ¡Reclamación Registrada Exitosamente!
                    </h3>
                    <p style="color: var(--gray-600); margin-bottom: 2rem;">
                        Su ${complaint.tipo} ha sido registrada correctamente.
                    </p>
                    
                    <div style="background: var(--gray-100); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                        <p style="font-size: 0.9rem; color: var(--gray-600); margin-bottom: 0.5rem;">
                            Número de Registro:
                        </p>
                        <p style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color); margin: 0;">
                            ${complaint.numero}
                        </p>
                    </div>
                    
                    <div style="text-align: left; background: var(--accent-soft); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--accent-strong);">
                        <p style="color: var(--gray-700); font-size: 0.9rem; margin: 0;">
                            <i class="fas fa-info-circle"></i>
                            <strong>Importante:</strong> Guarde este número de registro para dar seguimiento a su ${complaint.tipo}.
                            Nos pondremos en contacto con usted en un plazo máximo de 48 horas.
                        </p>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="display: flex; gap: 1rem; justify-content: center; padding-top: 1rem; border-top: 1px solid var(--gray-200);">
                <button class="btn-primary" onclick="printComplaint('${complaint.id}')">
                    <i class="fas fa-print"></i> Imprimir Comprobante
                </button>
                <button class="btn-secondary" onclick="closeComplaintModal()">
                    <i class="fas fa-times"></i> Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeComplaintModal();
        }
    });
}

function closeComplaintModal() {
    const modal = document.querySelector('.modal.active');
    if (modal) {
        modal.remove();
    }
}

function printComplaint(complaintId) {
    const complaints = getComplaints();
    const complaint = complaints.find(c => c.id === complaintId);
    
    if (!complaint) {
        showNotification('No se encontró la reclamación', 'error');
        return;
    }
    
    // Crear ventana de impresión
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Comprobante de ${complaint.tipo} - ${complaint.numero}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid #2c5aa0;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .header h1 {
                    color: #2c5aa0;
                    margin: 0;
                }
                .section {
                    margin-bottom: 20px;
                }
                .section h3 {
                    background: #f8f9fa;
                    padding: 10px;
                    border-left: 4px solid #2c5aa0;
                    margin-bottom: 10px;
                }
                .field {
                    display: flex;
                    padding: 8px 0;
                    border-bottom: 1px solid #e9ecef;
                }
                .field-label {
                    font-weight: bold;
                    width: 200px;
                    color: #495057;
                }
                .field-value {
                    flex: 1;
                    color: #212529;
                }
                .footer {
                    margin-top: 40px;
                    padding-top: 20px;
                    border-top: 2px solid #2c5aa0;
                    text-align: center;
                    color: #6c757d;
                    font-size: 0.9rem;
                }
                @media print {
                    .no-print {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Centro Oftalmológico El Otorongo</h1>
                <p>Comprobante de ${complaint.tipo.charAt(0).toUpperCase() + complaint.tipo.slice(1)}</p>
                <h2>${complaint.numero}</h2>
            </div>
            
            <div class="section">
                <h3>Datos del Reclamante</h3>
                <div class="field">
                    <div class="field-label">Nombre Completo:</div>
                    <div class="field-value">${complaint.nombreCompleto}</div>
                </div>
                <div class="field">
                    <div class="field-label">DNI:</div>
                    <div class="field-value">${complaint.dni}</div>
                </div>
                <div class="field">
                    <div class="field-label">Teléfono:</div>
                    <div class="field-value">${complaint.telefono}</div>
                </div>
                <div class="field">
                    <div class="field-label">Email:</div>
                    <div class="field-value">${complaint.email}</div>
                </div>
                <div class="field">
                    <div class="field-label">Dirección:</div>
                    <div class="field-value">${complaint.direccion}</div>
                </div>
            </div>
            
            <div class="section">
                <h3>Detalles de la ${complaint.tipo.charAt(0).toUpperCase() + complaint.tipo.slice(1)}</h3>
                <div class="field">
                    <div class="field-label">Tipo:</div>
                    <div class="field-value">${complaint.tipo.charAt(0).toUpperCase() + complaint.tipo.slice(1)}</div>
                </div>
                <div class="field">
                    <div class="field-label">Fecha del Incidente:</div>
                    <div class="field-value">${formatDate(complaint.fechaIncidente)}</div>
                </div>
                <div class="field">
                    <div class="field-label">Servicio Relacionado:</div>
                    <div class="field-value">${complaint.servicioRelacionado}</div>
                </div>
                <div class="field">
                    <div class="field-label">Descripción:</div>
                    <div class="field-value">${complaint.descripcion}</div>
                </div>
                <div class="field">
                    <div class="field-label">Pedido:</div>
                    <div class="field-value">${complaint.pedido}</div>
                </div>
            </div>
            
            <div class="section">
                <h3>Información de Registro</h3>
                <div class="field">
                    <div class="field-label">Fecha de Registro:</div>
                    <div class="field-value">${formatDate(complaint.fechaRegistro)}</div>
                </div>
                <div class="field">
                    <div class="field-label">Hora de Registro:</div>
                    <div class="field-value">${complaint.horaRegistro}</div>
                </div>
                <div class="field">
                    <div class="field-label">Estado:</div>
                    <div class="field-value">Nueva</div>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Centro Oftalmológico El Otorongo</strong></p>
                <p>Faucett 326, Callao - Lima, Perú</p>
                <p>Teléfono: (01) 555-0123 | Email: info@otorongo.com</p>
                <p style="margin-top: 20px; font-size: 0.8rem;">
                    Este documento es un comprobante de registro de su ${complaint.tipo}.
                    Nos pondremos en contacto con usted en un plazo máximo de 48 horas.
                </p>
            </div>
            
            <div class="no-print" style="text-align: center; margin-top: 30px;">
                <button onclick="window.print()" style="padding: 10px 20px; background: #2c5aa0; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Imprimir
                </button>
                <button onclick="window.close()" style="padding: 10px 20px; background: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">
                    Cerrar
                </button>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// ============================================
// GESTIÓN DE RECLAMACIONES (ADMIN)
// ============================================

function initializeComplaintsManagement() {
    loadComplaintsTable();
    setupComplaintsFilters();
    setupComplaintsSearch();
}

function loadComplaintsTable(filters = {}) {
    const complaints = getComplaints();
    let filteredComplaints = complaints;
    
    // Aplicar filtros
    if (filters.tipo) {
        filteredComplaints = filteredComplaints.filter(c => c.tipo === filters.tipo);
    }
    if (filters.estado) {
        filteredComplaints = filteredComplaints.filter(c => c.estado === filters.estado);
    }
    if (filters.fechaDesde) {
        filteredComplaints = filteredComplaints.filter(c => c.fechaRegistro >= filters.fechaDesde);
    }
    if (filters.fechaHasta) {
        filteredComplaints = filteredComplaints.filter(c => c.fechaRegistro <= filters.fechaHasta);
    }
    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredComplaints = filteredComplaints.filter(c => 
            c.numero.toLowerCase().includes(searchLower) ||
            c.nombreCompleto.toLowerCase().includes(searchLower) ||
            c.dni.includes(searchLower) ||
            c.descripcion.toLowerCase().includes(searchLower)
        );
    }
    
    // Ordenar por fecha (más recientes primero)
    filteredComplaints.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    // Renderizar tabla
    const tbody = document.getElementById('complaintsTableBody');
    if (!tbody) return;
    
    if (filteredComplaints.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 3rem; color: var(--gray-500);">
                    <i class="fas fa-inbox" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                    No se encontraron reclamaciones
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = filteredComplaints.map(complaint => `
        <tr>
            <td>${complaint.numero}</td>
            <td>
                <span class="complaint-type ${complaint.tipo}">
                    <i class="fas fa-${getComplaintIcon(complaint.tipo)}"></i>
                    ${complaint.tipo.charAt(0).toUpperCase() + complaint.tipo.slice(1)}
                </span>
            </td>
            <td>${formatDate(complaint.fechaRegistro)}</td>
            <td>${complaint.nombreCompleto}</td>
            <td>${complaint.dni}</td>
            <td>${complaint.servicioRelacionado}</td>
            <td>
                <span class="complaint-status ${complaint.estado}">
                    ${getEstadoLabel(complaint.estado)}
                </span>
            </td>
            <td>
                <div style="display: flex; gap: 0.5rem;">
                    <button class="btn-action" onclick="viewComplaint('${complaint.id}')" title="Ver detalles">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-action" onclick="updateComplaintStatus('${complaint.id}')" title="Cambiar estado">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-action" onclick="printComplaint('${complaint.id}')" title="Imprimir">
                        <i class="fas fa-print"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    // Actualizar estadísticas
    updateComplaintsStats(complaints);
}

function getComplaintIcon(tipo) {
    const icons = {
        'queja': 'exclamation-triangle',
        'reclamo': 'exclamation-circle',
        'sugerencia': 'lightbulb'
    };
    return icons[tipo] || 'file-alt';
}

function getEstadoLabel(estado) {
    const labels = {
        'nueva': 'Nueva',
        'en-proceso': 'En Proceso',
        'resuelta': 'Resuelta',
        'cerrada': 'Cerrada'
    };
    return labels[estado] || estado;
}

function setupComplaintsFilters() {
    const filterForm = document.getElementById('complaintsFilters');
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            applyComplaintsFilters();
        });
    }
    
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            filterForm.reset();
            loadComplaintsTable();
        });
    }
}

function setupComplaintsSearch() {
    const searchInput = document.getElementById('complaintsSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            applyComplaintsFilters();
        });
    }
}

function applyComplaintsFilters() {
    const filters = {
        tipo: document.getElementById('filterTipo')?.value || '',
        estado: document.getElementById('filterEstado')?.value || '',
        fechaDesde: document.getElementById('filterFechaDesde')?.value || '',
        fechaHasta: document.getElementById('filterFechaHasta')?.value || '',
        search: document.getElementById('complaintsSearch')?.value || ''
    };
    
    loadComplaintsTable(filters);
}

function updateComplaintsStats(complaints) {
    const stats = {
        total: complaints.length,
        nuevas: complaints.filter(c => c.estado === 'nueva').length,
        enProceso: complaints.filter(c => c.estado === 'en-proceso').length,
        resueltas: complaints.filter(c => c.estado === 'resuelta').length
    };
    
    // Actualizar elementos de estadísticas si existen
    const totalEl = document.getElementById('statTotal');
    const nuevasEl = document.getElementById('statNuevas');
    const procesoEl = document.getElementById('statProceso');
    const resueltasEl = document.getElementById('statResueltas');
    
    if (totalEl) totalEl.textContent = stats.total;
    if (nuevasEl) nuevasEl.textContent = stats.nuevas;
    if (procesoEl) procesoEl.textContent = stats.enProceso;
    if (resueltasEl) resueltasEl.textContent = stats.resueltas;
}

function viewComplaint(complaintId) {
    const complaints = getComplaints();
    const complaint = complaints.find(c => c.id === complaintId);
    
    if (!complaint) {
        showNotification('No se encontró la reclamación', 'error');
        return;
    }
    
    // Crear modal con detalles
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 700px;">
            <div class="modal-header">
                <h3 class="modal-title">
                    <i class="fas fa-file-alt"></i>
                    Detalles de ${complaint.tipo.charAt(0).toUpperCase() + complaint.tipo.slice(1)}
                </h3>
                <button class="modal-close" onclick="closeComplaintModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div style="background: var(--gray-100); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <p style="font-size: 0.9rem; color: var(--gray-600); margin: 0;">Número de Registro</p>
                            <p style="font-size: 1.3rem; font-weight: 700; color: var(--primary-color); margin: 0;">${complaint.numero}</p>
                        </div>
                        <span class="complaint-status ${complaint.estado}">
                            ${getEstadoLabel(complaint.estado)}
                        </span>
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: var(--dark-color); margin-bottom: 1rem; border-bottom: 2px solid var(--gray-200); padding-bottom: 0.5rem;">
                        Datos del Reclamante
                    </h4>
                    <div style="display: grid; gap: 0.75rem;">
                        <div><strong>Nombre:</strong> ${complaint.nombreCompleto}</div>
                        <div><strong>DNI:</strong> ${complaint.dni}</div>
                        <div><strong>Teléfono:</strong> ${complaint.telefono}</div>
                        <div><strong>Email:</strong> ${complaint.email}</div>
                        <div><strong>Dirección:</strong> ${complaint.direccion}</div>
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="color: var(--dark-color); margin-bottom: 1rem; border-bottom: 2px solid var(--gray-200); padding-bottom: 0.5rem;">
                        Detalles de la ${complaint.tipo.charAt(0).toUpperCase() + complaint.tipo.slice(1)}
                    </h4>
                    <div style="display: grid; gap: 0.75rem;">
                        <div><strong>Tipo:</strong> 
                            <span class="complaint-type ${complaint.tipo}">
                                ${complaint.tipo.charAt(0).toUpperCase() + complaint.tipo.slice(1)}
                            </span>
                        </div>
                        <div><strong>Fecha del Incidente:</strong> ${formatDate(complaint.fechaIncidente)}</div>
                        <div><strong>Servicio Relacionado:</strong> ${complaint.servicioRelacionado}</div>
                        <div><strong>Descripción:</strong><br>${complaint.descripcion}</div>
                        <div><strong>Pedido:</strong><br>${complaint.pedido}</div>
                    </div>
                </div>
                
                <div>
                    <h4 style="color: var(--dark-color); margin-bottom: 1rem; border-bottom: 2px solid var(--gray-200); padding-bottom: 0.5rem;">
                        Información de Registro
                    </h4>
                    <div style="display: grid; gap: 0.75rem;">
                        <div><strong>Fecha de Registro:</strong> ${formatDate(complaint.fechaRegistro)}</div>
                        <div><strong>Hora de Registro:</strong> ${complaint.horaRegistro}</div>
                    </div>
                </div>
            </div>
            <div class="modal-footer" style="display: flex; gap: 1rem; justify-content: flex-end; padding-top: 1rem; border-top: 1px solid var(--gray-200);">
                <button class="btn-secondary" onclick="printComplaint('${complaint.id}')">
                    <i class="fas fa-print"></i> Imprimir
                </button>
                <button class="btn-primary" onclick="updateComplaintStatus('${complaint.id}')">
                    <i class="fas fa-edit"></i> Cambiar Estado
                </button>
                <button class="btn-secondary" onclick="closeComplaintModal()">
                    <i class="fas fa-times"></i> Cerrar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function updateComplaintStatus(complaintId) {
    const complaints = getComplaints();
    const complaint = complaints.find(c => c.id === complaintId);
    
    if (!complaint) {
        showNotification('No se encontró la reclamación', 'error');
        return;
    }
    
    // Cerrar modal anterior si existe
    closeComplaintModal();
    
    // Crear modal para cambiar estado
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">
                    <i class="fas fa-edit"></i>
                    Actualizar Estado
                </h3>
                <button class="modal-close" onclick="closeComplaintModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <p style="margin-bottom: 1rem;">
                    <strong>Reclamación:</strong> ${complaint.numero}
                </p>
                <p style="margin-bottom: 1.5rem;">
                    <strong>Estado Actual:</strong> 
                    <span class="complaint-status ${complaint.estado}">
                        ${getEstadoLabel(complaint.estado)}
                    </span>
                </p>
                
                <form id="updateStatusForm">
                    <div class="form-group">
                        <label for="newStatus">Nuevo Estado *</label>
                        <select id="newStatus" name="estado" required>
                            <option value="">Seleccione un estado</option>
                            <option value="nueva" ${complaint.estado === 'nueva' ? 'selected' : ''}>Nueva</option>
                            <option value="en-proceso" ${complaint.estado === 'en-proceso' ? 'selected' : ''}>En Proceso</option>
                            <option value="resuelta" ${complaint.estado === 'resuelta' ? 'selected' : ''}>Resuelta</option>
                            <option value="cerrada" ${complaint.estado === 'cerrada' ? 'selected' : ''}>Cerrada</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="statusNotes">Notas / Comentarios</label>
                        <textarea id="statusNotes" name="notas" rows="4" placeholder="Agregue comentarios sobre el cambio de estado..."></textarea>
                    </div>
                </form>
            </div>
            <div class="modal-footer" style="display: flex; gap: 1rem; justify-content: flex-end; padding-top: 1rem; border-top: 1px solid var(--gray-200);">
                <button class="btn-secondary" onclick="closeComplaintModal()">
                    <i class="fas fa-times"></i> Cancelar
                </button>
                <button class="btn-primary" onclick="saveComplaintStatus('${complaintId}')">
                    <i class="fas fa-save"></i> Guardar Cambios
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function saveComplaintStatus(complaintId) {
    const newStatus = document.getElementById('newStatus').value;
    const notes = document.getElementById('statusNotes').value;
    
    if (!newStatus) {
        showNotification('Por favor seleccione un estado', 'error');
        return;
    }
    
    const complaints = getComplaints();
    const complaintIndex = complaints.findIndex(c => c.id === complaintId);
    
    if (complaintIndex === -1) {
        showNotification('No se encontró la reclamación', 'error');
        return;
    }
    
    // Actualizar estado
    complaints[complaintIndex].estado = newStatus;
    complaints[complaintIndex].ultimaActualizacion = new Date().toISOString();
    
    // Agregar nota si existe
    if (notes) {
        if (!complaints[complaintIndex].notas) {
            complaints[complaintIndex].notas = [];
        }
        complaints[complaintIndex].notas.push({
            fecha: new Date().toISOString(),
            usuario: getCurrentUser(),
            texto: notes
        });
    }
    
    // Guardar cambios
    localStorage.setItem('otorongo_complaints', JSON.stringify(complaints));
    
    // Registrar actividad
    if (window.OtorongoSystem && window.OtorongoSystem.logActivity) {
        window.OtorongoSystem.logActivity(
            'complaint_updated',
            `Estado actualizado a: ${getEstadoLabel(newStatus)}`,
            { complaintId, newStatus, notes }
        );
    }
    
    // Cerrar modal y recargar tabla
    closeComplaintModal();
    loadComplaintsTable();
    
    showNotification('Estado actualizado correctamente', 'success');
}

function getCurrentUser() {
    try {
        const user = localStorage.getItem('otorongo_current_user');
        if (user) {
            const userData = JSON.parse(user);
            return userData.name || userData.username || 'Sistema';
        }
    } catch (error) {
        console.error('Error al obtener usuario actual:', error);
    }
    return 'Sistema';
}

// ============================================
// FUNCIONES AUXILIARES
// ============================================

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info', duration = 5000) {
    // Usar el sistema de notificaciones global si existe
    if (window.OtorongoSystem && window.OtorongoSystem.showNotification) {
        window.OtorongoSystem.showNotification(message, type, duration);
        return;
    }
    
    // Fallback: crear notificación simple
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; margin-left: auto; opacity: 0.8;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    if (duration > 0) {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, duration);
    }
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || '#17a2b8';
}

// Exportar funciones para uso global
window.ComplaintsSystem = {
    getComplaints,
    saveComplaint,
    viewComplaint,
    updateComplaintStatus,
    printComplaint,
    closeComplaintModal,
    loadComplaintsTable,
    saveComplaintStatus
};

console.log('Sistema de Reclamaciones cargado correctamente');
