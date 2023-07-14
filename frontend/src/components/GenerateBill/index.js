import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



export default function doctorCharge() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  
 function handleSubmit(event) {
  event.preventDefault();
 }


  return (
    <Box
    sx={{
      display: 'flex',
      '& > :not(style)': {
        m: 1,
        width: '100%',
        backgroundColor:'pink',
        height: 670,        
      },
    }}
  >
    <Paper variant="outlined" >
      <Grid item xs={12} sx={{paddingTop:'25px', }}>
      <Item sx={{paddingBottom:'50px'}}>
        <h3 style={{fontWeight: 'bold', paddingTop:'25px'}}>KGN MEDI HOUSE BILLING SYSTEM</h3>
        </Item>
      <Item>
        <Stack direction="row" spacing={5} sx={{}}>
            <Button variant="contained" size='large' onClick={handleSubmit}>Contained</Button>
            <Button variant="contained" size='large' onClick={handleSubmit}>Contained</Button>
        </Stack>
      </Item>
      </Grid>
      </Paper>
  </Box>
  

    
  );
}
