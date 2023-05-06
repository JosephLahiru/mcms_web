import React from "react";
import { useEffect, useState } from "react";
import './main.css';
import { useNavigate } from 'react-router-dom';


function ViewAppointment(){

  const [appointment, setViewAppointment] = useState([]);
  const [filterDate, setFilterDate] = useState(""); 
  const [page, setPage] = useState(0); 
  const navigate = useNavigate();
  

    useEffect(() => {
        async function fetchAppointment() {
            const response = await fetch("https://mcms_api.mtron.me/get_appointment");
            const data = await response.json();
            setViewAppointment(data);
        }
        fetchAppointment();
    }, []);  
  
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
        <div className="view-appointment-main-container">
        <h1>View Appointment</h1>
        <div className="view-appointment-filter">
          <label htmlFor="dateFilter">Filter by Date:</label>
          <input type="date" id="dateFilter" value={filterDate} onChange={handleFilterDateChange} />
        </div>
         <label className="view-appointment-label">The Universal Physician:</label>
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
            {appointment.map((appointment) => {
              if (appointment.cd_id === 'cd_001') {
                return (
                  <tr key={appointment.app_num}>
                    <td>{appointment.app_num}</td>
                    <td>{appointment.first_name}</td>
                    <td>{appointment.last_name}</td>
                    <td>{appointment.nic}</td>
                    <td>{appointment.address}</td>
                    <td>{appointment.age}</td>
                    <td>{appointment.gender}</td>
                    <td>{appointment.contact_num}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.at_id}</td>
                    <td>{appointment.atm_id}</td>
                    <td>
                      <table>
                        <tr>
                          <td>
                            <button className="btn btn-primary btn-sm" type="button">
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              type="button"
                              onClick={() => navigate("/update_appointment")}
                            >
                              Update
                            </button>
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
        <label className="view-appointment-label">Pediatrician Doctor:</label>
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
            {appointment.map((appointment) => {
              if (appointment.cd_id === 'cd_002') {
                return (
                  <tr key={appointment.app_num}>
                    <td>{appointment.app_num}</td>
                    <td>{appointment.first_name}</td>
                    <td>{appointment.last_name}</td>
                    <td>{appointment.nic}</td>
                    <td>{appointment.address}</td>
                    <td>{appointment.age}</td>
                    <td>{appointment.gender}</td>
                    <td>{appointment.contact_num}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.at_id}</td>
                    <td>{appointment.atm_id}</td>
                    <td>
                      <table>
                        <tr>
                          <td>
                            <button className="btn btn-primary btn-sm" type="button">
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              type="button"
                              onClick={() => navigate("/update_appointment")}
                            >
                              Update
                            </button>
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
        <label className="view-appointment-label">Scan Doctor:</label>
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
            {appointment.map((appointment) => {
              if (appointment.cd_id === 'cd_003') {
                return (
                  <tr key={appointment.app_num}>
                    <td>{appointment.app_num}</td>
                    <td>{appointment.first_name}</td>
                    <td>{appointment.last_name}</td>
                    <td>{appointment.nic}</td>
                    <td>{appointment.address}</td>
                    <td>{appointment.age}</td>
                    <td>{appointment.gender}</td>
                    <td>{appointment.contact_num}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.at_id}</td>
                    <td>{appointment.atm_id}</td>
                    <td>
                      <table>
                        <tr>
                          <td>
                            <button className="btn btn-primary btn-sm" type="button">
                              Delete
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm"
                              type="button"
                              onClick={() => navigate("/update_appointment")}
                            >
                              Update
                            </button>
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
        <button disabled={end >= setViewAppointment.length} onClick={handleNextPage}>Next</button>
      </div>
        </div>  


      );
    }
export default ViewAppointment;