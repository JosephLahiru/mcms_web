import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { Grid, TextField, Button, Radio, RadioGroup, FormControlLabel, Select, MenuItem, FormControl, InputLabel, TextareaAutosize,FormLabel } from '@mui/material';


function AddAppointment() {
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
    <>
      <Grid container spacing={5}>
  <Grid item xs={4} sx={{ padding: '10px' }}>
    <h1>Add Appointment</h1>
    <FormControl onSubmit={handleSubmit}>
      <Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField label="Enter First Name" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Enter First Name" />
      </Grid>
      <Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField label="Enter Last Name" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Enter Last Name" />
      </Grid>
      <Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField label="Enter Age" value={age} onChange={(event) => setAge(event.target.value)} placeholder="Enter Age" />
      </Grid>
      <Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField multiline rows={3} fullWidth label="Enter Address" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter Address" />
      </Grid>
      <Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField label="Enter NIC" value={nic} onChange={(event) => setNic(event.target.value)} placeholder="Enter NIC" />
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
</FormControl>
<Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField label="Enter Email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email Address" />
      </Grid>
    </FormControl>
    <Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField label="Enter Contact Number" value={contactNumber} onChange={(event) => setContactNumber(event.target.value)} placeholder="Enter Contact Number" />
      </Grid>
      <Grid item xs={12} sx={{ margin: '10px 0' }}>
        <TextField label="Enter Appointment Number" value={appointmentNumber} onChange={(event) => setAppointmentNumber(event.target.value)} placeholder="Enter Appointment number" />
      </Grid> 
      <Grid>
      <InputLabel id="demo-simple-select-label">Appointment Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    sx={{ width: '42%' }}
    value={appointmentType}
    label="Select Appointment Type"
  
  >
    <MenuItem value={10}>Consultation</MenuItem>
    <MenuItem value={20}>Doctor Check-up</MenuItem>
    <MenuItem value={30}>Medical Examination</MenuItem>
    <MenuItem value={20}>Result Analysis</MenuItem>
    <MenuItem value={30}>Scanner</MenuItem>
  </Select>
  </Grid>
   <Grid>
   <InputLabel id="demo-simple-select-label">Appointment Doctor</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    sx={{ width: '42%' }}
    value={appointmentDoctor}
    label="Select Appointment Doctor"
  
  >
    <MenuItem value={10}>Universal Physician</MenuItem>
    <MenuItem value={20}>Pediatrician</MenuItem>
    <MenuItem value={30}>Radiologist</MenuItem>
  </Select>
   </Grid>
   <Grid>
        <label>Appointment Time</label><br/>
        <Select  sx={{ width: '42%' }} value={appointmentTime} onChange={(event) => setAppointmentTime(event.target.value)}>
          <MenuItem value={""}>Select Appointment Time:</MenuItem>
          {generateAppointmentTimeOptions()}
        </Select>
   </Grid>
   <Grid >
      <button class="btn btn-primary btn-sm" onClick={handleReset}>Reset</button>
      </Grid>
      <Grid>
      <button class="btn btn-primary btn-sm" onClick={handleSubmit}>Submit</button>
    </Grid>
    <Grid>
      <button class="btn btn-primary btn-sm" onClick={handleSubmit}>Submit</button>
    </Grid>
  </Grid>
  <Grid item xs={8}></Grid>
</Grid>
    </>
  );
}

export default AddAppointment;