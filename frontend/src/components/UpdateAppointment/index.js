import React,{useState,useEffect} from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { 
  Grid,
  Box, 
  Typography, 
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
 
 } from '@mui/material';
 import { useParams } from "react-router-dom";
 import {  toast } from "react-toastify";

function UpdateAppointment() { 
  const [patientName, setPatientName] = useState("");
  const [area, setArea] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  
  const { id } = useParams();


  const handleClose = () => {
  };

  useEffect(() => {
    async function getappointment() {
      try {
        const response = await fetch(`https://mcms_api.mtron.me/get_appointment/${id}`);
        const data = await response.json();

        if (data.length > 0) {
          const appointment = data[0];
          setAppointmentId(appointment.app_id);
          setPatientName(appointment.patient_name);
          setAge(appointment.age);
          setMobile(appointment.mobile);
          setGender(appointment.gender);
          setArea(appointment.area);

        } else {
          toast.error("Appointment not found", { position: toast.POSITION.TOP_RIGHT });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch appointment details", { position: toast.POSITION.TOP_RIGHT });
      }
    }

    getappointment();
  }, [id]);


  const handleUpdateNow = async (event) => {
    event.preventDefault();


    if (
      !appointmentId ||
      !patientName ||
      !age ||
      !mobile ||
      !gender ||
      !area
    ) {
      const errors = {};
  
      if (!appointmentId) {
        errors.appointmentId = "Please enter the appointment id";
      } 
  
      if (!patientName) {
        errors.patientName = "Please enter the patient name";
      }
  
      if (!age) {
        errors.age = "Please enter the patient age";
      }else if (isNaN(age) || parseInt(age) < 1) {
        errors.age = "Please enter a valid age";
      }
  
      if (!mobile) {
        errors.mobile = "Please enter the patient mobile";
      }else if (!/^\d{9}$/.test(mobile)) {
        errors.mobile = "Please enter a valid 10-digit mobile number";
      }
  
      if (!gender) {
        errors.gender = "Please select the patient gender";
      }
  
      if (!area) {
        errors.area = "Please enter the patient area";
      }
  
      setValidationErrors(errors);
      return;
    }
    
    if (
      !patientName ||
      !area ||
      !age ||
      !gender ||
      !mobile ||
      !appointmentId 
    ) {
      toast.error("Please fill all the fields...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }


    const requestBody = {
      app_id: appointmentId,
      patient_name: patientName,
      age: age,
      mobile: mobile,
      gender: gender,
      area: area,
    };

    console.log(requestBody); 

    try{
      const response = await fetch(`https://mcms_api.mtron.me/update_appointment/${requestBody.app_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      
      if (!response.ok) {
        throw new Error("Failed to send Update Appointment details");
      }

      const data = await response.json();
      console.log(data); // Log the response data from the API

      alert("Update Appointment details sent successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to send appointment details");
    }
  };


  return (
    <Grid container spacing={3}>
    <Grid item xs={12}>
      <Box sx={{ width: '100%', height: 100, backgroundColor: '#ce93d8' }}>
        <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', paddingTop: '40px', textAlign: 'left', paddingLeft: '90px' }}>
          UPDATE APPOINTMENT
        </Typography>
        <CloseOutlinedIcon sx={{ position: 'absolute', top: '80px', right: '20px', color: 'white' }} onClick={handleClose} />
      </Box>
    </Grid>
    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '1200px', height: 640, backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
        <Typography  component="div" sx={{ color: 'purple', fontWeight: 'bold', textAlign: 'center',fontSize: '40px',paddingBottom:'10px',paddingTop:'10px' }}>
          Appointment Information
        </Typography> 
      <Grid  item xs={4}container spacing={{ xs: 2 }}>
    <Grid item xs={3} >
    <TextField
            id="appointment id"
            label=" APPOINTMENT ID"
            value={appointmentId}
            onChange={(event) => {setAppointmentId(event.target.value);}}
            variant="outlined"
            color="secondary"
            sx={{ width: '130%' , marginBottom: '30px',marginLeft: '180px'}}
            disabled
            error={!!validationErrors.appointmentId} // Set error prop
            helperText={validationErrors.appointmentId}
          />
        {validationErrors.appointmentId && (
    <Typography variant="body2" color="error" sx={{ marginLeft: '220px' , width: '100%',textAlign: 'center'}}>
      {validationErrors.appointmentId}
    </Typography>
  )}  
    </Grid>
    {/* <Grid item xs={5}>
    <FormControl fullWidth sx={{marginLeft: '280px'}} >
      <InputLabel id="demo-simple-select-label" color="secondary">APPOINTMENT SPECIALITY</InputLabel>
          <Select labelId="demo-simple-select-label" color="secondary" id="demo-simple-select" value={appointmentDoctor}  onChange={handleOptionChange} sx={{width: '425px'}} label = "SELECT A DOCTOR" >
              <MenuItem value="Nishantha Gunasekara">Universal Physician - NISHANTHA GUNASEKARA</MenuItem>
              <MenuItem value="Buddhi Mohotti">Pediatrician - BUDDHI MOHOTTI</MenuItem>
              <MenuItem value="Presantha Bandara">Radiologist - PRESANTHA BANDARA</MenuItem>
              </Select>
              {validationErrors.appointmentDoctor && (
                <Typography variant="body2" color="error" sx={{ marginLeft: '100px',margingBottom: '20px'}} >{validationErrors.appointmentDoctor}</Typography>
              )}
    </FormControl>
    </Grid> */}
  </Grid>
    <cross >
     <Box display="flex" justifyContent="center" alignItems="center" pb={1}>
            <Box position="relative" width={1000} height={2} bgcolor="#bdbdbd" />
          </Box>
          </cross>
      <Typography  component="div" sx={{ color: 'purple', fontWeight: 'bold', paddingTop: '5px',paddingBottom: '5px', textAlign: 'center',fontSize: '40px' }}>
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
                error={!!validationErrors.patientName}
                helperText={validationErrors.patientName}
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
                error={!!validationErrors.age}
                helperText={validationErrors.age}
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
                error={!!validationErrors.mobile}
                helperText={validationErrors.mobile}
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
                onChange={(event) => {setGender(event.target.value);}}
                sx={{ width: '90%',marginBottom: '5px' }}>

        <FormControlLabel 
          value="female" 
          control={<Radio />} 
          label="Female"
          checked={gender === 'female'} 
          sx={{ marginRight: '100px' }}/>
        <FormControlLabel 
          value="male" 
          control={<Radio />} 
          label="Male"  
          checked={gender === 'male'}
          />
          {validationErrors.gender && (
                <Typography variant="body2" color="error" sx={{ marginLeft: '100px',margingTop: '5px'}} >{validationErrors.gender}</Typography>
              )}
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
                error={!!validationErrors.area}
                helperText={validationErrors.area}
                sx={{ width: '90%' , marginBottom: '10px'}}
        />
          </Grid>
          <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'center',paddingTop: '20px'}} >
          <Button variant="contained" size="medium" color="secondary" sx={{ width: '1075px', height: '50px',fontSize: '24px' }}onClick={handleUpdateNow}>Update Now</Button>
            </Grid>     
      </Box>
      </Grid>
      </Grid> 
  
  );
}
 

export default UpdateAppointment;

   