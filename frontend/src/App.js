import React from 'react';


import {Routes, Route} from 'react-router-dom';
import AddAppointment from './components/AddAppointment.js';
import ViewAppointment from './components/ViewAppointment.js' ;
import {Login} from "./components/Login";
import RegistrationForm from './components/RegistrationForm';
import { Dashboard } from './components/Dashboard';
import AddStock from './components/AddStock.js';
import GetAttendance from './components/GetAttendance.js';
import ViewAttendance from './components/ViewAttendance';
import UpdateStock from './components/UpdateStock.js';
import ViewStock from './components/ViewStock.js';


function App() {
  return (
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='add_appointment' element={<AddAppointment/>}/>
        <Route path='view_appointment' element={<ViewAppointment/>}/>
        <Route path='registration' element={<RegistrationForm/>}/>
        <Route path='add_stock' element={<AddStock/>}/>
        <Route path='update_stock' element={<UpdateStock/>}/>
        <Route path='get_attendance' element={<GetAttendance/>}/>
        <Route path='view_attendance' element={<ViewAttendance/>}/>
        <Route path='view_stock' element={<ViewStock/>}/>
        </Routes>
  );
}

export default App;
