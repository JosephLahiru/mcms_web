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
        <h1>Patient Update Form</h1>
    
    <form className='registration-forms' onSubmit={handleSubmit}>

            <div className='registration-form-input'>
              <label className='registration-lable'>Patient Id:</label>      
                  <input type="text" class="form-control " value={patientId} onChange={handlePatientIdChange}/>
            </div>
            {error&&patientId.length<=0?
               <label class='input-validation-error'>Patient ID can't be empty</label>:""}

            <div className='registration-form-input'>
              <label className='registration-lable'>Appointment Number:</label>
                <input type="number" class="form-control" value={appointmentNumber} onChange={handleAppointmentNumberChange}/>
            </div>
                {error&&appointmentNumber.length<=0?
                    <label className='input-validation-error'>AddAppointment Number can't be Empty</label>:""} 
                   
      
        <div className='registration-form-input'>
            <label className='registration-lable'>First Name:</label>
                <input type="text" class="form-control " value={firstName} onChange={handleFirstNameChange}/>
        </div>
                {error&&firstName.length<=0?
                  <label class='input-validation-error'><center>First Name can't be Empty</center></label>:""}
              
             

      
        <div className='registration-form-input'>
            <label className='registration-lable'>Last Name:</label>
                <input type="text" class="form-control" value={lastName} onChange={handleLastNameChange}/>
        </div>
                {error&&lastName.length<=0?
                    <label className='input-validation-error'><center>Last Name can't be Empty</center></label>:""}
              

        
        <div className='registration-form-input'>
            <label className='registration-lable'>Age:</label>
                <input type="number" class="form-control" value={age} onChange={handleAgeChange}/>
        </div> 
                {error&&age.length<=0?
                    <label className='input-validation-error'>Age can't be Empty</label>:""}
                 

        

        <div className='registration-form-input'>
            <label className='registration-lable'>NIC Number:</label>
                <input type="text" class="form-control" value={nicNumber} onChange={handleNicNumberChange}/>
        </div>
                {error&&nicNumber.length<=0?
                  <label className='input-validation-error'><center>Please enter a valid NIC number</center></label>:""}
              

        <div className='registration-form-input'>
            <label className='registration-lable'>contact Number:</label>
                <input type="text" class="form-control" value={contactNumber} onChange={handleContactNumberChange}/>
        </div>
                    {error&&contactNumber.length<=0?
                          <label className='input-validation-error'><center>Please enter a valid 10-digit phone number in the format of (123) 456-7890.</center></label>:""}
                

        <div className='registration-form-input'>
            <label className='registration-lable'>Email:</label>
                <input type="text" class="form-control" value={nicNumber} onChange={handleEmailChange}/>
        </div>
                {error&&email.length<=0?
                  <label className='input-validation-error'><center>Please enter a valid NIC number</center></label>:""}
             

        <div className='registration-form-input'>
            <label className='registration-lable'>Address:</label>
                <textarea value={address} onChange={handleAddressChange} placeholder="Enter Address here..."></textarea>
        </div>
              {error&&address.length<=0?
                <label class='input-validation-error'><center>Address can't be Empty</center></label>:""}
       

        <div className='registration-form-input'>
            <label className='registration-lable'>Gender:</label>
            <select class="form-control" value={gender} onChange={handleGenderChange}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
        </div>
        {error && gender.length <= 0 ? (
            <label class="input-validation-error">
                <center>Gender field is required</center>
            </label>) : ("")}

        <div className='registration-form-input'>
          <label className='registration-lable'>Appointment Date:</label>
                <input type="date" class="form-control " value={date} onChange={handleDateChange}/>
          </div>


            <div className='registration-form-input'>
                <label className='registration-lable'>Medication History:</label>

                  <div class="form-check form-check-inline">
                  <input type="checkbox" value="Blood Pressure" onChange={handleMedicationHisotryChange}/><label class='form-check-label'>Blood-Pressure</label></div>

                  <div class="form-check form-check-inline">
                  <input  type="checkbox" value="Blood Sugar" onChange={handleMedicationHisotryChange} /><label class='registration-lable-0'>Blood-Sugar</label></div>

                  <div class="form-check form-check-inline">
                  <input type="checkbox" value="Alergy" onChange={handleMedicationHisotryChange}/><label class='registration-lable-0'>Alergy</label></div>

                  <div class="form-check form-check-inline">
                  <input type="checkbox" value="Cholesterol"  onChange={handleMedicationHisotryChange}/><label class='registration-lable-0'>Cholesterol</label></div>

                  <div class="form-check form-check-inline">
                  <input type="checkbox" value="Asthma"  onChange={handleMedicationHisotryChange}/><label class='registration-lable-0'>Asthma</label></div>

                  <div class="form-check form-check-inline">
                  <input type="checkbox" value="Cardiac disease"  onChange={handleMedicationHisotryChange}/><label class='registration-lable-0'>Cardiac disease</label></div>

          </div>
        {error && gender.length <= 0 ? (<label class="input-validation-error"><center>Gender field is required</center></label>) : ("")}
       
        <div className='registration-form-input'>
          <label className='registration-lable'>Appointment Type:</label>
            <select class="form-control" value={appointmentType} onChange={ setAppointmentType}>
                <option value="Consultation">Consultation</option>
                <option value="Doctor Check-up">Doctor Check-up</option>
                <option value="Medical Examination">Medical Examination</option>
                <option value="Result Analysis">Result Analysis</option>
                <option value="Scanner">Scanner</option>
            </select>
            </div>
            {error&&appointmentType.length<=0?
        <label className='input-validation-error'>Appointment Type can't be Empty</label>:""}
       

      

        <div className='registration-form-input'>
          <label className='registration-lable'>Appointment Doctor:</label>
            <select class="form-control" value={appointmentDoctor} onChange={ setAppointmentDoctor}>
              <option value="">Select  Doctor</option>
              <option value="The Universal Physician">The Universal Physician</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Scan Doctor">Scan Doctor</option>
            </select></div>
         {error&&appointmentDoctor.length<=0?
        <label className='input-validation-error'>Appointment Doctor can't be Empty</label>:""}

        <div className="updatepatient-form-button"><br/><br/>
        <div class="row g-2">
        <div class="col-auto"><button class="btn btn-danger" type="button"  onClick={handleReset}>Reset</button></div>
        <div class="col-auto"><button class="btn btn-primary " type="button"  onClick={() => navigate("/view_patients")}>Submit</button></div>
        </div>
      </div>
    </form>
    <ToastContainer />
  </div>


);
}

export default RegistrationForm;

  


