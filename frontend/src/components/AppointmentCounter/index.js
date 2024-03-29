import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Toolbar, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useUser } from './../../scripts/userContext';

const AppointmentCounter = () => {
  const [appointmentNumber, setAppointmentNumber] = useState(1);
  const user = useUser().user;

  const updateAppointmentNumberOnServer = (newAppointmentNumber) => {
    fetch(`https://mcms_api.mtron.me/set_app_no/${newAppointmentNumber}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ appointmentNumber: newAppointmentNumber }),
    })
    .then(response => {
      // Handle response if needed
    })
    .catch(error => {
      // Handle error if needed
    });
  };

  const fetchAppointmentNumberFromServer = () => {
    fetch('https://mcms_api.mtron.me/get_app_no')
      .then(response => response.json())
      .then(data => {
        setAppointmentNumber(data[0].val);
      })
      .catch(error => {
        // Handle error if needed
      });
  };

  useEffect(() => {
    fetchAppointmentNumberFromServer();

    const interval = setInterval(fetchAppointmentNumberFromServer, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNextAppointment = () => {
    const newAppointmentNumber = appointmentNumber + 1;
    setAppointmentNumber(newAppointmentNumber);
    updateAppointmentNumberOnServer(newAppointmentNumber);
  };

  const handlePreviousAppointment = () => {
    if (appointmentNumber > 1) {
      const newAppointmentNumber = appointmentNumber - 1;
      setAppointmentNumber(newAppointmentNumber);
      updateAppointmentNumberOnServer(newAppointmentNumber);
    }
  };

  const handleResetAppointment = () => {
    setAppointmentNumber(0);
    updateAppointmentNumberOnServer(0);
  };

  return (
    <Paper title="Appointment Counter" style={{ background: 'linear-gradient(to bottom, #e3abed, #9424a8)' }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h2" sx={{ color: 'white', my: 2 }}>
          Appointment Counter
        </Typography>
        <h1 style={{ fontSize: '25rem', textAlign: 'center', color: 'white' }}>{appointmentNumber}</h1>
        <Grid container spacing={2} justifyContent="center">
          {user && user.user_type === 'admin' && (
            <>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handlePreviousAppointment}
                >
                  Previous Appointment
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleResetAppointment}
                >
                  Reset Appointment
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleNextAppointment}
                >
                  Next Appointment
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Paper>
  );
};

export default AppointmentCounter;
