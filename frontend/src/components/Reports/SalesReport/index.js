import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function SalesReport() {
  const dummyData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 4500 },
    { month: 'Mar', sales: 3000 },
    { month: 'Apr', sales: 6000 },
    { month: 'May', sales: 5000 },
    { month: 'Jun', sales: 7000 },
    { month: 'Jul', sales: 6500 },
    { month: 'Aug', sales: 8000 },
    { month: 'Sep', sales: 7000 },
    { month: 'Oct', sales: 7500 },
    { month: 'Nov', sales: 6500 },
    { month: 'Dec', sales: 8500 },
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
        <Bar dataKey="sales" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default SalesReport;