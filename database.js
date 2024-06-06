const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

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
        paymentMethod TEXT
    )`);
});

module.exports = db;
