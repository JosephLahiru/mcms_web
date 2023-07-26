// import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { FaMedkit } from 'react-icons/fa';

function ExpiredMedicineReport() {
  // const [medicines, setMedicines] = useState([]);

  // useEffect(() => {
  //   async function getExpiredMedicineData() {
  //     try {
  //       const response = await fetch('https://mcms_api.mtron.me/get_expired');
  //       const data = await response.json();
  //       setMedicines(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getExpiredMedicineData();
  // }, []);
    const dummyData = [
      { name: 'Medicine1', expiryDate: '2023-08-01' },
      { name: 'Medicine2', expiryDate: '2023-09-01' },
      { name: 'Medicine3', expiryDate: '2023-10-01' },
      { name: 'Medicine4', expiryDate: '2023-11-01' },
      { name: 'Medicine5', expiryDate: '2023-12-01' },
      { name: 'Medicine6', expiryDate: '2024-01-01' },
    ];
      

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Grid container spacing={1} justifyContent="center">
          {dummyData.map((medicine, index) => (
            <Grid item xs={4} key={index}>
              <Card sx={{ backgroundColor: 'purple', color: 'white', border: '2px solid purple', height: '150px'}}>
                <CardContent style={{ height: '150px'}}>
                  <FaMedkit style={{ fontSize: '48px', marginBottom: '10px' }} />
                  <Typography variant="h6" component="div">{medicine.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{`Expiry Date: ${medicine.expiryDate}`}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

export default ExpiredMedicineReport;
