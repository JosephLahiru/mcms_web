import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';

import { 
  Grid, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Box,
   } from '@mui/material';


   export default function BasicSelect() {
    const [speciality, setSpeciality] = React.useState('');
  
    const handleChange = (event) => {
      setSpeciality(event.target.value);
    };

  
  return (
    <Box sx={{width: 2000,height: 200,backgroundColor:'#e040fb', }}>
  <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Age</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={speciality}
    label="Speciality"
    onChange={handleChange}
  >
    <MenuItem value={1}>The Universal Physician</MenuItem>
    <MenuItem value={2}>Pediatrician</MenuItem>
    <MenuItem value={3}>Radiologist</MenuItem>
  </Select>
</FormControl>
    </Box>
  );
   } 
  
 

