import React, { useState } from 'react';
import { Grid, Box, FormControl, TextField, Typography, ToggleButton, ToggleButtonGroup, createTheme, ThemeProvider } from '@mui/material';

function AddAppointment1() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const dates = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    dates.push(date);
  }

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#7b1fa2',
      },
    },
  });

  const [alignment, setAlignment] = useState('web');
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', height: 250, backgroundColor: '#ce93d8' }}>
            <Typography variant="h4" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '40px', textAlign: 'center' }}>
              ADD APPOINTMENT
            </Typography>
            <Grid item xs={12} sx={{ paddingTop: '80px', paddingBottom: '50px' }}>
              <Grid container spacing={0} alignItems="center" justifyContent="center">
                <Grid item sx={{ backgroundColor: 'white' }}>
                  <FormControl fullWidth>
                    <TextField labelId="demo-simple-select-label" id="demo-simple-select" sx={{ width: '500px' }} />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', height: 150, backgroundColor: '#f3e5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ToggleButtonGroup color="secondary" value={alignment} exclusive onChange={handleChange} aria-label="Platform" sx={{ height: '100%' }}>
              {dates.map((date, index) => (
                <ToggleButton key={index} value={date.toDateString()} sx={{ color: theme.palette.secondary.dark, width: '100px', }}>
                  <div>
                    <div style={{ fontSize: '20px' }}>{months[date.getMonth()]}</div>
                    <div style={{ fontWeight: 'bold', fontSize: '36px' }}>{date.getDate()}</div>
                    <div >{daysOfWeek[date.getDay()]}</div>
                  </div>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AddAppointment1;
