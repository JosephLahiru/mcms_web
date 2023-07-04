import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'p_id', headerName: 'ID', width: 100 },
  { field: 'app_date', headerName: 'Application Date', width: 200 },
  { field: 'paid_amt', headerName: 'Paid Amount', width: 150 },
];

const ReturnPatientsReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mcms_api.mtron.me/get_returning_none');
        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={data} columns={columns} pageSize={5} />
    </div>
  );
};

export default ReturnPatientsReport;
