import React,{useState,useEffect} from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useLocation } from "react-router-dom";
import { 
  Grid,
  Box,
  Typography,
  Divider,

} from '@mui/material';

function ConfirmAppointment() { 
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [appointmentDoctor, setAppointmentDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState("");
  const location = useLocation();

  const handleClose = () => {
  }; 

  useEffect(() => {
    if (location.state) {
      const { appointmentDoctor, appointmentNumber, appointmentDate, patientName,age,mobile,gender  } = location.state;
      setAppointmentDoctor(appointmentDoctor);
      setAppointmentNumber(appointmentNumber);
      setAppointmentDate(appointmentDate);
      setPatientName(patientName);
      setAge(age);
      setMobile(mobile);
      setGender(gender);
    }
  }, [location.state]);

  return (

    <Grid container spacing={2}>
         <Grid item xs={12}>
            <Box sx={{ width: '100%', height: 100, backgroundColor: '#ce93d8' }}>
                <Typography variant="h4" component="div" sx={{ color: 'white', fontWeight: 'bold', paddingTop: '40px', textAlign: 'left', paddingLeft: '90px' }}>
                    CONFIRM APPOINTMENT
                </Typography>
                    <CloseOutlinedIcon sx={{ position: 'absolute', top: '80px', right: '20px', color: 'white' }} onClick={handleClose} />
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
        <Grid container spacing={6}>
          <Grid item xs={6} >
            <Box sx={{ width: '50%%', height: 350, backgroundColor: '#f5f5f5',marginLeft: "250px",borderRadius: "10px"}}>
                <Typography variant="h4" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '40px', textAlign: 'center' }}>
                    Patient Information
                </Typography>
                <Typography variant="h6" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '25px', textAlign: 'left', paddingLeft: '50px' }}>
                    Name:{patientName}
                </Typography>
                <Typography variant="h6" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '25px', textAlign: 'left', paddingLeft: '50px' }}>
                    Age:{age}
                </Typography>
                <Typography variant="h6" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '25px', textAlign: 'left', paddingLeft: '50px' }}>
                    Mobile:{mobile}
                </Typography>
                <Typography variant="h6" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '25px', textAlign: 'left', paddingLeft: '50px' }}>
                    Gender:{gender}
                </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
          <Box sx={{ width: '50%%', height: 400, backgroundColor: '#FFFFFF',marginRight: "120px",borderRadius: "10px"}}>
                <Typography variant="h4" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '40px', textAlign: 'left', paddingLeft: '90px' }}>
                    Payment Information
                </Typography>
                <Typography variant="h6" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '20px', textAlign: 'left', paddingLeft: '90px' }}>
                    Professional Fee
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: 'purple', paddingTop: '10px', textAlign: 'left', paddingLeft: '90px' }}>
                    LKR 2,300.00
                </Typography>
                <Typography variant="h6" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '10px', textAlign: 'left', paddingLeft: '90px' }}>
                    Medical Center & Payement
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: 'purple', paddingTop: '10px', textAlign: 'left', paddingLeft: '90px' }}>
                    LKR 1,190.00
                </Typography>
                <Typography variant="h6" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '10px', textAlign: 'left', paddingLeft: '90px' }}>
                    Discout
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: 'purple', paddingTop: '10px', textAlign: 'left', paddingLeft: '90px' }}>
                    LKR 0.00
                </Typography>
                <Typography variant="h6" component="div" sx={{ color: 'black', fontWeight: 'bold', paddingTop: '10px', textAlign: 'left', paddingLeft: '90px' }}>
                   Total
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: 'purple', fontWeight: 'bold', paddingTop: '10px', textAlign: 'left', paddingLeft: '90px' }}>
                    LKR 3,490.00
                </Typography>
                
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

  );
}
export default ConfirmAppointment;
