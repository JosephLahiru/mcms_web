import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  Button,
} from "@mui/material";

function UpdateDoctor() {
  const [doctorID, setDoctorID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [nic, setNIC] = useState("");
  const [nicError, setNICError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [contactNo, setContactNo] = useState("");
  const [contactNoError, setContactNoError] = useState(false);

  const { id } = useParams();

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    const isValid = /^[A-Za-z0-9\s]*$/.test(value);
    const isWithinLengthLimit = value.length <= 50;
    
    setFirstName(value);
    
    if (!isValid) {
      setFirstNameError("Please enter a valid last name");
    } else if (!isWithinLengthLimit) {
      setFirstNameError("Last name should not exceed 50 characters");
    } else {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    const isValid = /^[A-Za-z0-9\s&-]*$/.test(value);
    const isWithinLengthLimit = value.length <= 50;

    setLastName(value);

    if (!isValid) {
      setLastNameError("Please enter a valid last name");
    } else if (!isWithinLengthLimit) {
      setLastNameError("Last name should not exceed 50 characters");
    } else {
      setLastNameError("");
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
    const isValid = /^[A-Za-z0-9\s&-]*$/.test(value);
    const isWithinLengthLimit = value.length <= 50;

    setEmail(value);

    if (!isValid) {
      setEmailError("Please enter a valid Email");
    } else if (!isWithinLengthLimit) {
      setEmailError("Email should not exceed 10 characters");
    } else {
      setEmailError("");
    }
  };

  const handleAddressChange = (event) => {
    const value = event.target.value;
    const isValid = /^[A-Za-z0-9\s&-]*$/.test(value);
    const isWithinLengthLimit = value.length <= 50;

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
      d_id: doctorID,
      first_name: firstName,
      last_name: lastName,
      nic: nic,
      email: email,
      address: address,
      contact_no: contactNo,
    };

    if(!firstNameError && !lastNameError && !nicError && !addressError && doctorID && firstName && lastName && nic && address && email){
    try{
      const response = await fetch(`https://mcms_api.mtron.me/update_doctor/${data.d_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if(response.ok){
        toast.success("Doctor updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        handleReset();
      }else{
        toast.error("Failed to update doctor", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }catch(error){
      console.error(error);
      toast.error("An error occured while updating doctor", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  } else {
    toast.error("Please fill all the fields", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  };

  useEffect(() => {
    async function getDoctor() {
      try {
        const response = await fetch(`https://mcms_api.mtron.me/get_doctors/${id}`);
        const data = await response.json();

        if (data.length > 0) {
          const doctor = data[0];
          setDoctorID(doctor.d_id);
          setFirstName(doctor.first_name);
          setLastName(doctor.last_name);
          setNIC(doctor.nic);
          setEmail(doctor.email);
          setAddress(doctor.address);
          setContactNo(doctor.contact_no);
        } else {
          toast.error("Doctor not found", { position: toast.POSITION.TOP_RIGHT });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch doctor details", { position: toast.POSITION.TOP_RIGHT });
      }
    }

    getDoctor();
  }, [id]);

  const handleReset = () => {
    setDoctorID("");
    setFirstName("");
    setLastName("");
    setNIC("");
    setEmail("");
    setAddress("");
    setContactNo("");
  };

  return (
    <Paper
      sx={{
        width: "50%",
        overflow: "hidden",
        padding: "10px",
        margin: "5% auto",
        backgroundColor: '#f5f5f5'
      }}
    >
      <FormControl onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ margin:'10px 0px 15px' }} >
            Update Doctor
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
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              color="secondary"
              value={firstName}
              error={firstNameError} 
              helperText={firstNameError}
              onChange={handleFirstNameChange}
              label="First Name"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              color="secondary"
              value={lastName}
              error={lastNameError}
              helperText={lastNameError}
              onChange={handleLastNameChange}
              label="Last Name"
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

export default UpdateDoctor;