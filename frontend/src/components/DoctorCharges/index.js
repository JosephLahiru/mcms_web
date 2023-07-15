import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { FormControl, MenuItem, Select, Toolbar,InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';





const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function BasicGrid() {
  const [drugId, setDrugId] = useState('');
  const [drugName, setDrugName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [invDate, setInvDate] = useState(new Date);
  const [appointmentNum, setAppointmentNum] = useState('');
  const [invId, setInvId] = useState('');
  const [doctor, setDoctor] = useState('');
  const [doctorCharge, setDoctorCharge] = useState('');
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalAmount, setTotalAmount] = useState('');



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
    setDrugId('');
    setDrugName('');
    setQuantity(0);
    setUnitPrice(0);
    setDiscount(0);
    setInvId(0);
    setDoctor('');
    setInvDate(new Date);
    setDoctorCharge('');
    setAppointmentNum('');
    setTotalAmount('');
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

    // Reset form after submission
  return (
    <React.Fragment><Toolbar/><CssBaseline />
    <Container fixed sx={{  backgroundColor:'#CCCCFF', height:'100vh',padding:'20px'}}>
      <Grid container spacing={0} sx={{ alignItems:'stretch'}}>
        <Grid item xs={12}>
          <Item><h3>K.G.N. Medi house Invoice</h3></Item>
        </Grid>

      <FormControl onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{paddingTop:'10px'}}>
          <Grid item xs={6} sx={{ paddingBottom:'30px'}}>
          <Item><h4>Doctor Charges</h4>

            <TextField 
                label="Inv/Date" 
                type="date" 
                value={invDate}
                onChange={(e) =>{ setInvDate(e.target.value); setIsError(e.target.value.trim() === '');}}
                defaultValue="Small"
                size="small"
                fullWidth margin="normal"/>

              {isError && <p style={{ color: 'red' }}>Please enter the Invoice date.</p>}
          
            <TextField 
                label="Invoice Number" 
                type="number" 
                value={invId}
                onChange={(e) => {setInvId(e.target.value); setIsError(e.target.value.trim() === '');}}
                defaultValue="Small"
                size="small"
                margin="normal"
                fullWidth />

              {isError && <p style={{ color: 'red' }}>Please enter the Invoice number.</p>}
        
     
            <TextField
                label="Appointment ID"
                value={appointmentNum}
                onChange={(e) => setAppointmentNum(e.target.value)}
                fullWidth
                margin="normal"
                defaultValue="Small"
                size="small"
                inputProps={{ pattern: "\\d*", title: "Please enter a numeric value." }}/>
  
            <FormControl sx={{paddingTop:'20px', width:'100%' }} size="small">
              <InputLabel id="demo-simple-select-label">Select Doctor</InputLabel>
                <Select
                labelId="demo-simple-select-label" 
                id="demo-simple-select" 
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                fullWidth
                size="small"
                label="Select Doctor">
                {((<MenuItem></MenuItem>))}
                </Select>
            </FormControl>
     

            <TextField
                id="outlined-doctor-charge"
                label="Doctor Charge"
                type='number'
                value={doctorCharge}
                onChange={(e) => setDoctorCharge(e.target.value)}
                fullWidth
                margin="normal"
                defaultValue="Small"
                size="small"
                inputProps={{
                step: '0.01',
                min: '0',}}/>
      
  
            <TextField
                id="discount"
                label="Discount(%)"
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                margin="normal"
                size="small"
                fullWidth/>

            <TextField
                id="amount"
                label="Total_Amount"
                type="decimal"
                value={TotalAmount(unitPrice, quantity, discount)}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
                margin="normal"
                size="small"
                fullWidth/>

            </Item></Grid>

            <Grid item xs={6} sx={{ paddingBottom:'30px'}}>
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
          id="quantity"
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          fullWidth
          margin="normal"
          size="small"
             inputProps={{
          step: '1',
          min: '0',
        }}
        />

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
            </Grid>

     
          <Stack spacing={3} direction="row" sx={{paddingLeft:'500px', paddingTop:'20px'}}>
          <Button variant="contained" color='success' size='small' sx={{width:'150px'}}>Submit</Button>
          <Button variant="contained" color='error' size='small' onClick={handleReset} sx={{width:'150px'}}>Reset</Button>
          </Stack>
         
          </Grid>
        </FormControl>
        </Grid>
       </Container>
    </React.Fragment>
  );
      }
  