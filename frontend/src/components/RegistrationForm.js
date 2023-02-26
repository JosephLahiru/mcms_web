import React,{useState} from 'react';
import './RegistrationForm.css';

export default function RegistrationForm() {

  const [date, setDate] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nicNumber, setNicNumber] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');
  const [moreDetails, setMoreDetails] = useState('');

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

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handleTelephoneNumberChange(event) {
    setTelephoneNumber(event.target.value);
  }

  function handleMoreDetailsChange(event) {
    setMoreDetails(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log('Date:', date);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('NIC Number:', nicNumber);
    console.log('Gender:', gender);
    console.log('Email:', email);
    console.log('Telephone Number:', telephoneNumber);
    console.log('More Details About The disease', moreDetails);
    // You can add code here to submit the form data to a server or perform other actions
  }

  return (
    <div className='container'>
    <form onSubmit={handleSubmit} className='form-check'>

      <div className='row'>
        <div className='col'>
            <label>Date:
                <input type="date" value={date} onChange={handleDateChange} className='form-control' />
            </label></div>
        <div className='col'>
            <label>NIC Number:
                <input type="text" value={nicNumber} onChange={handleNicNumberChange} className='form-control' />
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
            <label>Email:
        <input type="email" value={email} onChange={handleEmailChange} className='form-control1' />
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
              </label></div></div><br />
        
        <div className='row'>
          <div className='col'>
            <label>Disease conditions(Non-infectious):<br /><br/>

                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" className='form-check-input'/>
                    <label for="vehicle1"> I have a bike</label><br/><br/>
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" className='form-check-input'/>
                    <label for="vehicle2"> I have a car</label><br/><br/>
                <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" className='form-check-input'/>
                    <label for="vehicle3"> I have a boat</label><br/><br/>
            </label></div>

          <div className='col'>
            <label>Have you come for treatment before?<br /><br/>
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                <label class="form-check-label" for="flexRadioDefault1">Default radio</label>
          </label></div></div><br />

          <div className='row'>
              <div className='col'>
                  <label>More Details About The disease:<br /><br/>
                      <textarea value={moreDetails} onChange={handleMoreDetailsChange} className='form-control1'/>
                  </label></div></div><br />




      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

  


