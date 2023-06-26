import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { 
  Grid, 
  TextField, 
  Button, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  FormLabel, 
  Box, 
   } from '@mui/material';


function AddAppointment2() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNic] = useState("");
  const [email,setEmail] =useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentDoctor, setAppointmentDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  function generateAppointmentTimeOptions() {
    const appointmentTimes = [
      '4:00pm', '4:15pm', '4:30pm', '4:45pm', '5:00pm', '5:15pm', '5:30pm', '5:45pm',
      '6:00pm', '6:15pm', '6:30pm', '6:45pm', '7:00pm', '7:15pm', '7:30pm', '7:45pm',
      '8:00pm'
    ];
  
    return appointmentTimes.map((time, index) => (
      <option key={index} value={time} disabled={appointmentTime === time}>
        {time}
      </option>
    ));
  }  
  

  function getAtId(doctorType) {
    return fetch('https://mcms_api.mtron.me/get_app_id/' + doctorType)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch at_id');
        }
        return response.json();
      })
      .then((data) => {
        const atIdValue = data.length > 0 ? data[0].at_id : '';
        return atIdValue;
      })
      .catch((error) => {
        console.error('Error:', error);
        return '';
      });
  }  

  function getCdId(doctorType) {
    return fetch('https://mcms_api.mtron.me/get_cd_id/' + doctorType)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch cd_id');
        }
        return response.json();
      })
      .then((data) => {
        const cdIdValue = data.length > 0 ? data[0].cd_id : '';
        return cdIdValue;
      })
      .catch((error) => {
        console.error('Error:', error);
        return '';
      });
  } 

  function getATMId(ATMType) {
    return fetch('https://mcms_api.mtron.me/get_atm_id/' + ATMType)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch atm_id');
        }
        return response.json();
      })
      .then((data) => {
        const aTMIdValue = data.length > 0 ? data[0].atm_id : '';
        return aTMIdValue;
      })
      .catch((error) => {
        console.error('Error:', error);
        return '';
      });
  } 

  const handleSubmit = async (event) =>{
    event.preventDefault();

    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Address:", address);
    console.log("Age",age);
    console.log("Gender:", gender);
    console.log("NIC:", nic);
    console.log("Email:", email);
    console.log("Contact Number:", contactNumber);
    console.log("Appointment Number:", appointmentNumber);
    console.log("Appointment Type:", appointmentType);
    console.log("Appointment Doctor:", appointmentDoctor);
    console.log("Appointment Date:", appointmentDate);
    console.log("Appointment Time:", appointmentTime);

    if ( !firstName || !lastName || !address || !age || !gender || !nic || !contactNumber || !appointmentNumber || !appointmentType || !appointmentDoctor || !appointmentDate || !appointmentTime) {
      toast.error('Please fill all the fields...', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

   
    // NIC validation
    const nicRegex = /^[0-9]{9}[VXvx]$/;
    if (!nicRegex.test(nic)) {
      setError(true);
      toast.error('Invalid NIC number', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setError(true);
      toast.error('Invalid email address', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    // Contact number validation
    const contactNumberRegex = /^[0-9]{10}$/;
    if (!contactNumberRegex.test(contactNumber)) {
      setError(true);
      toast.error('Invalid contact number', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      nic: nic,
      address: address,
      age: age,
      gender: gender,
      contact_num: contactNumber,
      ...(email && { email: email }),
      app_num: appointmentNumber,
      at_id: await getAtId(appointmentType),
      cd_id: await getCdId(appointmentDoctor),
      app_date: appointmentDate,
      atm_id: await getATMId(appointmentTime),
    };

    console.log(requestBody)

    try {
      const response = await fetch("https://mcms_api.mtron.me/set_appointment", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to send appointment details');
      }

      alert('Appointment details sent successfully');
      handleReset();
    } catch (error) {
      console.error(error);
      alert('Failed to send appointment details');
    }

  }

  const handleReset = () => {
     setAppointmentNumber(""); 
     setFirstName(""); 
     setLastName(""); 
     setAddress(""); 
     setAge(""); 
     setGender(""); 
     setNic(""); 
     setEmail(""); 
     setContactNumber(""); 
     setAppointmentType(""); 
     setAppointmentDoctor(""); 
     setAppointmentDate(""); 
     setAppointmentTime("");
     setError(false);
    };

    
  return (
      <Grid container spacing={5} sx={{backgroundColor:'purple'}}>
  <Grid item xs={4} sx={{ paddingLeft: '50px', backgroundColor:'#ba68c8' , margin:'auto'}}>
    <br/> <br/> <br/>
    <h1>Add Appointment</h1>
    <Box sx={{backgroundColor:'#f3e5f5',marginBottom:'20px',padding:'20px',borderRadius:'10px',marginLeft:'30px', marginRight:'30px',height:'auto', marginTop:'50px'}} >
    <FormControl onSubmit={handleSubmit} sx={{paddingLeft:'60px'}}>
      <Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField label="Enter First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Enter First Name" sx={{width:'300px'}} size="small"/>
        {error && firstName.length <= 0 ?
          <InputLabel class='input-validation-error'>First Name can't be empty</InputLabel> : ""}
      </Grid>
      <Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField label="Enter Last Name" sx={{width:'300px'}} size="small" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Enter Last Name" />
        {error && lastName.length <= 0 ?
        <InputLabel class='input-validation-error'>Last Name can't be empty</InputLabel> : ""}
      </Grid>
      <Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField label="Enter Age" sx={{width:'300px'}} size="small" value={age} onChange={(event) => setAge(event.target.value)} placeholder="Enter Age" />
        {error && age.length <= 0 ?
              <InputLabel class='input-validation-error'>Age can't be empty</InputLabel> : ""}
      </Grid>
      <Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField multiline rows={3} fullWidth label="Enter Address" sx={{width:'300px'}} size="small"value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter Address" />
        {error && address.length <= 0 ?
              <InputLabel class='input-validation-error'>Address can't be empty</InputLabel> : ""}
      </Grid>
      <Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField label="Enter NIC" sx={{width:'300px'}} size="small" value={nic} onChange={(event) => setNic(event.target.value)} placeholder="Enter NIC" />
        {error && nic.length <= 0 ?
              <InputLabel class='input-validation-error'>NIC can't be empty</InputLabel> : ""}
      </Grid>
      <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
   <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
  >
    <FormControlLabel value="female" control={<Radio />} label="Female" />
    <FormControlLabel value="male" control={<Radio />} label="Male" />
    <FormControlLabel value="other" control={<Radio />} label="Other" />
  </RadioGroup>
  {error && address.length <= 0 ?
<InputLabel class='input-validation-error'>Address can't be empty</InputLabel> : ""}
</FormControl>
<Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField label="Enter Email" sx={{width:'300px'}} size="small" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email Address" />
        {error && email.length <= 0 ?
         <InputLabel class='input-validation-error'>Email can't be empty</InputLabel> : ""}
      </Grid>
   
    <Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField label="Enter Contact Number" sx={{width:'300px'}} size="small" value={contactNumber} onChange={(event) => setContactNumber(event.target.value)} placeholder="Enter Contact Number" />
        {error && contactNumber.length <= 0 ?
              <InputLabel class='input-validation-error'>Contact Number can't be empty</InputLabel> : ""}
      </Grid>
      <Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField label="Enter Appointment Number" sx={{width:'300px'}} size="small" value={appointmentNumber} onChange={(event) => setAppointmentNumber(event.target.value)} placeholder="Enter Appointment number" />
      </Grid> <br/>
      <Grid>
      <InputLabel id="demo-simple-select-label">Appointment Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    sx={{width:'300px'}} 
    size="small"
    value={appointmentType}
    label="Select Appointment Type"
  
  >
    <MenuItem value={10}>Consultation</MenuItem>
    <MenuItem value={20}>Doctor Check-up</MenuItem>
    <MenuItem value={30}>Medical Examination</MenuItem>
    <MenuItem value={20}>Result Analysis</MenuItem>
    <MenuItem value={30}>Scanner</MenuItem>
  </Select>
  {error && appointmentType.length <= 0 ?
  <InputLabel class='input-validation-error'>Please Select Appointment Type</InputLabel> : ""}
  </Grid>
  <br/>
   <Grid>
   <InputLabel id="demo-simple-select-label">Appointment Doctor</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    sx={{width:'300px'}} 
    size="small"
    value={appointmentDoctor}
    label="Select Appointment Doctor"
  
  >
    <MenuItem value={10}>Universal Physician</MenuItem>
    <MenuItem value={20}>Pediatrician</MenuItem>
    <MenuItem value={30}>Radiologist</MenuItem>
  </Select>
  {error && appointmentDoctor.length <= 0 ?
  <InputLabel class='input-validation-error'>Please Select Appointment Doctor</InputLabel> : ""}
   </Grid>
   <br/>
   <Grid>
   <InputLabel id="demo-simple-select-label">Appointment Time</InputLabel>
        <Select  sx={{width:'300px'}} size="small" value={appointmentTime} onChange={(event) => setAppointmentTime(event.target.value)}>
          <MenuItem value={""}></MenuItem>
          {generateAppointmentTimeOptions()}
        </Select>
   </Grid>
   {error && appointmentTime.length <= 0 ?
  <InputLabel class='input-validation-error'>Please Select Appointment Time</InputLabel> : ""}
  <br/>
   <Grid >
   {/* <InputLabel id="demo-simple-select-label">Appointment Date</InputLabel> */}
   <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{width:'300px'}} size="small"
                value={appointmentDate}
                onChange={(date) => setAppointmentDate(date)}
              />
            </LocalizationProvider> 
            {error && appointmentDate.length <= 0 ?
  <InputLabel class='input-validation-error'>Please Select Appointment Date</InputLabel> : ""}
   </Grid>
   </FormControl>
   <br/><br/>
   <Grid sx={{paddingLeft:'40px'}}>
      <Button sx={{ width: '300px' }} variant="contained" onClick={handleReset}>Reset</Button>
      </Grid>
      <br/>
      <Grid sx={{paddingLeft:'40px'}}>
      <Button sx={{ width: '300px' }} variant="contained" onClick={handleSubmit}>Submit</Button>
    </Grid>
    <br/>
    <Grid sx={{paddingLeft:'40px'}}>
      <Button sx={{ width: '300px' }} variant="contained" onClick={() => navigate("/view_appointment")}>View Appointment</Button>
    </Grid>
    </Box>
  </Grid>
  <Grid item xs={8}></Grid>
 </Grid> 
  );
}

export default AddAppointment2;

