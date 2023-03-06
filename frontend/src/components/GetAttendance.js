import React, { useState } from 'react';
//import './../css/GetAttendance.css';

function GetAttendance() {
  const[attendanceId,setAttendanceId] = useState('');
  const [assistantId, setAssistantId] = useState('');
  const [date, setDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');

  const handleAttendanceIDChange = (event) => {
    setAttendanceId(event.target.value);
  };

  const handleIDChange = (event) => {
    setAssistantId(event.target.value);
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


  const handleReset = () => {
    setAttendanceId("");
    setAssistantId("");
    setDate("");
    setAttendanceStatus("");
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
        <div className="form-label">
          <label>
            Attendance ID
          </label>
        </div>
        <div className="form-input">
          <input type="date" class="form-control form-control-sm" value={date} onChange={handleAttendanceIDChange} />
        </div>
        <div className="form-label">
          <label>
            Assistant ID:
          </label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={assistantId} onChange={handleIDChange} />
        </div>
        <div className="form-label">
          <label>
            Date:
          </label>
        </div>
        <div className="form-input">
          <input type="date" class="form-control form-control-sm" value={date} onChange={handleDateChange} />
        </div>
        <div className="form-label">
          <label>
            Attendance Status:
          </label>
        </div>
        <div className="form-input">
        <select class="form-control form-control-sm" value={attendanceStatus} onChange={handleStatusChange}>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
        </div>
        <button class="btn btn-primary btn-sm" type="button" onClick={handleReset}>Reset</button>
        <button class="btn btn-primary btn-sm" type="button" onClick={handleSubmit}>Submit</button>
    </form>
    </div>
  );
}

export default GetAttendance;

