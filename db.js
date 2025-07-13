const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./data.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT,
        email TEXT
    )`)
});

module.exports = db;