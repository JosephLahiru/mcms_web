import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function ProfitReport() {
  const dummyData = [
    { month: 'Jan', profit: 2000 },
    { month: 'Feb', profit: 2500 },
    { month: 'Mar', profit: 1500 },
    { month: 'Apr', profit: 3000 },
    { month: 'May', profit: 2500 },
    { month: 'Jun', profit: 3500 },
    { month: 'Jul', profit: 3250 },
    { month: 'Aug', profit: 4000 },
    { month: 'Sep', profit: 3500 },
    { month: 'Oct', profit: 3750 },
    { month: 'Nov', profit: 3250 },
    { month: 'Dec', profit: 4250 },
  ];

  const [data/*, setData*/] = useState(dummyData);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <BarChart width={800} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="profit" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default ProfitReport;
