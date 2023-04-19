
import React from "react";
import { useEffect, useState } from "react";

// import './../App.css';

import './main.css';


function PatientHistory() {
  const [appointment, PatientHistory] = useState([]);
   
    useEffect(() => {
        async function fetchAppointment() {
            const response = await fetch("http://158.101.10.103/get_appointment");
            const data = await response.json();
           PatientHistory(data);
        }
        fetchAppointment();
    }, []);


return (
  <div className="div1">
      <h1>Patient History</h1>
      <div className="filter">
          <label htmlFor="dateFilter">Filter by Date:</label>
    </div>
        <table class="table">
          <thead>
            <tr class="table-dark">
              <th scope="col"> Appoinment Number </th>
              <th scope="col"> First Name </th>
              <th scope="col"> Last Name </th>
              <th scope="col"> Appointment Doctor </th>
              <th scope="col"> Appointment Type </th>
              <th scope="col"> Appointment Date </th>
              <th scope="col"> Appointment Time </th>
            </tr>
          </thead>
          <tbody>
            {appointment.map((appointment) => <tr key={appointment.appointmentNumber}>
              <td>{appointment.appointmentNumber}</td>
              <td>{appointment.firstName}</td>
              <td>{appointment.lastName}</td>
              <td>{appointment.appointmentDoctor}</td>
              <td>{appointment.appointmentType}</td>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.appointmentTime}</td>
            </tr> 
            )}
          </tbody>
        </table>
      </div>
      
);
}

export default PatientHistory;