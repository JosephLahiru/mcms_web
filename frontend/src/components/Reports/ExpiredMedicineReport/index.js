import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    h4: {
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
  },
});

function ExpiredMedicineReport() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetch('https://mcms_api.mtron.me/get_expired')
      .then(response => response.json())
      .then(data => {
        const extractedMedicines = data.map(medicine => {
          const expiryDateTime = new Date(medicine.exp_date);
          const expiryDate = expiryDateTime.toISOString().split('T')[0];
          return {
            name: medicine.prdct_name,
            expiryDate: expiryDate
          };
        });
        setMedicines(extractedMedicines);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Paper elevation={3} sx={{ width: '60%', height: '80%', p: 2, mx: 'auto' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Expired Medicine Report
          </Typography>
          <Grid container spacing={2}>
            {medicines.map((medicine, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ListItem>
                  <ListItemIcon>
                    <WarningIcon color="error" />
                  </ListItemIcon>
                  <ListItemText
                    primary={medicine.name}
                    secondary={`Expired on: ${medicine.expiryDate}`}
                  />
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}

export default ExpiredMedicineReport;
