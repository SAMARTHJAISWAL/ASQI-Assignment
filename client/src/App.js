import React, { useState, useEffect } from 'react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Alert, AlertDescription } from './components/ui/alert';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

// Backend URL; override with REACT_APP_API_URL in client/.env
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1111/api';

// Throws with the server's error message when the response is not OK.
const request = async (path, options) => {
  const response = await fetch(`${API_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }
  return data;
};

// Department Form Component
const DepartmentForm = ({ onAddDepartment }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await onAddDepartment({ name, description })) {
      setName('');
      setDescription('');
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-background shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Add Department</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          aria-label="Department name"
          placeholder="Department Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          aria-label="Department description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit">Add Department</Button>
      </form>
    </div>
  );
};

// Employee Form Component
const EmployeeForm = ({ departments, onAddEmployee }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await onAddEmployee({ name, department, address })) {
      setName('');
      setDepartment('');
      setAddress('');
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-background shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          aria-label="Employee name"
          placeholder="Employee Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger aria-label="Employee department">
            <SelectValue placeholder="Select Department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.name}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          aria-label="Employee address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button type="submit">Add Employee</Button>
      </form>
    </div>
  );
};

// Employee List Component
const EmployeeList = ({ employees, departments }) => {
  const [nameFilter, setNameFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredEmployees = employees.filter(employee => {
    const nameMatch = employee.name.toLowerCase().includes(nameFilter.toLowerCase());
    const departmentMatch = departmentFilter === 'all' || employee.department === departmentFilter;
    return nameMatch && departmentMatch;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          aria-label="Filter employees by name"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="flex-1"
        />
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[180px]" aria-label="Filter employees by department">
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.name}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="border-t">
                <td className="px-4 py-2">{employee.id}</td>
                <td className="px-4 py-2">{employee.name}</td>
                <td className="px-4 py-2">{employee.department}</td>
                <td className="px-4 py-2">{employee.address}</td>
              </tr>
            ))}
            {filteredEmployees.length === 0 && (
              <tr className="border-t">
                <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDepartments();
    fetchEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDepartments = async () => {
    try {
      setDepartments(await request('/departments'));
    } catch (error) {
      setError(`Error fetching departments: ${error.message}`);
      console.error('Error fetching departments:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      setEmployees(await request('/employees'));
    } catch (error) {
      setError(`Error fetching employees: ${error.message}`);
      console.error('Error fetching employees:', error);
    }
  };

  const post = (path, body) =>
    request(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

  // Return true on success so the form knows it can clear its fields.
  const handleAddDepartment = async (department) => {
    try {
      await post('/departments', department);
      setError('');
      fetchDepartments();
      return true;
    } catch (error) {
      setError(`Error adding department: ${error.message}`);
      return false;
    }
  };

  const handleAddEmployee = async (employee) => {
    if (!employee.department) {
      setError('Please select a department for the employee');
      return false;
    }
    try {
      await post('/employees', employee);
      setError('');
      fetchEmployees();
      return true;
    } catch (error) {
      setError(`Error adding employee: ${error.message}`);
      return false;
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Employee Management System</h1>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DepartmentForm onAddDepartment={handleAddDepartment} />
        <EmployeeForm 
          departments={departments} 
          onAddEmployee={handleAddEmployee} 
        />
      </div>
      <EmployeeList 
        employees={employees} 
        departments={departments} 
      />
    </div>
  );
};

export default App;