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

// Department Form Component
const DepartmentForm = ({ onAddDepartment }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddDepartment({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <div className="p-4 border rounded-lg bg-background shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Add Department</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEmployee({ name, department, address });
    setName('');
    setDepartment('');
    setAddress('');
  };

  return (
    <div className="p-4 border rounded-lg bg-background shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger>
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
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="flex-1"
        />
        <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
          <SelectTrigger className="w-[180px]">
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
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:1111/api/departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      setError('Error fetching departments');
      console.error('Error fetching departments:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:1111/api/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      setError('Error fetching employees');
      console.error('Error fetching employees:', error);
    }
  };

  const handleAddDepartment = async (department) => {
    try {
      const response = await fetch('http://localhost:1111/api/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(department),
      });
      if (response.ok) {
        fetchDepartments();
      }
    } catch (error) {
      setError('Error adding department');
      console.error('Error adding department:', error);
    }
  };

  const handleAddEmployee = async (employee) => {
    try {
      const response = await fetch('http://localhost:1111/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
      });
      if (response.ok) {
        fetchEmployees();
      }
    } catch (error) {
      setError('Error adding employee');
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
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