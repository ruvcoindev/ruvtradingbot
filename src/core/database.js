const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) console.error('Ошибка инициализации БД:', err.message);
  else console.log('Подключение к SQLite успешно');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS trades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    price REAL,
    amount REAL,
    type TEXT
  )`);
});

module.exports = db;
