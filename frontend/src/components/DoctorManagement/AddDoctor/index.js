import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  Button,
} from "@mui/material";

function AddDoctor() {
  const [doctorID, setDoctorID] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorNameError, setDoctorNameError] = useState(false);
  const [doctorType, setDoctorType] = useState("");
  const [doctorTypeError, setDoctorTypeError] = useState(false);
  const [nic, setNIC] = useState("");
  const [nicError, setNICError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [contactNo, setContactNo] = useState("");
  const [contactNoError, setContactNoError] = useState(false);

  const handleDoctorNameChange = (event) => {
    const value = event.target.value;
    const isValid = /^[A-Za-z0-9\s]*$/.test(value);
    const isWithinLengthLimit = value.length <= 50;
    
    setDoctorName(value);
    
    if (!isValid) {
      setDoctorNameError("Please enter a valid doctor name");
    } else if (!isWithinLengthLimit) {
      setDoctorNameError("Doctor name should not exceed 50 characters");
    } else {
      setDoctorNameError("");
    }
  };

  const handleDoctorTypeChange = (event) => {
    const value = event.target.value;
    const isValid = /^[A-Za-z0-9\s]*$/.test(value);;
    const isWithinLengthLimit = value.length <= 50;

    setDoctorType(value);

    if (!isValid) {
      setDoctorTypeError("Please enter a valid doctor type");
    } else if (!isWithinLengthLimit) {
      setDoctorTypeError("Doctor type should not exceed 50 characters");
    } else {
      setDoctorTypeError("");
    }
  };

  const handleNICChange = (event) => {
    const value = event.target.value;
    const isValid = /^[A-Za-z0-9\s&-]*$/.test(value);
    const isWithinLengthLimit = value.length <= 50;

    setNIC(value);

    if (!isValid) {
      setNICError("Please enter a valid NIC");
    } else if (!isWithinLengthLimit) {
      setNICError("NIC name should not exceed 10 characters");
    } else {
      setNICError("");
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    const isValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
    const isWithinLengthLimit = value.length <= 50;
  
    setEmail(value);
  
    if (!isValid) {
      setEmailError("Please enter a valid Email");
    } else if (!isWithinLengthLimit) {
      setEmailError("Email should not exceed 50 characters");
    } else {
      setEmailError("");
    }
  };  

  const handleAddressChange = (event) => {
    const value = event.target.value;
    const isValid = /^[A-Za-z0-9\s&-.,#]*$/.test(value);
    const isWithinLengthLimit = value.length <= 100;
  
    setAddress(value);
  
    if (!isValid) {
      setAddressError("Please enter a valid Address");
    } else if (!isWithinLengthLimit) {
      setAddressError("Address should not exceed 100 characters");
    } else {
      setAddressError("");
    }
  };  

  const handleContactNoChange = (event) => {
    const value = event.target.value;
    const isValid = /^[A-Za-z0-9\s&-]*$/.test(value);
    const isWithinLengthLimit = value.length <= 50;

    setContactNo(value);

    if (!isValid) {
      setContactNoError("Please enter a valid Address");
    } else if (!isWithinLengthLimit) {
      setContactNoError("Address should not exceed 100 characters");
    } else {
      setContactNoError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      cd_id: doctorID,
      doctor_name: doctorName.toLowerCase().replace(/ /g, '_'),
      d_type: doctorType.toLowerCase().replace(/ /g, '_'),
      nic: nic,
      email: email,
      address: address,
      contct_no: contactNo,
    };

    if(!doctorNameError && !doctorTypeError && !nicError && !addressError && doctorID && doctorName && doctorType && nic && address && email){
      try {
        const response = await fetch("https://mcms_api.mtron.me/set_channelling_doctor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          toast.success("Doctor data saved successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          handleReset();
        } else {
          toast.error("Failed to save doctor data", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while saving the doctor data", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.error("Please fill all the fields", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleReset = () => {
    setDoctorID("");
    setDoctorName("");
    setDoctorType("");
    setNIC("");
    setEmail("");
    setAddress("");
    setContactNo("");
  };
  
  return (
      <Paper sx={{ width: '50%', overflow: 'hidden', padding: '10px', margin: '5% auto auto', backgroundColor: '#f5f5f5' }}>
      <FormControl onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ margin:'10px 0px 15px' }} >
            Add Doctor
          </Typography>
            <hr style={{ margin: '10px 0' }} />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              value={doctorID}
              onChange={(event) => {setDoctorID(event.target.value);}}
              label="Doctor ID"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              color="secondary"
              value={doctorName}
              error={doctorNameError} 
              helperText={doctorNameError}
              onChange={handleDoctorNameChange}
              label="Doctor Name"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              color="secondary"
              value={doctorType}
              error={doctorTypeError}
              helperText={doctorTypeError}
              onChange={handleDoctorTypeChange}
              label="Doctor Type"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              color="secondary"
              value={nic}
              error={nicError}
              helperText={nicError}
              onChange={handleNICChange}
              label="NIC"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              color="secondary"
              value={email}
              error={emailError}
              helperText={emailError}
              onChange={handleEmailChange}
              label="Email"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              color="secondary"
              value={address}
              error={addressError}
              helperText={addressError}
              onChange={handleAddressChange}
              label="Address"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              color="secondary"
              value={contactNo}
              error={contactNoError}
              helperText={contactNoError}
              onChange={handleContactNoChange}
              label="Contact No"
            />
          </Grid>

        </Grid>
        <Grid container justifyContent="flex-end" spacing={2} marginTop={1}>
          <Grid item xs={2}>
            <Button variant="outlined" color="secondary" size="small" onClick={handleReset} sx={{ width: '100%' }}>
              Reset
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="secondary" size="small" onClick={handleSubmit} sx={{ width: '100%' }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </FormControl>
      <ToastContainer />
    </Paper>
  );
}

export default AddDoctor;
