# Guía de Instalación y Ejecución
## Sistema Centro Oftalmológico El Otorongo

---

## 📋 Requisitos Previos

- **Node.js** versión 14.0.0 o superior
- **npm** (incluido con Node.js)
- Navegador web moderno (Chrome, Firefox, Edge, Safari)

---

## 🚀 Instalación

### 1. Clonar o Descargar el Proyecto

```bash
# Si tienes el proyecto en un repositorio
git clone https://github.com/grupo9/sistema-otorongo.git
cd sistema-otorongo

# O simplemente navega a la carpeta del proyecto
cd sistema-otorongo-main
```

### 2. Instalar Dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias:
- Express (servidor web)
- SQLite3 (base de datos)
- bcryptjs (encriptación de contraseñas)
- CORS (manejo de peticiones cross-origin)
- Jest (framework de testing)
- Y otras dependencias...

---

## 🎯 Ejecución del Sistema

### Opción 1: Modo Desarrollo (Recomendado)

Ejecuta el servidor backend con recarga automática:

```bash
npm run dev
```

El servidor se iniciará en: **http://localhost:5000**

### Opción 2: Modo Producción

```bash
npm start
```

### Opción 3: Solo Frontend (sin backend)

Si solo quieres ver el frontend sin funcionalidad de base de datos:

```bash
npm run client
```

Esto abrirá el sistema en: **http://localhost:3000**

---

## 🧪 Ejecutar Tests

### Ejecutar todos los tests

```bash
npm test
```

### Ejecutar tests en modo watch (desarrollo)

```bash
npm run test:watch
```

### Ver cobertura de tests

Los tests generarán automáticamente un reporte de cobertura en la carpeta `coverage/`.

Para ver el reporte HTML:
```bash
# En Windows
start coverage/lcov-report/index.html

# En Mac/Linux
open coverage/lcov-report/index.html
```

---

## 👥 Usuarios de Prueba

El sistema viene con usuarios predefinidos para pruebas:

### Administrador
- **Usuario:** `admin`
- **Contraseña:** `admin123`
- **Permisos:** Acceso completo al sistema

### Médico
- **Usuario:** `medico`
- **Contraseña:** `medico123`
- **Permisos:** Gestión de pacientes y citas

### Recepcionista
- **Usuario:** `recepcion`
- **Contraseña:** `recep123`
- **Permisos:** Gestión de citas y facturación

---

## 📁 Estructura del Proyecto

```
sistema-otorongo-main/
├── server.js                 # Servidor Express
├── database.js               # Configuración SQLite
├── storage-manager.js        # Gestor de almacenamiento
├── script.js                 # Lógica principal frontend
├── index.html                # Página principal
├── login.html                # Página de login
├── dashboard.html            # Dashboard principal
├── pacientes.html            # Gestión de pacientes
├── citas.html                # Gestión de citas
├── facturacion.html          # Gestión de facturas
├── reportes.html             # Reportes del sistema
├── usuarios.html             # Gestión de usuarios (nuevo)
├── styles.css                # Estilos principales
├── dashboard-modals.css      # Estilos de modales
├── tests/                    # Carpeta de tests
│   └── system.test.js        # Tests del sistema
├── otorongo.db               # Base de datos SQLite (se crea automáticamente)
├── package.json              # Configuración del proyecto
├── jest.config.js            # Configuración de Jest
└── README.md                 # Documentación principal
```

---

## 🔧 Solución de Problemas

### Error: "Cannot find module"

```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules
npm install
```

### Error: "Port 5000 already in use"

Cambia el puerto en el archivo `.env`:
```
PORT=5001
```

### Error: "Database locked"

Cierra todas las instancias del servidor y vuelve a iniciar:
```bash
# Ctrl+C para detener el servidor
npm start
```

### Tests fallan

Asegúrate de que el servidor no esté corriendo durante los tests:
```bash
# Detén el servidor si está corriendo
# Luego ejecuta los tests
npm test
```

---

## 📊 Base de Datos

El sistema utiliza **SQLite** como base de datos. El archivo `otorongo.db` se crea automáticamente la primera vez que ejecutas el servidor.

### Ubicación de la Base de Datos

```
sistema-otorongo-main/otorongo.db
```

### Respaldo de la Base de Datos

Para hacer un respaldo manual:

```bash
# Copiar el archivo de base de datos
cp otorongo.db otorongo_backup_$(date +%Y%m%d).db
```

### Resetear la Base de Datos

Si necesitas empezar de cero:

```bash
# Eliminar la base de datos actual
rm otorongo.db

# Reiniciar el servidor (creará una nueva base de datos)
npm start
```

---

## 🌐 Acceso al Sistema

Una vez que el servidor esté corriendo:

1. Abre tu navegador
2. Navega a: **http://localhost:5000**
3. Usa las credenciales de prueba para iniciar sesión
4. Explora las diferentes funcionalidades del sistema

---

## 📱 Funcionalidades Principales

### Para Administradores
- ✅ Gestión completa de usuarios
- ✅ Gestión de pacientes
- ✅ Gestión de citas
- ✅ Facturación
- ✅ Reportes y estadísticas
- ✅ Configuración del sistema

### Para Médicos
- ✅ Ver y gestionar sus pacientes
- ✅ Ver y gestionar sus citas
- ✅ Acceso a historiales médicos
- ✅ Generar reportes de sus consultas

### Para Recepcionistas
- ✅ Registrar nuevos pacientes
- ✅ Agendar citas
- ✅ Gestionar facturación
- ✅ Atender consultas

---

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas:

1. Revisa esta guía de instalación
2. Consulta el archivo `README.md`
3. Revisa los logs del servidor en la consola
4. Contacta al equipo de desarrollo

---

## 📝 Notas Importantes

- **Seguridad:** En producción, cambia todas las contraseñas predeterminadas
- **Respaldos:** Realiza respaldos periódicos de la base de datos
- **Actualizaciones:** Mantén las dependencias actualizadas con `npm update`
- **Tests:** Ejecuta los tests antes de hacer cambios importantes

---

## ✅ Verificación de Instalación

Para verificar que todo está funcionando correctamente:

1. ✅ El servidor inicia sin errores
2. ✅ Puedes acceder a http://localhost:5000
3. ✅ Puedes iniciar sesión con las credenciales de prueba
4. ✅ Los tests pasan exitosamente (`npm test`)
5. ✅ La base de datos se crea automáticamente

---

**¡Listo! El sistema está instalado y funcionando correctamente.**

Para más información, consulta el archivo `README.md` o la documentación técnica.
