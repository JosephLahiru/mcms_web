import React,{useState,useEffect} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { 
  Grid,
  Box,
  Typography,
  Divider,
  Alert,
  AlertTitle,
  Button,
  Modal,

} from '@mui/material';
import { useParams } from "react-router-dom";

function ConfirmAppointment() { 
  
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [appointmentDoctor, setAppointmentDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [nic, setNIC] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { appointmentId } = useParams();

  useEffect(() => {
    if (location.state) {
      const { appointmentDoctor, appointmentNumber, appointmentDate, patientName,age,mobile,gender,nic  } = location.state;
      setAppointmentDoctor(appointmentDoctor);
      setAppointmentNumber(appointmentNumber);
      setAppointmentDate(appointmentDate);
      setPatientName(patientName);
      setAge(age);
      setNIC(nic);
      setMobile(mobile);
      setGender(gender);
    }
  }, [location.state]);

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


  const handleConfirmPayment = async () => {
    console.log("hello")

    try {
      const query = `https://mcms_api.mtron.me/confirm_app_payment/${appointmentId}`
      console.log(query)
      await fetch(query, {
        method: "GET",
      });
      console.log("Done")
      setPaymentSuccess(true);
      setOpen(true);
    } catch (error) {
      console.log(error)
    }
  };

  const handlepayLater = () => {
    // Check the appointmentDoctor value and navigate accordingly
    if (appointmentDoctor === "NEURO SURGEON - NISHANTHA GUNASEKARA") {
      navigate("/view_appointment");
    } else if (appointmentDoctor === "UNIVERSAL PHYSICIAN - BUDDHI MOHOTTI") {
      navigate("/view_appointment1");
    } else if (appointmentDoctor === "RADIOLOGIST - PRESANTHA BANDARA") {
      navigate("/view_appointment2");
    } else {
      // Add a default route in case appointmentDoctor doesn't match any of the above conditions
      navigate("/default_route");
    }
  };

  return (

    <Grid container spacing={2}>
         <Grid item xs={12}>
            <Box sx={{ width: '100%', height: 100, backgroundColor: '#ce93d8' }}>
                <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', paddingTop: '40px', textAlign: 'left', paddingLeft: '90px' }}>
                    CONFIRM APPOINTMENT
                </Typography>
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
            <Divider orientation="vertical" variant="middle" flexItem sx={{backgroundColor: "#616161" }} />
            <Grid item xs={2.5}>
              <Typography variant="h7" component="div" sx={{ color: "black", paddingTop: "20px", textAlign: "left", paddingLeft: "20px" }}>
                Appointment Date/Time
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: "black", fontWeight: "bold", textAlign: "left", paddingLeft: "20px" }}>
                {appointmentDate.slice(0, 15)}
              </Typography>
              <Typography variant="h7" component="div" sx={{ color: "black", textAlign: "left", paddingLeft: "20px" }}>
                04.00 PM TO 08.00 PM
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem sx={{backgroundColor: "#616161" }} />
            <Grid item xs={3}>
              <Typography variant="h7" component="div" sx={{ color: "black", paddingTop: "20px", textAlign: "left", paddingLeft: "20px" }}>
                Medical Center Name
              </Typography>
              <Typography variant="h5" component="div" sx={{ color: "purple", fontWeight: "bold", textAlign: "left", paddingLeft: "20px" }}>
                K.G.N.Medi House
              </Typography>
              <Typography variant="h7" component="div" sx={{ color: "black", textAlign: "left", paddingLeft: "20px" }}>
                Galle
              </Typography>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem sx={{backgroundColor: "#616161" }}  />
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
      <Grid item xs={12}>
        <Grid container spacing={0.5}>
          <Grid item xs={6} >
            <Box sx={{ width: '48%', height: 240, backgroundColor: '#FFFFFF',marginLeft: "350px",borderRadius: "10px"}}>
                <Typography variant="h5" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '10px', textAlign: 'left',paddingLeft: '50px'}}>
                    Patient Information
                </Typography>
                <Typography variant="h6" component="div" sx={{  paddingTop: '10px', textAlign: 'left', paddingLeft: '50px' }}>
                  <span style={{ fontWeight: 'bold', color: '#616161' }}>Name: </span>{patientName}
                </Typography>
                <Typography variant="h6" component="div" sx={{  paddingTop: '10px', textAlign: 'left', paddingLeft: '50px' }}>
                  <span style={{ fontWeight: 'bold', color: '#616161' }}>Age: </span> {age}
                </Typography>
                <Typography variant="h6" component="div" sx={{  paddingTop: '10px', textAlign: 'left', paddingLeft: '50px' }}>
                  <span style={{ fontWeight: 'bold', color: '#616161' }}>Mobile: </span>{mobile}
                </Typography>
                <Typography variant="h6" component="div" sx={{  paddingTop: '10px', textAlign: 'left', paddingLeft: '50px' }}>
                  <span style={{ fontWeight: 'bold', color: '#616161' }}>NIC: </span>{nic}
                </Typography>
                <Typography variant="h6" component="div" sx={{  paddingTop: '10px', textAlign: 'left', paddingLeft: '50px' }}>
                  <span style={{ fontWeight: 'bold', color: '#616161' }}>Gender: </span>{gender}
                </Typography>


            </Box>
          </Grid>
          <Grid item xs={6}>
          <Box sx={{ width: '50%', height: 330, backgroundColor: '#FFFFFF',marginRight: "300px",borderRadius: "10px"}}>
                <Typography variant="h6" component="div" sx={{ color: 'red', fontWeight: 'bold', paddingTop: '10px', textAlign: 'left', paddingLeft: '90px' }}>
                    Professional Fee
                </Typography>
                <Typography variant="h5" component="div" sx={{ color: 'purple', paddingTop: '5px', textAlign: 'left', paddingLeft: '90px' }}>
                    LKR 2,300.00
                </Typography>
                <Typography variant="h6" component="div" sx={{ color: 'red', fontWeight: 'bold', paddingTop: '10px', textAlign: 'left', paddingLeft: '90px' }}>
                    Medical Center Payment
                </Typography>
                <Typography variant="h5" component="div" sx={{ color: 'purple', paddingTop: '5px', textAlign: 'left', paddingLeft: '90px' }}>
                    LKR 1,190.00
                </Typography>
                <Typography variant="h6" component="div" sx={{ color: 'red', fontWeight: 'bold', paddingTop: '10px', textAlign: 'left', paddingLeft: '90px' }}>
                   Total
                </Typography>
                <Typography variant="h5" component="div" sx={{ color: 'purple', fontWeight: 'bold', paddingTop: '5px', textAlign: 'left', paddingLeft: '90px',paddingBottom: '25px' }}>
                    LKR 3,490.00
                </Typography>
            </Box>
          </Grid>
          <Box sx={{ width: "600px", height: 80, backgroundColor: '#FFFFFF',marginLeft: "550px",borderRadius: "10px",}}>
            <Alert severity="info" sx={{alignItems: 'center'}}>
                    <AlertTitle >Info</AlertTitle>
                      his appointment is not paid yet — <strong> Now you can pay it!</strong>
            </Alert> 
          </Box>  
        </Grid>
      </Grid>
      <cross >
     <Box display="flex" justifyContent="center" alignItems="center" pb={1}>
            <Box position="relative" width={1200} height={2} bgcolor="#bdbdbd" marginLeft={34}  marginTop={2}/>
          </Box>
          </cross>
          <Grid item xs={12}>
        <Grid container spacing={5}>
      <Grid item xs={6} sx={{ display: "flex", justifyContent: "right" ,marginTop: "10px"}}>
              <Button variant="contained" size="medium" color="secondary" sx={{ width: "500px", height: "50px", fontSize: "24px" }} onClick={handleConfirmPayment}>
                Pay Now
              </Button>
              </Grid>
      <Grid item xs={6} sx={{ display: "flex", justifyContent: "left" ,marginTop: "10px"}}>
              <Button variant="contained" size="medium" color="secondary" sx={{ width: "500px", height: "50px", fontSize: "24px" }} onClick={handlepayLater}>
                Pay Later
              </Button>
              </Grid>
            </Grid>
              <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
        <Box sx={style}>
          <Typography id="appointment information" variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            Appointment Information
          </Typography>
          <Typography id="appointment details" sx={{ mt: 2 }}>
          <span style={{ fontWeight: 'bold', color: '#616161',fontSize: '18px' }}>Appointment Number: </span>{appointmentNumber.toString().padStart(2, "0")}
          </Typography>
          <Typography id="appointment details" sx={{ mt: 2 }}>
          <span style={{ fontWeight: 'bold', color: '#616161',fontSize: '18px' }}>Appointment Doctor: </span>{appointmentDoctor}
          </Typography>
          <Typography id="appointment details" sx={{ mt: 2 }}>
          <span style={{ fontWeight: 'bold', color: '#616161' ,fontSize: '18px'}}>Appointment Date: </span>{appointmentDate.slice(0, 15)}
          </Typography>
          <Typography id="patient information" variant="h5" component="h2" sx={{ fontWeight: 'bold',paddingTop: '20px' }}>
            Appointment Information
          </Typography>
          <Typography id="patient details" sx={{ mt: 2 }} >
          <span style={{ fontWeight: 'bold', color: '#616161',fontSize: '18px' }}>Name: </span>{patientName}
          </Typography>
          <Typography id="patient details" sx={{ mt: 2 }}>
          <span style={{ fontWeight: 'bold', color: '#616161',fontSize: '18px' }}>Age: </span>{age}
          </Typography>
          <Typography id="patient details" sx={{ mt: 2 }}>
          <span style={{ fontWeight: 'bold', color: '#616161',fontSize: '18px' }}>Mobile: </span>{mobile}
          </Typography>
          <Typography id="patient details" sx={{ mt: 2 }}>
          <span style={{ fontWeight: 'bold', color: '#616161',fontSize: '18px' }}>NIC: </span>{nic}
          </Typography>
          <Typography id="patient details" sx={{ mt: 2 }}>
          <span style={{ fontWeight: 'bold', color: '#616161',fontSize: '18px' }}>Gender:</span>{gender}
          </Typography>
          <Typography id="patient information" variant="h5" component="h2" sx={{ fontWeight: 'bold',paddingTop: '20px',color: 'purple' ,textAlign: 'center'}}>
             SUCCESSFULLY!!!
          </Typography>
        </Box>
      </Modal>
      </Grid>
    </Grid>
  );
}
export default ConfirmAppointment;
