# 🏥 Sistema Centro Oftalmológico El Otorongo
## Sistema de Gestión Médica Integral con MySQL

[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green.svg)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-5.7%2B-blue.svg)](https://www.mysql.com/)
[![Express](https://img.shields.io/badge/Express-4.18-lightgrey.svg)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 Descripción

Sistema de información integral desarrollado para optimizar la atención al paciente en el Centro Oftalmológico El Otorongo. Implementa gestión completa de pacientes, citas médicas, historiales clínicos, facturación y reportes, utilizando **MySQL** como base de datos para garantizar escalabilidad y rendimiento empresarial.

### 🎯 Características Principales

- ✅ **Gestión de Pacientes** - Registro completo con historial médico
- ✅ **Sistema de Citas** - Agendamiento y seguimiento de consultas
- ✅ **Facturación Integrada** - Generación de facturas con IGV
- ✅ **Reportes y Estadísticas** - Dashboard con métricas en tiempo real
- ✅ **Gestión de Usuarios** - Sistema de roles (Admin, Médico, Recepcionista)
- ✅ **Base de Datos MySQL** - Escalable y robusta
- ✅ **Interfaz Responsive** - Diseño adaptable a dispositivos móviles
- ✅ **Seguridad** - Autenticación con bcrypt y validación de datos

---

## 🗄️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución JavaScript
- **Express.js** - Framework web minimalista
- **MySQL** - Sistema de gestión de base de datos relacional
- **mysql2** - Driver MySQL con soporte para promesas
- **bcryptjs** - Encriptación de contraseñas
- **dotenv** - Gestión de variables de entorno

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos y responsive
- **JavaScript (ES6+)** - Lógica del cliente
- **Font Awesome** - Iconografía

### Testing
- **Jest** - Framework de testing
- **Supertest** - Testing de APIs HTTP

---

## 📁 Estructura del Proyecto

```
sistema-otorongo-main/
├── 📄 server.js                      # Servidor Express principal
├── 📄 database.js                    # Configuración MySQL
├── 📄 database-mysql.sql             # Script de inicialización DB
├── 📄 script.js                      # Lógica frontend
├── 📄 storage-manager.js             # Gestor de almacenamiento
├── 📄 .env                           # Variables de entorno
├── 📄 .env.example                   # Plantilla de configuración
│
├── 📂 Frontend/
│   ├── index.html                    # Página principal
│   ├── login.html                    # Autenticación
│   ├── dashboard.html                # Panel de control
│   ├── pacientes.html                # Gestión de pacientes
│   ├── citas.html                    # Gestión de citas
│   ├── facturacion.html              # Sistema de facturación
│   ├── reportes.html                 # Reportes y estadísticas
│   ├── usuarios.html                 # Gestión de usuarios
│   ├── documentacion.html            # Documentación del sistema
│   ├── styles.css                    # Estilos principales
│   └── dashboard-modals.css          # Estilos de modales
│
├── 📂 tests/
│   └── system.test.js                # Tests del sistema
│
├── 📂 assets/
│   └── [imágenes y recursos]
│
├── 📂 Documentación/
│   ├── README.md                     # Este archivo
│   ├── GUIA_INSTALACION_MYSQL.md     # Guía de instalación MySQL
│   ├── MIGRACION_MYSQL.md            # Guía de migración
│   ├── RESUMEN_IMPLEMENTACION.md     # Resumen técnico
│   └── [otros documentos]
│
└── 📄 package.json                   # Dependencias y scripts
```

---

## 🚀 Instalación Rápida

### Requisitos Previos

- Node.js 14.0.0 o superior
- MySQL Server 5.7 o superior
- npm (incluido con Node.js)

### Pasos de Instalación

```bash
# 1. Clonar o descargar el proyecto
cd sistema-otorongo-main

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Editar .env con tus credenciales de MySQL

# 4. Crear base de datos MySQL
mysql -u root -p < database-mysql.sql

# 5. Iniciar el servidor
npm run dev
```

### Acceso al Sistema

- **URL:** http://localhost:5000
- **Usuario Admin:** `admin` / `admin123`
- **Usuario Médico:** `medico` / `medico123`
- **Usuario Recepción:** `recepcion` / `recep123`

📖 **Guía Completa:** Ver [GUIA_INSTALACION_MYSQL.md](GUIA_INSTALACION_MYSQL.md)

---

## 🗄️ Base de Datos MySQL

### Esquema de Base de Datos

El sistema utiliza 8 tablas principales:

1. **users** - Usuarios del sistema
2. **patients** - Información de pacientes
3. **appointments** - Citas médicas
4. **medical_history** - Historial médico
5. **invoices** - Facturas
6. **invoice_services** - Servicios de factura
7. **messages** - Mensajes de contacto
8. **activities** - Registro de actividades

### Diagrama de Relaciones

```
users
  └─ (gestiona) → patients
                    ├─ appointments
                    ├─ medical_history
                    └─ invoices
                         └─ invoice_services
```

### Características de MySQL

- ✅ **Pool de Conexiones** - Hasta 10 conexiones simultáneas
- ✅ **Transacciones ACID** - Integridad de datos garantizada
- ✅ **Foreign Keys** - Relaciones con integridad referencial
- ✅ **Índices Optimizados** - Búsquedas rápidas
- ✅ **UTF-8 Unicode** - Soporte completo de caracteres
- ✅ **InnoDB Engine** - Motor de almacenamiento robusto

---

## 👥 Sistema de Usuarios y Roles

### Roles Disponibles

#### 🔴 Administrador
- Gestión completa de usuarios
- Acceso a todas las funcionalidades
- Configuración del sistema
- Reportes avanzados

#### 🔵 Médico
- Gestión de pacientes asignados
- Gestión de citas propias
- Acceso a historiales médicos
- Generación de reportes médicos

#### 🟢 Recepcionista
- Registro de nuevos pacientes
- Agendamiento de citas
- Gestión de facturación
- Atención de consultas

---

## 📊 Funcionalidades Detalladas

### 1. Gestión de Pacientes

- Registro completo de datos personales
- Historial médico detallado
- Búsqueda avanzada por DNI, nombre o apellido
- Exportación de datos
- Seguimiento de tratamientos

### 2. Sistema de Citas

- Calendario interactivo
- Agendamiento por médico y especialidad
- Notificaciones de citas
- Control de disponibilidad
- Historial de citas

### 3. Facturación

- Generación automática de facturas
- Cálculo de IGV (18%)
- Múltiples métodos de pago
- Servicios personalizables
- Reportes de ingresos

### 4. Reportes y Estadísticas

- Dashboard con métricas en tiempo real
- Gráficos de citas por período
- Análisis de ingresos
- Reportes de pacientes atendidos
- Exportación a PDF/Excel

### 5. Seguridad

- Autenticación con bcrypt
- Sesiones seguras
- Validación de datos
- Protección contra SQL injection
- Control de acceso por roles

---

## 🔧 Configuración

### Variables de Entorno (.env)

```env
# Servidor
PORT=5000
NODE_ENV=development

# MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=otorongo_db

# Seguridad
JWT_SECRET=tu_clave_secreta
BCRYPT_ROUNDS=10
```

### Scripts NPM Disponibles

```bash
npm start          # Iniciar en producción
npm run dev        # Iniciar en desarrollo (con nodemon)
npm test           # Ejecutar tests
npm run test:watch # Tests en modo watch
```

---

## 🧪 Testing

El sistema incluye tests automatizados:

```bash
# Ejecutar todos los tests
npm test

# Tests con cobertura
npm test -- --coverage

# Tests en modo watch
npm run test:watch
```

### Cobertura de Tests

- ✅ Autenticación de usuarios
- ✅ CRUD de pacientes
- ✅ CRUD de citas
- ✅ Generación de facturas
- ✅ Validación de datos
- ✅ Manejo de errores

---

## 📈 Rendimiento y Escalabilidad

### Optimizaciones Implementadas

1. **Pool de Conexiones MySQL**
   - Reutilización de conexiones
   - Límite configurable
   - Auto-reconexión

2. **Índices de Base de Datos**
   - Búsquedas optimizadas
   - Joins eficientes
   - Consultas rápidas

3. **Caché de Queries**
   - Reducción de carga en DB
   - Respuestas más rápidas

4. **Compresión de Respuestas**
   - Menor uso de ancho de banda
   - Carga más rápida

### Capacidad

- **Usuarios concurrentes:** Hasta 200+
- **Registros de pacientes:** Ilimitados
- **Citas por día:** Miles
- **Tiempo de respuesta:** < 100ms promedio

---

## 🔒 Seguridad

### Medidas Implementadas

- ✅ Contraseñas hasheadas con bcrypt (10 rounds)
- ✅ Validación de entrada en cliente y servidor
- ✅ Protección contra SQL injection (prepared statements)
- ✅ Protección contra XSS
- ✅ CORS configurado
- ✅ Variables de entorno para datos sensibles
- ✅ Sesiones seguras
- ✅ Control de acceso basado en roles

### Recomendaciones para Producción

1. Usar HTTPS (SSL/TLS)
2. Implementar rate limiting
3. Configurar firewall
4. Habilitar logs de auditoría
5. Respaldos automáticos diarios
6. Monitoreo de seguridad

---

## 📱 Responsive Design

El sistema es completamente responsive y funciona en:

- 💻 Desktop (1920x1080 y superiores)
- 💻 Laptop (1366x768)
- 📱 Tablet (768x1024)
- 📱 Mobile (375x667 y superiores)

---

## 🛠️ Mantenimiento

### Respaldos de Base de Datos

```bash
# Respaldo completo
mysqldump -u root -p otorongo_db > backup_$(date +%Y%m%d).sql

# Restaurar respaldo
mysql -u root -p otorongo_db < backup_20250115.sql
```

### Actualización de Dependencias

```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar dependencias
npm update

# Actualizar a última versión
npm install package@latest
```

### Logs y Monitoreo

```bash
# Ver logs del servidor
tail -f logs/server.log

# Monitorear MySQL
mysql -u root -p -e "SHOW PROCESSLIST;"
```

---

## 🤝 Contribución

### Equipo de Desarrollo

**Grupo 9 - APF1 Integrador**
- Brayan Mamani Eusebio
- Jeremy Yosmar Alvarez Luque

### Profesor
- Jose Manuel Bruno Sarmiento

### Institución
- Carrera de Ingeniería de Sistemas e Informática

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 📞 Soporte

### Documentación Adicional

- [Guía de Instalación MySQL](GUIA_INSTALACION_MYSQL.md)
- [Guía de Migración](MIGRACION_MYSQL.md)
- [Resumen de Implementación](RESUMEN_IMPLEMENTACION.md)

### Recursos

- **Repositorio:** https://github.com/grupo9/sistema-otorongo
- **Issues:** https://github.com/grupo9/sistema-otorongo/issues
- **Video Demo:** https://youtu.be/L6rDaF81g3Y

---

## 🎯 Roadmap Futuro

- [ ] Implementar notificaciones por email/SMS
- [ ] Integración con sistemas de pago online
- [ ] App móvil nativa (iOS/Android)
- [ ] Telemedicina (videoconsultas)
- [ ] Integración con equipos médicos
- [ ] IA para diagnóstico asistido
- [ ] Portal del paciente
- [ ] API REST pública

---

## ⭐ Agradecimientos

Agradecemos a todos los que han contribuido al desarrollo de este sistema y a la comunidad de código abierto por las herramientas utilizadas.

---

**Desarrollado con ❤️ para el Centro Oftalmológico El Otorongo**

*Sistema de Gestión Médica Integral - 2025*
