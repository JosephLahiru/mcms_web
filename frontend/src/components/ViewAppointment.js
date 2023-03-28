import './ViewAppointment.css';
import './../App.css';

import { useEffect, useState } from "react";

function ViewAppointment(){
  const [appointment, ViewAppointment] = useState([]);

    useEffect(() => {
        async function fetchAppointment() {
            const response = await fetch("http://158.101.10.103/add_appointment");
            const data = await response.json();
            ViewAppointment(data);
        }
        fetchAppointment();
    }, []);

    return (
        <div>
          <h1>View Appointment</h1>
          <table border="1">
        <tr>
            <th> Appoinment Number </th>
            <th> Patient Name </th>
            <th> NIC </th>
            <th> Appointment Date </th>
            <th> Appointment Time </th>
        </tr>
        {appointment.map((appointment)=>
        <tr key={appointment.appointmentNumber}>
            <td>{appointment.appointmentNumber}</td>
            <td>{appointment.firstName}</td>
            <td>{appointment.nic}</td>
            <td>{appointment.appointmentDate}</td>
            <td>{appointment.appointmentTime}</td>
        </tr>
        )}
      </table>
        </div>
      );

    }
export default ViewAppointment;