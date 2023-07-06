import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
  Grid,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  createTheme,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';

function AddAppointment1() {
  const [appointmentDoctor, setAppointmentDoctor] = useState('');
  const [appointmentNumber, setAppointmentNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    navigate(-1);
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();
  const dates = [];
  for (let i = 0; i < 10; i++) {
    const appointmentDate = new Date();
    appointmentDate.setDate(currentDate.getDate() + i);
    dates.push(appointmentDate);
  }

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#7b1fa2',
      },
    },
  });

  const handleOptionChange = (event) => {
    setAppointmentDoctor(event.target.value);
  };

  const handleChange = (event, newappointmentDate) => {
    setAppointmentDate(newappointmentDate);
  };

  // Get the selectedDoctor from the location state
  const { selectedDoctor } = location.state || {};

  // Set the selectedDoctor in AddAppointment1 if available
  React.useEffect(() => {
    if (selectedDoctor) {
      setAppointmentDoctor(selectedDoctor);
    }
  }, [selectedDoctor]);

 
  const handleBookNow = () => {
    if (appointmentDate) {
      navigate('/add_appointment2');
    } else {
      setShowError(true);
    }
  };

 
  
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Box sx={{ width: '100%', height: 250, backgroundColor: '#ce93d8' }}>
          <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', paddingTop: '50px', textAlign: 'left', paddingLeft: '90px' }}>
            ADD APPOINTMENT
          </Typography>
          <CloseOutlinedIcon sx={{ position: 'absolute', top: '80px', right: '20px', color: 'white' }} onClick={handleClose} />
          <Grid item xs={12} sx={{ paddingTop: '80px', paddingBottom: '50px' }}>
            <Grid container spacing={0} alignItems="center" justifyContent="center">
              <Grid item sx={{ backgroundColor: 'white' }}>
                <FormControl fullWidth>
                  <InputLabel id="select-doctor" color="secondary">
                    SELECT A SPECIALITY
                  </InputLabel>
                  <Select
                    labelId="select-doctor"
                    id="select-doctor"
                    color="secondary"
                    value={appointmentDoctor}
                    onChange={handleOptionChange}
                    sx={{ width: '400px' }}
                    label="SELECT A DOCTOR"
                  >
                    <MenuItem value="NISHANTHA GUNASEKARA">NISHANTHA GUNASEKARA</MenuItem>
                    <MenuItem value="BUDDHI MOHOTTI">BUDDHI MOHOTTI</MenuItem>
                    <MenuItem value="PRESANTHA BANDARA">PRESANTHA BANDARA</MenuItem>
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
            {dates.map((appointmentDate, index) => (
              <ToggleButton
                key={index}
                value={appointmentDate.toString()}
                sx={{
                  color: theme.palette.secondary.dark,
                  width: '100px',
                  '&.Mui-selected': {
                    backgroundColor: '#9c27b0', // Highlight color when selected
                    color: '#fff', // Toggle button text color when selected
                  },
                }}
              >
                <div>
                  <div style={{ fontSize: '20px' }}>{months[appointmentDate.getMonth()]}</div>
                  <div style={{ fontWeight: 'bold', fontSize: '36px' }}>{appointmentDate.getDate()}</div>
                  <div>{daysOfWeek[appointmentDate.getDay()]}</div>
                </div>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ paddingLeft: '80px' }}>
        <Box sx={{ width: '100%', height: 200, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Grid item xs={3}>
            <Typography variant="h5" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '40px', textAlign: 'center', paddingLeft: '150px' }}>
              K.G.N.Medi House
            </Typography>
            <Typography variant="h7" component="div" sx={{ color: 'black', paddingTop: '5px', textAlign: 'left', paddingLeft: '175px' }}>
              Galle
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h2" component="div" sx={{ color: '#7b1fa2', fontWeight: 'bold', paddingTop: '40px', textAlign: 'center', paddingLeft: '120px' }}>
              00{appointmentNumber}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '40px', textAlign: 'center', paddingLeft: '10px' }}>
              04.00 PM
            </Typography>
          </Grid>
          <Grid item xs={3} sx={{ paddingTop: '30px', paddingRight: '120px' }}>
            <Button variant="contained" size="medium" color="secondary" sx={{ paddingTop: '10px', textAlign: 'center' }} onClick={handleBookNow}>
              Book Now
            </Button>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ paddingLeft: '80px' }}>
        <Box sx={{ width: '100%', height: 200, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Grid item xs={3}>
            {showError && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Please select a date — <strong>check it out!</strong>
              </Alert>
            )}
          </Grid>
          </Box>
      </Grid> 
    </Grid>
  );
}

export default AddAppointment1;

