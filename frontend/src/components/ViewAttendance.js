import React, { useEffect, useState } from "react";

function ViewAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
      <h1>Attendance</h1>
      <div className="filter">
        <label htmlFor="dateFilter">Filter by Assistant ID:</label>
        <input
          type="text"
          id="dateFilter"
          value={searchTerm}
          onChange={handleInputChange}
        />
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
              <td>{att.date}</td>
              <td>{att.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={!hasPrevPage} onClick={handlePrevPage}>
          Prev
        </button>
        <button disabled={!hasNextPage} onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ViewAttendance;
