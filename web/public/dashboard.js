const socket = io();

let indicatorChart;

function initChart() {
  const ctx = document.getElementById('indicatorChart').getContext('2d');
  indicatorChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        { label: 'MA', data: [], borderColor: '#3e95cd' },
        { label: 'RSI', data: [], borderColor: '#742774' },
        { label: 'MACD', data: [], borderColor: '#ffec64' },
        { label: 'Signal', data: [], borderColor: '#3cba9f' }
      ]
    },
    options: { responsive: true }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initChart();

  socket.on('connect', () => console.log('Подключено к веб-доске'));
  
  socket.on('update', data => {
    // Обновление графика
    const timestamps = data.indicators.map(i => new Date(i.timestamp).toLocaleTimeString());
    indicatorChart.data.labels = timestamps;
    indicatorChart.data.datasets[0].data = data.indicators.map(i => i.ma || 0);
    indicatorChart.data.datasets[1].data = data.indicators.map(i => i.rsi || 0);
    indicatorChart.data.datasets[2].data = data.indicators.map(i => i.macd || 0);
    indicatorChart.data.datasets[3].data = data.indicators.map(i => i.signal || 0);
    indicatorChart.update();
    
    // Обновление таблиц
    updateTable('ordersTable', data.orders, ['id', 'type', 'price', 'amount']);
    updateTable('tradesTable', data.trades, ['price', 'amount', 'type', 'timestamp']);
  });
});

function updateTable(tableId, data, columns) {
  const table = document.getElementById(tableId).querySelector('tbody');
  table.innerHTML = '';
  
  data.forEach(row => {
    const tr = document.createElement('tr');
    columns.forEach(col => {
      const td = document.createElement('td');
      td.textContent = row[col] || '-';
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
}
