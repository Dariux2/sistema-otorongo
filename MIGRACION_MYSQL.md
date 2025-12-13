# 🔄 Guía de Migración de SQLite a MySQL
## Sistema Centro Oftalmológico El Otorongo

---

## 📋 Resumen de Cambios

Este documento detalla los cambios realizados para migrar el sistema de SQLite a MySQL.

### Archivos Modificados

1. ✅ **package.json** - Dependencias actualizadas
2. ✅ **database.js** - Reescrito completamente para MySQL
3. ✅ **server.js** - Ajustes menores en imports y cierre de conexión
4. ✅ **.env** - Nuevo archivo de configuración

### Archivos Nuevos

1. ✅ **database-mysql.sql** - Script de inicialización de base de datos
2. ✅ **.env.example** - Plantilla de variables de entorno
3. ✅ **GUIA_INSTALACION_MYSQL.md** - Guía completa de instalación
4. ✅ **MIGRACION_MYSQL.md** - Este documento

---

## 🔄 Cambios Técnicos Detallados

### 1. Dependencias (package.json)

**ANTES (SQLite):**
```json
"dependencies": {
  "sqlite3": "^5.1.6",
  ...
}
```

**DESPUÉS (MySQL):**
```json
"dependencies": {
  "mysql2": "^3.6.5",
  ...
}
```

### 2. Configuración de Base de Datos (database.js)

#### ANTES (SQLite):
```javascript
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('otorongo.db');
```

#### DESPUÉS (MySQL):
```javascript
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});
```

### 3. Tipos de Datos SQL

| SQLite | MySQL | Notas |
|--------|-------|-------|
| `TEXT` | `VARCHAR(n)` o `TEXT` | Especificar longitud |
| `INTEGER` | `INT` o `TINYINT` | Según rango de valores |
| `REAL` | `DECIMAL(10,2)` | Para valores monetarios |
| `CURRENT_TIMESTAMP` | `CURRENT_TIMESTAMP` | Compatible |

### 4. Sintaxis SQL Ajustada

#### Timestamps:
**SQLite:**
```sql
created_at TEXT DEFAULT CURRENT_TIMESTAMP
```

**MySQL:**
```sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

#### Foreign Keys:
**SQLite:**
```sql
FOREIGN KEY (paciente_id) REFERENCES patients(id) ON DELETE CASCADE
```

**MySQL (igual pero con ENGINE):**
```sql
FOREIGN KEY (paciente_id) REFERENCES patients(id) ON DELETE CASCADE
) ENGINE=InnoDB;
```

### 5. Manejo de Conexiones

#### ANTES (SQLite - Callback):
```javascript
db.run(sql, params, function(err) {
    if (err) reject(err);
    else resolve({ id: this.lastID });
});
```

#### DESPUÉS (MySQL - Async/Await):
```javascript
async function runQuery(sql, params = []) {
    const [result] = await pool.execute(sql, params);
    return {
        id: result.insertId,
        changes: result.affectedRows
    };
}
```

---

## 📊 Comparación de Características

| Característica | SQLite | MySQL |
|----------------|--------|-------|
| **Tipo** | Archivo local | Servidor cliente-servidor |
| **Concurrencia** | Limitada | Excelente |
| **Escalabilidad** | Pequeña/Media | Grande/Empresarial |
| **Transacciones** | Básicas | Avanzadas (ACID) |
| **Usuarios concurrentes** | ~100 | Miles |
| **Respaldos** | Copiar archivo | Herramientas dedicadas |
| **Replicación** | No nativa | Sí (Master-Slave) |
| **Tamaño máximo DB** | 281 TB | Prácticamente ilimitado |
| **Complejidad setup** | Muy simple | Moderada |

---

## 🚀 Ventajas de MySQL

### 1. **Rendimiento**
- Pool de conexiones para mejor manejo de múltiples usuarios
- Optimización de queries más avanzada
- Caché de queries integrado

### 2. **Escalabilidad**
- Soporta miles de conexiones simultáneas
- Replicación master-slave
- Clustering para alta disponibilidad

### 3. **Seguridad**
- Sistema de usuarios y permisos robusto
- Encriptación SSL/TLS
- Auditoría de accesos

### 4. **Herramientas**
- MySQL Workbench (GUI oficial)
- phpMyAdmin (interfaz web)
- Múltiples herramientas de terceros

### 5. **Respaldos**
- mysqldump para respaldos completos
- Respaldos incrementales
- Point-in-time recovery

---

## 📝 Pasos de Migración (Para Usuarios Existentes)

Si ya tienes datos en SQLite y quieres migrar a MySQL:

### Paso 1: Exportar Datos de SQLite

```bash
# Instalar sqlite3 CLI si no lo tienes
# Exportar a CSV
sqlite3 otorongo.db

