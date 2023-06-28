import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
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
    const [doctor, setDoctor] = useState('');
    const navigate = useNavigate();

    const handleOptionChange = (event) => {
      setDoctor(event.target.value);
    };

    return (
    <Grid>
    <Box sx={{width: 2000,height: 250,backgroundColor: '#ce93d8', }}>
    <Typography variant="h4" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '35px',textAlign: 'center' }}  >ADD  APPOINTMENT</Typography>
      <Grid item xs={12} sx={{paddingTop:'80px', paddingBottom:'50px'}}>
        <Grid container spacing={0} alignItems="center" justifyContent="center" >
          <Grid item  sx={{backgroundColor : 'white'}} >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">SELECT A DOCTOR</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={doctor} onChange={handleOptionChange} onClick={() => navigate("/add_appointment1")} sx={{width: '500px'}} label = "SELECT A DOCTOR" >
                <MenuItem value="option1">Universal Physician</MenuItem>
                <MenuItem value="option2">Pediatrician</MenuItem>
                <MenuItem value="option3">Radiologist</MenuItem>
              </Select>
            </FormControl> 
          </Grid> 
        </Grid>
        </Grid>   
      </Box>
      <Stack  sx={{ width: '115%',paddingTop:'70px' }}  spacing={0}  alignItems="center" justifyContent="center" >
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
            Please Select Doctor — <strong>CHECK IT OUT!!</strong>
      </Alert>
      </Stack>
      </Grid>
    

    );
}

export default AddAppointment;   
  



