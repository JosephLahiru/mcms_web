import React from "react";
import { useEffect, useState } from "react";

function ViewAppointment() {

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
        <><div className="div1">
        <h1>View Appointment</h1>
        <div className="filter">
          <label htmlFor="dateFilter">Filter by Date:</label>
          <input type="date" id="dateFilter" value={filterDate} onChange={handleFilterDateChange} />
        </div>
        <h5>The Universal Physician Doctor</h5>
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
            </tr>
            )}
          </tbody>
        </table>
      </div><h5>Pediatrician</h5><table class="table">
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
            </tr>
            )}
          </tbody>
        </table></>

        
      );

    }
export default ViewAppointment;