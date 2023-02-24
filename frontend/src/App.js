import './App.css';
import React from 'react';
//import AddName from './components/AddName' ;
import RegistrationForm from './components/RegistrationForm';


function App() {
  return (
    <div className='app'>
        <h1>New patient Registration</h1>
          <div>
            <RegistrationForm/>
          </div>
    </div>
  );
}

export default App;
