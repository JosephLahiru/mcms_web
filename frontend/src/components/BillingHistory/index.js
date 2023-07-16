import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Grid, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function billingHistory() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



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
      <Grid container spacing={1} sx={{paddingTop:'20px', paddingLeft:'50px'}}>
      <Grid item xs={6}>
        <Item><h4 style={{fontWeight:'bold'}}>DOCTOR CHARGES DETALS</h4>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice Date</TableCell>
                  <TableCell>Invoice Id</TableCell>
                  <TableCell>Appointment No.</TableCell>
                  <TableCell>Selected Doctor</TableCell>
                  <TableCell>Doctor Charge</TableCell>
                  <TableCell>
                  <IconButton aria-label="delete" size="small">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Item>
      </Grid>
      <Grid item xs={6}>
        <Item><h4 style={{fontWeight:'bold'}}>BILLING ITEMS DETALS</h4>
        <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice Date</TableCell>
                  <TableCell>Invoice Id</TableCell>
                  <TableCell>Appointment No.</TableCell>
                  <TableCell>Selected Doctor</TableCell>
                  <TableCell>Doctor Charge</TableCell>
                  <TableCell>
                  <IconButton aria-label="delete" size="small">
        <DeleteIcon fontSize="inherit" />
      </IconButton>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Item>
      </Grid>
      </Grid>
    </Paper>
  </Box>
  )
}
