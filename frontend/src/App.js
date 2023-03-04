import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Appointment from './components/Appointment.js';
import {Login} from "./components/Login";
//import AddName from './components/AddName' ;
import RegistrationForm from './components/RegistrationForm';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='appoinment' element={<Appointment/>}/>
        <Route path='registration' element={<RegistrationForm/>}/>
        {/* <Route path='tableview' element={<TableV/>}/> */}
      </Routes>
  );
}

export default App;