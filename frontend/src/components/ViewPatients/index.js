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
    <div className='patient-table-container'>
        <h1>View Patient List</h1>
      <table class='patient-table table-bordered' >
      <thead>
        <tr class="t-row">
            <th scope="col" class="col-md-1">Patient Id</th>
            <th scope="col" class="col-md-1">Appointment number</th>
            <th scope="col" class="col-md-1">First Name</th>
            <th scope="col" class="col-md-1">Last Name</th>
            <th scope="col" class="col-md-1">Age</th>
            <th scope="col" class="col-md-1">NIC Number</th>
            <th scope="col" class="col-md-1">Contact Number</th>
            <th scope="col" class="col-md-1">Email</th>
            <th scope="col" class="col-md-1">Gender</th>
            <th scope="col" class="col-md-1">Medication History</th>
            <th scope="col" class="col-md-1">Appointment date</th>
            <th scope="col" class="col-md-1">Appointment type</th>
            <th scope="col" class="col-md-1">Appointment doctor</th>
            <th scope="col" class="col-md-4">Address</th>
          </tr>
        </thead>
        {patients.map((patients)=>
        <tr  key={patients.patient_id}>
            <td className='t-col'>{patients.patient_id}</td>
            <td>{patients.appointment_number}</td>
            <td>{patients.first_name}</td>
            <td>{patients.last_name}</td>
            <td>{patients.age}</td>
            <td>{patients.nic_number}</td>
            <td>{patients.contact_number}</td>
            <td>{patients.email}</td>
            <td>{patients.gender}</td>
            <td>{patients.medication_history}</td>
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
