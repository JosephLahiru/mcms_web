import React, { useState } from 'react';
import './Appointment.css';

function Appointment() {
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Appointment Number:", appointmentNumber);
    console.log("Name:", name);
    console.log("Address:",address);
    console.log("Age:", age);
    console.log("Gender:", gender);
    console.log("Phone number:", phoneNumber); 
    console.log("Appointmnet type:", appointmentType); 
    console.log("Doctor:", doctor);
    console.log("Date:", date);
    console.log("Time:", time);
  }


  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
    
        <div className="form-input">
            <lable> Enter Appointment Number:
          <input type="text" value={appointmentNumber} onChange={(event) => setAppointmentNumber(event.target.value)} placeholder=" Appointment Number"/>
          </lable>
        </div>
      <br />
        <div className="form-input">
        <lable>Enter Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter Name"/>
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
      <lable>Enter Phone Number:
        <input type="text" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value) } placeholder="Enter Phone number"/>
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
      <lable>Select the Doctor:
        <input type="text" value={doctor} onChange={(event) => setDoctor(event.target.value) } placeholder=""/>
        </lable>
      </div>
      <br />
      <div className="form-input">
      <lable>Select Appointment Date:
        <input type="text" value={date} onChange={(event) => setDate(event.target.value) } placeholder=""/>
        </lable>
      </div>
      <br />
      <div className="form-input">
      <lable>Select Appointment Time:
        <input type="text" value={time} onChange={(event) => setTime(event.target.value) } placeholder=""/>
        </lable>
      </div>
      <br />
      <button type="Cancel" classname="form-button">Cancel</button>
      <button type="Submit" classname="form-button">Submit</button>
    </form>
    </div>
  );
}

export default Appointment;