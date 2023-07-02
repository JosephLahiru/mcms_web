import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
  Grid, 
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Stack,
  AlertTitle,
  Typography,
   } from '@mui/material';

  function AddAppointment(){
    const [appointmentDoctor, setAppointmentDoctor] = useState('');
    const navigate = useNavigate();

    const handleOptionChange = (event) => {
      setAppointmentDoctor(event.target.value);
    };

    return (
    <Grid container spacing={0}>
    <Grid item xs={12}>
    <Box sx={{width: '100%',height: 250,backgroundColor: '#ce93d8', }}>
    <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', paddingTop: '50px',textAlign: 'left',paddingLeft :'90px' }}  >ADD  APPOINTMENT</Typography>
      <Grid item xs={12} sx={{paddingTop:'80px', paddingBottom:'50px'}}>
        <Grid container spacing={0} alignItems="center" justifyContent="center" >
          <Grid item  sx={{backgroundColor : 'white'}} >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" color="secondary">SELECT A SPECIALITY</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" color="secondary"  value={appointmentDoctor} onChange={handleOptionChange} onClick={() => navigate("/add_appointment1")} sx={{width: '500px'}} label = "SELECT A DOCTOR" >
                  <MenuItem value="option1">Universal Physician - NISHANTHA GUNASEKARA</MenuItem>
                  <MenuItem value="option2">Pediatrician - BUDDHI MOHOTTI</MenuItem>
                  <MenuItem value="option3">Radiologist - PRESANTHA BANDARA</MenuItem>
              </Select>
            </FormControl> 
          </Grid> 
        </Grid>
        </Grid>   
      </Box>
      </Grid>
        <Grid item xs={12}>
          <Stack  sx={{ width: '100%',paddingTop:'70px' }}  spacing={0}  alignItems="center" justifyContent="center" >
            <Alert severity="info">
              <AlertTitle>Info</AlertTitle>
                  Please Select Doctor — <strong>CHECK IT OUT!!</strong>
            </Alert>
          </Stack>
        </Grid>
      </Grid>
    

    );
}

export default AddAppointment;   
  



