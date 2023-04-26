import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './main.css';

function AddAppointment() {
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentDoctor, setAppointmentDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();


  async function handleSubmit(event) {
    event.preventDefault();

    if (!appointmentNumber && !firstName && !lastName && !address && !age && !gender && !nic && !email && !contactNumber && !appointmentType && !appointmentDoctor && !appointmentDate && !appointmentTime) {
      toast.error('Please fill all the fields...', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    if (!appointmentNumber || !firstName || !lastName || !address || !age || !nic || !email || !contactNumber) {
      setError(true);
    }

    try {
      const response = await fetch('http://158.101.10.103/add_appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          app_num: appointmentNumber,
          first_name: firstName,
          last_name: lastName,
          nic: nic,
          address: address,
          age: age,
          gender: gender,
          contact_num: contactNumber,
          email: email,
          app_type: appointmentType,
          cd_id: appointmentDoctor,
          app_date: appointmentDate,
          app_time: appointmentTime,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send attendance details');
      }

      alert('Appointment details sent successfully');
      handleReset();
    } catch (error) {
      console.error(error);
      alert('Failed to send attendance details');
    }

  }

  const handleReset = () => {
     setAppointmentNumber(""); 
     setFirstName(""); 
     setLastName(""); 
     setAddress(""); 
     setAge(""); 
     setGender(""); 
     setNic(""); 
     setEmail(""); 
     setContactNumber(""); 
     setAppointmentType(""); 
     setAppointmentDoctor(""); 
     setAppointmentDate(""); 
     setAppointmentTime("");
     setError(false);
    };

  return (
    <div className="main-container1">
      <div className="form-container">
      <h1>Add Appointment Form</h1>
      <form className='form3'>
      <label className="label1">AddAppointment Number:</label>
      <div className="form-input">
          <input type="text" className="form-control form-control-sm" value={appointmentNumber} onChange={(event) => setAppointmentNumber(event.target.value)} placeholder="Enter Appointment Number"/>
        </div>
        {error&&firstName.length<=0?
        <label className='input-validation-error'>AddAppointment Number can't be Empty</label>:""}   
        <label className="label1">First Name:</label>
        <div className="form-input">
          <input type="text" className="form-control form-control-sm" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Enter First Name"/>
        </div>
        {error&&firstName.length<=0?
        <label className='input-validation-error'>First Name can't be Empty</label>:""}
        <label className="label1">Last Name:</label>
        <div className="form-input">
          <input type="text" className="form-control form-control-sm" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Enter Last Name"/>
        </div>
        {error&&lastName.length<=0?
        <label className='input-validation-error'>Last Name can't be Empty</label>:""}
        <label className="label1">Address:</label>
        <div className="form-input">
        <textarea value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter Address here..."></textarea>
        </div>
        {error&&address.length<=0?
        <label className='input-validation-error'>Address can't be Empty</label>:""}
        <label className="label1">Age:</label>
        <div className="form-input">
          <input type="text" className="form-control form-control-sm" value={age} onChange={(event) => setAge(event.target.value)} placeholder="Enter Age"/>
        </div>
        {error&&age.length<=0?
        <label className='input-validation-error'>Age can't be Empty</label>:""}
        <label className="label1">Gender:</label>
        <div className="form-input">
        <label>
            <input type="radio" value="Male" checked={gender === "Male"} onChange={(event) => setGender(event.target.value)} />
            Male
          </label>
          <label>
            <input type="radio" value="Female" checked={gender === "Female"} onChange={(event) => setGender(event.target.value)} />
            Female
          </label>
          <label>
            <input type="radio" value="Other" checked={gender === "Other"} onChange={(event) => setGender(event.target.value)} />
            Other
          </label>
        </div>
         {error&&gender.length<=0?
        <label className='input-validation-error'>Gender can't be Empty</label>:""}
        <label className="label1">NIC:</label>
        <div className="form-input">
          <input type="text" className="form-control form-control-sm" value={nic} onChange={(event) => setNic(event.target.value)} placeholder="Enter NIC"/>
        </div>
        {error&&nic.length<=0?
        <label className='input-validation-error'>NIC can't be Empty</label>:""}
        <label className="label1">Email:</label>
        <div className="form-input">
          <input type="text" className="form-control form-control-sm" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email"/>
        </div>
        {error&&email.length<=0?
        <label className='input-validation-error'>Email can't be Empty</label>:""}
        <label className="label1">Contact Number:</label>
        <div className="form-input">
          <input type="text" className="form-control form-control-sm" value={contactNumber} onChange={(event) => setContactNumber(event.target.value)} placeholder="Enter Contact Number"/>
        </div>
        {error&&contactNumber.length<=0?
        <label className='input-validation-error'>Contact Number can't be Empty</label>:""}
        <label className="label1">Appointment Type:</label>
        <div className="form-input">
          <select className="form-control form-control-sm" value={appointmentType} onChange={(event) => setAppointmentType(event.target.value)}>
          <option value="">Select Appointment Type</option>
          <option value="Consultation">Consultation</option>
          <option value="Doctor Check-up">Doctor Check-up</option>
          <option value="Medical Examination">Medical Examination</option>
          <option value="Result Analysis">Result Analysis</option>
          <option value="Scanner">Scanner</option>
        </select>
         </div>
        {error&&appointmentType.length<=0?
        <label className='input-validation-error'>Appointment Type can't be Empty</label>:""}
        <label className="label1">Appointment Doctor:</label>
        <div className="form-input">
          <select className="form-control form-control-sm" value={appointmentDoctor} onChange={(event) => setAppointmentDoctor(event.target.value)}>
          <option value="">Select Appointment Doctor</option>
          <option value="The Universal Physician">The Universal Physician</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Scan Doctor">Scan Doctor</option>
        </select>
         </div>
        {error&&appointmentDoctor.length<=0?
        <label className='input-validation-error'>Appointment Time can't be Empty</label>:""}
        <label className="label1">Appointment Date:</label>
        <div className="form-input">
        <input type="date" className="form-control form-control-sm" value={appointmentDate} onChange={(event) => setAppointmentDate(event.target.value)} placeholder=""/>
         </div>
        {error&&appointmentDoctor.length<=0?
        <label className='input-validation-error'>Appointment Time can't be Empty</label>:""}
         <label className="label1">Appointment Time:</label>
        <div className="form-input">
          <select className="form-control form-control-sm" value={appointmentTime} onChange={(event) => setAppointmentTime(event.target.value)}>
          <option value="">Select  Appointment Time :</option>
              <option value="4:00pm" disabled={appointmentTime === "4:00pm"}>4:00pm</option>
              <option value="4:15pm" disabled={appointmentTime === "4:15pm"}>4:15pm</option>
              <option value="4:30pm" disabled={appointmentTime === "4:30pm"}>4:30pm</option>
              <option value="4:45pm" disabled={appointmentTime === "4:45pm"}>4:45pm</option>
              <option value="5:00pm" disabled={appointmentTime === "5:00pm"}>5:00pm</option>
              <option value="5:15pm" disabled={appointmentTime === "5:15pm"}>5:15pm</option>
              <option value="5:30pm" disabled={appointmentTime === "5:30pm"}>5:30pm</option>
              <option value="5:45pm" disabled={appointmentTime === "5:45pm"}>5:45pm</option>
              <option value="6:00pm" disabled={appointmentTime === "6:00pm"}>6:00pm</option>
              <option value="6:15pm" disabled={appointmentTime === "6:15pm"}>6:15pm</option>
              <option value="6:30pm" disabled={appointmentTime === "6:30pm"}>6:30pm</option>
              <option value="6:45pm" disabled={appointmentTime === "6:45pm"}>6:45pm</option>
              <option value="7:00pm" disabled={appointmentTime === "7:00pm"}>7:00pm</option>
              <option value="7:15pm" disabled={appointmentTime === "7:15pm"}>7:15pm</option>
              <option value="7:30pm" disabled={appointmentTime === "7:30pm"}>7:30pm</option>
              <option value="7:45pm" disabled={appointmentTime === "7:45pm"}>7:45pm</option>
              <option value="8:00pm" disabled={appointmentTime === "8:00pm"}>8:00pm</option>
        </select>
         </div>
        {error&&appointmentTime.length<=0?
        <label className='input-validation-error'>Appointment Time can't be Empty</label>:""}
         <div className="form-button"></div>
        <button className="btn btn-primary btn-sm" type="button" onClick={handleReset}>Reset</button><br /><br />
        <button className="btn btn-primary btn-sm" type="button" onClick={handleSubmit}>Submit</button><br /><br />
        <button className="btn btn-primary btn-sm" type="button" onClick={() => navigate("/view_appointment")}>View Appointment</button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
  }

export default AddAppointment;