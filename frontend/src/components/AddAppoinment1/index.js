import React, { useState } from 'react';
import { Grid, 
    Box, 
    FormControl,
    Typography, 
    ToggleButton, 
    ToggleButtonGroup, 
    createTheme,
    MenuItem,
    Select,
    InputLabel,
 } from '@mui/material';

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

  const [doctor, setDoctor] = useState('');
  

  const handleOptionChange = (event) => {
    setDoctor(event.target.value);
  };

  const [appointmentDate, setAppointmentDate] = useState('web');
  const handleChange = (event, newAppointmentDate) => {
    setAppointmentDate(newAppointmentDate);
  };

  return (
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
                    <InputLabel id="demo-simple-select-label">SELECT A SPECIALITY</InputLabel>
                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={doctor} onChange={handleOptionChange}  sx={{width: '500px'}} label = "SELECT A DOCTOR" >
                            <MenuItem value="option1">Universal Physician - Nishantha Gunasekara</MenuItem>
                            <MenuItem value="option2">Pediatrician - Buddhi Mohotti</MenuItem>
                            <MenuItem value="option3">Radiologist - Presantha Bandara</MenuItem>
                        </Select>
                </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', height: 150, backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ToggleButtonGroup color="secondary" value={appointmentDate} exclusive onChange={handleChange} aria-label="Appointment Date" sx={{ height: '100%' }}>
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
        <Grid item xs={12} sx={{paddingLeft: '80px'}}>
          <Box sx={{ width: '100%', height: 200, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Grid item xs={3}>
                <Typography variant="h5" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '40px', textAlign: 'center' ,paddingLeft: '80px'}}>
                    K.G.N.Medi House
                </Typography>
                <Typography variant="h7" component="div" sx={{ color: 'black', paddingTop: '5px', textAlign: 'left' ,paddingLeft: '140px'}}>
                    Galle
                </Typography>
            </Grid>
            <Grid item xs={3}>
          
            </Grid>
            <Grid item xs={3}>
          
            </Grid>
            <Grid item xs={3}>
          
            </Grid>
          </Box>
        </Grid>
      </Grid>

  );
}

export default AddAppointment1;
