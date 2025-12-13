/**
 * Database Configuration - MySQL
 * Centro Oftalmológico El Otorongo
 * 
 * Configuración y gestión de la base de datos MySQL
 */

const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Configuración de la conexión MySQL
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'otorongo_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
};

// Crear pool de conexiones
let pool;

try {
    pool = mysql.createPool(dbConfig);
    console.log('✅ Pool de conexiones MySQL creado');
} catch (error) {
    console.error('❌ Error al crear pool de conexiones:', error.message);
    process.exit(1);
}

// Flag para marcar si la BD está lista
let dbReady = false;

/**
 * Inicializar y verificar conexión a la base de datos
 */
async function initializeDatabase() {
    try {
        // Probar conexión
        const connection = await pool.getConnection();
        console.log('✅ Conectado a la base de datos MySQL');
        
        // Verificar si las tablas existen
        const [tables] = await connection.query(
            "SHOW TABLES LIKE 'users'"
        );
        
        connection.release();
        
        if (tables.length === 0) {
            console.log('⚠️  Las tablas no existen. Por favor ejecuta el script database-mysql.sql');
            console.log('   Comando: mysql -u root -p otorongo_db < database-mysql.sql');
        } else {
            console.log('✅ Esquema de base de datos verificado');
            dbReady = true;
        }
        
        return true;
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error.message);
        console.error('   Verifica que MySQL esté corriendo y las credenciales en .env sean correctas');
        return false;
    }
}

/**
 * Esperar a que la base de datos esté lista
 */
function waitForDB() {
    return new Promise((resolve) => {
        const checkReady = () => {
            if (dbReady) {
                resolve();
            } else {
                setTimeout(checkReady, 100);
            }
        };
        checkReady();
    });
}

/**
 * Ejecutar query con promesa
 */
async function runQuery(sql, params = []) {
    try {
        const [result] = await pool.execute(sql, params);
        return {
            id: result.insertId,
            changes: result.affectedRows,
            result: result
        };
    } catch (error) {
        console.error('Error en runQuery:', error.message);
        throw error;
    }
}

/**
 * Obtener un registro
 */
async function getOne(sql, params = []) {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows[0] || null;
    } catch (error) {
        console.error('Error en getOne:', error.message);
        throw error;
    }
}

/**
 * Obtener múltiples registros
 */
async function getAll(sql, params = []) {
    try {
        const [rows] = await pool.execute(sql, params);
        return rows;
    } catch (error) {
        console.error('Error en getAll:', error.message);
        throw error;
    }
}

/**
 * Cerrar pool de conexiones
 */
async function closeDatabase() {
    try {
        await pool.end();
        console.log('✅ Pool de conexiones MySQL cerrado');
    } catch (error) {
        console.error('Error al cerrar pool:', error.message);
        throw error;
    }
}

/**
 * Obtener una conexión del pool (para transacciones)
 */
async function getConnection() {
    try {
        return await pool.getConnection();
    } catch (error) {
        console.error('Error al obtener conexión:', error.message);
        throw error;
    }
}

/**
 * Ejecutar transacción
 */
async function executeTransaction(callback) {
    const connection = await getConnection();
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

// Inicializar la base de datos al cargar el módulo
initializeDatabase().then(success => {
    if (success) {
        dbReady = true;
    }
});

// Exportar funciones y pool
module.exports = {
    pool,
    runQuery,
    getOne,
    getAll,
    closeDatabase,
    waitForDB,
    getConnection,
    executeTransaction,
    initializeDatabase
};
