import React from "react";
import { useEffect, useState } from "react";

function ViewAttendance() {
    
    const [attendance, setAttendance] = useState([]);
    const [filterDate, setFilterDate] = useState("");
    const [filteredAttendance, setFilteredAttendance] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        async function fetchAttendance() {
            const response = await fetch("http://158.101.10.103/get_attendance");
            const data = await response.json();
            setAttendance(data);
            setFilteredAttendance(data); 
        }
        fetchAttendance();
    }, []);

    useEffect(() => {
      const results = attendance.filter((att) => att.date === filterDate);
      setFilterDate(results);
    }, [attendance, filteredAttendance]);

    const handleFilterDateChange = (event) => {
      setFilterDate(event.target.value);
    };

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
      <h1>Attendance</h1>
      <div className="filter">
        <label htmlFor="dateFilter">Filter by Date:</label>
        <input type="date" id="dateFilter" value={filterDate} onChange={handleFilterDateChange} />
      </div>
      <table class="table">
        <thead>
        <tr class="table-dark">
            <th scope="col">Attendance ID</th>
            <th scope="col">Assistant ID</th>
            <th scope="col">date</th>
            <th scope="col">status</th>
        </tr>
        </thead>
        <tbody>
        {filteredAttendance.slice(start, end).map((att) => (
        <tr key={att.assit_id}>
            <td>{att.att_id}</td>
            <td>{att.assit_id}</td>
            <td>{att.date}</td>
            <td>{att.status}</td>
        </tr>
        ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={page === 0} onClick={handlePrevPage}>Prev</button>
        <button disabled={end >= filteredAttendance.length} onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}

export default ViewAttendance;