const db = require('../config/database');

const departmentController = {
  getAllDepartments: (req, res) => {
    db.all('SELECT * FROM departments ORDER BY name', [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    });
  },

  createDepartment: (req, res) => {
    const name = (req.body.name || '').trim();
    const description = (req.body.description || '').trim();

    if (!name) {
      res.status(400).json({ error: 'Department name is required' });
      return;
    }

    db.run(
      'INSERT INTO departments (name, description) VALUES (?, ?)',
      [name, description],
      function (err) {
        if (err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
            res.status(409).json({ error: `Department "${name}" already exists` });
            return;
          }
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(201).json({
          id: this.lastID,
          name,
          description
        });
      }
    );
  }
};

module.exports = departmentController;
