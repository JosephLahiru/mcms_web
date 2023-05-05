import React, {useState} from 'react';
import './main.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';

function RegistrationForm() {

  const [patientId, setPatientId] = useState('');
  const [appointmentNumber, setAppointmentNumber] = useState('');
  const [date, setDate] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nicNumber, setNicNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [error, setError] = useState(false);

  const setRegistration = async (patientData) => {
    try {
      const response = await fetch('/set_registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
  
      const responseData = await response.json();
      console.log(responseData.message); // handle success message
    } catch (error) {
      console.error(error); // handle error
    }
  };

  function handlePatientIdChange(event){
    setPatientId(event.target.value);
  }

  function handleAppointmentNumberChange(event){
    setAppointmentNumber(event.target.value);
  }

  function handleDateChange(event){
    setDate(event.target.value);
  }

  function handleFirstNameChange(event) {
    setFirstName(event.target.value);
  }

  function handleLastNameChange(event) {
    setLastName(event.target.value);
  }

  function handleNicNumberChange(event) {
    const value = event.target.value;
    if (/^\d{9}[vV]?$/.test(value)) {
      setNicNumber(value.toUpperCase());
    } else {
      setNicNumber("");
    }
  
  }

  function handleGenderChange(event) {
    setGender(event.target.value);
  }

  function handleAddressChange(event) {
    setAddress(event.target.value);
  if (!address.trim()) {
    alert("Please enter your address.");
    return;
  }
}
  

  function handleContactNumberChange(event) {
    const value = event.target.value;
    if (/^\d{10}$/.test(value)) {
      setContactNumber(value);
    } else {
      setContactNumber("");
    }
  
  }

 function handleSubmit(event) {
    event.preventDefault();
    if(patientId.length = 0 || firstName.length == 0 ){
      setError(true);
}

if(!patientId || !firstName || !lastName || !address || !date || !gender || !nicNumber ||  !contactNumber) {
      toast.error('Please fill all the fields...', {
      position: toast.POSITION.TOP_RIGHT
  });
  return;
}else{
    console.log("Setting Registration");
    const patientData = {
    PatientId: patientId,
    AppointmentNumber: appointmentNumber,
    Date: date,
    First_Name: firstName,
    Last_Name: lastName,
    NIC_Number: nicNumber,
    Gender: gender,
    Address: address,
    Contact_Number: contactNumber,
    // You can add code here to submit the form data to a server or perform other actions
  };

  setRegistration(patientData);
}

}

  function handleReset(event) {
    event.preventDefault(); // prevent the default form submission behavior
    setPatientId('');
    setAppointmentNumber('');
    setDate('');
    setFirstName('');
    setLastName('');
    setNicNumber('');
    setGender('');
    setAddress('');
    setContactNumber('');
  }
  return (
    <div className='main-container'>
      <div className="f-container">
        <h1>Add Patients</h1>
    
    <form className='forms' onSubmit={handleSubmit}>

            <div className='f-input'>
              <label className='l1'>Patient Id:</label>      
                <div className='input1'><input type="text" class="form-control" value={patientId} onChange={handlePatientIdChange}/></div>
                  {error&&patientId.length<=0?
               <label class='input-validation-error'>Patient ID can't be empty</label>:""}
            </div>

            <div className='f-input'>
            <label className='l1'>Appointment Number:</label>
              <div className='input1'>
                <input type="number" class="form-control" value={appointmentNumber} onChange={handleAppointmentNumberChange}/></div>
                {error&&appointmentNumber.length<=0?
        <label className='input-validation-error'>AddAppointment Number can't be Empty</label>:""} 
                </div>   
        

        <div className='f-input'>
          <label className='l1'>Appointment Date:</label>
            <div className='input1'>
                <input type="date" class="form-control " value={date} onChange={handleDateChange}/></div>
          </div>
      
  
        
        <div className='f-input'>
            <label className='l1'>First Name:</label>
              <div className='input1'>
                <input type="text" class="form-control " value={firstName} onChange={handleFirstNameChange}/></div>
                {error&&firstName.length<=0?
                  <label class='input-validation-error'><center>First Name can't be Empty</center></label>:""}
              </div>
             

      
        <div className='f-input'>
            <label className='l1'>Last Name:</label>
              <div className='input1'>
                <input type="text" class="form-control" value={lastName} onChange={handleLastNameChange}/></div>
                {error&&lastName.length<=0?
                    <label className='input-validation-error'><center>Last Name can't be Empty</center></label>:""}
              </div>

        

        <div className='f-input'>
            <label className='l1'>NIC Number:</label>
              <div className='input1'>
                <input type="text" class="form-control" value={nicNumber} onChange={handleNicNumberChange}/></div>
                {error&&nicNumber.length<=0?
                  <label className='input-validation-error'><center>Please enter a valid NIC number</center></label>:""}
              </div>

        <div className='f-input'>
            <label className='l1'>Gender:</label>
                <div className='input1'>
                    <label className='l1'>
                      <input type="radio" value="Male" checked={gender === "Male"} onChange={handleGenderChange} />Male</label>
                    <label className='l1'>
                      <input type="radio" value="Female" checked={gender === "Female"} onChange={handleGenderChange} />Female</label>
        </div>
        {error && gender.length <= 0 ? (
            <label class="input-validation-error">
                <center>Gender field is required</center>
            </label>) : ("")}</div>

        <div className='f-input'>
            <label className='l1'>Address:</label>
              <div className='input1'>
                <input type="text" class="form-control" value={address} onChange={handleAddressChange}/></div>
              {error&&address.length<=0?
                <label class='input-validation-error'><center>Address can't be Empty</center></label>:""}
        </div>

        <div className='f-input'>
            <label className='l1'>contact Number:</label>
              <div className='input1'>
                <input type="number" class="form-control" value={contactNumber} onChange={handleContactNumberChange}/></div>
              {error&&contactNumber.length<=0?
                <label className='input-validation-error'><center>Please enter a valid 10-digit phone number in the format of (123) 456-7890.</center></label>:""}
                </div>
              

        <div className="form-button">
        <button class="btn btn-primary btn-sm" type="button"  onClick={handleReset}>Reset</button>
        <button class="btn btn-primary btn-sm" type="button"  onClick={handleSubmit}>Submit</button>
      </div>
    </form>
                
        </div>
        </div>

);
}

export default RegistrationForm;

  


