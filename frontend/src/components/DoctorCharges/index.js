import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
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
  
  const [drugName, setDrugName] = useState('');


  const [discount, setDiscount] = useState(0);
  const [invDate, setInvDate] = useState(new Date);
  const [appointmentNum, setAppointmentNum] = useState('');
  const [invId, setInvId] = useState('');
  const [doctor, setDoctor] = useState('');
  const [doctorCharge, setDoctorCharge] = useState('');
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);




  function TotalAmount(unitPrice, quantity, discount) {
    const totalPrice = unitPrice * quantity;
    const discountedPrice = totalPrice - (totalPrice * discount) / 100;
    return discountedPrice;
  }

  const formData = {
    drugId,
    drugName,
    quantity,
    unitPrice,
    discount,
    invDate,
    appointmentNum,
    invId,
    doctor,
    doctorCharge,
    totalAmount,
  };

  console.log('Form Data:', formData);

const handleReset = () => {
    
    setDrugName('');
    
    
    setDiscount(0);
    setInvId(0);
    setDoctor('');
    setInvDate(new Date);
    setDoctorCharge('');
    setAppointmentNum('');
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

// Calculate total after discount
 const discountedTotal = unitPrice - (unitPrice * discount) / 100;

    // Generate bill or perform other actions here
    // console.log('Drug ID:', drugId);
    // console.log('Drug Name:', drugName);
    // console.log('Quantity:', quantity);
    // console.log('UnitPrice:', unitPrice);
    // console.log('Discount:', discount);
    // console.log('Discounted Total:', discountedTotal);
    // console.log('Invoice Id:',invId);
    // console.log('Invoice Date',invDate);
    // console.log('Select Doctor',doctor);
    // console.log('Doctor Charge',doctorCharge);
    // console.log('Appointment Number', appointmentNum);
    // console.log('Total Amount', totalAmount);

    let _totalAmount = TotalAmount(unitPrice, quantity, discount);
    
    const data = {
      inv_date: invDate,
      app_num: parseInt(appointmentNum),
      selected_doctor: doctor,
      doctor_Charge: parseInt(doctorCharge),
      drug_name: drugName,
      drug_id: parseInt(drugId),
      quantity: parseInt(quantity),
      unit_price: parseFloat(unitPrice),
      discount: parseInt(discount),
      total_amount: _totalAmount,
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
                    // onChange={}
                    // error={}
                    // helperText={}
                    />

          
                  <TextField
                    variant="outlined"
                    label="Invoice Number" 
                    type="number" 
                    value={invId}
                    size="small"
                    sx={{width:'300px',paddingBottom:'20px'}}
                    // onChange={}
                    // error={}
                    // helperText={}
                  />
        
     
                  <TextField
                    variant="outlined"
                    label="Appointment ID"
                    value={appointmentNum}
                    size="small"
                    sx={{width:'300px',paddingBottom:'20px'}}
                    // onChange={}
                    // error={}
                    // helperText={}
                  />
  
                 
                  <TextField
                    variant="outlined"
                    value={doctor}
                    size="small"
                    label="Select Doctor"
                    select
                    sx={{width:'300px',paddingBottom:'20px'}}
                    // onChange={}
                    // error={}
                    // helperText={}
                    />
                    {/* {((<MenuItem></MenuItem>))} */}
                    
                 
                  <TextField
                    variant="outlined"
                    label="Doctor Charge"
                    type='number'
                    value={doctorCharge}
                    size="small"
                    sx={{width:'300px',paddingBottom:'20px'}}
                    // onChange={}
                    // error={}
                    // helperText={}
                  />
      
  
                  <TextField
                    label="Discount(%)"
                    type="number"
                    value={discount}
                    size="small"
                    sx={{width:'300px',paddingBottom:'20px'}}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                    // error={}
                    // helperText={}
                  />

                  <TextField
                    label="Total_Amount"
                    type="decimal"
                    value={TotalAmount(unitPrice, quantity, discount)}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    size="small"
                    sx={{width:'300px',paddingBottom:'20px'}}
                    // error={}
                    // helperText={}
                  />

                </Item>
              </Grid>
              <Grid item xs={4} sx={{ paddingBottom:'30px', width:'600px'}}>
                <Item>
                    <Button variant="contained"  
                    size='medium'
                    onClick={handleSubmit}
                    sx={{width:'150px'}}>Submit
                    </Button>

                    <Button variant="contained" 
                    size='small' 
                    onClick={handleReset} 
                    sx={{width:'150px'}}>Reset
                    </Button>

                    <Button variant="contained" 
                    size='small' 
                    onClick={handleBillingHistoryClick} 
                    sx={{width:'150px'}}>See More
                    </Button>
          </Item>
                </Grid>
            {/* <Grid item xs={6} sx={{ paddingBottom:'30px'}}>
              <Item><h4>Billing Items</h4>
              <Select
          id="drugName"
          label="Drug Name"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
          required
          fullWidth
          margin="normal"
          size="small"/>



<TextField
          id="total"
          label="Total"
          type="decimal"
          value={unitPrice}
          onChange={(e) => setUnitPrice(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
        /> 
              
              </Item>
            </Grid> */}

     
          
         
          </Grid>
        </FormControl>
        </Box>
        </div>
       
       
        
</Paper>
</Box>
  );
      }
  