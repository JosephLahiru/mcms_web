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
    console.log("Appointmnet type:", appointmentType); 
    console.log("Appointment Doctor:", appointmentDoctor);
    console.log("Appointment Date:", appointmentDate);
    console.log("Appointment Time:", appointmentTime);
  }


  return (
    <div className='App'>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
      
          <div className="form-input">
              <lable> Enter Appointment Number:
            <input type="text" value={appointmentNumber} onChange={(event) => setAppointmentNumber(event.target.value)} placeholder=" Appointment Number"/>
            </lable>
          </div>
        <br />
          <div className="form-input">
          <lable>Enter First Name:
            <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Enter First Name"/>
            </lable>
          </div>
          <br />
          <div className="form-input">
          <lable>Enter Last Name:
            <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Enter Last Name"/>
            </lable>
          </div>
        <br />
        <div className="form-input">
        <lable>Enter Address:
          <input type="tel" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter Address"/>
          </lable>
        </div>
        <br />
        <div className="form-input">
        <lable>Enter Age:
          <input type="text" value={age} onChange={(event) => setAge(event.target.value) } placeholder="Enter Age"/>
          </lable>
        </div>
        <br />
        <div className="form-input">
        <lable>Enter Gender:
          <input type="text" value={gender} onChange={(event) => setGender(event.target.value) } placeholder="Enter Gender"/>
          </lable>
        </div>
        <br />
          <div className="form-input">
          <lable>Enter NIC:
            <input type="text" value={nic} onChange={(event) => setNic(event.target.value)} placeholder="Enter NIC"/>
            </lable>
          </div>
          <br />
          <div className="form-input">
          <lable>Enter Email:
            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email"/>
            </lable>
          </div>
        <br />
        <div className="form-input">
        <lable>Enter Contact Number:
          <input type="text" value={contactNumber} onChange={(event) => setContactNumber(event.target.value) } placeholder="Enter Contact number"/>
          </lable>
        </div>
        <br />
        <div className="form-input">
        <lable>Select Appointment Type:
          <input type="text" value={appointmentType} onChange={(event) => setAppointmentType(event.target.value) } placeholder="Enter Appointment Type"/>
          </lable>
        </div>
        <br />
        <div className="form-input">
        <lable>Select Appointment Doctor:
          <input type="text" value={appointmentDoctor} onChange={(event) => setAppointmentDoctor(event.target.value) } placeholder=""/>
          </lable>
        </div>
        <br />
        <div className="form-input">
        <lable>Select Appointment Date:
          <input type="date" value={appointmentDate} onChange={(event) => setAppointmentDate(event.target.value) } placeholder=""/>
          </lable>
        </div>
        <br />
        <div className="form-input">
        <lable>Select Appointment Time:
          <input type="text" value={appointmentTime} onChange={(event) => setAppointmentTime(event.target.value) } placeholder=""/>
          </lable>
        </div>
        <br />
        <button type="Cancel" classname="form-button">Cancel</button>
        <button type="Submit" classname="form-button">Submit</button>
        <button type="View Appointment" classname="form-button">View Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default Appointment;