import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
} from '@mui/material';
import placeholder from '../assets/placeholder.png';
import { fetchAttendanceRecords } from '../services/employeeService'; // Create this service function

interface AttendanceRecord {
  employeeID: string;
  attenDate: string;
  checkInTime: string | null;
  empStatus: string;
  imageBase64?: string;
}

const AttendanceManagement: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const response = await fetchAttendanceRecords();
        setRecords(response.data);
      } catch (err: any) {
        console.error('Error fetching attendance records:', err);
        setError('Failed to load attendance records.');
      }
    };
    loadAttendance();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        Attendance Records
      </Typography>
      <br />
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table aria-label="attendance table">
          <TableHead sx={{ bgcolor: 'primary.light' }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Image</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Employee ID</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Date</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Check-In Time</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={`${record.employeeID}-${record.attenDate}`}>
                <TableCell align="center">
                  {record.imageBase64 ? (
                    <img
                      src={`data:image/jpeg;base64,${record.imageBase64}`}
                      alt="Visitor"
                      width="75"
                      style={{ borderRadius: '50%' }}
                    />
                  ) : (
                    <img src={placeholder} alt="No Image" width="75" style={{ borderRadius: '50%' }} />
                  )}
                </TableCell>
                <TableCell align="center">{record.employeeID}</TableCell>
                <TableCell align="center">{record.attenDate}</TableCell>
                <TableCell align="center">{record.checkInTime ? new Date(record.checkInTime).toLocaleTimeString() : 'N/A'}</TableCell>
                <TableCell align="center">{record.empStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Optionally add analytics charts here */}
    </Container>
  );
};

export default AttendanceManagement;
