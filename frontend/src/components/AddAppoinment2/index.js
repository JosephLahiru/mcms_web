import React, { useState } from 'react';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { 
    Grid, 
    Box,
    Typography,
     } from '@mui/material';

     function AddAppointment2(){
     


    return (
        <Grid container spacing={0}>
        <Grid item xs={12}>
        <Box sx={{width: '100%',height: 120,backgroundColor: '#ce93d8', }}>
        <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', paddingTop: '50px',textAlign: 'left',paddingLeft: '90px' }}  >BOOK A CHANNEL</Typography>
        <CloseOutlinedIcon sx={{ position: 'absolute', top: '80px', right: '20px', color: 'white' }} />
        </Box>
        </Grid>
        </Grid>
        

        );
    }
    
    export default AddAppointment2;   
