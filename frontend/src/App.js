import React from 'react';
import './App.css';
import Appointment from './components/Appointment.js';
import {Login} from "./components/Login";
//import AddName from './components/AddName' ;
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
    <div className="App">
      <Appointment/>
      <Login/>
      <RegistrationForm/>
    </div>
  );
}

export default App;