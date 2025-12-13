const { waitForDB, closeDatabase } = require('./database');

(async () => {
  try {
    await waitForDB();
    console.log('Base de datos inicializada.');
  } catch (err) {
    console.error('Error inicializando BD:', err);
  } finally {
    try { await closeDatabase(); } catch(e){}
    process.exit(0);
  }
})();
