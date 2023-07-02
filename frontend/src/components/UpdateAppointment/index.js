import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import { 
  Grid,
  Box, 
  Typography,

 } from '@mui/material';




function UpdateAppointment() { 
  const [patientName, setPatientName] = useState("");
  const [area, setarea] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [appointmentDoctor, setAppointmentDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [error, setError] = useState(false);
 


  const navigate = useNavigate();


  return (
    <Grid item xs={12}>
    <Box sx={{ width: '100%', height: 100, backgroundColor: '#ce93d8' }}>
      <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', paddingTop: '50px', textAlign: 'left', paddingLeft: '90px' }}>
        UPDATE INFORMATION
      </Typography>
      <CloseOutlinedIcon sx={{ position: 'absolute', top: '80px', right: '20px', color: 'white' }} />
    </Box>
  </Grid>
  );
}
 
   export default UpdateAppointment;


   