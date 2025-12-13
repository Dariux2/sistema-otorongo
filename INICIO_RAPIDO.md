# 🚀 Inicio Rápido - Sistema Otorongo con MySQL

## ⚡ Guía de 5 Minutos

Esta guía te ayudará a poner en marcha el sistema rápidamente.

---

## 📋 Paso 1: Verificar Requisitos

Abre una terminal y verifica que tienes instalado:

```bash
# Verificar Node.js (debe ser 14.0.0 o superior)
node --version

# Verificar npm
npm --version

# Verificar MySQL (debe ser 5.7 o superior)
mysql --version
```

Si falta alguno, instálalo primero:
- **Node.js:** https://nodejs.org/
- **MySQL:** https://dev.mysql.com/downloads/installer/

---

## 🗄️ Paso 2: Configurar MySQL

### Opción A: Si MySQL ya está instalado

```bash
# Verificar que MySQL esté corriendo
# Windows:
net start MySQL80

# Linux/Mac:
sudo systemctl status mysql
```

### Opción B: Si necesitas instalar MySQL

**Windows:**
1. Descarga MySQL Installer: https://dev.mysql.com/downloads/installer/
2. Ejecuta el instalador
3. Selecciona "Developer Default"
4. Configura contraseña para root (¡recuérdala!)
5. Completa la instalación

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

**macOS:**
```bash
brew install mysql
brew services start mysql
```

---

## 📦 Paso 3: Instalar Dependencias del Proyecto

```bash
# Navega a la carpeta del proyecto
cd sistema-otorongo-main

# Instala las dependencias
npm install
```

Esto instalará: Express, MySQL2, bcryptjs, CORS, dotenv, y más.

---

## ⚙️ Paso 4: Configurar Variables de Entorno

Edita el archivo `.env` en la raíz del proyecto:

```env
# Configuración del Servidor
PORT=5000
NODE_ENV=development

# Configuración de MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_CONTRASEÑA_AQUI    # ⚠️ CAMBIA ESTO
DB_NAME=otorongo_db

# Configuración de Seguridad
JWT_SECRET=otorongo_secret_key_2025
BCRYPT_ROUNDS=10
```

**⚠️ IMPORTANTE:** Reemplaza `TU_CONTRASEÑA_AQUI` con tu contraseña de MySQL.

---

## 🗃️ Paso 5: Crear la Base de Datos

### Opción A: Usando MySQL Workbench (Recomendado para principiantes)

1. Abre MySQL Workbench
2. Conecta a tu servidor local
3. Abre el archivo `database-mysql.sql`
4. Haz clic en el botón ⚡ "Execute" (o presiona Ctrl+Shift+Enter)
5. Verifica que se crearon las tablas

### Opción B: Usando línea de comandos

```bash
# Conectar a MySQL y ejecutar el script
mysql -u root -p < database-mysql.sql

# Te pedirá la contraseña de MySQL
```

### Verificar que se creó correctamente:

```bash
# Conectar a MySQL
mysql -u root -p

# Dentro de MySQL:
USE otorongo_db;
SHOW TABLES;
SELECT COUNT(*) FROM users;
EXIT;
```

Deberías ver 8 tablas y 3 usuarios.

---

## 🎯 Paso 6: Iniciar el Servidor

```bash
# Iniciar en modo desarrollo (con auto-reload)
npm run dev

# O iniciar en modo producción
npm start
```

Deberías ver algo como:

```
✅ Pool de conexiones MySQL creado
✅ Conectado a la base de datos MySQL
✅ Esquema de base de datos verificado

🚀 Servidor iniciado en http://localhost:5000
📊 Base de datos: MySQL
🔧 Modo: development

✅ Sistema Centro Oftalmológico El Otorongo listo
```

---

## 🌐 Paso 7: Acceder al Sistema

1. Abre tu navegador
2. Ve a: **http://localhost:5000**
3. Inicia sesión con:

### Usuarios de Prueba:

**Administrador:**
- Usuario: `admin`
- Contraseña: `admin123`

**Médico:**
- Usuario: `medico`
- Contraseña: `medico123`

**Recepcionista:**
- Usuario: `recepcion`
- Contraseña: `recep123`

---

## ✅ Verificación Rápida

Prueba estas funcionalidades básicas:

1. ✅ Iniciar sesión
2. ✅ Ver dashboard con estadísticas
3. ✅ Ver lista de pacientes
4. ✅ Ver lista de citas
5. ✅ Navegar entre secciones

---

## 🔧 Solución de Problemas Comunes

### ❌ Error: "Cannot connect to MySQL"

**Solución:**
```bash
# Verificar que MySQL esté corriendo
# Windows:
net start MySQL80

# Linux/Mac:
sudo systemctl start mysql
```

### ❌ Error: "Access denied for user 'root'"

**Solución:**
- Verifica que la contraseña en `.env` sea correcta
- Intenta resetear la contraseña de MySQL

### ❌ Error: "Unknown database 'otorongo_db'"

**Solución:**
```bash
# Ejecuta el script SQL nuevamente
mysql -u root -p < database-mysql.sql
```

### ❌ Error: "Port 5000 already in use"

**Solución:**
Cambia el puerto en `.env`:
```env
PORT=5001
```

### ❌ Error: "Cannot find module 'mysql2'"

**Solución:**
```bash
npm install
```

---

## 📚 Próximos Pasos

Una vez que el sistema esté funcionando:

1. 📖 Lee la [Guía de Instalación Completa](GUIA_INSTALACION_MYSQL.md)
2. 📖 Revisa la [Documentación de Migración](MIGRACION_MYSQL.md)
3. 🧪 Ejecuta los tests: `npm test`
4. 🔒 Cambia las contraseñas predeterminadas
5. 📊 Explora todas las funcionalidades

---

## 🆘 ¿Necesitas Ayuda?

Si tienes problemas:

1. Revisa esta guía nuevamente
2. Consulta [GUIA_INSTALACION_MYSQL.md](GUIA_INSTALACION_MYSQL.md)
3. Revisa los logs del servidor en la consola
4. Verifica los logs de MySQL

---

## 📝 Comandos Útiles

```bash
# Detener el servidor
Ctrl + C

# Reiniciar el servidor
npm run dev

# Ver logs de MySQL
mysql -u root -p -e "SHOW PROCESSLIST;"

# Hacer respaldo de la base de datos
mysqldump -u root -p otorongo_db > backup.sql

# Restaurar respaldo
mysql -u root -p otorongo_db < backup.sql

# Ejecutar tests
npm test
```

---

## 🎉 ¡Listo!

Tu sistema está funcionando. Ahora puedes:

- ✅ Gestionar pacientes
- ✅ Agendar citas
- ✅ Generar facturas
- ✅ Ver reportes
- ✅ Administrar usuarios

**¡Disfruta usando el Sistema Centro Oftalmológico El Otorongo!** 🏥

---

## 📞 Soporte

Para más información:
- 📖 [README_MYSQL.md](README_MYSQL.md)
- 📖 [GUIA_INSTALACION_MYSQL.md](GUIA_INSTALACION_MYSQL.md)
- 📖 [MIGRACION_MYSQL.md](MIGRACION_MYSQL.md)
