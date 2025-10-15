// Sistema Centro Oftalmológico El Otorongo
// JavaScript Principal

// Variables globales
let currentUser = null;
let currentPage = 'inicio';

// Inicializar usuarios de prueba si no existen
if (!localStorage.getItem('otorongo_users')) {
    const demoUsers = [
        { username: 'admin', password: 'admin123', role: 'administrador' },
        { username: 'medico', password: 'medico123', role: 'medico' },
        { username: 'recepcion', password: 'recep123', role: 'recepcionista' }
    ];
    localStorage.setItem('otorongo_users', JSON.stringify(demoUsers));
}

// Proteger acceso solo para usuarios autenticados (solo en dashboards, no en index/login)
if (
    window.location.pathname.includes('dashboard-admin.html') ||
    window.location.pathname.includes('dashboard-medico.html') ||
    window.location.pathname.includes('dashboard-recepcion.html') ||
    window.location.pathname.includes('reportes.html')
) {
    document.addEventListener('DOMContentLoaded', function() {
        const currentUser = localStorage.getItem('otorongo_current_user');
        if (!currentUser) {
            window.location.href = 'login.html';
        } else {
            // Mostrar usuario y rol en el dashboard
            const userObj = JSON.parse(currentUser);
            if (document.getElementById('userName')) {
                document.getElementById('userName').textContent = userObj.username || 'Usuario';
            }
            if (document.getElementById('userRole')) {
                document.getElementById('userRole').textContent = userObj.role || 'Rol';
            }
        }
    });
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('otorongo_current_user');
    window.location.href = 'login.html';
}

// Inicialización del sistema
document.addEventListener('DOMContentLoaded', function() {
    initializeSystem();
    setupEventListeners();
    checkUserSession();
});

// Inicializar sistema
function initializeSystem() {
    // Inicializar datos de ejemplo si no existen
    if (!localStorage.getItem('otorongo_patients')) {
        initializeSampleData();
    }
    
    // Configurar navegación suave
    setupSmoothScrolling();
    
    // Configurar formularios
    setupForms();
    
    console.log('Sistema Centro Oftalmológico El Otorongo inicializado');
}

// Configurar event listeners
function setupEventListeners() {
    // Navegación móvil
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Cerrar modales al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Tecla ESC para cerrar modales
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

// Navegación suave
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Función para scroll a sección
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Manejar navegación
function handleNavigation(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    
    if (href.startsWith('#')) {
        const sectionId = href.substring(1);
        scrollToSection(sectionId);
        
        // Actualizar navegación activa
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    }
}

// Toggle menú móvil
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-active');
}

// Configurar formularios
function setupForms() {
    // Validación en tiempo real
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Validar campo individual
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Limpiar errores previos
    clearFieldError(e);
    
    // Validaciones específicas
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
    } else if (fieldName === 'dni' && value && !isValidDNI(value)) {
        isValid = false;
        errorMessage = 'Ingrese un DNI válido (8 dígitos)';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Limpiar error de campo
function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

// Mostrar error de campo
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

// Validaciones
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

// Manejar formulario de contacto
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validar todos los campos
    const fields = e.target.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        showNotification('Por favor, corrija los errores en el formulario', 'error');
        return;
    }
    
    // Simular envío
    showNotification('Enviando mensaje...', 'info');
    
    setTimeout(() => {
        // Guardar mensaje en localStorage
        const messages = JSON.parse(localStorage.getItem('otorongo_messages') || '[]');
        messages.push({
            id: generateId(),
            ...data,
            fecha: new Date().toISOString(),
            estado: 'nuevo'
        });
        localStorage.setItem('otorongo_messages', JSON.stringify(messages));
        
        showNotification('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.', 'success');
        e.target.reset();
    }, 1500);
}

// Verificar sesión de usuario
function checkUserSession() {
    const savedUser = localStorage.getItem('otorongo_current_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
}

// Funciones de utilidad
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    
    return date.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN'
    }).format(amount);
}

// Sistema de notificaciones
function showNotification(message, type = 'info', duration = 5000) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Estilos de notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Auto-remover después del tiempo especificado
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

