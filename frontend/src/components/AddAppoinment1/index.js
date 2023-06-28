import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';


import { 
  Grid, 
  Box,
  FormControl,
  TextField,
  Typography,
   } from '@mui/material';

  function AddAppointment(){

    return (
    <Grid>
    <Box sx={{width: 2000,height: 250,backgroundColor: '#ce93d8', }}>
    <Typography variant="h4" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '40px',textAlign: 'center' }}  >ADD  APPOINTMENT</Typography>
      <Grid item xs={12} sx={{paddingTop:'80px', paddingBottom:'50px'}}>
        <Grid container spacing={0} alignItems="center" justifyContent="center" >
          <Grid item  sx={{backgroundColor : 'white'}} >
            <FormControl fullWidth>
            <TextField labelId="demo-simple-select-label" id="demo-simple-select" sx={{width: '500px'}} />
            </FormControl> 
          </Grid> 
        </Grid>
        </Grid>   
      </Box>
      </Grid>

    );
}

export default AddAppointment;   