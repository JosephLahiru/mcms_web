import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';


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
   } from '@mui/material';

  function AddAppointment(){

    return (
    <Grid>
    <Box sx={{width: 2000,height: 250,backgroundColor: '#ce93d8', }}>
      <Grid item xs={12} sx={{paddingTop:'130px', paddingBottom:'50px'}}>
        <Grid container spacing={0} alignItems="center" justifyContent="center" >
          <Grid item  sx={{backgroundColor : 'white'}} >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"></InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select"   sx={{width: '500px'}} >
              </Select>
            </FormControl> 
          </Grid> 
        </Grid>
        </Grid>   
      </Box>
      </Grid>

    );
}

export default AddAppointment;   