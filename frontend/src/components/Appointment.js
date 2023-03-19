import React, { useState } from 'react';
import './Appointment.css';
import './../App.css';

function Appointment() {
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
  const handleTimeChange = (event) => {
    setAppointmentTime(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Appointment Number:", appointmentNumber);
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Address:",address);
    console.log("Age:", age);
    console.log("Gender:", gender);
    console.log("NIC:", nic);
    console.log("Email:", email);
    console.log("Contact number:", contactNumber); 
    console.log("Appointmnet Type:", appointmentType); 
    console.log("Appointment Doctor:", appointmentDoctor);
    console.log("Appointment Date:", appointmentDate);
    console.log("Appointment Time:", appointmentTime);
  }


  return (
    <div className='App'>
      <div className="form-container">
      <h1>Appointment Request Form</h1>
      <p>Make your appointments more easier</p>

      <form onSubmit={handleSubmit}>
      <div className="form-input">
              <lable> Enter Appointment Number:
            <input type="text" value={appointmentNumber} onChange={(event) => setAppointmentNumber(event.target.value)} placeholder=" Appointment Number"/>
            </lable>
          </div>
        <br /><br />
          <div className="form-input">
          <lable>Enter First Name:
            <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Enter First Name"/>
            </lable>
          </div>
          <br /><br />
          <div className="form-input">
          <lable>Enter Last Name:
            <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Enter Last Name"/>
            </lable>
          </div>
        <br /><br />
      <div className="form-input">
        <label>Enter Address:</label>
        <br />
        <textarea
          value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter Address" rows="4" cols="50"></textarea>
      </div>
        <br /><br /><br /><br /><br />
        <div className="form-input">
        <lable>Enter Age:
          <input type="text" value={age} onChange={(event) => setAge(event.target.value) } placeholder="Enter Age"/>
          </lable>
        </div>
        <br /><br />
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
      <br /> <br />
        <br />
          <div className="form-input">
          <lable>Enter NIC:
            <input type="text" value={nic} onChange={(event) => setNic(event.target.value)} placeholder="Enter NIC"/>
            </lable>
          </div>
          <br /><br />
          <div className="form-input">
          <lable>Enter Email:
            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email"/>
            </lable>
          </div>
        <br /><br />
        <div className="form-input">
        <lable>Enter Contact Number:
          <input type="text" value={contactNumber} onChange={(event) => setContactNumber(event.target.value) } placeholder="Enter Contact number"/>
          </lable>
        </div>
        <br /><br />
        <div className="form-input">
        <label>Select Appointment Type:</label>
        <select value={appointmentType} onChange={(event) => setAppointmentType(event.target.value)}>
          <option value="">Select Appointment Type</option>
          <option value="Consultation">Consultation</option>
          <option value="Doctor Check-up">Doctor Check-up</option>
          <option value="Medical Examination">Medical Examination</option>
          <option value="Result Analysis">Result Analysis</option>
          <option value="Scanner">Scanner</option>
        </select>
        </div>
        <br /><br />
        <div className="form-input">
        <lable>Select Appointment Doctor:</lable>
        <select value={appointmentDoctor} onChange={(event) => setAppointmentDoctor(event.target.value)}>
         <option value="">Select Appointment Doctor</option>
          <option value="The Universal Physician">The Universal Physician</option>
          <option value="Pediatrician">Pediatrician</option>
        </select>
        </div>
        <br /><br />
        <div className="form-input">
        <lable>Seslect Appointment Date:
          <input type="date" value={appointmentDate} onChange={(event) => setAppointmentDate(event.target.value) } placeholder=""/>
          </lable>
        </div>
        <br /><br />
        <div className="form-input">
        <lable>Select Appointment Time:</lable>
        <select id="time" name="time" value={appointmentTime} onChange={handleTimeChange}>
          <option value="">Select  Appointment Time :</option>
          <option value="4:00pm">4:00pm</option>
          <option value="4:15pm" disabled={appointmentTime === "4:00pm"}>4:15pm</option>
          <option value="4:30pm" disabled={appointmentTime === "4:00pm"}>4:30pm</option>
          <option value="4:45pm" disabled={appointmentTime === "4:00pm"}>4:45pm</option>
          <option value="5:00pm" disabled={appointmentTime === "4:00pm"}>5:00pm</option>
          <option value="5:15pm" disabled={appointmentTime === "4:00pm"}>5:15pm</option>
          <option value="5:30pm" disabled={appointmentTime === "4:00pm"}>5:30pm</option>
          <option value="5:45pm" disabled={appointmentTime === "4:00pm"}>5:45pm</option>
          <option value="6:00pm" disabled={appointmentTime === "4:00pm"}>6:00pm</option>
          <option value="6:15pm" disabled={appointmentTime === "4:00pm"}>6:15pm</option>
          <option value="6:30pm" disabled={appointmentTime === "4:00pm"}>6:30pm</option>
          <option value="6:45pm" disabled={appointmentTime === "4:00pm"}>6:45pm</option>
          <option value="7:00pm" disabled={appointmentTime === "4:00pm"}>7:00pm</option>
          <option value="7:15pm" disabled={appointmentTime === "4:00pm"}>7:15pm</option>
          <option value="7:30pm" disabled={appointmentTime === "4:00pm"}>7:30pm</option>
          <option value="7:45pm" disabled={appointmentTime === "4:00pm"}>7:45pm</option>
          <option value="8:00pm" disabled={appointmentTime === "4:00pm"}>8:00pm</option>
        </select>
        </div>
        <br /><br />
        <button type="Cancel" classname="form-button">Cancel</button><br /><br />
        <button type="Submit" classname="form-button">Submit</button><br /><br />
        <button type="View Appointment" classname="form-button">View Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default Appointment;