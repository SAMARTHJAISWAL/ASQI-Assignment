const db = require('../config/database');

const departmentController = {
  getAllDepartments: (req, res) => {
    db.all('SELECT * FROM departments', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  },

  createDepartment: (req, res) => {
    const { name, description } = req.body;
    db.run(
      'INSERT INTO departments (name, description) VALUES (?, ?)',
      [name, description],
      function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ 
          id: this.lastID,
          name,
          description
        });
      }
    );
  }
};

module.exports = departmentController;