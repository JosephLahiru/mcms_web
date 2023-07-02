import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { 
  Grid,
  Box, 
  Typography,
  handleClose,
  style,
  Divider,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Modal,
  handleOpen,
  open,



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
    <Grid container spacing={3}>
    <Grid item xs={12}>
      <Box sx={{ width: '100%', height: 100, backgroundColor: '#ce93d8' }}>
        <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', paddingTop: '50px', textAlign: 'left', paddingLeft: '90px' }}>
          UPDATE INFORMATION
        </Typography>
        <CloseOutlinedIcon sx={{ position: 'absolute', top: '80px', right: '20px', color: 'white' }} />
      </Box>
    </Grid>
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '1200px', height: 170, backgroundColor: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
      <Grid item xs={12} >
      <Box sx={{ width: '100%', height: 10 ,marginBottom: '160px'}}>
        <Typography  component="div" sx={{ color: 'purple', fontWeight: 'bold', paddingTop: '20px', textAlign: 'center',fontSize: '40px' }}>
          Appointment Information
        </Typography>  
      </Box>
          </Grid>
      </Box>
    </Grid>
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '1200px', height: 470, backgroundColor: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Grid container spacing={0}  >
      <Grid item xs={12} >
      <Box sx={{ width: '100%', height: 5 ,marginBottom: '80px'}}>
        <Typography  component="div" sx={{ color: 'purple', fontWeight: 'bold', paddingTop: '20px', textAlign: 'center',fontSize: '40px' }}>
          Patient Information
        </Typography>  
      </Box>
          </Grid>
      <Grid  item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} >
        <TextField
          id="patient-name"
          label="Patient Name"
          value={patientName}
          onChange={(event) => setPatientName(event.target.value)}
          variant="outlined"
          color="secondary"
          sx={{ width: '90%' , marginBottom: '20px',marginTop: '10px'}}
        />
          </Grid>
        <Grid item xs={12} sm={12} container spacing={8} >
        <Grid item xs={6}  sx={{ display: 'flex', justifyContent: 'right' }}>
          <TextField
           id="age"
           label="Patient Age"
           value={age}
           onChange={(event) => setAge(event.target.value)}
           variant="outlined"
           color="secondary"
           sx={{ width: '90%' , marginBottom: '10px'}}
         /> 
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'left' }} >
          <TextField 
           id="mobile"
           label="Patient Mobile"
           value={mobile}
           onChange={(event) => setMobile(event.target.value)}
           variant="outlined"
           color="secondary"
           sx={{ width: '90%' , marginBottom: '10px'}}
         />
        </Grid>
        </Grid>
          <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}  >
          <RadioGroup
      row
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="row-radio-buttons-group"
      value={gender} 
      onChange={(event) => setGender(event.target.value)}
      sx={{ width: '90%',marginBottom: '10px' }}

    >
      <FormControlLabel value="female" control={<Radio />} label="Female"  sx={{ marginRight: '100px' }}/>
      <FormControlLabel value="male" control={<Radio />} label="Male"  />
    </RadioGroup>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} >
        <TextField
          id="area"
          label=" Patient Area"
          value={area}
          onChange={(event) => setArea(event.target.value)}
          variant="outlined"
          color="secondary"
          sx={{ width: '90%' , marginBottom: '20px'}}
        />
          </Grid>
          <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'center'}} >
          <Button variant="contained" size="medium" color="secondary" sx={{ width: '1075px', height: '50px',fontSize: '24px' }} onClick={handleOpen}Open modal>Update Now</Button>
          <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="Patient Information Title"
                aria-describedby="Patient Information Description "
              >
                <Box sx={style}>
                  <Typography id="Patient Information Title" variant="h6" component="h2" sx={{ color: 'black', fontWeight: 'bold',fontSize: '24px'}}>
                  Patient Information Title
                  </Typography>
                  <Typography id="Patient Information Description" sx={{ mt: 2 ,fontWeight: 'bold' }}>
                    NAME: {patientName ? `${patientName}` : ''} 
                  </Typography>
                  <Typography id="Patient Information Description" sx={{ mt: 2 ,fontWeight: 'bold' }}>
                    AGE: {age ? `${age}` : ''} 
                  </Typography>
                  <Typography id="Patient Information Description" sx={{ mt: 2 ,fontWeight: 'bold'}}>
                    MOBILE: {mobile ? `${mobile}` : ''} 
                  </Typography>
                  <Typography id="Patient Information Description" sx={{ mt: 2 ,fontWeight: 'bold'}}>
                    GENDER: {gender ? `${gender}` : ''} 
                  </Typography>
                  <Typography id="Successfull Message" sx={{ mt: 2 ,color: '#9c27b0', fontWeight: 'bold',fontSize: '20px',textAlign: 'center'}}  >
                    SUCCESSFULLY!!!
                  </Typography>
                </Box>
              </Modal>
            </Grid> 
        </Grid>
      </Box>
  </Grid>
   </Grid>
  
  );
}
 
   export default UpdateAppointment;


   