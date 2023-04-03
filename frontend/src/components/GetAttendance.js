import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './../css/Style.css';
import ViewAttendance from './ViewAttendance.js';

function GetAttendance() {
  const [assistantId, setAssistantId] = useState('');
  const [date, setDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!assistantId && !date && !attendanceStatus ) {
      toast.error('Please fill all the fields...', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    if(!assistantId || !date || !attendanceStatus) {
      setError(true);
    }

    try {
      const response = await fetch('http://158.101.10.103/set_attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assist_id: assistantId,
          date: date,
          status: attendanceStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send attendance details');
      }

      alert('Attendance details sent successfully');
      handleReset();
    } catch (error) {
      console.error(error);
      alert('Failed to send attendance details');
    }

  };


  const handleReset = () => {
    setAssistantId("");
    setDate("");
    setAttendanceStatus("");
    setError(false);
  };

  return (
    <div className='main-container1'>
      <div className="form-container">
        <form className='form2' onSubmit={handleSubmit}>
          <div className="form-label">
            <label className="label1">Assistant ID</label>
          </div>
        <div className="form-input">
          <input type="text" class="form-control form-control-sm" value={assistantId} onChange={(event) => setAssistantId(event.target.value)} />
        </div>
        {error&&assistantId.length<=0?
        <label class='input-validation-error'>Assistant ID can't be Empty</label>:""}
        <div className="form-label">
          <label className="label1">Date</label>
        </div>
        <div className="form-input">
          <input type="date" class="form-control form-control-sm" value={date} onChange={(event) => setDate(event.target.value)} required/>
        </div>
        {error&&date.length<=0?
        <label class='input-validation-error'>Date can't be Empty</label>:""}
        <div className="form-label">
          <label className="label1">Attendance Status</label>
        </div>
        <div className="form-input">
        <select class="form-control form-control-sm" value={attendanceStatus} onChange={(event) => setAttendanceStatus(event.target.value)} required>
          <option value="" disabled selected>Select an option</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
        </div>
        {error&&attendanceStatus.length<=0?
        <label class='input-validation-error'>Assistant Status can't be Empty</label>:""}
        <button class="btn btn-primary btn-sm" type="button" onClick={handleReset}>Reset</button>
        <button class="btn btn-primary btn-sm" type="button" onClick={handleSubmit}>Submit</button>
    </form>
    <ToastContainer />
    </div>
    <div className='table-container'>
      <ViewAttendance/>
    </div>
    </div>
    
    
  );
}

export default GetAttendance;

