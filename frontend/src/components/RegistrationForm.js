import React,{useState} from 'react';
//import './RegistrationForm.css';

function RegistrationForm() {

  const [patientId, setPatientId] = useState('');
  const [date, setDate] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nicNumber, setNicNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  function handlePatientIdChange(event){
    setPatientId(event.target.value);
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
    setNicNumber(event.target.value);
  }

  function handleGenderChange(event) {
    setGender(event.target.value);
  }

  function handleAddressChange(event) {
    setAddress(event.target.value);
  }

  function handleContactNumberChange(event) {
    setContactNumber(event.target.value);
  }

 

  function handleSubmit(event) {
    event.preventDefault();
    console.log('PatientId:', patientId);
    console.log('Date:', date);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('NIC Number:', nicNumber);
    console.log('Gender:', gender);
    console.log('Address:', address);
    console.log('Contact Number:', contactNumber);
    // You can add code here to submit the form data to a server or perform other actions
  }

  function handleReset(event) {
    event.preventDefault(); // prevent the default form submission behavior
    setPatientId('');
    setDate('');
    setFirstName('');
    setLastName('');
    setNicNumber('');
    setGender('');
    setAddress('');
    setContactNumber('');
  }
  

  return (
    <div className='container'>
    <form onSubmit={handleSubmit}>

    <div className='lable'>
         <label>Patient Id:</label>
    </div>
        <div className='input'>      
          <input type="text" class="form-control " value={patientId} onChange={handlePatientIdChange}/>
        </div>

        <div className='lable'>
            <label>Appointment Date:</label>
            </div>
              <div className='input'>
                <input type="date" class="form-control " value={date} onChange={handleDateChange}/>
              </div>

        <div className='lable'>
            <label>First Name:</label>
            </div>
              <div className='input'>
                <input type="text" class="form-control " value={firstName} onChange={handleFirstNameChange}/>
                </div>

        <div className='lable'>
            <label>Last Name:</label>
            </div>
              <div className='input'>
                <input type="text" class="form-control" value={lastName} onChange={handleLastNameChange}/>
                </div>

        <div className='lable'>
            <label>NIC Number:</label>
            </div>
              <div className='input'>
                <input type="text" class="form-control" value={nicNumber} onChange={handleNicNumberChange}/>
                </div>

        <div className='lable'>
            <label>Gender:</label>
            </div>
            <div className='input'>
              <input type="radio" value={gender} checked={gender === "Male"} onChange={handleGenderChange}>Male</input>
              <input type="radio" value={gender} checked={gender === "Female"} onChange={handleGenderChange}>Female</input>
            </div>

        <div className='lable'>
            <label>Address:</label>
            </div>
              <div className='input'>
                <input type="text" class="form-control" value={address} onChange={handleAddressChange}/>
              </div>

        <div className='lable'>
            <label>contact Number:</label>
            </div>
              <div className='input'>
                <input type="number" class="form-control" value={contactNumber} onChange={handleContactNumberChange}/>
              </div>


      <div>
        <button type="button"  onClick={handleReset}>Reset</button>
        <button type="button"  onClick={handleSubmit}>Submit</button>
      </div>

    </form>
    </div>
  );
}

export default RegistrationForm;

  


