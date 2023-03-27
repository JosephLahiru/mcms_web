import React from 'react';


import {Routes, Route} from 'react-router-dom';
import AddAppointment from './components/AddAppointment.js';
import ViewAppointment from './components/ViewAppointment.js' ;
import {Login} from "./components/Login";
import RegistrationForm from './components/RegistrationForm';
import { Dashboard } from './components/Dashboard';
import AddStock from './components/AddStock.js';
import GetAttendance from './components/GetAttendance.js';
import RetrieveAttendance from './components/RetrieveAttendance';
import UpdateStock from './components/UpdateStock.js';


function App() {
  return (
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='add_appoinment' element={<AddAppointment/>}/>
        <Route path='view_appointment' element={<ViewAppointment/>}/>
        <Route path='registration' element={<RegistrationForm/>}/>
        <Route path='add_stock' element={<AddStock/>}/>
        <Route path='update_stock' element={<UpdateStock/>}/>
        <Route path='get_attendance' element={<GetAttendance/>}/>
        <Route path='retrieve_attendance' element={<RetrieveAttendance/>}/>
        </Routes>
  );
}

export default App;
