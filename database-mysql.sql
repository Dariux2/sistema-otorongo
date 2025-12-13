-- ============================================
-- Base de Datos MySQL
-- Centro Oftalmológico El Otorongo
-- ============================================

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS otorongo_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE otorongo_db;

-- ============================================
-- TABLA: users (Usuarios del Sistema)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: patients (Pacientes)
-- ============================================
CREATE TABLE IF NOT EXISTS patients (
    id VARCHAR(50) PRIMARY KEY,
    dni VARCHAR(20) UNIQUE NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    direccion TEXT NOT NULL,
    seguro VARCHAR(50) NOT NULL,
    observaciones TEXT,
    fecha_registro DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_dni (dni),
    INDEX idx_nombres (nombres),
    INDEX idx_apellidos (apellidos)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: appointments (Citas Médicas)
-- ============================================
CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(50) PRIMARY KEY,
    paciente_id VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    medico VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    duracion VARCHAR(10) DEFAULT '60',
    estado VARCHAR(20) DEFAULT 'programada',
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES patients(id) ON DELETE CASCADE,
    INDEX idx_fecha (fecha),
    INDEX idx_paciente (paciente_id),
    INDEX idx_medico (medico),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: medical_history (Historial Médico)
-- ============================================
CREATE TABLE IF NOT EXISTS medical_history (
    id VARCHAR(50) PRIMARY KEY,
    paciente_id VARCHAR(50) NOT NULL,
    fecha DATE NOT NULL,
    diagnostico TEXT NOT NULL,
    tratamiento TEXT NOT NULL,
    medico VARCHAR(100) NOT NULL,
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES patients(id) ON DELETE CASCADE,
    INDEX idx_paciente (paciente_id),
    INDEX idx_fecha (fecha)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: invoices (Facturas)
-- ============================================
CREATE TABLE IF NOT EXISTS invoices (
    id VARCHAR(50) PRIMARY KEY,
    paciente_id VARCHAR(50) NOT NULL,
    cita_id VARCHAR(50),
    fecha DATE NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    igv DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'pendiente',
    metodo_pago VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (paciente_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (cita_id) REFERENCES appointments(id) ON DELETE SET NULL,
    INDEX idx_paciente (paciente_id),
    INDEX idx_fecha (fecha),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: invoice_services (Servicios de Factura)
-- ============================================
CREATE TABLE IF NOT EXISTS invoice_services (
    id VARCHAR(50) PRIMARY KEY,
    factura_id VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    cantidad INT NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (factura_id) REFERENCES invoices(id) ON DELETE CASCADE,
    INDEX idx_factura (factura_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: messages (Mensajes de Contacto)
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
    id VARCHAR(50) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    mensaje TEXT NOT NULL,
    estado VARCHAR(20) DEFAULT 'nuevo',
    fecha DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_fecha (fecha),
    INDEX idx_estado (estado)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- TABLA: activities (Registro de Actividades)
-- ============================================
CREATE TABLE IF NOT EXISTS activities (
    id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    user VARCHAR(100) NOT NULL,
    data TEXT,
    timestamp DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_timestamp (timestamp),
    INDEX idx_type (type),
    INDEX idx_user (user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DATOS DE EJEMPLO
-- ============================================

-- Insertar usuarios de ejemplo
-- Contraseñas hasheadas con bcrypt:
-- admin123, medico123, recep123
INSERT INTO users (id, username, password, role, name, email) VALUES
('admin1', 'admin', '$2a$10$c2PUv.Kx6gUalIT.ljPuG.78hgQ5YTHqY9dcX5TlqShOKmODAwK6S', 'administrador', 'Dr. Carlos Mendoza', 'admin@otorongo.com'),
('medico1', 'medico', '$2a$10$5yP37WjkJnDhBQCLkU21B.ZcBmtDrmTq9hMqwB7zIh.8ZI/Xtyf2S', 'medico', 'Dra. Ana García', 'medico@otorongo.com'),
('recep1', 'recepcion', '$2a$10$djhwJkSXgi31LeoX0zpYTed9uK51K1jx1TjjYVRMQ0fPPyMDsbTAy', 'recepcionista', 'María López', 'recepcion@otorongo.com')
ON DUPLICATE KEY UPDATE id=id;

-- Insertar pacientes de ejemplo
INSERT INTO patients (id, dni, nombres, apellidos, fecha_nacimiento, telefono, email, direccion, seguro, observaciones, fecha_registro) VALUES
('pac001', '12345678', 'Juan Carlos', 'Pérez García', '1985-03-15', '987654321', 'juan.perez@email.com', 'Av. Lima 123, Callao', 'SIS', 'Paciente regular', '2025-01-15'),
('pac002', '87654321', 'María Elena', 'Rodríguez Silva', '1978-07-22', '912345678', 'maria.rodriguez@email.com', 'Jr. Callao 456, Lima', 'EsSalud', 'Control periódico', '2025-01-10')
ON DUPLICATE KEY UPDATE id=id;

-- Insertar historial médico de ejemplo
INSERT INTO medical_history (id, paciente_id, fecha, diagnostico, tratamiento, medico, observaciones) VALUES
('hist001', 'pac001', '2025-01-15', 'Miopía leve', 'Lentes correctivos', 'Dra. Ana García', 'Paciente presenta dificultad para ver objetos lejanos'),
('hist002', 'pac002', '2025-01-10', 'Catarata inicial', 'Seguimiento periódico', 'Dr. Carlos Mendoza', 'Se recomienda control cada 6 meses')
ON DUPLICATE KEY UPDATE id=id;

-- Insertar citas de ejemplo (fecha actual)
INSERT INTO appointments (id, paciente_id, fecha, hora, medico, tipo, duracion, estado, observaciones) VALUES
('cita001', 'pac001', CURDATE(), '09:00:00', 'Dra. Ana García', 'Consulta General', '60', 'programada', 'Primera consulta'),
('cita002', 'pac002', CURDATE(), '10:30:00', 'Dr. Carlos Mendoza', 'Control', '60', 'programada', 'Control de catarata')
ON DUPLICATE KEY UPDATE id=id;

-- Insertar facturas de ejemplo
INSERT INTO invoices (id, paciente_id, cita_id, fecha, subtotal, igv, total, estado, metodo_pago) VALUES
('fact001', 'pac001', 'cita001', '2025-01-15', 80.00, 14.40, 94.40, 'pagada', 'efectivo')
ON DUPLICATE KEY UPDATE id=id;

-- Insertar servicios de factura de ejemplo
INSERT INTO invoice_services (id, factura_id, descripcion, cantidad, precio) VALUES
('serv001', 'fact001', 'Consulta Oftalmológica', 1, 80.00)
ON DUPLICATE KEY UPDATE id=id;

-- ============================================
-- VERIFICACIÓN
-- ============================================
SELECT 'Base de datos creada exitosamente' AS status;
SELECT COUNT(*) AS total_usuarios FROM users;
SELECT COUNT(*) AS total_pacientes FROM patients;
SELECT COUNT(*) AS total_citas FROM appointments;
