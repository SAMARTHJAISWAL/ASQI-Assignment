const db = require('../config/database');

const employeeController = {
  getAllEmployees: (req, res) => {
    db.all('SELECT * FROM employees ORDER BY id', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  },

  createEmployee: (req, res) => {
    const name = (req.body.name || '').trim();
    const department = (req.body.department || '').trim();
    const address = (req.body.address || '').trim();

    if (!name || !department) {
      res.status(400).json({ error: 'Employee name and department are required' });
      return;
    }

    db.run(
      'INSERT INTO employees (name, department, address) VALUES (?, ?, ?)',
      [name, department, address],
      function (err) {
        if (err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
            res.status(400).json({ error: `Department "${department}" does not exist` });
            return;
          }
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(201).json({
          id: this.lastID,
          name,
          department,
          address
        });
      }
    );
  }
};

module.exports = employeeController;
