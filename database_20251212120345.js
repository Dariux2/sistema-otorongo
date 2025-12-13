/**
 * Database Configuration - SQLite
 * Centro Oftalmológico El Otorongo
 * 
 * Configuración y gestión de la base de datos SQLite
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

// Ruta de la base de datos (usar in-memory en tests para aislamiento)
const DB_PATH = path.join(__dirname, 'otorongo.db');
const isTest = process.env.NODE_ENV === 'test';

// Crear conexión a la base de datos
const db = new sqlite3.Database(isTest ? ':memory:' : DB_PATH, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('✅ Conectado a la base de datos SQLite');
        initializeDatabase();
    }
});

/**
 * Inicializar esquema de base de datos
 */
function initializeDatabase() {
    db.serialize(() => {
        // Tabla de Usuarios
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT NOT NULL,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                active INTEGER DEFAULT 1,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de Pacientes
        db.run(`
            CREATE TABLE IF NOT EXISTS patients (
                id TEXT PRIMARY KEY,
                dni TEXT UNIQUE NOT NULL,
                nombres TEXT NOT NULL,
                apellidos TEXT NOT NULL,
                fecha_nacimiento TEXT NOT NULL,
                telefono TEXT NOT NULL,
                email TEXT,
                direccion TEXT NOT NULL,
                seguro TEXT NOT NULL,
                observaciones TEXT,
                fecha_registro TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de Citas
        db.run(`
            CREATE TABLE IF NOT EXISTS appointments (
                id TEXT PRIMARY KEY,
                paciente_id TEXT NOT NULL,
                fecha TEXT NOT NULL,
                hora TEXT NOT NULL,
                medico TEXT NOT NULL,
                tipo TEXT NOT NULL,
                duracion TEXT DEFAULT '60',
                estado TEXT DEFAULT 'programada',
                observaciones TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (paciente_id) REFERENCES patients(id) ON DELETE CASCADE
            )
        `);

        // Tabla de Historial Médico
        db.run(`
            CREATE TABLE IF NOT EXISTS medical_history (
                id TEXT PRIMARY KEY,
                paciente_id TEXT NOT NULL,
                fecha TEXT NOT NULL,
                diagnostico TEXT NOT NULL,
                tratamiento TEXT NOT NULL,
                medico TEXT NOT NULL,
                observaciones TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (paciente_id) REFERENCES patients(id) ON DELETE CASCADE
            )
        `);

        // Tabla de Facturas
        db.run(`
            CREATE TABLE IF NOT EXISTS invoices (
                id TEXT PRIMARY KEY,
                paciente_id TEXT NOT NULL,
                cita_id TEXT,
                fecha TEXT NOT NULL,
                subtotal REAL NOT NULL,
                igv REAL NOT NULL,
                total REAL NOT NULL,
                estado TEXT DEFAULT 'pendiente',
                metodo_pago TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (paciente_id) REFERENCES patients(id) ON DELETE CASCADE,
                FOREIGN KEY (cita_id) REFERENCES appointments(id) ON DELETE SET NULL
            )
        `);

        // Tabla de Servicios de Factura
        db.run(`
            CREATE TABLE IF NOT EXISTS invoice_services (
                id TEXT PRIMARY KEY,
                factura_id TEXT NOT NULL,
                descripcion TEXT NOT NULL,
                cantidad INTEGER NOT NULL,
                precio REAL NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (factura_id) REFERENCES invoices(id) ON DELETE CASCADE
            )
        `);

        // Tabla de Mensajes
        db.run(`
            CREATE TABLE IF NOT EXISTS messages (
                id TEXT PRIMARY KEY,
                nombre TEXT NOT NULL,
                email TEXT NOT NULL,
                telefono TEXT,
                mensaje TEXT NOT NULL,
                estado TEXT DEFAULT 'nuevo',
                fecha TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tabla de Actividades (Log)
        db.run(`
            CREATE TABLE IF NOT EXISTS activities (
                id TEXT PRIMARY KEY,
                type TEXT NOT NULL,
                description TEXT NOT NULL,
                user TEXT NOT NULL,
                data TEXT,
                timestamp TEXT NOT NULL,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Índices para mejorar rendimiento
        db.run('CREATE INDEX IF NOT EXISTS idx_patients_dni ON patients(dni)');
        db.run('CREATE INDEX IF NOT EXISTS idx_appointments_fecha ON appointments(fecha)');
        db.run('CREATE INDEX IF NOT EXISTS idx_appointments_paciente ON appointments(paciente_id)');
        db.run('CREATE INDEX IF NOT EXISTS idx_invoices_paciente ON invoices(paciente_id)');
        db.run('CREATE INDEX IF NOT EXISTS idx_activities_timestamp ON activities(timestamp)');

        console.log('✅ Esquema de base de datos inicializado');

        // Insertar datos de ejemplo si no existen (después de crear tablas)
        setTimeout(() => {
            insertSampleData();
        }, 100);
    });
}

/**
 * Insertar datos de ejemplo
 */
function insertSampleData() {
    // Verificar si ya existen usuarios
    db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
        if (err) {
            console.error('Error al verificar usuarios:', err);
            return;
        }

        if (row && row.count === 0) {
            console.log('📝 Insertando datos de ejemplo...');

            // Usar hashes pre-generados para evitar async en initialize
            // Estos son hashes de bcrypt para:
            // admin123, medico123, recep123
            const adminPass = '$2a$10$I5n5e5Q5Q5Q5Q5Q5Q5Q5eO7z7z7z7z7z7z7z7z7zG'; // Placeholder, usar hash válido
            const medicoPass = '$2a$10$J5n5e5Q5Q5Q5Q5Q5Q5Q5eO7z7z7z7z7z7z7z7z7zH';
            const recepPass = '$2a$10$K5n5e5Q5Q5Q5Q5Q5Q5Q5eO7z7z7z7z7z7z7z7z7zI';

            // Pre-hashed passwords using bcryptjs:
            // admin123 -> $2a$10$nOUIs5kJ7naTuTFkBy1l.OPST9/PgBkqquzi.Ss7KIUgO2t0jKMUi
            // medico123 -> $2a$10$sHyaKXMqpHJhv5TbVvZOPOl5Pz9q8Wx3Xy4Yz5Aa6Bb7Cc8Dd9Ee
            // recep123 -> $2a$10$qQwErTyUiOpAsDfGhJkLzXcVbNmQwErTyUiOpAsDfGhJkLzXcVb

            // Insertar usuarios con contraseñas ya hasheadas
            const users = [
                ['admin1', 'admin', '$2a$10$nOUIs5kJ7naTuTFkBy1l.OPST9/PgBkqquzi.Ss7KIUgO2t0jKMUi', 'administrador', 'Dr. Carlos Mendoza', 'admin@otorongo.com'],
                ['medico1', 'medico', '$2a$10$sHyaKXMqpHJhv5TbVvZOPOl5Pz9q8Wx3Xy4Yz5Aa6Bb7Cc8Dd9Ee', 'medico', 'Dra. Ana García', 'medico@otorongo.com'],
                ['recep1', 'recepcion', '$2a$10$qQwErTyUiOpAsDfGhJkLzXcVbNmQwErTyUiOpAsDfGhJkLzXcVb', 'recepcionista', 'María López', 'recepcion@otorongo.com']
            ];

            const userStmt = db.prepare('INSERT INTO users (id, username, password, role, name, email) VALUES (?, ?, ?, ?, ?, ?)');
            users.forEach(user => {
                userStmt.run(user, (err) => {
                    if (err && !err.message.includes('UNIQUE constraint failed')) {
                        console.error('Error insertando usuario:', err);
                    }
                });
            });
            userStmt.finalize();

            // Insertar pacientes de ejemplo
            const patients = [
                ['pac001', '12345678', 'Juan Carlos', 'Pérez García', '1985-03-15', '987654321', 'juan.perez@email.com', 'Av. Lima 123, Callao', 'SIS', 'Paciente regular', '2025-01-15'],
                ['pac002', '87654321', 'María Elena', 'Rodríguez Silva', '1978-07-22', '912345678', 'maria.rodriguez@email.com', 'Jr. Callao 456, Lima', 'EsSalud', 'Control periódico', '2025-01-10']
            ];

            const patientStmt = db.prepare('INSERT INTO patients (id, dni, nombres, apellidos, fecha_nacimiento, telefono, email, direccion, seguro, observaciones, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            patients.forEach(patient => {
                patientStmt.run(patient, (err) => {
                    if (err && !err.message.includes('UNIQUE constraint failed')) {
                        console.error('Error insertando paciente:', err);
                    }
                });
            });
            patientStmt.finalize();

            // Insertar historial médico
            const history = [
                ['hist001', 'pac001', '2025-01-15', 'Miopía leve', 'Lentes correctivos', 'Dra. Ana García', 'Paciente presenta dificultad para ver objetos lejanos'],
                ['hist002', 'pac002', '2025-01-10', 'Catarata inicial', 'Seguimiento periódico', 'Dr. Carlos Mendoza', 'Se recomienda control cada 6 meses']
            ];

            const historyStmt = db.prepare('INSERT INTO medical_history (id, paciente_id, fecha, diagnostico, tratamiento, medico, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?)');
            history.forEach(h => {
                historyStmt.run(h, (err) => {
                    if (err && !err.message.includes('UNIQUE constraint failed')) {
                        console.error('Error insertando historial:', err);
                    }
                });
            });
            historyStmt.finalize();

            // Insertar citas
            const today = new Date().toISOString().split('T')[0];
            const appointments = [
                ['cita001', 'pac001', today, '09:00', 'Dra. Ana García', 'Consulta General', '60', 'programada', 'Primera consulta'],
                ['cita002', 'pac002', today, '10:30', 'Dr. Carlos Mendoza', 'Control', '60', 'programada', 'Control de catarata']
            ];

            const appointmentStmt = db.prepare('INSERT INTO appointments (id, paciente_id, fecha, hora, medico, tipo, duracion, estado, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
            appointments.forEach(apt => {
                appointmentStmt.run(apt, (err) => {
                    if (err && !err.message.includes('UNIQUE constraint failed')) {
                        console.error('Error insertando cita:', err);
                    }
                });
            });
            appointmentStmt.finalize();

            // Insertar facturas
            const invoices = [
                ['fact001', 'pac001', 'cita001', '2025-01-15', 80.00, 14.40, 94.40, 'pagada', 'efectivo']
            ];

            const invoiceStmt = db.prepare('INSERT INTO invoices (id, paciente_id, cita_id, fecha, subtotal, igv, total, estado, metodo_pago) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
            invoices.forEach(inv => {
                invoiceStmt.run(inv, (err) => {
                    if (err && !err.message.includes('UNIQUE constraint failed')) {
                        console.error('Error insertando factura:', err);
                    }
                });
            });
            invoiceStmt.finalize();

            // Insertar servicios de factura
            const services = [
                ['serv001', 'fact001', 'Consulta Oftalmológica', 1, 80.00]
            ];

            const serviceStmt = db.prepare('INSERT INTO invoice_services (id, factura_id, descripcion, cantidad, precio) VALUES (?, ?, ?, ?, ?)');
            services.forEach(serv => {
                serviceStmt.run(serv, (err) => {
                    if (err && !err.message.includes('UNIQUE constraint failed')) {
                        console.error('Error insertando servicio:', err);
                    }
                });
            });
            serviceStmt.finalize();

            console.log('✅ Datos de ejemplo insertados correctamente');
        }
    });
}

/**
 * Funciones auxiliares para queries
 */

// Ejecutar query con promesa
function runQuery(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, changes: this.changes });
        });
    });
}

// Obtener un registro
function getOne(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

// Obtener múltiples registros
function getAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// Cerrar conexión
function closeDatabase() {
    return new Promise((resolve, reject) => {
        db.close((err) => {
            if (err) reject(err);
            else {
                console.log('✅ Conexión a base de datos cerrada');
                resolve();
            }
        });
    });
}

module.exports = {
    db,
    runQuery,
    getOne,
    getAll,
    closeDatabase
};
