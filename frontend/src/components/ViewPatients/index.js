import React, { useEffect, useState } from 'react';
import './main.css';
import { useNavigate } from 'react-router-dom';

function ViewPatients() {

    const [patients, ViewPatients] = useState([]);
    const [page, setPage] = useState(0);
    const navigate = useNavigate(); 
   

    useEffect(() => {
        async function fetchPatients() {
            const response = await fetch("http://mcms_api.mtron.me/get_patients");
            const data = await response.json();
            ViewPatients(data);
            fetchPatients(data);
        }
        fetchPatients();
    }, []);


    const handleNextPage = () => {
        setPage(page + 1);
      };
    
      const handlePrevPage = () => {
        setPage(page - 1);
      };
      
    const rowsPerPage = 10;
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;

return (
    <div className='content'>
        <h1>View Patient List</h1>
      <table className='t1' border="1">
        <tr class="table-dark">
            <th scope="col">Patient Id</th>
            <th scope="col">Appointment number</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Age</th>
            <th scope="col">NIC Number</th>
            <th scope="col">Contact Number</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Appointment date</th>
            <th scope="col">Appointment type</th>
            <th scope="col">Appointment doctor</th>
            <th scope="col">Address</th>
            
        </tr>
        {patients.map((patients)=>
        <tr  key={patients.patient_id}>
            <td>{patients.patient_id}</td>
            <td>{patients.appointment_number}</td>
            <td>{patients.first_name}</td>
            <td>{patients.last_name}</td>
            <td>{patients.age}</td>
            <td>{patients.nic_number}</td>
            <td>{patients.contact_number}</td>
            <td>{patients.email}</td>
            <td>{patients.gender}</td>
            <td>{patients.appointment_date}</td>
            <td>{patients.appointment_type}</td>
            <td>{patients.appointment_doctor}</td>
            <td>{patients.address}</td>
            <td><table><tr><td><button className="btn btn-primary btn-sm" type="button">Delete</button></td><td><button className="btn btn-primary btn-sm" type="button" onClick={() => navigate("/update_patient")}>Update</button></td></tr></table></td>
        </tr>
        )}
        </table>
        <div className="pagination">
        <button disabled={page === 0} onClick={handlePrevPage}>Prev</button>
        <button disabled={end >= ViewPatients.length} onClick={handleNextPage}>Next</button>
      </div>
      
    </div>
  )
}

export default ViewPatients;
