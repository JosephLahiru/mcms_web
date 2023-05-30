import React from "react";
import { useEffect, useState } from "react";
// import './../App.css';
import './main.css';
import { useNavigate } from 'react-router-dom';


function PatientHistory() {
  const [appointment, PatientHistory] = useState([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  
  
  useEffect(() => {
        async function fetchAppointment() {
            const response = await fetch("https://mcms_api.mtron.me/get_appointment");
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
        <div className="t-container1">
        <table class="table table-hover table-hover">
          <thead>
          <tr className="table-dark">
            <th scope="col"> Appointment Number </th>
              <th scope="col"> First Name </th>
              <th scope="col"> Last Name </th>
              <th scope="col"> NIC </th>
              <th scope="col"> Address </th>
              {/* <th scope="col"> Email </th> */}
              <th scope="col"> Age </th>
              <th scope="col"> Gender </th>
              <th scope="col"> Telephone Number </th>
              <th scope="col"> Appointment Type </th>
              <th scope="col"> Appointment Time </th>
            </tr>
          </thead>
          <tbody>
          {appointment.map((appointment) => {
              if (appointment.cd_id === 'cd_002') {
                return (
                  <tr key={appointment.app_num}>
                     <td>{appointment.app_num}</td>
                    <td>{appointment.first_name}</td>
                    <td>{appointment.last_name}</td>
                    <td>{appointment.nic}</td>
                    <td>{appointment.address}</td>
                    {/* <td>{appointment.email}</td> */}
                    <td>{appointment.age}</td>
                    <td>{appointment.gender}</td>
                    <td>{appointment.contact_num}</td>
                    <td>{appointment.at_name}</td>
                    <td>{appointment.atm_type}</td>
            <td>
              <table>
                <tr>
                  <td><button className="btn btn-primary btn-sm" type="button">Delete</button>
                  </td>
                  </tr>
                  </table>
                  </td>
            </tr> 
            );
          }
        })}
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