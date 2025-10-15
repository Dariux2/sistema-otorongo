# Sistema Centro Oftalmológico El Otorongo

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

---

**Desarrollado por:** Grupo 9 - APF1 Integrador  
**Institución:** Carrera de Ingeniería de Sistemas e Informática  
**Docente:** Jose Manuel Bruno Sarmiento  
**Año:** 2025
