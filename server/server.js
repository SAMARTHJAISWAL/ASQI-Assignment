const express = require('express');
const cors = require('cors');
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = 1111;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});