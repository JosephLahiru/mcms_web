import React, { useState, useEffect } from "react";
import { Grid, 
  Box, 
  Typography, 
  TextField, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Button, 
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function UpdateAppointment() {
  const [patientName, setPatientName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNIC] = useState("");
  const [mobile, setMobile] = useState("");
  const [appointmentId, setAppointmentId] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [patientTitle, setPatientTitle] = useState('');

  const { id } = useParams();

  const handleClose = () => {
    setOpen(false);
    navigate(-1);

  };

  const handlecancel = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    async function getAppointment() {
      try {
        const response = await fetch(`https://mcms_api.mtron.me/get_appointment/${id}`);
        const data = await response.json();

        if (data.length > 0) {
          const appointment = data[0];
          setAppointmentId(appointment.app_id);
          setPatientName(appointment.patient_name);
          setAge(appointment.age);
          setNIC(appointment.nic)
          setMobile(appointment.mobile);
          setGender(appointment.gender);
          setAddress(appointment.area);
        } else {
          toast.error("Appointment not found", { position: toast.POSITION.TOP_RIGHT });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch appointment details", { position: toast.POSITION.TOP_RIGHT });
      }
    }

    getAppointment();
  }, [id]);

    const handleUpdateNow = async (event) => {
      event.preventDefault();
  
      const errors = {};
  
      if (!appointmentId) {
        errors.appointmentId = "Please enter the appointment id";
      }
  
      if (!patientName) {
        errors.patientName = "Please enter the patient name";
      } else if (patientName.length > 100) {
        errors.patientName = "Patient name must be less than 100 characters";
      }
  
      if (!age) {
        errors.age = "Please enter the patient age";
      } else if (isNaN(age) || parseInt(age) < 1 || parseInt(age) < 0) {
        errors.age = "Please enter a valid age";
      }
  
    if (!mobile) {
      errors.mobile = "Please enter the mobile number";
    }else if (!/^\d{9,10}$/.test(mobile)) {
      errors.mobile = "Please enter a valid 9 or 10-digit mobile number";
    } 
        
      if (!gender) {
        errors.gender = "Please select the patient gender";
      }
  
      if (!address) {
        errors.address = "Please enter the patient address";
      }else if (address.trim().length > 150) {
        errors.address = "The are must not exceed 150 characters";
  
      }

      if (!nic) {
        errors.nic = "Please select the patient's NIC";
      
      } else {
        // Remove any spaces or dashes from the NIC
        setNIC(nic.replace(/[\s-]/g, ''));
      
        // Check the length of the NIC
        if (nic.length !== 10 && nic.length !== 12) {
          errors.nic = "Invalid NIC length";
         
        } else {
          // Regular expression pattern for NIC validation
          const nicPattern = /^[0-9]{9}[vV]|[12][0-9]{11}$/;
      
          // Check if the NIC matches the pattern
          if (!nicPattern.test(nic)) {
            errors.nic = "Invalid NIC format";
           
          } else {
            // Validate the last character of the NIC
            const lastDigit = nic.charAt(nic.length - 1);
            if (nic.length === 10 && lastDigit.toLowerCase() !== 'v') {
              errors.nic = "Invalid last character for old NIC format";
             
            } else if (nic.length === 12 && !/[0-9]/.test(lastDigit)) {
              errors.nic = "Invalid last character for new NIC format";
             
            }
          }
        }
      }
  
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }
  

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const requestBody = {
      app_id: appointmentId,
      patient_name: patientName,
      age: age,
      mobile: mobile,
      gender: gender,
      nic:nic,
      area: address,
    };

    try {
      const response = await fetch(`https://mcms_api.mtron.me/update_appointment/${requestBody.app_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setSuccess(true);
        setOpen(true);
        return;
      }

      const responseData = await response.json();
      const errorMessage = responseData.message || "Failed to send appointment details!!!";
      setErrorMessage(errorMessage);
      setOpen(true);
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to send appointment details!!!");
      setOpen(true);
    }
  };

  const handleOptionChange = (event) => {
    // const selectedDoctor = event.target.value;
    // const [doctorName, doctorID] = selectedDoctor.split(',');
    // setAppointmentDoctor(doctorName);

    // if (selectedDoctor) {
    //   navigate('/add_appointment1', { state: { selectedDoctor: doctorName, selectedDoctorID: doctorID } });
    // }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ width: "100%", height: 100, backgroundColor: "#ce93d8" }}>
          <Typography variant="h4" component="div" sx={{ color: "white", fontWeight: "bold", paddingTop: "40px", textAlign: "left", paddingLeft: "90px" }}>
            UPDATE APPOINTMENT
          </Typography>
          <CloseOutlinedIcon sx={{ position: "absolute", top: "80px", right: "20px", color: "white" }} onClick={handleClose} />
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "1200px", height: 640, backgroundColor: "#f5f5f5", borderRadius: "10px" }}>
          <Typography component="div" sx={{ color: "purple", fontWeight: "bold", textAlign: "center", fontSize: "30px", paddingBottom: "30px", paddingTop: "10px" }}>
            Appointment Information
          </Typography>
          <Grid item xs={4} container spacing={{ xs: 2 }}>
            <Grid item xs={3}>
              <TextField
                id="appointment-id"
                label=" APPOINTMENT ID"
                value={appointmentId}
                onChange={(event) => setAppointmentId(event.target.value)}
                variant="outlined"
                color="secondary"
                sx={{ width: "130%", marginBottom: "30px", marginLeft: "400px" }}
                disabled
                error={!!validationErrors.appointmentId}
                helperText={validationErrors.appointmentId}
              />
              {validationErrors.appointmentId && (
                <Typography variant="body2" color="error" sx={{ marginLeft: "220px", width: "100%", textAlign: "center" }}>
                  {validationErrors.appointmentId}
                </Typography>
              )}
            </Grid>
          </Grid>
          <cross>
            <Box display="flex" justifyContent="center" alignItems="center" pb={1}>
              <Box position="relative" width={1000} height={2} bgcolor="#bdbdbd" />
            </Box>
          </cross>
          <Typography component="div" sx={{ color: "purple", fontWeight: "bold", paddingTop: "5px", paddingBottom: "5px", textAlign: "center", fontSize: "30px" }}>
            Patient Information
          </Typography>
          <Grid item xs={12} sm={12} container spacing={8}>
              <Grid item xs={2.5} sx={{ display: "flex", justifyContent: "right" }}>
              <FormControl fullWidth>
                  <InputLabel id="select-doctor" color="secondary"  sx={{ marginLeft: '57px' }}>
                    Select a Title
                  </InputLabel>
                  <Select
                    labelId="select-title"
                    id="select-title"
                    color="secondary"
                    sx={{ width: '200px',marginLeft: '57px' }}
                    label="SELECT A TITLE">
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={9.5} sx={{ display: "flex", justifyContent: "left"  }}>
              <TextField
                id="patient-name"
                label="Patient Name"
                value={patientName}
                onChange={(event) => setPatientName(event.target.value)}
                variant="outlined"
                color="secondary"
                error={!!validationErrors.patientName}
                helperText={validationErrors.patientName}
                sx={{ width: "90%", marginBottom: "20px",marginLeft: "35px"}}
              />
              </Grid>
            </Grid>
          <Grid item xs={12} sm={12} container spacing={8}>
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "right" }}>
              <TextField
                id="age"
                label="Patient Age"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                variant="outlined"
                color="secondary"
                error={!!validationErrors.age}
                helperText={validationErrors.age}
                sx={{ width: "90%", marginBottom: "10px" }}
              />
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", justifyContent: "left" }}>
              <TextField
                id="mobile"
                label="Patient Mobile"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)}
                variant="outlined"
                color="secondary"
                error={!!validationErrors.mobile}
                helperText={validationErrors.mobile}
                sx={{ width: "90%", marginBottom: "10px" }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
              sx={{ width: "90%", marginBottom: "5px" }}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" checked={gender === "female"} sx={{ marginRight: "100px" }} />
              <FormControlLabel value="male" control={<Radio />} label="Male" checked={gender === "male"} />
              {validationErrors.gender && <Typography variant="body2" color="error" sx={{ marginLeft: "100px", marginTop: "5px" }}>{validationErrors.gender}</Typography>}
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={12} container spacing={8}>
              <Grid item xs={6} sx={{ display: "flex", justifyContent: "right" }}>
                <TextField
                  id="nic"
                  label="Patient's NIC"
                  value={nic}
                  onChange={(event) => setNIC(event.target.value)}
                  variant="outlined"
                  color="secondary"
                  error={!!validationErrors.nic}
                  helperText={validationErrors.nic}
                  sx={{ width: "90%", marginBottom: "10px" }}
                />
              </Grid>
              <Grid item xs={6} sx={{ display: "flex", justifyContent: "left" }}>
                <TextField
                  id="address"
                  label="Patient's Address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  variant="outlined"
                  color="secondary"
                  error={!!validationErrors.address}
                  helperText={validationErrors.address}
                  sx={{ width: "90%", marginBottom: "10px" }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={11}>
          <Grid item xs={6} sx={{ display: "flex", justifyContent: "right" ,marginTop: "20px"}}>
              <Button variant="contained" size="medium" color="secondary" sx={{ width: "500px", height: "50px", fontSize: "24px" }} onClick={handleUpdateNow}>
                Update Now
              </Button>
              </Grid>
              <Grid item xs={6} sx={{ display: "flex", justifyContent: "left" ,marginTop: "20px"}}>
              <Button variant="contained" size="medium" color="secondary" sx={{ width: "500px", height: "50px", fontSize: "24px" }} onClick={handlecancel}>
                Cancel
              </Button>
              </Grid>  
          </Grid>
        </Box>
      </Grid>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h5" component="h2" color="purple" sx={{fontWeight: 'bold', textAlign: 'center'}}>
            {success ? "Successful" : "Not Successful"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} color="black">
            {success ? "Appointment details updated successfully!!!" : errorMessage}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button onClick={handlecancel}>
            Cancel
          </Button>
          </Box>
        </Box> 
      </Modal>
    </Grid>
  );
}

export default UpdateAppointment;
