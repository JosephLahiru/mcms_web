import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function ProfitReport() {
  const [monthlyProfitData, setMonthlyProfitData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://mcms_api.mtron.me/get_profit');
        const data = await response.json();

        // Calculate total profit for each month
        const monthlyTotalProfit = {};
        data.forEach((item) => {
          const month = item.date.split('-')[1]; // Extract month from date
          const dailyProfit = parseFloat(item.daily_profit); // Parse daily_profit as a number
          if (monthlyTotalProfit[month]) {
            monthlyTotalProfit[month] += dailyProfit;
          } else {
            monthlyTotalProfit[month] = dailyProfit;
          }
        });

        // Create monthly data array
        const monthlyData = Object.entries(monthlyTotalProfit).map(([month, totalProfit]) => ({
          month,
          total_profit: totalProfit,
        }));

        setMonthlyProfitData(monthlyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ paddingTop: '64px', paddingLeft: '240px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '0' }}>Profit Report</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '-60px' }}>
        <BarChart width={800} height={500} data={monthlyProfitData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_profit" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

export default ProfitReport;