import './ViewAppointment.css';
import './../App.css';

import { useEffect, useState } from "react";

function ViewAppointment(){
  const [appointment, ViewAppointment] = useState([]);
  const [filterDate, setFilterDate] = useState("");

    useEffect(() => {
        async function fetchAppointment() {
            const response = await fetch("http://158.101.10.103/add_appointment");
            const data = await response.json();
            ViewAppointment(data);
        }
        fetchAppointment();
    }, [filterDate]);

    const handleFilterDateChange = (event) => {
      setFilterDate(event.target.value);
  };

    return (
        <div className="div1">
          <h1>View Appointment</h1>
          <div className="filter">
          <label htmlFor="dateFilter">Filter by Date:</label>
        <input type="date" id="dateFilter" value={filterDate} onChange={handleFilterDateChange} />
      </div>
      <h1>The Universal Physician Doctor</h1>
          <table class="table">
          <thead>
        <tr>
            <th scope="col"> Appoinment Number </th>
            <th scope="col"> Patient Name </th>
            <th scope="col"> NIC </th>
            <th scope="col"> Appointment Date </th>
            <th scope="col"> Appointment Time </th>
            <th scope="col"> Appointment Doctor </th>
        </tr>
        </thead>
        <tbody>
        {appointment.map((appointment)=>
        <tr key={appointment.appointmentNumber}>
            <td>{appointment.appointmentNumber}</td>
            <td>{appointment.firstName}</td>
            <td>{appointment.nic}</td>
            <td>{appointment.appointmentDate}</td>
            <td>{appointment.appointmentTime}</td>
            <td>{appointment.appointmentDoctor}</td>
        </tr>
        )}
         </tbody>
      </table>
        </div>
        
      );

    }
export default ViewAppointment;