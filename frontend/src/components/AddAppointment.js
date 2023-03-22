import React, { useState } from 'react';
import './AddAppointment.css';
import './../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'

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

  function handleSubmit(event) {

    event.preventDefault();

    // console.log("Appointment Number:", appointmentNumber);
    // console.log("First Name:", firstName);
    // console.log("Last Name:", lastName);
    // console.log("Address:",address);
    // console.log("Age:", age);
    // console.log("Gender:", gender);
    // console.log("NIC:", nic);
    // console.log("Email:", email);
    // console.log("Contact number:", contactNumber); 
    // console.log("Appointmnet Type:", appointmentType); 
    // console.log("Appointment Doctor:", appointmentDoctor);
    // console.log("Appointment Date:", appointmentDate);
    // console.log("Appointment Time:", appointmentTime);




if(!appointmentNumber || !firstName || !lastName || !address || !age || !nic || !email || !contactNumber  || !appointmentType || !appointmentDoctor|| !appointmentDate || !appointmentTime) {
      toast.error('Please fill all the fields...', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
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
    };

  return (
    <div className='App'>
      <div className="form-container">
      <h1>Appointment Request Form</h1>
      <p>Make your appointments more easier</p>
      <form onSubmit={handleSubmit}>
      <div className="form-input">
              <lable> Enter Appointment Number:
            <input type="text" className="form-control form-control-sm" value={appointmentNumber} onChange={(event) => setAppointmentNumber(event.target.value)} placeholder=" Appointment Number"/>
            </lable>
          </div>
        <br />
          <div className="form-input">
          <lable>Enter First Name:
            <input type="text" className="form-control form-control-sm" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Enter First Name"/>
            </lable>
          </div>
          <br />
          {error&&firstName.length<=0?
          <label class='input-validation-error'><center>First Name can't be Empty</center></label>:""}
          <div className="form-input">
          <lable>Enter Last Name:
            <input type="text" className="form-control form-control-sm" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Enter Last Name"/>
            </lable>
            </div>
            <br />
            {error&&lastName.length<=0?
          <label className='input-validation-error'><center>Last Name can't be Empty</center></label>:""}
        <div className="form-input">
        <label>Enter Address:
      <textarea className="form-control form-control-sm"
          value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter Address" rows="4" cols="50"></textarea>
        </label>
      </div>
      <br /><br /><br /><br />
      {error&&address.length<=0?
          <label class='input-validation-error'><center>Address can't be Empty</center></label>:""}
        <div className="form-input">
        <lable>Enter Age:
          <input type="text" className="form-control form-control-sm" value={age} onChange={(event) => setAge(event.target.value) } placeholder="Enter Age"/>
          </lable>
        </div>
        <br />
        {error&&age.length<=0?
        <label className='input-validation-error'><center>Age can't be Empty</center></label>:""}
        <div className="form-input">
        <label>Select Gender:</label>
        <div>
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
      </div>
      <br />
        {error&&gender.length<=0?
          <label class='input-validation-error'><center>Gender field is required</center></label>:""}
          <div className="form-input">
          <lable>Enter NIC:
            <input type="text" className="form-control form-control-sm" value={nic} onChange={(event) => setNic(event.target.value)} placeholder="Enter NIC"/>
            </lable>
          </div>
          <br />
          {error&&nic.length<=0?
         <label className='input-validation-error'><center>Please enter a valid NIC number</center></label>:""}
          <div className="form-input">
          <lable>Enter Email:
            <input type="text" className="form-control form-control-sm" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email"/>
            </lable>
          </div>
          <br />
          {error&&email.length<=0?
        <label className='input-validation-error'><center>Please enter a valid email address in the format of name@example.com</center></label>:""}
        <div className="form-input">
        <lable>Enter Contact Number:
          <input type="text" className="form-control form-control-sm" value={contactNumber} onChange={(event) => setContactNumber(event.target.value) } placeholder="Enter Contact number"/>
          </lable>
        </div>
        <br />
        {error&&contactNumber.length<=0?
        <label className='input-validation-error'><center>Please enter a valid 10-digit phone number in the format of (123) 456-7890.</center></label>:""}
        <div className="form-input">
        <label>Select Appointment Type:</label>
        <select className="form-control form-control-sm" value={appointmentType} onChange={(event) => setAppointmentType(event.target.value)}>
          <option value="">Select Appointment Type</option>
          <option value="Consultation">Consultation</option>
          <option value="Doctor Check-up">Doctor Check-up</option>
          <option value="Medical Examination">Medical Examination</option>
          <option value="Result Analysis">Result Analysis</option>
          <option value="Scanner">Scanner</option>
        </select>
        </div>
        <br />
        {error&&appointmentType.length<=0?
        <label className='input-validation-error'><center>Please select at least one Appointment Type</center></label>:""}
        <div className="form-input">
        <lable>Select Appointment Doctor:</lable>
        <select className="form-control form-control-sm" value={appointmentDoctor} onChange={(event) => setAppointmentDoctor(event.target.value)}>
         <option value="">Select Appointment Doctor</option>
          <option value="The Universal Physician">The Universal Physician</option>
          <option value="Pediatrician">Pediatrician</option>
        </select>
        </div>
        <br />
        {error&&appointmentDoctor.length<=0?
        <label className='input-validation-error'><center>Please select at least one Appointment Doctor</center></label>:""}
        <div className="form-input">
        <lable>Select Appointment Date:
          <input type="date" value={appointmentDate} onChange={(event) => setAppointmentDate(event.target.value) } placeholder=""/>
          </lable>
        </div>
        <br />
        {error&&appointmentDate.length<=0?
        <label className='input-validation-error'><center>Please select a Appointment Date from the calendar</center></label>:""}
        <div className="form-input">
        <lable>Select Appointment Time:</lable>
        <select id="time" name="time" value={appointmentTime} onChange={(event) => setAppointmentTime(event.target.value)}>
          <option value="">Select  Appointment Time :</option>
          <option value="4:00pm">4:00pm</option>
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
       <br />
       {error&&appointmentTime.length<=0?
        <label className='input-validation-error'><center>Please select at least one Appointment Time.</center></label>:""}
        
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