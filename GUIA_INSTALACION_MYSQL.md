# Guía de Instalación y Configuración - MySQL
## Sistema Centro Oftalmológico El Otorongo

---

## 📋 Requisitos Previos

- **Node.js** versión 14.0.0 o superior
- **npm** (incluido con Node.js)
- **MySQL Server** versión 5.7 o superior (o MariaDB 10.2+)
- Navegador web moderno (Chrome, Firefox, Edge, Safari)

---

## 🗄️ Instalación de MySQL

### Windows

1. **Descargar MySQL:**
   - Visita: https://dev.mysql.com/downloads/installer/
   - Descarga el instalador MySQL Installer for Windows
   - Ejecuta el instalador y sigue las instrucciones

2. **Durante la instalación:**
   - Selecciona "Developer Default" o "Server only"
   - Configura una contraseña para el usuario root (¡recuérdala!)
   - Deja el puerto por defecto: 3306
   - Configura MySQL como servicio de Windows

3. **Verificar instalación:**
   ```cmd
   mysql --version
   ```

### Linux (Ubuntu/Debian)

```bash
# Actualizar repositorios
sudo apt update

# Instalar MySQL Server
sudo apt install mysql-server

# Iniciar servicio
sudo systemctl start mysql
sudo systemctl enable mysql

# Configurar seguridad
sudo mysql_secure_installation
```

### macOS

```bash
# Usando Homebrew
brew install mysql

# Iniciar servicio
brew services start mysql

# Configurar seguridad
mysql_secure_installation
```

---

## 🚀 Configuración del Proyecto

### 1. Clonar o Descargar el Proyecto

```bash
cd sistema-otorongo-main
```

### 2. Instalar Dependencias de Node.js

```bash
npm install
```

Este comando instalará:
- Express (servidor web)
- mysql2 (driver MySQL con soporte para promesas)
- bcryptjs (encriptación de contraseñas)
- CORS (manejo de peticiones cross-origin)
- dotenv (variables de entorno)
- Y otras dependencias...

### 3. Configurar Variables de Entorno

Edita el archivo `.env` en la raíz del proyecto:

```env
# Configuración del Servidor
PORT=5000
NODE_ENV=development

# Configuración de MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=otorongo_db

# Configuración de Seguridad
JWT_SECRET=otorongo_secret_key_2025
BCRYPT_ROUNDS=10
```

**⚠️ IMPORTANTE:** Reemplaza `tu_contraseña_mysql` con la contraseña que configuraste para MySQL.

### 4. Crear la Base de Datos

#### Opción A: Usando MySQL Workbench (GUI)

1. Abre MySQL Workbench
2. Conecta a tu servidor MySQL local
3. Abre el archivo `database-mysql.sql`
4. Ejecuta el script completo (⚡ Execute)

#### Opción B: Usando línea de comandos

```bash
# Conectar a MySQL
mysql -u root -p

# Ejecutar el script SQL
source database-mysql.sql

# O en una sola línea:
mysql -u root -p < database-mysql.sql
```

#### Opción C: Comando directo (Windows)

```cmd
mysql -u root -p otorongo_db < database-mysql.sql
```

### 5. Verificar la Base de Datos

```sql
-- Conectar a MySQL
mysql -u root -p

-- Usar la base de datos
USE otorongo_db;

-- Verificar tablas
SHOW TABLES;

-- Verificar usuarios de ejemplo
SELECT username, role, name FROM users;

-- Salir
EXIT;
```

Deberías ver 8 tablas y 3 usuarios de ejemplo.

---

## 🎯 Ejecución del Sistema

### Modo Desarrollo (Recomendado)

```bash
npm run dev
```

El servidor se iniciará en: **http://localhost:5000**

Verás un mensaje como:
```
✅ Pool de conexiones MySQL creado
✅ Conectado a la base de datos MySQL
✅ Esquema de base de datos verificado

🚀 Servidor iniciado en http://localhost:5000
📊 Base de datos: MySQL
🔧 Modo: development

✅ Sistema Centro Oftalmológico El Otorongo listo
```

### Modo Producción

```bash
npm start
```

---

## 👥 Usuarios de Prueba

El sistema viene con usuarios predefinidos:

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

## 🔧 Solución de Problemas

### Error: "Cannot connect to MySQL"

**Solución:**
1. Verifica que MySQL esté corriendo:
   ```bash
   # Windows
   net start MySQL80
   
   # Linux/Mac
   sudo systemctl status mysql
   ```

2. Verifica las credenciales en `.env`
3. Verifica que el puerto 3306 esté disponible

### Error: "Access denied for user 'root'@'localhost'"

**Solución:**
1. Verifica la contraseña en `.env`
2. Resetea la contraseña de MySQL si es necesario:
   ```bash
   mysql -u root -p
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'nueva_contraseña';
   FLUSH PRIVILEGES;
   ```

### Error: "Unknown database 'otorongo_db'"

