import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React, { useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import { FormControl, MenuItem, Box } from '@mui/material';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function BasicGrid() {

  const navigate = useNavigate();
  const [invId, setInvId] = useState('');
  const [invidError, setInvIdError] = useState(false);
  const [invDate, setInvDate] = useState(new Date);
  const [appointmentNum, setAppointmentNum] = useState('');
  const [appointmentnumError, setAppointmentNumError] = useState(false);
  const [doctor, setDoctor] = useState('');
  const [doctorCharge, setDoctorCharge] = useState('');
  const [doctorchargeError, setDoctorChargeError] = useState(false);

  // const [open, setOpen] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [discount, setDiscount] = useState(0);
  // const [totalAmount, setTotalAmount] = useState('');

  useEffect(() => {
    async function getDoctor() {
      try {
        const response = await fetch('https://mcms_api.mtron.me/get_channelling_doctor');
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error(error);
      }
    }
    getDoctor();
  }, []);

  const handleDoctorChange = (event) => {
    setDoctor(event.target.value);
  };


  // function TotalAmount(unitPrice, quantity, discount) {
  //   const totalPrice = unitPrice * quantity;
  //   const discountedPrice = totalPrice - (totalPrice * discount) / 100;
  //   return discountedPrice;
  // }

  const formData = {
    
    invId,
    invDate,
    appointmentNum,
    doctor,
    doctorCharge,
    // discount,
    // totalAmount,
  };

  console.log('Form Data:', formData);

  const handleInvIdChange  = (event) => {
    const value = event.target.value;
    const isvalidInvId = /^\d+$/.test(value);
  
    setInvId(value)
  
    if(!isvalidInvId){
      setInvIdError('Invalid input, please enter a number')
    }
    else if (value.trim() === '') {
      console.setInvIdError('Field is empty');
    }
    else{
      setInvIdError('');
    }
  };

  const handleAppointmentNumChange  = (event) => {
    const value = event.target.value;
    const isvalidappointmentNum = /^\d+$/.test(value);
  
    setAppointmentNum(value)
  
    if(!isvalidappointmentNum){
      setAppointmentNumError('Invalid input, please enter a number')
    }
    else if (value.trim() === '') {
      console.setAppointmentNumError('Field is empty');
    }
    else{
      setAppointmentNumError('');
    }
  };

  const handleDoctorChargeChange = (event) => {
    const isValiddoctorCharge = /^[0-9]{1,6}(\.[0-9]{1,2})?$/.test(event.target.value);
    setDoctorCharge(event.target.value);
    setDoctorChargeError(!isValiddoctorCharge);
  };

  const handleReset = () => {
    
    // setDiscount(0);
    setInvId(0);
    setDoctor('');
    setInvDate(new Date);
    setDoctorCharge('');
    setAppointmentNum('');
    // setTotalAmount('');
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  // Calculate total after discount
  // const discountedTotal = unitPrice - (unitPrice * discount) / 100;

  //   let _totalAmount = TotalAmount(unitPrice, quantity, discount);
    
    const data = {
      inv_id: invId,
      inv_date: invDate,
      app_num: parseInt(appointmentNum),
      selected_doctor: doctor,
      doctor_Charge: parseInt(doctorCharge),
      // discount: parseInt(discount),
      // total_amount: _totalAmount,
    };

    console.log(data)

    try {
      const response = await fetch("https://mcms_api.mtron.me/set_billing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Data successfully saved to the database
        toast.success("Billing data saved successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        handleReset();
      } else {
        // Error occurred while saving the data
        toast.error("Failed to save billing data", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the stock data", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  function handleBillingHistoryClick() {
    navigate('/bill_history');
  }

    // Reset form after submission
  return (

    <Box
    sx={{
      display: 'flex',
      '& > :not(style)': {
        m: 1,
        width: '100%',
        backgroundColor:'#DA70D6',
        height: 670,        
      },
    }}
  >
    
    <Paper variant="outlined">
        <Grid item xs={12} sx={{paddingTop:'25px'}}>
          <Item sx={{paddingBottom:'30px'}}>
            <h3 style={{fontWeight: 'bold', paddingTop:'25px'}}>KGN MEDI HOUSE BILLING SYSTEM</h3>
            <h4>DOCTOR CHARGES</h4>
          </Item>
        </Grid>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingLeft:'100px' }}>
          <Box   sx={{
            width: 700,
            height: 600,
            paddingTop: '10px',
            }}>

        <FormControl onSubmit={handleSubmit}>
            <Grid container spacing={1} sx={{paddingTop:'10px'}}>
              <Grid item xs={6} sx={{ paddingBottom:'30px', width:'600px'}}>
                <Item sx={{paddingTop:'40px'}}>

                  <TextField 
                    variant="outlined"  
                    label="Invoice Date" 
                    type="date" 
                    value={invDate}
                    size="small"
                    sx={{width:'300px',paddingBottom:'20px'}}
                    onChange={(date) => setInvDate(date)}
                    />

          
                  <TextField
                    variant="outlined"
                    label="Invoice Number" 
                    type="number" 
                    value={invId}
                    size="small"
                    sx={{width:'300px',paddingBottom:'20px'}}
                    onChange={handleInvIdChange}
                    error={invidError}
                    helperText={invidError}
                  />
        
     
                  <TextField
                    variant="outlined"
                    label="Appointment ID"
                    value={appointmentNum}
                    size="small"
                    sx={{width:'300px',paddingBottom:'20px'}}
                    onChange={handleAppointmentNumChange }
                    error={appointmentnumError}
                    helperText={appointmentnumError}
                  />
  
                 
                  <TextField
                    variant="outlined"
                    value={doctor}
                    size="small"
                    label="Select Doctor"
                    select
                    sx={{width:'300px',paddingBottom:'20px'}}
                    onChange={handleDoctorChange }
                    >
                    
                  {Array.isArray(doctor) && doctor.map((type) => (
                    <MenuItem key={type.doctor_name} value={type.doctor_name}>{type.doctor_name}</MenuItem>
                        ))}
                  </TextField>
                  
                  <TextField
                    variant="outlined"
                    label="Doctor Charge"
                    type='number'
                    value={doctorCharge}
                    size="small"
                    sx={{width:'300px',paddingBottom:'20px'}}
                    onChange={handleDoctorChargeChange}
                    error={doctorchargeError}
                    helperText={doctorchargeError ? 'Please enter a valid amount' : ''}
                  />
      
  
                  {/* <TextField
                    label="Discount(%)"
                    type="number"
                    value={discount}
                    size="small"
                    sx={{width:'300px',paddingBottom:'20px'}}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    // error={}
                    // helperText={}
                  /> */}

                  {/* <TextField
                    label="Total_Amount"
                    type="decimal"
                    value={TotalAmount(unitPrice, quantity, discount)}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    size="small"
                    sx={{width:'300px',paddingBottom:'20px'}}
                    // error={}
                    // helperText={}
                  /> */}

                </Item>
              </Grid>
              
              <Grid item xs={4} sx={{ paddingBottom:'30px', width:'600px'}}>
                <Item sx={{paddingTop:'40px'}}>
                    <Button variant="contained"  
                    size='medium'
                    onClick={handleSubmit}
                    sx={{width:'150px',marginBottom:'60px'}}>Submit
                    </Button>

                    <Button variant="contained" 
                    size='small' 
                    onClick={handleReset} 
                    sx={{width:'150px',marginBottom:'60px'}}>Reset
                    </Button>

                    <Button variant="contained" 
                    size='small' 
                    onClick={handleBillingHistoryClick} 
                    sx={{width:'150px',marginBottom:'87px'}}>See More
                    </Button>
                  </Item>
                </Grid>
            </Grid>
          </FormControl>
        </Box>
      </div>
  </Paper>
</Box>
);
}
  