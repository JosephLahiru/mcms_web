import React from 'react';
import { Dashboard } from './components/Dashboard';
import {Routes, Route} from 'react-router-dom';
import Appointment from './components/Appointment.js';
import {Login} from "./components/Login";
//import AddName from './components/AddName' ;
import RegistrationForm from './components/RegistrationForm';

function App() {
  return (
      <Routes>   
        <Route path='/' element={<Login/>}/>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='appoinment' element={<Appointment/>}/>
        <Route path='registration' element={<RegistrationForm/>}/>
      </Routes>
  );
}

export default App;