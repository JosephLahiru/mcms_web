import React, {useState} from 'react';
import './main.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {

  const [patientId, setPatientId] = useState('');
  const [appointmentNumber, setAppointmentNumber] = useState('');
  const [date, setDate] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [nicNumber, setNicNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [appointmentDoctor, setAppointmentDoctor] = useState('');
  const navigate = useNavigate();
  const [medicationHistory, setMedicationHistory] = useState('');
  

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

  function handleAgeChange(event) {
    setAge(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleNicNumberChange(event) {
      setNicNumber(event.target.value);
  }

  function handleGenderChange(event) {
    setGender(event.target.value);
  }

  function handleMedicationHisotryChange(event) {
    setMedicationHistory(event.target.value);
  }

  function handleAddressChange(event) {
    setAddress(event.target.value);
  if (!address.trim()) {
    alert("Please enter your address.");
    return;
  }
}
  

  function handleContactNumberChange(event) {
    setContactNumber(event.target.value)
  
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
    Age: age,
    NIC_Number: nicNumber,
    Gender: gender,
    Address: address,
    Contact_Number: contactNumber,
    Email:email,
    AppointmentType: appointmentType,
    appointmentDoctor: appointmentDoctor,
    medication_history: medicationHistory,
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
    setAge('');
    setNicNumber('');
    setGender('');
    setAddress('');
    setContactNumber('');
    setEmail('');
    setAppointmentType('');
    setAppointmentDoctor('');
    setMedicationHistory('');
  }
  return (
      <div className="registration-form-container">
        <h1>Add Patients</h1>
    
    <form className='registration-forms' onSubmit={handleSubmit}>

            <div className='registration-form-input'>
              <label className='registration-lable'>Patient Id:</label>      
                <div className='registration-input'>
                  <input type="text" class="registration-form-control" value={patientId} onChange={handlePatientIdChange}/></div>
                  {error&&patientId.length<=0?
               <label class='input-validation-error'>Patient ID can't be empty</label>:""}
            </div>

            <div className='registration-form-input'>
            <label className='registration-lable'>Appointment Number:</label>
              <div className='registration-input'>
                <input type="number" class="registration-form-control" value={appointmentNumber} onChange={handleAppointmentNumberChange}/></div>
                {error&&appointmentNumber.length<=0?
                    <label className='input-validation-error'>AddAppointment Number can't be Empty</label>:""} 
                </div>   
      
        <div className='registration-form-input'>
            <label className='registration-lable'>First Name:</label>
              <div className='registration-input'>
                <input type="text" class="registration-form-control " value={firstName} onChange={handleFirstNameChange}/></div>
                {error&&firstName.length<=0?
                  <label class='input-validation-error'><center>First Name can't be Empty</center></label>:""}
              </div>
             

      
        <div className='registration-form-input'>
            <label className='registration-lable'>Last Name:</label>
              <div className='registration-input'>
                <input type="text" class="registration-form-control" value={lastName} onChange={handleLastNameChange}/></div>
                {error&&lastName.length<=0?
                    <label className='input-validation-error'><center>Last Name can't be Empty</center></label>:""}
              </div>

        
        <div className='registration-form-input'>
            <label className='registration-lable'>Age:</label>
              <div className='registration-input'>
                <input type="number" class="registration-form-control" value={age} onChange={handleAgeChange}/></div>
                {error&&age.length<=0?
                    <label className='input-validation-error'>Age can't be Empty</label>:""}
                </div>  

        

        <div className='registration-form-input'>
            <label className='registration-lable'>NIC Number:</label>
              <div className='registration-input'>
                <input type="text" class="registration-form-control" value={nicNumber} onChange={handleNicNumberChange}/></div>
                {error&&nicNumber.length<=0?
                  <label className='input-validation-error'><center>Please enter a valid NIC number</center></label>:""}
              </div>

        <div className='registration-form-input'>
            <label className='registration-lable'>contact Number:</label>
              <div className='registration-input'>
                <input type="number" class="registration-form-control" value={contactNumber} onChange={handleContactNumberChange}/></div>
                    {error&&contactNumber.length<=0?
                          <label className='input-validation-error'><center>Please enter a valid 10-digit phone number in the format of (123) 456-7890.</center></label>:""}
                </div>

        <div className='registration-form-input'>
            <label className='registration-lable'>Email:</label>
              <div className='registration-input'>
                <input type="text" class="registration-form-control" value={nicNumber} onChange={handleEmailChange}/></div>
                {error&&email.length<=0?
                  <label className='input-validation-error'><center>Please enter a valid NIC number</center></label>:""}
              </div>

        <div className='registration-form-input'>
            <label className='registration-lable'>Gender:</label>
                <div className='registration-input'>
                    <label className='l1'>
                      <input type="radio" value="Male" checked={gender === "Male"} onChange={handleGenderChange} />Male</label>
                    <label className='l1'>
                      <input type="radio" value="Female" checked={gender === "Female"} onChange={handleGenderChange} />Female</label>
        </div>
        {error && gender.length <= 0 ? (
            <label class="input-validation-error">
                <center>Gender field is required</center>
            </label>) : ("")}</div>


            <div className='registration-form-input'>
            <label className='registration-lable'>Medication History:</label>
                <div className='registration-input'>
                    <label className='l1'>
                      <input type="checkbox" value="Blood Pressure" onChange={handleMedicationHisotryChange} />Blood Pressure</label>
                    <label className='l1'>
                      <input type="checkbox" value="Blood Sugar"  onChange={handleMedicationHisotryChange} />Blood Sugar</label>
                    <label className='l1'>
                      <input type="checkbox" value="Alergy"  onChange={handleMedicationHisotryChange} />Alergy</label>
                    <label className='l1'>
                      <input type="checkbox" value="Cholesterol" onChange={handleMedicationHisotryChange} />Cholesterol</label> 
        </div>
        {error && gender.length <= 0 ? (
            <label class="input-validation-error">
                <center>Gender field is required</center>
            </label>) : ("")}</div>
            <br/>

        <div className='registration-form-input'>
          <label className='registration-lable'>Appointment Date:</label>
            <div className='registration-input'>
                <input type="date" class="registration-form-control " value={date} onChange={handleDateChange}/></div>
          </div>

          <div className='fregistration-form-input'>
            <label className='registration-lable'>Address:</label>
              <div className='registration-input'>
                <input type="text" class="registration-form-control" value={address} onChange={handleAddressChange}/></div>
              {error&&address.length<=0?
                <label class='input-validation-error'><center>Address can't be Empty</center></label>:""}
        </div>

        <div className='registration-form-input'>
          <label className='registration-lable'>Appointment Type:</label>
            <div className='registration-input'>
            <select className="registration-form-control-0" value={appointmentType} onChange={ setAppointmentType}>
                <option value="Consultation">Consultation</option>
                <option value="Doctor Check-up">Doctor Check-up</option>
                <option value="Medical Examination">Medical Examination</option>
                <option value="Result Analysis">Result Analysis</option>
                <option value="Scanner">Scanner</option>
            </select>
            </div>
            {error&&appointmentType.length<=0?
        <label className='input-validation-error'>Appointment Type can't be Empty</label>:""}
        </div>

      

        <div className='registration-form-input'>
          <label className='registration-lable'>Appointment Doctor:</label>
            <div className='registration-input'>
            <select className="registration-form-control-0" value={appointmentDoctor} onChange={ setAppointmentDoctor}>
              <option value="">Select Appointment Doctor</option>
              <option value="The Universal Physician">The Universal Physician</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Scan Doctor">Scan Doctor</option>
            </select>
              </div>
         {error&&appointmentDoctor.length<=0?
        <label className='input-validation-error'>Appointment Doctor can't be Empty</label>:""}
        </div>

        <div className="registration-form-button">
        <button class="btn btn-primary btn-sm" type="button"  onClick={handleReset}>Reset</button>
        <button class="btn btn-primary btn-sm" type="button"  onClick={handleSubmit}>Submit</button>
        <button className="btn btn-primary btn-sm" type="button" onClick={() => navigate("/view_patients")}>View Patient</button>
      </div>
    </form>
  </div>

);
}

export default RegistrationForm;

  


