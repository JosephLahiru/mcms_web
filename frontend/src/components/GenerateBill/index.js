import React  from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';



export default function DoctorCharges() {

  const navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  
//  function handleSubmit(event) {
//   event.preventDefault();
//  }

 function handleDoctorChargesClick() {
  navigate('/doctor_charges');
}

function handleBillingItemsClick() {
  navigate('/billing_items');
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
    <Paper variant="outlined" >
      <Grid item xs={12} sx={{paddingTop:'25px', bgColor:'#D8BFD8', }}>
      <Item sx={{paddingBottom:'50px'}}>
        <h3 style={{fontWeight: 'bold', paddingTop:'25px'}}>KGN MEDI HOUSE BILLING SYSTEM</h3>
        </Item>
      <Item>
        <Stack direction="row" spacing={5} sx={{paddingLeft:'490px', paddingBottom:'25px'}}>
            <Button variant="contained" 
            size='large'  
            sx={{width:'250px'}} 
            onClick={handleDoctorChargesClick}>Doctor Charges
            </Button>

            <Button variant="contained" 
            size='large' 
            onClick={handleBillingItemsClick} 
            sx={{width:'250px'}}>Billing Items
            </Button>
        </Stack>
      </Item>
      </Grid>
      </Paper>
  </Box>
  

    
  );
}
