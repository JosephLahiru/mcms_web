import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './main.css';


function AddAppointment2() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [nic, setNic] = useState("");
  const [email,setEmail] =useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [appointmentNumber, setAppointmentNumber] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentDoctor, setAppointmentDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  function getAtId(doctorType) {
    return fetch('https://mcms_api.mtron.me/get_app_id/' + doctorType)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch at_id');
        }
        return response.json();
      })
      .then((data) => {
        const atIdValue = data.length > 0 ? data[0].at_id : '';
        return atIdValue;
      })
      .catch((error) => {
        console.error('Error:', error);
        return '';
      });
  }  

  function getCdId(doctorType) {
    return fetch('https://mcms_api.mtron.me/get_cd_id/' + doctorType)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch cd_id');
        }
        return response.json();
      })
      .then((data) => {
        const cdIdValue = data.length > 0 ? data[0].cd_id : '';
        return cdIdValue;
      })
      .catch((error) => {
        console.error('Error:', error);
        return '';
      });
  } 

  function getATMId(ATMType) {
    return fetch('https://mcms_api.mtron.me/get_atm_id/' + ATMType)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch atm_id');
        }
        return response.json();
      })
      .then((data) => {
        const aTMIdValue = data.length > 0 ? data[0].atm_id : '';
        return aTMIdValue;
      })
      .catch((error) => {
        console.error('Error:', error);
        return '';
      });
  } 

  const handleSubmit = async (event) =>{
    event.preventDefault();

    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Address:", address);
    console.log("Age",age);
    console.log("Gender:", gender);
    console.log("NIC:", nic);
    console.log("Email:", email);
    console.log("Contact Number:", contactNumber);
    console.log("Appointment Number:", appointmentNumber);
    console.log("Appointment Type:", appointmentType);
    console.log("Appointment Doctor:", appointmentDoctor);
    console.log("Appointment Date:", appointmentDate);
    console.log("Appointment Time:", appointmentTime);

    if ( !firstName || !lastName || !address || !age || !gender || !nic || !contactNumber || !appointmentNumber || !appointmentType || !appointmentDoctor || !appointmentDate || !appointmentTime) {
      toast.error('Please fill all the fields...', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

   
    // NIC validation
    const nicRegex = /^[0-9]{9}[VXvx]$/;
    if (!nicRegex.test(nic)) {
      setError(true);
      toast.error('Invalid NIC number', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setError(true);
      toast.error('Invalid email address', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    // Contact number validation
    const contactNumberRegex = /^[0-9]{10}$/;
    if (!contactNumberRegex.test(contactNumber)) {
      setError(true);
      toast.error('Invalid contact number', {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    }

    const requestBody = {
      first_name: firstName,
      last_name: lastName,
      nic: nic,
      address: address,
      age: age,
      gender: gender,
      contact_num: contactNumber,
      ...(email && { email: email }),
      app_num: appointmentNumber,
      at_id: await getAtId(appointmentType),
      cd_id: await getCdId(appointmentDoctor),
      app_date: appointmentDate,
      atm_id: await getATMId(appointmentTime),
    };

    console.log(requestBody)

    try {
      const response = await fetch("https://mcms_api.mtron.me/set_appointment", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to send appointment details');
      }

      alert('Appointment details sent successfully');
      handleReset();
    } catch (error) {
      console.error(error);
      alert('Failed to send appointment details');
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
    <div className="main-container-add-appointment">
      <div className="form-container-add-appointment">
      <h1>Add Appointment</h1>
      <form className='form-add-appointment' onSubmit={handleSubmit}>
      <div className="form-input-add-appointment">
        <label className="label-add-appointment">First Name:</label>
          <input type="text" className="form-control form-control-sm" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="Enter First Name"/>
        </div>
        {error&&firstName.length<=0?
        <label className='input-validation-error-add-appointment'>First Name can't be Empty</label>:""}
        <div className="form-input-add-appointment">
        <label className="label-add-appointment">Last Name:</label>
          <input type="text" className="form-control form-control-sm" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Enter Last Name"/>
        </div>
        {error&&lastName.length<=0?
        <label className='input-validation-error-add-appointment'>Last Name can't be Empty</label>:""}
         <div className="form-input-add-appointment">
        <label className="label-add-appointment">Age:</label>
          <input type="text" className="form-control form-control-sm" value={age} onChange={(event) => setAge(event.target.value)} placeholder="Enter Age"/>
        </div>
        {error&&age.length<=0?
        <label className='input-validation-error-add-appointment'>Age can't be Empty</label>:""}
        <div className="form-input-add-appointment">
        <label className="label-add-appointment">Address:</label>
        <textarea value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter Address here..."></textarea>
        </div>
        {error&&address.length<=0?
        <label className='input-validation-error-add-appointment'>Address can't be Empty</label>:""}
        <div className="form-input-add-appointment">
        <label className="label-add-appointment">Gender:</label>
        <label>
            <input type="radio" value="Male" checked={gender === "Male"} onChange={(event) => setGender(event.target.value)} />Male
          </label>
          <br/><br/>
          <label>
            <input type="radio" value="Female" checked={gender === "Female"} onChange={(event) => setGender(event.target.value)} />
            Female
          </label>
          <br/><br/>
          <label>
            <input type="radio" value="Other" checked={gender === "Other"} onChange={(event) => setGender(event.target.value)} />
            Other
          </label>
          <br/><br/>
        </div>
         {error&&gender.length<=0?
        <label className='input-validation-error-add-appointment'>Gender can't be Empty</label>:""}
        <div className="form-input-add-appointment">
        <label className="label-add-appointment">NIC:</label>
          <input type="text" className="form-control form-control-sm" value={nic} onChange={(event) => setNic(event.target.value)} placeholder="Enter NIC"/>
        </div>
        {error&&nic.length<=0?
        <label className='input-validation-error-add-appointment'>NIC can't be Empty</label>:""}
        <div className="form-input-add-appointment">
        <label className="label-add-appointment">Email:</label>
          <input type="text" className="form-control form-control-sm" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter Email"/>
        </div>
        {error&&email.length<=0?
        <label className='input-validation-error-add-appointment'>Email can't be Empty</label>:""}
        <div className="form-input-add-appointment">
        <label className="label-add-appointment">Contact Number:</label>
          <input type="text" className="form-control form-control-sm" value={contactNumber} onChange={(event) => setContactNumber(event.target.value)} placeholder="Enter Contact Number"/>
        </div>
        {error&&contactNumber.length<=0?
        <label className='input-validation-error-add-appointment'>Contact Number can't be Empty</label>:""}
        <div className="form-input-add-appointment">
        <label className="label-add-appointment">Appointment Number:</label>
          <input type="text" className="form-control form-control-sm" value={appointmentNumber} onChange={(event) => setAppointmentNumber(event.target.value)} placeholder="Enter Appointment Number"/>
        </div>
        {error&&firstName.length<=0?
        <label className='input-validation-error-add-appointment'>AddAppointment Number can't be Empty</label>:""}   
        <div className="form-input-add-appointment">
        <label className="label-add-appointment">Appointment Type:</label>
          <select className="form-control form-control-sm" value={appointmentType} onChange={(event) => setAppointmentType(event.target.value)}>
          <option value="">Select Appointment Type</option>
          <option value="consultation">Consultation</option>
          <option value="doctor check-up">Doctor Check-up</option>
          <option value="medical examination">Medical Examination</option>
          <option value="result analysis">Result Analysis</option>
          <option value="scanner">Scanner</option>
        </select>
         </div>
        {error&&appointmentType.length<=0?
        <label className='input-validation-error-add-appointment'>Appointment Type can't be Empty</label>:""}
        <div className="form-input-add-appointment">
        <label className="label-add-appointment">Appointment Doctor:</label>
          <select className="form-control form-control-sm" value={appointmentDoctor} onChange={(event) => setAppointmentDoctor(event.target.value)}>
          <option value="">Select Appointment Doctor</option>
          <option value="universal_physician"> Universal Physician</option>
          <option value="pediatrician">Pediatrician</option>
          <option value="radiologist">Radiologist</option>
        </select>
         </div>
        {error&&appointmentDoctor.length<=0?
        <label className='input-validation-error-add-appointment'>Appointment Doctor can't be Empty</label>:""}
        <div className="form-input-add-appointment">
        <label className="label-add-appointment">Appointment Time:</label>
          <select className="form-control form-control-sm" value={appointmentTime} onChange={(event) => setAppointmentTime(event.target.value)}>
          <option value="">Select  Appointment Time :</option>
              <option value="00:04:00" disabled={appointmentTime === "00:04:00"}>4:00pm</option>
              <option value="00:04:15" disabled={appointmentTime === "00:04:15"}>4:15pm</option>
              <option value="00:04:30" disabled={appointmentTime === "00:04:30"}>4:30pm</option>
              <option value="00:04:45" disabled={appointmentTime === "00:04:45"}>4:45pm</option>
              <option value="00:05:00" disabled={appointmentTime === "00:05:00"}>5:00pm</option>
              <option value="00:05:15" disabled={appointmentTime === "00:05:15"}>5:15pm</option>
              <option value="00:05:30" disabled={appointmentTime === "00:05:30"}>5:30pm</option>
              <option value="00:05:45" disabled={appointmentTime === "00:05:45"}>5:45pm</option>
              <option value="00:06:00" disabled={appointmentTime === "00:06:00"}>6:00pm</option>
              <option value="00:06:15" disabled={appointmentTime === "00:06:15"}>6:15pm</option>
              <option value="00:06:30" disabled={appointmentTime === "00:06:30"}>6:30pm</option>
              <option value="00:06:45" disabled={appointmentTime === "00:06:45"}>6:45pm</option>
              <option value="00:07:00" disabled={appointmentTime === "00:07:00"}>7:00pm</option>
              <option value="00:07:15" disabled={appointmentTime === "00:07:15"}>7:15pm</option>
              <option value="00:07:30" disabled={appointmentTime === "00:07:30"}>7:30pm</option>
              <option value="00:07:45" disabled={appointmentTime === "00:07:45"}>7:45pm</option>
              <option value="00:08:00" disabled={appointmentTime === "00:08:00"}>8:00pm</option>
        </select>
         </div>
         {error&&appointmentDoctor.length<=0?
        <label className='input-validation-error-add-appointment'>Appointment Time can't be Empty</label>:""}
         <div className="form-input-add-appointment">
        <label className="label-add-appointment">Appointment Time:</label>
        <input type="date" className="form-control form-control-sm" value={appointmentDate} onChange={(event) => setAppointmentDate(event.target.value)} placeholder=""/>
         </div>
        {error&&appointmentDoctor.length<=0?
        <label className='input-validation-error-add-appointment'>Appointment Date can't be Empty</label>:""}
         <br/>
        <button className="btn btn-primary btn-sm" type="button" onClick={handleReset}>Reset</button><br /><br />
        <button className="btn btn-primary btn-sm" type="button" onClick={handleSubmit}>Submit</button><br /><br />
        <button className="btn btn-primary btn-sm" type="button" onClick={() => navigate("/view_appointment")}>View Appointment</button>
        </form>
        <ToastContainer />
      </div>
      
     </div >
  );
  }

export default AddAppointment2;