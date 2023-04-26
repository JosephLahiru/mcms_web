import React from "react";
import { useEffect, useState } from "react";
import './main.css';
import { useNavigate } from 'react-router-dom';


function ViewAppointment() {

  const [appointment, ViewAppointment] = useState([]);
  const [filterDate, setFilterDate] = useState("");  
  const navigate = useNavigate();
  

    useEffect(() => {
        async function fetchAppointment() {
            const response = await fetch("http://158.101.10.103/get_appointment");
            const data = await response.json();
            ViewAppointment(data);
        }
        fetchAppointment();
    }, [filterDate]);

    const handleFilterDateChange = (event) => {
      setFilterDate(event.target.value);
  };

    return (
        <><><div className="div1">
        <h1>View Appointment</h1>
        <div className="filter">
          <label htmlFor="dateFilter">Filter by Date:</label>
          <input type="date" id="dateFilter" value={filterDate} onChange={handleFilterDateChange} />
        </div>
        <label htmlFor="dateFilter">The Universal Physician Doctor:</label>
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
              <th>
                <button className="btn btn-primary btn-sm" type="button">Delete</button>
                <button className="btn btn-primary btn-sm" type="button" onClick={() => navigate("/update_appointment")}>Update Appointment</button>
              </th>
            </tr>
            )}
          </tbody>
        </table>
      </div>
        <label htmlFor="dateFilter">Pediatrician Doctor:</label>
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
              <th>
                <button className="btn btn-primary btn-sm" type="button">Delete</button>
                <button className="btn btn-primary btn-sm" type="button" onClick={() => navigate("/update_appointment")}>Update Appointment</button>
              </th>
            </tr>
            )}
          </tbody>
        </table></><label htmlFor="dateFilter">Scan Doctor:</label><table class="table">
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
              <td><table><tr><td><button className="btn btn-primary btn-sm" type="button">Delete</button></td><td><button className="btn btn-primary btn-sm" type="button" onClick={() => navigate("/update_appointment")}>Update Appointment</button></td></tr></table>~</td>
            </tr>
            )}
          </tbody>
        </table></>

      );
      }
export default ViewAppointment;