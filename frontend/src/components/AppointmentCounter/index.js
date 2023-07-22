import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';

const AppointmentCounter = () => {
  const [appointmentNumber, setAppointmentNumber] = useState(1);

  const updateAppointmentNumberOnServer = (newAppointmentNumber) => {
    // Replace 'mcms_api.me/set_app_no' with your actual API endpoint for updating the appointment number
    fetch(`https://mcms_api.me/set_app_no/${newAppointmentNumber}`, {
      method: 'POST', // Or 'PUT' depending on your API
      headers: {
        'Content-Type': 'application/json',
      },
      // You can add any additional data required by your API here
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
    // Replace 'mcms_api.me/get_app_no' with your actual API endpoint for fetching the appointment number
    fetch('https://mcms_api.mtron.me/get_app_no')
      .then(response => response.json())
      .then(data => {
        // Update the appointment number in the component's state
        setAppointmentNumber(data[0].val);
      })
      .catch(error => {
        // Handle error if needed
      });
  };

  useEffect(() => {
    // Fetch the initial appointment number from the server when the component mounts
    fetchAppointmentNumberFromServer();

    // Set up polling to check for updates every 5 seconds (adjust the interval as needed)
    const interval = setInterval(fetchAppointmentNumberFromServer, 5000);

    // Clean up the interval when the component unmounts
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

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      style={{
        background: 'linear-gradient(to bottom, #e3abed, #9424a8)',
      }}
    >
      <Toolbar />
      <h1 style={{ fontSize: '25rem', textAlign: 'center', color: 'white' }}>{appointmentNumber}</h1>
      <Grid container spacing={2} justifyContent="center">
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
            onClick={handleNextAppointment}
          >
            Next Appointment
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppointmentCounter;
