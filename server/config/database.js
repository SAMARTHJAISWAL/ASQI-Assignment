const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('employee_management.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    createTables();
  }
});

function createTables() {
  db.run('DROP TABLE IF EXISTS employees');
  db.run('DROP TABLE IF EXISTS departments');

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
}

module.exports = db;