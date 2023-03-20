import React from 'react';
import {Routes, Route} from 'react-router-dom';
import GetAppointment from './components/GetAppointment.js';
import {Login} from "./components/Login";
import ViewAppointment from './components/ViewAppointment.js' ;
import RegistrationForm from './components/RegistrationForm';
import { Dashboard } from './components/Dashboard';
import AddStock from './components/AddStock.js';
import GetAttendance from './components/GetAttendance.js';
import SetAttendance from './components/SetAttendance.js';
import RetrieveAttendance from './components/RetrieveAttendance';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='get_appoinment' element={<GetAppointment/>}/>
        <Route path='registration' element={<RegistrationForm/>}/>
        <Route path='view_appointment' element={<ViewAppointment/>}/>
        <Route path='add_stock' element={<AddStock/>}/>
        <Route path='get_attendance' element={<GetAttendance/>}/>
        <Route path='set_attendance' element={<SetAttendance/>}/>
        <Route path='retrieve_attendance' element={<RetrieveAttendance/>}/>

      </Routes>
  );
}

export default App;
