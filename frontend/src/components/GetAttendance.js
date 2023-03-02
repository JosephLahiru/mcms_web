import React, { useState } from 'react';
import './../css/GetAttendance.css';

function GetAttendance() {
  const [assistantName, setAssistantName] = useState('');
  const [date, setDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [assistantId, setAssistantId] = useState('');

  const handleIDChange = (event) => {
    setAssistantId(event.target.value);
    };

  const handleNameChange = (event) => {
    setAssistantName(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleStatusChange = (event) => {
    setAttendanceStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };


  return (
    <form onSubmit={handleSubmit}>
        <label>
        Assistant ID:
        <input type="text" value={assistantId} onChange={handleIDChange} />
      </label>
      <label>
        Assistant Name:
        <input type="text" value={assistantName} onChange={handleNameChange} />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={handleDateChange} />
      </label>
      <label>
        Attendance Status:
        <select value={attendanceStatus} onChange={handleStatusChange}>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
      </label>
      <button type="reset">Reset</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default GetAttendance;

