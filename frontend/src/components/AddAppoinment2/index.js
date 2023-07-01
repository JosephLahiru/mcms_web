import React, { useState, useEffect } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Grid,
     Box, 
     Typography,
     Divider,
     TextField 
    } from '@mui/material';

function AddAppointment2() {

    const [patientName, setPatientName] = useState("");
  return (
    <Grid container spacing={5}>
      <Grid item xs={12}>
        <Box sx={{ width: '100%', height: 120, backgroundColor: '#ce93d8' }}>
          <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', paddingTop: '50px', textAlign: 'left', paddingLeft: '90px' }}>
            BOOK A CHANNEL
          </Typography>
          <CloseOutlinedIcon sx={{ position: 'absolute', top: '80px', right: '20px', color: 'white' }} />
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '1200px', height: 100, backgroundColor: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
          <Grid container spacing={0}>
            <Grid item xs={3.5}>
              <Typography variant="h7" component="div" sx={{ color: 'black', paddingTop: '20px', textAlign: 'left', paddingLeft: '20px' }}>
                Doctor Name
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'left', paddingLeft: '20px' }}>
                NISHANTHA GUNASEKARA
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid item xs={2.5}>
              <Typography variant="h7" component="div" sx={{ color: 'black', paddingTop: '20px', textAlign: 'left', paddingLeft: '20px' }}>
                Date
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'left', paddingLeft: '20px' }}>
                2022-06-28
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid item xs={3}>
              <Typography variant="h7" component="div" sx={{ color: 'black', paddingTop: '20px', textAlign: 'left', paddingLeft: '20px' }}>
                Time
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'left', paddingLeft: '20px' }}>
                04.00 PM TO 08.00 PM
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem color />
            <Grid item xs={2.5}>
              <Typography variant="h7" component="div" sx={{ color: 'black', paddingTop: '20px', textAlign: 'left', paddingLeft: '20px' }}>
                Channeling Free
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: 'purple', fontWeight: 'bold', textAlign: 'left', paddingLeft: '20px' }}>
                LKR 4,500.00
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '1200px', height: 400, backgroundColor: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <TextField
            id="patient-name"
            label="Patient Name"
            value={patientName}
            onChange={(event) => setPatientName(event.target.value)}
            variant="outlined"
            color="secondary"
            sx={{ width: '50%' }}
          />
        </Box>
    </Grid>
     </Grid>
  );
}

export default AddAppointment2;
  
