const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Store the database next to the server code (not in whatever directory the
// server happens to be started from). Override with DB_PATH if needed.
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'employee_management.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log(`Connected to SQLite database at ${DB_PATH}`);
  }
});

// Create tables if they don't exist yet. (Previously the tables were dropped
// on every start, which wiped all saved data whenever the server restarted.)
db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON');

  db.run(`
    CREATE TABLE IF NOT EXISTS departments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      description TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      address TEXT,
      FOREIGN KEY (department) REFERENCES departments(name)
    )
  `);
});

module.exports = db;
