# 🏥 Sistema Centro Oftalmológico El Otorongo

## Sistema de Gestión Médica Integral con Base de Datos SQLite

[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green)](https://nodejs.org/)
[![SQLite](https://img.shields.io/badge/SQLite-3-blue)](https://www.sqlite.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen)](tests/)

---

## 📖 Descripción

Sistema de información integral desarrollado para optimizar la atención al paciente en el Centro Oftalmológico El Otorongo. Incluye gestión completa de pacientes, citas médicas, facturación, usuarios y reportes, con una base de datos SQLite robusta y tests automatizados.

### 🆕 Nuevas Características

- ✅ **Base de Datos SQLite** - Almacenamiento persistente y confiable
- ✅ **API REST** - Backend con Express.js
- ✅ **Gestión de Usuarios** - Módulo completo para administrar usuarios del sistema
- ✅ **Tests Automatizados** - Suite completa de pruebas con Jest
- ✅ **Seguridad Mejorada** - Encriptación de contraseñas con bcrypt
- ✅ **Documentación Completa** - Guías de instalación y uso

---

## 🎯 Características Principales

### 👥 Gestión de Usuarios (NUEVO)
- Crear, editar y eliminar usuarios
- Asignación de roles (Administrador, Médico, Recepcionista)
- Cambio de contraseñas
- Activación/desactivación de cuentas
- Filtros y búsqueda avanzada

### 🏥 Gestión de Pacientes
- Registro completo de pacientes
- Historial médico detallado
- Búsqueda y filtrado avanzado
- Gestión de seguros médicos

### 📅 Gestión de Citas
- Programación de citas médicas
- Calendario interactivo
- Notificaciones y recordatorios
- Control de estados (programada, completada, cancelada)

### 💰 Facturación
- Generación de facturas
- Control de pagos
- Reportes financieros
- Integración con citas médicas

### 📊 Reportes y Estadísticas
- Dashboard con métricas en tiempo real
- Reportes personalizados
- Exportación de datos
- Análisis de actividad

### 🔐 Seguridad
- Autenticación de usuarios
- Control de acceso por roles
- Encriptación de contraseñas
- Sesiones seguras

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **SQLite3** - Base de datos
- **bcryptjs** - Encriptación de contraseñas
- **CORS** - Manejo de peticiones cross-origin

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos y diseño responsivo
- **JavaScript (ES6+)** - Lógica del cliente
- **Font Awesome** - Iconografía

### Testing
- **Jest** - Framework de testing
- **Supertest** - Testing de APIs

---

## 📦 Instalación Rápida

```bash
# 1. Clonar o descargar el proyecto
cd sistema-otorongo-main

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
npm start

# 4. Abrir en el navegador
# http://localhost:5000
```

Para instrucciones detalladas, consulta [GUIA_INSTALACION.md](GUIA_INSTALACION.md)

---

## 🚀 Uso del Sistema

### Iniciar el Servidor

```bash
# Modo desarrollo (con recarga automática)
npm run dev

# Modo producción
npm start

# Solo frontend
npm run client
```

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Ver cobertura
npm test -- --coverage
```

### Usuarios de Prueba

| Rol | Usuario | Contraseña | Permisos |
|-----|---------|------------|----------|
| Administrador | `admin` | `admin123` | Acceso completo |
| Médico | `medico` | `medico123` | Pacientes y citas |
| Recepcionista | `recepcion` | `recep123` | Citas y facturación |

---

## 📁 Estructura del Proyecto

```
sistema-otorongo-main/
├── 📄 server.js                 # Servidor Express
├── 📄 database.js               # Configuración SQLite
├── 📄 storage-manager.js        # Gestor de almacenamiento
├── 📄 script.js                 # Lógica principal
├── 🌐 index.html                # Página principal
├── 🌐 login.html                # Login
├── 🌐 dashboard.html            # Dashboard
├── 🌐 pacientes.html            # Gestión pacientes
├── 🌐 citas.html                # Gestión citas
├── 🌐 facturacion.html          # Facturación
├── 🌐 reportes.html             # Reportes
├── 🌐 usuarios.html             # Gestión usuarios (NUEVO)
├── 🎨 styles.css                # Estilos principales
├── 🎨 dashboard-modals.css      # Estilos modales
├── 🧪 tests/                    # Tests automatizados
│   └── system.test.js
├── 💾 otorongo.db               # Base de datos SQLite
├── 📋 package.json              # Configuración npm
├── ⚙️ jest.config.js            # Configuración Jest
├── 📖 README.md                 # Este archivo
├── 📖 GUIA_INSTALACION.md       # Guía de instalación
└── 📖 TODO_IMPLEMENTACION.md    # Progreso del proyecto
```

---

## 🧪 Tests

El sistema incluye una suite completa de tests automatizados:

### Cobertura de Tests

- ✅ Autenticación de usuarios
- ✅ CRUD de usuarios
- ✅ CRUD de pacientes
- ✅ CRUD de citas
- ✅ Gestión de facturas
- ✅ Registro de mensajes
- ✅ Registro de actividades
- ✅ Manejo de errores

### Ejecutar Tests

```bash
npm test
```

### Resultados Esperados

```
PASS  tests/system.test.js
  Sistema Centro Oftalmológico El Otorongo - Tests Completos
    Autenticación
      ✓ Login exitoso con credenciales válidas
      ✓ Login fallido con credenciales inválidas
      ✓ Login fallido sin credenciales
    Gestión de Usuarios
      ✓ Obtener lista de usuarios
      ✓ Crear nuevo usuario
      ✓ No permitir crear usuario con username duplicado
      ✓ Obtener usuario por ID
      ✓ Actualizar usuario
      ✓ Desactivar usuario
    ... y más tests

Test Suites: 1 passed, 1 total
Tests:       25+ passed, 25+ total
```

---

## 📊 Base de Datos

### Esquema de la Base de Datos

El sistema utiliza SQLite con las siguientes tablas:

- **users** - Usuarios del sistema
- **patients** - Pacientes registrados
- **appointments** - Citas médicas
- **medical_history** - Historial médico
- **invoices** - Facturas
- **invoice_services** - Servicios de facturas
- **messages** - Mensajes de contacto
- **activities** - Registro de actividades

### Respaldo de Datos

```bash
# Exportar datos
# Usar la función de exportación en el dashboard

# Respaldo manual de la base de datos
cp otorongo.db otorongo_backup.db
```

---

## 🔌 API REST

El sistema expone una API REST completa:

### Endpoints Principales

#### Autenticación
```
POST /api/auth/login
```

#### Usuarios
```
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
PUT    /api/users/:id/password
```

#### Pacientes
```
GET    /api/patients
GET    /api/patients/:id
POST   /api/patients
PUT    /api/patients/:id
DELETE /api/patients/:id
```

#### Citas
```
GET    /api/appointments
POST   /api/appointments
PUT    /api/appointments/:id
DELETE /api/appointments/:id
```

#### Facturas
```
GET    /api/invoices
POST   /api/invoices
```

#### Mensajes
```
GET    /api/messages
POST   /api/messages
```

#### Actividades
```
GET    /api/activities
POST   /api/activities
```

---

## 👨‍💻 Equipo de Desarrollo

### Grupo 9 - APF1 Integrador

- **Brayan Mamani Eusebio**
- **Jeremy Yosmar Alvarez Luque**

### Institución
Carrera de Ingeniería de Sistemas e Informática

### Profesor
Jose Manuel Bruno Sarmiento

### Año
2025

---

## 📹 Video Demostración

[Ver video en YouTube](https://youtu.be/L6rDaF81g3Y)

---

## 📝 Documentación Adicional

- [Guía de Instalación](GUIA_INSTALACION.md)
- [Instrucciones de Tests](TEST_INSTRUCTIONS.md)
- [Reporte de Validación](VALIDATION_REPORT.md)
- [Documentación Técnica](DOCUMENTACION_TECNICA.md)
- [Progreso del Proyecto](TODO_IMPLEMENTACION.md)

---

## 🐛 Reporte de Bugs

Si encuentras algún bug o problema:

1. Verifica que estés usando la última versión
2. Revisa la documentación
3. Ejecuta los tests para verificar el sistema
4. Reporta el issue con detalles específicos

---

## 🤝 Contribuciones

Este es un proyecto académico. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🙏 Agradecimientos

- Font Awesome por los iconos
- Comunidad de Node.js y Express
- SQLite por la base de datos
- Jest por el framework de testing

---

## 📞 Contacto

Para consultas sobre el proyecto:

- **Email:** admin@otorongo.com
- **GitHub:** [github.com/grupo9/sistema-otorongo](https://github.com/grupo9/sistema-otorongo)

---

## 🔄 Actualizaciones Recientes

### Versión 2.0.0 (Enero 2025)

- ✅ Migración a base de datos SQLite
- ✅ Implementación de API REST
- ✅ Módulo de gestión de usuarios
- ✅ Suite completa de tests automatizados
- ✅ Mejoras de seguridad
- ✅ Documentación completa

### Versión 1.0.0 (Diciembre 2024)

- ✅ Sistema base con localStorage
- ✅ Gestión de pacientes y citas
- ✅ Facturación básica
- ✅ Dashboard interactivo

---

**⭐ Si te gusta este proyecto, dale una estrella en GitHub!**

---

© 2025 Centro Oftalmológico El Otorongo - Todos los derechos reservados

## 📋 Descripción del Proyecto

Sistema de información integral para la optimización de la atención al paciente en el Centro Oftalmológico El Otorongo, desarrollado como proyecto integrador APF1 según los requerimientos del sílabo académico.

## 🎯 Objetivos Cumplidos

### Objetivo General
✅ **Desarrollar e implementar un sistema de información integral** que optimice la atención al paciente en El Otorongo, mejorando la gestión de citas, el registro de pacientes, la facturación y el seguimiento médico.

### Objetivos Específicos
- ✅ **Automatizar la gestión de citas** - Sistema completo con calendario interactivo y prevención de solapamientos
- ✅ **Centralizar el registro de pacientes** - Base de datos digital con historial médico completo
- ✅ **Optimizar el proceso de facturación** - Sistema automatizado con cálculo de IGV y múltiples métodos de pago
- ✅ **Generar reportes automáticos** - Dashboard con métricas en tiempo real para toma de decisiones
- ✅ **Mejorar la comunicación** - Sistema integrado entre personal administrativo y médico

## 🏥 Información de la Organización

**Centro Oftalmológico El Otorongo**
- **Ubicación:** Faucett 326, Callao, Lima, Perú
- **Especialidad:** Atención oftalmológica integral
- **Servicios:** Consultas, cirugías de cataratas y pterigión, exámenes especializados

### Misión
Brindar atención oftalmológica integral y de alta calidad, con un enfoque profesional y empático, utilizando tecnología avanzada y personal médico especializado.

### Visión
Ser una clínica oftalmológica líder a nivel regional, reconocida por su excelencia en diagnóstico, tratamiento y cirugía en cataratas y pterigión.

## 🚀 Características del Sistema

### Módulos Implementados
1. **🏠 Página Principal** - Presentación del centro y servicios
2. **🔐 Sistema de Login** - Autenticación por roles con seguridad
3. **📊 Dashboard** - Panel de control personalizado por rol
4. **📅 Gestión de Citas** - Calendario interactivo con prevención de conflictos
5. **👥 Gestión de Pacientes** - Registro completo con historial médico
6. **💰 Sistema de Facturación** - Facturación automatizada con cálculo de impuestos

### Roles de Usuario
- **👨‍💼 Administrador** - Acceso completo a todos los módulos
- **👨‍⚕️ Médico** - Gestión de sus pacientes y citas
- **👩‍💻 Recepcionista** - Gestión de citas, pacientes y facturación

## 🔧 Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Estilos:** CSS Grid, Flexbox, Variables CSS
- **Iconos:** Font Awesome 6.0
- **Almacenamiento:** LocalStorage para persistencia de datos
- **Diseño:** Responsive Design para dispositivos móviles

## 📱 Características Técnicas

### ✅ Funcionalidades Implementadas
- Sistema de autenticación por roles
- Dashboard personalizado según el rol del usuario
- Gestión completa de citas con calendario visual
- Registro y edición de pacientes con validaciones
- Sistema de facturación con cálculo automático de IGV
- Búsqueda y filtrado en tiempo real
- Notificaciones del sistema
- Prevención de solapamiento de citas
- Diseño responsivo para móviles y tablets
- Validaciones de formularios en tiempo real
- Exportación de datos a CSV

### 🔒 Seguridad
- Autenticación requerida para acceso al sistema
- Control de acceso basado en roles
- Validación de sesiones
- Protección contra acceso no autorizado

## 🚀 Cómo Usar el Sistema

### 1. Acceso al Sistema
1. Abra `index.html` en su navegador web
2. Haga clic en "Acceder al Sistema"
3. Use las credenciales de prueba:

#### Credenciales de Prueba
- **Administrador:** `admin` / `admin123`
- **Médico:** `medico` / `medico123`
- **Recepcionista:** `recepcion` / `recep123`

### 2. Navegación del Sistema
- **Dashboard:** Vista general con estadísticas y actividad reciente
- **Pacientes:** Registro, búsqueda y gestión de pacientes
- **Citas:** Programación con calendario interactivo
- **Facturación:** Generación y gestión de facturas

### 3. Funcionalidades Principales

#### Gestión de Pacientes
- Registro de nuevos pacientes con datos completos
- Búsqueda por nombre, DNI, teléfono
- Historial médico integrado
- Validación automática de DNI

#### Gestión de Citas
- Calendario visual mensual
- Prevención automática de solapamientos
- Filtros por médico, fecha y estado
- Programación de citas futuras

#### Sistema de Facturación
- Generación automática de facturas
- Cálculo automático de IGV (18%)
- Múltiples métodos de pago
- Impresión de facturas

## 📊 Datos de Ejemplo

El sistema incluye datos de ejemplo para demostración:
- 2 pacientes registrados
- 2 citas programadas
- 1 factura de ejemplo
- 3 usuarios del sistema (admin, médico, recepcionista)

## 🔧 Instalación y Configuración

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- No requiere servidor web (funciona con archivos locales)

### Instalación
1. Descargue todos los archivos del sistema
2. Mantenga la estructura de carpetas
3. Abra `index.html` en su navegador

### Estructura de Archivos
```
sistema-otorongo/
├── index.html          # Página principal
├── login.html          # Sistema de login
├── dashboard.html      # Dashboard principal
├── citas.html          # Gestión de citas
├── pacientes.html      # Gestión de pacientes
├── facturacion.html    # Sistema de facturación
├── styles.css          # Estilos del sistema
├── script.js           # Funcionalidades JavaScript
├── TODO.md             # Progreso del proyecto
└── README.md           # Este archivo
```

## 🎓 Cumplimiento del Sílabo APF1

### Requerimientos Técnicos Cumplidos
- ✅ **Modelado del Negocio** - Actores y procesos identificados
- ✅ **Recopilación de Requerimientos** - Basado en entrevistas, cuestionarios y observación
- ✅ **Automatización de Procesos** - Gestión de citas, registros y facturación
- ✅ **Centralización de Información** - Base de datos unificada
- ✅ **Reportes en Tiempo Real** - Dashboard con métricas actualizadas

### Problemas Resueltos
- ❌ **Gestión manual de citas** → ✅ **Sistema automatizado con calendario**
- ❌ **Registros dispersos** → ✅ **Base de datos centralizada**
- ❌ **Facturación manual con errores** → ✅ **Sistema automatizado con validaciones**
- ❌ **Falta de reportes** → ✅ **Dashboard con métricas en tiempo real**
- ❌ **Comunicación limitada** → ✅ **Sistema integrado por roles**

## 🔄 Flujos de Trabajo Implementados

### Flujo de Atención al Paciente
1. **Registro del Paciente** (Recepcionista)
2. **Programación de Cita** (Recepcionista/Paciente)
3. **Atención Médica** (Médico)
4. **Facturación** (Recepcionista)
5. **Seguimiento** (Sistema automático)

### Flujo de Gestión Administrativa
1. **Login por Roles** → **Dashboard Personalizado**
2. **Gestión de Datos** → **Reportes Automáticos**
3. **Toma de Decisiones** → **Métricas en Tiempo Real**

## 📈 Beneficios Implementados

### Para el Centro Oftalmológico
- ⚡ **Reducción de tiempos de espera**
- 📋 **Eliminación de errores manuales**
- 💰 **Optimización de la facturación**
- 📊 **Toma de decisiones informada**
- 🔄 **Procesos automatizados**

### Para los Pacientes
- 🕐 **Menor tiempo de espera**
- 📱 **Acceso fácil para agendar citas**
- 🏥 **Atención más personalizada**
- 💳 **Facturación transparente**

### Para el Personal
- 💻 **Interfaz intuitiva y fácil de usar**
- 📊 **Información centralizada**
- ⚡ **Procesos más eficientes**
- 📱 **Acceso desde dispositivos móviles**

## 🎯 Estado del Proyecto

**✅ PROYECTO COMPLETADO AL 90%**

El sistema cumple con todos los objetivos establecidos en el sílabo APF1 y está listo para su implementación en el Centro Oftalmológico El Otorongo.

### Próximos Pasos Recomendados
1. Capacitación del personal en el uso del sistema
2. Migración de datos existentes
3. Implementación gradual por módulos
4. Monitoreo y ajustes según feedback del usuario

