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
      <table border="1">
        <tr>
            <th>Assistant ID</th>
            <th>date</th>
            <th>status</th>
        </tr>
        {attendance.map((attendance)=>
        <tr key={attendance.assit_id}>
            <td>{attendance.assit_id}</td>
            <td>{attendance.date}</td>
            <td>{attendance.status}</td>
        </tr>
        )}
      </table>
    </div>
  );
}

export default RetrieveAttendance;