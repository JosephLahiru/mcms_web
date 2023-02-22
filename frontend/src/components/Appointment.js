import React from 'react';
import './Appointment.css';

export default function Appointment() {
    
  return (
    <div className='container'>
        <h1>Doctor Appointment Request Form</h1>
        <p>Fill the form below and we will get back soon to you for more updates and plan your appointment.</p>
        <form><br/><br/>
      <label>Appointment number:
        <input type="text" />
      </label><br/>

      <label>Enter your Name:
        <input type="text" />
       
      </label><br/>

      <label>Enter your Addres:<br/>
         <textarea id="freeform" name="freeform" rows="4" cols="30"></textarea>
      </label><br/>

      <label>Enter your Age :
        <input type="text" />
      </label><br/>

      <label>Enter contact number :
        <input type="text" />
      </label><br/>

      <label>Please Select Doctor :
      <select>
        <option value=""></option>
        <option value="grapefruit">Doctor 01</option>
        <option value="lime">Doctor 02</option>
       </select>
        </label><br/>

      <label>Please Select Appointment Date :
      <input type='date'  />
      </label><br/>

      <label>Please Select Appointment Time :
        <input type='time' />
      </label><br/>

      <button onClick={() => ("Goal!")}>Submit</button>

       <button onClick={() => ("Goal!")}>Cancel</button>
    </form>
    </div>
    
    
  )
}
