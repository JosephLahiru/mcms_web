import './App.css';
import React from 'react';
//import RegistrationForm from './components/RegistrationForm';
//import Profiles from './components/Patient';
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

