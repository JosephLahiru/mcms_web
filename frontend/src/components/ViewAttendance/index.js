import React, { useEffect, useState } from "react";
import "./main.css";

function ViewAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchAttendance() {
      const response = await fetch("https://mcms_api.mtron.me/get_attendance");
      const data = await response.json();
      setAttendance(data);
      setFilteredAttendance(data);
    }
    fetchAttendance();
  }, []);

  useEffect(() => {
    const results = attendance.filter((att) =>
      att.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAttendance(results);
    setPage(0); // Reset page to 0 when filter changes
  }, [searchTerm, attendance]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };

  const rowsPerPage = 10;
  const totalPages = Math.ceil(filteredAttendance.length / rowsPerPage);
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  const hasPrevPage = page > 0;
  const hasNextPage = page < totalPages - 1;

  return (
    <div className="div1">
      <h1>View Attendance</h1>
      <div className="view-attendance-filter">
        <div className="view-attendance-search-filter">
          <label className="view-attendance-label" htmlFor="drugSearch">Search by</label><select><option>Drug Name</option><option>Drug type</option><option>Quantity</option></select>
        </div>
        <div className="view-attendance-search-input">
          <input type="text" class="form-control form-control-sm" value={searchTerm} onChange={handleInputChange} placeholder="Search for a drug..."/>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr className="table-dark">
            <th scope="col">Attendance ID</th>
            <th scope="col">Assistant ID</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAttendance.slice(start, end).map((att) => (
            <tr key={att.att_id}>
              <td>{att.att_id}</td>
              <td>{att.assit_id}</td>
              <td>{att.date.slice(0, 10)}</td>
              <td>{att.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button className="btn btn-primary" disabled={!hasPrevPage} onClick={handlePrevPage}>Prev</button>
        <button className="btn btn-primary" disabled={!hasNextPage} onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}

export default ViewAttendance;
