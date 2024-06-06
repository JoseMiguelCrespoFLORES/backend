const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// Crear la tabla bookings y agregar algunos datos de ejemplo con precios
db.serialize(() => {
    db.run(`CREATE TABLE bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        origin TEXT,
        destination TEXT,
        date TEXT,
        time TEXT,
        adults INTEGER,
        children INTEGER,
        seats TEXT,
        paymentMethod TEXT,
        price REAL
    )`);

    const insert = db.prepare(`INSERT INTO bookings (origin, destination, date, time, adults, children, seats, paymentMethod, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    insert.run('Salamanca', 'Irapuato', '2024-06-10', '08:00', 1, 0, '1A', 'Credit Card', 100.00);
    insert.run('Irapuato', 'Salamanca', '2024-06-10', '10:00', 2, 1, '3B, 3C, 3D', 'Debit Card', 90.00);
    insert.run('Guadalajara', 'Queretaro', '2024-06-10', '12:00', 1, 1, '5A, 5B', 'Cash', 200.00);
    insert.run('Queretaro', 'Mexico DF', '2024-06-10', '14:00', 2, 2, '7A, 7B, 7C, 7D', 'Credit Card', 250.00);
    insert.run('Mexico DF', 'Guadalajara', '2024-06-10', '16:00', 1, 0, '9A', 'Credit Card', 180.00);

    insert.finalize();
});

// Función para consultar y mostrar los datos de la tabla bookings
db.serialize(() => {
    db.each("SELECT id, origin, destination, date, time, adults, children, seats, paymentMethod, price FROM bookings", (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(`${row.id}: ${row.origin} to ${row.destination} on ${row.date} at ${row.time} - $${row.price}`);
    });
});

module.exports = db;