.headers on
.mode csv
.output users.csv
SELECT * FROM users;
.output patients.csv
SELECT * FROM patients;
# ... repetir para cada tabla
.quit
```

### Paso 2: Crear Base de Datos MySQL

```bash
mysql -u root -p < database-mysql.sql
```

### Paso 3: Importar Datos a MySQL

```sql
-- Conectar a MySQL
mysql -u root -p otorongo_db

-- Importar usuarios (ejemplo)
LOAD DATA LOCAL INFILE 'users.csv'
INTO TABLE users
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;

-- Repetir para cada tabla
```

### Paso 4: Verificar Datos

```sql
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM patients;
SELECT COUNT(*) FROM appointments;
-- etc.
```

---

## 🔧 Configuración Recomendada

### Desarrollo Local

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=otorongo_db
```

### Producción

```env
DB_HOST=servidor_produccion.com
DB_PORT=3306
DB_USER=otorongo_user
DB_PASSWORD=contraseña_segura_compleja
DB_NAME=otorongo_db_prod
```

---

## 🧪 Testing

Los tests existentes pueden requerir ajustes:

```javascript
// Antes (SQLite)
const db = new sqlite3.Database(':memory:');

// Después (MySQL)
// Usar base de datos de test separada
process.env.DB_NAME = 'otorongo_test';
```

---

## 📈 Optimizaciones Implementadas

### 1. Pool de Conexiones
- Reutilización de conexiones
- Límite de 10 conexiones simultáneas
- Auto-reconexión en caso de fallo

### 2. Índices de Base de Datos
```sql
-- Índices para búsquedas rápidas
INDEX idx_dni ON patients(dni)
INDEX idx_fecha ON appointments(fecha)
INDEX idx_paciente ON appointments(paciente_id)
```

### 3. Transacciones
```javascript
async function executeTransaction(callback) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const result = await callback(connection);
        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}
```

---

## ⚠️ Consideraciones Importantes

### 1. Compatibilidad de Código
- Las queries SQL son 99% compatibles
- Los parámetros siguen usando `?` (placeholders)
- Las funciones async/await son más limpias

### 2. Rendimiento
- MySQL es más rápido con múltiples usuarios
- SQLite puede ser más rápido para operaciones simples de lectura
- El pool de conexiones mejora significativamente el rendimiento

### 3. Mantenimiento
- MySQL requiere más configuración inicial
- Respaldos más complejos pero más robustos
- Monitoreo más detallado disponible

---

## 🔍 Troubleshooting

### Problema: "Cannot connect to MySQL server"

**Solución:**
```bash
# Verificar que MySQL esté corriendo
sudo systemctl status mysql  # Linux
net start MySQL80            # Windows

# Verificar puerto
netstat -an | grep 3306
```

### Problema: "Access denied"

**Solución:**
```sql
-- Verificar usuario
SELECT user, host FROM mysql.user;

-- Crear usuario si es necesario
CREATE USER 'root'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON otorongo_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### Problema: "Too many connections"

**Solución:**
```sql
-- Ver conexiones actuales
SHOW PROCESSLIST;

-- Aumentar límite
SET GLOBAL max_connections = 200;
```

---

## 📚 Recursos Adicionales

### Documentación
- [MySQL Official Docs](https://dev.mysql.com/doc/)
- [mysql2 npm package](https://www.npmjs.com/package/mysql2)
- [MySQL Workbench](https://www.mysql.com/products/workbench/)

### Tutoriales
- [MySQL Tutorial](https://www.mysqltutorial.org/)
- [Node.js + MySQL](https://www.w3schools.com/nodejs/nodejs_mysql.asp)

### Herramientas
- **MySQL Workbench** - GUI oficial
- **phpMyAdmin** - Interfaz web
- **DBeaver** - Cliente universal
- **Adminer** - Alternativa ligera a phpMyAdmin

---

## ✅ Checklist de Migración Completada

- [x] Dependencias actualizadas (mysql2)
- [x] database.js reescrito para MySQL
- [x] Script SQL de inicialización creado
- [x] Variables de entorno configuradas
- [x] Documentación actualizada
- [x] Guía de instalación MySQL creada
- [x] Datos de ejemplo incluidos
- [x] Pool de conexiones implementado
- [x] Manejo de errores mejorado
- [x] Índices optimizados
- [x] Foreign keys configuradas

---

## 🎯 Próximos Pasos

1. **Instalar MySQL Server** (si no está instalado)
2. **Ejecutar script de base de datos** (`database-mysql.sql`)
3. **Configurar archivo .env** con credenciales
4. **Instalar dependencias** (`npm install`)
5. **Iniciar servidor** (`npm run dev`)
6. **Probar funcionalidades** del sistema
7. **Configurar respaldos automáticos** (producción)

---

**¡Migración completada exitosamente!** 🎉

El sistema ahora utiliza MySQL como base de datos, proporcionando mejor rendimiento, escalabilidad y características empresariales.