**Solución:**
Ejecuta el script SQL para crear la base de datos:
```bash
mysql -u root -p < database-mysql.sql
```

### Error: "Port 5000 already in use"

**Solución:**
Cambia el puerto en `.env`:
```env
PORT=5001
```

### Error: "Cannot find module 'mysql2'"

**Solución:**
```bash
npm install
```

---

## 📊 Gestión de la Base de Datos

### Respaldo de la Base de Datos

```bash
# Respaldo completo
mysqldump -u root -p otorongo_db > backup_otorongo_$(date +%Y%m%d).sql

# Respaldo solo estructura
mysqldump -u root -p --no-data otorongo_db > estructura_otorongo.sql

# Respaldo solo datos
mysqldump -u root -p --no-create-info otorongo_db > datos_otorongo.sql
```

### Restaurar Base de Datos

```bash
mysql -u root -p otorongo_db < backup_otorongo_20250115.sql
```

### Resetear la Base de Datos

```bash
# Eliminar base de datos
mysql -u root -p -e "DROP DATABASE IF EXISTS otorongo_db;"

# Recrear desde el script
mysql -u root -p < database-mysql.sql
```

### Monitorear Conexiones

```sql
-- Ver conexiones activas
SHOW PROCESSLIST;

-- Ver estado del servidor
SHOW STATUS;

-- Ver variables de configuración
SHOW VARIABLES LIKE 'max_connections';
```

---

## 🌐 Acceso al Sistema

1. Asegúrate de que MySQL esté corriendo
2. Inicia el servidor: `npm run dev`
3. Abre tu navegador en: **http://localhost:5000**
4. Inicia sesión con las credenciales de prueba
5. Explora las funcionalidades del sistema

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
- ✅ Generar reportes de consultas

### Para Recepcionistas
- ✅ Registrar nuevos pacientes
- ✅ Agendar citas
- ✅ Gestionar facturación
- ✅ Atender consultas

---

## 🔒 Seguridad

### Recomendaciones para Producción

1. **Cambiar contraseñas predeterminadas:**
   - Usuarios del sistema
   - Usuario root de MySQL

2. **Configurar usuario MySQL específico:**
   ```sql
   CREATE USER 'otorongo_user'@'localhost' IDENTIFIED BY 'contraseña_segura';
   GRANT ALL PRIVILEGES ON otorongo_db.* TO 'otorongo_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. **Actualizar `.env`:**
   ```env
   DB_USER=otorongo_user
   DB_PASSWORD=contraseña_segura
   ```

4. **Habilitar SSL para MySQL** (producción)

5. **Configurar firewall** para proteger el puerto 3306

---

## 🧪 Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Tests en modo watch
npm run test:watch
```

**Nota:** Los tests pueden requerir ajustes para MySQL.

---

## 📈 Optimización de Rendimiento

### Configuración de MySQL

Edita `my.cnf` o `my.ini`:

```ini
[mysqld]
max_connections = 200
innodb_buffer_pool_size = 256M
query_cache_size = 64M
query_cache_type = 1
```

### Índices de Base de Datos

El script SQL ya incluye índices optimizados para:
- Búsquedas por DNI
- Búsquedas por fecha
- Relaciones entre tablas

---

## 📝 Notas Importantes

- **Seguridad:** Cambia todas las contraseñas en producción
- **Respaldos:** Programa respaldos automáticos diarios
- **Actualizaciones:** Mantén MySQL y Node.js actualizados
- **Monitoreo:** Revisa logs regularmente
- **Escalabilidad:** MySQL soporta miles de usuarios concurrentes

---

## ✅ Verificación de Instalación

Checklist completo:

- [ ] MySQL Server instalado y corriendo
- [ ] Base de datos `otorongo_db` creada
- [ ] 8 tablas creadas correctamente
- [ ] 3 usuarios de ejemplo insertados
- [ ] Archivo `.env` configurado
- [ ] Dependencias de Node.js instaladas
- [ ] Servidor inicia sin errores
- [ ] Puedes acceder a http://localhost:5000
- [ ] Puedes iniciar sesión con credenciales de prueba
- [ ] Las funcionalidades básicas funcionan

---

## 🆘 Soporte y Recursos

### Documentación Oficial
- MySQL: https://dev.mysql.com/doc/
- Node.js mysql2: https://github.com/sidorares/node-mysql2

### Herramientas Recomendadas
- **MySQL Workbench:** GUI para gestión de MySQL
- **phpMyAdmin:** Interfaz web para MySQL
- **DBeaver:** Cliente universal de bases de datos

### Contacto
Si encuentras problemas, consulta:
1. Esta guía de instalación
2. El archivo `README.md`
3. Los logs del servidor y MySQL
4. Contacta al equipo de desarrollo

---

**¡Sistema listo para usar con MySQL!** 🎉

Para más información técnica, consulta `README.md` y la documentación del código.