// Funciones de modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (typeof modal === 'string') {
        modal = document.getElementById(modal);
    }
    
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Inicializar datos de ejemplo
function initializeSampleData() {
    // Usuarios del sistema
    const users = [
        {
            id: 'admin1',
            username: 'admin',
            password: 'admin123',
            role: 'administrador',
            name: 'Dr. Carlos Mendoza',
            email: 'admin@otorongo.com'
        },
        {
            id: 'medico1',
            username: 'medico',
            password: 'medico123',
            role: 'medico',
            name: 'Dra. Ana García',
            email: 'medico@otorongo.com'
        },
        {
            id: 'recep1',
            username: 'recepcion',
            password: 'recep123',
            role: 'recepcionista',
            name: 'María López',
            email: 'recepcion@otorongo.com'
        }
    ];
    
    // Pacientes de ejemplo
    const patients = [
        {
            id: 'pac001',
            dni: '12345678',
            nombres: 'Juan Carlos',
            apellidos: 'Pérez García',
            fechaNacimiento: '1985-03-15',
            telefono: '987654321',
            email: 'juan.perez@email.com',
            direccion: 'Av. Lima 123, Callao',
            seguro: 'SIS',
            fechaRegistro: '2025-01-15',
            historialMedico: [
                {
                    fecha: '2025-01-15',
                    diagnostico: 'Miopía leve',
                    tratamiento: 'Lentes correctivos',
                    medico: 'Dra. Ana García',
                    observaciones: 'Paciente presenta dificultad para ver objetos lejanos'
                }
            ]
        },
        {
            id: 'pac002',
            dni: '87654321',
            nombres: 'María Elena',
            apellidos: 'Rodríguez Silva',
            fechaNacimiento: '1978-07-22',
            telefono: '912345678',
            email: 'maria.rodriguez@email.com',
            direccion: 'Jr. Callao 456, Lima',
            seguro: 'EsSalud',
            fechaRegistro: '2025-01-10',
            historialMedico: [
                {
                    fecha: '2025-01-10',
                    diagnostico: 'Catarata inicial',
                    tratamiento: 'Seguimiento periódico',
                    medico: 'Dr. Carlos Mendoza',
                    observaciones: 'Se recomienda control cada 6 meses'
                }
            ]
        }
    ];
    
    // Citas de ejemplo
    const appointments = [
        {
            id: 'cita001',
            pacienteId: 'pac001',
            fecha: '2025-01-20',
            hora: '09:00',
            medico: 'Dra. Ana García',
            tipo: 'Consulta General',
            estado: 'programada',
            observaciones: 'Primera consulta'
        },
        {
            id: 'cita002',
            pacienteId: 'pac002',
            fecha: '2025-01-20',
            hora: '10:30',
            medico: 'Dr. Carlos Mendoza',
            tipo: 'Control',
            estado: 'programada',
            observaciones: 'Control de catarata'
        }
    ];
    
    // Facturas de ejemplo
    const invoices = [
        {
            id: 'fact001',
            pacienteId: 'pac001',
            citaId: 'cita001',
            fecha: '2025-01-15',
            servicios: [
                {
                    descripcion: 'Consulta Oftalmológica',
                    cantidad: 1,
                    precio: 80.00
                }
            ],
            subtotal: 80.00,
            igv: 14.40,
            total: 94.40,
            estado: 'pagada',
            metodoPago: 'efectivo'
        }
    ];
    
    // Guardar en localStorage
    localStorage.setItem('otorongo_users', JSON.stringify(users));
    localStorage.setItem('otorongo_patients', JSON.stringify(patients));
    localStorage.setItem('otorongo_appointments', JSON.stringify(appointments));
    localStorage.setItem('otorongo_invoices', JSON.stringify(invoices));
    localStorage.setItem('otorongo_messages', JSON.stringify([]));
    
    console.log('Datos de ejemplo inicializados');
}

// Funciones de datos
function getPatients() {
    return JSON.parse(localStorage.getItem('otorongo_patients') || '[]');
}

function savePatients(patients) {
    localStorage.setItem('otorongo_patients', JSON.stringify(patients));
}

function getAppointments() {
    return JSON.parse(localStorage.getItem('otorongo_appointments') || '[]');
}

function saveAppointments(appointments) {
    localStorage.setItem('otorongo_appointments', JSON.stringify(appointments));
}

function getInvoices() {
    return JSON.parse(localStorage.getItem('otorongo_invoices') || '[]');
}

function saveInvoices(invoices) {
    localStorage.setItem('otorongo_invoices', JSON.stringify(invoices));
}

function getUsers() {
    return JSON.parse(localStorage.getItem('otorongo_users') || '[]');
}

function getMessages() {
    return JSON.parse(localStorage.getItem('otorongo_messages') || '[]');
}

// Funciones de búsqueda y filtrado
function searchPatients(query) {
    const patients = getPatients();
    const searchTerm = query.toLowerCase();
    
    return patients.filter(patient => 
        patient.nombres.toLowerCase().includes(searchTerm) ||
        patient.apellidos.toLowerCase().includes(searchTerm) ||
        patient.dni.includes(searchTerm) ||
        patient.email.toLowerCase().includes(searchTerm)
    );
}

function getPatientById(id) {
    const patients = getPatients();
    return patients.find(patient => patient.id === id);
}

function getAppointmentsByDate(date) {
    const appointments = getAppointments();
    return appointments.filter(appointment => appointment.fecha === date);
}

function getAppointmentsByPatient(patientId) {
    const appointments = getAppointments();
    return appointments.filter(appointment => appointment.pacienteId === patientId);
}

// Agregar estilos CSS para notificaciones
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .field-error {
        animation: fadeIn 0.3s ease-out;
    }
    
    input.error,
    textarea.error,
    select.error {
        border-color: var(--danger-color) !important;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1) !important;
    }
`;

document.head.appendChild(notificationStyles);

// Exportar funciones para uso en otros archivos
window.OtorongoSystem = {
    // Funciones de utilidad
    generateId,
    formatDate,
    formatTime,
    formatCurrency,
    showNotification,
    openModal,
    closeModal,
    
    // Funciones de datos
    getPatients,
    savePatients,
    getAppointments,
    saveAppointments,
    getInvoices,
    saveInvoices,
    getUsers,
    getMessages,
    
    // Funciones de búsqueda
    searchPatients,
    getPatientById,
    getAppointmentsByDate,
    getAppointmentsByPatient,
    
    // Variables globales
    get currentUser() { return currentUser; },
    set currentUser(user) { currentUser = user; }
};

console.log('Sistema Centro Oftalmológico El Otorongo cargado correctamente');
// Sistema Centro Oftalmológico El Otorongo - Fin