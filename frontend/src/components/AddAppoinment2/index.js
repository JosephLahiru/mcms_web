import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,

} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

function AddAppointment2() {
  const [patientName, setPatientName] = useState("");
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [appointmentDoctor, setAppointmentDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentDoctorID, setAppointmentDoctorID] = useState(0);
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [nic, setNIC] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [appointmentId, setAppointmentID] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedTitleId, setSelectedTitleId] = useState("");
  const [titles, setTitles] = useState([]);

 
  
  useEffect(() => {
    async function fetchAppointmentID() {
      const response = await fetch("https://mcms_api.mtron.me/get_lat_app_id");
      const data = await response.json();
      setAppointmentID(data.app_id+1);
      
    }
    fetchAppointmentID();
  }, []);

  const handleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (location.state) {
      const { appointmentDoctor, appointmentNumber, appointmentDate, selectedDoctorID } = location.state;
      setAppointmentDoctor(appointmentDoctor);
      setAppointmentNumber(appointmentNumber);
      setAppointmentDate(appointmentDate);
      setAppointmentDoctorID(selectedDoctorID);
      setPatientName(patientName);
      setNIC(nic);
      setAge(age);
      setMobile(mobile);
      setGender(gender);
    }
  }, [location.state]);


  const validateForm = () => {
    const errors = {};
    let formIsValid = true;

    if (patientName.trim() === "") {
      errors.patientName = "Please enter the patient name";
      formIsValid = false;
    } else if (patientName.trim().length > 100) {
      errors.patientName = "The patient name must not exceed 100 characters";
      formIsValid = false;
    }

    if (age.trim() === "") {
      errors.age = "Please enter the patient age";
      formIsValid = false;
    } else if (isNaN(age) || parseInt(age) < 1 || parseInt(age) < 0) {
      errors.age = "Please enter a valid age";
      formIsValid = false;
    }
    else if (age.length > 3) {
    errors.age = "Age should be limited to three digits";
    formIsValid = false;
  }
    

    if (mobile.trim() === "") {
      errors.mobile = "Please enter the patient's mobile";
      formIsValid = false;
    } else if (!/^0\d{9,10}$/.test(mobile) && mobile.length !== 9) {
      errors.mobile = "Please enter a valid 9 or 10-digit mobile number starting with 0";
      formIsValid = false;
    }
    
    
    if (address.trim() === "") {
      errors.address = "Please enter the patient address";
      formIsValid = false;
    }else if (address.trim().length > 150) {
      errors.address = "The address must not exceed 150 characters";
      formIsValid = false;
    }

    if (!gender) {
      errors.gender = "Please select the patient gender";
      formIsValid = false;
    }

    if (!nic) {
      errors.nic = "Please select the patient's NIC";
      formIsValid = false;
    } else {
      // Remove any spaces or dashes from the NIC
      setNIC(nic.replace(/[\s-]/g, ''));
    
      // Check the length of the NIC
      if (nic.length !== 10 && nic.length !== 12) {
        errors.nic = "Invalid NIC length";
        formIsValid = false;
      } else {
        // Regular expression pattern for NIC validation
        const nicPattern = /^[0-9]{9}[vV]|[12][0-9]{11}$/;
    
        // Check if the NIC matches the pattern
        if (!nicPattern.test(nic)) {
          errors.nic = "Invalid NIC format";
          formIsValid = false;
        } else {
          // Validate the last character of the NIC
          const lastDigit = nic.charAt(nic.length - 1);
          if (nic.length === 10 && lastDigit.toLowerCase() !== 'v') {
            errors.nic = "Invalid last character for old NIC format";
            formIsValid = false;
          } else if (nic.length === 12 && !/[0-9]/.test(lastDigit)) {
            errors.nic = "Invalid last character for new NIC format";
            formIsValid = false;
          }
        }
      }
    }
    
    if (!selectedTitle) {
      errors.selectedTitle = "Please select a title";
      formIsValid = false;
    }


    setValidationErrors(errors);
    return formIsValid;
  };
 
  const handlecancel = () => {
    navigate('/add_appointment');
  };

  const handleBOOKNOW = async (event) => {
    event.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return;
    }

    if (
      !patientName ||
      !address ||
      !age ||
      !gender ||
      !mobile ||
      !nic ||
      !appointmentNumber ||
      !appointmentDoctorID ||
      !appointmentDate ||
      !selectedTitleId
    ) {
      toast.error("Please fill all the fields...", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    const inputDate = new Date(appointmentDate);

    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const _convertedDate = inputDate.toLocaleDateString("en-GB", options).replace(/\//g, "-");

    const dateParts = _convertedDate.split("-");
    const convertedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

    const requestBody = {
      patient_name: patientName,
      area: address,
      age: age,
      gender: gender,
      mobile: mobile,
      nic:nic,
      app_num: appointmentNumber,
      cd_id: appointmentDoctorID,
      app_date: convertedDate,
      title_id: selectedTitleId,
    };

    console.log(requestBody);

    try {
      const response = await fetch("https://mcms_api.mtron.me/set_appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to send appointment details");
      }

      const data = await response.json();
      console.log(data); // Log the response data from the API

      navigate(`/confirm_appointment/${appointmentId}`, {
        state: {
          appointmentDoctor,
          appointmentNumber,
          appointmentDate,
          patientName,
          age,
          mobile,
          gender,
          nic,
        },
      });
      
    } catch (error) {
      console.error(error);
      alert("Failed to send appointment details");
    }
  };

  useEffect(() => {
    async function fetchTitles() {
      try {
        const response = await fetch("https://mcms_api.mtron.me/get_personal_titles");
        if (!response.ok) {
          throw new Error("Failed to fetch titles from the API");
        }
        const data = await response.json();
        setTitles(data); 

        const selectedTitleObject = data.find((title) => title.title_type === selectedTitle);
        if (selectedTitleObject) {
          setSelectedTitleId(selectedTitleObject.title_id);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchTitles();
  }, [selectedTitle]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ width: "100%", height: 175, backgroundColor: "#ce93d8" }}>
          <Typography variant="h4" component="div" sx={{ color: "white", fontWeight: "bold", paddingTop: "50px", textAlign: "left", paddingLeft: "90px" }}>
            BOOK A CHANNEL
          </Typography>
          <CloseOutlinedIcon sx={{ position: "absolute", top: "80px", right: "20px", color: "white" }} onClick={handleClose} />
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "1200px", height: 110, backgroundColor: "#f5f5f5", borderRadius: "10px", display: "flex", alignItems: "center" }}>
          <Grid container spacing={0}>
            <Grid item xs={3.5}>
              <Typography variant="h7" component="div" sx={{ color: "black", paddingTop: "20px", textAlign: "left", paddingLeft: "20px" }}>
                Doctor Name
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: "black", fontWeight: "bold", textAlign: "left", paddingLeft: "20px", paddingBottom: "15px" }}>
                {appointmentDoctor}
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ backgroundColor: "#616161" }} />
            <Grid item xs={2.5}>
              <Typography variant="h7" component="div" sx={{ color: "black", paddingTop: "20px", textAlign: "left", paddingLeft: "20px" }}>
                Date
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: "black", fontWeight: "bold", textAlign: "left", paddingLeft: "20px" }}>
                {appointmentDate.slice(0, 15)}
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ backgroundColor: "#616161" }} />
            <Grid item xs={3}>
              <Typography variant="h7" component="div" sx={{ color: "black", paddingTop: "20px", textAlign: "left", paddingLeft: "20px" }}>
                Time
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: "black", fontWeight: "bold", textAlign: "left", paddingLeft: "20px" }}>
                04.00 PM TO 08.00 PM
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ backgroundColor: "#616161" }} />
            <Grid item xs={2.5}>
              <Typography variant="h7" component="div" sx={{ color: "black", paddingTop: "20px", textAlign: "left", paddingLeft: "20px" }}>
                Appointment Number
              </Typography>
              <Typography variant="h3" component="div" sx={{ color: "purple", fontWeight: "bold", textAlign: "left", paddingLeft: "20px" }}>
                {appointmentNumber.toString().padStart(2, "0")}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "1200px", height: 470, backgroundColor: "#f5f5f5", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Grid container spacing={1}>
          <Grid item xs={12} sm={12} container spacing={8}>
              <Grid item xs={2.5} sx={{ display: "flex", justifyContent: "right" }}>
              <FormControl fullWidth error={!!validationErrors.selectedTitle}>
                  <InputLabel id="select-title" color="secondary"  sx={{ marginLeft: '60px' }}>
                    Select a Title*
                  </InputLabel>
                  <Select
                    labelId="select-title"
                    id="select-title"
                    color="secondary"
                    value={selectedTitle}
                    onChange={(event) => setSelectedTitle(event.target.value)}
                    sx={{ width: '200px',marginLeft: '60px' }}
                    label="SELECT A TITLE">
                    <MenuItem value="">Select a Title</MenuItem>
                        {titles.map((title) => (
                          <MenuItem key={title.id} value={title.title_type}>
                            {title.title_type}
                          </MenuItem>
                        ))}   
                      </Select>
                      {validationErrors.selectedTitle && (
                      <Typography variant="body2" color="error" sx={{ marginLeft: "75px", marginTop: "2px",fontSize: "12px" }}>
                        {validationErrors.selectedTitle}
                      </Typography>
                    )}  
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
                sx={{ width: "90%", marginBottom: "20px",marginLeft: "40px"}}
                required
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
                  required
                />
              </Grid>
              <Grid item xs={6} sx={{ display: "flex", justifyContent: "left" }}>
                <TextField
                  id="mobile"
                  label="Patient's Mobile"
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value)}
                  variant="outlined"
                  color="secondary"
                  error={!!validationErrors.mobile}
                  helperText={validationErrors.mobile}
                  sx={{ width: "90%", marginBottom: "10px" }}
                  required
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
              <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={gender} onChange={(event) => setGender(event.target.value)} sx={{ width: "90%", marginBottom: "10px" }} >
                <FormControlLabel value="female" control={<Radio />} label="Female*" sx={{ marginRight: "80px" }} />
                <FormControlLabel value="male" control={<Radio />} label="Male*" />
                {validationErrors.gender && (
                  <Typography variant="body2" color="error" sx={{ marginLeft: "100px", marginTop: "10px" }}>
                    {validationErrors.gender}
                  </Typography>
                )}
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
                  required
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
                  required
                />
              </Grid>
            </Grid>
            <Grid container spacing={11}>
              <Grid item xs={6} sx={{ display: "flex", justifyContent: "right" ,marginTop: "10px"}}>
              <Button variant="contained" size="medium" color="secondary" sx={{ width: "495px", height: "50px", fontSize: "24px" }} onClick={handleBOOKNOW}>
                Book Now
              </Button>
              </Grid>
              <Grid item xs={6} sx={{ display: "flex", justifyContent: "left" ,marginTop: "10px"}}>
              <Button variant="contained" size="medium" color="secondary"  sx={{ width: "500px", height: "50px", fontSize: "24px" }} onClick={handlecancel}>
                Cancel
              </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AddAppointment2;
