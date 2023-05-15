import React, { useEffect, useState } from "react";
import "./main.css";

function ViewAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Assistant ID");
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
    let results;
    switch (filterOption) {
      case "Assistant ID":
        results = attendance.filter((att) =>
          att.assit_id.toLowerCase().includes(searchTerm.toLowerCase())
        );
        break;
      case "Date":
        results = attendance.filter((att) =>
          att.date.toLowerCase().includes(searchTerm)
        );
        break;
      case "Status":
        results = attendance.filter((att) =>
          att.status.toString().includes(searchTerm)
        );
        break;
      default:
        results = attendance;
    }
    setFilteredAttendance(results);
  }, [searchTerm, attendance, filterOption]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
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
    <div className="view-attendance-main-container">
      <h1>View Attendance</h1>
      <div className="view-attendance-filter">
        <div className="view-attendance-search-filter">
          <label className="view-attendance-label" htmlFor="attendanceSearch">Search by</label>
          <select id="filterSelect" value={filterOption} onChange={handleFilterChange}>
            <option value="Assistant ID">Assistant ID</option>
            <option value="Date">Date</option>
            <option value="Status">Status</option>
          </select>
        </div>
        <div className="view-attendance-search-input">
          <input type="search" class="form-control form-control-sm" value={searchTerm} onChange={handleInputChange} placeholder={`Search by ${filterOption}...`} />
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
      <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item${!hasPrevPage ? ' disabled' : ''}`}>
          <button className="page-link" disabled={!hasPrevPage} onClick={handlePrevPage}>Prev</button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className={`page-item${page === index ? ' active' : ''}`}>
            <button className="page-link" onClick={() => setPage(index)}>{index + 1}</button>
          </li>
        ))}
        <li className={`page-item${!hasNextPage ? ' disabled' : ''}`}>
          <button className="page-link" disabled={!hasNextPage} onClick={handleNextPage}>Next</button>
        </li>
      </ul>
    </nav>
    </div>
  );
}

export default ViewAttendance;
