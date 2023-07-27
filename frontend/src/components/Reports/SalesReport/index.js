import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function SalesReport() {
  const [weeklySalesData, setWeeklySalesData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://mcms_api.mtron.me/get_billing');
        const data = await response.json();

        // Group sales data by month
        const monthlySalesData = data.reduce((result, item) => {
          const month = item.inv_date.slice(0, 7); // Extract the month portion from the invoice date
          if (!result[month]) {
            result[month] = 0;
          }
          result[month] += parseFloat(item.total_amount);
          return result;
        }, {});

        // Convert the monthly sales data into an array of objects
        const formattedSalesData = Object.entries(monthlySalesData).map(([month, totalAmount]) => ({
          month,
          totalAmount,
        }));

        setWeeklySalesData(formattedSalesData);
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
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => `Rs. ${value}`} />
          <Legend />
          <Bar dataKey="totalAmount" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

export default SalesReport;


