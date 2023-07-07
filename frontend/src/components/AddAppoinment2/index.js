import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Divider,
  TextField,
  Radio,
  FormControlLabel,
  RadioGroup,
  Button,
  Modal,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function AddAppointment2() {

    const [patientName, setPatientName] = useState("");
    const [appointmentNumber, setAppointmentNumber] = useState("");
    const [appointmentDoctor, setAppointmentDoctor] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [age, setAge] = useState("");
    const [mobile, setMobile] = useState("");
    const [area, setArea] = useState("");
    const [gender, setGender] = useState("");
    const [open, setOpen] = React.useState(false); 
    const [validationErrors, setValidationErrors] = useState({}); 
    const location = useLocation();


    useEffect(() => {
      if (location.state) {
        const { appointmentDoctor, appointmentNumber, appointmentDate } = location.state;
        setAppointmentDoctor(appointmentDoctor);
        setAppointmentNumber(appointmentNumber);
        setAppointmentDate(appointmentDate);
      }
    }, [location.state]);
    

    const handleOpen = () => {
    if (validateForm()) {
      setOpen(true);
    } else {
      setOpen(false);
    }
      };
 
  const validateForm = () => {
    const errors = {};
    let formIsValid = true;

    if (patientName.trim() === "") {
      errors.patientName = "Please enter the patient name";
      formIsValid = false;
    }

    if (age.trim() === "") {
      errors.age = "Please enter the patient age";
      formIsValid = false;
    }

    if (mobile.trim() === "") {
      errors.mobile = "Please enter the patient mobile";
      formIsValid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      errors.mobile = "Please enter a valid 10-digit mobile number";
      formIsValid = false;
    }

    if (area.trim() === "") {
      errors.area = "Please enter the patient area";
      formIsValid = false;
    }

    if (!gender) {
      errors.gender = "Please select the patient gender";
      formIsValid = false;
    }

    setValidationErrors(errors);
    return formIsValid;
  };

  const handleClose = () => {
    setOpen(false);
  };

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

    const handleBOOKNOW = async (event) => {
      event.preventDefault();
    
      console.log("Patient Name:", patientName);
      console.log("Area:", area);
      console.log("Age", age);
      console.log("Gender:", gender);
      console.log("Mobile:", mobile);
      console.log("Appointment Number:", appointmentNumber);
      console.log("Appointment Doctor:", appointmentDoctor);
      console.log("Appointment Date:", appointmentDate);
    
      if (
        !patientName ||
        !area ||
        !age ||
        !gender ||
        !mobile ||
        !appointmentNumber ||
        !appointmentDoctor ||
        !appointmentDate
      ) {
        toast.error("Please fill all the fields...", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
    
      const requestBody = {
        patient_name: patientName,
        area: area,
        age: age,
        gender: gender,
        mobile: mobile,
        app_num: appointmentNumber,
        cd_id: appointmentDoctor,
        app_date: appointmentDate,
      };
    
      console.log(requestBody);
    
      try {
        const response = await fetch(
          "https://mcms_api.mtron.me/set_appointment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
    
        if (!response.ok) {
          throw new Error("Failed to send appointment details");
        }
    
        const data = await response.json();
        console.log(data); // Log the response data from the API
    
        alert("Appointment details sent successfully");
      } catch (error) {
        console.error(error);
        alert("Failed to send appointment details");
      }
    };
    
  return (
    <Grid container spacing={2.5}>
      <Grid item xs={12}>
        <Box sx={{ width: '100%', height: 175, backgroundColor: '#ce93d8' }}>
          <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', paddingTop: '50px', textAlign: 'left', paddingLeft: '90px' }}>
            BOOK A CHANNEL
          </Typography>
          <CloseOutlinedIcon sx={{ position: 'absolute', top: '80px', right: '20px', color: 'white' }} onClick={handleClose}/>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '1200px', height: 100, backgroundColor: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
          <Grid container spacing={0}>
            <Grid item xs={3.5}>
              <Typography variant="h7" component="div" sx={{ color: 'black', paddingTop: '20px', textAlign: 'left', paddingLeft: '20px'  }}>
                Doctor Name
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'left', paddingLeft: '20px' }}>
                {appointmentDoctor}
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid item xs={2.5}>
              <Typography variant="h7" component="div" sx={{ color: 'black', paddingTop: '20px', textAlign: 'left', paddingLeft: '20px' }}>
                Date
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: 'black', fontWeight: 'bold', textAlign: 'left', paddingLeft: '20px' }}>
                {appointmentDate.slice(0,15)}
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
                Channeling Fee
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: 'purple', fontWeight: 'bold', textAlign: 'left', paddingLeft: '20px' }}>
                LKR 4,200.00
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '1200px', height: 470, backgroundColor: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid container spacing={1}>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} >
          <TextField
            id="patient-name"
            label="Patient Name"
            value={patientName}
            onChange={(event) => setPatientName(event.target.value)}
            variant="outlined"
            color="secondary"
            error={!!validationErrors.patientName}
            helperText={validationErrors.patientName}
            sx={{ width: '90%' , marginBottom: '20px'}}
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
              onChange={(event) => setGender(event.target.value)}
              sx={{ width: '90%',marginBottom: '10px' }}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female"  sx={{ marginRight: '80px'}}/>
        <FormControlLabel value="male" control={<Radio />} label="Male"  />
        {validationErrors.gender && (
        <Typography variant="body2" color="error" sx={{ marginLeft: '100px',margingTop: '10px'}} >{validationErrors.gender}</Typography>
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
            sx={{ width: '90%' , marginBottom: '20px'}}
          />
            </Grid>
            <Grid item xs={12}  sx={{ display: 'flex', justifyContent: 'center'}} >
            <Button variant="contained" size="medium" color="secondary" sx={{ width: '1075px', height: '50px',fontSize: '24px' }} onClick={handleOpen}>Book Now</Button>
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

export default AddAppointment2;
 
