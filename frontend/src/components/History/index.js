import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { FormControl, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';



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
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [invDate, setInvDate] = useState('');
  const [appointmentId, setAppointmentId] = useState('');
  const [invNum, setInvNum] = useState('');
  const [doctor, setDoctor] = useState('');
  const [doctorCharge, setDoctorCharge] = useState('');
  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const formData = {
    drugId,
    drugName,
    quantity,
    total,
    discount,
    invDate,
    appointmentId,
    invNum,
    doctor,
    doctorCharge,
  };

  console.log('Form Data:', formData);

const handleReset = () => {
    setDrugId('');
    setDrugName('');
    setQuantity(0);
    setTotal(0);
    setDiscount(0);
    setInvNum(0);
    setDoctor('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate total after discount
    const discountedTotal = total - (total * discount) / 100;

    // Generate bill or perform other actions here
    console.log('Drug ID:', drugId);
    console.log('Drug Name:', drugName);
    console.log('Quantity:', quantity);
    console.log('Total:', total);
    console.log('Discount:', discount);
    console.log('Discounted Total:', discountedTotal);
    console.log('Invoice Number:',invNum);

    // Reset form after submission
    handleReset();
  
  };
  return (
    <React.Fragment>
    <CssBaseline />
    <Container fixed sx={{  backgroundColor:'#CCCCFF', height:'100vh',padding:'20px'}}>
      <Grid container spacing={0.5} sx={{ alignItems:'stretch'}}>
      <Grid item xs={12}>
          <Item>
          <h3>K.G.N. Medi house Invoice</h3>
          No.05, Galle Road,Galle.<br/>
          contact: +94 715341676<br/>
          Fax: +94 20 7496 4630.
          </Item>
        </Grid>

        <Grid item xs={12} sx={{paddingTop:'20px', paddingBottom:'30px'}}>
          <Item>
          <FormControl fullWidth sx={{ paddingBottom: '5px', marginLeft:'10px', width:'400px', marginRight:'10px'}}  onSubmit={handleSubmit}>

          <label>Invoice Date</label>

            <TextField id="outlined-date" 
                label="Inv/Date" 
                type="date" 
                value={invDate}
                onChange={(e) => setInvDate(e.target.value)}
                defaultValue="Small"
                size="small"
                fullWidth
                margin="normal"
                InputLabelProps={{
                shrink: true,}}/>

          <label>Invoice Number</label>
          
          <TextField id="outlined-number" 
          label="Inv/Number" 
          type="number" 
          alue={invNum}
          onChange={(e) => setInvNum(e.target.value)}
          defaultValue="Small"
          size="small"
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true,}}
            />
         
          </FormControl>
     
        <FormControl fullWidth sx={{  paddingBottom: '5px', marginLeft:'10px', width:'400px', marginRight:'10px',marginBottom:'20px'}} onSubmit={handleSubmit}>
        <label>Appointment Number</label>
        <TextField
          id="outlined"
          label="App/ID:"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
          required
          fullWidth
          margin="normal"
          defaultValue="Small"
          size="small"/>
  

      <label style={{paddingTop:'15px'}}>Select Doctor</label>
      {/* <InputLabel id="outlined-demo-controlled-open-select-label">Select Doctor</InputLabel> */}
      <Select
    labelId="demo-controlled-open-select-label"
     open={open}
    onClose={handleClose}
    onOpen={handleOpen}
    id="outlined"
    value={doctor}
    onChange={(e) => setDoctor(e.target.value)}
    required
    fullWidth
    margin="normal"
    size="small"
 
>
    <MenuItem value="doctor1">Doctor 1</MenuItem>
    <MenuItem value="doctor2">Doctor 2</MenuItem>
    <MenuItem value="doctor3">Doctor 3</MenuItem>
    <MenuItem value="doctor4">Doctor 4</MenuItem>
  </Select>
      </FormControl>

      <FormControl fullWidth sx={{ paddingBottom: '1px', marginLeft:'10px', width:'400px', marginRight:'10px'}} onSubmit={handleSubmit}>
      <label>Doctor Charge</label>
        <TextField
          id="outlined-doctor-charge"
          label="Doctor Charge:"
          type='number'
          value={doctorCharge}
          onChange={(e) => setDoctorCharge(e.target.value)}
          required
          fullWidth
          margin="normal"
          defaultValue="Small"
          size="small"
          inputProps={{
          step: '0.01',
          min: '0',
        }}/>
      
      <label>Drug ID</label>
        <TextField
          id="drugId"
          label="Drug ID:"
          value={drugId}
          onChange={(e) => setDrugId(e.target.value)}
          required
          margin="normal"
          size="small"
        />
        </FormControl>

     <FormControl fullWidth sx={{  paddingBottom: '1px', marginLeft:'10px', width:'400px', marginRight:'10px'}} onSubmit={handleSubmit}>
     <label style={{paddingTop:'15px'}}>Drug Name</label>
        <Select
          id="drugName"
          label="Drug Name:"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
          required
          margin="normal"
          size="small"
        >
    
    <MenuItem value="drug 1">Drug 1</MenuItem>
    <MenuItem value="drug 2">Drug 2</MenuItem>
    <MenuItem value="drug 3">Drug 3</MenuItem>
    <MenuItem value="drug 4">Drug 4</MenuItem>
    <MenuItem value="drug 5">Drug 5</MenuItem>
  </Select>
      
      {/* <FormControl fullWidth sx={{  marginLeft:'10px', width:'400px', marginRight:'10px', marginBottom:'10px'}} onSubmit={handleSubmit}> */}
      <label style={{paddingTop:'8px'}}>Drug Quantity</label>
        <TextField
          id="quantity"
          label="Quantity:"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          margin="normal"
          size="small"
             inputProps={{
          step: '1',
          min: '0',
        }}
        />
        </FormControl>
   
   <FormControl fullWidth sx={{ paddingBottom: '1px', marginLeft:'10px', width:'400px', marginRight:'10px'}} onSubmit={handleSubmit}>
   <label>Drug Price</label> 
        <TextField
          id="total"
          label="Total:"
          type="number"
          value={total}
          onChange={(e) => setTotal(Number(e.target.value))}
          required
          margin="normal"
          size="small"
        />
        </FormControl>
      
      <FormControl fullWidth sx={{  marginLeft:'10px', width:'400px', marginRight:'10px', marginBottom:'10px'}} onSubmit={handleSubmit}>
      <label>Discount</label> 
        <TextField
          id="discount"
          label="Discount(%):"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          required
          margin="normal"
          size="small"
        /></FormControl>
     
          <Stack spacing={3} direction="row" sx={{paddingLeft:'500px', paddingTop:'20px'}}>
          <Button variant="contained" color='success' size='small' onClick={handleSubmit}>Submit</Button>
          <Button variant="contained" color='error' size='small' onClick={handleReset}>Reset</Button>
          </Stack>
          </Item>
          </Grid>
        </Grid>
    </Container>
    </React.Fragment>
  );
}