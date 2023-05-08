import React from "react";
import { useEffect, useState } from "react";
// import './../App.css';
import './main.css';


function PatientHistory() {
  const [appointment, PatientHistory] = useState([]);
  const [page, setPage] = useState(0);
   
    useEffect(() => {
        async function fetchAppointment() {
            const response = await fetch("http://158.101.10.103/get_appointment");
            const data = await response.json();
           PatientHistory(data);
        }
        fetchAppointment();
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
  <div className="div1">
      <h1>Patient History</h1>
      <div className="filter">
          <label htmlFor="dateFilter">Filter by Date:</label>
    </div>
        <div className="t-container1">
        <table class="table table-hover table-hover">
          <thead>
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
          </thead>
          <tbody>
            {appointment.map((patients) => <tr key={patients.patient_id}>
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
            <td><table><tr><td><button className="btn btn-primary btn-sm" type="button">Delete</button></td></tr></table></td>
            </tr> 
            )}
          </tbody>
        </table>
        <div className="pagination">
        <button disabled={page === 0} onClick={handlePrevPage}>Prev</button>
        <button disabled={end >= PatientHistory.length} onClick={handleNextPage}>Next</button>
      </div>
        </div>
      </div>
      
);
}

export default PatientHistory;