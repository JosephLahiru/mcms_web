import React, { useEffect, useState } from 'react';
import './main.css';

function RetrievePatients() {

    const [patients, RetrievePatients] = useState([]);

    useEffect(() => {
        async function fetchPatients() {
            const response = await fetch("http://mcms_api.mtron.me/get_patients");
            const data = await response.json();
            RetrievePatients(data);
        }
        fetchPatients();
    }, []);

return (
    <div className='content'>
        <h1>View Patient List</h1>
      <table className='t1' border="1">
        <tr>
            <th>Patient Id</th>
            <th>Appointment date</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>NIC Number</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Contact Number</th>
        </tr>
        {patients.map((patients)=>
        <tr key={patients.patient_id}>
            <td>{patients.patient_id}</td>
            <td>{patients.appointment_date}</td>
            <td>{patients.first_name}</td>
            <td>{patients.last_name}</td>
            <td>{patients.nic_number}</td>
            <td>{patients.gender}</td>
            <td>{patients.address}</td>
            <td>{patients.contact_number}</td>
        </tr>
        )}
        </table>
      
    </div>
  )
}

export default RetrievePatients;
