import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

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

  const handleReset = () => {
    setDrugId('');
    setDrugName('');
    setQuantity(0);
    setTotal(0);
    setDiscount(0);
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

    // Reset form after submission
    handleReset();
  };

  return (
    <React.Fragment>
    <CssBaseline />
    <Container fixed>
    <Box sx={{  backgroundColor:'#CCCCFF', height:'100vh',padding:'20px' }}>
      <Grid container spacing={0.5}>
      <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item> <form onSubmit={handleSubmit}>
        <div style={{marginBottom:'20px'}}>
          <label htmlFor="drugId" style={{marginRight:'50px', width:'100px'}}>Drug ID:</label>
          <input type="text" id="drugId" value={drugId} onChange={(e) => setDrugId(e.target.value)}required/>
        </div>
        <div style={{marginBottom:'20px'}}>
          <label htmlFor="drugName" style={{marginRight:'50px',width:'100px'}}>Drug Name:</label>
          <input type="text" id="drugName" value={drugName} onChange={(e) => setDrugName(e.target.value)}required/>
        </div>
        <div style={{marginBottom:'20px'}}>
          <label htmlFor="quantity" style={{width:'100px',marginRight:'50px'}}>Quantity:</label>
          <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}required/>
        </div>
        <div style={{marginBottom:'20px'}}>
          <label htmlFor="total" style={{marginRight:'50px',width:'100px'}}>Total:</label>
          <input type="number" id="total" value={total} onChange={(e) => setTotal(Number(e.target.value))}required/>
        </div>
        <div style={{marginBottom:'20px'}}>
          <label htmlFor="discount" style={{marginRight:'50px',width:'100px'}}>Discount(%):</label>
          <input type="number" id="discount" value={discount}onChange={(e) => setDiscount(Number(e.target.value))}required/>
        </div>
        <div>
        <Stack spacing={1} direction="row">
          <button variant="contained" color='success'>Submit</button>
          <button variant="button" onClick={handleReset}>Reset</button>
          </Stack>
        </div>
      </form></Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid item xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
    </Container>
    </React.Fragment>
  );
}