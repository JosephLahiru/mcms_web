import React from 'react'
import './AddName.css';

export default function AddName() {
  return (
    <div className='container'>
      <table className='tab1' cellSpacing='0' cellPadding='4' aria-colspan='2' >
        <tr>
          <td>First Name :  <input id='Fname' name='Fname' type='text'></input>
          </td>
          <td>Last Name  :  <input id='Lname' name='Lname' type='text'></input>
          </td>
        </tr><br/>
        <tr>
          <td>
            Email : <tab><input id='email' name='email' type='text'></input></tab>
          </td>
        </tr><br/>
        <tr>
          <td>Telephone  : <input id='PhoneNumber' name='PhoneNumber' type='number'></input>
          </td>
          <td>Age : <input id='Age' name='Age' type='number'></input>
          </td>
        </tr><br/>
        
      </table><br/>

      <p>Disease conditions:</p>

      <p>
            <input type="checkbox" id="Disease1" name="Disease1" value="BCholesterol" className='c1'></input>
            <label for="Disease1"> Cholesterol</label>
            <input type="checkbox" id="Disease2" name="Disease2" value="Diabetes"></input>
            <label for="vDisease2"> Diabetes</label>
            <input type="checkbox" id="Disease3" name="Disease3" value="Pressure"></input>
            <label for="Disease3"> Blood Pressure</label>
            <input type="checkbox" id="Disease4" name="Disease4" value="Allergies"></input>
            <label for="Disease4"> Allergies</label>
      </p>  

    </div>
  )
}























