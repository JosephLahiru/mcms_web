import React from "react";
import { useEffect, useState } from "react";
import './main.css';
import { useNavigate } from 'react-router-dom';


function ViewAppointment(){

  const [appointment, setViewAppointment] = useState([]);
  const [filterDate, setFilterDate] = useState(""); 
  const [searchTerm] = useState("");
  const [page, setPage] = useState(0); 
  const navigate = useNavigate();
  

    useEffect(() => {
        async function fetchAppointment() {
            const response = await fetch("http://158.101.10.103/get_appointment");
            const data = await response.json();
            fetchAppointment(data);
            setViewAppointment(data);
        }
        fetchAppointment();
    }, []);

    useEffect(() => {
      const results = appointment.filter((item) =>
        item.prdct_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setViewAppointment(results);
    }, [searchTerm, appointment]);
  
  
    const handleNextPage = () => {
      setPage(page + 1);
    };
  
    const handlePrevPage = () => {
      setPage(page - 1);
    };
    const handleFilterDateChange = (event) => {
      setFilterDate(event.target.value);
    };
  const rowsPerPage = 10;
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
    return (
        <div className="div1">
        <h1>View Appointment</h1>
        <div className="filter">
          <label htmlFor="dateFilter">Filter by Date:</label>
          <input type="date" id="dateFilter" value={filterDate} onChange={handleFilterDateChange} />
        </div>
         <label className="label1">The Universal Physician:</label>
        <table class="table">
          <thead>
            <tr class="table-dark">
              <th scope="col"> App Num </th>
              <th scope="col"> First Name </th>
              <th scope="col"> Last Name </th>
              <th scope="col"> NIC </th>
              <th scope="col"> Address </th>
              <th scope="col"> Age </th>
              <th scope="col"> Gender </th>
              <th scope="col"> Cont Num </th>
              <th scope="col"> Email </th>
              <th scope="col"> App Type </th>
              <th scope="col"> App Time </th>
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
              <td><table><tr><td><button className="btn btn-primary btn-sm" type="button">Delete</button></td><td><button className="btn btn-primary btn-sm" type="button" onClick={() => navigate("/update_appointment")}>Update</button></td></tr></table></td>
            </tr>
            )}
          </tbody>
        </table>
        <label className="label1">Pediatrician Doctor:</label>
        <table class="table">
          <thead>
            <tr class="table-dark">
              <th scope="col"> App Num </th>
              <th scope="col"> First Name </th>
              <th scope="col"> Last Name </th>
              <th scope="col"> NIC </th>
              <th scope="col"> Address </th>
              <th scope="col"> Age </th>
              <th scope="col"> Gender </th>
              <th scope="col"> Cont Num </th>
              <th scope="col"> Email </th>
              <th scope="col"> App Type </th>
              <th scope="col"> App Time </th>
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
              <td><table><tr><td><button className="btn btn-primary btn-sm" type="button">Delete</button></td><td><button className="btn btn-primary btn-sm" type="button" onClick={() => navigate("/update_appointment")}>Update</button></td></tr></table></td>
            </tr>
            )}
          </tbody>
        </table>
        <label className="label1">Scan Doctor:</label>
        <table class="table">
          <thead>
            <tr class="table-dark">
              <th scope="col"> App Num </th>
              <th scope="col"> First Name </th>
              <th scope="col"> Last Name </th>
              <th scope="col"> NIC </th>
              <th scope="col"> Address </th>
              <th scope="col"> Age </th>
              <th scope="col"> Gender </th>
              <th scope="col"> Cont Num </th>
              <th scope="col"> Email </th>
              <th scope="col"> App Type </th>
              <th scope="col"> App Time </th>
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
              <td><table><tr><td><button className="btn btn-primary btn-sm" type="button">Delete</button></td><td><button className="btn btn-primary btn-sm" type="button" onClick={() => navigate("/update_appointment")}>Update</button></td></tr></table></td>
            </tr>
           )}
           </tbody>
            </table>
            <div className="pagination">
        <button disabled={page === 0} onClick={handlePrevPage}>Prev</button>
        <button disabled={end >= setViewAppointment.length} onClick={handleNextPage}>Next</button>
      </div>
        </div>  


      );
    }
export default ViewAppointment;