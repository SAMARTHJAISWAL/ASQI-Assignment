const express = require('express');
const cors = require('cors');
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);

// Malformed JSON bodies
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }
  next(err);
});

const PORT = process.env.PORT || 1111;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
