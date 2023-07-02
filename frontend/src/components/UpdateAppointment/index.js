import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { 
  Grid,
  Box, 
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,



 } from '@mui/material';




function UpdateAppointment() { 
  const [patientName, setPatientName] = useState("");
  const [area, setArea] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [appointmentDoctor, setAppointmentDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <Box sx={{ width: '100%', height: 100, backgroundColor: '#ce93d8' }}>
        <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', paddingTop: '40px', textAlign: 'left', paddingLeft: '90px' }}>
          UPDATE INFORMATION
        </Typography>
        <CloseOutlinedIcon sx={{ position: 'absolute', top: '80px', right: '20px', color: 'white' }} />
      </Box>
    </Grid>
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '1200px', height: 675, backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
        <Typography  component="div" sx={{ color: 'purple', fontWeight: 'bold', textAlign: 'center',fontSize: '40px',paddingBottom:'15px' }}>
          Appointment Information
        </Typography> 
      <Grid container spacing={0}>
    <Grid item xs={4}>
    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" color="secondary">SELECT A SPECIALITY</InputLabel>
                            <Select labelId="demo-simple-select-label" color="secondary" id="demo-simple-select" value={appointmentDoctor}   sx={{width: '500px'}} label = "SELECT A DOCTOR" >
                            <MenuItem value="option1">Universal Physician - NISHANTHA GUNASEKARA</MenuItem>
                            <MenuItem value="option2">Pediatrician - BUDDHI MOHOTTI</MenuItem>
                            <MenuItem value="option3">Radiologist - PRESANTHA BANDARA</MenuItem>
                            </Select>
                    </FormControl>
    </Grid>
    <Grid item xs={4}>
    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" color="secondary">SELECT A SPECIALITY</InputLabel>
                            <Select labelId="demo-simple-select-label" color="secondary" id="demo-simple-select" value={appointmentDoctor}   sx={{width: '500px'}} label = "SELECT A DOCTOR" >
                            <MenuItem value="option1">Universal Physician - NISHANTHA GUNASEKARA</MenuItem>
                            <MenuItem value="option2">Pediatrician - BUDDHI MOHOTTI</MenuItem>
                            <MenuItem value="option3">Radiologist - PRESANTHA BANDARA</MenuItem>
                            </Select>
                    </FormControl>
    </Grid>
    <Grid item xs={4}>
    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" color="secondary">SELECT A SPECIALITY</InputLabel>
                            <Select labelId="demo-simple-select-label" color="secondary" id="demo-simple-select" value={appointmentDoctor}   sx={{width: '500px'}} label = "SELECT A DOCTOR" >
                            <MenuItem value="option1">Universal Physician - NISHANTHA GUNASEKARA</MenuItem>
                            <MenuItem value="option2">Pediatrician - BUDDHI MOHOTTI</MenuItem>
                            <MenuItem value="option3">Radiologist - PRESANTHA BANDARA</MenuItem>
                            </Select>
                    </FormControl>
    </Grid>
  </Grid>
      </Box>
      </Grid>
      </Grid>   
  
  );
}
 
   export default UpdateAppointment;


   