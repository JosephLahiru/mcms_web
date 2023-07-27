import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function SalesReport() {
  const [weeklySalesData, setWeeklySalesData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://mcms_api.mtron.me/get_attendance');
        const data = await response.json();
        setWeeklySalesData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ paddingTop: '64px', paddingLeft: '240px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '0' }}>Sales Report</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '-60px' }}>
        <BarChart width={800} height={500} data={weeklySalesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

export default SalesReport;

