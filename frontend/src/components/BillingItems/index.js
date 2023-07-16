import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { FormControl, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BillingItems() {

  const [listId, setListId] = useState('');
  const [drugId, setDrugId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [unitPrice, setUnitPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState('');
  const navigate = useNavigate();

  function TotalAmount(unitPrice,quantity){
    const totalPrice = unitPrice * quantity;
    return totalPrice;
  }

  const formData ={
    
    listId,
    drugId,
    quantity,
    unitPrice,
    totalAmount,
  }



const handleReset = () => {
  setListId('');
  setDrugId('');
  setQuantity(0);
  setUnitPrice(0);
  setTotalAmount('');

}

const handleSubmit = async (e) => {
  e.preventDefault();


const totalPrice= unitPrice * quantity;

let _totalAmount = TotalAmount(unitPrice,quantity);

const data = {
  list_id: listId,
  drug_id: parseInt(drugId),
  quantity: parseInt(quantity),
  unit_price: parseFloat(unitPrice),
  total_amount: _totalAmount,
};

console.log(data)

try {
  const response = await fetch("https://mcms_api.mtron.me/set_billing_items", {
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
        <h4>BILLING ITEMS</h4>
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
                label="List Id"
                value={listId}
                size="small"
                sx={{width:'300px',paddingBottom:'20px'}}
                // onChange={}
                // error={}
                // helperText={}
                  />

              <TextField
                variant="outlined"
                label="Drug Id"
                value={drugId}
                size="small"
                sx={{width:'300px',paddingBottom:'20px'}}
                // onChange={}
                // error={}
                // helperText={}
                />

              <TextField
                label="Unit price"
                type="decimal"
                value={unitPrice}
                size="small"
                sx={{width:'300px',paddingBottom:'20px'}}
                // onChange={ }
                // error={}
                // helperText={}
              /> 


              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                size="small"
                sx={{width:'300px',paddingBottom:'20px'}}
                // onChange={ }
                // error={}
                // helperText={}
              />

              <TextField
                label="Total_Amount:"
                type="decimal"
                // value={TotalAmount(unitPrice, quantity, discount)}
                size="small"
                sx={{width:'300px',paddingBottom:'20px'}}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
                // error={}
                // helperText={}
              />

            
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
