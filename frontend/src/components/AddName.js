import React from 'react'
import './AddName.css';

export default function AddName() {

  
  return (
    <div className='container'>
      <div className='form'>
        <div className='form-body'>
          <div className='form1'>
          <label>Registration Date:</label>
                  <input type='date'  className='tab1'></input>
                  <input type='time'  className='tab1'></input><br/><br/>
          <label >Registration Number:</label>
                  <input type='number' className='tab2'></input><br/><br/>
          <label >Patient Name:</label> 
                  <input type="text" placeholder='First Name' className='tab3'>
                  </input><input type="text" placeholder='Last Name' className='tab3'></input><br/><br/>
          <label >Email:</label> 
                  <input type='email' className='tab4' placeholder='Enter Email Address'></input><br/><br/>
          <label>Age:</label>  
                  <input type='date'  className='tab2'></input><input type='time'  className='tab2'></input><br/><br/>


              <h4>TelePhone:</h4>
              <h4>Disease conditions:</h4><br/>
              <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                <label for="vehicle1"> I have a bike</label><br/>
              <input type="checkbox" id="vehicle2" name="vehicle2" value="Car"></input>
               <label for="vehicle2"> I have a car</label><br/>
              <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat"></input>
                <label for="vehicle3"> I have a boat</label><br/><br/>
              <input type="submit" value="Submit"></input>
         
            <div className='column'>
              
              <input type="text"></input><br/><br/>
            
              
              <input type="number"></input><br/><br/>
            </div> 
            </div> 
            </div>
      </div>
    </div>
    
  )
}























