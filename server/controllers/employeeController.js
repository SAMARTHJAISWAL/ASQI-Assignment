const db = require('../config/database');

const employeeController = {
  getAllEmployees: (req, res) => {
    db.all('SELECT * FROM employees', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  },

  createEmployee: (req, res) => {
    const { name, department, address } = req.body;
    db.run(
      'INSERT INTO employees (name, department, address) VALUES (?, ?, ?)',
      [name, department, address],
      function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ 
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