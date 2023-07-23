import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

function ProfitData({ title, apiUrl }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, [apiUrl]);

  return (
    <div className="App">
      <Box sx={{ m: 2 }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="selling_cost_free_med" fill="#8884d8" />
          <Bar dataKey="actual_cost_free_med" fill="#82ca9d" />
          <Bar dataKey="selling_cost_issued_med" fill="#ffc658" />
          <Bar dataKey="actual_cost_issued_med" fill="#0088FE" />
          <Bar dataKey="total_profit" fill="#FF8042" />
        </BarChart>
      </Box>
    </div>
  );
}

export default ProfitData;