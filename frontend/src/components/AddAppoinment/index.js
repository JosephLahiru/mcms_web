import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';


import { 
  Grid, 
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
   } from '@mui/material';

  function AddAppointment(){
    const [selectedOption, setSelectedOption] = useState('');
    const [formData, setFormData] = useState({
    
    });

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Perform form submission logic here
      console.log(formData);
    };
    return (
      <Box sx={{width: 2000,height: 1000,backgroundColor: '#ce93d8', }}>
          <form onSubmit={handleSubmit} >
          <Grid item xs={12} sx={{paddingTop:'200px', paddingBottom:'60px'}}>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item sx={{backgroundColor : 'white'}}>
            <Select value={selectedOption} onChange={handleOptionChange}>
              <MenuItem value="option1">Universal Physician</MenuItem>
              <MenuItem value="option2">Pediatrician</MenuItem>
              <MenuItem value="option3">Radiologist</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
        </Grid>
      </form>
     
      </Box>
      
    );
}

export default AddAppointment;   
  
 

