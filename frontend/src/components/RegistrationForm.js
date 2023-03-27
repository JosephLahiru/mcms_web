import React,{useState} from 'react';
import './RegistrationForm.css';

export default function RegistrationForm() {

  const [patientType, setPatientType] = useState('');
  const [date, setDate] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nicNumber, setNicNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');

  function handlePatientTypeChange(event){
    setPatientType(event.target.value);
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

  function handleTelephoneNumberChange(event) {
    setTelephoneNumber(event.target.value);
  }

 

  function handleSubmit(event) {
    event.preventDefault();
    console.log('PatientType:', patientType);
    console.log('Date:', date);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('NIC Number:', nicNumber);
    console.log('Gender:', gender);
    console.log('Address:', address);
    console.log('Telephone Number:', telephoneNumber);
    // You can add code here to submit the form data to a server or perform other actions
  }

  function handleCancel(event) {
    event.preventDefault(); // prevent the default form submission behavior
    setPatientType('');
    setDate('');
    setFirstName('');
    setLastName('');
    setNicNumber('');
    setGender('');
    setAddress('');
    setTelephoneNumber('');
  }
  

  return (
    <div className='container'>
    <form onSubmit={handleSubmit} className='form-check'>

    <div className='row'>
        <div className='col'>
            <label>Patient ID:
                <input type="number" value={date} onChange={handleDateChange} className='form-control' />
            </label></div>
        <div className='col'>
            <label>Appointment Date:
                <input type="date" value={nicNumber} onChange={handleNicNumberChange} className='form-control' />
            </label></div></div><br />

      <div className='row'>
        <div className='col'>
            <label>NIC Number:
                <input type="text" value={date} onChange={handleDateChange} className='form-control' />
            </label></div>
        <div className='col'>
            <label>Patient Type:
            <select value={patientType} onChange={handlePatientTypeChange} className='form-control'>
                <option value="">Select Patient Type</option>
                <option value="Type 1">Type 1</option>
                <option value="Type 2">Type 2</option>
                <option value="Type 3">Type 3</option>
                </select>
            </label></div></div><br />

      <div className='row'>
        <div className='col'>
            <label>First Name:
                <input type="text" value={firstName} onChange={handleFirstNameChange} className='form-control' />
            </label></div>
        <div className='col'>
            <label>Last Name:
                <input type="text" value={lastName} onChange={handleLastNameChange} className='form-control'/>
            </label></div></div><br/>
        
        <div className='row'>
            <div className='col'>    
            <label>Address:
        <input type="address" value={address} onChange={handleAddressChange} className='form-control1' />
      </label></div></div><br />
      



      <div className='row'>
        <div className='col'>
            <label>Gender:
                <select value={gender} onChange={handleGenderChange} className='form-control'>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                </select>
            </label></div>
        <div className='col'>
            <label>Telephone Number:
                <input type="tel" value={telephoneNumber} onChange={handleTelephoneNumberChange} className='form-control'/>
              </label></div></div><br /><br/>


      <div><button type="button" onClick={handleCancel}>Cancel</button>
      <button type="button" onClick={handleSubmit}>Submit</button></div>

    </form>
    </div>
  );
}

  


