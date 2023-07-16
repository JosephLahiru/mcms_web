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
  const [listidError, setListIdError] = useState(false);
  const [drugId, setDrugId] = useState('');
  const [drugidError, setDrugIdError] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [quantityError, setQuantityError] = useState(false);
  const [unitPrice, setUnitPrice] = useState(0);
  const [unitpriceError, setUnitPriceError] = useState(false);
  const [totalAmount, setTotalAmount] = useState('');
  const navigate = useNavigate();

  const handleListIdChange  = (event) => {
    const value = event.target.value;
    const isvalidListId = /^\d+$/.test(value);

    setListId(value)

    if(!isvalidListId){
      setListIdError('Invalid input, please enter a number')
    }
    else if (value.trim() === '') {
      console.setListIdError('Field is empty');
    }
    else{
      setListIdError('');
    }
};

const handleDrugIdChange  = (event) => {
  const value = event.target.value;
  const isvalidDrugId = /^\d+$/.test(value);

  setDrugId(value)

  if(!isvalidDrugId){
    setDrugIdError('Invalid input, please enter a number')
  }
  else if (value.trim() === '') {
    console.setDrugIdError('Field is empty');
  }
  else{
    setDrugIdError('');
  }
};

const handleUnitPriceChange = (event) => {
  const isValidUnitPrice = /^[0-9]{1,6}(\.[0-9]{1,2})?$/.test(event.target.value);
  setUnitPrice(event.target.value);
  setUnitPriceError(!isValidUnitPrice);
};

const handleQuantityChange = (event) => {
  const isValidQuantity = /^\d{1,6}$/.test(event.target.value);
  setQuantity(event.target.value);
  setQuantityError(!isValidQuantity);
};


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

const handleSubmit = async (_event) => {
  _event.preventDefault();


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

if (!listidError && !drugidError && !quantityError && !unitpriceError && listId && drugId && quantity && unitPrice && totalAmount){
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
  toast.error("An error occurred while saving the billing data", {
    position: toast.POSITION.TOP_RIGHT,
  });
}}
else {
  toast.error("Please fill all the fields", {
    position: toast.POSITION.TOP_RIGHT,
  });
}};

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
                onChange={ handleListIdChange}
                error={listidError}
                helperText={listidError}
                  />

              <TextField
                variant="outlined"
                label="Drug Id"
                value={drugId}
                size="small"
                sx={{width:'300px',paddingBottom:'20px'}}
                onChange={handleDrugIdChange }
                error={drugidError}
                helperText={drugidError}
                />

              <TextField
                label="Unit price"
                type="decimal"
                value={unitPrice}
                size="small"
                sx={{width:'300px',paddingBottom:'20px'}}
                onChange={handleUnitPriceChange}
                error={unitpriceError}
                helperText={unitpriceError ? 'Please enter a valid unit price' : ''}
              /> 


              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                size="small"
                sx={{width:'300px',paddingBottom:'20px'}}
                onChange={handleQuantityChange}
                error={quantityError}
                helperText={quantityError ? 'Please enter a valid quantity' : ''}
              />

              <TextField
                label="Total_Amount:"
                type="decimal"
                value={TotalAmount(unitPrice, quantity,)}
                size="small"
                sx={{width:'300px',paddingBottom:'20px'}}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
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
