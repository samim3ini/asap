import React from 'react';
import placeholder from '../assets/placeholder.png';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Paper, TableContainer } from '@mui/material';

interface Employee {
  employeeID: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  department: string;
  imageBase64?: string;
}

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employeeID: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
      <Table aria-label="employee table">
        <TableHead sx={{ bgcolor: 'primary.light' }}>
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Image</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>ID</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Name</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Email</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Phone</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Department</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.employeeID} hover>
              <TableCell align="center">
                {employee.imageBase64 ? (
                  <img
                    src={`data:image/jpeg;base64,${employee.imageBase64}`}
                    alt="Employee"
                    width="75"
                    style={{ borderRadius: '50%' }}
                  />
                ) : (
                  <img src={placeholder} alt="No Image" width="75" style={{ borderRadius: '50%' }} />
                )}
              </TableCell>
              <TableCell align="center">{employee.employeeID}</TableCell>
              <TableCell align="center">{employee.fullName}</TableCell>
              <TableCell align="center">{employee.email}</TableCell>
              <TableCell align="center">{employee.phoneNumber}</TableCell>
              <TableCell align="center">{employee.department}</TableCell>
              <TableCell>
                <Button variant="outlined" color="primary" onClick={() => onEdit(employee)} sx={{ mr: 1 }}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={() => onDelete(employee.employeeID)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
