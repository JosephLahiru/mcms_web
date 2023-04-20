// import './../App.css';
import React from "react";
import { useEffect, useState } from "react";
import './main.css';



function UpdateAppointment() {

  const [appointment, UpdateAppointment] = useState([]);
  const [filterDate, setFilterDate] = useState("");

    useEffect(() => {
        async function fetchAppointment() {
            const response = await fetch("http://158.101.10.103/add_appointment");
            const data = await response.json();
            UpdateAppointment(data);
        }
        fetchAppointment();
    }, [filterDate]);

    const handleFilterDateChange = (event) => { 
      setFilterDate(event.target.value);
  };

    return (
        <div>
          <h1>Update Appointment</h1>
          <div className="filter">
          <label htmlFor="dateFilter">Filter by Date:</label>
          <input type="date" id="dateFilter" value={filterDate} onChange={handleFilterDateChange} />
        </div>
        <table class="table">
          <thead>
            <tr class="table-dark">
              <th scope="col"> Appoinment Number </th>
              <th scope="col"> First Name </th>
              <th scope="col"> Last Name </th>
              <th scope="col"> NIC </th>
              <th scope="col"> Address </th>
              <th scope="col"> Age </th>
              <th scope="col"> Gender </th>
              <th scope="col"> Contact Number </th>
              <th scope="col"> Email </th>
              <th scope="col"> Appointment Type </th>
              <th scope="col"> Appointment Time </th>
              <th scope="col"> Appointment Date </th>
            </tr>
          </thead>
          <tbody>
            {appointment.map((appointment) => <tr key={appointment.appointmentNumber}>
              <td>{appointment.appointmentNumber}</td>
              <td>{appointment.firstName}</td>
              <td>{appointment.lastName}</td>
              <td>{appointment.nic}</td>
              <td>{appointment.address}</td>
              <td>{appointment.age}</td>
              <td>{appointment.gender}</td>
              <td>{appointment.contactNumber}</td>
              <td>{appointment.email}</td>
              <td>{appointment.appointmentType}</td>
              <td>{appointment.appointmentTime}</td>
              <td>{appointment.appointmentDate}</td>
            </tr> 
            )}
          </tbody>
        </table>
        </div>
    );
 
    }
    
    export default UpdateAppointment;