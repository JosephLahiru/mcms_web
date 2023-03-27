import React from 'react';
<<<<<<< HEAD
//import RegistrationForm from './components/RegistrationForm';
//import Profiles from './components/Patient';
=======
import {Routes, Route} from 'react-router-dom';
import Appointment from './components/Appointment.js';
import {Login} from "./components/Login";
//import AddName from './components/AddName' ;
>>>>>>> a66eb71ea3a179fe03341d04c00f9b234aba4ca0
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
        <Route path='appoinment' element={<Appointment/>}/>
        <Route path='registration' element={<RegistrationForm/>}/>
        {/* <Route path='tableview' element={<TableV/>}/> */}
        <Route path='add_stock' element={<AddStock/>}/>
        <Route path='get_attendance' element={<GetAttendance/>}/>
        <Route path='set_attendance' element={<SetAttendance/>}/>
        <Route path='retrieve_attendance' element={<RetrieveAttendance/>}/>

      </Routes>
  );
}

export default App;
<<<<<<< HEAD

=======
>>>>>>> a66eb71ea3a179fe03341d04c00f9b234aba4ca0
