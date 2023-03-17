import React from "react";
import { useEffect, useState } from "react";

function RetrieveAttendance() {
    
    const [attendance, RetrieveAttendance] = useState([]);

    useEffect(() => {
        async function fetchAttendance() {
            const response = await fetch("http://158.101.10.103/get_attendance");
            const data = await response.json();
            RetrieveAttendance(data);
        }
        fetchAttendance();
    }, []);

  return (
    <div className="div1">
      <h1>Attendance</h1>
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
        {attendance.map((attendance)=>
        <tr key={attendance.assit_id}>
            <td>{attendance.att_id}</td>
            <td>{attendance.assit_id}</td>
            <td>{attendance.date}</td>
            <td>{attendance.status}</td>
        </tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default RetrieveAttendance;