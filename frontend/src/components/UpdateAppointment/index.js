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
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Modal,



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

  const handleOptionChange = (event) => {
    setAppointmentDoctor(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  return (
    <Grid container spacing={4}>
    <Grid item xs={12}>
      <Box sx={{ width: '100%', height: 100, backgroundColor: '#ce93d8' }}>
        <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', paddingTop: '40px', textAlign: 'left', paddingLeft: '90px' }}>
          UPDATE INFORMATION
        </Typography>
        <CloseOutlinedIcon sx={{ position: 'absolute', top: '80px', right: '20px', color: 'white' }} />
      </Box>
    </Grid>
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '1200px', height: 650, backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
        <Typography  component="div" sx={{ color: 'purple', fontWeight: 'bold', textAlign: 'center',fontSize: '40px',paddingBottom:'30px',paddingTop:'20px' }}>
          Appointment Information
        </Typography> 
      <Grid container spacing={{ xs: 2 }}>
    <Grid item xs={3}>
    <TextField
            id="appointment number"
            label=" APPOINTMENT NUMBER"
            value={appointmentNumber}
            onChange={(event) => setAppointmentNumber(event.target.value)}
            variant="outlined"
            color="secondary"
            sx={{ width: '70%' , marginBottom: '20px'}}
          />
    </Grid>
    <Grid item xs={6}>
    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" color="secondary">APPOINTMENT DOCTOR</InputLabel>
                            <Select labelId="demo-simple-select-label" color="secondary" id="demo-simple-select" value={appointmentDoctor}  onChange={handleOptionChange} sx={{width: '425px'}} label = "SELECT A DOCTOR" >
                            <MenuItem value="option1">Universal Physician - NISHANTHA GUNASEKARA</MenuItem>
                            <MenuItem value="option2">Pediatrician - BUDDHI MOHOTTI</MenuItem>
                            <MenuItem value="option3">Radiologist - PRESANTHA BANDARA</MenuItem>
                            </Select>
                    </FormControl>
    </Grid>
    <Grid item xs={2}>
      <InputLabel id="demo-simple-select-label" color="secondary">APPOINTMENT DATE</InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                size="small"
                sx={{ width: "100%" }}
                value={ExpireDate}
                onChange={(date) => setExpireDate(date)}
                label="Expire Date"
                slotProps={{ textField: { size: 'small' } }}
              />
            </LocalizationProvider>
    </Grid>
  </Grid>
  <Typography  component="div" sx={{ color: 'purple', fontWeight: 'bold', paddingTop: '40px',paddingBottom: '20px', textAlign: 'center',fontSize: '40px' }}>
          Patient Information
        </Typography>  
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
                    UPDATE SUCCESSFULLY!!!
                  </Typography>
                </Box>
              </Modal>
            </Grid> 
      </Box>
      </Grid>
      </Grid> 
  
  );
}
 
   export default UpdateAppointment;


   