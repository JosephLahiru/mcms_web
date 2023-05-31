import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';


const ReturnPatientsReport = () => {
  const [returnPatients, setReturn] = useState([]);
  <h1>and known patients transaction report</h1>
  const rows = [
    { id: 1, col1: 'Hello', col2: 'World' },
    { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    { id: 3, col1: 'MUI', col2: 'is Amazing' },
  ];
  
  const columns = [
    { field: 'col1', headerName: 'Patient Id', width: 150 },
    { field: 'col2', headerName: 'Appointment Date', width: 150 },
    { field: 'col2', headerName: 'Paid Amount', width: 150 },
  ];

  useEffect(() => {
    async function fetchReturn() {
      const response = await fetch("https://mcms_api.mtron.me/get_returning_none");
      const data = await response.json();
      setReturn(data);
    }
    fetchReturn();
  }, []);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
    />
  ) 
}

export default ReturnPatientsReport