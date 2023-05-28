import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ViewAppointment from './components/ViewAppointment';
import UpdateAppointment from './components/UpdateAppointment';
import PatientHistory from './components/PatientHistory';
import Login from "./components/Login";
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import AddStock from './components/AddStock';
import GetAttendance from './components/GetAttendance';
import History from './components/History';
import ViewPatients from './components/ViewPatients';
import ViewAttendance from './components/ViewAttendance';
import UpdateStock from './components/UpdateStock';
import ViewStock from './components/ViewStock';
import AddAppointment from './components/AddAppoinment';
import UpdatePatient from './components/UpdatePatient';
import PatientProfile from './components/PatientProfile';
import DeleteStock from './components/DeleteStock';
import ViewLowStock from './components/ViewLowStock';
import ViewShortExpiry from './components/ViewShortExpiry';
import GenerateBill from './components/GenerateBill';
import Navbar from './components/Navbar';
import ViewEndpoints from './components/ViewEndpoints';

const hideNavbarRoutes = ['/', '/view_endpoints'];

function App() {
  const location = useLocation();
  const shouldRenderNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldRenderNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='add_appointment' element={<AddAppointment />} />
        <Route path='view_appointment' element={<ViewAppointment />} />
        <Route path='update_appointment' element={<UpdateAppointment />} />
        <Route path='patient_history' element={<PatientHistory />} />
        <Route path='registration' element={<RegistrationForm />} />
        <Route path='add_stock' element={<AddStock />} />
        <Route path='update_stock' element={<UpdateStock />} />
        <Route path='view_lowstock' element={<ViewLowStock />} />
        <Route path='view_shortexpiry' element={<ViewShortExpiry />} />
        <Route path='get_attendance' element={<GetAttendance />} />
        <Route path='view_attendance' element={<ViewAttendance />} />
        <Route path='history' element={<History />} />
        <Route path='view_patients' element={<ViewPatients />} />
        <Route path='view_stock' element={<ViewStock />} />
        <Route path='update_patient' element={<UpdatePatient />} />
        <Route path='patient_profile' element={<PatientProfile />} />
        <Route path='generate_bill' element={<GenerateBill />} />
        <Route path='view_endpoints' element={<ViewEndpoints />} />
      </Routes>
    </>
  );
}

export default App;
