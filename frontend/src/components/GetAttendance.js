import React, { useState } from 'react';
//import './../css/GetAttendance.css';

function GetAttendance() {
  const[attendanceId,setAttendanceId] = useState('');
  const [assistantId, setAssistantId] = useState('');
  const [date, setDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if(assistantId.length==0 || date.length==0 ){
      setError(true);
    }

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
          <label>Attendance ID</label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={attendanceId} onChange={(event) => setAttendanceId(event.target.value)} />
        </div>
        <div className="form-label">
          <label>Assistant ID:</label>
        </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={assistantId} onChange={(event) => setAssistantId(event.target.value)} />
        </div>
        {error&&assistantId.length<=0?
        <label class='input-validation-error'>Assistant ID can't be Empty</label>:""}
        <div className="form-label">
          <label>Date:</label>
        </div>
        <div className="form-input">
          <input type="date" class="form-control form-control-sm" value={date} onChange={(event) => setDate(event.target.value)} />
        </div>
        {error&&date.length<=0?
        <label class='input-validation-error'>Date can't be Empty</label>:""}
        <div className="form-label">
          <label>Attendance Status:</label>
        </div>
        <div className="form-input">
        <select class="form-control form-control-sm" value={attendanceStatus} onChange={(event) => setAttendanceStatus(event.target.value)}>
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

