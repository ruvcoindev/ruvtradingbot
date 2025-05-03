const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

const app = express();
const server = express().listen(3000, () => {
  console.log('Web-доска запущена на http://localhost:3000');
});

const io = socketIO(server);

// Подключение к базе данных
const db = require('../src/core/database');

// Загрузка данных
function fetchData(query, callback) {
  db.all(query, [], (err, rows) => {
    if (err) return callback([]);
    callback(rows);
  });
}

// Обновление данных в реальном времени
setInterval(() => {
  fetchData('SELECT * FROM trades ORDER BY id DESC LIMIT 10', (trades) => {
    fetchData('SELECT * FROM orders WHERE status="pending"', (orders) => {
      fetchData('SELECT * FROM indicators ORDER BY id DESC LIMIT 14', (indicators) => {
        io.emit('update', { trades, orders, indicators });
      });
    });
  });
}, 5000);

// Роуты
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, 'views', 'dashboard.ejs'), 'utf8', (err, template) => {
    res.send(ejs.render(template, {}));
  });
});
