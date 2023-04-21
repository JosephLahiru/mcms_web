import React from 'react';


import {Routes, Route} from 'react-router-dom';
import ViewAppointment from './components/ViewAppointment' ;
import UpdateAppointment from './components/UpdateAppointment' ;
import PatientHistory from './components/PatientHistory' ;
import {Login} from "./components/Login";
import RegistrationForm from './components/RegistrationForm';
import { Dashboard } from './components/Dashboard';
import AddStock from './components/AddStock';
import GetAttendance from './components/GetAttendance';
import History from './components/History';
import RetrievePatients from './components/RetrievePatients';
import ViewAttendance from './components/ViewAttendance';
import UpdateStock from './components/UpdateStock';
import ViewStock from './components/ViewStock';
import AddAppointment from './components/AddAppoinment';
import UpdatePatient from './components/UpdatePatient';
import UserProfile from './components/UserProfile.js';
import DeleteStock from './components/DeleteStock';


function App() {
  return (
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='add_appointment' element={<AddAppointment/>}/>
        <Route path='view_appointment' element={<ViewAppointment/>}/>
        <Route path='update_appointment' element={<UpdateAppointment/>}/>
        <Route path='patient_history' element={<PatientHistory/>}/>
        <Route path='registration' element={<RegistrationForm/>}/>
        <Route path='add_stock' element={<AddStock/>}/>
        <Route path='update_stock' element={<UpdateStock/>}/>
        <Route path='delete_stock' element={<DeleteStock/>}/>
        <Route path='get_attendance' element={<GetAttendance/>}/>
        <Route path='view_attendance' element={<ViewAttendance/>}/>
        <Route path='history' element={<History/>}/>
        <Route path='retrieve_patients' element={<RetrievePatients/>}/>
        <Route path='view_attendance' element={<ViewAttendance/>}/>
        <Route path='view_stock' element={<ViewStock/>}/>
        <Route path='update_patient' element={<UpdatePatient/>}/>
        <Route path='user_profile' element={<UserProfile/>}/>
     </Routes>
  );
}

export default App;
