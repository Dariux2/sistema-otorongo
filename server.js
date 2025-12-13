/**
 * Server - Express + SQLite
 * Centro Oftalmológico El Otorongo
 * 
 * Servidor backend para gestión de datos
 */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config();

const { pool, runQuery, getOne, getAll } = require('./database');

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Función para generar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// ============================================
// RUTAS DE AUTENTICACIÓN
// ============================================

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Usuario y contraseña requeridos' });
        }

        const user = await getOne('SELECT * FROM users WHERE username = ? AND active = 1', [username]);

        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        console.log('DEBUG: Usuario encontrado para login:', user ? { id: user.id, username: user.username } : null);
        if (!user || !user.password) console.log('DEBUG: user.password:', user ? user.password : null);
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // No enviar la contraseña
        delete user.password;

        res.json({
            success: true,
            user: user,
            message: 'Login exitoso'
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

// ============================================
// RUTAS DE USUARIOS
// ============================================

// Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
    try {
        const users = await getAll('SELECT id, username, role, name, email, active, created_at, updated_at FROM users ORDER BY created_at DESC');
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Obtener un usuario por ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await getOne('SELECT id, username, role, name, email, active, created_at, updated_at FROM users WHERE id = ?', [req.params.id]);
        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
});

// Crear nuevo usuario
app.post('/api/users', async (req, res) => {
    try {
        const { username, password, role, name, email } = req.body;

        if (!username || !password || !role || !name || !email) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await getOne('SELECT id FROM users WHERE username = ? OR email = ?', [username, email]);
        
        if (existingUser) {
            return res.status(400).json({ error: 'El usuario o email ya existe' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const id = generateId();

        await runQuery(
            'INSERT INTO users (id, username, password, role, name, email) VALUES (?, ?, ?, ?, ?, ?)',
            [id, username, hashedPassword, role, name, email]
        );

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            id: id
        });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});

// Actualizar usuario
app.put('/api/users/:id', async (req, res) => {
    try {
        const { username, role, name, email, active } = req.body;
        const userId = req.params.id;

        // Verificar si el usuario existe
        const user = await getOne('SELECT id FROM users WHERE id = ?', [userId]);
        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Construir query dinámicamente
        const updates = [];
        const params = [];

        if (username) {
            updates.push('username = ?');
            params.push(username);
        }
        if (role) {
            updates.push('role = ?');
            params.push(role);
        }
        if (name) {
            updates.push('name = ?');
            params.push(name);
        }
        if (email) {
            updates.push('email = ?');
            params.push(email);
        }
        if (active !== undefined) {
            updates.push('active = ?');
            params.push(active ? 1 : 0);
        }

        updates.push('updated_at = CURRENT_TIMESTAMP');
        params.push(userId);

        await runQuery(
            `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
            params
        );

        res.json({
            success: true,
            message: 'Usuario actualizado exitosamente'
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
});

// Cambiar contraseña
app.put('/api/users/:id/password', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.params.id;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Contraseñas requeridas' });
        }

        const user = await getOne('SELECT password FROM users WHERE id = ?', [userId]);
        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar contraseña actual
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        
        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña actual incorrecta' });
        }

        // Hash de nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await runQuery(
            'UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [hashedPassword, userId]
        );

        res.json({
            success: true,
            message: 'Contraseña actualizada exitosamente'
        });
    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        res.status(500).json({ error: 'Error al cambiar contraseña' });
    }
});

// Eliminar usuario (soft delete)
app.delete('/api/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await getOne('SELECT id FROM users WHERE id = ?', [userId]);
        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await runQuery('UPDATE users SET active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [userId]);

        res.json({
            success: true,
            message: 'Usuario desactivado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
});

// ============================================
// RUTAS DE PACIENTES
// ============================================

// Obtener todos los pacientes
app.get('/api/patients', async (req, res) => {
    try {
        const patients = await getAll('SELECT * FROM patients ORDER BY fecha_registro DESC');
        
        // Obtener historial médico para cada paciente
        for (let patient of patients) {
            const history = await getAll('SELECT * FROM medical_history WHERE paciente_id = ? ORDER BY fecha DESC', [patient.id]);
            patient.historialMedico = history;
        }

        res.json(patients);
    } catch (error) {
        console.error('Error al obtener pacientes:', error);
        res.status(500).json({ error: 'Error al obtener pacientes' });
    }
});

// Obtener un paciente por ID
app.get('/api/patients/:id', async (req, res) => {
    try {
        const patient = await getOne('SELECT * FROM patients WHERE id = ?', [req.params.id]);
        
        if (!patient) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }

        // Obtener historial médico
        const history = await getAll('SELECT * FROM medical_history WHERE paciente_id = ? ORDER BY fecha DESC', [patient.id]);
        patient.historialMedico = history;

        res.json(patient);
    } catch (error) {
        console.error('Error al obtener paciente:', error);
        res.status(500).json({ error: 'Error al obtener paciente' });
    }
});

// Crear nuevo paciente
app.post('/api/patients', async (req, res) => {
    try {
        const { dni, nombres, apellidos, fecha_nacimiento, telefono, email, direccion, seguro, observaciones } = req.body;

        if (!dni || !nombres || !apellidos || !fecha_nacimiento || !telefono || !direccion || !seguro) {
            return res.status(400).json({ error: 'Campos requeridos faltantes' });
        }

        // Verificar si el DNI ya existe
        const existing = await getOne('SELECT id FROM patients WHERE dni = ?', [dni]);
        
        if (existing) {
            return res.status(400).json({ error: 'Ya existe un paciente con este DNI' });
        }

        const id = generateId();
        const fecha_registro = new Date().toISOString().split('T')[0];

        await runQuery(
            'INSERT INTO patients (id, dni, nombres, apellidos, fecha_nacimiento, telefono, email, direccion, seguro, observaciones, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id, dni, nombres, apellidos, fecha_nacimiento, telefono, email || '', direccion, seguro, observaciones || '', fecha_registro]
        );

        res.status(201).json({
            success: true,
            message: 'Paciente creado exitosamente',
            id: id
        });
    } catch (error) {
        console.error('Error al crear paciente:', error);
        res.status(500).json({ error: 'Error al crear paciente' });
    }
});

// Actualizar paciente
app.put('/api/patients/:id', async (req, res) => {
    try {
        const patientId = req.params.id;
        const updates = req.body;

        const patient = await getOne('SELECT id FROM patients WHERE id = ?', [patientId]);
        
        if (!patient) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }

        const fields = [];
        const params = [];

        for (const [key, value] of Object.entries(updates)) {
            if (key !== 'id' && key !== 'historialMedico') {
                fields.push(`${key} = ?`);
                params.push(value);
            }
        }

        fields.push('updated_at = CURRENT_TIMESTAMP');
        params.push(patientId);

        await runQuery(
            `UPDATE patients SET ${fields.join(', ')} WHERE id = ?`,
            params
        );

        res.json({
            success: true,
            message: 'Paciente actualizado exitosamente'
        });
    } catch (error) {
        console.error('Error al actualizar paciente:', error);
        res.status(500).json({ error: 'Error al actualizar paciente' });
    }
});

// Eliminar paciente
app.delete('/api/patients/:id', async (req, res) => {
    try {
        const patientId = req.params.id;

        const patient = await getOne('SELECT id FROM patients WHERE id = ?', [patientId]);
        
        if (!patient) {
            return res.status(404).json({ error: 'Paciente no encontrado' });
        }

        await runQuery('DELETE FROM patients WHERE id = ?', [patientId]);

        res.json({
            success: true,
            message: 'Paciente eliminado exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar paciente:', error);
        res.status(500).json({ error: 'Error al eliminar paciente' });
    }
});

// ============================================
// RUTAS DE CITAS
// ============================================

// Obtener todas las citas
app.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await getAll('SELECT * FROM appointments ORDER BY fecha DESC, hora DESC');
        res.json(appointments);
    } catch (error) {
        console.error('Error al obtener citas:', error);
        res.status(500).json({ error: 'Error al obtener citas' });
    }
});

// Crear nueva cita
app.post('/api/appointments', async (req, res) => {
    try {
        const { paciente_id, fecha, hora, medico, tipo, duracion, observaciones } = req.body;

        if (!paciente_id || !fecha || !hora || !medico || !tipo) {
            return res.status(400).json({ error: 'Campos requeridos faltantes' });
        }

        // Verificar conflicto de horario
        const conflict = await getOne(
            'SELECT id FROM appointments WHERE fecha = ? AND hora = ? AND medico = ? AND estado != ?',
            [fecha, hora, medico, 'cancelada']
        );

        if (conflict) {
            return res.status(400).json({ error: 'Ya existe una cita en ese horario para ese médico' });
        }

        const id = generateId();

        await runQuery(
            'INSERT INTO appointments (id, paciente_id, fecha, hora, medico, tipo, duracion, observaciones, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id, paciente_id, fecha, hora, medico, tipo, duracion || '60', observaciones || '', 'programada']
        );

        res.status(201).json({
            success: true,
            message: 'Cita creada exitosamente',
            id: id
        });
    } catch (error) {
        console.error('Error al crear cita:', error);
        res.status(500).json({ error: 'Error al crear cita' });
    }
});

// Actualizar cita
app.put('/api/appointments/:id', async (req, res) => {
    try {
        const appointmentId = req.params.id;
        const updates = req.body;

        const appointment = await getOne('SELECT id FROM appointments WHERE id = ?', [appointmentId]);
        
        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }

        const fields = [];
        const params = [];

        for (const [key, value] of Object.entries(updates)) {
            if (key !== 'id') {
                fields.push(`${key} = ?`);
                params.push(value);
            }
        }

        fields.push('updated_at = CURRENT_TIMESTAMP');
        params.push(appointmentId);

        await runQuery(
            `UPDATE appointments SET ${fields.join(', ')} WHERE id = ?`,
            params
        );

        res.json({
            success: true,
            message: 'Cita actualizada exitosamente'
        });
    } catch (error) {
        console.error('Error al actualizar cita:', error);
        res.status(500).json({ error: 'Error al actualizar cita' });
    }
});

// Eliminar cita
app.delete('/api/appointments/:id', async (req, res) => {
    try {
        const appointmentId = req.params.id;

        const appointment = await getOne('SELECT id FROM appointments WHERE id = ?', [appointmentId]);
        
        if (!appointment) {
            return res.status(404).json({ error: 'Cita no encontrada' });
        }

        await runQuery('DELETE FROM appointments WHERE id = ?', [appointmentId]);

        res.json({
            success: true,
            message: 'Cita eliminada exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar cita:', error);
        res.status(500).json({ error: 'Error al eliminar cita' });
    }
});

// ============================================
// RUTAS DE FACTURAS
// ============================================

// Obtener todas las facturas
app.get('/api/invoices', async (req, res) => {
    try {
        const invoices = await getAll('SELECT * FROM invoices ORDER BY fecha DESC');
        
        // Obtener servicios para cada factura
        for (let invoice of invoices) {
            const services = await getAll('SELECT * FROM invoice_services WHERE factura_id = ?', [invoice.id]);
            invoice.servicios = services;
        }

        res.json(invoices);
    } catch (error) {
        console.error('Error al obtener facturas:', error);
        res.status(500).json({ error: 'Error al obtener facturas' });
    }
});

// Crear nueva factura
app.post('/api/invoices', async (req, res) => {
    try {
        const { paciente_id, cita_id, fecha, servicios, subtotal, igv, total, estado, metodo_pago } = req.body;

        if (!paciente_id || !fecha || !servicios || !subtotal || !igv || !total) {
            return res.status(400).json({ error: 'Campos requeridos faltantes' });
        }

        const id = generateId();

        await runQuery(
            'INSERT INTO invoices (id, paciente_id, cita_id, fecha, subtotal, igv, total, estado, metodo_pago) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [id, paciente_id, cita_id || null, fecha, subtotal, igv, total, estado || 'pendiente', metodo_pago || '']
        );

        // Insertar servicios
        for (const servicio of servicios) {
            const servicioId = generateId();
            await runQuery(
                'INSERT INTO invoice_services (id, factura_id, descripcion, cantidad, precio) VALUES (?, ?, ?, ?, ?)',
                [servicioId, id, servicio.descripcion, servicio.cantidad, servicio.precio]
            );
        }

        res.status(201).json({
            success: true,
            message: 'Factura creada exitosamente',
            id: id
        });
    } catch (error) {
        console.error('Error al crear factura:', error);
        res.status(500).json({ error: 'Error al crear factura' });
    }
});

// ============================================
// RUTAS DE MENSAJES
// ============================================

// Obtener todos los mensajes
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await getAll('SELECT * FROM messages ORDER BY fecha DESC');
        res.json(messages);
    } catch (error) {
        console.error('Error al obtener mensajes:', error);
        res.status(500).json({ error: 'Error al obtener mensajes' });
    }
});

// Crear nuevo mensaje
app.post('/api/messages', async (req, res) => {
    try {
        const { nombre, email, telefono, mensaje } = req.body;

        if (!nombre || !email || !mensaje) {
            return res.status(400).json({ error: 'Campos requeridos faltantes' });
        }

        const id = generateId();
        const fecha = new Date().toISOString();

        await runQuery(
            'INSERT INTO messages (id, nombre, email, telefono, mensaje, fecha) VALUES (?, ?, ?, ?, ?, ?)',
            [id, nombre, email, telefono || '', mensaje, fecha]
        );

        res.status(201).json({
            success: true,
            message: 'Mensaje enviado exitosamente',
            id: id
        });
    } catch (error) {
        console.error('Error al crear mensaje:', error);
        res.status(500).json({ error: 'Error al crear mensaje' });
    }
});

// ============================================
// RUTAS DE ACTIVIDADES
// ============================================

// Obtener actividades recientes
app.get('/api/activities', async (req, res) => {
    try {
        const limit = req.query.limit || 50;
        const activities = await getAll('SELECT * FROM activities ORDER BY timestamp DESC LIMIT ?', [limit]);
        res.json(activities);
    } catch (error) {
        console.error('Error al obtener actividades:', error);
        res.status(500).json({ error: 'Error al obtener actividades' });
    }
});

// Registrar actividad
app.post('/api/activities', async (req, res) => {
    try {
        const { type, description, user, data } = req.body;

        if (!type || !description || !user) {
            return res.status(400).json({ error: 'Campos requeridos faltantes' });
        }

        const id = generateId();
        const timestamp = new Date().toISOString();

        await runQuery(
            'INSERT INTO activities (id, type, description, user, data, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
            [id, type, description, user, JSON.stringify(data || {}), timestamp]
        );

        res.status(201).json({
            success: true,
            message: 'Actividad registrada',
            id: id
        });
    } catch (error) {
        console.error('Error al registrar actividad:', error);
        res.status(500).json({ error: 'Error al registrar actividad' });
    }
});

// ============================================
// RUTA RAÍZ Y MANEJO DE ERRORES
// ============================================

// Ruta raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor sólo si se ejecuta directamente (no al requerir en tests)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`\n🚀 Servidor iniciado en http://localhost:${PORT}`);
        console.log(`📊 Base de datos: MySQL`);
        console.log(`🔧 Modo: ${process.env.NODE_ENV || 'development'}`);
        console.log(`\n✅ Sistema Centro Oftalmológico El Otorongo listo\n`);
    });
}

// Manejo de cierre graceful
process.on('SIGINT', async () => {
    console.log('\n⚠️  Cerrando servidor...');
    try {
        const { closeDatabase } = require('./database');
        await closeDatabase();
        console.log('✅ Base de datos cerrada');
        process.exit(0);
    } catch (error) {
        console.error('Error al cerrar base de datos:', error);
        process.exit(1);
    }
});

module.exports = app;
