import React, { useState, useEffect } from 'react';
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

function AddAppointment() {
  const [appointmentDoctor, setAppointmentDoctor] = useState('');
  const [doctorNames, setDoctorNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctorNames();
  }, []);

  const fetchDoctorNames = async () => {
    try {
      const response = await fetch('https://mcms_api.mtron.me/get_doctor_names');
      const data = await response.json();
      const formattedDoctorNames = data.map((doctor) => {
        const fullDoctorType = doctor.d_type.replace('_', ' ').toUpperCase();
        const fullDoctorName = doctor.doctor_name.toUpperCase();
        const doctorID = doctor.cd_id;
        return `${fullDoctorType} - ${fullDoctorName},${doctorID}`;
      });
      setDoctorNames(formattedDoctorNames);
    } catch (error) {
      console.error('Error fetching doctor names:', error);
    }
  };

  const handleOptionChange = (event) => {
    const selectedDoctor = event.target.value;
    const [doctorName, doctorID] = selectedDoctor.split(',');
    setAppointmentDoctor(doctorName);

    if (selectedDoctor) {
      navigate('/add_appointment1', { state: { selectedDoctor: doctorName, selectedDoctorID: doctorID } });
    }
  };

  return (
    <Grid container spacing={0} sx={{ minHeight: '100vh', flexDirection: 'column' }}>
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
          <Grid item xs={12} sx={{ paddingTop: '80px', paddingBottom: '50px' }}>
            <Grid container spacing={0} alignItems="center" justifyContent="center">
              <Grid item sx={{ backgroundColor: 'white' }}>
                <FormControl fullWidth>
                  <InputLabel id="select-doctor" color="secondary">
                    SELECT A SPECIALITY DOCTOR
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
                    {doctorNames.map((doctor) => (
                      <MenuItem key={doctor} value={doctor}>
                        {doctor.split(',')[0]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ flex: 1 }}>
        <Stack sx={{ width: '100%', paddingTop: '70px', flex: 1 }} spacing={0} alignItems="center" justifyContent="center">
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
