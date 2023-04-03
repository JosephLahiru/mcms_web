import React from 'react';


import {Routes, Route} from 'react-router-dom';

import ViewAppointment from './components/ViewAppointment' ;
import UpdateAppointment from './components/UpdateAppointment.js' ;
import PatientHistory from './components/PatientHistory.js' ;
import {Login} from "./components/Login";
import RegistrationForm from './components/RegistrationForm';
import { Dashboard } from './components/Dashboard';
import AddStock from './components/AddStock.js';
import GetAttendance from './components/GetAttendance.js';
import RetrieveAttendance from './components/RetrieveAttendance';
import UpdateStock from './components/UpdateStock.js';
import ViewStock from './components/ViewStock.js';
import AddAppointment from './components/AddAppoinment';


function App() {
  return (
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='add_appoinment' element={<AddAppointment/>}/>
        <Route path='view_appointment' element={<ViewAppointment/>}/>
        <Route path='update_appointment' element={<UpdateAppointment/>}/>
        <Route path='patient_history' element={<PatientHistory/>}/>
        <Route path='registration' element={<RegistrationForm/>}/>
        <Route path='add_stock' element={<AddStock/>}/>
        <Route path='update_stock' element={<UpdateStock/>}/>
        <Route path='get_attendance' element={<GetAttendance/>}/>
        <Route path='retrieve_attendance' element={<RetrieveAttendance/>}/>
        <Route path='view_stock' element={<ViewStock/>}/>
        </Routes>
  );
}

export default App;
