import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
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

function AddAppointment() {
  const [appointmentDoctor, setAppointmentDoctor] = useState('');
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const handleOptionChange = (event) => {
    const selectedDoctor = event.target.value;
    setAppointmentDoctor(selectedDoctor);

    if (selectedDoctor) {
      navigate('/add_appointment1');
    }
  };

  async function getAppointmentDoctor(doctor_name,d_type) {
    try {
      const response = await fetch('https://mcms_api.mtron.me/get_doctor_names' +  doctor_name + "/" +  d_type );
      if (!response.ok) {
        throw new Error('Failed to fetch Expire Type Id');
      }
      const data = await response.json();
      const appointmentDoctorValue = data.length > 0 ? data[0].doctor_name : '';
      return appointmentDoctorValue;

    } catch (error) {
      console.error('Error:', error);
      return '';
    }
  }

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Box sx={{ width: '100%', height: 250, backgroundColor: '#ce93d8' }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              paddingTop: '50px',
              textAlign: 'left',
              paddingLeft: '90px',
            }}
          >
            ADD APPOINTMENT
          </Typography>
          <CloseOutlinedIcon
            sx={{ position: 'absolute', top: '80px', right: '20px', color: 'white' }}
            onClick={handleClose}
          />
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
                    sx={{ width: '500px' }}
                    label="SELECT A DOCTOR"
                  >
                    <MenuItem value="NISHANTHA GUNASEKARA">Universal Physician - NISHANTHA GUNASEKARA</MenuItem>
                    <MenuItem value="BUDDHI MOHOTTI">Pediatrician - BUDDHI MOHOTTI</MenuItem>
                    <MenuItem value="PRESANTHA BANDARA">Radiologist - PRESANTHA BANDARA</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Stack sx={{ width: '100%', paddingTop: '70px' }} spacing={0} alignItems="center" justifyContent="center">
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




