/**
 * Tests del Sistema Centro Oftalmológico El Otorongo
 * Pruebas de integración y funcionalidad
 */

const request = require('supertest');
const app = require('../server');
const { db, waitForDB } = require('../database');

describe('Sistema Centro Oftalmológico El Otorongo - Tests Completos', () => {
    
    // Esperar a que la base de datos esté lista antes de ejecutar los tests
    beforeAll(async () => {
        await waitForDB();
    });
    
    // ============================================
    // TESTS DE AUTENTICACIÓN
    // ============================================
    
    describe('Autenticación', () => {
        test('Login exitoso con credenciales válidas', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    username: 'admin',
                    password: 'admin123'
                });
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('user');
            expect(response.body.user).toHaveProperty('username', 'admin');
            expect(response.body.user).not.toHaveProperty('password');
        });

        test('Login fallido con credenciales inválidas', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    username: 'admin',
                    password: 'wrongpassword'
                });
            
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('error');
        });

        test('Login fallido sin credenciales', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({});
            
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });
    });

    // ============================================
    // TESTS DE USUARIOS
    // ============================================
    
    describe('Gestión de Usuarios', () => {
        let testUserId;

        test('Obtener lista de usuarios', async () => {
            const response = await request(app)
                .get('/api/users');
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBeGreaterThan(0);
        });

        test('Crear nuevo usuario', async () => {
            const newUser = {
                username: 'testuser',
                password: 'test123',
                name: 'Usuario de Prueba',
                email: 'test@test.com',
                role: 'recepcionista'
            };

            const response = await request(app)
                .post('/api/users')
                .send(newUser);
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('id');
            
            testUserId = response.body.id;
        });

        test('No permitir crear usuario con username duplicado', async () => {
            const duplicateUser = {
                username: 'admin',
                password: 'test123',
                name: 'Usuario Duplicado',
                email: 'duplicate@test.com',
                role: 'recepcionista'
            };

            const response = await request(app)
                .post('/api/users')
                .send(duplicateUser);
            
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        test('Obtener usuario por ID', async () => {
            if (!testUserId) {
                // Crear usuario si no existe
                const createResponse = await request(app)
                    .post('/api/users')
                    .send({
                        username: 'testuser2',
                        password: 'test123',
                        name: 'Usuario de Prueba 2',
                        email: 'test2@test.com',
                        role: 'recepcionista'
                    });
                testUserId = createResponse.body.id;
            }

            const response = await request(app)
                .get(`/api/users/${testUserId}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', testUserId);
        });

        test('Actualizar usuario', async () => {
            if (!testUserId) return;

            const updates = {
                name: 'Usuario Actualizado',
                role: 'medico'
            };

            const response = await request(app)
                .put(`/api/users/${testUserId}`)
                .send(updates);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
        });

        test('Desactivar usuario', async () => {
            if (!testUserId) return;

            const response = await request(app)
                .delete(`/api/users/${testUserId}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
        });
    });

    // ============================================
    // TESTS DE PACIENTES
    // ============================================
    
    describe('Gestión de Pacientes', () => {
        let testPatientId;

        test('Obtener lista de pacientes', async () => {
            const response = await request(app)
                .get('/api/patients');
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        test('Crear nuevo paciente', async () => {
            const newPatient = {
                dni: '99999999',
                nombres: 'Paciente',
                apellidos: 'De Prueba',
                fecha_nacimiento: '1990-01-01',
                telefono: '999999999',
                email: 'paciente@test.com',
                direccion: 'Calle Test 123',
                seguro: 'SIS',
                observaciones: 'Paciente de prueba'
            };

            const response = await request(app)
                .post('/api/patients')
                .send(newPatient);
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('id');
            
            testPatientId = response.body.id;
        });

        test('No permitir crear paciente con DNI duplicado', async () => {
            const duplicatePatient = {
                dni: '12345678',
                nombres: 'Paciente',
                apellidos: 'Duplicado',
                fecha_nacimiento: '1990-01-01',
                telefono: '999999999',
                direccion: 'Calle Test 123',
                seguro: 'SIS'
            };

            const response = await request(app)
                .post('/api/patients')
                .send(duplicatePatient);
            
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        test('Obtener paciente por ID', async () => {
            if (!testPatientId) return;

            const response = await request(app)
                .get(`/api/patients/${testPatientId}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id', testPatientId);
            expect(response.body).toHaveProperty('historialMedico');
        });

        test('Actualizar paciente', async () => {
            if (!testPatientId) return;

            const updates = {
                telefono: '888888888',
                email: 'updated@test.com'
            };

            const response = await request(app)
                .put(`/api/patients/${testPatientId}`)
                .send(updates);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
        });

        test('Eliminar paciente', async () => {
            if (!testPatientId) return;

            const response = await request(app)
                .delete(`/api/patients/${testPatientId}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
        });
    });

    // ============================================
    // TESTS DE CITAS
    // ============================================
    
    describe('Gestión de Citas', () => {
        let testAppointmentId;
        let testPatientId;

        beforeAll(async () => {
            // Crear paciente para las pruebas de citas
            const patientResponse = await request(app)
                .post('/api/patients')
                .send({
                    dni: '88888888',
                    nombres: 'Paciente',
                    apellidos: 'Para Citas',
                    fecha_nacimiento: '1990-01-01',
                    telefono: '999999999',
                    direccion: 'Calle Test 123',
                    seguro: 'SIS'
                });
            testPatientId = patientResponse.body.id;
        });

        test('Obtener lista de citas', async () => {
            const response = await request(app)
                .get('/api/appointments');
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        test('Crear nueva cita', async () => {
            if (!testPatientId) return;

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const fecha = tomorrow.toISOString().split('T')[0];

            const newAppointment = {
                paciente_id: testPatientId,
                fecha: fecha,
                hora: '15:00',
                medico: 'Dr. Test',
                tipo: 'Consulta General',
                duracion: '60',
                observaciones: 'Cita de prueba'
            };

            const response = await request(app)
                .post('/api/appointments')
                .send(newAppointment);
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('id');
            
            testAppointmentId = response.body.id;
        });

        test('No permitir citas duplicadas en mismo horario', async () => {
            if (!testPatientId) return;

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const fecha = tomorrow.toISOString().split('T')[0];

            const duplicateAppointment = {
                paciente_id: testPatientId,
                fecha: fecha,
                hora: '15:00',
                medico: 'Dr. Test',
                tipo: 'Consulta General'
            };

            const response = await request(app)
                .post('/api/appointments')
                .send(duplicateAppointment);
            
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        test('Actualizar cita', async () => {
            if (!testAppointmentId) return;

            const updates = {
                estado: 'completada',
                observaciones: 'Cita completada exitosamente'
            };

            const response = await request(app)
                .put(`/api/appointments/${testAppointmentId}`)
                .send(updates);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
        });

        test('Eliminar cita', async () => {
            if (!testAppointmentId) return;

            const response = await request(app)
                .delete(`/api/appointments/${testAppointmentId}`);
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('success', true);
        });
    });

    // ============================================
    // TESTS DE FACTURAS
    // ============================================
    
    describe('Gestión de Facturas', () => {
        let testInvoiceId;
        let testPatientId;

        beforeAll(async () => {
            // Crear paciente para las pruebas de facturas
            const patientResponse = await request(app)
                .post('/api/patients')
                .send({
                    dni: '77777777',
                    nombres: 'Paciente',
                    apellidos: 'Para Facturas',
                    fecha_nacimiento: '1990-01-01',
                    telefono: '999999999',
                    direccion: 'Calle Test 123',
                    seguro: 'SIS'
                });
            testPatientId = patientResponse.body.id;
        });

        test('Obtener lista de facturas', async () => {
            const response = await request(app)
                .get('/api/invoices');
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        test('Crear nueva factura', async () => {
            if (!testPatientId) return;

            const newInvoice = {
                paciente_id: testPatientId,
                fecha: new Date().toISOString().split('T')[0],
                servicios: [
                    {
                        descripcion: 'Consulta de Prueba',
                        cantidad: 1,
                        precio: 100.00
                    }
                ],
                subtotal: 100.00,
                igv: 18.00,
                total: 118.00,
                estado: 'pendiente'
            };

            const response = await request(app)
                .post('/api/invoices')
                .send(newInvoice);
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('success', true);
            expect(response.body).toHaveProperty('id');
            
            testInvoiceId = response.body.id;
        });
    });

    // ============================================
    // TESTS DE MENSAJES
    // ============================================
    
    describe('Gestión de Mensajes', () => {
        test('Obtener lista de mensajes', async () => {
            const response = await request(app)
                .get('/api/messages');
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        test('Crear nuevo mensaje', async () => {
            const newMessage = {
                nombre: 'Usuario Test',
                email: 'test@test.com',
                telefono: '999999999',
                mensaje: 'Este es un mensaje de prueba'
            };

            const response = await request(app)
                .post('/api/messages')
                .send(newMessage);
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('success', true);
        });
    });

    // ============================================
    // TESTS DE ACTIVIDADES
    // ============================================
    
    describe('Registro de Actividades', () => {
        test('Obtener actividades recientes', async () => {
            const response = await request(app)
                .get('/api/activities');
            
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

        test('Registrar nueva actividad', async () => {
            const newActivity = {
                type: 'test_activity',
                description: 'Actividad de prueba',
                user: 'Test User',
                data: { test: true }
            };

            const response = await request(app)
                .post('/api/activities')
                .send(newActivity);
            
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('success', true);
        });
    });

    // ============================================
    // TESTS DE RUTAS NO ENCONTRADAS
    // ============================================
    
    describe('Manejo de Errores', () => {
        test('Ruta no encontrada devuelve 404', async () => {
            const response = await request(app)
                .get('/api/ruta-inexistente');
            
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error');
        });
    });

    // ============================================
    // LIMPIEZA DESPUÉS DE TESTS
    // ============================================
    
    afterAll((done) => {
        // Cerrar conexión a base de datos
        db.close((err) => {
            if (err) {
                console.error('Error al cerrar base de datos:', err);
            }
            done();
        });
    });
});
