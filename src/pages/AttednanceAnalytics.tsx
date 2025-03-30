import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import { fetchAttendanceAnalytics } from '../services/employeeService'; // Create this service function

const AttendanceAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // You can pass a date string if needed; otherwise, the lambda defaults to current date.
        const data = await fetchAttendanceAnalytics();
        setAnalytics(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Grid container justifyContent="center" style={{ marginTop: '2rem' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center" style={{ marginTop: '2rem' }}>
        {error}
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} style={{ padding: '2rem' }}>
      <Grid>
        <Typography variant="h4" gutterBottom>
          Attendance Analytics for {analytics.date}
        </Typography>
      </Grid>
      <Grid>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Records</Typography>
            <Typography variant="h5">{analytics.totalRecords}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid>
        <Card>
          <CardContent>
            <Typography variant="h6">Present</Typography>
            <Typography variant="h5">{analytics.presentCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid>
        <Card>
          <CardContent>
            <Typography variant="h6">Late</Typography>
            <Typography variant="h5">{analytics.lateCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid>
        <Card>
          <CardContent>
            <Typography variant="h6">Absent</Typography>
            <Typography variant="h5">{analytics.absentCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid>
        <Card>
          <CardContent>
            <Typography variant="h6">Attendance Rate</Typography>
            <Typography variant="h5">{analytics.attendanceRate}%</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid>
        <Card>
          <CardContent>
            <Typography variant="h6">Average Check-In Time</Typography>
            <Typography variant="h5">
              {analytics.averageCheckInTime || 'N/A'}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AttendanceAnalytics;
